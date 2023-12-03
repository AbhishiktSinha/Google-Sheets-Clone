const sheetTitle = document.querySelector(".document-title");
document.title = sheetTitle.innerText;

sheetTitle.addEventListener("blur",updateTitle);
sheetTitle.addEventListener("keypress", (event)=> {
    if(event.key === "Enter") {
        event.preventDefault();

        if(sheetTitle.innerText != '') {
            document.title = sheetTitle.innerText;
        }
        sheetTitle.blur();
    }
})
sheetTitle.addEventListener("keyup", (event)=> {
    if(event.key === 'Escape') {
        sheetTitle.blur();
    }
})
function updateTitle() {
    if(sheetTitle.innerText === '') {
        sheetTitle.innerText = document.title;
        console.log("title change to : ", sheetTitle.innerText);
        return;
    }
    console.log("title change to : ", sheetTitle.innerText);
    document.title = sheetTitle.innerText;
}
function setTItle(newTitle) {
    sheetTitle.innerText = newTitle;
    updateTitle();
}