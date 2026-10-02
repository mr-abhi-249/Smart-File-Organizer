const folderInput = document.getElementById("folderPath");

const browseBtn = document.getElementById("browseBtn");
const scanBtn = document.getElementById("scanBtn");
const organizeBtn = document.getElementById("organizeBtn");

const message = document.getElementById("message");
const dashboard = document.getElementById("dashboard");
const result = document.getElementById("result");

const totalFiles = document.getElementById("totalFiles");
const movedFiles = document.getElementById("movedFiles");

const filesContainer = document.getElementById("filesContainer");


/* =========================
   BROWSE FOLDER
========================= */

browseBtn.addEventListener("click", async () => {

    message.textContent = "📂 Opening folder picker...";

    try {

        const response = await fetch("/api/browse");

        const data = await response.json();

        if (data.folder) {

            folderInput.value = data.folder;

            message.textContent =
                "✅ Folder selected. Click Scan.";

        } else {

            message.textContent =
                "No folder selected.";

        }

    } catch (error) {

        message.textContent =
            "❌ Could not open folder picker.";

        console.error(error);
    }
});


/* =========================
   SCAN FOLDER
========================= */

scanBtn.addEventListener("click", scanFolder);


async function scanFolder() {

    const folder = folderInput.value.trim();

    if (!folder) {

        message.textContent =
            "⚠️ Please select a folder first.";

        return;
    }

    message.textContent =
        "🔍 Scanning folder...";

    dashboard.classList.add("hidden");
    result.classList.add("hidden");

    try {

        const response = await fetch("/api/scan", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                folder: folder
            })
        });


        const data = await response.json();


        if (!response.ok) {

            message.textContent =
                "❌ " + data.error;

            return;
        }


        message.textContent =
            "✅ Folder scanned successfully.";


        dashboard.classList.remove("hidden");


        totalFiles.textContent =
            data.total_files;


        updateCounts(data.files);


        displayFiles(data.files);

    }

    catch (error) {

        message.textContent =
            "❌ Could not connect to server.";

        console.error(error);
    }
}


/* =========================
   UPDATE COUNTS
========================= */

function updateCounts(files) {

    const counts = {

        Images: 0,
        Videos: 0,
        Audio: 0,
        Documents: 0,
        Archives: 0,
        Code: 0,
        Others: 0
    };


    files.forEach(file => {

        if (counts[file.category] !== undefined) {

            counts[file.category]++;
        }

    });


    document.getElementById("imagesCount").textContent =
        counts.Images;

    document.getElementById("videosCount").textContent =
        counts.Videos;

    document.getElementById("audioCount").textContent =
        counts.Audio;

    document.getElementById("documentsCount").textContent =
        counts.Documents;

    document.getElementById("archivesCount").textContent =
        counts.Archives;

    document.getElementById("codeCount").textContent =
        counts.Code;

    document.getElementById("othersCount").textContent =
        counts.Others;
}


/* =========================
   DISPLAY FILES
========================= */

function displayFiles(files) {

    filesContainer.innerHTML = "";


    const title = document.createElement("h2");

    title.textContent = "Files Found";

    filesContainer.appendChild(title);


    if (files.length === 0) {

        const empty = document.createElement("p");

        empty.textContent =
            "No files found in this folder.";

        filesContainer.appendChild(empty);

        return;
    }


    files.forEach(file => {

        const item =
            document.createElement("div");

        item.className =
            "file-item";


        item.innerHTML = `

            <span>${file.name}</span>

            <span class="file-category">
                ${file.category}
            </span>

        `;


        filesContainer.appendChild(item);

    });
}


/* =========================
   ORGANIZE
========================= */

organizeBtn.addEventListener(
    "click",
    organizeFolder
);


async function organizeFolder() {

    const folder =
        folderInput.value.trim();


    if (!folder) {

        message.textContent =
            "⚠️ Please select a folder first.";

        return;
    }


    organizeBtn.disabled = true;

    organizeBtn.textContent =
        "⏳ Organizing...";


    message.textContent =
        "📦 Organizing files...";


    try {

        const response = await fetch(
            "/api/organize",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    folder: folder
                })
            }
        );


        const data =
            await response.json();


        if (!response.ok) {

            message.textContent =
                "❌ " + data.error;

            return;
        }


        movedFiles.textContent =
            data.files_moved;


        result.classList.remove(
            "hidden"
        );


        message.textContent =
            "✅ Files organized successfully.";


        updateCountsAfterOrganize(
            data.summary
        );

    }

    catch (error) {

        message.textContent =
            "❌ Could not connect to server.";

        console.error(error);

    }

    finally {

        organizeBtn.disabled = false;

        organizeBtn.textContent =
            "🚀 Organize Files";
    }
}


/* =========================
   UPDATE AFTER ORGANIZE
========================= */

function updateCountsAfterOrganize(summary) {

    document.getElementById(
        "imagesCount"
    ).textContent = summary.Images;

    document.getElementById(
        "videosCount"
    ).textContent = summary.Videos;

    document.getElementById(
        "audioCount"
    ).textContent = summary.Audio;

    document.getElementById(
        "documentsCount"
    ).textContent = summary.Documents;

    document.getElementById(
        "archivesCount"
    ).textContent = summary.Archives;

    document.getElementById(
        "codeCount"
    ).textContent = summary.Code;

    document.getElementById(
        "othersCount"
    ).textContent = summary.Others;
}