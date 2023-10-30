# Back-End Django

Server for GloryZ Shop.

## Getting Started

Create a new environment

```bash
py -m venv .venv
```

Active environment

```bash
.venv\Scripts\activate.bat
```

Install from file requirements.txt

```bash
pip install requirements.txt
```

Create `.env` file

```bash
CLOUD_NAME=dkxrskglz
API_KEY=332831673582871
API_SECRET=WAT9JLLTzXH4EmQ4WyiyFpzxlas
SECRET_KEY=django-insecure-#+-ddtjdd7x&19tc)*o&+177pgt+^n7zeztthe1fgqye(d_8yi
DB_NAME=gloryz.db
DB_USER=root
DB_PASSWORD=12345678
```

### Migrate

```bash
py manage.py makemigrations
py manage.py migrate
```

Run the start server

```bash
py manage.py runserver
```

Create superuser

```bash
py manage.py createsuperuser
```

If you want to use with MySQL database

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.mysql",
        "NAME": os.environ.get("DB_NAME"),
        "USER": os.environ.get("DB_USER"),
        "PASSWORD": os.environ.get("DB_PASSWORD"),
        "HOST": "localhost",
        "PORT": "",
    }
}
```

Or with SQLite database

```python
DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
}
```

## Extensions & Libraries

-   [python-dotenv](https://github.com/theskumar/python-dotenv) - About Reads key-value pairs from a `.env` file and can set them as environment variables. It helps in developing applications following the 12-factor principles ⚙️

-   [djecrety.ir](https://djecrety.ir/) - DJANGO SECRET KEY GENERATOR 🔑

-   [mysqlclient](https://pypi.org/project/mysqlclient/) - MySQL database connector for Python (with Python 3 support) 🐬

-   [Pillow](https://github.com/python-pillow/Pillow) - Python Imaging Library (Fork) 🖼

-   [django-cloudinary-storage](https://github.com/klis87/django-cloudinary-storage) - Django package that provides Cloudinary storages for both media and static files as well as management commands for removing unnecessary files 💭

-   [django-colorfield](https://github.com/fabiocaccamo/django-colorfield) - 🎨 color field for django models with a nice color-picker in the admin.

-   [Jazzy](https://github.com/farridav/django-jazzmin) - Jazzy theme for Django 🏢

-   [Django Debug Toolbar](https://github.com/jazzband/django-debug-toolbar) - A configurable set of panels that display various debug information about the current request/response ⚙️

## Author

Contact me: [@zinitdev](https://github.com/zinitdev)
