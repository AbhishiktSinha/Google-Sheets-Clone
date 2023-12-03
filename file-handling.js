const downloadButton = document.querySelector("#export");
downloadButton.addEventListener("click", exportData);


function exportData() {
    updateSheetData(); // save current sheet, rest are already saved

    const jsonDocData = JSON.stringify(getDocumentData());
    const blob = new Blob([jsonDocData], { type: "application/json" });

    const url = URL.createObjectURL(blob);
    const donwloadLink = document.createElement("a");
    donwloadLink.download = document.title + ".txt";
    donwloadLink.href = url;

    donwloadLink.click();
}


// importing a file ----------------------------------------------------------------------------------

const fileInputElement = document.querySelector("input[type='file'");
fileInputElement.addEventListener("change", handleImportedFile);

function handleImportedFile(event) {
    const fileInput = event.target;
    const files = event.target.files; // file-list

    console.info("selected file:", fileInput.value);

    let importedJsonData = undefined;

    // get that file

    // at least one file is selected;
    if (files.length > 0) {

        const selectedFile = files[0];
        console.info("file selected :", selectedFile.name);

        // validate file type 
        if (selectedFile.name.endsWith(".txt")) {

            // now read using a FileReader instance

            const fileReader = new FileReader();

            fileReader.addEventListener("load", (e) => {
                // if the file has been successfully read i.e loaded then the result is available
                // and ready to be parsed

                // event is load event, target is the FileReader instance
                const readyFile = e.target.result;

                // try to parse the file as a JSON
                try {
                    importedJsonData = JSON.parse(readyFile);

                    console.log("new data availabale:", importedJsonData);
                    
                    loadNewDocument(importedJsonData, files[0].name);
                }
                catch (error) {
                    console.error("error parsing imported file as a JSON:", error);
                }
            })

            fileReader.readAsText(selectedFile);
        }
        else {
            console.error("file type not valid");
        }
    }
    else {
        console.error("no file selected");
    }

}

function loadNewDocument(importedJsonData, fileNameTxt) {
    // remove existing data
    removeExistingData();

    
    // let documentData = getDocumentData();
    // documentData[0] = importedJsonData[0];
    
    // add new sheetbookmarks
    createSheetBookmarksFromImportedFile(importedJsonData.length-1);

    // add new sheetData in the sheetArray
    setDocumentData(importedJsonData);

    // switch to sheet 1
    switchToSheet(1);

    // make importedFile name as the new title
    setTItle(fileNameTxt.slice(0, fileNameTxt.indexOf('.')));    

}
function createSheetBookmarksFromImportedFile(n) {
    // sheet 1 bookmark is created by default, start from sheet 2
    const sheetsBookmarkContainer = document.querySelector(".sheets-bookmark-container");

    for (let i = 1; i <= n; i++) {
        const newSheetBookmark = document.createElement("button");
        newSheetBookmark.className = "sheet-bookmark-button";
        sheetsBookmarkContainer.appendChild(newSheetBookmark);

        newSheetBookmark.id = `bookmark_sheet-${i}`;
        newSheetBookmark.innerText = `Sheet ${newSheetBookmark.id.slice(-1)}`;
    }
}