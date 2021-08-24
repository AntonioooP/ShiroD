module.exports = {
    name: 'help',
    async execute(client, message, args, Discord, send) {
        const fs = require('fs')
        let modcmds = fs.readdirSync('./commands/mod')
        let modarr = []
        for (const file of modcmds) {
            const file2 = require('../../commands/mod/' + file)
            modarr.push(file2.name)
        }
        let embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .addField('Comandos de Moderación', modarr.join(',\n'))
            .setTimestamp()
            .setColor('RANDOM')
            .seThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        send(embed)
    }
}