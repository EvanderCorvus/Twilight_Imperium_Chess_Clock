This #project is to program a clock for twilight imperium that works effectively as a chess clock.
## Purpose
On a general gameplay-level, the clock is meant to subject the game to a new constraint, similar to chess. Mainly, this is due to the logic that with more time comes better play and thus this equalizes this aspect for everyone and makes sure that a game is finished under the needed time constraint (e.g. a day).
The clock is meant to run on a single device, ideally a phone. At the end of one's turn, you press and then it's the next player's turn, whose clock is now ticking. This also solves the issue of forgetting who's next, because on the end of your turn you always pass the clock to the next player, and the clock tells you which player.

## Functionality and Rules
The game has three main phases: Strategy, Action and Agenda. The clock could be implemented to work for all phases, but as a start, we will focus only on the Action phase of the game. Thus, during the strategy and agenda phases, the clock will be paused.

At the end of the strategy phase, a new order of turn is set. Therefore the end of the strategy phase will conclude with setting up the new turn order of the clock, and the first player will then start the timer.

Now, what exactly happens when a timer **runs out** depends. Here are some possibilities:
- You immediately pass (if able) or you take a strategic action, then you gain a fixed amount of time (like 10 minutes).
- If, for example, the clock is the number of hours of play for the game (agreed upon all players) divided by the amount of players, meaning that each player gets an equal share of the total amount of time for the action phase, then maybe you can get a punish like losing a victory point, a command token or some other debilitating effect (imagine if you suddenly didn't have any production left to rebuild your fleet after a big fight), time is a resource now as well!

Reasonable **Exceptions**:
- During battle, the clock could be paused because otherwise it punishes you for attacking with too many units.


## Implementation

To run python applications on mobile devices, something like Kivy might fit the bill:
https://kivy.org/doc/stable/gettingstarted/intro.html

### Python Roadmap
The clock itself will be an instance of a custom class, which will be an array of player clocks. So there are the following elements:
- a player clock 
	- some functionality when a given time runs out
	- functionality when player has passed
- a global game clock (array of player clocks)
- a function to change the order or the array
- a function to start, pause and set initial time

