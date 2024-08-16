from constant_manager import ConstantsManagement
import requests


constants = ConstantsManagement()

class Maps:
    ROUTE_PATH = constants.API_URL + "maps/"

    @staticmethod
    def get_all_maps(page=1, size=50):
        return requests.get(
            url=Maps.ROUTE_PATH,
            headers={
                'Accept': 'application/json'
            },
            params={
                'page': page,
                'size': size
            }
        ).json()
    
    @staticmethod
    def get_map(x, y):
        return requests.get(
            url=Maps.ROUTE_PATH + str(x) + '/' + str(y),
            headers={
                'Accept': 'application/json',
            }
        ).json()