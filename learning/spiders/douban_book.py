# -*- coding: utf-8 -*-
import scrapy
from ..items import LearningItem
from scrapy.linkextractor import  LinkExtractor
from scrapy.http import Request
import jsbeautifier.unpackers.packer as packer

#抽取标签后，翻到第50页失效，所以抽取标签页不可行
#

#爬取当前页
#抽取当前页的链接
#发送到下一个函数
#下一个函数回调第一个函数
#爬取一个页面后，直接将新的url push 给redis
#不要猜


class CommicSpider(scrapy.Spider):
    name = 'book'
    allowed_domains = ['']

    # global start_urls
    start_urls = ["https://book.douban.com/subject/1083428/"]
    # print("开始啦")
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
        link = LinkExtractor(restrict_xpaths=('//*[@id="db-rec-section"]/div//dl//dd'))
        # // *[ @ id = "db-rec-section"] / div / dl[1] / dd
        # db-rec-section > div > dl:nth-child(1) > dd
        links = link.extract_links(response)
        # link1 = link.extract_links(response)[0]

        #获得十个链接

        for link in links:
            # print(link.url)
            print("抛出一个链接")
            yield Request(url=link.url, callback=self.parse2,dont_filter=True)

    #抽取每一页的链接
    def parse2(self,response):
        #请求了其中一个连接
        print("请求了其中一个链接")
        #
        # print("进来了")

        # script = response.xpath('//script[1]/text()').extract()[0]
        # parse_str = script.strip().split('\n')[2]
        # # print(parse_str)
        # pages = packer.unpack(parse_str.strip())
        # # pages = packer.unpack(str(parse_str.strip()))
        # pages = pages.replace("var pages=pages=\\'[","").replace(";","").replace("\\","").replace('"',"").replace("[","").replace("]","").split(",")

        # for page in pages:
        item = LearningItem()
        #     item['image_urls'] = "https://images.dmzj.com/" + page

        item['title'] = response.xpath("//*[@id='wrapper']/h1/span/text()")

        print(item['title'])

        # // *[ @ id = "db-rec-section"] / div / dl[1] / dd
        # db-rec-section > div > dl:nth-child(1) > dd

        # for link in links:
        #
        #     start_url.append(link.url)

            # print(link.url)
            # print("a")




            # item['image_urls'] = map(lambda x:"https://images.dmzj.com/" + x,pages)
        #
        # item['img_dirname2'] = response.xpath("//span[@class='redhotl']/text()").extract()[0]
        # item['img_dirname1'] = response.xpath("//a[@class='redhotl']/text()").extract()[0]
        # item['image_urls'].append("https://images.dmzj.com/" + pages[0])

        # for img_link in pages:

            # item["image_urls"] = "https://images.dmzj.com/" + img_link
        print("抛出一个item")

        yield item

        link = LinkExtractor(restrict_xpaths=('//*[@id="db-rec-section"]/div//dl//dd'))
        links =  link.extract_links(response)
        #
        for link in links:
            print("抽取新的链接并发送")
            # yield Request(url=link.url, callback=self.parse, dont_filter=False)
            yield scrapy.Request(link.url, callback=self.parse)


