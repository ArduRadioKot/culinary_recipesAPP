from PyQt5.QtWidgets import QApplication, QWidget, QLabel
from PyQt5.QtCore import Qt

app = QApplication([])

# Загрузка файла со стилями
with open('styles.qss', 'r') as f:
    stylesheet = f.read()

# Применение стилей к приложению
app.setStyleSheet(stylesheet)

window = QWidget()
window.setWindowTitle("My Application")  # Set a window title
label = QLabel("Hello, world!", window)
label.setAlignment(Qt.AlignCenter)  # Center the label text

window.setGeometry(100, 100, 300, 150)
window.show()

app.exec_()