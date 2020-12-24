
const { Client } = require('irc-framework');
const connect = ({
    host,
    username,
    port = 6667,
}) => new Promise((resolve, reject) => {
    const bot = new Client();

    bot.connect({
        host,
        port,
        nick: username,
        username,
        gecos: username,
        version: username
    });

    bot.on('registered', function ({
        tags
    }) {
        resolve({
            type: "actionTypes.REGISTERED",
            payload: {
                server: {
                    host,
                    username,
                    port,
                    tags,
                }
            },
        });
    });
})

connect({
    host: 'irc.freenode.net',
    port: 6667,
    username: 'prawnsbot'
}).then(console.log)
