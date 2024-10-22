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
        header_image.setPixmap(QPixmap("WebApp/images/Rectangle 2.png").scaled(800, 100, Qt.KeepAspectRatio))
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

        # QLabel для изображения
        food_image = QLabel()
        food_image.setPixmap(QPixmap("WebApp/images/Rectangle 4.png").scaled(400, 200, Qt.KeepAspectRatio))
        food_image.setScaledContents(True)  # Изображение будет масштабироваться

        # QLabel для текста
        food_text = QLabel("Блюдо дня")
        food_text.setStyleSheet("color: white; font-size: 20px; text-align: center;")
        food_text.setAlignment(Qt.AlignCenter)  # Центрирование текста

        # Установка абсолютного позиционирования
        food_image.setFixedSize(400, 200)  # Устанавливаем фиксированный размер для QLabel с изображением
        food_text.setGeometry(0, 0, 400, 200)  # Устанавливаем геометрию для текста

        # Создаем контейнер для изображения и текста
        overlay = QWidget(food_image)
        overlay.setGeometry(0, 0, 400, 200)  # Устанавливаем размеры контейнера
        overlay_layout = QVBoxLayout(overlay)
        overlay_layout.addWidget(food_text, alignment=Qt.AlignCenter)  # Добавляем текст в контейнер

        food_day_layout.addWidget(food_image)
        food_day_group.setLayout(food_day_layout)

        main_layout.addWidget(food_day_group)

        # Нижняя панель с кнопками
        button_layout = QHBoxLayout()
        search_button = QPushButton(QIcon("WebApp/images/buttonsearch.png"), "")
        photo_button = QPushButton(QIcon("WebApp/images/buttonphoto.png"), "")
        button_layout.addWidget(search_button)
        button_layout.addWidget(photo_button)

        main_layout.addLayout(button_layout)

        # Кнопки меню
        menu_layout = QHBoxLayout()
        for i in range(1, 4):
            menu_button = QPushButton(str(i))
            menu_layout.addWidget(menu_button)

        main_layout.addLayout(menu_layout)

        self.setLayout(main_layout)

        # Загрузка файл стилей
        with open("/Users/aleksandrvorobev/Documents/Visot/culinary_recipesAPP/F1st version/styles.qss", "r") as f:
            self.setStyleSheet(f.read())

if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())