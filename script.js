const openModalBtn = document.getElementById("open-modal");
const modal = document.getElementById("modal");
const answer = document.getElementById("answer");
const saveEntryBtn = document.getElementById("save-btn");
const prompts = document.getElementById("prompts");
const input = document.getElementById("input");
const entry = document.getElementById("entry")

openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
});

saveEntryBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const selectedPrompt = prompts.value;
    const userInput = input.value;

    const newEntry = document.createElement("div");
    newEntry.classList.add("entry");
    newEntry.innerHTML = `
        <h2>${selectedPrompt}</h2>
        <p>${userInput}</p>
    `;

    answer.appendChild(newEntry);

    modal.style.display = "none";
    answer.style.display = "block";
    input.value = "";
});
