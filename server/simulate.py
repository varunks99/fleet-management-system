import requests
import random
from time import sleep

url = 'http://localhost:8080'
username = 'fleetadmin'
ids = requests.get(f'{url}/manager/{username}').json()

try:
    print("Press Ctrl-C to exit")
    while True:
        for id in ids:
            data = {'latitude': 45.630001 + random.random(), 'longitude': -73.519997 + random.random(),
                    'speed': 80 + random.randint(0, 50), 'gas': random.randint(50, 80)}
            r = requests.put(f'{url}/vehicle/{id}', data)
        sleep(2)
except KeyboardInterrupt:
    print("Terminating...")
    pass
