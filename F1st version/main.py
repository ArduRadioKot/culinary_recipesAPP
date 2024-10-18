import sys
from PyQt5.QtGui import QPixmap, QIcon
from PyQt5.QtWidgets import QApplication, QWidget, QVBoxLayout, QHBoxLayout, QPushButton, QLabel, QGroupBox
from PyQt5.QtCore import Qt

class MainWindow(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Document")
        self.setGeometry(100, 100, 800, 600)

        # Основной вертикальный макет
        main_layout = QVBoxLayout()

        # Заголовок
        header_layout = QHBoxLayout()
        header_image = QLabel()
        header_image.setPixmap(QPixmap("images/Rectangle 2.png").scaled(800, 100, Qt.KeepAspectRatio))
        header_layout.addWidget(header_image)

        # Кнопки в заголовке
        set_button = QPushButton("Set")
        theme_button = QPushButton("Theme")
        header_layout.addWidget(set_button)
        header_layout.addWidget(theme_button)

        main_layout.addLayout(header_layout)

        # Блок с блюдом дня
        food_day_group = QGroupBox("Блюдо дня")
        food_day_layout = QVBoxLayout()

        food_image = QLabel()
        food_image.setPixmap(QPixmap("images/Rectangle 4.png").scaled(400, 200, Qt.KeepAspectRatio))
        food_text = QLabel("k.lj lyf ,k.lj lyz ,k.lj lyz")
        food_button = QPushButton("Готовить")

        food_day_layout.addWidget(food_image)
        food_day_layout.addWidget(food_text)
        food_day_layout.addWidget(food_button)
        food_day_group.setLayout(food_day_layout)

        main_layout.addWidget(food_day_group)

        # Нижняя панель с кнопками
        button_layout = QHBoxLayout()
        search_button = QPushButton(QIcon("images/buttonsearch.png"), "")
        photo_button = QPushButton(QIcon("images/buttonphoto.png"), "")
        button_layout.addWidget(search_button)
        button_layout.addWidget(photo_button)

        main_layout.addLayout(button_layout)

        # Кнопки меню
        menu_layout = QHBoxLayout()
        for i in range(1, 4):
            menu_button = QPushButton(str(i))  # Исправлено: убран пробел
            menu_layout.addWidget(menu_button)

        main_layout.addLayout(menu_layout)

        self.setLayout(main_layout)

        # Загрузка файл стилей
        with open("style.qss", "r") as f:
            self.setStyleSheet(f.read())

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())