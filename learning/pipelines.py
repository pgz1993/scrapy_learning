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

#MySQL

# class MySQLPipeline(object):
#     """docstring for MySQLPipeline"""
#     def __init__(self, arg):
#         super(MySQLPipeline, self).__init__()
#         self.arg = arg
        
#     def process_item(self,item,spider):

        


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

class StripPipeline(object):
    # def __init__(self):    
        # 可选实现，做参数初始化等
        # doing something




    def process_item(self, item, spider):

        # print("catalog")
        # print(item['catalog'])
        # item (Item 对象) – 被爬取的item
        # spider (Spider 对象) – 爬取该item的spider
        # 这个方法必须实现，每个item pipeline组件都需要调用该方法，
        # 这个方法必须返回一个 Item 对象，被丢弃的item将不会被之后的pipeline组件所处理。

        def to_string(item_argv):

            str_tmp = ''

            if item[item_argv] is not None:

                for i in item[item_argv]:
                    str_tmp +=  i.replace("\n","").replace(" ","") + "/"

                item[item_argv] = str_tmp.strip("/")

            return item[item_argv]


        item['writers'] = to_string('writers')
        item["translators"] = to_string("translators")
        item["summary"] = to_string("summary")
        item["catalog"] = to_string("catalog")
        item["tag"] = to_string("tag")
        item["series_info"] = to_string("series_info")

        return item




        # writers_to_string = ""
        # for i in range(len(item['writers'])):
        #     writers_to_string += item['writers'][i].replace(" ","").replace("\n","") + "/"
        # item['writers'] = writers_to_string.strip("/")

        # translators_to_string = ""
        
        # for i in range(len(item['translators'])):
        #     translators_to_string += item['translators'][i] + "/"
        # item['translators'] = translators_to_string.strip("/")

        # summary_to_string = ''
        # for i in range(len(item['summary'])):
        #     summary_to_string += item['summary'][i] + "/"
        
        # item['summary'] = summary_to_string.strip("/")

        # # item['price'] = item['price'].replace("元","")

        # # item['catalog'] = item['catalog'][:-2]
        # catalog_to_string = ''
        # for i in range(len(item['catalog'])):
        #     catalog_to_string += item['catalog'][i].replace(" ","").replace("\n","") + "/"
        # item['catalog'] = catalog_to_string.strip("/")

        # tag_to_string = ''
        # for i in range(len(item['tag'])):
        #     tag_to_string += item['tag'][i] + "/"
        # item['tag'] = tag_to_string.strip("/")

        # series_info_to_string = ''
        # for i in range(len(item['series_info'])):
        #     series_info_to_string += item['series_info'][i].replace('\n',"").replace("\u3000","") + "/"

        # item['series_info'] = series_info_to_string.strip("/")

        