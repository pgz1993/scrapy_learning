# 不要频繁开关闭数据库连接，尽量批量提交
# mysql的慢删除，可以先创建硬链接，这样一个大表就有两个链接，drop移除一个就很快，然后再rm -f
# 如果mysql的一个操作很久，要么数据很大，要么死锁，用-- select trx_state, trx_started, trx_mysql_thread_id, trx_query from information_schema.innodb_trx查询并根据情况决定是否kill掉该事务
# 为了进一步加快数据库的读取，使用内存数据库redis

