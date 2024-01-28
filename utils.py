import numpy as np
import time

class PlayerClock():
    def __init__(self, player_name, total_time, increment):
        self.total_time = total_time*60
        self.remaining_time = total_time*60
        self.is_running = False
        self.player_name = player_name
        self.increment = increment
    def start(self):
        if not self.is_running:
            self.is_running = True
            self.start_time = time.time()
    
    def stop(self):
        if self.is_running:
            elapsed_time = time.time() - self.start_time
            self.remaining_time -= elapsed_time - self.increment
            self.is_running = False
            if self.remaining_time < 0:
                raise Exception("{} ran out of time!".format(self.player_name))


class GameClock():
    def __init__(self, total_time, player_count, player_names, increment = 0):
        self.total_time = total_time*60
        self.remaining_time = total_time*60
        self.player_count = player_count
        self.player_names = player_names
        self.player_clocks = [PlayerClock(player_names[i],
                                        total_time/player_count,
                                        increment) for i in range(player_count)]