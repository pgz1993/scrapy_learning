# -*- coding: utf-8 -*-
import scrapy
from ..items import LearningItem
from scrapy.linkextractor import  LinkExtractor

from scrapy.http import Request
import jsbeautifier.unpackers.packer as packer

#抽取标签后，翻到第50页失效，所以抽取标签页不可行


class CommicSpider(scrapy.Spider):
    name = 'book'
    # allowed_domains = ['douban']

    start_urls = ["https://book.douban.com/subject/1083428"]

    def parse(self, response):

        # item = LearningItem()
        # item['title'] = response.xpath("//*[@id='wrapper']/h1/span/text()")
        # item['writer'] = response.xpath(u'//span[./text()="作者:"]/following::a[2]')
        # # // *[ @ id = "info"] / a[1]
        # item['publish'] = response.xpath(u'//span[./text()="出版社:"]/following::text()[1]')
        # item['orgin_name'] = response.xpath(u'//span[./text()="原作名:"]/following::text()[1]')
        # item['translator'] = response.xpath(u'//span[./text()="译者:"]/following::text()[1]')
        # item['p_date']
        # item['total_pages']
        # item['price']
        # item['binding']
        # item['series']
        # item['ISBN']
        # item['summary']
        # item['w_introduce']
        # item['ca']
        # item['tag']
        # item['s_info']
        # item['score']
        # item['readers']
        # print(item['title'])
        # all = response.xpath("string(//*[@id='info'])")
        # all =
        # print(all.extract())
        # print(all.extract()[0].replace("\n",""))
        # print(all.extract()[0].replace("\n","").replace(" ",""))
        # print(type(all.extract()))
        # yield item
        #id一般固定，可以忽略css的变化
        #先不清洗，换取爬取的速度提升
        all = response.xpath('//*[@id="info"]')
        all = all.extract()[0].replace("\n","").replace("\t","").split("<br>")
        for item in all:
            print(item.replace('<spanclass="pl">',"").replace("</span>","").replace("""<divid="info"class="">""","").replace("</div>","").replace("</a>","").replace("""<aclass=""href=""","").replace("<span>","").replace("<ahref=",""))
        # all = response.xpath(u'//span[./text()=" 作者"]/following::text()')
        # print(all)



        #
        # #抽取"喜欢这本书的用户也喜欢"的链接
        # link = LinkExtractor(restrict_xpaths=('//*[@id="db-rec-section"]/div//dl//dd'))
        # links = link.extract_links(response)
        #
        # for link in links:
        #     # print("弹出一个url")
        #     yield scrapy.Request(url=link.url, callback=self.parse,dont_filter=False)

