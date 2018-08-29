# -*- coding: utf-8 -*-
import datetime
import socket

import scrapy
from ..items import LearningItem
from scrapy.loader import ItemLoader
from scrapy.contrib.loader.processor import TakeFirst, MapCompose, Join


class BasicSpider(scrapy.Spider):
    name = 'basic'
    allowed_domains = ['web']
    start_urls = ['http://localhost:9312/properties/property_000000.html']

    def parse(self, response):
        print("啦啦啦啦")
        print("title: %s" %response.xpath('//*[@itemprop="name"][1]/text()').extract())
        print("啦啦啦啦")
        # item = LearningItem()
        # item['title'] = response.xpath('//*[@itemprop="name"][1]/text()').extract()
        # item['price'] = response.xpath('//*[@itemprop="price"][1]/text()').extract()
        # item['description'] = response.xpath('//*[@itemprop="description"][1]/text()').extract()
        # item['address'] = response.xpath('//*[@itemtype="http://schema.org/''Place"][1]/text()').extract()
        # item['image_urls'] = response.xpath('//*[@itemprop="image_urls"][1]/text()').extract()
        l = ItemLoader(item=LearningItem(),response=response)
        l.add_xpath('title','//*[@itemprop = "name" ][1]/text()',MapCompose(str.strip,str.title))
        l.add_xpath('price','//*[@itemprop = "price" ][1]/text()')
        l.add_xpath('description','//*[@itemprop = "description" ][1]/text()')
        l.add_xpath('address','//*[@itemtype="http://schema.org/Place" ][1]/text()')
        l.add_xpath('image_urls','//*[@itemprop = "image_urls" ][1]/text()')

        # self.log("price: %s" %response.xpath('//*[@itemprop="price"][1]/text()').extract())
        # self.log("description: %s" %response.xpath('//*[@itemprop="description"][1]/text()').extract())
        # self.log("address: %s" %response.xpath('//*[@itemprop="http://schema.org/''Place"][1]/text()').extract())
        # self.log("mage_urls: %s" %response.xpath('//*[@itemprop="][1]/text()').extract())
        # return item
        return l.load_item()