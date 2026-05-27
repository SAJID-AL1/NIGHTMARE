const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys')

const P = require('pino')
const qrcode = require('qrcode-terminal')
const fs = require('fs')

const config = require('./config')
const { serialize } = require('./lib/serialize')
const commands = require('./lib/command')

async function startNightmare() {

  const { state, saveCreds } =
    await useMultiFileAuthState('./session')

  const { version } =
    await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state,
    logger: P({ level: 'silent' }),
    browser: ['Nightmare', 'Chrome', '1.0.0']
  })

  sock.ev.on('creds.update', saveCreds)

  sock.ev.on('connection.update', async (update) => {

    const { connection, qr, lastDisconnect } = update

    if (qr) {
      qrcode.generate(qr, { small: true })
      console.log('Scan QR Code')
    }

    if (connection === 'open') {
      console.log('Nightmare Connected')
    }

    if (connection === 'close') {

      const reason =
        lastDisconnect?.error?.output?.statusCode

      if (reason !== DisconnectReason.loggedOut) {
        startNightmare()
      }

    }

  })

  fs.readdirSync('./plugins').forEach(file => {
    require('./plugins/' + file)
  })

  sock.ev.on('messages.upsert', async ({ messages }) => {

    const m = messages[0]

    if (!m.message) return
    if (m.key && m.key.remoteJid === 'status@broadcast') return

    const msg = serialize(sock, m)

    const prefix = config.PREFIX

    if (!msg.body.startsWith(prefix)) return

    const cmd =
      msg.body.slice(prefix.length).trim().split(' ')[0].toLowerCase()

    const args =
      msg.body.trim().split(/ +/).slice(1)

    const text = args.join(' ')

    for (let command of commands.commands) {

      if (
        command.pattern === cmd ||
        command.alias.includes(cmd)
      ) {

        try {

          command.function(sock, msg, text, args)

        } catch (e) {

          console.log(e)

        }

      }

    }

  })

}

startNightmare()