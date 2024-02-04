from kivy.app import App
from kivy.uix.screenmanager import ScreenManager
from screens.setup_screen import SetupScreen
from screens.game_screen import GameScreen
from screens.strategy_screen import StrategyScreen

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
