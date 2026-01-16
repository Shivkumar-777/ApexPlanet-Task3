/* THEME */
function toggleTheme() {
  document.body.classList.toggle("dark");
}

/* DECODE HTML */
function decodeHTML(text) {
  const t = document.createElement("textarea");
  t.innerHTML = text;
  return t.value;
}

/* QUIZ */
let currentQ = 0;
let score = 0;
const totalQ = 10;
let quizData = [];

async function loadQuiz() {
  const loader = document.getElementById("loader");
  loader.style.display = "block";

  const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");
  const data = await res.json();
  quizData = data.results;

  loader.style.display = "none";
  showQuestion();
}

function showQuestion() {
  if (currentQ >= totalQ) {
    document.getElementById("question").textContent = "Quiz Completed 🎉";
    document.getElementById("options").innerHTML = "";
    document.getElementById("quizCount").textContent =
      `Final Score: ${score} / ${totalQ}`;
    return;
  }

  const q = quizData[currentQ];
  document.getElementById("quizCount").textContent =
    `Question ${currentQ + 1} / ${totalQ}`;

  document.getElementById("question").textContent =
    decodeHTML(q.question);

  document.getElementById("quizResult").textContent = "";

  const optionsEl = document.getElementById("options");
  optionsEl.innerHTML = "";

  const answers = [...q.incorrect_answers, q.correct_answer]
    .map(a => decodeHTML(a))
    .sort(() => Math.random() - 0.5);

  answers.forEach(ans => {
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "quiz";

    radio.onclick = () => {
      if (ans === decodeHTML(q.correct_answer)) {
        score++;
        document.getElementById("quizResult").textContent = "Correct ✅";
      } else {
        document.getElementById("quizResult").textContent = "Wrong ❌";
      }

      document.getElementById("score").textContent =
        `Score: ${score} / ${totalQ}`;

      setTimeout(() => {
        currentQ++;
        showQuestion();
      }, 1000);
    };

    label.appendChild(radio);
    label.append(" " + ans);
    optionsEl.appendChild(label);
  });
}

loadQuiz();

/* IMAGE API */
const galleryImg = document.getElementById("galleryImg");
function loadImage() {
  galleryImg.src =
    "https://picsum.photos/600/400?random=" + Math.floor(Math.random() * 1000);
}
loadImage();
setInterval(loadImage, 4000);

/* JOKE API */
async function getJoke() {
  const jokeEl = document.getElementById("joke");
  jokeEl.textContent = "Loading...";
  const res = await fetch("https://official-joke-api.appspot.com/random_joke");
  const data = await res.json();
  jokeEl.textContent = `${data.setup} — ${data.punchline}`;
}
getJoke();
