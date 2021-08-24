// const Discord = require('discord.js')
const Shiro = require('./util/client'),
    client = new Shiro({
    allowedMentions: { parse: [] },
    intents: 32767
})
module.exports = client


require('./util/handler')(client)
