const backup = require('discord-backup')
module.exports = {
    name: 'backup',
    dev: true,
    async execute(client, message, args, Discord, send) {
        backup.create(message.guild).then((backupData) => {
            let embed = new Discord.MessageEmbed()
            embed.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            embed.setTimestamp()
            embed.setColor('GREEN')
            embed.setDescription(`Backup creado.\nID: \`${backupData.id}\`\n\nUsa \`s/cargar-backup ${backupData.id}\` para cargar este backup.`)
            return send(embed)
        })
    }
}
