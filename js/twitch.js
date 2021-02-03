let config;
const chat = new WebSocket('wss://irc-ws.chat.twitch.tv');

chat.onopen = async () => {
    let config_req = await fetch('config.json');
    config = JSON.parse(await config_req.text());

    chat.send(`PASS SCHMOOPIIE`);
    chat.send(`NICK justinfan1234`);
    chat.send(`USER justinfan1234 8 * :justinfan1234`);
    chat.send(`join #${config.channel}`);

    console.log(`Joined ${config.channel}`);
}

chat.onmessage = async ev => {
    const data = ev.data;

    if(data.startsWith('PING')) return ws.send('PONG');
    if(!data.includes('PRIVMSG')) return;

    const text = data.split('PRIVMSG ')[1].split(':')[1].trim();

    switch(text) {
        case 'u':
        case 'up':
            fakeKey(38);
            break;
        case 'd':
        case 'down':
            fakeKey(40);
            break;
        case 'l':
        case 'left':
            fakeKey(37);
            break;
        case 'r':
        case 'right':
            fakeKey(39);
            break;
        case 'reset':
            if(data.startsWith(`:${config.channel}`)) fakeKey(82);
            break;
    }
}

function fakeKey(key) {
    document.dispatchEvent(
        new KeyboardEvent("keydown", {
            keyCode: key
        })
    );
    document.dispatchEvent(
        new KeyboardEvent("keyup", {
            keyCode: key
        })
    );
}