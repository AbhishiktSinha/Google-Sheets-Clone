const columns = 26;
// let rows = 50;
// let currRow = 1;



function createSNoColumn(sheetObject, addingRows) {
    const sNoColumn = document.querySelector(".sNo-column");
    
    console.log("adding sno-columns: ", sNoColumn);
    let startingRow = 1;

    if (addingRows && document.querySelector(".sNo-column").childElementCount != 0) {
        startingRow = document.querySelector(".sNo-column").children.length + 1;
    }

    for (let i = startingRow; i <= sheetObject.rows; i++) {

        const sNoCell = document.createElement("div");
        sNoCell.innerText = i;
        sNoCell.className = "sNo-cell";

        sNoColumn.appendChild(sNoCell);
    }
}

// createCells(sheetObject);

function createCells(sheetObject, addingRows) {

    const cellsContainer = document.querySelector(".cells-container");

    // for all 26 columns in each row starting from
    // the curr row, create cells and give them ids

    console.log(sheetObject);

    let startingRow = 1;

    if (addingRows && document.querySelector(".sNo-column").childElementCount != 0) {
        startingRow = document.querySelector(".sNo-column").children.length + 1;
    }

    createSNoColumn(sheetObject, addingRows);

    while (startingRow <= sheetObject.rows) {

        const row = document.createElement("div");
        row.className = "row";

        for (let j = 1; j <= columns; j++) {

            const cell = document.createElement("div");
            cell.className = "cell";
            cell.id = `${String.fromCharCode(64 + j)}${startingRow}`;
            cell.contentEditable = true;

            cell.addEventListener("input", checkHeight);
            cell.addEventListener("input", onCellInput);
            cell.addEventListener("focus", updateActiveCell);
            cell.addEventListener("focus", applyCellStylingToForm);

            cell.addEventListener("keyup", (event) => {
                if (event.key === "Escape") {
                    event.target.blur();
                }
            });

            applyExistingStyleAndText(cell, sheetObject.sheetData);
            row.appendChild(cell);
        }
        cellsContainer.appendChild(row);
        startingRow++;
    }

}

function applyExistingStyleAndText(cell, sheetData) {
    if (sheetData[cell.id]) {

        const cellData = sheetData[cell.id];

        cell.style.fontFamily = cellData.fontFamily;
        cell.style.fontSize = `${cellData.fontSize}px`;

        cell.style.fontWeight = cellData.isBold ? "600" : "400";
        cell.style.textDecoration = cellData.isUnderline ? "underline" : "none";
        cell.style.fontStyle = cellData.isItalic ? "italic" : "normal";

        cell.style.textAlign = cellData.align;

        cell.style.color = cellData.textColor;
        cell.style.backgroundColor = cellData.bgColor;

        cell.innerText = cellData.text;
    }
}

// function addRows (sheetOject, moreRows) {
//     sheetOject.rows += Math.floor(Number(moreRows));
//     createCells(sheetOject);
// }

function checkHeight() {
    const activeCell = document.getElementById(getActiveCellId());

    //increase height of coreresponding sNo cell
    const sNoCell = document.querySelector(`.sNo-cell:nth-child(${activeCell.id.slice(1)})`);
    sNoCell.style.height = `${activeCell.getBoundingClientRect().height - 2}px`;
}

// TODO :connect addRows function to form submit event
// const addRowsForm = document.querySelector(".add-rows-form");
// addRowsForm.addEventListener("submit", (event)=> {

//     event.preventDefault();

//     const rowsInput = addRowsForm.querySelector("input");
//     if(rowsInput.value === null || rowsInput.value === undefined || rowsInput.value === '') {
//         alert("Please enter a value between 10 and 100");
//         return;
//     }

//     addRows(sheetObject, Number(rowsInput.value));
//     addRowsForm.reset();

// })

