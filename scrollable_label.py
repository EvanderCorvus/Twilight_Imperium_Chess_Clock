from kivy.uix.label import Label
from kivy.uix.boxlayout import BoxLayout

class ScrollableLabelContainer(BoxLayout):
    def __init__(self, label_texts, **kwargs):
        super().__init__(**kwargs)
        self.orientation = 'vertical'
        self.size_hint_y = None  # Allow vertical expansion
        self.bind(minimum_height=self.setter('height'))  # Adjust height to content

        # Add labels as needed
        self.add_labels(label_texts)
    
    def add_labels(self, label_texts):
        for i in range(len(label_texts)):
            label = Label(text=f'{label_texts[i]}', size_hint_y=None, height=40)
            self.add_widget(label)
    
    def update_labels(self, label_texts):
        self.clear_widgets()
        self.add_labels(label_texts)

    def get_labels(self):
        return [child.text for child in self.children]

