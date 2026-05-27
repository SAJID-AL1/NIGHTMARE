const commands = []

function bot(info, func) {

  commands.push({

    pattern: info.pattern,
    alias: info.alias || [],
    desc: info.desc || '',
    type: info.type || 'misc',
    fromMe: info.fromMe || false,
    function: func

  })

}

module.exports = {
  bot,
  commands
}
