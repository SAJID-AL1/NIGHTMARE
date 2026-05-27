const { bot } = require('../lib/command')
const config = require('../config')

bot(
{
  pattern: 'owner',
  alias: ['creator'],
  desc: 'Owner info',
  type: 'system'
},
async (sock, m) => {

  await m.reply(
`Owner: ${config.OWNER_NAME}
Number: ${config.OWNER_NUMBER}`
  )

})