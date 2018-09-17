# editor

##1.vim ~/.bash_profile

##2.append the IDLE PATH at end of file:export EDITOR=/Applications/PyCharm.app/Contents/MacOS/pycharm

##3.:wq

##4.source ~/.bash_profile

##5.cd to the spiderpath

##6.scrapy edit spider_name

##7.Done

# fetch

## used to “see” how your spider would fetch a certain page

# view

##  be used to check what the spider “sees” and confirm it’s what you expect

# shell

## -c 'response.status'

# parse

##call function parse()

# settings

##  scrapy settings --get BOT_NAME

# runspider

## Run a spider self-contained in a Python file, without having to create a project

# bench

## Run a quick benchmark,it tells how slow the spider I had write

# Register commands via setup.py entry points

## experimental feature

# class scrapy.spiders.Spider

## just provides a default start_requests() implementation which sends requests from the start_urlsspider attribute and calls the spider’s method parse for each of the resulting responses

# custom_settings

## A dictionary of settings that will be overridden from the project

#  Spider arguments

## scrapy crawl myspider -a category=electronics

# SitemapSpider

## Awaful!!!!!!!

# Scrapy selectors are instances of Selector class constructed by passing text or TextResponse object

# xpath It returns None if no element was found:

# .extract_first(default='not-found

# The selection methods (.xpath() or .css()) return a list of selectors of the same type, so you can call the selectionmethods for those selectors too.

# Using selectors with regular expressions

# DNSCACHE_ENABLED

#


