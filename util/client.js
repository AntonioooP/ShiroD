const chalk = require('chalk'),
    { Client, Collection } = require('discord.js'),
    { appendFileSync } = require('fs'),
    { connect } = require('mongoose');

module.exports = class extends Client {
    constructor(a) {
        super(a)
        this.owners = [ '513773028606476308', '574096781361545217' ]
        this.config = require('../config.json')
        this.commands = new Collection()
        this.db(this.config.mongo)
        this.statuses([ 's/help', '@Shiro' ])
        this.login(this.config.token)
    }
    db(str) {
        connect(str, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            userFindAndModify: false
        })
        .then(() => console.log(chalk.green('Connected to DB')))
        .catch(console.log)
    }
    error(error) {
        let err = new Error(error)
        console.log(chalk.red('Error! Client Error\n\n' + err.stack))
        appendFileSync('./errors.log', `Client Error: ${err.stack}\n\n`)
    }
    statuses(arr) {
        setInterval(() => this.user.setActivity(arr[Math.floor(Math.random() * arr.length)], {type: 'WATCHING'}), 20000)
    }
}