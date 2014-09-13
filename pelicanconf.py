#!/usr/bin/env python
# -*- coding: utf-8 -*- #
from __future__ import unicode_literals
from people import PEOPLE

print(PEOPLE)

AUTHOR = 'Patrick Collins'
AUTHORS = [AUTHOR]
SITENAME = 'University of Chicago Mock Trial'
SITEURL = ''

TIMEZONE = 'USA/Chicago'

DEFAULT_LANG = 'en'

# Themes
THEME = "./themes/pelican-iliork"

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

PAGE_DIR = "pages"
AWARDS_DIR = 'awards'

def subpage(page_name):
    return "/{}/{}".format(PAGE_DIR, page_name)

def award_subpage(award_year):
    return subpage('{}/{}'.format(AWARDS_DIR, award_year))

def make_award_tuple(year, to_next=1):
    title = '{}-{}'.format(year, year + to_next)
    url = award_subpage(year)
    return (title, url)

_AWARD_YEARS = [(1997, 10)] + [(x,) for x in range(2007, 2014)]

_AWARDS = [('All Time Nationals', award_subpage('nats'))] + \
    [make_award_tuple(*year_tup) for year_tup in reversed(_AWARD_YEARS)]

# TEMPLATE_PAGES = {'officers.html': 'pages/officers.html'}

# Turn on menu items
DISPLAY_PAGES_ON_MENU = True    # doesn't work with our template
MENUITEMS = [
    ('About', subpage('about')),
    ('Officers', subpage('officers')),
    ('Awards', _AWARDS),
    ('Join', subpage('join')),
]

# Article settings
ARTICLE_DIR = 'articles'



# Static Pages
STATIC_PATHS = ['images']
