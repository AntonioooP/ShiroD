module.exports = {
    name: 'ban',
    async execute(client, message, args, Discord, send) {
        const embed = new Discord.MessageEmbed()
        embed.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
        embed.setTimestamp()
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            embed.setColor('RED')
            embed.setDescription('<:norojo:785955359692161074> No tienes permisos suficientes para ejecutar este comando.')
            return message.channel.send(embed)
        }
        const m = message.mentions.users.first() || client.users.cache.get(args[0])
        if (!m) {
            embed.setColor('RED')
            embed.setDescription('<:norojo:785955359692161074> Debes mencionar a un usuario \nUso:\n`ban <miembro>`')
            return message.channel.send(embed)
        }
        try {
            message.guild.members.ban(m)
            embed.setColor('GREEN')
            embed.setDescription(`<:siverde:784147389669572619> ${m.tag} ha sido baneado del servidor.`)
            send(embed)

            embed.setDescription(`<:siverde:784147389669572619> ${m.tag} ha sido baneado del servidor.\nBaneado por: ${message.author.tag}\n**[Click aquí](${message.url})**`)
            embed.setTitle('Usuario Baneado')
            client.channels.cache.get('839665670425018388').send({embeds: [embed]})
        } catch (err) {
            embed.setColor('RED')
            embed.setDescription('<:norojo:785955359692161074> No tengo permisos suficientes para sacar este miembro.')
            send(embed)
        }
    }
}