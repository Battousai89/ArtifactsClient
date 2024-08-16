from constant_manager import ConstantsManagement
from endpoints.maps import Maps
import requests
import os

constants = ConstantsManagement()

class Images:
    ROUTE_PATH = constants.IMAGES_URL + 'images/'

    @staticmethod
    def update_images():
        Images.update_maps_images()
        Images.update_characters_images()
        return 'Images Updated'
    
    @staticmethod
    def fill_maps_images(maps_data):
        for map in maps_data:
            route_path = Images.ROUTE_PATH + 'maps/' + map.get('skin') + '.png'
            file_path = constants.MAP_TILES_PATH + 'tile_' + str(map.get('x')) + '_' + str(map.get('y')) + '.png'
            
            response = requests.get(route_path)
            if response.status_code == 200:
                img_data = response.content
                os.makedirs(os.path.dirname(file_path), exist_ok=True)
                with open(file_path, 'wb') as handler:
                    handler.write(img_data)

    @staticmethod
    def update_maps_images():
        maps = Maps.get_all_maps(1, 100)
        Images.fill_maps_images(maps.get('data'))
        for index in range(2, maps.get('pages') + 1):
            maps = Maps.get_all_maps(index, 100)
            Images.fill_maps_images(maps.get('data'))
    
    @staticmethod
    def update_characters_images():
        for skin in constants.CHARACTER_SKINS:
            route_path = Images.ROUTE_PATH + 'characters/' + skin + '.png'
            file_path = constants.CHARACTER_SKINS_PATH + 'skin_' + skin + '.png'
            
            response = requests.get(route_path)
            if response.status_code == 200:
                img_data = response.content
                os.makedirs(os.path.dirname(file_path), exist_ok=True)
                with open(file_path, 'wb') as handler:
                    handler.write(img_data)