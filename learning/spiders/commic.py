# -*- coding: utf-8 -*-
import scrapy
from ..items import LearningItem
from scrapy.linkextractor import  LinkExtractor
from scrapy.http import Request
import jsbeautifier.unpackers.packer as packer


class CommicSpider(scrapy.Spider):
    name = 'commic'
    allowed_domains = ['dmzj']

    # start_urls = ["https://manhua.dmzj.com/xinwebfxbuxiuchuanqi/"]
    #设置待爬取的漫画目录页
    # start_urls = ["https://manhua.dmzj.com/tags/dccomics.shtml"]
    #小恐龙阿贡
    start_urls = ["https://manhua.dmzj.com/xklag"]
    #浪客行
    # start_urls = ["https://manhua.dmzj.com/lkxlrjk"]
    #抽取每个漫画的链接
    # def parse(self, response):
    #     link = LinkExtractor(restrict_css='#hothit > div.pic')
    #     links = link.extract_links(response)
    #
    #     for link in links:
    #         yield Request(url=link.url, callback=self.parse1,dont_filter=True)

    #抽取每一话的链接
    # def parse1(self, response):
    def parse(self, response):
        link = LinkExtractor(restrict_css='body > div.wrap > div.middleright > div > div.cartoon_online_border > ul > li')
        links = link.extract_links(response)
        # link1 = link.extract_links(response)[0]

        for link in links:
            yield Request(url=link.url, callback=self.parse2,dont_filter=True)

    #抽取每一页的链接
    def parse2(self,response):

        script = response.xpath('//script[1]/text()').extract()[0]
        parse_str = script.strip().split('\n')[2]
        # print(parse_str)
        pages = packer.unpack(parse_str.strip())
        # pages = packer.unpack(str(parse_str.strip()))
        pages = pages.replace("var pages=pages=\\'[","").replace(";","").replace("\\","").replace('"',"").replace("[","").replace("]","").split(",")

        # for page in pages:
        item = LearningItem()
        #     item['image_urls'] = "https://images.dmzj.com/" + page


        item['image_urls'] = map(lambda x:"https://images.dmzj.com/" + x,pages)

        item['img_dirname2'] = response.xpath("//span[@class='redhotl']/text()").extract()[0]
        item['img_dirname1'] = response.xpath("//a[@class='redhotl']/text()").extract()[0]
        # item['image_urls'].append("https://images.dmzj.com/" + pages[0])

        # for img_link in pages:

            # item["image_urls"] = "https://images.dmzj.com/" + img_link

        yield item
            # full_link = "https://images.dmzj.com/" + img_link


