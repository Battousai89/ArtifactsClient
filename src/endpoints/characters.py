from constant_manager import ConstantsManagement
import requests


constants = ConstantsManagement()

class Characters:
    ROUTE_PATH = constants.API_URL + 'characters/'

    @staticmethod
    def get_character(character_name):
        return requests.get(
            url=Characters.ROUTE_PATH + character_name,
            headers={
                'Accept': 'application/json',
            }
        ).json()