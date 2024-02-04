from kivy.uix.screenmanager import Screen
from kivy.uix.boxlayout import BoxLayout
from kivy.uix.textinput import TextInput
from kivy.uix.button import Button
from kivy.uix.label import Label
from kivy.uix.gridlayout import GridLayout

class StrategyScreen(Screen):
    def __init__(self, **kwargs):
        super(StrategyScreen, self).__init__(**kwargs)
        
    def initialize_strategy(self, total_time, player_names, increment):
        self.clear_widgets()
        self.player_names = player_names
        self.total_time = total_time
        self.increment = increment

        layout = BoxLayout(orientation='vertical')
        title_label = Label(text='Strategy Phase', size_hint_y=None, height=100, font_size='20sp')
        layout.add_widget(title_label)

        grid = GridLayout(cols=2)
        self.text_inputs = []

        for name in player_names:
            label = Label(text=name)
            grid.add_widget(label)
            text_input = TextInput(multiline=False)
            self.text_inputs.append(text_input)
            grid.add_widget(text_input)

        submit_button = Button(text='Submit')
        submit_button.bind(on_press=self.submit)

        layout.add_widget(grid)
        layout.add_widget(submit_button) 

        self.add_widget(layout)

    def clear_text_inputs(self):
        for text_input in self.text_inputs:
            text_input.text = ''

    def submit(self, instance):
        game_screen = self.manager.get_screen('game')
        strategy_cards = []
        for text_input in self.text_inputs:
            strategy_cards.append(int(text_input.text)-1)
        pairs_sorted = sorted(zip(strategy_cards, self.player_names))

        player_names = [player_name for _, player_name in pairs_sorted]
        game_screen.reorder_players(player_names)
        self.manager.current = 'game' 
        