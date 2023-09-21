let felds = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null
];

let currentPlayer = 'circle'; // Startspieler

function init() {
    render();
}

function render() {
    const contentDiv = document.getElementById('content');
    const table = document.createElement('table');

    for (let i = 0; i < 3; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement('td');
            const index = i * 3 + j;

            cell.onclick = function () {
                if (!felds[index] && !isGameOver()) { // Überprüfen, ob das Feld bereits belegt ist und das Spiel nicht vorbei ist
                    felds[index] = currentPlayer;
                    cell.innerHTML = currentPlayer === 'circle' ? generateCircleSVG() : generateCrossSVG();
                    cell.onclick = null; // Entfernen des onclick-Ereignisses nach dem Setzen eines Symbols
                    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // Wechsel des Spielers

                    if (isGameOver()) {
                        drawWinLine();
                    }
                }
            };

            row.appendChild(cell);
        }
        table.appendChild(row);
    }

    contentDiv.innerHTML = '';
    contentDiv.appendChild(table);
}

function isGameOver() {
    // Gewinnkombinationen (Indizes der Felder, die zum Gewinn führen)
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale
        [0, 4, 8], [2, 4, 6] // Diagonale
    ];

    // Überprüfen, ob eine Gewinnkombination erreicht wurde
    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (felds[a] && felds[a] === felds[b] && felds[a] === felds[c]) {
            return true; // Ein Spieler hat gewonnen
        }
    }

    // Überprüfen, ob das Spielfeld voll ist (Unentschieden)
    if (felds.every(cell => cell !== null)) {
        return true; // Unentschieden
    }

    return false; // Das Spiel ist noch nicht vorbei
}

function restart(){
    felds = [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        null
    ];
    render();
}


function drawWinLine() {
    // Gewinnkombinationen (Indizes der Felder, die zum Gewinn führen)
    const winCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale
        [0, 4, 8], [2, 4, 6] // Diagonale
    ];

    // Berechnen Sie die Breite und Höhe der Box basierend auf der Anzahl der Zeilen und Spalten
    const numRows = 3; // Anzahl der Zeilen im Spielbrett
    const numCols = 3; // Anzahl der Spalten im Spielbrett
    const boxWidth = 300 / numCols; // Breite der Box
    const boxHeight = 300 / numRows; // Höhe der Box

    // Überprüfen, welche Gewinnkombination erreicht wurde
    for (const combination of winCombinations) {
        const [a, b, c] = combination;
        if (felds[a] && felds[a] === felds[b] && felds[a] === felds[c]) {
            // Die Kombination wurde gewonnen, wir zeichnen die Linie
            const contentDiv = document.getElementById('content');
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            const svgLine = document.createElementNS("http://www.w3.org/2000/svg", "line");

            // Koordinaten der siegreichen Felder
            const x1 = (a % numCols) * boxWidth + boxWidth / 2;
            const y1 = Math.floor(a / numCols) * boxHeight + boxHeight / 2;
            const x2 = (c % numCols) * boxWidth + boxWidth / 2;
            const y2 = Math.floor(c / numCols) * boxHeight + boxHeight / 2;

            svg.setAttribute("width", `${boxWidth * numCols}`);
            svg.setAttribute("height", `${boxHeight * numRows}`);

            // Fügen Sie eine CSS-Klasse zur SVG hinzu
            svg.setAttribute("class", "win-svg");

            // Fügen Sie eine CSS-Klasse zur Linie hinzu
            svgLine.setAttribute("class", "win-line");

            svgLine.setAttribute("x1", x1);
            svgLine.setAttribute("y1", y1);
            svgLine.setAttribute("x2", x2);
            svgLine.setAttribute("y2", y2);
            svgLine.setAttribute("stroke", "red"); // Farbe der Linie
            svgLine.setAttribute("stroke-width", "5"); // Dicke der Linie

            svg.appendChild(svgLine);
            contentDiv.appendChild(svg);
        }
    }
}


function generateCircleSVG() {
    const circleColor = "#00B0EF"; // Farbe des Kreises
    const circleSize = 70; // Breite und Höhe des Kreises

    // SVG-HTML-Code für den Kreis mit Füllungsanimation
    const svgCode = `
        <svg width="${circleSize}" height="${circleSize}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${circleSize / 2}" cy="${circleSize / 2}" r="${circleSize / 2 - 5}" fill="none" stroke="${circleColor}" stroke-width="10">
                <animate attributeName="r" from="0" to="${circleSize / 2 - 5}" dur="1s" begin="0s" fill="freeze" />
            </circle>
        </svg>
    `;

    return svgCode;
}

function generateCrossSVG() {
    const crossColor = "#FFC000"; // Farbe des Kreuzes
    const crossSize = 70; // Breite und Höhe des Kreuzes

    // SVG-HTML-Code für das Kreuz mit Füllungsanimation
    const svgCode = `
        <svg width="${crossSize}" height="${crossSize}" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="${crossSize}" x2="${crossSize}" y2="0" stroke="${crossColor}" stroke-width="10">
                <animate attributeName="stroke-width" from="0" to="10" dur="1s" begin="0s" fill="freeze" />
            </line>
            <line x1="0" y1="0" x2="${crossSize}" y2="${crossSize}" stroke="${crossColor}" stroke-width="10">
                <animate attributeName="stroke-width" from="0" to="10" dur="1s" begin="0s" fill="freeze" />
            </line>
        </svg>
    `;

    return svgCode;
}
