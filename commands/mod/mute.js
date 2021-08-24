const ms = require('ms')
const {MessageEmbed} = require('discord.js')
module.exports = {
    name: 'mute',
    aliases: ['silenciar'],
    async execute(client, message, args, Discord, send) {
        let embed = new Discord.MessageEmbed()
        embed.setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        embed.setTimestamp()
        try {
            if (!message.member.roles.cache.has('797522728357855243')) {
                embed.setDescription('<:norojo:785955359692161074> Sin permisos.\nNo tienes los permisos suficientes para usar este comando.')
                embed.setColor('RED')
                return send(embed)
            }
            const m = message.mentions.users.first()
            if (!m) {
                embed.setDescription('<:norojo:785955359692161074> Muy pocos argumentos.\n\nUso:\n`mute [usuario] <tiempo o motivo> <motivo>`')
                embed.setColor('RED')
                embed.setFooter('[] = obligatorio, <> = opcional')
                return send(embed)
            }
            let rol = message.guild.roles.cache.get('775812494312210512')
            if (!rol) return
            const miembro = message.guild.members.resolve(m)
            if (args[1] && args[1].match(/^\d(d|s|m|h)/i)) {
                let motivo = args.slice(2).join(' ')
                miembro.roles.add(rol)
                const embed2 = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
                    .setTimestamp()
                    .setDescription(`<@${miembro.id}> ha sido silenciado por <@${message.author.id}> por ${ms(ms(args[1]))} con el motivo: ${motivo ? motivo : 'Sin motivo'}`)
                    .setColor('GREEN')
                send(embed2)
                setTimeout(() => {
                    miembro.roles.remove(rol)
                    const embed3 = new Discord.MessageEmbed()
                        .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
                        .setTimestamp()
                        .setDescription(`<@${miembro.id}> ha sido desmuteado automáticamente`)
                        .setColor('GREEN')
                    send(embed3)
                }, ms(args[1]))
            } else {
                miembro.roles.add(rol)
                let motivo = args.slice(1).join(' ')
                const embed4 = new MessageEmbed()
                    .setTitle('Nuevo Mute Permanente')
                    .setTimestamp()
                    .setColor('GREEN')
                    .setDescription(`<@${miembro.id}> ha sido muteado indefinidivamente. Motivo: ${motivo ? motivo : 'Sin motivo.'}`)
                send(embed4)
            }

            embed.setColor('GREEN')
            embed.setDescription(`<:siverde:784147389669572619> ${miembro.tag} ha sido muteado del servidor.\nMuteado por: ${message.author.tag}\nTiempo: ${args[1] ? args[1] : 'Permanetemente'}\n**[Click aquí](${message.url})**`)
            embed.setTitle('Usuario Silenciado')
            client.channels.cache.get('839665670425018388').send({embeds: [embed]})
        } catch (err) {
            embed.setColor('RED')
            embed.setDescription('<:norojo:785955359692161074> No tengo permisos suficientes para mutear este miembro.\n\nProbalemente por la jerarquía de mi rol.')
            send(embed)
        }
    }
}
