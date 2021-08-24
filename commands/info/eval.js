module.exports = {
    name: 'eval',
    aliases: ['e'],
    dev: true,
    async execute(client, message, args, Discord, send) {
        if (!args[0]) return send('Debes evaluar algo')
        if (args.join(' ').match(/token/i)) return send('No')
        let Eval
        const embed = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true}))
            .setColor('GREEN')
            .setTimestamp()
            .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
        try {
            if (args.join(' ').includes('await')) Eval = await eval('(async () => {' + args.join(' ') + '})()')
            else Eval = await eval(args.join(' '))
            function str(obj) {
                return JSON.stringify(obj, null, 4)
            }
            function substr(str) {
                if (str.length > 2000) return str.substring(0, 2000) + '...```'
                return str
            }
            let a
            if (typeof (await Eval) == 'object') a = `\`\`\`json\n${str(await Eval)}\`\`\``
            else a = await Eval
            if (a == undefined) a = 'Nada'
            embed
                .addField('A Evaluar:', '```js\n' + args.join(' ') + '```')
                .addField('Evaluado:', substr(a))
                .addField('Tipo', (await Eval) ? typeof Eval : 'Nada')
            send(embed)
        } catch (err) {
            embed.setColor('RED').setTitle(err.name).setDescription(err.toString())
            send(embed)
        }
    }
}
