const db = require('../../models/warns')
const moment = require('moment')

module.exports = {
    name: 'warn',
    async execute(client, message, args, Discord, send) {
        let embed = new Discord.MessageEmbed()
        embed.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()
        if (!message.member.roles.cache.has('797522728357855243')) {
            embed.setDescription('<:norojo:785955359692161074> Sin permisos.\nNo tienes los permisos suficientes para usar este comando.')
            embed.setColor('RED')
            return send(embed)
        }
        const miembro = message.mentions.users.first()
        if (!miembro) {
            embed.setDescription('<:norojo:785955359692161074> Muy pocos argumentos.\n\nUso:\n`warn [usuario] [motivo]`')
            embed.setColor('RED')
            return send(embed)
        }
        let fecha = moment().format('DD-MM-YYYY')
        let motivo = args.slice(1).join(" ")
        if (!motivo) {
            embed.setDescription('<:norojo:785955359692161074> Muy pocos argumentos.\n\nUso:\n`warn [usuario] [motivo]`')
            embed.setColor('RED')
            return send(embed)
        }
        db.findOne({ usuario: miembro.id }, async (err, data) => {
            if (err) client.error(err)
            if (!data) {
                data = new db({
                    usuario: miembro.id,
                    motivo: [
                        {
                            mod: message.author.id,
                            motivo: motivo,
                            fecha: fecha
                        }
                    ]
                })
            } else {
                let obj = {
                    mod: message.author.id,
                    motivo: motivo,
                    fecha: fecha
                }
                data.motivo.push(obj)
            }
            await data.save()
        })
        try {
            embed.setColor('RED')
            embed.setDescription('Has sido advertido, Motivo: ' + motivo)
            await miembro.send(embed)
        } catch (err) { /* nada jaja */ }

        let embed2 = new Discord.MessageEmbed()
        embed2.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        embed2.setTimestamp()
        embed2.setColor('GREEN')
        const warn = await db.findOne({ usuario: miembro.id })
        // if (warn) embed2.setDescription(`<@${miembro.id}> ha sido warneado.\nMotivo: ${motivo}\n\nWarns totales: ${warn.motivo.length}`)
        embed2.setDescription(`<@${miembro.id}> ha sido warneado.\nMotivo: ${motivo} ${warn ? '\n\nWarns totales: ' + warn.motivo.length : ''}`)
        send(embed2)
        client.channels.cache.get('839665670425018388').send(embed2)

    }
}