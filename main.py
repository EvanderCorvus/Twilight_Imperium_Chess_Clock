import numpy as np
from utils import *

player_clock = PlayerClock("Player 1", 0.5)

start_time = time.time() 

while True:
    player_clock.start()
    time.sleep(5)
    player_clock.stop()
    print("Remaining time: {}".format(player_clock.remaining_time))
    if player_clock.remaining_time < 0:
        break