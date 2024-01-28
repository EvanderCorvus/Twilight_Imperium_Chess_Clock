import numpy as np
import time

# Right now the is_running flag is not useful, but maybe it will
class PlayerClock():
    def __init__(self, player_name, total_time, increment):
        # Time is given in minutes
        self.total_time = total_time*60
        self.remaining_time = total_time*60
        self.is_running = False
        self.player_name = player_name
        self.increment = increment
        self.has_passed = False

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

    def pass_turn(self):
        self.has_passed = True

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
    def set_player_order(self, order):
        ordered_clocks = []
        for name in order:
            for clock in self.player_clocks:
                if clock.player_name == name:
                    ordered_clocks.append(clock)
                    break
        self.player_clocks = ordered_clocks
    
    def start_player_turn(self):
        self.player_clocks[self.current_player].start()

    def end_turn(self, player_pass_choice = False):
        i = self.current_player
        self.player_clocks[i].stop()
        if player_pass_choice: self.player_clocks[i].has_passed = True
        
        for _ in range(self.player_count):
            i = (i + 1) % self.player_count
            if not self.player_clocks[i].has_passed:
                self.current_player = i
                self.start_player_turn()
                break
    

                

