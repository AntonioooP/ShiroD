module.exports = {
    name: 'unmute',
    async execute(client, message, args, Discord, send) {
        let embed = new Discord.MessageEmbed()
        embed.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        embed.setTimestamp()
        if (!message.member.roles.cache.has('797522728357855243')) {
            embed.setDescription('<:norojo:785955359692161074> Sin permisos.\nNo tienes los permisos suficientes para usar este comando.')
            embed.setColor('RED')
            return send(embed)
        }
        const m = message.mentions.users.first()
        if (!m) {
            embed.setDescription('<:norojo:785955359692161074> Muy pocos argumentos.\n\nUso:\n`mute [usuario] [tiempo o motivo] <motivo>`')
            embed.setColor('RED')
            embed.setFooter('[] = obligatorio, <> = opcional')
            return send(embed)
        }
        let rol = message.guild.roles.cache.get('775812494312210512')
        if (!rol) {
            embed.setDescription('<:norojo:785955359692161074> El rol `Muted` no existe.')
            embed.setColor('RED')
            return send(embed)
        }
        try {
            const miembro = message.guild.members.resolve(m)
            await miembro.roles.remove(rol)
            let motivo = args.slice(1).join(' ')
            embed.setColor('GREEN')
            embed.setDescription(`<@${miembro.id}> ha sido desmuteado. Motivo: ${motivo ? motivo : 'Sin motivo'}`)
            send(embed)

            embed.setDescription(`<:siverde:784147389669572619> <@${miembro.id}> ha sido desmuteado.\nDesmuteado por: ${message.author.tag}\nMotivo del unmute: ${motivo ? motivo : 'Sin motivo'}\n**[Click aquí](${message.url})**`)
            embed.setTitle('Unmute')
            client.channels.cache.get('839665670425018388').send({embeds: [embed]})
        } catch (err) {
            embed.setColor('RED')
            embed.setDescription('<:norojo:785955359692161074> No tengo permisos suficientes para desmutear este miembro.\n\nProbalemente por la jerarquía de mi rol.')
            send(embed)
        }
    }
}
