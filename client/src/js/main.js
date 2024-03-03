import '@/css/style.css'

const botReplies = [
    "Hello! I'm the emergency bot. What seems to be the problem?",
    "Can you please confirm your location?",
    "Help is on the way. Stay on the line and follow instructions.",
    "Are you in a safe location?",
    "Is anyone injured?",
    "Can you describe the individuals involved?",
    "Are they armed?",
    "If possible, try to provide information about any hazards present."
];

let replyIndex = 0;

function addMessageToChat(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;

    const chatMessages = document.getElementById('chat-messages');
    chatMessages.appendChild(messageElement);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

const chatButton = document.getElementById('chat-button');
const chatContainer = document.getElementById('chat-container');

chatButton.addEventListener('click', () => {
    chatContainer.style.display = chatContainer.style.display === 'none' ? 'block' : 'none';
});

const sendButton = document.getElementById('send-button');
const messageInput = document.getElementById('message-input');

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();

    if (message) {
        addMessageToChat(`You: ${message}`);

        replyIndex += 1;
        const reply = botReplies[replyIndex-1];

        const delay = Math.floor(Math.random() * (2000 - 1000 + 1)) + 1000;

        setTimeout(() => {
            addMessageToChat(`Bot: ${reply}`);
        }, delay);       
        
        messageInput.value = '';
    }
});