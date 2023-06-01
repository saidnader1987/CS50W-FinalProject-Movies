from django.core.exceptions import ValidationError
from django.core.validators import URLValidator
from PIL import Image
from datetime import datetime
from urllib.parse import urlparse, parse_qs
import requests


def validate_url(url):
    validator = URLValidator()
    try:
        validator(url)
    except ValidationError:
        return False
    return True


def validate_image(url):
    try:
        with Image.open(requests.get(url, stream=True).raw) as img:
            pass
    except:
        return False
    else:
        return True


def validate_date(date_string):
    try:
        date = datetime.strptime(date_string, "%Y-%m-%d")
    except ValueError:
        return False
    if date > datetime.now():
        return False
    return True


def validate_youtube_url(url):
    parsed_url = urlparse(url)

    if parsed_url.netloc == "www.youtube.com":
        return 'v' in parse_qs(parsed_url.query)

    if parsed_url.netloc == "youtu.be":
        return parsed_url.path != ''

    return False


def is_valid_positive_integer(s):
    try:
        integer = int(s)
        return integer > 0
    except ValueError:
        return False


def is_valid_score(s):
    try:
        integer = int(s)
        return 1 <= integer <= 5
    except ValueError:
        return False
