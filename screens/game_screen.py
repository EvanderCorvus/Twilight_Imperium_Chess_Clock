from kivy.uix.screenmanager import Screen
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.button import Button
from kivy.uix.label import Label
from utils import GameClock  # Make sure this is your module
from kivy.clock import Clock


class GameScreen(Screen):
    def __init__(self, **kwargs):
        super(GameScreen, self).__init__(**kwargs)

    def initialize_game(self, total_time, player_names, increment):
        self.clear_widgets()
        # Initialize your GameClock with the settings
        self.player_names = player_names
        self.game_clock = GameClock(total_time, player_names, increment)
        self.passed_players = []
        # Proceed to build the game UI based on these settings
        # This might include creating player labels, time labels, etc., as shown in previous examples
        self.layout = BoxLayout(orientation='vertical')
        
        self.player_labels = [Label(text=player.player_name) for player in self.game_clock.player_clocks]
        self.time_labels = [Label(text=str(player.remaining_time)) for player in self.game_clock.player_clocks]
        for i in range(len(self.player_labels)):
            player_layout = BoxLayout(orientation='horizontal')
            player_layout.add_widget(self.player_labels[i])
            player_layout.add_widget(self.time_labels[i])
            self.layout.add_widget(player_layout)
        
        start_button = Button(text='Start Turn')
        start_button.bind(on_press=self.start_turn)
        self.layout.add_widget(start_button)
        
        stop_button = Button(text='End Turn')
        stop_button.bind(on_press=self.end_turn)
        self.layout.add_widget(stop_button)
        
        stop_button = Button(text='Pass Turn')
        stop_button.bind(on_press=self.pass_turn)
        self.layout.add_widget(stop_button)

        stop_button = Button(text='Pause Game')
        stop_button.bind(on_press=self.pause_game)
        self.layout.add_widget(stop_button)

        self.add_widget(self.layout)

        self.update_event = Clock.schedule_interval(self.update_ui, 1)

    def start_turn(self, instance):
        self.game_clock.start_player_turn()
        self.update_ui()
    
    def end_turn(self, instance):
        self.game_clock.end_turn()
        self.update_ui()  # Immediate UI update

    def pause_game(self, instance):
        self.game_clock.pause_clocks()
        self.update_ui()
    
    def pass_turn(self, instance):
        current_player = self.game_clock.current_player
        self.passed_players.append(current_player)
        if len(self.passed_players) == len(self.player_names):
            self.passed_players = []
            game_screen = self.manager.get_screen('strategy')
            game_screen.clear_text_inputs()
            self.manager.current = 'strategy'
        self.game_clock.end_turn(player_pass_choice=True)
        self.update_ui()
    
    def reorder_players(self, player_names):
        self.game_clock.set_player_order(player_names)
        self.update_ui()
    
    def update_ui(self, dt=None):
        for i, player_clock in enumerate(self.game_clock.player_clocks):
            self.player_labels[i].text = player_clock.player_name
            self.time_labels[i].text = str(round(player_clock.broadcast_current_time(), 2))
