# editor

##1.vim ~/.bash_profile

##2.append the IDLE PATH at end of file:export EDITOR=/Applications/PyCharm.app/Contents/MacOS/pycharm

##3.:wq

##4.source ~/.bash_profile

##5.cd to the spiderpath

##6.scrapy edit spider_name

##7.Done

# fetch

## used to “see” how your spider would fetch a certain page

# view

##  be used to check what the spider “sees” and confirm it’s what you expect

# shell

## -c 'response.status'

# parse

##call function parse()

# settings

##  scrapy settings --get BOT_NAME

# runspider

## Run a spider self-contained in a Python file, without having to create a project

# bench

## Run a quick benchmark,it tells how slow the spider I had write

# Register commands via setup.py entry points

## experimental feature

# class scrapy.spiders.Spider

## just provides a default start_requests() implementation which sends requests from the start_urlsspider attribute and calls the spider’s method parse for each of the resulting responses

# custom_settings

## A dictionary of settings that will be overridden from the project

#  Spider arguments

## scrapy crawl myspider -a category=electronics

# SitemapSpider

## Awaful!!!!!!!

# Scrapy selectors are instances of Selector class constructed by passing text or TextResponse object

# xpath It returns None if no element was found:

# .extract_first(default='not-found

# The selection methods (.xpath() or .css()) return a list of selectors of the same type, so you can call the selectionmethods for those selectors too.

# Using selectors with regular expressions

# DNSCACHE_ENABLED

# browser = webdriver.Chrome() 声明浏览器对象

# browser.get(url) 访问页面

# browser.page_source

# browser.close()

# 查找节点

## find_element_by_name()
##                 id
##                 css_selector
##                 xpath
##                 link_text
##                 partial_link_text
##                 tag_name
##                 class_name
## find_element(By.ID,id)

# 查找多个节点
## find_elements 返回列表


# 节点交互
# input = browser.find....
# input.send_keys('IPAD')

# 动作链
# 节点拖拽
# source =
# target =
# actions = ActionChains(browser)
# actions.drag_and_drop(source,target)
# action.perform()

# selenium官方文档

# 执行自定义的javascript

# browser.execute_script(your_script)

# 获取节点信息
## find后返回WebElement类型
## 1.解析库
## 2.get_attribute()
## 3..text
## 获取id、位置、标签名和大小
## .id
## .location
## .tag_name
## .size


# 什么是frame
## 相当于页面的子页面，结构和外部网页一致，selenium打开页面后，默认是在父级frame里面操作，如果此时页面中还有子frame,是不能获取到子frame里面的结点的，需要切换switch_to.frame()

# 延时等待
## 隐式等待 browser.implicitly_wait(),默认是0
## 隐式受网络影响大，使用wait = WebDriverWait(browser,sec_you_set),input=wait.until(EC.presence_of_element_located((By.ID,'q')))
## EC = expected_conditions

## 等待条件及其含义
### title_is
### title_contains
### presence_of_element_located
### visibility_of_


### gocolly

# browser.back()

# browser.forward()

# get/delete_all/add_cookies

# 选项卡



