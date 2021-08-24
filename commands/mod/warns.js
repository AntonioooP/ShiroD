const db = require('../../models/warns')
module.exports = {
    name: 'warns',
    aliases: ['warnings'],
    async execute(client, message, args, Discord, send) {
        let embed = new Discord.MessageEmbed()
        embed.setAuthor(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
        embed.setTimestamp()
        if (!message.member.roles.cache.has('797522728357855243')) {
            embed.setDescription('<:norojo:785955359692161074> Sin permisos.\nNo tienes los permisos suficientes para usar este comando.')
            embed.setColor('RED')
            return send(embed)
        }
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if (!user) {
            embed.setDescription('<:norojo:785955359692161074> Muy pocos argumentos.\n\nUso:\n`warns [usuario]`')
            embed.setColor('RED')
            return send(embed)
        }
        db.findOne({ usuario: user.user.id }, async (err, data) => {
            if (err) throw err;
            if (data?.motivo?.length) {
                let desc = data.motivo.map((a, i) => `**${i + 1}** | **Staff:** <@${a.mod}>\n**Motivo:** ${a.motivo}\n**Fecha:** ${a.fecha}\n`)
                embed.setColor('BLUE')
                embed.setDescription(desc)
                embed.setFooter('Warns totales: ' + data.motivo.length)
                send(embed)
            } else {
                embed.setColor('RED')
                embed.setDescription('<:norojo:785955359692161074> El usuario no tiene warns.')
                send(embed)
            }
        })
    }
}