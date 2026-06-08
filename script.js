const taskList = [];
const listElement = document.getElementById("tasklist");
const status = document.getElementById("status");

// Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = false;
recognition.lang = 'en-US';

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    status.innerText = `Heard: "${transcript}"`;

    if (transcript.startsWith("naya task")) {
        const taskText = transcript.replace("naya task", "").trim();
        if (taskText) addTask(taskText);
    } 
    else if (transcript.startsWith("delete task")) {
        const match = transcript.match(/\d+/);
        const num = match ? parseInt(match[0]) - 1 : NaN;
        if (!isNaN(num)) deleteTask(num);
    } 
    else if (transcript.startsWith("mark task")) {
        const match = transcript.match(/\d+/);
        const num = match ? parseInt(match[0]) - 1 : NaN;
        if (!isNaN(num)) markTaskDone(num);
    }
};

function addTask(task) {
    taskList.push({ text: task, done: false });
    renderTasks();
}

function deleteTask(num) {
    if (taskList[num]) {
        taskList.splice(num, 1);
        renderTasks();
    }
}

function markTaskDone(num) {
    if (taskList[num]) {
        taskList[num].done = true;
        renderTasks();
    }
}

function renderTasks() {
    listElement.innerHTML = "";

    taskList.forEach((task, idx) => {
        const li = document.createElement("li");
        li.innerText = `${idx + 1}. ${task.text} ${task.done ? "✅" : ""}`;
        listElement.appendChild(li);
    });
}

function startVoice() {
    status.innerText = "Listening...";
    recognition.start();
}

document.getElementById("startBtn").addEventListener("click", startVoice);