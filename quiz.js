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
    { symbol: "𝄿", answer: "十六分休止符" },
    { symbol: "𝅀", answer: "三十二分休止符" }
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

// 關卡六題庫：在高音或低音譜號的五線譜中辨識調號代表的大調
const level6KeyData = [
    { answer: "C 大調", sharps: 0, flats: 0 },
    { answer: "G 大調", sharps: 1, flats: 0 },
    { answer: "D 大調", sharps: 2, flats: 0 },
    { answer: "A 大調", sharps: 3, flats: 0 },
    { answer: "E 大調", sharps: 4, flats: 0 },
    { answer: "B 大調", sharps: 5, flats: 0 },
    { answer: "F 大調", sharps: 0, flats: 1 },
    { answer: "降 B 大調", sharps: 0, flats: 2 },
    { answer: "降 E 大調", sharps: 0, flats: 3 },
    { answer: "降 A 大調", sharps: 0, flats: 4 },
    { answer: "降 D 大調", sharps: 0, flats: 5 }
];

const level6Answers = level6KeyData.map(key => key.answer);

// 關卡七題庫：高音譜號 C4 至 G5；低音譜號 A2 至 C4
const level7TrebleData = [
    { answer: "C", y: 80 },
    { answer: "D", y: 75 },
    { answer: "E", y: 70 },
    { answer: "F", y: 65 },
    { answer: "G", y: 60 },
    { answer: "A", y: 55 },
    { answer: "B", y: 50 },
    { answer: "C", y: 45 },
    { answer: "D", y: 40 },
    { answer: "E", y: 35 },
    { answer: "F", y: 30 },
    { answer: "G", y: 25 }
];

const level7BassData = [
    { answer: "C", y: 20 },
    { answer: "B", y: 25 },
    { answer: "A", y: 30 },
    { answer: "G", y: 35 },
    { answer: "F", y: 40 },
    { answer: "E", y: 45 },
    { answer: "D", y: 50 },
    { answer: "C", y: 55 },
    { answer: "B", y: 60 },
    { answer: "A", y: 65 }
];

const level7Data = [
    ...level7TrebleData.map(item => ({ ...item, clef: "treble" })),
    ...level7BassData.map(item => ({ ...item, clef: "bass" }))
];

const level7Answers = [...new Set(level7Data.map(item => item.answer))];

// 闢卡八題庫：首調唱名法，依隨機大調將音名映射成唱名
const movableDoMap = {
    "C 大調": { C: "Do", D: "Re", E: "Mi", F: "Fa", G: "Sol", A: "La", B: "Ti" },
    "G 大調": { G: "Do", A: "Re", B: "Mi", C: "Fa", D: "Sol", E: "La", "F♯": "Ti" },
    "D 大調": { D: "Do", E: "Re", "F♯": "Mi", G: "Fa", A: "Sol", B: "La", "C♯": "Ti" },
    "A 大調": { A: "Do", B: "Re", "C♯": "Mi", D: "Fa", E: "Sol", "F♯": "La", "G♯": "Ti" },
    "E 大調": { E: "Do", "F♯": "Re", "G♯": "Mi", A: "Fa", B: "Sol", "C♯": "La", "D♯": "Ti" },
    "B 大調": { B: "Do", "C♯": "Re", "D♯": "Mi", E: "Fa", "F♯": "Sol", "G♯": "La", "A♯": "Ti" },
    "F 大調": { F: "Do", G: "Re", A: "Mi", "B♭": "Fa", C: "Sol", D: "La", E: "Ti" },
    "降 B 大調": { "B♭": "Do", C: "Re", D: "Mi", "E♭": "Fa", F: "Sol", G: "La", A: "Ti" },
    "降 E 大調": { "E♭": "Do", F: "Re", G: "Mi", "A♭": "Fa", "B♭": "Sol", C: "La", D: "Ti" },
    "降 A 大調": { "A♭": "Do", "B♭": "Re", C: "Mi", "D♭": "Fa", "E♭": "Sol", F: "La", G: "Ti" },
    "降 D 大調": { "D♭": "Do", "E♭": "Re", F: "Mi", "G♭": "Fa", "A♭": "Sol", "B♭": "La", C: "Ti" }
};

// 各關卡對應的選項按鈕池
const level1Answers = [...new Set(level1Data.map(item => item.answer))];
const level2Answers = [...new Set(level2Data.map(item => item.answer))];
const level3Answers = [...new Set(level3Data.map(item => item.answer))];
const level4Answers = [...new Set(level4Data.map(item => item.answer))];
const level5Answers = [...new Set(level5Data.map(item => item.answer))];

let currentLevel = 1;
let score = 0;
let totalQuestions = 0;
let remainingQuestions = [];
let currentQuestion = null;
let answerHistory = [];

function initQuiz() {
    answerHistory = [];
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
    } else if (level === 5) {
        document.getElementById('level-badge').innerText = "關卡五：拍子分類";
        document.getElementById('level-badge').style.background = "#dcfce7";
        document.documentElement.style.setProperty('--accent', '#16a34a');
        const randomLevel5Index = Math.floor(Math.random() * level5Data.length);
        remainingQuestions = [{ ...level5Data[randomLevel5Index] }];
    } else if (level === 6) {
        document.getElementById('level-badge').innerText = "關卡六：大調辨識";
        document.getElementById('level-badge').style.background = "#ede9fe";
        document.documentElement.style.setProperty('--accent', '#7c3aed');
        const randomKeyIndex = Math.floor(Math.random() * level6KeyData.length);
        const clefs = ["treble", "bass"];
        const randomClef = clefs[Math.floor(Math.random() * clefs.length)];
        remainingQuestions = [{
            ...level6KeyData[randomKeyIndex],
            clef: randomClef,
            symbol: level6KeyData[randomKeyIndex].answer
        }];
    } else if (level === 7) {
        document.getElementById('level-badge').innerText = "關卡七：音名辨識";
        document.getElementById('level-badge').style.background = "#d1fae5";
        document.documentElement.style.setProperty('--accent', '#059669');
        const randomPitch = level7Data[Math.floor(Math.random() * level7Data.length)];
        remainingQuestions = [{
            ...randomPitch,
            symbol: "𝅝"
        }];
    } else {
        document.getElementById('level-badge').innerText = "關卡八：唱名辨識";
        document.getElementById('level-badge').style.background = "#fef3c7";
        document.documentElement.style.setProperty('--accent', '#d97706');
        const randomPitch = level7Data[Math.floor(Math.random() * level7Data.length)];
        const randomKey = level6KeyData[Math.floor(Math.random() * level6KeyData.length)];
        const movableMapping = movableDoMap[randomKey.answer];
        const answer = movableMapping[randomPitch.answer] || solfegeMap[randomPitch.answer];
        remainingQuestions = [{
            ...randomPitch,
            ...randomKey,
            answer,
            pitchName: randomPitch.answer,
            majorKey: randomKey.answer,
            symbol: "𝅝"
        }];
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
        } else if (currentLevel === 5) {
            startLevel(6);
        } else if (currentLevel === 6) {
            startLevel(7);
        } else if (currentLevel === 7) {
            //startLevel(8);
            showFinalResults();
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
    } else if (currentLevel === 5) {
        titleText = `這個拍子 ${currentQuestion.symbol} 是單拍子還是複拍子？`;
    } else if (currentLevel === 6) {
        titleText = `這個調號代表的是哪個大調？`;
    } else if (currentLevel === 7) {
        titleText = `這個音符在五線譜上的位置是？`;
    } else {
        titleText = `這個音符的固定唱名是？`;
    }

    document.getElementById('question-box-title').firstChild.textContent = titleText + " ";

    if (currentLevel === 6) {
        document.getElementById('question-text').innerHTML = createKeySignatureStaff(currentQuestion);
    } else if (currentLevel === 7) {
        const isTreble = currentQuestion.clef === "treble";
        const clefSymbol = isTreble ? "𝄞" : "𝄢";
        const notePosition = currentQuestion.y;
        const staffLines = [30, 40, 50, 60, 70]
            .map(y => `<line x1="20" y1="${y}" x2="260" y2="${y}" class="staff-line" />`)
            .join("");
        const noteX = 145;
        const ledgerX1 = noteX - 13;
        const ledgerX2 = noteX + 13;

        let ledgerLines = "";
        if (notePosition < 30) {
            for (let y = 20; y >= notePosition; y -= 10) {
                ledgerLines += `<line x1="${ledgerX1}" y1="${y}" x2="${ledgerX2}" y2="${y}" class="staff-line" />`;
            }
        } else if (notePosition > 70) {
            for (let y = 80; y <= notePosition; y += 10) {
                ledgerLines += `<line x1="${ledgerX1}" y1="${y}" x2="${ledgerX2}" y2="${y}" class="staff-line" />`;
            }
        }

        document.getElementById('question-text').innerHTML = `
            <svg class="key-staff" viewBox="0 0 280 100" role="img" aria-label="${isTreble ? '高音譜號' : '低音譜號'}全音符">
                ${staffLines}
                ${ledgerLines}
                <text x="28" y="72" class="clef-symbol">${clefSymbol}</text>
                <ellipse cx="${noteX}" cy="${notePosition}" rx="7" ry="5" fill="none" stroke="var(--accent)" stroke-width="2.5" />
            </svg>
        `;
    } else if (currentLevel === 8) {
        const isTreble = currentQuestion.clef === "treble";
        const clefSymbol = isTreble ? "𝄞" : "𝄢";
        const notePosition = currentQuestion.y;
        const staffLines = [30, 40, 50, 60, 70]
            .map(y => `<line x1="20" y1="${y}" x2="260" y2="${y}" class="staff-line" />`)
            .join("");

        let keyAccidentals = "";
        const accidentalCount = currentQuestion.sharps || currentQuestion.flats || 0;
        const isSharpKey = (currentQuestion.sharps || 0) > 0;
        const treblePositions = isSharpKey
            ? [30, 45, 25, 40, 55]
            : [48, 33, 53, 38, 58];
        const bassPositions = isSharpKey
            ? [40, 55, 25, 50, 65]
            : [60, 45, 65, 50, 70];
        const positions = isTreble ? treblePositions : bassPositions;

        for (let i = 0; i < accidentalCount; i++) {
            keyAccidentals += `<text x="${78 + i * 16}" y="${positions[i]}" dominant-baseline="middle" class="${isSharpKey ? 'accidental-sharp' : 'accidental-flat'}">${isSharpKey ? '♯' : '♭'}</text>`;
        }

        let ledgerLines = "";
        const noteX = 175;
        const ledgerX1 = noteX - 13;
        const ledgerX2 = noteX + 13;
        if (notePosition < 30) {
            for (let y = 20; y >= notePosition; y -= 10) {
                ledgerLines += `<line x1="${ledgerX1}" y1="${y}" x2="${ledgerX2}" y2="${y}" class="staff-line" />`;
            }
        } else if (notePosition > 70) {
            for (let y = 80; y <= notePosition; y += 10) {
                ledgerLines += `<line x1="${ledgerX1}" y1="${y}" x2="${ledgerX2}" y2="${y}" class="staff-line" />`;
            }
        }

        document.getElementById('question-text').innerHTML = `
            <svg class="key-staff" viewBox="0 0 280 100" role="img" aria-label="${isTreble ? '高音譜號' : '低音譜號'}全音符調號">
                ${staffLines}
                ${ledgerLines}
                <text x="28" y="72" class="clef-symbol">${clefSymbol}</text>
                ${keyAccidentals}
                <ellipse cx="${noteX}" cy="${notePosition}" rx="7" ry="5" fill="none" stroke="var(--accent)" stroke-width="2.5" />
            </svg>
        `;
    } else {
        const isTimeSignature = currentLevel >= 4 && currentQuestion.symbol && currentQuestion.symbol.includes('/');
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
    } else if (currentLevel === 5) {
        currentAnswers = level5Answers;
    } else if (currentLevel === 6) {
        currentAnswers = level6Answers;
    } else if (currentLevel === 7) {
        currentAnswers = level7Answers;
    } else {
        currentAnswers = level8Answers;
    }

    const correctAnswer = currentQuestion.answer;
    let answerPool;

    if (currentLevel === 6) {
        const wrongAnswers = level6Answers
            .filter(answer => answer !== correctAnswer)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        answerPool = [correctAnswer, ...wrongAnswers];
    } else if (currentLevel === 7) {
        const wrongAnswers = level7Answers
            .filter(answer => answer !== currentQuestion.answer)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        answerPool = [currentQuestion.answer, ...wrongAnswers];
    } else if (currentLevel === 8) {
        const wrongAnswers = level8Answers
            .filter(answer => answer !== correctAnswer)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        answerPool = [correctAnswer, ...wrongAnswers];
    } else {
        const wrongAnswers = currentAnswers
            .filter(answer => answer !== correctAnswer)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        answerPool = [correctAnswer, ...wrongAnswers];
    }

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

    answerHistory.push({
        question: currentQuestion,
        userAnswer: chosenAnswer,
        correct: chosenAnswer === currentQuestion.answer
    });

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

    const percent = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
    let comment = "";
    if (percent === 100) {
        comment = "🌟 太完美了！你簡直是符號大師，全對通關！";
    } else if (percent >= 70) {
        comment = "👏 表現得很好！你對音符與休止符圖形非常熟練囉！";
    } else {
        comment = "💪 再接再厲！再多辨識幾次，你一定能拿到滿分！";
    }
    document.getElementById('final-comment').innerText = comment;

    const historyContainer = document.getElementById('answer-history');
    historyContainer.innerHTML = answerHistory.map((entry, index) => {
        const resultClass = entry.correct ? 'correct' : 'wrong';
        return `
            <div class="answer-history-item ${resultClass}">
                <div class="answer-history-number">第 ${index + 1} 題</div>
                <div>
                    <div class="answer-history-symbol">題目：${entry.question.symbol}</div>
                    <div class="answer-history-detail">
                        <div class="player-answer">你的答案：${entry.userAnswer}</div>
                        <div class="correct-answer">正確答案：${entry.question.answer}</div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function restartGame() {
    score = 0;
    totalQuestions = 0;
    answerHistory = [];
    document.getElementById('score').innerText = score;
    document.getElementById('total-questions').innerText = totalQuestions;
    initQuiz();
}

function copyCurrentSymbol() {
    navigator.clipboard.writeText(currentQuestion.symbol).then(() => {
        alert(`已成功複製符號: ${currentQuestion.symbol}`);
    });
}

function createKeySignatureStaff(question) {
    const isTreble = question.clef === "treble";
    const clefSymbol = isTreble ? "𝄞" : "𝄢";

    let accidentals = "";
    if (question.sharps > 0) {
        const treblePositions = [31, 46, 26, 41, 56, 36, 51];
        const bassPositions = [41, 56, 36, 51, 66, 46, 61];
        const positions = isTreble ? treblePositions : bassPositions;
        for (let i = 0; i < question.sharps; i++) {
            accidentals += `<text x="${78 + i * 16}" y="${positions[i]}" dominant-baseline="middle" class="accidental-sharp">♯</text>`;
        }
    } else if (question.flats > 0) {
        const treblePositions = [48, 33, 53, 38, 58, 43, 63];
        const bassPositions = [58, 43, 63, 48, 68, 53, 73];
        const positions = isTreble ? treblePositions : bassPositions;
        for (let i = 0; i < question.flats; i++) {
            accidentals += `<text x="${78 + i * 16}" y="${positions[i]}" dominant-baseline="middle" class="accidental-flat">♭</text>`;
        }
    }

    const lines = [30, 40, 50, 60, 70]
        .map(y => `<line x1="20" y1="${y}" x2="260" y2="${y}" class="staff-line" />`)
        .join("");

    return `
        <svg class="key-staff" viewBox="0 0 280 100" role="img" aria-label="${isTreble ? '高音譜號' : '低音譜號'}五線譜">
            ${lines}
            <text x="28" y="${isTreble ? 70 : 72}" class="clef-symbol">${clefSymbol}</text>
            ${accidentals}
        </svg>
    `;
}

const level8Data = [];
for (const major of level6KeyData) {
    const mapping = movableDoMap[major.answer];
    for (const pitch of level7Data) {
        if (mapping[pitch.answer]) {
            level8Data.push({
                ...pitch,
                answer: mapping[pitch.answer],
                pitchName: pitch.answer,
                majorKey: major.answer
            });
        }
    }
}

window.onload = initQuiz;
