const client = require('../shiro'),
    prefix = 's/',
    Discord = require('discord.js')

client.on('messageCreate', msg)
client.on('messageUpdate', msg)

async function msg(message, newmessage) {
    if (message.author.bot) return
    if (!message.guild) return
    if (newmessage) {
        if (message.content == newmessage.content) return
        message = newmessage
    }
    const send = (txt, stat) => {
        if (stat) console.log(stat)
        message.channel.send(typeof txt == 'object' ? {embeds: [txt]} : {content: txt}).catch((e) => {
            if (e.message == 'Missing Permissions') return message.channel.send({content: 'No tengo permisos.'}).catch(console.log)
        })
    }
    if (!message.content.match(new RegExp(`^(${prefix}|<@!?${client.user.id}>)\\s*.`, 'i'))) return
    let [cmd, ...args] = message.content.match(new RegExp(`^${prefix}`, 'i')) ? message.content.slice(2).split(/ +/) : message.content.replace(new RegExp(`<@!?${client.user.id}>\\s*`)).split(/ +/)
    cmd = cmd.toLowerCase()
    const command = client.commands.get(cmd) || client.commands.find((command) => command.aliases && command.aliases.includes(cmd))
    if (!command) {
        const embed = new Discord.MessageEmbed().setTitle('<:norojo:785955359692161074> Comando Incorrecto').setDescription(`No he encontrado ese comando, puedes ver mis comandos usando **s/help**`).setTimestamp().setFooter(`Creado con <3 x Antonii`).setColor('#F21515')
        return send(embed)
    }
    if (command.dev && !client.owners.includes(message.author.id)) return

        command.execute(client, message, args, Discord, send).catch((err) => {
        send('Hubo un error al ejecutar el comando. Intenta más tarde. ' + err.message)
        client.error(err)
    })
}
