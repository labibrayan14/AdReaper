import os
import json
import re
import shutil


new_path = "./temp/"


# 🔹 Old and New Names (Fix Order to Prevent Conflicts)
REPLACEMENTS = {
    r"\bublock origin lite\b": "AdReaper",
    r"\bublock origin\b": "AdReaper",
    r"\bublock\b": "AdReaper",
    r"\bubol\b": "AdReaper",
    r"\bubo\b": "AdReaper",
    r"\buborigin\b": "AdReaper",
    r"\bgorhill\b": "Labibrayan14",
    r"\braymond hill\b": "Labib Rayan"
}

# 🔹 Rename Files & Folders
def rename_files_and_folders(root_path):
    for dirpath, dirnames, filenames in os.walk(root_path, topdown=False):
        # Rename files
        for filename in filenames:
            old_file_path = os.path.join(dirpath, filename)
            new_filename = filename
            for old, new in REPLACEMENTS.items():
                new_filename = re.sub(old, new, new_filename, flags=re.IGNORECASE)

            new_file_path = os.path.join(dirpath, new_filename)
            if old_file_path != new_file_path:
                os.rename(old_file_path, new_file_path)
                print(f"[✔] Renamed file: {old_file_path} → {new_file_path}")

        # Rename folders
        for dirname in dirnames:
            old_dir_path = os.path.join(dirpath, dirname)
            new_dirname = dirname
            for old, new in REPLACEMENTS.items():
                new_dirname = re.sub(old, new, new_dirname, flags=re.IGNORECASE)

            new_dir_path = os.path.join(dirpath, new_dirname)
            if old_dir_path != new_dir_path:
                os.rename(old_dir_path, new_dir_path)
                print(f"[✔] Renamed folder: {old_dir_path} → {new_dir_path}")

# 🔹 Update File Contents
def update_file_contents(root_path):
    for dirpath, _, filenames in os.walk(root_path):
        for filename in filenames:
            file_path = os.path.join(dirpath, filename)

            # Only process text-based files
            if filename.endswith((".json", ".js", ".html", ".css", ".md", ".txt")):
                try:
                    with open(file_path, "r", encoding="utf-8") as file:
                        content = file.read()

                    # Replace occurrences case-insensitively
                    new_content = content
                    for old, new in REPLACEMENTS.items():
                        new_content = re.sub(old, new, new_content, flags=re.IGNORECASE)

                    if new_content != content:
                        with open(file_path, "w", encoding="utf-8") as file:
                            file.write(new_content)
                        print(f"[✔] Updated contents: {file_path}")

                except Exception as e:
                    print(f"[❌] Error processing {file_path}: {e}")

# 🔹 Modify manifest.json (Update Extension Name)
def update_manifest(root_path):
    manifest_path = os.path.join(root_path, "manifest.json")
    if os.path.exists(manifest_path):
        with open(manifest_path, "r", encoding="utf-8") as file:
            manifest_data = json.load(file)

        manifest_data["name"] = "AdReaper"
        manifest_data["short_name"] = "AdReaper"

        with open(manifest_path, "w", encoding="utf-8") as file:
            json.dump(manifest_data, file, indent=4, ensure_ascii=False)
        print("[✔] Updated manifest.json")

# 🔹 Modify messages.json (for UI name change)
def update_messages(root_path):
    locales_path = os.path.join(root_path, "_locales", "en", "messages.json")
    if os.path.exists(locales_path):
        with open(locales_path, "r", encoding="utf-8") as file:
            messages_data = json.load(file)

        if "extensionName" in messages_data:
            messages_data["extensionName"]["message"] = "AdReaper"

        with open(locales_path, "w", encoding="utf-8") as file:
            json.dump(messages_data, file, indent=4, ensure_ascii=False)
        print("[✔] Updated messages.json")

# 🔹 Run All Tasks on the New Folder
rename_files_and_folders(new_path)
update_file_contents(new_path)
update_manifest(new_path)
update_messages(new_path)
