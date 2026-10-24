// 關卡一題庫：顯示圖形，回答這是什麼音符
const level1Data = [
    { symbol: "𝅗", answer: "全音符" },
    { symbol: "𝅗𝅥", answer: "二分音符" },
    { symbol: "♩", answer: "四分音符" },
    { symbol: "♪", answer: "八分音符" },
    { symbol: "𝅘𝅥𝅯", answer: "十六分音符" },
    { symbol: "𝅘𝅥𝅰", answer: "三十二分音符" }
];

// 關卡二題庫：顯示圖形，回答這是什麼休止符
const level2Data = [
    { symbol: "𝄻", answer: "全休止符" },
    { symbol: "𝄼", answer: "二分休止符" },
    { symbol: "𝄽", answer: "四分休止符" },
    { symbol: "𝄾", answer: "八分休止符" },
    { symbol: "𝄿", answer: "十六分休止符" }
];

// 關卡三題庫：附點音符換算，題目會根據附點音符與換算單位不同，問對應等於幾個小音符
const level3Data = [
    { symbol: "♩.", answer: "3", unit: "八分音符" },
    { symbol: "♩.", answer: "6", unit: "十六分音符" },
    { symbol: "♪.", answer: "3", unit: "十六分音符" },
    { symbol: "𝅗𝅥.", answer: "3", unit: "四分音符" },
    { symbol: "𝅗𝅥.", answer: "6", unit: "八分音符" },
    { symbol: "𝅗𝅥.", answer: "12", unit: "十六分音符" },
    { symbol: "𝅝.", answer: "3", unit: "二分音符" },
    { symbol: "𝅝.", answer: "6", unit: "四分音符" },
    { symbol: "𝅝.", answer: "12", unit: "八分音符" }
];

// 關卡四題庫：拍子換算，顯示拍號，回答這個拍子等於幾個四分音符
const level4Data = [
    { symbol: "4/4", answer: "4", unit: "四分音符" },
    { symbol: "3/4", answer: "3", unit: "四分音符" },
    { symbol: "2/4", answer: "2", unit: "四分音符" },
    { symbol: "6/8", answer: "3", unit: "四分音符" },
    { symbol: "12/8", answer: "6", unit: "四分音符" }
];

// 關卡五題庫：判斷這個拍子是單拍子還是複拍子
const level5Data = [
    { symbol: "3/4", answer: "單拍子" },
    { symbol: "2/4", answer: "單拍子" },
    { symbol: "4/4", answer: "單拍子" },
    { symbol: "6/8", answer: "複拍子" },
    { symbol: "9/8", answer: "複拍子" },
    { symbol: "12/8", answer: "複拍子" }
];

// 各關卡對應的選項按鈕池
const level1Answers = ["全音符", "二分音符", "四分音符", "八分音符"];
const level2Answers = ["全休止符", "二分休止符", "四分休止符", "八分休止符"];
const level3Answers = ["1", "2", "3", "6"];
const level4Answers = ["2", "3", "4", "6"];
const level5Answers = ["單拍子", "複拍子"];

let currentLevel = 1;
let score = 0;
let totalQuestions = 0;
let remainingQuestions = [];
let currentQuestion = null;

function initQuiz() {
    document.getElementById('quiz-game-section').style.display = 'block';
    document.getElementById('quiz-result-section').style.display = 'none';
    startLevel(1);
}

function startLevel(level) {
    currentLevel = level;
    if (level === 1) {
        document.getElementById('level-badge').innerText = "關卡一：常用音符";
        document.getElementById('level-badge').style.background = "#e2e8f0";
        document.documentElement.style.setProperty('--accent', '#2b6cb0');
        const randomLevel1Index = Math.floor(Math.random() * level1Data.length);
        remainingQuestions = [{ ...level1Data[randomLevel1Index] }];
    } else if (level === 2) {
        document.getElementById('level-badge').innerText = "關卡二：休止符號";
        document.getElementById('level-badge').style.background = "#feebc8";
        document.documentElement.style.setProperty('--accent', '#dd6b20');
        const randomLevel2Index = Math.floor(Math.random() * level2Data.length);
        remainingQuestions = [{ ...level2Data[randomLevel2Index] }];
    } else if (level === 3) {
        document.getElementById('level-badge').innerText = "關卡三：附點音符換算";
        document.getElementById('level-badge').style.background = "#fbcfe8";
        document.documentElement.style.setProperty('--accent', '#d946ef');
        const randomLevel3Index = Math.floor(Math.random() * level3Data.length);
        remainingQuestions = [{ ...level3Data[randomLevel3Index] }];
    } else if (level === 4) {
        document.getElementById('level-badge').innerText = "關卡四：拍子換算";
        document.getElementById('level-badge').style.background = "#dbeafe";
        document.documentElement.style.setProperty('--accent', '#2563eb');
        const randomLevel4Index = Math.floor(Math.random() * level4Data.length);
        remainingQuestions = [{ ...level4Data[randomLevel4Index] }];
    } else {
        document.getElementById('level-badge').innerText = "關卡五：拍子分類";
        document.getElementById('level-badge').style.background = "#dcfce7";
        document.documentElement.style.setProperty('--accent', '#16a34a');
        const randomLevel5Index = Math.floor(Math.random() * level5Data.length);
        remainingQuestions = [{ ...level5Data[randomLevel5Index] }];
    }
    nextQuestion();
}

function nextQuestion() {
    document.getElementById('feedback-text').innerText = '';
    document.getElementById('next-btn').style.display = 'none';
    document.getElementById('copy-btn').style.display = 'none';

    if (remainingQuestions.length === 0) {
        if (currentLevel === 1) {
            startLevel(2);
        } else if (currentLevel === 2) {
            startLevel(3);
        } else if (currentLevel === 3) {
            startLevel(4);
        } else if (currentLevel === 4) {
            startLevel(5);
        } else {
            showFinalResults();
        }
        return;
    }

    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    currentQuestion = remainingQuestions.splice(randomIndex, 1)[0]; 

    let titleText = "";
    if (currentLevel === 1) {
        titleText = "請問這個符號是什麼音符？";
    } else if (currentLevel === 2) {
        titleText = "請問這個符號是什麼休止符？";
    } else if (currentLevel === 3) {
        titleText = `這個附點音符等於幾個${currentQuestion.unit}？`;
    } else if (currentLevel === 4) {
        titleText = `這個拍子 ${currentQuestion.symbol} 等於幾個${currentQuestion.unit}？`;
    } else {
        titleText = `這個拍子 ${currentQuestion.symbol} 是單拍子還是複拍子？`;
    }

    document.getElementById('question-box-title').firstChild.textContent = titleText + " ";

    const isTimeSignature = currentLevel >= 4 && currentQuestion.symbol.includes('/');
    if (isTimeSignature) {
        const [top, bottom] = currentQuestion.symbol.split('/');
        document.getElementById('question-text').innerHTML = `
            <span class="time-signature">
                <span class="top">${top}</span>
                <span class="bottom">${bottom}</span>
            </span>
        `;
    } else {
        document.getElementById('question-text').innerHTML = `<span style="font-size:4.5rem; display:block; margin-top:0.5rem;">${currentQuestion.symbol}</span>`;
    }

    let currentAnswers = [];
    if (currentLevel === 1) {
        currentAnswers = level1Answers;
    } else if (currentLevel === 2) {
        currentAnswers = level2Answers;
    } else if (currentLevel === 3) {
        currentAnswers = level3Answers;
    } else if (currentLevel === 4) {
        currentAnswers = level4Answers;
    } else {
        currentAnswers = level5Answers;
    }

    const correctAnswer = currentQuestion.answer;
    const answerPool = currentAnswers.includes(correctAnswer) ? currentAnswers : [correctAnswer, ...currentAnswers.filter(ans => ans !== correctAnswer)].slice(0, 4);
    const shuffledAnswers = [...answerPool].sort(() => Math.random() - 0.5);
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';

    shuffledAnswers.forEach(ans => {
        const btn = document.createElement('button');
        btn.innerText = ans;
        btn.onclick = () => checkAnswer(btn, ans);
        optionsContainer.appendChild(btn);
    });
}

function checkAnswer(selectedButton, chosenAnswer) {
    totalQuestions++;
    document.getElementById('total-questions').innerText = totalQuestions;
    
    const buttons = document.querySelectorAll('#options-container button');
    buttons.forEach(btn => btn.disabled = true);

    if (chosenAnswer === currentQuestion.answer) {
        selectedButton.classList.add('correct');
        document.getElementById('feedback-text').innerText = '🎉 答對了！非常準確！';
        document.getElementById('feedback-text').style.color = 'var(--success)';
        score++;
        document.getElementById('score').innerText = score;
    } else {
        selectedButton.classList.add('wrong');
        document.getElementById('feedback-text').innerText = `❌ 答錯了！正確答案是：${currentQuestion.answer}`;
        document.getElementById('feedback-text').style.color = 'var(--danger)';
        
        buttons.forEach(btn => {
            if (btn.innerText === currentQuestion.answer) btn.classList.add('correct');
        });
    }

    document.getElementById('copy-btn').style.display = 'block';
    document.getElementById('next-btn').style.display = 'block';
}

function handleNext() {
    nextQuestion();
}

function showFinalResults() {
    document.getElementById('quiz-game-section').style.display = 'none';
    document.getElementById('quiz-result-section').style.display = 'block';
    
    document.getElementById('final-score-display').innerText = `${score} / ${totalQuestions}`;
    
    const percent = (score / totalQuestions) * 100;
    let comment = "";
    if (percent === 100) {
        comment = "🌟 太完美了！你簡直是符號大師，全對通關！";
    } else if (percent >= 70) {
        comment = "👏 表現得很好！你對音符與休止符圖形非常熟練囉！";
    } else {
        comment = "💪 再接再厲！再多辨識幾次，你一定能拿到滿分！";
    }
    document.getElementById('final-comment').innerText = comment;
}

function restartGame() {
    score = 0;
    totalQuestions = 0;
    document.getElementById('score').innerText = score;
    document.getElementById('total-questions').innerText = totalQuestions;
    initQuiz();
}

function copyCurrentSymbol() {
    navigator.clipboard.writeText(currentQuestion.symbol).then(() => {
        alert(`已成功複製符號: ${currentQuestion.symbol}`);
    });
}

window.onload = initQuiz;
