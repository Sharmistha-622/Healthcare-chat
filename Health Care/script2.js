document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript Loaded Successfully! ✅");
    showSection('chatbot-ui'); 
});

let sectionHistory = []; 

function showSection(sectionId) {
    let sections = document.querySelectorAll(".container");
    sections.forEach(section => section.style.display = "none");

    let targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.style.display = "block";

         
        if (sectionHistory.length === 0 || sectionHistory[sectionHistory.length - 1] !== sectionId) {
            sectionHistory.push(sectionId);
        }
    } else {
        console.error(`Section with ID '${sectionId}' not found!`);
    }
}

function goBack() {
    if (sectionHistory.length > 1) {
        sectionHistory.pop();  
        let previousSection = sectionHistory[sectionHistory.length - 1];  
        showSection(previousSection); 
    } else {
        console.warn("No previous section available!");
    }
}

function validateLogin() {
    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();

    if (username === "" || email === "" || phone === "") {
        alert("Please fill in all fields before logging in.");
    } else {
        showSection('mood-tracker'); 
    }
}

function setMood(mood) {
    if (!mood) {
        console.error("No mood selected!");
        return;
    }

    const messages = {
        happy: "Great! You are happy 😊 Here are some motivational quotes to make you even happier!",
        sad: "Don't worry, here are some jokes and relaxing music to cheer you up!",
        anxious: "Try these relaxation exercises and calming music.",
        depressed: "Opening chatbot for help... Also, here are some useful resources!"
    };

    let moodMessage = messages[mood] || "Please select a valid mood.";

    let moodContent = `
        <h3>${mood === "happy" ? "😀 Stay Happy!" :
            mood === "sad" ? "😔 Don't Be Sad!" :
            mood === "anxious" ? "😟 Take a Deep Breath" :
            "💙 You Are Not Alone"}</h3>
        <p>${moodMessage}</p>
        <button onclick="goBack()">⬅️ Back</button>
        <button onclick="showSection('remedies')">Next</button>
    `;

    let remedyContainer = document.getElementById("remedy-content");
    if (remedyContainer) {
        remedyContainer.innerHTML = moodContent;
    } else {
        console.error("Remedy container not found!");
    }

    showSection('remedies');
}

function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    let chatWindow = document.getElementById("chat-window");

    if (userInput.trim() === "") return;

    let userMessage = `<p><strong>You:</strong> ${userInput}</p>`;
    chatWindow.innerHTML += userMessage;
    document.getElementById("user-input").value = "";

    let botReply = getBotReply(userInput);

    setTimeout(() => {
        let botMessage = `<p><strong>Bot:</strong> ${botReply} 😊</p>`;
        chatWindow.innerHTML += botMessage;
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 1000);
}

function getBotReply(message) {
    let responses = {
        "hello": "Hi there! How can I help you today?",
        "how are you": "I'm just a bot, but I'm here to help!",
        "bye": "Goodbye! Take care 😊",
        "help": "I can assist you with your mood and well-being. Just let me know how you feel!"
    };

    let lowerMessage = message.toLowerCase();
    return responses[lowerMessage] || "I'm here to help! Can you please clarify your question?";
}

  
let mediaRecorder;
let audioChunks = [];

document.getElementById('start-recording').addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        
        document.getElementById('start-recording').disabled = true;
        document.getElementById('stop-recording').disabled = false;

        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            document.getElementById('audio-player').src = audioUrl;
            document.getElementById('download-link').href = audioUrl;
            document.getElementById('download-link').style.display = 'block';
        };
    } catch (error) {
        alert("Microphone access denied! Please allow microphone access.");
    }
});

document.getElementById('stop-recording').addEventListener('click', () => {
    mediaRecorder.stop();
});
//mind relax activies
function loadSession(sessionType, event) {
    if (event) event.preventDefault(); 

    let contentDiv = document.getElementById("session-content");

    let sessionData = {
        "guided-meditation": `
            <h3>🧘 Guided Meditation</h3>
            <p>Follow this guided meditation to calm your mind and reduce stress.</p>
            <iframe width="100%" height="200" src="https://www.youtube.com/embed/inpok4MKVLM" allowfullscreen></iframe>
        `,
        "breathing-exercises": `
            <h3>🌬️ Breathing Exercises</h3>
            <p>Try this 4-7-8 breathing technique to reduce anxiety:</p>
            <ul>
                <li>Inhale through your nose for 4 seconds.</li>
                <li>Hold your breath for 7 seconds.</li>
                <li>Exhale slowly through your mouth for 8 seconds.</li>
            </ul>
        `,
        "stress-management": `
            <h3>💆 Stress Management Tips</h3>
            <p>Follow these steps to manage stress effectively:</p>
            <ul>
                <li>Practice mindfulness daily.</li>
                <li>Get enough sleep and eat a balanced diet.</li>
                <li>Engage in physical activities like yoga or jogging.</li>
            </ul>
        `,
        "online-consultation": `
            <h3>💬 Talk to a Therapist</h3>
            <p>You can book an online therapy session with a certified therapist.</p>
            <button onclick="window.open('https://www.betterhelp.com/', '_blank')">Book a Session</button>
        `
    };

    if (sessionData[sessionType]) {
        contentDiv.innerHTML = sessionData[sessionType];
    } else {
        contentDiv.innerHTML = "<p>Session not found.</p>";
    }
}
