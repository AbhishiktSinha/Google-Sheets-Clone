const downloadButton = document.querySelector("#export");
downloadButton.addEventListener("click", exportData);


function exportData() {
    const jsonData = JSON.stringify(state);
    const blob = new Blob([jsonData], { type: "text/plain" });

    const url = URL.createObjectURL(blob);
    const donwloadLink = document.createElement("a");
    donwloadLink.download = document.title + ".txt";
    donwloadLink.href = url;

    donwloadLink.click();
}