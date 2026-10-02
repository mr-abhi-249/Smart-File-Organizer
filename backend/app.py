from flask import Flask, request, jsonify, send_from_directory
from organizer import scan_folder, organize_folder
import os
import tkinter as tk
from tkinter import filedialog


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

app = Flask(__name__)


@app.route("/")
def home():
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.route("/script.js")
def script():
    return send_from_directory(FRONTEND_DIR, "script.js")


@app.route("/api/browse", methods=["GET"])
def browse():

    root = tk.Tk()
    root.withdraw()
    root.attributes("-topmost", True)

    folder = filedialog.askdirectory(
        title="Select Folder to Organize"
    )

    root.destroy()

    return jsonify({
        "folder": folder
    })


@app.route("/api/scan", methods=["POST"])
def scan():

    data = request.get_json()

    if not data or "folder" not in data:
        return jsonify({
            "error": "Folder path is required"
        }), 400

    folder = data["folder"]

    if not os.path.isdir(folder):
        return jsonify({
            "error": "Invalid folder path"
        }), 400

    files = scan_folder(folder)

    return jsonify({
        "total_files": len(files),
        "files": files
    })


@app.route("/api/organize", methods=["POST"])
def organize():

    data = request.get_json()

    if not data or "folder" not in data:
        return jsonify({
            "error": "Folder path is required"
        }), 400

    folder = data["folder"]

    if not os.path.isdir(folder):
        return jsonify({
            "error": "Invalid folder path"
        }), 400

    result = organize_folder(folder)

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)