function importAudio() {}
function addToSoundboard(id) {}
function removeFromSoundboard(id) {}
function playSound(id) {}

async function importAudioFromYoutube(url) {
  const response = await fetch("https://soundboard-backend-phi.vercel.app", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url })
  });

  const blob = await response.blob(); // le MP3 reçu
  const audioUrl = URL.createObjectURL(blob); // URL locale utilisable

  addToLibrary(audioUrl); // tu vas créer cette fonction
}

let library = [];

function addToLibrary(audioUrl) {
  const sound = {
    id: Date.now(),
    url: audioUrl
  };

  library.push(sound);
  displayLibrary();
}
