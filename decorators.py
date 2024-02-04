from functools import wraps
from kivy.uix.popup import Popup
from kivy.uix.label import Label
def value_error_handler(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except ValueError:
            show_error_popup("An error occurred. Please check your input and try again.")
            self.manager.current = 'game' 
            # Return or raise something if necessary
    return wrapper

def show_error_popup(message):
    popup = Popup(title='Error',
                  content=Label(text=message),
                  size_hint=(None, None), size=(400, 200))
    popup.open()

# # Example usage of the decorator
# @value_error_handler
# def might_raise_value_error(x):
#     # Example function that might raise a ValueError
#     if x < 0:
#         raise ValueError("x cannot be negative")
#     return x ** 0.5
