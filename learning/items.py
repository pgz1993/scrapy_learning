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
    # img_dirname2 = Field()
    # img_dirname1 = Field()
    # description = Field()
    # address = Field()
    # image_name = Field()
    # image_urls = Field()
    # images = Field()
    # location = Field()
    # url = Field()
    # project = Field()
    # spider = Field()
    # server = Field()
    # date = Field()

    writers = Field()
    writers_link = Field()
    publish = Field()
    orgin_name = Field()

    translators = Field()
    translators_link = Field()
    # writer_link = Field()
    series_link = Field()
    score = Field()
    publish_date = Field()
    pages = Field()
    binding = Field()
    ISBN = Field()
    summary = Field()
    w_summary = Field()
    catalog = Field()
    tag = Field()
    series_info = Field()
    readers = Field()
    series = Field()
    url = Field()
    weighting = Field()
    seen = Field()
