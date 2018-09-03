# -*- coding: utf-8 -*-
import scrapy
from ..items import LearningItem
from scrapy.linkextractor import  LinkExtractor
from scrapy.http import Request
import jsbeautifier.unpackers.packer as packer


class CommicSpider(scrapy.Spider):
    name = 'sdmb'
    allowed_domains = ['dmzj']


    # start_urls = ["https://manhua.dmzj.com/xinwebfxbuxiuchuanqi/"]
    #设置待爬取的漫画目录页
    # start_urls = ["https://manhua.dmzj.com/tags/dccomics.shtml"]
    #
    #将无规律网页先添加，或者可以用LinkExtrator抽取

    start_urls = ["https://manhua.dmzj.com/sidamingpu/11171.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/10745.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/10564.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/10208.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/9962.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/9851.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/9606.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/9388.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/9184.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/9084.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/8938.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/8620.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/8465.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/8295.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/8294.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/7685.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/7656.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/5486.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/5485.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/5152.shtml#@page=1",
"https://manhua.dmzj.com/sidamingpu/5151.shtml#@page=1"]

    #如果网页有规律，就在这里构造
    for i in range(4491,4837):
        start_urls.append("https://manhua.dmzj.com/sidamingpu/" + str(i) + ".shtml#@page=1")


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
    # def parse(self, response):
    #     link = LinkExtractor(restrict_css='body > div.wrap > div.middleright > div > div.cartoon_online_border > ul > li')
    #     links = link.extract_links(response)
    #     # link1 = link.extract_links(response)[0]
    #
    #     for link in links:
    #         yield Request(url=link.url, callback=self.parse2,dont_filter=True)

    #抽取每一页的链接
    # def parse2(self,response):

    def parse(self,response):

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


