// PASSWORD STRENGTH VARIABLES
const strengthImg = document.getElementById("strengthImg");
const strengthText = document.getElementById("strengthText");
const strengthBox = document.getElementById("strengthBox");

// INPUTS
const lowercaseInput = document.getElementById("lowercase");
const uppercaseInput = document.getElementById("uppercase");
const numbersInput = document.getElementById("numbers");

// PASSWORD OUTPUT
const passwordResult = document.getElementById("passwordResult");

// BUTTON
const generateBtn = document.getElementById("generateBtn");
const copyBtn = document.getElementById("copyBtn");

// CHARACTERS
const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";

window.onload = () => {
    document.getElementById("passLength").value = "1";
    document.getElementById("symbolsInput").value = "";

    lowercaseInput.checked = false;
    uppercaseInput.checked = false;
    numbersInput.checked = false;

    passwordResult.value = "";
};

// SHOW PASSSWORD STRENGTH
function setStrength(text, color, image) {
    strengthBox.classList.add("show");

    passwordResult.style.backgroundColor = color;
    passwordResult.style.color = "white";

    strengthImg.innerHTML = `<img src="${image}">`;
    strengthText.textContent = text;
}

// REMOVE STRENGTH VISIBILITY
function removeStrengthVisibility() {
    strengthBox.classList.remove("show");

    strengthImg.innerHTML = "";
    strengthText.textContent = "";

    passwordResult.style.backgroundColor = "white";
    passwordResult.style.color = "black";
}

// SHOW AN ERROR
function showError(message) {
    removeStrengthVisibility();
    passwordResult.value = message;
}

// GET SELECTED CHARS FROM USER
function getAllowedChars() {
    const chars = [];
    const symbols = document.getElementById("symbolsInput").value.trim();

    if (lowercaseInput.checked) chars.push(...lowercaseChars);
    if (uppercaseInput.checked) chars.push(...uppercaseChars);
    if (numbersInput.checked) chars.push(...numberChars);

    if (symbols !== "") {
        chars.push(...symbols);
    }

    return chars;
}

// GENERATE PASSWORD
function generatePassword(length, allowedChars) {
    let password = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }

    return password;
}

// CALCULATE ENTROPY FOR PASSWORD STRENGTH
function calculateEntropy(length, charsetSize) {
    return length * Math.log2(charsetSize);
}

// PASSWORD STRENGTH
function updateStrength(entropy) {
    if (entropy < 40) {
        setStrength("Weak", "#ff3f46", "./IMG/weak.png");

    } else if (entropy < 60) {
        setStrength("Medium", "#ff8523", "./IMG/medium.png");

    } else if (entropy < 80) {
        setStrength("Good", "#99c92a", "./IMG/good.png");

    } else {
        setStrength("Strong", "#5bb254", "./IMG/strong.png");

    }
}

// SHOW PASSWORD TO USER
function showPassword() {

    // disable generate button for a while after click
    generateBtn.disabled = true;

    setTimeout(() => {
        generateBtn.disabled = false;
    }, 500);

    const lengthValue = document.getElementById("passLength").value;
    const passwordLength = Number(lengthValue);

    if (lengthValue === "") {
        showError("Enter a valid password length");
        return;
    }

    if (passwordLength < 1 || isNaN(passwordLength)) {
        showError("Password length can't be less than 1");
        return;
    }

    const allowedChars = getAllowedChars();
    if (allowedChars.length === 0) {
        showError("Select at least one option");
        return;
    }

    const password = generatePassword(passwordLength, allowedChars);
    passwordResult.value = password;

    const entropy = calculateEntropy(passwordLength, allowedChars.length);
    updateStrength(entropy);
}

// COPY PASSWORD TO CLIPBOARD
function copyPassword() {
    if (!passwordResult.value) return;

    navigator.clipboard.writeText(passwordResult.value);

    copyBtn.textContent = "Copied!";

    setTimeout(() => {
        copyBtn.textContent = "Copy";
    }, 1000);
}