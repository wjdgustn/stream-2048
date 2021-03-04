let chat;
const channel = location.hash.slice(1);
if(!channel) alert('채널 이름이 누락되었습니다. URL 뒤에 #채널명 을 붙여주세요.');
else chat = new WebSocket('wss://irc-ws.chat.twitch.tv');

chat.onopen = async () => {
    chat.send(`PASS SCHMOOPIIE`);
    chat.send(`NICK justinfan1234`);
    chat.send(`USER justinfan1234 8 * :justinfan1234`);
    chat.send(`join #${channel}`);

    console.log(`Joined ${channel}`);
}

chat.onmessage = async ev => {
    const data = ev.data;

    if(data.startsWith('PING')) return chat.send('PONG');
    if(!data.includes('PRIVMSG')) return;

    const text = data.split('PRIVMSG ')[1].split(':')[1].trim();

    if(text.startsWith('`')) {
        let time = 0;

        for(let t of text.slice(1).split('')) {
            if(run(t, channel, data, time)) time += 200;
        }
    }
    else run(text, channel, data);
}

function fakeKey(key, time) {
    setTimeout(() => {
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
    }, time);
}

function run(text, channel, data, time) {
    switch(text) {
        case 'w':
        case 'ㅈ':
        case 'up':
        case 'ㅕㅔ':
        case '위':
        case '8':
            fakeKey(38, (time || 0));
            return true;
        case 's':
        case 'ㄴ':
        case 'down':
        case '애주':
        case '아래':
        case '2':
            fakeKey(40, (time || 0));
            return true;
        case 'a':
        case 'ㅁ':
        case 'left':
        case 'ㅣㄷㄽ':
        case 'ㅣㄷㄹㅅ':
        case '왼쪽':
        case '4':
            fakeKey(37, (time || 0));
            return true;
        case 'd':
        case 'ㅇ':
        case 'right':
        case '갸홋':
        case '오른쪽':
        case '6':
            fakeKey(39, (time || 0));
            return true;
        case 'reset':
        case 'ㄱㄷㄴㄷㅅ':
            if(data.startsWith(`:${channel}!`)) fakeKey(82, (time || 0));
            return true;
        default:
            return false;
    }
}