const fs = require('fs')
module.exports = function (client) {
    for (const category of fs.readdirSync('./commands/')) {
        for (const file of fs.readdirSync(`./commands/${category}`).filter((a) => a.endsWith('.js'))) {
            const command = require(`../commands/${category}/${file}`)
            client.commands.set(command.name, command)
        }
    }

    fs.readdirSync('./events/').map((a) => require('../events/' + a))
}
