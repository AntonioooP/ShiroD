const db = require('../../models/warns')

module.exports = {
    name: 'delwarn',
    aliases: ['unwarn'],
    async execute(client, message, args, Discord, send) {
        let embed = new Discord.MessageEmbed()
        embed.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()

        if (!message.member.permissions.has('KICK_MEMBERS')) {
            embed.setDescription('<:norojo:785955359692161074> Sin permisos.\nNo tienes los permisos suficientes para usar este comando.')
            embed.setColor('RED')
            return send(embed)
        }
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) {
            embed.setDescription('<:norojo:785955359692161074> Muy pocos argumentos.\n\nUso:\n`delwarn [usuario] [número del warn]`')
            embed.setColor('RED')
            return send(embed)
        }
        if (!args[ 1 ]) {
            embed.setDescription('<:norojo:785955359692161074> Muy pocos argumentos.\n\nUso:\n`delwarn [usuario] [número del warn]`')
            embed.setColor('RED')
            return send(embed)
        }
        if (isNaN(args[ 1 ])) {
            embed.setDescription('<:norojo:785955359692161074> El número del warn debe ser un número válido.')
            embed.setColor('RED')
            return send(embed)
        }
        db.findOne({ usuario: user.user.id }, async (err, data) => {
            if (err) client.error(err)
            if (data) {
                let number = args[1] - 1
                data.motivo.splice(number, 1)
                embed.setColor('GREEN')
                embed.setDescription(`<:siverde:784147389669572619> El warn número ${args[1]} de <@${user.user.id}> ha sido eliminado.`)
                send(embed)
                data.save()

                
                embed.setDescription(`<:siverde:784147389669572619> El warn número ${args[1]} de <@${user.user.id}> ha sido eliminado.\nEliminado por: ${message.author.tag}\n**[Click aquí](${message.url})**`)
                embed.setTitle('Warn eliminado')
                client.channels.cache.get('839665670425018388').send({embeds: [embed]})

            } else {
                embed.setColor('RED')
                embed.setDescription('<:norojo:785955359692161074> Este usuario no tiene ese número de warn.\nNúmero que insertaste: ' + args[ 1 ])
                send(embed)
            }
        })
    }
}