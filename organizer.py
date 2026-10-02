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


def organize_folder(folder_path):

    if not os.path.isdir(folder_path):
        print("Invalid folder path.")
        return

    moved_files = 0

    for filename in os.listdir(folder_path):

        source = os.path.join(folder_path, filename)

        if not os.path.isfile(source):
            continue

        extension = os.path.splitext(filename)[1].lower()

        category = get_category(extension)

        category_folder = os.path.join(folder_path, category)

        os.makedirs(category_folder, exist_ok=True)

        destination = os.path.join(category_folder, filename)

        destination = get_unique_path(destination)

        shutil.move(source, destination)

        print(f"Moved: {filename} → {category}")

        moved_files += 1

    print(f"\nOrganization completed.")
    print(f"Files moved: {moved_files}")


if __name__ == "__main__":

    print("📁 Smart File Organizer")
    print("-----------------------")

    folder = input("Enter folder path to organize: ")

    organize_folder(folder)