# -*- coding: utf-8 -*-

# Define your item pipelines here
#
# Don't forget to add your pipeline to the ITEM_PIPELINES setting
# See: https://doc.scrapy.org/en/latest/topics/item-pipeline.html


# class LearningPipeline(object):
#     def process_item(self, item, spider):
#         return item
#
from scrapy.pipelines.images import ImagesPipeline
from scrapy import Request
#python2 parse独立，python3中被整合到urllib
from urllib.parse import urlparse,unquote
from os.path import basename, dirname, join
# from urllib.parse import unquote


class ImagesrenamePipeline(ImagesPipeline):

    def get_media_requests(self, item, info):

        for image_url in item['image_urls']:
            yield Request(image_url,meta={'item':item})


    def file_path(self, request, response=None, info=None):

        # print("到达file_path")

        item = request.meta.get('item')

        # print("开始")
        #
        # print(request.url)
        #
        # file_name = request.url.spilt("/")[-1]
        #
        # print(str(file_name))
        #
        # return file_name

        #将请求的url拆分，并提取其中的path属性作为路径
        path = urlparse(request.url).path

        path = unquote(path, encoding="utf-8").replace(" ","_")

        # return join(basename(dirname(path)), basename(path))
        #这里的basename会删减路径，直接删掉，达到分文件夹存储
        #这里有一点不完善，应该对应目录页的名字，而不是文件名的名字
        # return join(dirname(path), basename(path))
        # print("这里这里")
        # real = join( "/" + dirname(path).split("/")[1] + "/"+ item['img_dirname1'] + "/" + item['img_dirname2'] + "/", basename(path))
        # store_path = join( dirname(path).split("/")[1],item['img_dirname1'],item['img_dirname2'], basename(path))
        #因为有转换成pdf的需要，直接存在同一文件夹会比较方便，修改之
        store_path = join( dirname(path).split("/")[1],item['img_dirname1'],item['img_dirname2'] + "_" + basename(path))
        # print(real)
        # print("这里这里")
        # return join("/"+dirname(path).split("/")[1] + "/" + item['img_dirname'] + "/", basename(path))
        return store_path