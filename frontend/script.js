const BASE_URL = "http://localhost:3000/api";

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
      options: [option1, option2]
    })
  });

  const data = await res.json();
  alert("Poll Created! ID: " + data._id);
}

// Vote
async function vote() {
  const pollId = document.getElementById("pollId").value;
  const userId = document.getElementById("userId").value;
  const optionIndex = document.getElementById("optionIndex").value;

  const res = await fetch(`${BASE_URL}/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      pollId,
      userId,
      optionIndex
    })
  });

  const data = await res.json();
  alert(data.message || "Voted!");
}

// Get Results
async function getResults() {
  const pollId = document.getElementById("resultPollId").value;

  const res = await fetch(`${BASE_URL}/results/${pollId}`);
  const data = await res.json();

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  data.options.forEach(opt => {
    resultsDiv.innerHTML += `
      <p>${opt.text} - ${opt.votes} votes (${opt.percentage}%)</p>
    `;
  });
}