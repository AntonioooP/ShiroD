const client = require('../shiro'),
    Discord = require('discord.js')
client.on('guildMemberUpdate', async (a, member) => {
    if (['#', '$', '&', '_', '-', '@', '(', ')', '=', '+', "'", ':', '%', '/', '"', '*', '?', '!', '£', '€', '¥', '¢', '©', '®', '™', '~', '¿', '[', ']', '{', '}', '<', '>', '^', '¡', '`', ';', '÷', '\\', '|', '¦', '¬', '×', '§', '¶', '°'].includes(member.nickname)) return
    if (!member.nickname && !member.user.username.match(/\w/)) return member.setNickname('w')

    if (!member.nickname) return
    if (member.nickname && member.nickname == member.user.username) return
    if (member.nickname && member.nickname.match(/\w/)) return

    member.setNickname(member.user.username).then(() => {
        let embed = new Discord.MessageEmbed()
            .setTitle('Nuevo Nick Cambiado')
            .setDescription('He restablecido el nick de ' + member.user.tag + ' porque no era tageable.\n\nNick que cambié: ' + member.nickname)
            .setColor('BLUE')
            .setTimestamp()
            .setAuthor(member.user.username, member.user.displayAvatarURL({dynamic: true}))
            .setThumbnail(member.user.displayAvatarURL({dynamic: true}))
        client.channels.cache.get('803120675136339968').send({embeds: [embed]})
    }).catch(() => '')
})
