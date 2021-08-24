const db = require('../../models/warns')

module.exports = {
    name: 'clear',
    aliases: [ 'clearwarns' ],
    async execute(client, message, args, Discord, send) {
        let embed = new Discord.MessageEmbed()
        embed.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            embed.setDescription('<:norojo:785955359692161074> Sin permisos.\nNo tienes los permisos suficientes para usar este comando.')
            embed.setColor('RED')
            return send(embed)
        }
        
        const miembro = message.mentions.users.first()
        if (!miembro) {
            embed.setDescription('<:norojo:785955359692161074> Muy pocos argumentos.\n\nUso:\n`clear [usuario]`')
            embed.setColor('RED')
            return send(embed)
        }

        let w = await db.findOne({ usuario: miembro.id })
        if (w) {
            await db.findOneAndDelete({ usuario: miembro.id })
            embed.setColor('GREEN')
            embed.setDescription('<:siverde:784147389669572619> Todos los warns de <@' + miembro.id + '> han sido eliminados.')
            send(embed)
            
            embed.setDescription(`<:siverde:784147389669572619> Los warns de ${miembro.tag} han sido eliminados.\nEliminados por: ${message.author.tag}\n**[Click aquí](${message.url})**`)
            embed.setTitle('Warns eliminados')
            client.channels.cache.get('839665670425018388').send({embeds: [embed]})

        } else {
            embed.setDescription('<:norojo:785955359692161074> <@' + miembro.id + '> no existe en la base de datos.\nNo tiene ninguna advertencia para eliminar.')
            embed.setColor('RED')
            return send(embed)
        }
    }
}