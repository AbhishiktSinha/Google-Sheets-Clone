const activeCellForm = document.querySelector(".active-cell-container >form");
const activeCellIndicator = activeCellForm.querySelector("div");
const activeCellInput = activeCellForm.querySelector("input");

function getActiveCellId() {
    return activeCellIndicator.innerText;
}
function updateActiveCell(event) {
    const focusedCell = event.target;
    // console.log(focusedCell);

    activeCellIndicator.innerText = event.target.id;
}
function resetActiveCell() {
    activeCellIndicator.innerText = 'null';
    // activeCellInput
}

activeCellInput.addEventListener("focus", (event) => {
    if (activeCellIndicator.innerText === 'null') {
        return;
    }
    console.log("focused");
    const selectedCell = document.getElementById(activeCellIndicator.innerText);
    selectedCell.classList.toggle("highlight");
})

activeCellInput.addEventListener("blur", (event) => {
    if (activeCellIndicator.innerText === 'null') {
        return;
    }
    console.log("blurred");
    const selectedCell = document.getElementById(activeCellIndicator.innerText);
    selectedCell.classList.toggle("highlight");
})

activeCellInput.addEventListener("keyup", (event) => {
    if (event.key === 'Escape') {
        event.target.value = '';
        event.target.blur();
        resetActiveCell();
    }
})

activeCellForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (activeCellIndicator.innerText === 'null') {
        alert("please select a cell");
        activeCellForm.reset();
        return;
    }

    console.log(activeCellInput.value);

    const selectedCell = document.getElementById(activeCellIndicator.innerText);
    selectedCell.innerText = eval(activeCellInput.value);

    // if(activeCellInput.value != '') {

    // }
    activeCellForm.reset();
})

activeCellIndicator.addEventListener("click", () => {
    if (activeCellIndicator.innerText === 'null') {
        return;
    }

    const activeCell = document.getElementById(`${activeCellIndicator.innerText}`);
    activeCell.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
    });
    activeCell.focus();
})




// maintain a record of modified cells in object state, 
// which stores all the styling and textual data of a cell against its id

const stylingForm = document.querySelector(".form");

const textColorIndicator = stylingForm.querySelector(".color-picker-container > label");
const backgroundColorIndicator = stylingForm.querySelector(".background-color-picker-container > label");

stylingForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("styling form submit")
    onChangeFormData();
});

stylingForm.addEventListener("change", onChangeFormData);

defaultStyle = {
    fontFamily: "Segoe UI",
    fontSize: 16,
    isBold: false,
    isUnderline: false,
    isItalic: false,
    align: "left",
    textColor: '#151515',
    bgColor: '#ffffff'
}
function getDefaultCellStyling() {
    return defaultStyle;
}

let state = {};

function onCellInput(event) {
    /* each cell is referenced by its id in the state object,
    input cell id, that is the event.target id is the same as the activeCellIndicator.innerText
    */
    // if cell is already found in the state object
    if (state[event.target.id]) {
        state[event.target.id].text = event.target.innerText;
    }
    else {
        state[event.target.id] = { ...defaultStyle, text: event.target.innerText };
    }
    // console.log(`state[${activeCellIndicator.innerText}]: `, state[event.target.id])
}

function onChangeFormData(event) {
    // when styling form data is changed for any cell,
    // apply the corresponding style changes to that cell
    // update the styling data in state object against the object of that cell

    //check if any cell is selected
    
    if(event.target.id==="file-input") {
        return;
    }


    if (activeCellIndicator.innerText === 'null') {
        stylingForm.reset();
        alert("Please select cell to apply styling");
        return;
    }

    // extract form data and apply to the selected cell;
    const selectedFormatting = {
        fontFamily: stylingForm["fontFamily"].value,
        fontSize: stylingForm["fontSize"].value,
        isBold: stylingForm["isBold"].checked,
        isItalic: stylingForm["isItalic"].checked,
        isUnderline: stylingForm.isUnderline.checked,
        align: stylingForm.align.value, // "left" | "center" | "right"
        textColor: stylingForm["textColor"].value,
        bgColor: stylingForm["bgColor"].value,
    };


    textColorIndicator.style.backgroundImage = `linear-gradient(to bottom, #181818 70%, ${stylingForm.textColor.value} 70%)`;
    backgroundColorIndicator.style.backgroundImage = `linear-gradient(to bottom, #181818 70%, ${stylingForm.bgColor.value} 70%)`;

    console.log("form change, form: ", selectedFormatting);
    applyNewStyling(selectedFormatting, activeCellIndicator.innerText);

}

function applyNewStyling(selectedFormatting, activeCellId) {
    const selectedCell = document.getElementById(activeCellId);

    selectedCell.style.fontFamily = selectedFormatting.fontFamily;
    selectedCell.style.fontSize = `${selectedFormatting.fontSize}px`;

    selectedCell.style.fontWeight = selectedFormatting.isBold ? "600" : "400";
    selectedCell.style.textDecoration = selectedFormatting.isUnderline ? "underline" : "none";
    selectedCell.style.fontStyle = selectedFormatting.isItalic ? "italic" : "normal";

    selectedCell.style.textAlign = selectedFormatting.align;

    selectedCell.style.color = selectedFormatting.textColor;
    selectedCell.style.backgroundColor = selectedFormatting.bgColor;

    state[selectedCell.id] = { ...selectedFormatting, text: selectedCell.innerText };

    // selectedCell.focus(); ----> causes conflict
    console.log(selectedCell.id, " cell style affected");

}

function applyCellStylingToForm(event) {
    // event is cell focus, target is selected cell
    const selectedCellId = event.target.id;
    console.log(`selected cell: state[${selectedCellId}]`, state[selectedCellId]);

    if (state[selectedCellId]) {
        resetForm(state[selectedCellId])
    }
    else {
        resetForm(defaultStyle);
    }
}
function resetForm(cellStyle) {
    // gets the reference from the state object or the defaultStyle object
    // so the value keys have the same name
    console.log("form reset");
    stylingForm.fontFamily.value = cellStyle.fontFamily;
    stylingForm.fontSize.value = cellStyle.fontSize;

    stylingForm.isBold.checked = cellStyle.isBold;
    stylingForm.isUnderline.checked = cellStyle.isUnderline;
    stylingForm.isItalic.checked = cellStyle.isItalic;

    stylingForm.align.value = cellStyle.align;

    stylingForm.textColor.value = cellStyle.textColor;
    stylingForm.bgColor.value = cellStyle.bgColor;

    textColorIndicator.style.backgroundImage = `linear-gradient(to bottom, #181818 70%, ${cellStyle.textColor} 70%)`;
    backgroundColorIndicator.style.backgroundImage = `linear-gradient(to bottom, #181818 70%, ${cellStyle.bgColor} 70%)`;
}

/*
function onCellBlur(event) {
    const unselectedCell = event.target;
    // console.log(event.target);
    console.log("cell blur, form reset default invoked");
    resetForm(defaultStyle);

    // resetActiveCell();
    // If use resetActive cell, active cell will be reset even when i click on the form to apply new styling

}

FIXIT: on cell blur, if i reset form to default, but don't reset active cell, then any new styling, will include the default styling 
and default styling along with the new styling change will be applied to the active cell
*/

function getState() {
    return state;
}
function setState(sheetState) {
    state = {...sheetState};
    resetForm(defaultStyle);
    resetActiveCell();
}