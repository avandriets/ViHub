# ViHub
Система коллективной работы

1. Установите [Node.js](https://nodejs.org), MySQL, Apache
    Пример установки для опеционной системы Ubuntu
    - Установите node
    `$ sudo apt-get install -y nodejs`
    - Установите менеджер пакетов npm
    `$ sudo apt install npm`
    - Verify that you are running node v4.x.x or higher and npm 3.x.x or higher
        by running the commands node -v and npm -
    - Установка MySQL
        `sudo apt install mysql-server-5.7`
        > Варианты перезапуска сервера MySQL

        ```
        ps ax | grep mysql
        sudo service mysql start
        sudo /etc/init.d/mysql start
        ```
        Установите или снимите защиту на доступ к MySQL только с локальной машини
    - Установка Apache
        ```
        $ sudo apt install apache2

        # устанавливаем правильное имя сервера
        $ sudo nano /etc/apache2/apache2.conf

        # Проверяем кофигурацию
        $ sudo apache2ctl configtest

        # Перезапускаем сервер
        $ sudo systemctl restart apache2
        ```


2. Скопируйте проект в локальную папку
    ```$ git clone https://github.com/digitallifelab/ViHub.git [project-folder]```

3. Настройка web сервера Apache

    - Настройте mod_wsgi далее шаги по настройке
        - Устанавлиаем через менеджер пакетов
            > apache2-dev для сборки mod_wsgi из исходников

            `$sudo apt install apache2-dev`
            > Ставим mod-wsgi для python3 (т/к/ я не знаю как руками включить mod_wsgi для apache)

            `$ sudo apt install libapache2-mod-wsgi-py3`

            > Устанавливаем из исходников mod_wsgi версия 4.5.7 т/к/ та что посталяется с менеджером пакетов корявая

            ```$ cd /usr
            $ sudo wget https://pypi.python.org/packages/28/a7/de0dd1f4fae5b2ace921042071ae8563ce47dac475b332e288bc1d773e8d/mod_wsgi-4.5.7.tar.gz
            $ sudo tar xzf mod_wsgi-4.5.7.tar.gz
            $ cd mod_wsgi-4.5.7/
            $ sudo ./configure --with-python=/usr/bin/python3.5
            $ sudo make
            $ sudo make install
            ```

        - Проверить в установился ли mod_wsgi правильно (в катлоге на тот ли файл смотрят сим линки)


    - Настройте каталог для static и для media файлов проекта
        >в каталоге var/www/[project-directory] создаем линки каталог static и media в каталоге проекта

    - Натроить config файл для Apache
        >Расположение файла с конфигурацией /etc/apache2/sites-available/000-default.conf

        `$ sudo nano /etc/apache2/sites-available/000-default.conf`


        ```
        <VirtualHost *:80>
                ServerName today.net

                ServerAdmin avandriets@gmail.com

                DocumentRoot /var/www/html

                ErrorLog ${APACHE_LOG_DIR}/today_error.log
                CustomLog ${APACHE_LOG_DIR}/today_access.log combined

                WSGIDaemonProcess today processes=2 threads=15 display-name=%{GROUP} python-path=/home/toDayUser21/today/prod:/home/toDayUser21/today/env/lib/python3.5/site-packages
                WSGIProcessGroup today
                WSGIScriptAlias / /home/toDayUser21/today/prod/ToDay/wsgi.py
                WSGIPassAuthorization On

                <Directory /home/toDayUser21/today/prod/ToDay/>
                        <Files wsgi.py>
                                Order deny,allow
                                Require all granted
                        </Files>
                </Directory>

                AliasMatch ^/([^/]*\.css) /var/www/today/static/$1

                Alias /media/ /var/www/today/media/
                Alias /static/ /var/www/today/static/
                <Directory /var/www/today/static>
                        Order deny,allow
                        Allow from all
                </Directory>

                <Directory /var/www/today/media>
                        Order deny,allow
                        Allow from all
                </Directory>

        </VirtualHost>
        ```

    - Перезагрузка сервера
        `$ sudo service apache2 restart`
4. Настройки Django проекта под MySQL сервер
    - Библиотека для работы python3 и MySQL
        `$ sudo apt install libmysqlclient-dev`
    - Создаем базу данных для проекта через консольную улилиту **mysql**
        > запускаем утилиту

        `$ mysql -u root -p`

        > исполняем в утилите команды
        ```
        CREATE DATABASE [имя базы данных] CHARACTER SET utf8;
        CREATE USER '[имя пользователя]'@'localhost' IDENTIFIED BY '[пароль]';
        GRANT ALL ON [имя пользователя].* TO '[имя базы данных]'@'localhost';
        ```

        > для достпа пользователя с любого ip адреса создайте пользователя вида '[имя пользователя]'@'%'

    - Мигрируйте данные ORM из Django в базу данных
        `$ ../env/bin/python3 manage.py makemigrations [имя пакета] [имя пакета]`
        `$ ../env/bin/python3 manage.py migrate`

5. Соберите статические файлы проекта
`$ ../env/bin/python3 manage.py collectstatic`

6. Установить виртуальное окружение
`[каталог для ]$ python3 -m virtualenv env`

7. Установить рекомендуемые пакеты
`$ sudo ../env/bin/pip3 install -r requirements.txt`

8. Установите необходимые пакеты для Angular приложения
    - Запустите npm install в каталоге static
    `static$ npm install`
    - Скомпилируйте ts файлы в js
    `static$ npm start`

9. Убидитесь что angular прилоение запущено в production режиме

