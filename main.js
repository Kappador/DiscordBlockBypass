const req = require('request-promise');
let {token} = require('./config.json');
const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

let dmChannel = "x";

createDmChannel = (rec) => {
    return new Promise(resolve => {
        req("https://discord.com/api/v6/users/@me/channels", {
            method: "POST",
            headers: {
                "Authorization" : token,
                "Content-Type" : "application/json",
                "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
            },
            json: {
                "recipient_id": rec
            }
        })
        .then(data => {
            resolve(data);
        })
    })
}

sendMessage = (content) => {
    return new Promise(resolve => {
        req(`https://discord.com/api/v6/channels/${dmChannel}/messages`, {
            method: "POST",
            headers: {
                "Authorization" : token,
                "Content-Type" : "application/json",
                "User-Agent" : "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
            },
            json: {
                "content": content,
                "nonce" : null,
                "tts" : false
            }
        })
        .then(data => {
            resolve(1);
        })
    })
}

askContent = () => {
    rl.question("Message content: ", (content) => {
        sendMessage(content).then(res => {
            console.log("Successfully messaged that guy");
            askContent();
        })
    });
}

rl.question("Recipients userid: ", (uid) => {

    createDmChannel(uid).then(data => {
        dmChannel = data.id;
        askContent();
    });

});