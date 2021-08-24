const backup = require('discord-backup');
module.exports = {
    name: 'cargar-backup',
    aliases: [ 'cargarbackup', 'loadbackup' ],
    dev: true,
    async execute(client, message, args, Discord, send) {
        const backupID = args[0]
        let embed = new Discord.MessageEmbed()
            embed.setAuthor(
                message.author.username,
                message.author.displayAvatarURL({ dynamic: true })
            )
            embed.setTimestamp()
        if (!args[ 0 ]) {
            embed.setColor('RED')
            embed.setDescription('<:norojo:785955359692161074> Debes introducir la ID de un backup.')
            return send(embed)
        }
        
        backup.fetch(backupID).then(() => {
            embed.setDescription(':warning: Todos los canales, roles, y configuraciones serán eliminadas y restablecidas al backup. Quieres continuar? Envía `confirmar` o `cancelar`')
            embed.setColor('YELLOW')
            send(embed)

            const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && [ 'confirmar', 'cancelar' ].includes(m.content), {
                time: 60000,
                max: 1
            });
            collector.on('collect', (m) => {
                const confirm = m.content === 'confirmar';
                collector.stop();
                if (confirm) {

                    backup.load(backupID, message.guild).then(() => {

                        return send('Backup cargado correctamente!');

                    }).catch((err) => {

                        if (err === 'No encontré ese backup')
                            return send('<:norojo:785955359692161074> No encontré el backup  ' + backupID);
                        else
                            return send('<:norojo:785955359692161074> Un error ocurrió: ' + (typeof err === 'string') ? err : JSON.stringify(err));

                    });

                } else {
                    return send('Comando Cancelado.');
                }
            })

            collector.on('end', (collected, reason) => {
                if (reason === 'time')
                    return send('Comando cancelado pq te tardaste mucho');
            })

        }).catch(() => {
            embed.setColor('RED')
            embed.setDescription('No encontré el backup ' + backupID)
            return send(embed)
        });
    }
}