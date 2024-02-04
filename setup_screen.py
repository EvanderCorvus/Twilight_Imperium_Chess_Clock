from kivy.app import App
from kivy.uix.screenmanager import ScreenManager, Screen
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.label import Label
from utils import GameClock  # Make sure this is your module

class SetupScreen(Screen):
    def __init__(self, **kwargs):
        super(SetupScreen, self).__init__(**kwargs)
        layout = BoxLayout(orientation='vertical', padding=10, spacing=10)

        self.total_time_input = TextInput(hint_text='Enter total time in minutes', multiline=False)
        self.player_names_input = TextInput(hint_text='Enter player names separated by comma', multiline=False)
        self.increment_input = TextInput(hint_text='Enter increment in seconds', multiline=False)

        submit_button = Button(text='Start Game')
        submit_button.bind(on_press=self.submit_settings)

        layout.add_widget(Label(text='Total Time (minutes)'))
        layout.add_widget(self.total_time_input)
        layout.add_widget(Label(text='Increment (seconds)'))
        layout.add_widget(self.increment_input)
        layout.add_widget(Label(text='Player Names (comma separated)'))
        layout.add_widget(self.player_names_input)

        layout.add_widget(submit_button)

        self.add_widget(layout)

    def submit_settings(self, instance):
        total_time = float(self.total_time_input.text)
        player_names = self.player_names_input.text.split(',')
        increment = float(self.increment_input.text) 

        game_screen = self.manager.get_screen('game')
        game_screen.initialize_game(total_time, player_names, increment)
        strategy_screen = self.manager.get_screen('strategy')
        strategy_screen.initialize_strategy(total_time, player_names, increment)
        
        self.manager.current = 'strategy'        
