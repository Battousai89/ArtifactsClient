from constant_manager import ConstantsManagement
from endpoints.my_characters import MyCharacters
from endpoints.maps import Maps
from endpoints.images import Images
from endpoints.characters import Characters


def get_my_characters():
    return MyCharacters.get_my_characters()
    
def fight_character(character):
    return MyCharacters.fight(character)

def move_character(character, x, y):
    return MyCharacters.move(character, x, y)

def get_all_maps():
    return Maps.get_all_maps()

def update_images():
    return Images.update_images()

def get_character(name):
    return Characters.get_character(name)

def get_map(x, y):
    return Maps.get_map(x, y)

        