# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/items.html

import scrapy
from scrapy.item import Item,Field


class LearningItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()

   #Primary fields

    title = Field()
    price = Field()
    img_dirname2 = Field()
    img_dirname1 = Field()
    description = Field()
    address = Field()
    image_name = Field()
    image_urls = Field()
    images = Field()
    location = Field()
    url = Field()
    project = Field()
    spider = Field()
    server = Field()
    date = Field()
