#!/usr/bin/env python

from locust import HttpUser, TaskSet, task
from random import random, randint


class ClientTaskSet(TaskSet):
    @task
    def load_home(self):
        self.client.get('/')

    @task
    def load_login(self):
        self.client.get('/login')

    def stop(self):
        self.interrupt()


class ServerTaskSet(TaskSet):
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
        self.client.delete(f'/api/vehicle/{uid}', name="/api/vehicle/[uid]")

    def stop(self):
        self.interrupt()


class MetricsLocust(HttpUser):
    tasks = [ClientTaskSet, ServerTaskSet]
