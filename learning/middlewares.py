# -*- coding: utf-8 -*-

# Define here the models for your spider middleware
#
# See documentation in:
# https://doc.scrapy.org/en/latest/topics/spider-middleware.html

from scrapy import signals
import requests
from scrapy.downloadermiddlewares.retry import RetryMiddleware


# class retry(RetryMiddleware):
#     pass




class MyRetryMiddleware(RetryMiddleware):


    def process_response(self, request, response, spider):

        # print("进入retry")

        def get_proxy():
            return requests.get("http://127.0.0.1:5010/get/").content

        def delete_proxy(proxy):
            requests.get("http://127.0.0.1:5010/delete/?proxy={}".format(proxy))

        if response.status == 403 or response.status == 302 or '检测到有异常' in response.text:

            # print("进入retry 的 if")
            #
            # reason = "403"
            #
            # proxy = ''
            #
            # while proxy == '':
            #
            #     proxy = get_proxy()
            #     t_proxy = proxy
            #
            #     p1 = {"http":"http" + str(proxy).replace('b','').replace("'","")}
            #
            #     p2 = {"https":"https" + str(proxy).replace('b','').replace("'","")}
            #
            #
            #     try:
            #         a = requests.get("https://book.douban.com", proxies=p1)
            #         if a.status_code == 200 and "检测到有异常请求" not in a.text:
            #             proxy = p1
            #     except:
            #
            #         try:
            #             a = requests.get("https://book.douban.com", proxies=p2)
            #             if a.status_code == 200 and "检测到有异常请求" not in a.text:
            #                 proxy = p2
            #         except:
            #             pass
            #
            #     else:
            #         proxy = ''


            reason = "403"
            proxy = {"http":"http" + str(get_proxy()).replace('b','').replace("'","")}
            request.meta['proxy'] = proxy

            # request.meta['proxy'] = "http://{}:{}@{}:{}".format('','', '127.0.0.1', '8118')


            return self._retry(request, reason, spider) or response

        return response


    #直接在api中修改代码验证，加上https或者http请求头








class RandomProxyMiddleware(object):
#重定义他的process_request方法：

    def process_request(self, request, spider):
        def get_proxy():
            return requests.get("http://127.0.0.1:5010/get/").content

        rand_proxy  = get_proxy()
        if rand_proxy : ## 和访问豆瓣网成功，不成功就继续更换
            request.meta['proxy'] = 'http://' + str(rand_proxy).replace('b','').replace("'","")
            print(request.meta['proxy'])


class LearningSpiderMiddleware(object):
    # Not all methods need to be defined. If a method is not defined,
    # scrapy acts as if the spider middleware does not modify the
    # passed objects.

    @classmethod
    def from_crawler(cls, crawler):
        # This method is used by Scrapy to create your spiders.
        s = cls()
        crawler.signals.connect(s.spider_opened, signal=signals.spider_opened)
        return s

    def process_spider_input(self, response, spider):
        # Called for each response that goes through the spider
        # middleware and into the spider.

        # Should return None or raise an exception.
        return None

    def process_spider_output(self, response, result, spider):
        # Called with the results returned from the Spider, after
        # it has processed the response.

        # Must return an iterable of Request, dict or Item objects.
        for i in result:
            yield i

    def process_spider_exception(self, response, exception, spider):
        # Called when a spider or process_spider_input() method
        # (from other spider middleware) raises an exception.

        # Should return either None or an iterable of Response, dict
        # or Item objects.
        pass

    def process_start_requests(self, start_requests, spider):
        # Called with the start requests of the spider, and works
        # similarly to the process_spider_output() method, except
        # that it doesn’t have a response associated.

        # Must return only requests (not items).
        for r in start_requests:
            yield r

    def spider_opened(self, spider):
        spider.logger.info('Spider opened: %s' % spider.name)


class LearningDownloaderMiddleware(object):
    # Not all methods need to be defined. If a method is not defined,
    # scrapy acts as if the downloader middleware does not modify the
    # passed objects.

    @classmethod
    def from_crawler(cls, crawler):
        # This method is used by Scrapy to create your spiders.
        s = cls()
        crawler.signals.connect(s.spider_opened, signal=signals.spider_opened)
        return s

    def process_request(self, request, spider):
        # Called for each request that goes through the downloader
        # middleware.

        # Must either:
        # - return None: continue processing this request
        # - or return a Response object
        # - or return a Request object
        # - or raise IgnoreRequest: process_exception() methods of
        #   installed downloader middleware will be called
        return None

    def process_response(self, request, response, spider):
        # Called with the response returned from the downloader.

        # Must either;
        # - return a Response object
        # - return a Request object
        # - or raise IgnoreRequest
        return response

    def process_exception(self, request, exception, spider):
        # Called when a download handler or a process_request()
        # (from other downloader middleware) raises an exception.

        # Must either:
        # - return None: continue processing this exception
        # - return a Response object: stops process_exception() chain
        # - return a Request object: stops process_exception() chain
        pass

    def spider_opened(self, spider):
        spider.logger.info('Spider opened: %s' % spider.name)
