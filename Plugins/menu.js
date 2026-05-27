const { bot, commands } = require('../lib/command')
const config = require('../config')

bot(
{
  pattern: 'menu',
  alias: ['help'],
  desc: 'Show commands',
  type: 'system'
},
async (sock, m) => {

  let menu = `╭━━━〔 ${config.BOT_NAME} 〕━━━⊷\n`

  for (let cmd of commands) {

    menu += `┃ ${config.PREFIX}${cmd.pattern}\n`

  }

  menu += '╰━━━━━━━━━━━━━━⊷'

  await m.reply(menu)

})