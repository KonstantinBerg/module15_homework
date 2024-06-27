// Task 3
ocument.addEventListener('DOMContentLoaded', () => {
    const wsUrl = 'wss://echo-ws-service.herokuapp.com';
    const ws = new WebSocket(wsUrl);

    const chatWindow = document.getElementById('chat-window');
    const messageInput = document.getElementById('message-input');
    const sendBtn = document.getElementById('send-btn');
    const geoBtn = document.getElementById('geo-btn');

    function addMessage(content, isResponse = false) {
        const messageElem = document.createElement('div');
        messageElem.className = isResponse ? 'chat-response' : 'chat-message';
        messageElem.textContent = content;
        chatWindow.appendChild(messageElem);
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    sendBtn.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            addMessage(message);
            ws.send(message);
            messageInput.value = '';
        }
    });

    geoBtn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            addMessage('Геолокация не поддерживается вашим браузером', true);
        } else {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                const geoUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=18/${latitude}/${longitude}`;
                addMessage(`Геолокация: ${geoUrl}`);
                ws.send(`Геолокация: ${geoUrl}`);
            }, () => {
                addMessage('Невозможно получить ваше местоположение', true);
            });
        }
    });

    ws.addEventListener('message', (event) => {
        addMessage(event.data, true);
    });
});
