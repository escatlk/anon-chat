const workerUrl = 'https://YOUR_WORKER_SUBDOMAIN.workers.dev/messages';

async function sendMessage() {
  const msgInput = document.getElementById('msg');
  const text = msgInput.value.trim();
  if (!text) return;
  await fetch(workerUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  msgInput.value = '';
  loadMessages();
}

async function loadMessages() {
  const res = await fetch(workerUrl);
  const messages = await res.json();
  const chatDiv = document.getElementById('chat');
  chatDiv.innerHTML = messages.map(m => `<p>${m.text}</p>`).join('');
  chatDiv.scrollTop = chatDiv.scrollHeight;
}

setInterval(loadMessages, 2000);
loadMessages();
