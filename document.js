
const sheetBody = document.querySelector(".sheet-body");


let sheetArray = [];

const sheetsBookmarkContainer = document.querySelector(".sheets-bookmark-container");

// no sheets to start with
let currSheet = 0;
let totalSheets = 0;
const defaultRows = 50;


function getDocumentData() {
    return sheetArray;
}
function setDocumentData(documentData) {
    sheetArray = [...documentData];
}
function setTotalSheets(n) {
    totalSheets = n;
}

addNewSheet();

sheetArray[currSheet] = { rows: defaultRows, index: currSheet, sheetData: getState() };

// autosave every 1 minute
// setInterval(updateSheetData, 60000);
document.querySelector("#save").addEventListener("click", updateSheetData);
function updateSheetData() {
    sheetArray[currSheet].sheetData = { ...getState() };
}


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
    if (currSheet != 0) {

        updateSheetData();
    }


    // remove class "active" from previously selected sheet and apply it to currently clicked sheet
    if (currSheet != 0) {

        const prevActiveButton = document.getElementById(`bookmark_sheet-${currSheet}`);
        prevActiveButton.classList.remove("active");
    }
    
    // hide the previous sheet by removing sNo-columns and cellContainer from the DOM
    if (currSheet != 0) {
        
        const sheetBodySNoContainer = document.querySelector(".sNo-column");
        console.log("hiding: prev sNo-columns: ", sheetBodySNoContainer)
        const sheetBodyCellsContainer = document.querySelector(".cells-container");
        console.log("hiding: prev cells-container: ", sheetBodyCellsContainer)

        sheetBody.removeChild(sheetBodySNoContainer);
        sheetBody.removeChild(sheetBodyCellsContainer);
    }
    
    // "active" the selected sheet bookmark
    document.getElementById(`bookmark_sheet-${sheetIdNumber}`).classList.add("active");

    // make this sheet's index as the currSheet"
    currSheet = Number(sheetIdNumber);

 
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
// createCells(sheetArray[currSheet]);


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


// remove all existing data to import new data
function removeExistingData() {

    // remove all sheet bookmarks 
    for (let bookmark of sheetsBookmarkContainer.children) {
        sheetsBookmarkContainer.removeChild(bookmark);
    }

    // clear sheetbody 
    const sheetBodySNoContainer = document.querySelector(".sNo-column");
    console.log("removing: prev sNo-columns: ", sheetBodySNoContainer)
    const sheetBodyCellsContainer = document.querySelector(".cells-container");
    console.log("removing: prev cells-container: ", sheetBodyCellsContainer)

    sheetBody.removeChild(sheetBodySNoContainer);
    sheetBody.removeChild(sheetBodyCellsContainer);


    // delete all data in sheetArray
    sheetArray = [];
    totalSheets = 0;
    currSheet = 0;

}
