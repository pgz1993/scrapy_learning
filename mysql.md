# 不要频繁开关闭数据库连接，尽量批量提交
# mysql的慢删除，可以先创建硬链接，这样一个大表就有两个链接，drop移除一个就很快，然后再rm -f
# 如果mysql的一个操作很久，要么数据很大，要么死锁，用-- select trx_state, trx_started, trx_mysql_thread_id, trx_query from information_schema.innodb_trx查询并根据情况决定是否kill掉该事务
# 为了进一步加快数据库的读取，使用内存数据库redis

#例如：SELECT * FROM tab_name WHERE MATCH ('列名1,列名2...列名n') AGAINST('词1 词2 词3 ... 词m');
    
      即：MATCH 相当于要匹配的列，而 AGAINST 就是要找的内容。  
      这里的table需要是MyISAM类型的表，col1、col2 必须是char、varchar或text类型，在查询之前需要在 col1 和 col2 上分别建立全文索引(FULLTEXT索引)。
# 尽量不使用 where value like 的形式，会导致放弃索引而使用全表扫描，查询效率会降低
# 建立unique索引是为了避免重复，而不是加快速度，加快速度使用普通索引（比未建立索引，查询速度快100万倍）
# CREATE INDEX idx_user_username ON user (username(6));  使用username的前六个字符建立idx_user_username 索引
# 改变表字段类型后要进行收缩操作，因为sql可能不会自动收缩

#由字符集来确定，字符集分单字节和多字节
Latin1 一个字符占一个字节，最多能存放 65532 个字符
GBK 一个字符占两个字节， 最多能存 32766 个字符
UTF8 一个字符占三个字节， 最多能存 21844 个字符

#区别一，定长和变长
char 表示定长，长度固定，varchar表示变长，即长度可变。当所插入的字符串超出它们的长度时，视情况来处理，如果是严格模式，则会拒绝插入并提示错误信息，如果是宽松模式，则会截取然后插入。如果插入的字符串长度小于定义长度时，则会以不同的方式来处理，如char（10），表示存储的是10个字符，无论你插入的是多少，都是10个，如果少于10个，则用空格填满。而varchar（10），小于10个的话，则插入多少个字符就存多少个。
varchar怎么知道所存储字符串的长度呢？实际上，对于varchar字段来说，需要使用一个（如果字符串长度小于255）或两个字节（长度大于255）来存储字符串的长度。但是因为他需要有一个prefix来表示他具体bytes数是多少（因为varchar是变长的，没有这个长度值他不知道如何读取数据）。

区别之二，存储的容量不同
对 char 来说，最多能存放的字符个数 255，和编码无关。
而 varchar 呢，最多能存放 65532 个字符。VARCHAR 的最大有效长度由最大行大小和使用的字符集确定。整体最大长度是 65,532字节

#数据压缩能够让数据库变得更小，从而减少磁盘的I/O,还能提高系统吞吐量，以很小的成本（耗费较多的CPU资源）。对于读比重比较多的应用，压缩是特别有用。压缩能够让系统拥有足够的内存来存储热数据
#在创建innodb表时带上ROW_FORMAT=COMPRESSED参数能够使用比默认的16K更小的页。这样在读写时需要更少的I/O，对于SSD磁盘更有价值。

#页的大小通过KEY_BLOCK_SIZE参数指定。不同大小的页意味着需要使用独立表空间，不能使用系统共享表空间，可以通过innodb_file_per_table指定。KEY_BLOCK_SIZE的值越小，你获得I/O好处就越多，但是如果因为你指定的值太小，当数据被压缩到不足够满足每页多行数据记录时，会产生额外的开销来重组页。对于一个表，KEY_BLOCK_SIZE的值有多小是有严格的限制的，一般是基于每个索引键的长度。有时指定值过小，当create table或者alter table会失败。

在缓冲池中，被压缩的数据是存储在小页中的，这个小页的实际大小就是KEY_BLOCK_SIZE的值。为了提取和更新列值，mysql也会在缓冲池中创建一个未压缩的16k页。任何更新到未压缩的页也需要重新写入到压缩的页，这时你需要估计缓冲池的大小以满足压缩和未压缩的页，尽管当缓冲空间不足时，未压缩的页会被挤出缓冲池。在下次访问时，不压缩的页还会被创建。

#在创建一个压缩表之前，需要启用独立表空间参数innodb_file_per_table=1；也需要设置innodb_file_format=Barracuda，你可以写到my.cnf文件中不需要重启mysql服务。

SET GLOBAL innodb_file_per_table=1;
SET GLOBAL innodb_file_format=Barracuda;
CREATE TABLE t1
 (c1 INT PRIMARY KEY) 
 ROW_FORMAT=COMPRESSED  
 KEY_BLOCK_SIZE=8;
如果你指定ROW_FORMAT=COMPRESSED，那么可以忽略KEY_BLOCK_SIZE的值，这时使用默认innodb页的一半，即8kb；
如果你指定了KEY_BLOCK_SIZE的值，那么你可以忽略ROW_FORMAT=COMPRESSED，因为这时会自动启用压缩；
为了指定最合适KEY_BLOCK_SIZE的值，你可以创建表的多个副本，使用不同的值进行测试，比较他们的.ibd文件的大小；

一般而言，对于读远远大于写的应用以及拥有合理数量的字符串列的表，使用压缩效果会更好。

#INSERT ignore INTO 批量插入的时候，存在重复键不插入，不存在即插入，忽略错误

# mac偏好设置中mysql不能正常开关闭
## 在终端命令行使用kill命令将mysqld进程杀死：
##ps -ef | grep  mysqld
##sudo kill -9 pid


如果你写成几个存储过程, 开几个连接来执行, 则是并行的
# "/Applications/MySQLWorkbench.app/Contents/MacOS/mysql" "-uroot" "-hlocalhost" "-local-file" -P3306  -p 
 
启动MySQL服务
sudo /usr/local/MySQL/support-files/mysql.server start --local-infile=1

停止MySQL服务
sudo /usr/local/mysql/support-files/mysql.server stop

重启MySQL服务
sudo /usr/local/mysql/support-files/mysql.server restart


innodb_log_buffer_size = 16M # 此配置项作用设定innodb 数据库引擎写日志缓存区；将此缓存段增大可以减少数据库写数据文件次数。
innodb_log_file_size = 128M #此配置项作用设定innodb 数据库引擎UNDO日志的大小；从而减少数据库checkpoint操作。
innodb_autoextend_increment = 128M


MyISAM适合：(1)做很多count 的计算；(2)插入不频繁，查询非常频繁；(3)没有事务。
InnoDB适合：(1)可靠性要求比较高，或者要求事务；(2)表更新和查询都相当的频繁，并且表锁定的机会比较大的情况。(4)性能较好的服务器，比如单独的数据库服务器，像阿里云的关系型数据库RDS就推荐使用InnoDB引擎


30多条mysql数据库优化方法,千万级数据库记录查询轻松解决
1.对查询进行优化，应尽量避免全表扫描，首先应考虑在 where 及 order by 涉及的列上建立索引。

2.应尽量避免在 where 子句中对字段进行 null 值判断，否则将导致引擎放弃使用索引而进行全表扫描，

Sql 代码 : select id from t where num is null;
可以在 num 上设置默认值 0,确保表中 num 列没有 null 值，然后这样查询：

Sql 代码 : select id from t where num=0;
3.应尽量避免在 where 子句中使用!=或<>操作符，否则将引擎放弃使用索引而进行全表扫描。

4.应尽量避免在 where 子句中使用 or 来连接条件，否则将导致引擎放弃使用索引而进行全表扫描，

Sql 代码 : select id from t where num=10 or num=20;
可以这样查询：

Sql 代码 : select id from t where num=10 union all select id from t where num=20;
5.in 和 not in 也要慎用，否则会导致全表扫描，如：

Sql 代码 : select id from t where num in(1,2,3);
对于连续的数值，能用 between 就不要用 in 了：

Sql 代码 : select id from t where num between 1 and 3;
6.下面的查询也将导致全表扫描：

Sql 代码 : select id from t where name like '%c%';
若要提高效率，可以考虑全文检索。

7.如果在 where 子句中使用参数，也会导致全表扫描。因为 SQL 只有在运行时才会解析局部变量，但优 化程序不能将访问计划的选择推迟到运行时;它必须在编译时进行选择。然 而，如果在编译时建立访问计 划，变量的值还是未知的，因而无法作为索引选择的输入项。如下面语句将进行全表扫描：

Sql 代码 : select id from t where num=@num ;
可以改为强制查询使用索引：

Sql 代码 : select id from t with(index(索引名)) where num=@num ;
8.应尽量避免在 where 子句中对字段进行表达式操作， 这将导致引擎放弃使用索引而进行全表扫描。

Sql 代码 : select id from t where num/2=100;
可以这样查询：

Sql 代码 : select id from t where num=100*2;
9.应尽量避免在 where 子句中对字段进行函数操作，这将导致引擎放弃使用索引而进行全表扫描。如：

Sql 代码 : select id from t where substring(name,1,3)='abc';#name 以 abc 开头的 id
应改为：

Sql 代码 : select id from t where name like 'abc%';
10.不要在 where 子句中的“=”左边进行函数、算术运算或其他表达式运算，否则系统将可能无法正确使用 索引。

11.在使用索引字段作为条件时，如果该索引是复合索引，那么必须使用到该索引中的第一个字段作为条件 时才能保证系统使用该索引， 否则该索引将不会 被使用， 并且应尽可能的让字段顺序与索引顺序相一致。

12.不要写一些没有意义的查询，如需要生成一个空表结构：

Sql 代码 : select col1,col2 into #t from t where 1=0;
这类代码不会返回任何结果集，但是会消耗系统资源的，应改成这样：

Sql 代码 : create table #t(…);
13.很多时候用 exists 代替 in 是一个好的选择：

Sql 代码 : select num from a where num in(select num from b);
用下面的语句替换：

Sql 代码 : select num from a where exists(select 1 from b where num=a.num);
14.并不是所有索引对查询都有效，SQL 是根据表中数据来进行查询优化的，当索引列有大量数据重复时， SQL 查询可能不会去利用索引，如一表中有字段 ***,male、female 几乎各一半，那么即使在 *** 上建 了索引也对查询效率起不了作用。

15.索引并不是越多越好，索引固然可以提高相应的 select 的效率，但同时也降低了 insert 及 update 的效率，因为 insert 或 update 时有可能会重建索引，所以怎样建索引需要慎重考虑，视具体情况而定。一个表的索引数最好不要超过 6 个，若太多则应考虑一些不常使用到的列上建的索引是否有必要。

16.应尽可能的避免更新 clustered 索引数据列， 因为 clustered 索引数据列的顺序就是表记录的物理存储顺序，一旦该列值改变将导致整个表记录的顺序的调整，会耗费相当大的资源。若应用系统需要频繁更新 clustered 索引数据列，那么需要考虑是否应将该索引建为 clustered 索引。

17.尽量使用数字型字段，若只含数值信息的字段尽量不要设计为字符型，这会降低查询和连接的性能，并 会增加存储开销。这是因为引擎在处理查询和连接时会逐个比较字符串中每一个字符，而对于数字型而言 只需要比较一次就够了。

18.尽可能的使用 varchar/nvarchar 代替 char/nchar , 因为首先变长字段存储空间小， 可以节省存储空间， 其次对于查询来说，在一个相对较小的字段内搜索效率显然要高些。

19.任何地方都不要使用 select * from t ,用具体的字段列表代替“*”,不要返回用不到的任何字段。

20.尽量使用表变量来代替临时表。如果表变量包含大量数据，请注意索引非常有限(只有主键索引)。

21.避免频繁创建和删除临时表，以减少系统表资源的消耗。

22.临时表并不是不可使用，适当地使用它们可以使某些例程更有效，例如，当需要重复引用大型表或常用 表中的某个数据集时。但是，对于一次性事件， 最好使用导出表。

23.在新建临时表时，如果一次性插入数据量很大，那么可以使用 select into 代替 create table,避免造成大量 log ,以提高速度;如果数据量不大，为了缓和系统表的资源，应先 create table,然后 insert.

24.如果使用到了临时表， 在存储过程的最后务必将所有的临时表显式删除， 先 truncate table ,然后 drop table ,这样可以避免系统表的较长时间锁定。

25.尽量避免使用游标，因为游标的效率较差，如果游标操作的数据超过 1 万行，那么就应该考虑改写。

26.使用基于游标的方法或临时表方法之前，应先寻找基于集的解决方案来解决问题，基于集的方法通常更 有效。

27.与临时表一样，游标并不是不可使用。对小型数据集使用 FAST_FORWARD 游标通常要优于其他逐行处理方法，尤其是在必须引用几个表才能获得所需的数据时。在结果集中包括“合计”的例程通常要比使用游标执行的速度快。如果开发时间允许，基于游标的方法和基于集的方法都可以尝试一下，看哪一种方法的效果更好。

28.在所有的存储过程和触发器的开始处设置 SET NOCOUNT ON ,在结束时设置 SET NOCOUNT OFF .无需在执行存储过程和触发器的每个语句后向客户端发送 DONE_IN_PROC 消息。

29.尽量避免大事务操作，提高系统并发能力。 sql 优化方法使用索引来更快地遍历表。 缺省情况下建立的索引是非群集索引，但有时它并不是最佳的。在非群集索引下，数据在物理上随机存放在数据页上。合理的索引设计要建立在对各种查询的分析和预测上。一般来说：

a.有大量重复值、且经常有范围查询( > ,< ,> =,< =)和 order by、group by 发生的列，可考虑建立集群索引;

b.经常同时存取多列，且每列都含有重复值可考虑建立组合索引;

c.组合索引要尽量使关键查询形成索引覆盖，其前导列一定是使用最频繁的列。索引虽有助于提高性能但 不是索引越多越好，恰好相反过多的索引会导致系统低效。用户在表中每加进一个索引，维护索引集合就 要做相应的更新工作。

30.定期分析表和检查表。

分析表的语法：ANALYZE [LOCAL | NO_WRITE_TO_BINLOG] TABLE tb1_name[, tbl_name]...
以上语句用于分析和存储表的关键字分布，分析的结果将可以使得系统得到准确的统计信息，使得SQL能够生成正确的执行计划。如果用户感觉实际执行计划并不是预期的执行计划，执行一次分析表可能会解决问题。在分析期间，使用一个读取锁定对表进行锁定。这对于MyISAM，DBD和InnoDB表有作用。

例如分析一个数据表：analyze table table_name
检查表的语法：CHECK TABLE tb1_name[,tbl_name]...[option]...option = {QUICK | FAST | MEDIUM | EXTENDED | CHANGED}
检查表的作用是检查一个或多个表是否有错误，CHECK TABLE 对MyISAM 和 InnoDB表有作用，对于MyISAM表，关键字统计数据被更新

CHECK TABLE 也可以检查视图是否有错误，比如在视图定义中被引用的表不存在。

31.定期优化表。

优化表的语法：OPTIMIZE [LOCAL | NO_WRITE_TO_BINLOG] TABLE tb1_name [,tbl_name]...
如果删除了表的一大部分，或者如果已经对含有可变长度行的表(含有 VARCHAR、BLOB或TEXT列的表)进行更多更改，则应使用OPTIMIZE TABLE命令来进行表优化。这个命令可以将表中的空间碎片进行合并，并且可以消除由于删除或者更新造成的空间浪费，但OPTIMIZE TABLE 命令只对MyISAM、 BDB 和InnoDB表起作用。

例如： optimize table table_name
注意： analyze、check、optimize执行期间将对表进行锁定，因此一定注意要在MySQL数据库不繁忙的时候执行相关的操作。

使用测试工具


#sql_mode=ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION

复制表
char(1)截断weekly等
char(1)截断priority，需要用到的时候将该值除以10得到大概的值即可，前提是保留有完成priority值的数据库版本，以备不时之需
loc中截断协议，因为全站使用的都是https,以及其主域名，减少存储空间

复制表2，放弃priority和lastmod,保留loc和changefre,建立had visited timestamp

复制表3
仅保留loc

复制表4
仅保留movie的url

复制表5
仅保留其中更新频率为weekly的url,冷门url一般爬一次就够了，

学习建立索引

pymysql连接数据库失败，在配置文件中的mysqld区域添加
default_authentication_plugin=mysql_native_password
然后在命令行执行alter user 'root'@'localhost' identified with mysql_native_password by '新密码'即可