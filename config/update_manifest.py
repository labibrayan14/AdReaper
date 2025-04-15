import json

def add_update_url(manifest_path, update_url):
    try:
        # Open the manifest.json file
        with open(manifest_path, 'r') as file:
            manifest_data = json.load(file)
        
        # Add the update_url to the manifest data
        manifest_data["update_url"] = update_url

        # Save the updated manifest back to the file
        with open(manifest_path, 'w') as file:
            json.dump(manifest_data, file, indent=4)

        print(f'Added update_url to {manifest_path}')
    except Exception as e:
        print(f"An error occurred: {e}")

# Usage
manifest_path = "path/to/your/manifest.json"  # Replace with the path to your manifest.json
update_url = "https://path_to_your_hosted_update.xml"  # Replace with your update URL
add_update_url(manifest_path, update_url)
