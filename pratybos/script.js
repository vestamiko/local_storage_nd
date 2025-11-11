const button = document.getElementById("kavosFotoBtn");
const img = document.getElementById("kavosNuotrauka");

button.addEventListener("click", async () => {
  try {
    const response = await fetch("https://coffee.alexflipnote.dev/random.json");
    const dataLink = await response.json();
    img.src = dataLink.file + "?v=" + new Date().getTime();
  } catch (e) {
    console.error(e);
  }
});

