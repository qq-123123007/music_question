// 測驗與之後的教學頁共用這一份大調資料。
// 教學頁可以這樣畫調號：showMajorKey("C 大調")、showMajorKey("降 D 大調", "bass")
const majorKeys = [
    {
        name: "C 大調", sharps: 0, flats: 0,
        solfege: { C: "Do", D: "Re", E: "Mi", F: "Fa", G: "Sol", A: "La", B: "Ti" }
    },
    {
        name: "G 大調", sharps: 1, flats: 0,
        solfege: { G: "Do", A: "Re", B: "Mi", C: "Fa", D: "Sol", E: "La", "F♯": "Ti" }
    },
    {
        name: "D 大調", sharps: 2, flats: 0,
        solfege: { D: "Do", E: "Re", "F♯": "Mi", G: "Fa", A: "Sol", B: "La", "C♯": "Ti" }
    },
    {
        name: "A 大調", sharps: 3, flats: 0,
        solfege: { A: "Do", B: "Re", "C♯": "Mi", D: "Fa", E: "Sol", "F♯": "La", "G♯": "Ti" }
    },
    {
        name: "E 大調", sharps: 4, flats: 0,
        solfege: { E: "Do", "F♯": "Re", "G♯": "Mi", A: "Fa", B: "Sol", "C♯": "La", "D♯": "Ti" }
    },
    {
        name: "B 大調", sharps: 5, flats: 0,
        solfege: { B: "Do", "C♯": "Re", "D♯": "Mi", E: "Fa", "F♯": "Sol", "G♯": "La", "A♯": "Ti" }
    },
    {
        name: "F 大調", sharps: 0, flats: 1,
        solfege: { F: "Do", G: "Re", A: "Mi", "B♭": "Fa", C: "Sol", D: "La", E: "Ti" }
    },
    {
        name: "降 B 大調", sharps: 0, flats: 2,
        solfege: { "B♭": "Do", C: "Re", D: "Mi", "E♭": "Fa", F: "Sol", G: "La", A: "Ti" }
    },
    {
        name: "降 E 大調", sharps: 0, flats: 3,
        solfege: { "E♭": "Do", F: "Re", G: "Mi", "A♭": "Fa", "B♭": "Sol", C: "La", D: "Ti" }
    },
    {
        name: "降 A 大調", sharps: 0, flats: 4,
        solfege: { "A♭": "Do", "B♭": "Re", C: "Mi", "D♭": "Fa", "E♭": "Sol", F: "La", G: "Ti" }
    },
    {
        name: "降 D 大調", sharps: 0, flats: 5,
        solfege: { "D♭": "Do", "E♭": "Re", F: "Mi", "G♭": "Fa", "A♭": "Sol", "B♭": "La", C: "Ti" }
    }
];

const keySignaturePositions = {
    sharp: {
        treble: [31, 46, 26, 41, 56, 36, 51],
        bass: [41, 56, 36, 51, 66, 46, 61]
    },
    flat: {
        treble: [48, 33, 53, 38, 58, 43, 63],
        bass: [58, 43, 63, 48, 68, 53, 73]
    }
};

const sharpLetters = ["F", "C", "G", "D", "A", "E", "B"];
const flatLetters = ["B", "E", "A", "D", "G", "C", "F"];

// 高音譜號 C4 至 G5；低音譜號 A2 至 C4
const staffNotes = {
    treble: [
        { letter: "C", y: 80 },
        { letter: "D", y: 75 },
        { letter: "E", y: 70 },
        { letter: "F", y: 65 },
        { letter: "G", y: 60 },
        { letter: "A", y: 55 },
        { letter: "B", y: 50 },
        { letter: "C", y: 45 },
        { letter: "D", y: 40 },
        { letter: "E", y: 35 },
        { letter: "F", y: 30 },
        { letter: "G", y: 25 }
    ],
    bass: [
        { letter: "C", y: 20 },
        { letter: "B", y: 25 },
        { letter: "A", y: 30 },
        { letter: "G", y: 35 },
        { letter: "F", y: 40 },
        { letter: "E", y: 45 },
        { letter: "D", y: 50 },
        { letter: "C", y: 55 },
        { letter: "B", y: 60 },
        { letter: "A", y: 65 }
    ]
};

function getMajorKey(name) {
    const key = majorKeys.find(item => item.name === name);
    if (!key) {
        throw new Error(`找不到大調：${name}`);
    }
    return key;
}

function clefSymbol(clef) {
    return clef === "bass" ? "𝄢" : "𝄞";
}

const solfegeOrder = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Ti"];

function staffPlace(y) {
    const places = {
        20: "上加一線",
        25: "上加一間",
        30: "第五線",
        35: "第四間",
        40: "第四線",
        45: "第三間",
        50: "第三線",
        55: "第二間",
        60: "第二線",
        65: "第一間",
        70: "第一線",
        75: "下加一間",
        80: "下加一線"
    };
    return places[y] || "";
}

function formatTimeSignature(symbol, extraClass = "") {
    if (typeof symbol !== "string" || !symbol.includes("/")) return symbol;
    const [top, bottom] = symbol.split("/");
    const classes = extraClass ? `time-signature ${extraClass}` : "time-signature";
    return `<span class="${classes}"><span class="top">${top}</span><span class="bottom">${bottom}</span></span>`;
}

function spellPitchInKey(letter, key) {
    const major = typeof key === "string" ? getMajorKey(key) : key;
    if (major.sharps > 0 && sharpLetters.slice(0, major.sharps).includes(letter)) {
        return `${letter}♯`;
    }
    if (major.flats > 0 && flatLetters.slice(0, major.flats).includes(letter)) {
        return `${letter}♭`;
    }
    return letter;
}

function getSolfege(name, letter) {
    const key = getMajorKey(name);
    return key.solfege[spellPitchInKey(letter, key)];
}

function createStaffSvg({ clef = "treble", noteY = null, sharps = 0, flats = 0, noteLabels = null } = {}) {
    const isTreble = clef !== "bass";
    const clefMark = clefSymbol(clef);
    const noteYs = Array.isArray(noteY) ? noteY : (noteY == null ? [] : [noteY]);
    const manyNotes = noteYs.length > 1;
    const width = manyNotes ? 520 : 280;
    const height = noteLabels ? 122 : 100;
    const staffLines = [30, 40, 50, 60, 70]
        .map(y => `<line x1="20" y1="${y}" x2="${width - 20}" y2="${y}" class="staff-line" />`)
        .join("");

    const accidentalCount = sharps || flats || 0;
    const isSharpKey = sharps > 0;
    const signaturePositions = isSharpKey ? keySignaturePositions.sharp : keySignaturePositions.flat;
    const positions = isTreble ? signaturePositions.treble : signaturePositions.bass;
    let accidentals = "";
    for (let i = 0; i < accidentalCount; i++) {
        accidentals += `<text x="${78 + i * 16}" y="${positions[i]}" dominant-baseline="middle" class="${isSharpKey ? "accidental-sharp" : "accidental-flat"}">${isSharpKey ? "♯" : "♭"}</text>`;
    }

    let ledgerLines = "";
    let note = "";
    let labels = "";
    noteYs.forEach((yPosition, index) => {
        const noteStart = accidentalCount > 0 ? 175 : 145;
        const noteX = manyNotes ? noteStart + index * 42 : noteStart;
        const ledgerX1 = noteX - 13;
        const ledgerX2 = noteX + 13;
        if (yPosition < 30) {
            for (let y = 20; y >= yPosition; y -= 10) {
                ledgerLines += `<line x1="${ledgerX1}" y1="${y}" x2="${ledgerX2}" y2="${y}" class="staff-line" />`;
            }
        } else if (yPosition > 70) {
            for (let y = 80; y <= yPosition; y += 10) {
                ledgerLines += `<line x1="${ledgerX1}" y1="${y}" x2="${ledgerX2}" y2="${y}" class="staff-line" />`;
            }
        }
        note += `<ellipse cx="${noteX}" cy="${yPosition}" rx="7" ry="5" fill="none" stroke="var(--accent)" stroke-width="2.5" />`;
        if (noteLabels && noteLabels[index]) {
            labels += `<text x="${noteX}" y="114" text-anchor="middle" class="solfege-label">${noteLabels[index]}</text>`;
        }
    });

    const clefY = noteYs.length === 0 && isTreble ? 70 : 72;
    const clefName = isTreble ? "高音譜號" : "低音譜號";
    const label = noteYs.length === 0 ? `${clefName}五線譜` : `${clefName}全音符${accidentalCount > 0 ? "調號" : ""}`;

    return `
        <svg class="key-staff${manyNotes ? " scale-staff" : ""}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
            ${staffLines}
            ${ledgerLines}
            <text x="28" y="${clefY}" class="clef-symbol">${clefMark}</text>
            ${accidentals}
            ${note}
            ${labels}
        </svg>
    `;
}

function showMajorKey(name, clef = "treble") {
    const key = getMajorKey(name);
    return createStaffSvg({ clef, sharps: key.sharps, flats: key.flats });
}

function showScale(name, clef = "treble") {
    const key = getMajorKey(name);
    const tonic = Object.entries(key.solfege).find(([, solfege]) => solfege === "Do")[0].replace(/[♯♭]/g, "");
    const letterIndex = ["C", "D", "E", "F", "G", "A", "B"].indexOf(tonic);
    let startY = 80 - letterIndex * 5;
    if (startY - 35 < 18) startY += 35;
    const noteYs = Array.from({ length: 8 }, (_, index) => startY - index * 5);
    return createStaffSvg({
        clef,
        sharps: key.sharps,
        flats: key.flats,
        noteY: noteYs,
        noteLabels: solfegeOrder.concat("Do")
    });
}
