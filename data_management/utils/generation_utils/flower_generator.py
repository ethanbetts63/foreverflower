import json
import os

class FlowerGenerator:
    """Generates a static flowers.json file."""

    def __init__(self, command):
        self.command = command

    def run(self):
        """Executes the flower list generation logic."""
        flowers_list = [
            "Rose", "Tulip", "Carnation", "Peony", "Sunflower", "Orchid", "Lily", "Alstroemeria", "Stock",
            "Daffodil", "Daisy", "Hyacinth", "Iris", "Chrysanthemum", "Geranium", "Magnolia", "Lavender",
            "Poppy", "Bluebell", "Marigold", "Amaryllis", "Camellia", "Begonia", "Dahlia", "Zinnia",
            "Snapdragon", "Petunia", "Pansy", "Jasmine", "Hellebore", "Gardenia", "Fuchsia", "Clematis",
            "Azalea", "Anemone", "Crocus", "Ranunculus", "Gladiolus", "Foxglove", "Aster", "Forget-me-not",
            "Lily of the Valley", "Hibiscus", "Cyclamen", "Freesia", "Cosmos", "Sweet Pea", "Verbena",
            "Primrose", "Heather", "Rhododendron", "Lotus", "Violets", "Impatiens", "Calendula",
            "Black-eyed Susan", "Cherry Blossom", "Plumeria", "Bromeliad", "Calla Lily", "Canna", "Saffron",
            "Statice", "Waxflower", "Yarrow", "Allium", "Bleeding Heart", "Echinacea", "Gaillardia",
            "Morning Glory", "Nasturtium", "Phlox", "Salvia", "Sedum", "Thistle", "Veronica", "Wallflower",
            "Wisteria", "Gloxinia", "Cornflower", "Hydrangea", "Bougainvillea", "Gerbera Daisy", "Buddleia",
            "Lantana"
        ]
        
        util_dir = os.path.dirname(os.path.abspath(__file__))
        data_dir = os.path.normpath(os.path.join(util_dir, '..', '..', '..', 'data'))
        
        file_path = os.path.join(data_dir, 'flowers.json')
        os.makedirs(os.path.dirname(file_path), exist_ok=True)
        
        with open(file_path, 'w') as f:
            json.dump(flowers_list, f, indent=4)
            
        self.command.stdout.write(self.command.style.SUCCESS(f'Successfully generated {os.path.abspath(file_path)}'))
