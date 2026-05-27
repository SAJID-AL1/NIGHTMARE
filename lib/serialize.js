function serialize(sock, m) {

  const msg = {}

  msg.id = m.key.id
  msg.from = m.key.remoteJid
  msg.isGroup = msg.from.endsWith('@g.us')
  msg.sender =
    m.key.participant || m.key.remoteJid

  msg.body =
    m.message?.conversation ||
    m.message?.extendedTextMessage?.text ||
    m.message?.imageMessage?.caption ||
    ''

  msg.reply = async (text) => {

    return await sock.sendMessage(
      msg.from,
      { text },
      { quoted: m }
    )

  }

  return msg
}

module.exports = {
  serialize
}