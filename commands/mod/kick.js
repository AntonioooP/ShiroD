module.exports = {
    name: 'kick',
    async execute(client, message, args, Discord, send) {
        const embed = new Discord.MessageEmbed()
        embed.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }));
        embed.setTimestamp()
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            embed.setColor('RED')
            embed.setDescription('<:norojo:785955359692161074> No tienes permisos suficientes para ejecutar este comando.')
            return send(embed)
        }
        const m = message.mentions.users.first()
        if (!m) {
            embed.setColor('RED')
            embed.setDescription('<:norojo:785955359692161074> Debes mencionar a un usuario \nUso:\n`kick <miembro>`')
            return send(embed)
        }
        try {
            const member = message.guild.members.resolve(m)
            member.kick()
            embed.setColor('GREEN')
            embed.setDescription(`<:siverde:784147389669572619> ${m.tag} ha sido expulsado del servidor.`)
            send(embed)

            
            embed.setDescription(`<:siverde:784147389669572619> ${m.tag} ha sido expulsado del servidor.\nExpulsado por: ${message.author.tag}\n**[Click aquí](${message.url})**`)
            embed.setTitle('Usuario Expulsado')
            client.channels.cache.get('839665670425018388').send({embeds: [embed]})

        } catch (err) {
            embed.setColor('RED')
            embed.setDescription('<:norojo:785955359692161074> No tengo permisos suficientes para sacar este miembro.')
            send(embed)
            console.log(err)
        }
    }
}