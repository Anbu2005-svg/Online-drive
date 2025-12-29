let drive = JSON.parse(localStorage.getItem("drive")) || {};

function createFolder() {
    let name = document.getElementById("folderName").value.trim();
    if (!name || drive[name]) return;

    drive[name] = [];
    save();
    document.getElementById("folderName").value = "";
    render();
}

function uploadFile() {
    let folder = document.getElementById("folderSelect").value;
    let fileInput = document.getElementById("fileInput");

    if (!folder || fileInput.files.length === 0) return;

    drive[folder].push(fileInput.files[0].name);
    fileInput.value = "";
    save();
    render();
}

function render() {
    let foldersDiv = document.getElementById("folders");
    let select = document.getElementById("folderSelect");

    foldersDiv.innerHTML = "";
    select.innerHTML = "<option value=''>Select Folder</option>";

    for (let folder in drive) {
        select.innerHTML += `<option>${folder}</option>`;

        let div = document.createElement("div");
        div.className = "folder";

        let html = `<h3>📂 ${folder}</h3><ul>`;
        drive[folder].forEach(file => {
            html += `<li>📄 ${file}</li>`;
        });
        html += "</ul>";

        div.innerHTML = html;
        foldersDiv.appendChild(div);
    }
}

function save() {
    localStorage.setItem("drive", JSON.stringify(drive));
}

render();