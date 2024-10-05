from PyQt5.QtWidgets import QApplication, QWidget, QLabel
from PyQt5.QtCore import Qt
import os
app = QApplication([])


# Получаем текущий рабочий каталог
current_dir = os.getcwd()

# Полный путь к файлу styles.qss
styles_file = os.path.join(current_dir, "styles.qss")

with open(styles_file, "r") as f:
    stylesheet = f.read()

# Применение стилей к приложению
app.setStyleSheet(stylesheet)

window = QWidget()
label = QLabel("Hello, world!", window)

window.setGeometry(100, 100, 300, 150)
window.show()

app.exec_()