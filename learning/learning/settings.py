# -*- coding: utf-8 -*-

# Scrapy settings for learning project
#
# For simplicity, this file contains only settings considered important or
# commonly used. You can find more settings consulting the documentation:
#
#     https://doc.scrapy.org/en/latest/topics/settings.html
#     https://doc.scrapy.org/en/latest/topics/downloader-middleware.html
#     https://doc.scrapy.org/en/latest/topics/spider-middleware.html

BOT_NAME = 'learning'

SPIDER_MODULES = ['learning.spiders']
NEWSPIDER_MODULE = 'learning.spiders'


# Crawl responsibly by identifying yourself (and your website) on the user-agent
#USER_AGENT = 'learning (+http://www.yourdomain.com)'

# Obey robots.txt rules
ROBOTSTXT_OBEY = False

# Configure maximum concurrent requests performed by Scrapy (default: 16)
#CONCURRENT_REQUESTS = 32

# Configure a delay for requests for the same website (default: 0)
# See https://doc.scrapy.org/en/latest/topics/settings.html#download-delay
# See also autothrottle settings and docs
#DOWNLOAD_DELAY = 3
# The download delay setting will honor only one of:
#CONCURRENT_REQUESTS_PER_DOMAIN = 16
#CONCURRENT_REQUESTS_PER_IP = 16

# Disable cookies (enabled by default)
#COOKIES_ENABLED = False

# Disable Telnet Console (enabled by default)
#TELNETCONSOLE_ENABLED = False

# Override the default request headers:
#DEFAULT_REQUEST_HEADERS = {
#   'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
#   'Accept-Language': 'en',
#}

# Enable or disable spider middlewares
# See https://doc.scrapy.org/en/latest/topics/spider-middleware.html
#SPIDER_MIDDLEWARES = {
#    'learning.middlewares.LearningSpiderMiddleware': 543,
#}

# Enable or disable downloader middlewares
# See https://doc.scrapy.org/en/latest/topics/downloader-middleware.html
#DOWNLOADER_MIDDLEWARES = {
#    'learning.middlewares.LearningDownloaderMiddleware': 543,
#}

# Enable or disable extensions
# See https://doc.scrapy.org/en/latest/topics/extensions.html
#EXTENSIONS = {
#    'scrapy.extensions.telnet.TelnetConsole': None,
#}

# Configure item pipelines
# See https://doc.scrapy.org/en/latest/topics/item-pipeline.html
#ITEM_PIPELINES = {
#    'learning.pipelines.LearningPipeline': 300,
#}

# Enable and configure the AutoThrottle extension (disabled by default)
# See https://doc.scrapy.org/en/latest/topics/autothrottle.html
#AUTOTHROTTLE_ENABLED = True
# The initial download delay
#AUTOTHROTTLE_START_DELAY = 5
# The maximum download delay to be set in case of high latencies
#AUTOTHROTTLE_MAX_DELAY = 60
# The average number of requests Scrapy should be sending in parallel to
# each remote server
#AUTOTHROTTLE_TARGET_CONCURRENCY = 1.0
# Enable showing throttling stats for every response received:
#AUTOTHROTTLE_DEBUG = False

# Enable and configure HTTP caching (disabled by default)
# See https://doc.scrapy.org/en/latest/topics/downloader-middleware.html#httpcache-middleware-settings
#HTTPCACHE_ENABLED = True
#HTTPCACHE_EXPIRATION_SECS = 0
#HTTPCACHE_DIR = 'httpcache'
#HTTPCACHE_IGNORE_HTTP_CODES = []
#HTTPCACHE_STORAGE = 'scrapy.extensions.httpcache.FilesystemCacheStorage'


ITEM_PIPELINES = {
    # 'scrapy.pipelines.images.ImagesPipeline': 1,
    'learning.pipelines.ImagesrenamePipeline':1,

}
IMAGES_STORE = '/Users/hjx/Downloads/123'
DOWNLOAD_DELAY = 0.25


DEFAULT_REQUEST_HEADERS = {
    "method": " GET",
    "path":" /b/%E4%B8%8D%E4%B9%89%E8%81%94%E7%9B%9F%20%E4%BA%BA%E9%97%B4%E4%B9%8B%E7%A5%9E/%E7%AC%AC01%E8%AF%9D_1358691366/02.jpg",
    "scheme": " https",
    "accept":" image/webp,image/apng,image/*,*/*;q=0.8",
    "accept-encoding": " gzip, deflate, br",
    "accept-language":" zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7",
    "cookie": " show_tip_1=0",
    "referer":" https://manhua.dmzj.com/buyilianmen/22505.shtml",
    "user-agent":" Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"



    # ':authority':'images.dmzj.com',
    # ':method':'GET',
    # ':path':'/b/%E4%B8%8D%E4%B9%89%E8%81%94%E7%9B%9F%20%E4%BA%BA%E9%97%B4%E4%B9%8B%E7%A5%9E/%E7%AC%AC01%E8%AF%9D_1358691366/06.jpg',
    # ':scheme':'https','http'
    # 'accept':'image/webp,image/apng,image/*,*/*;q=0.8',
    # 'accept-encoding':'gzip, deflate, br',
    # 'accept-language':'zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7',
    # 'cookie':'show_tip_1=0',
    # 'referer':'https://manhua.dmzj.com/buyilianmen/22505.shtml',
    # 'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
}
