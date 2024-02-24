async function message() {
    const textMessage=await document.getElementById("Message").value;
    await fetch('https://api.telegram.org/bot6271272669:AAFvdMfl_iTk-_VY-2G0nU_bBtTylsnZFhY/sendMessage', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'entities': '',
            'reply_to_message_id': '',
            'disable_notification': '',
            'chat_id': '952155820',
            'text': `${textMessage}`,
            'parse_mode': '',
            'allow_sending_without_reply': '',
            'disable_web_page_preview': '',
            'reply_markup': ''
        })
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Ошибка:', error));
}