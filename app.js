// ----------------------
// CONFIG
// ----------------------
const BACKEND_URL = "https://soundboard-backend-phi.vercel.app/extract"; 
// ⚠️ Mets ici ton URL Vercel


// ----------------------
// LIBRARY
// ----------------------
let library = [];

function addToLibrary(audioUrl) {
  const sound = {
    id: Date.now(),
    url: audioUrl
  };

  library.push(sound);
  displayLibrary();
}

function displayLibrary() {
  const container = document.getElementById("library");
  container.innerHTML = "";

  library.forEach(sound => {
    const div = document.createElement("div");
    div.className = "library-item";

    div.innerHTML = `
      <button onclick="playSound('${sound.url}')">▶️ Play</button>
      <button onclick="addToSoundboard('${sound.id}')">➕ Add to Soundboard</button>
    `;

    container.appendChild(div);
  });
}


// ----------------------
// SOUNDBOARD
// ----------------------
let soundboard = [];

function addToSoundboard(id) {
  const sound = library.find(s => s.id == id);
  soundboard.push(sound);
  displaySoundboard();
}

function displaySoundboard() {
  const container = document.getElementById("soundboard");
  container.innerHTML = "";

  soundboard.forEach(sound => {
    const btn = document.createElement("div");
    btn.className = "sound-button";
    btn.innerText = "Sound";
    btn.onclick = () => playSound(sound.url);
    container.appendChild(btn);
  });
}


// ----------------------
// AUDIO PLAYER
// ----------------------
function playSound(url) {
  const audio = new Audio(url);
  audio.play();
}


// ----------------------
// IMPORT YOUTUBE
// ----------------------
async function importAudioFromYoutube(url) {
  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  const blob = await response.blob();
  const audioUrl = URL.createObjectURL(blob);

  addToLibrary(audioUrl);
}


// ----------------------
// EVENT LISTENER
// ----------------------
document.getElementById("import-btn").addEventListener("click", () => {
  const url = document.getElementById("youtube-url").value.trim();
  if (url.length < 5) {
    alert("Entre un lien YouTube valide");
    return;
  }
  importAudioFromYoutube(url);
});
