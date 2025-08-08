import { promptsData } from './data.js';

const openModalBtn = document.getElementById("open-modal");
const modal = document.getElementById("modal");
const answer = document.getElementById("answer");
const saveEntryBtn = document.getElementById("save-btn");
const closeBtn = document.getElementById("close-btn");
const prompts = document.getElementById("prompts");
const input = document.getElementById("input");
const promptRadios = document.getElementById("prompt-radios");

// 1. Render radio buttons from tags
function getTagsFromData(data) {
    return data.map(item => item.tag);
}

function renderPromptsRadios() {
    const tags = getTagsFromData(promptsData);
    let html = '';
    tags.forEach(tag => {
        html += `
            <div class="radio">
                <label for="${tag}">${tag}</label>
                <input type="radio" id="${tag}" value="${tag}" name="tags">
            </div>
        `;
    });
    promptRadios.innerHTML = html;
}

// 2. Get selected radio tag
function getSelectedTag() {
    const selected = document.querySelector('input[name="tags"]:checked');
    return selected ? selected.value : null;
}

// 3. Get prompts for tag
function getPromptsForTag(tag) {
    const found = promptsData.find(item => item.tag === tag);
    return found ? found.prompt : [];
}

// 4. Populate <select> with filtered prompts
function populatePromptSelect(promptsArr) {
    prompts.innerHTML = ''; // clear old options
    promptsArr.forEach(p => {
        const option = document.createElement("option");
        option.value = p;
        option.textContent = p;
        prompts.appendChild(option);
    });
}

// 5. Open modal and update prompts
openModalBtn.addEventListener("click", () => {
    const selectedTag = getSelectedTag();

    if (!selectedTag) {
        alert("Please select a tag first.");
        return;
    }

    const tagPrompts = getPromptsForTag(selectedTag);
    populatePromptSelect(tagPrompts);
    modal.style.display = "flex";
});

// 6. Save entry
saveEntryBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const selectedPrompt = prompts.value;
    const userInput = input.value;

    if (!userInput.trim()) {
        alert("Please write something in your journal entry.");
        return;
    }

    const newEntry = document.createElement("div");
    newEntry.classList.add("entry");
    newEntry.innerHTML = `
        <h3>${selectedPrompt}</h3>
        <p>${userInput}</p>
    `;

    answer.appendChild(newEntry);

    // Close modal
    modal.style.display = "none";

    // Show answers
    answer.style.display = "grid";

    // Clear input and reset radio selection for next entry
    input.value = "";
    const radioButtons = document.querySelectorAll('input[name="tags"]');
    radioButtons.forEach(radio => radio.checked = false);
});

// 7. Close modal
closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
});

// Initial render
renderPromptsRadios();