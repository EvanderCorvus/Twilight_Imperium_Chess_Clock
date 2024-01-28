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
    def __init__(self, total_time, player_names, increment = 0):
        self.total_time = total_time*60
        self.remaining_time = total_time*60
        self.player_count = len(player_names)
        self.player_names = player_names
        self.current_player = 0
        self.player_clocks = [PlayerClock(player_names[i],
                                        total_time/self.player_count,
                                        increment) for i in range(self.player_count)]
    
    # This function expects a list of player names in the new order
    # This function is called at the end of the strategy phase
    def set_player_order(self, order):
        ordered_clocks = []
        for name in order:
            for clock in self.player_clocks:
                if clock.player_name == name:
                    ordered_clocks.append(clock)
                    break
        self.player_clocks = ordered_clocks
    
    def turn(self):
        self.player_clocks[self.current_player].start()

        self.current_player = (self.current_player + 1) % self.player_count
