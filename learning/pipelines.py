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
import pymysql

# from urllib.parse import unquote

#MySQL

# class MySQLPipeline(object):
#     """docstring for MySQLPipeline"""
#     def __init__(self, arg):
#         super(MySQLPipeline, self).__init__()
#         self.arg = arg
        
#     def process_item(self,item,spider):


class writeMysql(object):

    def __init__(self):
        self.client = pymysql.connect(
            host='127.0.0.1',
            port=3306,
            user='root',  #使用自己的用户名
            password='MyPass@123',  # 使用自己的密码,如要共享代码，这里可以使用环境变量存储密码
            db='books',  # 数据库名
            charset='utf8'   
        )

        self.cur = self.client.cursor()


    def process_item(self,item,spider):

        # sql = 'insert into game(img_url,name,update_time,update_word,author) VALUES (%s,%s,%s,%s,%s)'


        sql = 'insert into douban(title,score,weighting,readers,writers,publish,orgin_name,translators,publish_date,pages,binding,ISBN,tag,series,url,seen,price,writers_link,translators_link,w_summary,series_info,catalog,summary,series_link) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
        # lis = (item['title'],item['score'],item['weighting'],item['readers'],item['writers'],item['publish'],item['orgin_name'],item['translators'],item['publish_date'],item['pages'],item['binding'],item['ISBN'],item['tag'],item['series'],item['url'],item['seen'],item['price'],item['writers_link'],item['translators_link'],item['w_summary'],item['series_info'],item['catalog'],item['summary'],item['series_link'])
        lis = (
        str(item['title']), str(item['score']), str(item['weighting']), str(item['readers']), str(item['writers']),
        str(item['publish']), str(item['orgin_name']), str(item['translators']), str(item['publish_date']),
        str(item['pages']), str(item['binding']), str(item['ISBN']), str(item['tag']), str(item['series']),
        str(item['url']), str(item['seen']), str(item['price']), str(item['writers_link']),
        str(item['translators_link']), str(item['w_summary']), str(item['series_info']), str(item['catalog']),
        str(item['summary']), str(item['series_link']))
        self.cur.execute(sql,lis)
        self.client.commit()

        return item




class writeMysql_movie(object):

    def __init__(self):
        self.client = pymysql.connect(
            host='127.0.0.1',
            port=3306,
            user='root',  #使用自己的用户名
            password='MyPass@123',  # 使用自己的密码,如要共享代码，这里可以使用环境变量存储密码
            db='movie',  # 数据库名
            charset='utf8'
        )

        self.cur = self.client.cursor()


    def process_item(self,item,spider):

        # sql = 'insert into game(img_url,name,update_time,update_word,author) VALUES (%s,%s,%s,%s,%s)'


        sql = 'insert into douban_movie(title,score,audiences,star5,star4,star3,star2,star1,directors,director_links,script_writers,script_writers_links,actors,actors_links,movie_type,web_site,country,language_,initialReleaseDate,run_time,season,episode,episode_runtime,another_name,imdb,summary,celebrities,awards,recommendations,comments_counts,topic_counts,reviews,dicussion,doulist,marks,wishes,url,append_time,questions_count) VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
        # lis = (item['title'],item['score'],item['weighting'],item['readers'],item['writers'],item['publish'],item['orgin_name'],item['translators'],item['publish_date'],item['pages'],item['binding'],item['ISBN'],item['tag'],item['series'],item['url'],item['seen'],item['price'],item['writers_link'],item['translators_link'],item['w_summary'],item['series_info'],item['catalog'],item['summary'],item['series_link'])
        lis = (
            str(item['title']), str(item['score']), str(item['audiences']), str(item['star5']), str(item['star4']),
            str(item['star3']), str(item['star2']), str(item['star1']), str(item['directors']),
            str(item['director_links']), str(item['script_writers']), str(item['script_writers_links']),
            str(item['actors']), str(item['actors_links']), str(item['movie_type']), str(item['web_site']),
            str(item['country']), str(item['language_']), str(item['initialReleaseDate']), str(item['run_time']),
            str(item['season']), str(item['episode']), str(item['episode_runtime']), str(item['another_name']),
            str(item['imdb']), str(item['summary']), str(item['celebrities']), str(item['awards']),
            str(item['recommendations']), str(item['comments_counts']), str(item['topic_counts']), str(item['reviews']),
            str(item['dicussion']), str(item['doulist']), str(item['marks']), str(item['wishes']), str(item['url']),
            str(item['append_time']),str(item['questions_count'])
        )
        self.cur.execute(sql,lis)
        self.client.commit()

        return item
    

class writeMysql_tiku(object):

    def __init__(self):
        self.client = pymysql.connect(
            host='127.0.0.1',
            port=3306,
            user='root',  #使用自己的用户名
            password='MyPass@123',  # 使用自己的密码,如要共享代码，这里可以使用环境变量存储密码
            db='tiku',  # 数据库名
            charset='utf8'
        )

        self.cur = self.client.cursor()


    def process_item(self,item,spider):

        # sql = 'insert into game(img_url,name,update_time,update_word,author) VALUES (%s,%s,%s,%s,%s)'


        sql = 'insert into digest(question_type,question,option_,answer) VALUES (%s,%s,%s,%s)'
        # lis = (item['title'],item['score'],item['weighting'],item['readers'],item['writers'],item['publish'],item['orgin_name'],item['translators'],item['publish_date'],item['pages'],item['binding'],item['ISBN'],item['tag'],item['series'],item['url'],item['seen'],item['price'],item['writers_link'],item['translators_link'],item['w_summary'],item['series_info'],item['catalog'],item['summary'],item['series_link'])
        lis = (
            str(item['question_type']),str(item['question']),str(item['option']),str(item['answer'])
            )
        
        self.cur.execute(sql,lis)
        self.client.commit()

        return item

class writeMysql_sitemap(object):

    def __init__(self):
        self.client = pymysql.connect(
            host='127.0.0.1',
            port=3306,
            user='root',  #使用自己的用户名
            password='MyPass@123',  # 使用自己的密码,如要共享代码，这里可以使用环境变量存储密码
            db='sitemap',  # 数据库名
            charset='utf8'
        )

        self.cur = self.client.cursor()


    def process_item(self,item,spider):

        # sql = 'insert into game(img_url,name,update_time,update_word,author) VALUES (%s,%s,%s,%s,%s)'


        sql = 'insert into douban_sitemap(url,priority,changefreq) VALUES (%s,%s,%s)'
        # lis = (item['title'],item['score'],item['weighting'],item['readers'],item['writers'],item['publish'],item['orgin_name'],item['translators'],item['publish_date'],item['pages'],item['binding'],item['ISBN'],item['tag'],item['series'],item['url'],item['seen'],item['price'],item['writers_link'],item['translators_link'],item['w_summary'],item['series_info'],item['catalog'],item['summary'],item['series_link'])
        # lis = (
        #     str(item['url']),str(item['priority']),str(item['changefreq'])
        #     )
        lis = item['list_']


        self.cur.executemany(sql,lis)
        self.client.commit()
        # INSERT INTO tbl_name (a,b,c) VALUES(1,2,3),(4,5,6),(7,8,9);
        # param = ((username1, salt1, pwd1), (username2, salt2, pwd2), (username3, salt3, pwd3))

        #n=cursor.executemany(sql,param) 

    
        # return item
        


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

        