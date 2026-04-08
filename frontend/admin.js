const BASE_URL = "http://localhost:3000/api";

let ADMIN_PASSWORD = "";
let currentPollId = null;

// Login
function login() {
  const pass = document.getElementById("adminPass").value;

  if (!pass) return alert("Enter password");

  ADMIN_PASSWORD = pass;

  document.getElementById("loginBox").style.display = "none";
  document.getElementById("adminPanel").style.display = "block";

  loadLatestPoll();
}

// Load latest poll
async function loadLatestPoll() {
  const res = await fetch(`${BASE_URL}/results/latest`);
  const data = await res.json();

  currentPollId = data._id;
}

// Create Poll
async function createPoll() {
  const question = document.getElementById("question").value;
  const option1 = document.getElementById("option1").value;
  const option2 = document.getElementById("option2").value;

  const res = await fetch(`${BASE_URL}/poll`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      question,
      options: [option1, option2],
      adminPassword: ADMIN_PASSWORD
    })
  });

  const data = await res.json();

  if (data.error) {
    alert(data.error);
  } else {
    alert("✅ Poll Created");
    currentPollId = data._id;
  }
}

// Load Results
async function loadResults() {
  const res = await fetch(
    `${BASE_URL}/results/${currentPollId}?adminPassword=${ADMIN_PASSWORD}`
  );

  const data = await res.json();

  if (data.error) {
    return alert(data.error);
  }

  document.getElementById("results").innerHTML = `
    ${data.options.map(opt => `
      <p>${opt.text} - ${opt.votes} votes (${opt.percentage})</p>
    `).join("")}
  `;
}