import os
import shutil
from categories import FILE_CATEGORIES


def get_category(extension):
    for category, extensions in FILE_CATEGORIES.items():
        if extension in extensions:
            return category

    return "Others"


def get_unique_path(destination):
    if not os.path.exists(destination):
        return destination

    folder = os.path.dirname(destination)
    filename = os.path.basename(destination)
    name, extension = os.path.splitext(filename)

    counter = 1

    while True:
        new_name = f"{name}_{counter}{extension}"
        new_path = os.path.join(folder, new_name)

        if not os.path.exists(new_path):
            return new_path

        counter += 1


def scan_folder(folder_path):
    files = []

    if not os.path.isdir(folder_path):
        return files

    for filename in os.listdir(folder_path):
        source = os.path.join(folder_path, filename)

        if not os.path.isfile(source):
            continue

        extension = os.path.splitext(filename)[1].lower()
        category = get_category(extension)

        files.append({
            "name": filename,
            "extension": extension,
            "category": category
        })

    return files


def organize_folder(folder_path):

    files = scan_folder(folder_path)

    summary = {
        "Images": 0,
        "Videos": 0,
        "Audio": 0,
        "Documents": 0,
        "Archives": 0,
        "Code": 0,
        "Others": 0
    }

    moved_files = []

    for file in files:

        filename = file["name"]
        category = file["category"]

        source = os.path.join(folder_path, filename)

        category_folder = os.path.join(folder_path, category)

        os.makedirs(category_folder, exist_ok=True)

        destination = os.path.join(category_folder, filename)

        destination = get_unique_path(destination)

        shutil.move(source, destination)

        summary[category] += 1

        moved_files.append({
            "name": filename,
            "category": category
        })

    return {
        "files_moved": len(moved_files),
        "summary": summary,
        "files": moved_files
    }