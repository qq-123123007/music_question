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

function createStaffSvg({ clef = "treble", noteY = null, sharps = 0, flats = 0 } = {}) {
    const isTreble = clef !== "bass";
    const clefSymbol = isTreble ? "𝄞" : "𝄢";
    const staffLines = [30, 40, 50, 60, 70]
        .map(y => `<line x1="20" y1="${y}" x2="260" y2="${y}" class="staff-line" />`)
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
    if (noteY != null) {
        const noteX = accidentalCount > 0 ? 175 : 145;
        const ledgerX1 = noteX - 13;
        const ledgerX2 = noteX + 13;
        if (noteY < 30) {
            for (let y = 20; y >= noteY; y -= 10) {
                ledgerLines += `<line x1="${ledgerX1}" y1="${y}" x2="${ledgerX2}" y2="${y}" class="staff-line" />`;
            }
        } else if (noteY > 70) {
            for (let y = 80; y <= noteY; y += 10) {
                ledgerLines += `<line x1="${ledgerX1}" y1="${y}" x2="${ledgerX2}" y2="${y}" class="staff-line" />`;
            }
        }
        note = `<ellipse cx="${noteX}" cy="${noteY}" rx="7" ry="5" fill="none" stroke="var(--accent)" stroke-width="2.5" />`;
    }

    const clefY = noteY == null && isTreble ? 70 : 72;
    const clefName = isTreble ? "高音譜號" : "低音譜號";
    const label = noteY == null ? `${clefName}五線譜` : `${clefName}全音符${accidentalCount > 0 ? "調號" : ""}`;

    return `
        <svg class="key-staff" viewBox="0 0 280 100" role="img" aria-label="${label}">
            ${staffLines}
            ${ledgerLines}
            <text x="28" y="${clefY}" class="clef-symbol">${clefSymbol}</text>
            ${accidentals}
            ${note}
        </svg>
    `;
}

function showMajorKey(name, clef = "treble") {
    const key = getMajorKey(name);
    return createStaffSvg({ clef, sharps: key.sharps, flats: key.flats });
}
