const { bot } = require('../lib/command')
const config = require('../config')

bot(
{
  pattern: 'alive',
  alias: ['online'],
  desc: 'Check bot',
  type: 'system'
},
async (sock, m) => {

  await m.reply(
`*${config.BOT_NAME}* is Alive

Owner: ${config.OWNER_NAME}`
  )

})
