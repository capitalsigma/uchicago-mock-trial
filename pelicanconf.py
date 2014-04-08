#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals

AUTHOR = 'Patrick Collins'
AUTHORS = [AUTHOR]
SITENAME = 'University of Chicago Mock Trial'
SITEURL = ''

TIMEZONE = 'Europe/Paris'

DEFAULT_LANG = 'en'

# Themes
# _THEME_PATH = "/usr/local/lib/python3.3/dist-packages/pelican/themes"
THEME = "pelican-iliork"

# CSS Override of default
CSS_OVERWRITE = \
    '//netdna.bootstrapcdn.com/bootswatch/3.1.1/lumen/bootstrap.min.css'

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None

# Blogroll
LINKS =  (('Pelican', 'http://getpelican.com/'),
          ('Python.org', 'http://python.org/'),
          ('Jinja2', 'http://jinja.pocoo.org/'),
          ('You can modify those links in your config file', '#'),)

# Social widget
SOCIAL = (('You can add links in your config file', '#'),
          ('Another social link', '#'),)

DEFAULT_PAGINATION = 5

# Uncomment following line if you want document-relative URLs when developing
#RELATIVE_URLS = True

# Turn on menu items
DISPLAY_PAGES_ON_MENU = True    # doesn't work with our template
MENUITEMS = [
    ('About', '/pages/about'),
    ('Officers', '/pages/officers'),
    ('Awards', '/pages/awards'),
    ('Join!', '/pages/join')
]

# Article settings
ARTICLE_DIR = 'articles'

# Static Pages
STATIC_PATHS = ['static']
