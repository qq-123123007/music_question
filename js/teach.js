const teachLessons = [
    {
        title: "高音譜號",
        symbol: "𝄞",
        accent: "#7c3aed",
        text: "放在五線譜最前面，用來讀較高的音。",
        staves: [
            { label: "高音", html: createStaffSvg({ clef: "treble" }) }
        ]
    },
    {
        title: "低音譜號",
        symbol: "𝄢",
        accent: "#059669",
        text: "放在五線譜最前面，用來讀較低的音。",
        staves: [
            { label: "低音", html: createStaffSvg({ clef: "bass" }) }
        ]
    },
    {
        title: "升號",
        symbol: "♯",
        accent: "#d97706",
        text: "表示這個音要升高半音。調號有 1 個升號時是 G 大調，被升高的音是 F。",
        staves: [
            { label: "高音", html: showMajorKey("G 大調", "treble") },
            { label: "低音", html: showMajorKey("G 大調", "bass") }
        ]
    },
    {
        title: "降號",
        symbol: "♭",
        accent: "#2563eb",
        text: "表示這個音要降低半音。調號有 1 個降號時是 F 大調，被降低的音是 B。",
        staves: [
            { label: "高音", html: showMajorKey("F 大調", "treble") },
            { label: "低音", html: showMajorKey("F 大調", "bass") }
        ]
    },
    {
        title: "音符",
        accent: "#2b6cb0",
        text: "音符愈短，時值就愈少。以四分音符當 1 拍來看：",
        items: [
            { symbol: "𝅝", name: "全音符", note: "4 拍" },
            { symbol: "𝅗", name: "全音符", note: "另一種寫法，也是 4 拍" },
            { symbol: "𝅗𝅥", name: "二分音符", note: "2 拍" },
            { symbol: "♩", name: "四分音符", note: "1 拍" },
            { symbol: "♪", name: "八分音符", note: "半拍" },
            { symbol: "𝅘𝅥𝅯", name: "十六分音符", note: "1/4 拍" },
            { symbol: "𝅘𝅥𝅰", name: "三十二分音符", note: "1/8 拍" }
        ]
    },
    {
        title: "休止符",
        accent: "#dd6b20",
        text: "休止符表示安靜，不發出聲音。長度和對應的音符一樣：",
        items: [
            { symbol: "𝄻", name: "全休止符", note: "4 拍" },
            { symbol: "𝄼", name: "二分休止符", note: "2 拍" },
            { symbol: "𝄽", name: "四分休止符", note: "1 拍" },
            { symbol: "𝄾", name: "八分休止符", note: "半拍" },
            { symbol: "𝄿", name: "十六分休止符", note: "1/4 拍" },
            { symbol: "𝅀", name: "三十二分休止符", note: "1/8 拍" }
        ]
    }
];

const dottedQuarter = "\u2669.";
const dottedEighth = "\u266A.";
const dottedHalf = "\u{1D15E}.";
const dottedWhole = "\u{1D15D}.";
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

teachLessons.push(
    {
        title: "附點音符",
        accent: "#d946ef",
        text: "附點表示再加一半。所以附點音符等於 3 個下一個較短的音符。",
        items: [
            { symbol: dottedQuarter, name: "3 個八分音符", note: "也等於 6 個十六分音符" },
            { symbol: dottedEighth, name: "3 個十六分音符", note: "附點八分音符" },
            { symbol: dottedHalf, name: "3 個四分音符", note: "也等於 6 個八分音符、12 個十六分音符" },
            { symbol: dottedWhole, name: "3 個二分音符", note: "也等於 6 個四分音符、12 個八分音符" }
        ]
    },
    {
        title: "拍號",
        accent: "#2563eb",
        text: "",
        items: [
            { symbol: "4/4", name: "4 個四分音符", note: "" },
            { symbol: "3/4", name: "3 個四分音符", note: "" },
            { symbol: "2/4", name: "2 個四分音符", note: "" },
            { symbol: "6/8", name: "6 個八分音符", note: "" },
            { symbol: "12/8", name: "12 個八分音符", note: "" }
        ]
    },
    {
        title: "拍子分類",
        accent: "#16a34a",
        text: "分子是 2、3、4，是單拍子。分子是 6、9、12，是複拍子。",
        items: [
            { symbol: "2/4", name: "單拍子", note: "" },
            { symbol: "3/4", name: "單拍子", note: "" },
            { symbol: "4/4", name: "單拍子", note: "" },
            { symbol: "6/8", name: "複拍子", note: "3 個一組，2 大拍" },
            { symbol: "9/8", name: "複拍子", note: "3 個一組，3 大拍" },
            { symbol: "12/8", name: "複拍子", note: "3 個一組，4 大拍" }
        ]
    },
    {
        title: "大調調號",
        accent: "#7c3aed",
        text: "數升號或降號就能知道大調。升號順序是 F、C、G、D、A、E、B。降號順序是 B、E、A、D、G、C、F。低音譜號的數量一樣。",
        staves: majorKeys.map(key => ({
            label: key.name,
            html: showMajorKey(key.name, "treble")
        }))
    },
    {
        title: "音名",
        accent: "#059669",
        text: "先看譜號，再看音符在線上或間上。高音譜由下而上的線是 E、G、B、D、F。低音譜由下而上的線是 G、B、D、F、A。高音譜下加一線的 C，和低音譜上加一線的 C，都是中央 C。",
        staves: ["treble", "bass"].flatMap(clef => {
            const notes = staffNotes[clef].slice();
            if (clef === "bass") notes.reverse();
            const clefName = clef === "treble" ? "高音譜號" : "低音譜號";
            return [
                { label: clefName, span: true },
                ...notes.map(note => {
                    const isMiddleC = note.letter === "C" && ((clef === "treble" && note.y === 80) || (clef === "bass" && note.y === 20));
                    return {
                        label: isMiddleC ? `中央 C・${staffPlace(note.y)}` : `${note.letter}・${staffPlace(note.y)}`,
                        html: createStaffSvg({ clef, noteY: note.y })
                    };
                })
            ];
        })
    },
    {
        title: "首調唱名",
        accent: "#d97706",
        text: "首調唱名跟著大調走。高音譜上的全音符從 Do 排到下一個 Do。",
        staves: majorKeys.map(key => ({
            label: key.name,
            html: showScale(key.name, "treble"),
            wide: true
        }))
    }
);

function renderTeachPage() {
    const teachPages = [
        ["高音譜號", "低音譜號", "升號", "降號"],
        ["音符", "休止符", "附點音符"],
        ["拍號", "拍子分類"],
        ["大調調號"],
        ["音名"],
        ["首調唱名"]
    ];
    const requestedPage = Number(location.hash.replace("#", ""));
    const pageIndex = Number.isInteger(requestedPage) && requestedPage >= 1 && requestedPage <= teachPages.length
        ? requestedPage - 1
        : 0;
    const pageLessons = teachPages[pageIndex]
        .map(title => teachLessons.find(lesson => lesson.title === title))
        .filter(Boolean);
    document.getElementById("teach-page-label").textContent = `第 ${pageIndex + 1} 頁，共 ${teachPages.length} 頁`;

    const container = document.getElementById("teach-content");
    const formatSymbol = symbol => {
        if (typeof symbol === "string" && symbol.includes("/")) {
            const [top, bottom] = symbol.split("/");
            return `<span class="time-signature teach-time"><span class="top">${top}</span><span class="bottom">${bottom}</span></span>`;
        }
        return symbol;
    };
    const lessonHtml = pageLessons.map(lesson => {
        const symbol = lesson.symbol
            ? `<div class="teach-symbol" style="color: ${lesson.accent}">${lesson.symbol}</div>`
            : "";
        const staves = lesson.staves
            ? `<div class="${lesson.staves.some(staff => staff.wide) ? "teach-staff-stack" : "teach-staff-row"}">${lesson.staves.map(staff => staff.span
                ? `<div class="teach-group-title">${staff.label}</div>`
                : `<div>
                        <div class="${staff.caption ? "teach-key-name" : "teach-label"}">${staff.label}</div>
                        ${staff.html}
                        ${staff.caption ? `<div class="teach-caption">${staff.caption}</div>` : ""}
                    </div>`
            ).join("")}</div>`
            : "";
        const items = lesson.items
            ? `<div class="teach-list">${lesson.items.map(item => `
                    <div class="teach-item">
                        <div class="teach-item-symbol">${formatSymbol(item.symbol)}</div>
                        <div class="teach-item-name">${item.name}</div>
                        <div class="teach-item-note">${item.note}</div>
                    </div>
                `).join("")}</div>`
            : "";
        return `
        <section class="teach-card" style="--accent: ${lesson.accent}">
            <h2>${lesson.title}</h2>
            ${symbol}
            ${lesson.text ? `<p>${lesson.text}</p>` : ""}
            ${staves}
            ${items}
        </section>`;
    }).join("");
    const prevDisabled = pageIndex === 0 ? "disabled" : "";
    const nextDisabled = pageIndex === teachPages.length - 1 ? "disabled" : "";
    container.innerHTML = `
        ${lessonHtml}
        <div class="teach-nav">
            <button type="button" id="teach-prev" ${prevDisabled}>上一頁</button>
            <span>${pageIndex + 1} / ${teachPages.length}</span>
            <button type="button" id="teach-next" ${nextDisabled}>下一頁</button>
        </div>
    `;
    document.getElementById("teach-prev").onclick = () => {
        location.hash = String(pageIndex);
    };
    document.getElementById("teach-next").onclick = () => {
        location.hash = String(pageIndex + 2);
    };
}

renderTeachPage();
window.addEventListener("hashchange", () => {
    renderTeachPage();
    window.scrollTo(0, 0);
});
