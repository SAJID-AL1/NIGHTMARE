const { bot } = require('../lib/command')

bot(
{
  pattern: 'ping',
  alias: ['speed'],
  desc: 'Ping bot',
  type: 'system'
},
async (sock, m) => {

  await m.reply('Pong')

})