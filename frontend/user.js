const BASE_URL = "http://localhost:3000/api";

let currentPollId = null;

// Load latest poll
async function loadLatestPoll() {
  const res = await fetch(`${BASE_URL}/results/latest`);
  const data = await res.json();

  if (data.error) {
    document.getElementById("pollDisplay").innerHTML =
      "<p>No active polls yet</p>";
    return;
  }

  currentPollId = data._id;

  document.getElementById("pollDisplay").innerHTML = `
    <h3>${data.question}</h3>
    ${data.options.map((opt, i) => `
      <button onclick="vote(${i})">${opt.text}</button>
    `).join("")}
  `;
}

// Vote
async function vote(optionIndex) {
  const res = await fetch(`${BASE_URL}/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      pollId: currentPollId,
      optionIndex
    })
  });

  const data = await res.json();

  if (data.error) {
    alert(data.error);
  } else {
    alert("✅ Vote recorded!");
  }
}

window.onload = loadLatestPoll;