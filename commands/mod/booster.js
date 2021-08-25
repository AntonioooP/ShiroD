module.exports = {
    name: 'booster',
    aliases: ['rol'],
    async execute(client, message, args, Discord, send) {
        if (!message.member.permissions.has('MANAGE_ROLES')) return send('No tienes permisos suficientes')

        const split = args
            .join(' ')
            .trim()
            .split('$')
            .map((a) => a.trim())
            .map((a) => a.replace(/<@!?\d+>/g, ''))
        const m = message.mentions.users.first()
        if (!m) return send('Debes mencionar a alguien para poder crearle el rol booster')
        message.guild.roles
            .create({
                name: split[0],
                color: split[1],
                permissions: 104189761n,
                mentionable: false,
                position: 138,
                hoist: true,
                reason: `Booster rol para ${m.tag}`
            })
            .then((role) => {
                message.guild.members.resolve(m).roles.add(role, 'Rol Booster')
                return send(`El rol ${role} ha sido creado: Nombre: \`${role.name}\`, Color: \`${role.color ? role.color.toString(16) : 'Sin color'}\``)
            })
            .catch((err) => send('Hubo un error en esto, ' + err.message))
    }
}
