# from selenium import webdriver
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.support import expected_conditions as EC
# from selenium.webdriver.support.wait import WebDriverWait
# import os
#
# chromedriver = "/Users/hjx/Downloads/ChromeDriver/chromedriver"
#
# os.environ["webdriver.chrome.driver"] = chromedriver
#
# chrome_options = webdriver.ChromeOptions()
# ## headless
# # chrome_options.add_argument('--headless')
# # browser = webdriver.Chrome(chromedriver,chrome_options=chrome_options)
# browser = webdriver.Chrome(chromedriver)
# try:
#     ## 注意两个的区别
#     ## 一个有井号，一个没有
#     browser.get('https://music.163.com/playlist?id=2418344339')
#
#     browser.switch_to.frame('g_iframe')
#     wait = WebDriverWait(browser, 10)
#     print(browser.get_cookies())
#     print(browser.page_source)
#
# except:
#     print("123")
# finally:
#     browser.close()