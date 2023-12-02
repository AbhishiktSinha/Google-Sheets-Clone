
const sheetBody = document.querySelector(".sheet-body");


const sheetArray = [];
let currSheet = 1;
let totalSheets = 1;
const defaultRows = 50;

sheetArray[currSheet] = { rows: defaultRows, index: currSheet, sheetData: getState() };

// autosave every 1 minute
// setInterval(updateSheetData, 60000);
function updateSheetData() {
    sheetArray[currSheet].sheetData = {...getState()};
}

const sheetsBookmarkContainer = document.querySelector(".sheets-bookmark-container");
sheetsBookmarkContainer.addEventListener("click", (event) => {

    if (event.target.className === 'sheet-bookmark-button') {
        switchToSheet(event.target.id.slice(-1));
    }
})

const addSheetButton = document.querySelector(".add-sheet-button");
addSheetButton.addEventListener("click", addNewSheet);

function addNewSheet() {
    // create a new sheet bookmark
    const newSheetBookmark = document.createElement("button");
    newSheetBookmark.className = "sheet-bookmark-button";
    sheetsBookmarkContainer.appendChild(newSheetBookmark);

    // create a new sheet object with no sheet data so that when the cells are created, default structuring and styling will be followed
    sheetArray[++totalSheets] = { rows: 50, index: totalSheets, sheetData: {} };

    newSheetBookmark.id = `bookmark_sheet-${totalSheets}`;
    newSheetBookmark.innerText = `Sheet ${newSheetBookmark.id.slice(-1)}`;

    switchToSheet(newSheetBookmark.id.slice(-1));

}
function switchToSheet(sheetIdNumber) {

    // save the previous sheet
    updateSheetData();
    
    
    // remove class "active" from previously selected sheet and apply it to currently clicked sheet
    const prevActiveButton = document.getElementById(`bookmark_sheet-${currSheet}`);
    prevActiveButton.classList.remove("active");
    // "active" the selected sheet bookmark
    document.getElementById(`bookmark_sheet-${sheetIdNumber}`).classList.add("active");
    

    // make this sheet's index as the currSheet"
    currSheet = Number(sheetIdNumber);


    // hide the previous sheet by removing sNo-columns and cellContainer from the DOM
    const sheetBodySNoContainer = document.querySelector(".sNo-column");
    console.log("hiding: prev sNo-columns: ", sheetBodySNoContainer)
    const sheetBodyCellsContainer = document.querySelector(".cells-container");
    console.log("hiding: prev cells-container: ", sheetBodyCellsContainer)

    sheetBody.removeChild(sheetBodySNoContainer);
    sheetBody.removeChild(sheetBodyCellsContainer);

    // add empty sNo-column and empty cells-container to the sheetBody
    const defaultSNoColumn = document.createElement("div");
    defaultSNoColumn.className = "sNo-column";

    const defaultCellsContainer = document.createElement("div");
    defaultCellsContainer.className = "cells-container";
    sheetBody.append(defaultSNoColumn, defaultCellsContainer);

    console.log("added empty sheetbody children", sheetBody);
    
    // reset the state object
    setState(sheetArray[currSheet].sheetData);
    // add cells and sNo-cells by invoking method : 
    createCells(sheetArray[currSheet], false);

}





// create the basic layout for the document, applicable accross all sheets, leave out sheetBody {sNoColumn, and cellsContainer}
const headerRow = document.querySelector(".header-row");
createHeaderRow();
createCells(sheetArray[currSheet]);


function createHeaderRow() {
    // filling the header-row
    for (let i = 0; i < columns; i++) {

        const headerCell = document.createElement("div");
        headerCell.className = "header-cell";
        headerCell.innerText = String.fromCharCode(i + 65);

        headerRow.appendChild(headerCell);
    }
}

// TODO :connect addRows function to form submit event
const addRowsForm = document.querySelector(".add-rows-form");
addRowsForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const rowsInput = addRowsForm.querySelector("input");
    if (rowsInput.value === null || rowsInput.value === undefined || rowsInput.value === '') {
        alert("Please enter a value between 10 and 100");
        return;
    }

    const moreRows = Number(rowsInput.value);
    sheetArray[currSheet].rows += Math.floor(moreRows);

    createCells(sheetArray[currSheet], true);
    addRowsForm.reset();

});



/* now focus on sheet specific operations:
    1. create sheet 1
*/

// create sheetBody for sheet1

