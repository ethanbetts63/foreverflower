import json
import os

class ColorGenerator:
    """Generates a static colors.json file."""

    def __init__(self, command):
        self.command = command

    def run(self):
        """Executes the color generation logic."""
        colors_data = [
            {"name": "Red", "hex": "#FF0000"},
            {"name": "Green", "hex": "#008000"},
            {"name": "Blue", "hex": "#0000FF"},
            {"name": "White", "hex": "#FFFFFF"},
            {"name": "Black", "hex": "#000000"},
            {"name": "Yellow", "hex": "#FFFF00"},
            {"name": "Purple", "hex": "#800080"},
            {"name": "Pink", "hex": "#FFC0CB"},
            {"name": "Orange", "hex": "#FFA500"},
        ]

        # The util file is in data_management/utils/generation_utils/
        # The data directory is in data_management/data/
        util_dir = os.path.dirname(os.path.abspath(__file__))
        data_dir = os.path.normpath(os.path.join(util_dir, '..', '..', '..', 'data'))
        
        file_path = os.path.join(data_dir, 'colors.json')
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        with open(file_path, 'w') as f:
            json.dump(colors_data, f, indent=4)
            
        self.command.stdout.write(self.command.style.SUCCESS(f'Successfully generated {os.path.abspath(file_path)}'))
