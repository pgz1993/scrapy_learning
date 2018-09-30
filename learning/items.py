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

   # 豆瓣共有

    title = Field()
    summary = Field()
    weighting = Field()
    url = Field()
    seen = Field()
    score = Field()
    time = Field()

    # book

    writers = Field()
    writers_link = Field()
    publish = Field()
    price = Field()
    orgin_name = Field()
    translators = Field()
    translators_link = Field()
    series_link = Field()
    publish_date = Field()
    pages = Field()
    binding = Field()
    ISBN = Field()
    w_summary = Field()
    catalog = Field()
    tag = Field()
    series_info = Field()
    readers = Field()
    series = Field()

    #commic

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

    #movie
    audiences = Field()
    star5 = Field()
    star4 = Field()
    star3 = Field()
    star2 = Field()
    star1 = Field()
    directors = Field()
    director_links = Field()
    script_writers = Field()
    script_writers_links = Field()
    actors = Field()
    actors_links = Field()
    movie_type = Field()
    web_site = Field()
    country = Field()
    language_ = Field()
    initialReleaseDate = Field()
    run_time = Field()
    season = Field()
    episode = Field()
    episode_runtime = Field()
    another_name = Field()
    imdb = Field()
    celebrities = Field()
    awards = Field()
    recommendations = Field()
    comments_counts = Field()
    topic_counts = Field()
    reviews = Field()
    dicussion = Field()
    doulist = Field()
    marks = Field()
    wishes = Field()
    append_time = Field()
    questions_count = Field()

    #题库

    question = Field()
    option = Field()
    answer = Field()
    question_type = Field()
    id = Field()

    #sitemap
    priority = Field()
    changefreq = Field()
    list_ = Field()