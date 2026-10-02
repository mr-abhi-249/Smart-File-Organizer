# 📁 Smart File Organizer

A Python + Flask web application that automatically scans a selected folder, categorizes files based on their extensions, and organizes them into separate folders such as Images, Videos, Audio, Documents, Archives, Code, and Others.

## 🚀 Features

- 📂 Browse and select a folder
- 🔍 Scan files inside the selected folder
- 📊 Display file statistics
- 🖼️ Categorize images
- 🎬 Categorize videos
- 🎵 Categorize audio files
- 📄 Categorize documents
- 📦 Categorize archive files
- 💻 Categorize programming/code files
- ❓ Handle unknown file types as Others
- 🚀 Automatically organize files
- 🔒 Prevent accidental file overwriting by creating unique filenames
- 🌐 Modern web-based interface
- 🐍 Python + Flask backend
- 💻 Runs locally on Windows

## 🛠️ Technologies Used

- Python
- Flask
- HTML5
- CSS3
- JavaScript
- Git
- GitHub

## 📂 Project Structure

```text
Smart-File-Organizer/
│
├── backend/
│   ├── app.py
│   ├── organizer.py
│   └── categories.py
│
├── frontend/
│   ├── index.html
│   ├── script.js
│   └── styles.css
│
├── categories.py
├── organizer.py
├── README.md
├── requirements.txt
└── .gitignore
```

## ⚙️ How It Works

```text
User
  │
  ▼
Select Folder
  │
  ▼
Flask Web Application
  │
  ▼
Scan Files
  │
  ▼
Identify File Extensions
  │
  ▼
Assign Categories
  │
  ▼
Display Statistics
  │
  ▼
Organize Files
  │
  ▼
Category Folders
```

## 📁 File Categories

| Category | Examples |
|---|---|
| Images | JPG, JPEG, PNG, GIF, SVG, WEBP |
| Videos | MP4, MKV, AVI, MOV, WEBM |
| Audio | MP3, WAV, AAC, FLAC, OGG |
| Documents | PDF, DOCX, TXT, PPTX, XLSX, CSV |
| Archives | ZIP, RAR, 7Z, TAR, GZ |
| Code | PY, JS, HTML, CSS, JAVA, C, CPP, JSON |
| Others | Unknown file extensions |

## ▶️ How to Run

### 1. Clone the repository

```bash
git clone https://github.com/mr-abhi-249/Smart-File-Organizer.git
```

### 2. Open the project

```bash
cd Smart-File-Organizer
```

### 3. Create a virtual environment

```bash
python -m venv .venv
```

### 4. Activate the virtual environment

Windows PowerShell:

```powershell
.venv\Scripts\Activate.ps1
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Start the Flask server

```bash
python backend\app.py
```

### 7. Open the application

Open your browser and visit:

```text
http://127.0.0.1:5000
```

## 🧪 Example

Suppose the selected folder contains:

```text
photo.jpg
movie.mp4
song.mp3
notes.pdf
program.py
archive.zip
random.xyz
```

After organization:

```text
Selected Folder/
│
├── Images/
│   └── photo.jpg
│
├── Videos/
│   └── movie.mp4
│
├── Audio/
│   └── song.mp3
│
├── Documents/
│   └── notes.pdf
│
├── Code/
│   └── program.py
│
├── Archives/
│   └── archive.zip
│
└── Others/
    └── random.xyz
```

## 🛡️ Safe File Handling

The organizer checks whether a destination filename already exists.

If a duplicate is found, it creates a unique filename instead of overwriting the existing file.

Example:

```text
photo.jpg
photo_1.jpg
photo_2.jpg
```

## 🎯 Project Goal

The goal of this project is to automate a common file-management task using Python while providing a simple web-based interface.

This project demonstrates:

- Python file handling
- Directory management
- File categorization
- Flask REST APIs
- Frontend-backend communication
- JavaScript Fetch API
- Basic web application development
- Git and GitHub workflow

## 🔮 Future Improvements

- 🤖 AI-based file categorization
- 🔎 Duplicate file detection
- 📅 Organize files by date
- 📈 File size analytics
- 🧠 Smart filename-based categorization
- ↩️ Undo organization
- 📋 Organization history
- 🎨 More customization options
- 📦 Standalone Windows application

## 👨‍💻 Project

**21 Days 21 Projects — Day 2**

**Project:** Smart File Organizer

**Domain:** Python + AI / Automation

**Developer:** Abhi Suguna Kumar Anaparthi 

## 📌 Repository

GitHub:

https://github.com/mr-abhi-249/Smart-File-Organizer
```