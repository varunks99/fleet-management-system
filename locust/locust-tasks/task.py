#!/usr/bin/env python

from locust import HttpUser, TaskSet, task
from random import random, randint


class MetricsTaskSet(TaskSet):
    @task
    def login(self):
        self.client.post('/api/manager/login',
                         {"username": "fleetadmin", "password": "fleetadmin123"})

    @task
    def get_vehicles(self):
        self.client.get('/api/vehicle')

    @task
    def add_and_delete_vehicle(self):
        uid = randint(100, 9999)
        self.client.post('/api/vehicle', {"uid": uid, "bitrate": randint(10, 90),
                                          "gasTankSize": randint(50, 100), "mrLat":  45 + random(), "mrLong": (73 + random()) * -1})
        self.client.delete(f'/api/vehicle/{uid}')


class MetricsLocust(HttpUser):
    tasks = [MetricsTaskSet]