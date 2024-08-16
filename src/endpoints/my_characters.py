from constant_manager import ConstantsManagement
import requests


constants = ConstantsManagement()

class MyCharacters:
    ROUTE_PATH = constants.API_URL + "my/"

    @staticmethod
    def get_my_characters():
        return requests.get(
            url=MyCharacters.ROUTE_PATH + 'characters',
            headers={
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + constants.API_TOKEN,
            }
        ).json()

    @staticmethod
    def move(character, x, y):
        return requests.post(
            url=MyCharacters.ROUTE_PATH + character + '/action/move',
            headers={
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + constants.API_TOKEN,
                'Content-Type': 'application/json'
            },
            json={
                'x': x,
                'y': y 
            }
        ).json()
    
    @staticmethod
    def fight(character):
        return requests.post(
            url=MyCharacters.ROUTE_PATH + character + '/action/fight',
            headers={
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + constants.API_TOKEN,
                'Content-Type': 'application/json'
            }
        ).json()