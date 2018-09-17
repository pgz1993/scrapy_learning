# -*- coding: utf-8 -*-
import scrapy
from ..items import LearningItem
from scrapy.linkextractor import  LinkExtractor
from scrapy.exceptions import CloseSpider

import requests

from scrapy.http import Request
import jsbeautifier.unpackers.packer as packer
from scrapy.downloadermiddlewares.retry import RetryMiddleware
import time
#抽取标签后，翻到第50页失效，所以抽取标签页不可行'
#处理重定向和403，设置成adsl拨号,这里需要在中间件中设置

#豆瓣


class CommicSpider(scrapy.Spider):
    name = 'book'
    # allowed_domains = ['douban']

    start_urls = ["https://book.douban.com/subject/1076948/"]

    # print("爬虫开始")

    def parse(self, response):

        # def get_proxy():
        #     return requests.get("http://127.0.0.1:5010/get/").content


        #
        # def delete_proxy(proxy):
        #     requests.get("http://127.0.0.1:5010/delete/?proxy={}".format(proxy))


        #或者可以设置随机ip
        #不需要在这里设置，在retry中间件中设置即可
        #轮询使用ip，假设有500可用ip,一分钟500个页面，对服务器来说相当于每台主机访问一页面


        # while response.status == 403 or response.status == 302:
        #
        #     print(response.status)
        #
        #     print(response.meta)
        #
        #     # delete_proxy(response.headers)
        #
        #     #删除proxy
        #
        #     # 获取proxy
        #
        #     proxy = get_proxy()
        #
        #     print("使用新代理：" + str(proxy))
        #
        #     #如果proxy_pool耗尽，暂时暂停爬虫或者更换目标网站，移动端或者wap,或者各大网站的cache
        #
        #     response = scrapy.Request(url=response.url, meta={'proxy':'http://' + str(proxy)})
        #
        #     print(type(response))





        # print("有respose")



        item = LearningItem()

        #爬取书名



        #作者有联合作者，会和译者一样放在一个span里面，单个作者单独放在文本为 作者 的span 的后面的同级a节点，所以也要分类讨论
        #或者作者无链接——不会，会有search
        #单个作者也会用一组嵌套的span括住
        #翻译者的链接也是author，既然是爬取图书，就没有关系了，如果要研究翻译相关的话，主数据库有译者字段
        def is_exist(item_argv,xpath1,**xpath2):
            # item[item_argv] = info.xpath(xpath1).extract().strip()
            try:
                item[item_argv] = info.xpath(xpath1).extract()
            except:
                print(str(item_argv) + "出错")
                item[item_argv] = ''

            if len(item[item_argv]) == 1:

                item[item_argv] = item[item_argv][0].strip()

            # if len(item[item_argv]) == 0 and item[item_argv] != '':
            #
            #     item[item_argv] = ''

            # return item[item_argv][0].strip() if len(item[item_argv]) == 1 else item[item_argv]


            return item[item_argv]

        # try:
            #先确定豆瓣会出错的几种方式
            #返回403
            #返回200，但需登陆
            #返回此应用出错
            # print("尝试爬取")

        # except:
            # print()
            # print("被ban!!!!!!!!!!!!!")
            #只会停止其中一个协程，其他要逐渐停止，强行ctrl + z 会导致后面的链接被添加到filter中，以后都不会再被爬取
        if response.status != 200:

            #不知道会不会将缺少 '/"的页面重定向到别的地方，导致状态码变为301，改next_page的代码
            #shell后发现不会，重定向会直接返回200的response,服务器补全了后面的 /
            raise CloseSpider('强制停止!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
            # time.sleep(600)
            # raise CloseSpider()
            # return
            ##这里写ADSL拨号或者换ip的逻辑
            # print()
            # return



        print("此时的URL为：" + str(response.url))
        # writer_link_list = []
        # series_link_list = []
        try:
            info = response.xpath(u'//*[@id="info"]')[0]
        except:
            raise  CloseSpider("出现200以外的错误，此时的url为 %s" % response.url)

            #在这里一并处理了作者列表和翻译者列表

            #判断有无作者
            #判断有无翻译者
            #翻译者以上的author link 的text 加入到作者列表中
            #如无翻译者，则author link 的 text 默认为全是作者
            #容易出错，比如出现个志愿者什么的，举例而已


            #作者节点：作者节点的下一个同辈span节点的所有前同辈a节点，因为作者节点排第一，没有其他节点会影响它
            
            #先确定是两种模式的哪一种


            #直接写四种模式，用 a = b or c = d的写法，一句

        #如果以某个字段为基准，比如出版社以上的a tag 为作者，以下为翻译者的话，当出版社字段不存在，就会出错，所以还是以自身为基准，爬虫会更具健壮性
        #有冒号无嵌套
        w_name1 = info.xpath(u'//span[./text()="作者:"]/following-sibling::span[1]/preceding-sibling::a')
        #有冒号有嵌套
        w_name2 = info.xpath(u'//span[./text()="作者:"]/parent::span/a')
        #无冒号无嵌套
        w_name3 = info.xpath(u'//span[./text()=" 作者"]/following-sibling::span[1]/preceding-sibling::a')
        #无冒号有嵌套
        w_name4 = info.xpath(u'//span[./text()=" 作者"]/parent::span/a')

        if w_name1:
            item['writers'] = w_name1.xpath("./text()").extract()
            item['writers_link'] = w_name1.xpath("./@href").extract()

        elif w_name2:
            item['writers'] = w_name2.xpath("./text()").extract()
            item['writers_link'] = w_name2.xpath("./@href").extract()
        
        elif w_name3:
            item['writers'] = w_name3.xpath("./text()").extract()
            item['writers_link'] = w_name3.xpath("./@href").extract()
        
        elif w_name4:
            item['writers'] = w_name4.xpath("./text()").extract()
            item['writers_link'] = w_name4.xpath("./@href").extract()

        else:
            item['writers'] = ''
            item['writers_link'] = ''






#————————————————————————————————————————————————————————————————————————————————————————————————————————————————#

        #译者
        # contains(@name,'na')



        #有冒号无嵌套
        t_name1 = info.xpath(u'//span[./text()="译者:"]/following-sibling::a[contains(@href,"search")]')
        #有冒号有嵌套
        t_name2 = info.xpath(u'//span[./text()="译者:"]/following-sibling::a[contains(@href,"author")]')
        #无冒号无嵌套
        #选中属性中包含某个字符串的href
        #链接可以直接爬取了，但是中文字段还是要靠后续的处理和提取

        #出错
        #仍有问题，无法替换和正确拼接
        # t_name3 = info.xpath(u'//span[./text()=" 译者"]/following-sibling::a[contains(@href,"search") or contains(@href,"author")]')
        t_name3 = info.xpath(u'//span[./text()=" 译者"]/following-sibling::a[contains(@href,"search")]')
        #无冒号有嵌套
        t_name4 = info.xpath(u'//span[./text()=" 译者"]/following-sibling::a[contains(@href,"author")]')

        if t_name4:
            item['translators'] = t_name4.xpath("./text()").extract()
            item['translators_link'] = t_name4.xpath("./@href").extract()

        elif t_name3:
            item['translators'] = t_name3.xpath("./text()").extract()
            item['translators_link'] = t_name3.xpath("./@href").extract()
        
        elif t_name2:
            item['translators'] = t_name2.xpath("./text()").extract()
            item['translators_link'] = t_name2.xpath("./@href").extract()
        
        elif t_name1:
            item['translators'] = t_name1.xpath("./text()").extract()
            item['translators_link'] = t_name1.xpath("./@href").extract()
        else:
            item['translators'] = ''
            item['translators_link'] = ''

#————————————————————————————————————————————————————————————————————————————————————————————————————————————————#

        item["publish"] = is_exist("publish",u'//span[./text()="出版社:"]/following::text()[1]')

        item["publish_date"] = is_exist("publish_date",u'//span[./text()="出版年:"]/following::text()[1]')
        item["pages"] = is_exist("pages",u'//span[./text()="页数:"]/following::text()[1]')
        item["price"] = is_exist("price",u'//span[./text()="定价:"]/following::text()[1]')
        item["binding"] = is_exist("binding",u'//span[./text()="装帧:"]/following::text()[1]')
        item["ISBN"] = is_exist("ISBN",u'//span[./text()="ISBN:"]/following::text()[1]')
        item["orgin_name"] = is_exist("orgin_name",u'//span[./text()="原作名:"]/following::text()[1]')
        item["series"] = is_exist("series",u'//span[./text()="丛书:"]/following::a[1]/text()')
        item["series_link"] = is_exist("series_link",u'//span[./text()="丛书:"]/following-sibling::a[1]/@href')

        # item["summary"] = is_exist("summary",)
        # item["w_summary"] = is_exist("w_summary",)

        item["catalog"] = is_exist("catalog",'//*[contains(@id,"dir_")]/text()')
        item["tag"] = is_exist("tag",'//*[@id="db-tags-section"]/div/span/a/text()')
        item["series_info"] = is_exist("series_info",'//*[@id="content"]/div/div[1]/div[3]/div[@class="subject_show block5"]/div//text()')
        
        # item["readers"] = is_exist("readers",).extract().strip()


        # item["title"] = is_exist("title",).extract().strip()
        # item["url"] = is_exist("url",).extract().strip()
        # item["score"] = is_exist("score",).extract().strip()

        


        try:
            item['title'] = response.xpath("//*[@id='wrapper']/h1/span/text()").extract_first()
        except:
            item['title'] = ''


        item['url'] = response.url.replace("https://book.douban.com/subject/","").strip('/')

        try:
            item['score'] = response.css('#interest_sectl > div > div.rating_self.clearfix > strong::text').extract_first().strip()
            if item['score'] == '':
                item['score'] = '0'
        except:
            item['score'] = '0'


        # try:
        #     item['publish'] = info.xpath().extract_first().strip()
        # except:
        #     item['publish'] = ''
        # try:
        #     item['publish_date'] = info.xpath(u'//span[./text()="出版年:"]/following::text()[1]').extract_first().strip()
        # except:
        #     item['publish_date'] = ''

        # try:
        #     item['pages'] = info.xpath(u'//span[./text()="页数:"]/following::text()[1]').extract_first().strip()
        # except:
        #     item['pages'] = ''
        
        # try:
        #     item['price'] = info.xpath(u'//span[./text()="定价:"]/following::text()[1]').extract_first().strip()
        # except:
        #     item['price'] = ''
        # try:
        #     item['binding'] = info.xpath(u'//span[./text()="装帧:"]/following::text()[1]').extract_first().strip()
        # except:
        #     item['binding'] = ''
        # try:
        #     item['ISBN'] = info.xpath(u'//span[./text()="ISBN:"]/following::text()[1]').extract_first().strip()
        # except:
        #     item['ISBN'] = ''
        # try:
        #     item['orgin_name'] = info.xpath(u'//span[./text()="原作名:"]/following::text()[1]').extract_first().strip()
        # except:
        #     item['orgin_name'] = ''
        # try:
        #     item['series'] = info.xpath(u'//span[./text()="丛书:"]/following::a[1]/text()').extract_first().strip()
        # except:
        #     item['series'] = ''
        # try:
        #     item['series_link'] = info.xpath(u'//span[./text()="丛书:"]/following-sibling::a[1]/@href').extract_first().strip()
        # except:
        #     item['series_link'] = ''

        #这里有两种情况，一种有折叠，一种没有，先提取包含折叠内容的，没有再提取另一个

        try:
        
            summary = response.xpath('//*[@id="link-report"]/span/div/div[@class="intro"]/p/text()')
            
            if summary:
                item['summary'] = summary.extract()
            else:
                item['summary'] = response.xpath('//*[@id="link-report"]/div[1]/div/p/text()').extract()

            # if len(item['summary']) == 0 and item['summary'] != '':
            #
            #     item['summary'] = ''

        except:

            item['summary'] = ''



        try:
            w_summary = response.css('#content > div > div.article > div.related_info > div:nth-child(4) > span.all.hidden > div > p::text')
            
            if w_summary:
                item['w_summary'] = w_summary.extract()
            else:
                item['w_summary'] = response.css('#content > div > div.article > div.related_info > div:nth-child(4) > span.short > div > p::text').extract()

            # if len(item['w_summary']) == 0 and item['w_summary'] != '':
            #
            #     item['w_summary'] = ''
        except:
            item['w_summary'] = ''

        # try:
        #     #出错    
        #     # item['catalog'] = response.xpath('//*[contains(@id,"full") and contains(@id,"dir")]/text()').extract()
        #     item['catalog'] = response.xpath('//*[contains(@id,"dir_")]/text()').extract()
        # except:
        #     item['catalog'] = ''

        # try:

        #     item['tag'] = response.xpath('//*[@id="db-tags-section"]/div/span/a/text()').extract()
        # except:
        #     item['tag'] = ''

        # try:
        #     #丛书信息会随机抽取
        #     item['series_info'] = response.xpath('//*[@id="content"]/div/div[1]/div[3]/div[@class="subject_show block5"]/div//text()').extract()
        # except:
        #     item['series_info'] = ''

        try:
            item['readers'] = response.css('#interest_sectl > div > div.rating_self.clearfix > div > div.rating_sum > span > a > span::text').extract_first()

            if item['readers'] is None:
                item['readers'] = '0'
        except:
            item['readers'] = '0'



        # '//*[@id="link-report"]/div[1]/div/p'/div/div[@class="intro"]/p/text()
        















        # if w_name_mode1:
        #     # w_name = w_name_mode1.xpath('./following-sibling::span[1]/preceding-sibling::a/text()').extract_first().replace("\n","").replace(" ","")
        #     w_name = w_name_mode1.xpath('./following-sibling::span[1]/preceding-sibling::a/text()')

        #     #如果能捕获作者名字，则写入，否则，为span嵌套模式
        #     if w_name:
        #         item['writer'] = w_name.extract()

        #     else:
        #         item['writer'] = w_name_mode1.xpath('./following-sibling::span[1]/preceding-sibling::a/text()')








        #     /
        #     writer_name_type2 = links.xpath('//span[./text()=" 作者"]/following-sibling::span[1]/preceding-sibling::a/text()').extract_first().replace("\n","").replace(" ","")
        #     writer_name_type3 = 
        #     #单个作者节点已经完成，需要完成一组的作者节点,具体参考大学教材
        #     #一组作者节点同一组翻译者节点
        #     #翻译者节点：翻译者节点的下一个span节点

        #     #一组翻译者的已经解决，单个翻译者的参考傅雷

        #     # link_extract = item.extract()
        #     if "author" in link:
        #         # print(item.xpath('./@href').extract())
        #         #这里可以缩减
        #         writer_link_list.append(link)
        #     #存储完整的网址，日后爬取可以少一个拼接网址的逻辑，加快爬取速度，硬盘开销不大
        #     if "search" in link:
        #         link = "https://book.douban.com/" + link
        #         writer_link_list.append(link)


        #     if "series" in link:
        #         series_link_list.append(link)

        # item['writer_link'] = writer_link_list
        # item['series_link'] = series_link_list
        #         # item['writer'] = response.xpath(u'//span[./text()="作者:"]/following::a[2]')
        # # # // *[ @ id = "info"] / a[1]
        # # item['publish'] = response.xpath(u'//span[./text()="出版社:"]/following::text()[1]')
        # # item['orgin_name'] = response.xpath(u'//span[./text()="原作名:"]/following::text()[1]')

        # #这里只是其中一种情况，还有一种，要增加对应的try...except,以及中文图书没有翻译的问题，全半角符号的问题

        # c = ""#单个翻译者

        # try:
        #     if a:
        #         item['translator'] = a[0].xpath('./a/text()').extract()
        #     if b:
        #         item['translator'] = b[0].xpath('./a/text()').extract()
        # except:
        #     item['translator'] = ''

        #有效评分人数
        # if item['readers']:

        #     v = int(item['readers'])

        # else:
        #     v = 0

        
        # #入选top250的最低人数
        # m = 10000

        # #书本得分
        # if item['score']:
        #     R = float(item['score'])
        # else:
        #     R = 0








        # # C是所有书本的得分平均分，都存在数据库中，取个大概值就行了
        # C = 7


        item["weighting"] = 0
        item['seen'] = 0

        yield item

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
        # all = response.xpath('//*[@id="info"]')
        # all = all.extract()[0].replace("\n","").replace("\t","").split("<br>")
        # for item in all:
            # print(item.replace('<spanclass="pl">',"").replace("</span>","").replace("""<divid="info"class="">""","").replace("</div>","").replace("</a>","").replace("""<aclass=""href=""","").replace("<span>","").replace("<ahref=",""))
        # all = response.xpath(u'//span[./text()=" 作者"]/following::text()')
        # print(all)

        #mysql批量写入，不要每次写入



        #
        #抽取"喜欢这本书的用户也喜欢"的链接
        link = LinkExtractor(restrict_xpaths=('//*[@id="db-rec-section"]/div//dl//dd'))
        links = link.extract_links(response)

        #如果链接是直接相关的话，也可以用response.follow，会返回一个url实例，然后可以yield相关的url：
        # links = response.xpath('//*[@id="db-rec-section"]/div//dl//dd').extract()

        # for link in links:
        #     yield response.follow(link,callback=self.parse)

        for link in links:
            # print("弹出一个url")

            # if link.url.endswith('/'):
                # pass
            # else:
                # link.url = link.url + "/"
            #没有"/"作为结尾的话，网址会重定向，不必要，但是可能是识别爬虫的依据
            yield scrapy.Request(url=link.url, callback=self.parse)
            # yield scrapy.Request(url=link.url, callback=self.parse,dont_filter=True)

