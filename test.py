from kivy.app import App
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.label import Label
from utils import GameClock  # Make sure this is your module
from kivy.clock import Clock
from setup_screen import SetupScreen
from game_screen import GameScreen
from strategy_screen import StrategyScreen

class ClockApp(App):
    def build(self):
        sm = ScreenManager()
        sm.add_widget(SetupScreen(name='setup'))
        sm.add_widget(StrategyScreen(name='strategy'))
        sm.add_widget(GameScreen(name='game'))
        sm.current = 'setup'
        return sm

if __name__ == '__main__':
    ClockApp().run()
