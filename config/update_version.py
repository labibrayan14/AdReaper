import json
import xml.etree.ElementTree as ET

# Path to your files
manifest_path = './manifest.json'
xml_path = './docs/update.xml'

def update_version_in_xml(version):
    # Parse the XML file
    tree = ET.parse(xml_path)
    root = tree.getroot()

    # Find the updatecheck element and set the version attribute
    updatecheck = root.find('.//{http://www.google.com/update2/response}updatecheck')
    if updatecheck is not None:
        updatecheck.set('version', version)

    # Save the updated XML
    tree.write(xml_path, encoding='UTF-8', xml_declaration=True)

def get_version_from_manifest():
    # Read the version from manifest.json
    with open(manifest_path, 'r') as f:
        manifest_data = json.load(f)
        return manifest_data.get('version', '1.0')

if __name__ == '__main__':
    version = get_version_from_manifest()
    update_version_in_xml(version)
    print(f"Updated XML version to {version}")
