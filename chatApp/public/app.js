document.addEventListener('DOMContentLoaded', (event) => {
    const socket = io(); // Initialize Socket.io

    let username = localStorage.getItem('username');
    if (!username) {
        username = prompt("Please enter your username:");
        localStorage.setItem('username', username);
    }

    const messagesDiv = document.getElementById('messages');
    const newMessageInput = document.getElementById('newMessage');
    const sendMessageButton = document.getElementById('sendMessage');

    sendMessageButton.addEventListener('click', () => {
        const messageText = newMessageInput.value.trim();
        if (messageText) {
            const messageData = { username, message: messageText };
            socket.emit('chat message', messageData); // Send the message to the backend
            newMessageInput.value = '';
        }
    });

    socket.on('chat message', (data) => {
        addMessage(data.username, data.message); // Display the received message
    });

    function addMessage(username, message) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = `${username}: ${message}`;
        messagesDiv.appendChild(messageDiv);
    }
});
