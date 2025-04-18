let words = [
    { en: "Apple", fr: "Pomme" },
    { en: "Car", fr: "Voiture" },
    { en: "House", fr: "Maison" },
    { en: "Sun", fr: "Soleil" },
    { en: "Water", fr: "Eau" },
    { en: "Tree", fr: "Arbre" },
    { en: "Book", fr: "Livre" },
    { en: "Computer", fr: "Ordinateur" },
    { en: "Friend", fr: "Amis" },
    { en: "City", fr: "Ville" },
];
let score = 0;
let errors = 0;
let timeLeft = 10;
let currentWord;
let timer;
let usedWords = [];
let progressBar;
let hintCount = 0;

function startGame() {
    score = 0;
    errors = 0;
    timeLeft = 10;
    hintCount = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("errors").innerText = errors;

    document.getElementById("word").classList.remove("hidden");
    document.getElementById("answer").classList.remove("hidden");
    document.getElementById("checkBtn").classList.remove("hidden");
    document.getElementById("hintBtn").classList.remove("hidden");

    progressBar = document.getElementById("progress");
    progressBar.style.width = "100%";

    newWord();
}

function newWord() {
    if (usedWords.length === words.length) {
        Swal.fire("🎉 تم إنهاء اللعبة!", "نقاطك النهائية: " + score, "success");
        resetGame();
        return;
    }

    let randomIndex = Math.floor(Math.random() * words.length);
    while (usedWords.includes(randomIndex)) {
        randomIndex = Math.floor(Math.random() * words.length);
    }

    usedWords.push(randomIndex);
    currentWord = words[randomIndex];
    document.getElementById("word").innerText = currentWord.en;
    document.getElementById("answer").value = "";
    timeLeft = 10;
    document.getElementById("timer").innerText = timeLeft;

    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = timeLeft;
        progressBar.style.width = (timeLeft * 10) + "%";

        if (timeLeft <= 0) {
            clearInterval(timer);
            wrongAnswer();
        }
    }, 1000);
}

function checkAnswer() {
    let answer = document.getElementById("answer").value.trim();
    if (answer.toLowerCase() === currentWord.fr.toLowerCase()) {
        score++;
        document.getElementById("score").innerText = score;
        newWord();
    } else {
        wrongAnswer();
    }
}













function wrongAnswer() {
    errors++;
    document.getElementById("errors").innerText = errors;
    if (errors >= 3) {
        clearInterval(timer);
        if (score >= 3) {
            Swal.fire("🎯 مستوى جيد!", "نقاطك: " + score + " 👏 جرب مرة أخرى لتحقق نتيجة أفضل!", "success");
        } else {
            Swal.fire("❌ انتهت اللعبة!", "نقاطك: " + score + " باقي خاصاك الخدمة اولدي ", "error");
        }
        resetGame();
    } else {
        showFailureEffect();
        newWord();
    }
}

function giveHint() {
    if (hintCount === 0) {
        const hint = currentWord.fr.charAt(0);
        Swal.fire("تلميح", "أول حرف من الكلمة هو: " + hint, "info");
        hintCount++;
    } else if (hintCount === 1) {
        const partOfWord = currentWord.fr.slice(0, 3);
        Swal.fire("تلميح", "أول 3 حروف من الكلمة هي: " + partOfWord, "info");
        hintCount++;
    } else if (hintCount === 2) {
        Swal.fire("😅", "وبقا ليا غانجي نكتب فبلاصتك", "warning");
    }
}

function showFailureEffect() {
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 500);
}

function resetGame() {
    clearInterval(timer);
    progressBar.style.width = "100%";
    score = 0;
    errors = 0;
    document.getElementById("score").innerText = score;
    document.getElementById("errors").innerText = errors;
    document.getElementById("startBtn").disabled = false;

    document.getElementById("word").classList.add("hidden");
    document.getElementById("answer").classList.add("hidden");
    document.getElementById("checkBtn").classList.add("hidden");
    document.getElementById("hintBtn").classList.add("hidden");
    usedWords = [];
    

}