const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion
} = require('@whiskeysockets/baileys')

const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

async function startPair() {

  const { state, saveCreds } =
    await useMultiFileAuthState('./session')

  const { version } =
    await fetchLatestBaileysVersion()

  const sock = makeWASocket({
    version,
    auth: state
  })

  sock.ev.on('creds.update', saveCreds)

  rl.question('Enter WhatsApp Number: ', async (number) => {

    try {

      const code =
        await sock.requestPairingCode(number)

      console.log('\nPair Code:', code)

      console.log(
        '\nOpen WhatsApp > Linked Devices > Link With Phone Number'
      )

    } catch (e) {

      console.log(e)

    }

  })

}

startPair()