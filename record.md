2018-8-25

熟悉scrapy爬取流程，pipeline,item,xpath,request,linkextrator,parse,yield,setting,header,Field()
python基本语法


习得：
Restlet Cilent使用
爬虫的暂停与恢复
横向爬取和纵向爬取
各种状态码所代表的意思

疑问：
如何爬取网易云音乐全站数据
以用户为主，一个个索引？ 重复太多
以歌手为主？ 歌手不容易找，不全
以相似歌手为主？ 可以，类似豆瓣的也喜欢
以专辑为主？ 可能有单曲
以歌单为主？	重复太多
以也喜欢为主？ 重复太多
以地址为主？https://music.163.com/#/artist?id=9605，容易被ban
谷歌等各大搜索引擎的缓存

先爬主流歌手页，建立基本的start_urls,然后用linkextrator抽取相似的歌手，在爬取歌手的同时，爬取该歌手的页面，也是避免重复爬取





解决问题
eval函数unpack(jsbeautifier)获取图片链接
根据漫画分门别类存储，根据漫画的目录页重命名文件夹，达到规整的目的
解决被网站ban的问题
packer.py中遇到未预料的问题，暂时将base值设定为62解决，后续再了解原理

待解决：
全站漫画数据庞大，确定需要爬取的目标（DC漫画）为250多G，可以利用scrapy的暂停恢复，将已爬取的数据先移动到移动硬盘

爬虫利器
网易云音乐
携程旅游
同程旅游
腾讯
百度
必应
淘宝
谷歌
知乎
车来了
人流量和车流量动态显示，动态规划行车路线
谷歌艺术计划


待了解：
scrapy 各种坑提前了解
packer原理
增量更新
scrapy_deltafetch 增量抓取
断网急救
网络编程
如何快速分析
博客
跟随别人的脚步
网站存储数据的模式
网站所使用的技术
Bloom Filter
集群化抓取
scrapy -redis


经验：
点击下一页的时候网页URL没有变，即申明该网页是动态加载

加密必定要用JS进行加密的。

下一步：
数据分析
数据挖掘
数据可视化
数据统计

2018-8-26

什么是 XMLHttpRequest 对象？
XMLHttpRequest 对象用于在后台与服务器交换数据。

XMLHttpRequest 对象是开发者的梦想，因为您能够：

在不重新加载页面的情况下更新网页
在页面已加载后从服务器请求数据
在页面已加载后从服务器接收数据
在后台向服务器发送数据

网易云音乐架构
不是 Angular，而是首页内嵌了 iframe，然后通过类似于 Angular router 的方式来管理 iframe 的 URL
The size of requests.queue may be wrong when resuming crawl from unclean shutdown.


2018-8-26

如何爬满网速
目前六千个请求有一千个404，将404url 重新加入队列

使用RetryMiddleware中间件试试，设置这几个参数：

RETRY_ENABLED: 是否开启retry
RETRY_TIMES: 重试次数
RETRY_HTTP_CODECS: 默认是500,502,503,504,408


8-26
google art使用瓦片技术，xhr动态加载图片，一幅作品分割成多个小图片，需要拼接，图片之间尚未有规律，在开发者窗口看到的图片和原图色调不一样，但是清晰度是一致的
不同的清晰度对应不同的版本，一共有几种版本，分别加载
WTpPG是对应的分割文件
维基百科上的并不是原始文件，giga fine art 上有更大的版本，只是受限制的
512x512


是否可以从其他博物馆爬取

爬过十亿级数据的来吐个槽 要想速度快 加机器 加 IP 只有两条路 其他的比如什么优化什么异步多进程多协程线程都没什么作用 就比如一个网站限制单个 IP 一秒访问一次 你代码写出花来一秒也只能请求一次 这不是客户端也不算服务端 这是爬虫最大的问题 所以还是加钱吧

为啥不能增加物理资源，开个 10 台机器，效率不就提高 10 倍了，有时候真不要死脑经，先把事情解决了再说。

所以呢，技术不够，机器来凑，云主机按量付费也没多少，如果你爬回来的数据连这点机器的钱都不值得，那我估计更不值得你投入这么大的人力去搞这个东西。


8-27

8-28

8-29
豆瓣图书评分

8-30
warnings.warn('Selenium support for PhantomJS has been deprecated

9-3 
mysql的workbench和server,在server中指定my.cnf的时候会引发开启服务马上关闭，各方怀疑后，修改一行： secure-file-priv= ''解决问题，可能是路径有问题，或者权限方面，但是修改权限后bug仍在，所以不深究了，继续

修改数据库的时候要记得备份，最好有神经质一样的备份频率，否则开启binlog,可容灾

使用following的形式不可取，有随机多个的时候无法全部提取

当提取有困难的时候，使用正则表达式可能会方便

当提取特征不明显的内容时，xpath的轴可能有用

9-5
如果试图在一个内部函数里对外部作用域（不包括外部函数的外部作用域）的变量进行引用，内部函数就会被认为是闭包

mysql access deny
原因是root帐户默认不开放远程访问权限，所以需要修改一下相关权限。


方案一 改密码：
>grant usage on *.* to 你项目使用的user@localhost identified by'你的密码';
>eg:grant usage on *.* to root@localhost identified by'password';
>FLUSH PRIVILEGES;

方案二：
删除匿名账户
SELECT User, Host from mysql.user WHERE Host = 'localhost' AND User = '';

方案三：

order of preference, my.cnf, $MYSQL_TCP_PORT,
/etc/my.cnf /etc/mysql/my.cnf /usr/local/etc/my.cnf ~/.my.cnf
/etc/my.cnf, /etc/mysql/my.cnf, /usr/local/etc/my.cnf, ~/.my.cnf 


9-6
如果目标页面被ban,考虑各大搜索引擎的cache

9-9
下载和分析处理要分开，这里可以直接使用scrapy的http
使用gzip
dns 本地服务器，预热要用的 dns 地址 -- scrapy 可以设置http缓存，但是scrapy 的dns查询有问题，还不支持ipv6
加强 recv timeout 的智能判断，在服务器响应不佳的情况下，减少链接数目，让服务器退回服务质量。
将网页下载到本地，当有需求变更的时候可以查询本地的页面
增加timestamp
重定向的不参与重新爬取？
500px


ajax
发送请求
解析内容
渲染网页


先全部设置成text，1万条50M,一亿480G,然后再优化存储，以防出现字段长度溢出，截断影响数据的完整性

9-11

Mac系统的环境变量，加载顺序为： 
a. /etc/profile 
b. /etc/paths 
c. ~/.bash_profile 
d. ~/.bash_login 
e. ~/.profile 
f. ~/.bashrc 
其中a和b是系统级别的，系统启动就会加载，其余是用户接别的。c,d,e按照从前往后的顺序读取，如果c文件存在，则后面的几个文件就会被忽略不读了，以此类推。~/.bashrc没有上述规则，它是bash shell打开的时候载入的。这里建议在c中添加环境变量，以下也是以在c中添加环境变量来演示的。


今日头条有多个js文件，每次访问会随机得到其中一个，需要判断

Headless Chrome是无头Chrome浏览器，可以利用Chrome V8引擎的高效。
可以代替phantomjs，Scrapy也不建议使用phantomjs了。
启用无头Chrome，必须使用Chrome对应版本的WebDriver。



























