# r’ ..‘字符串（raw字符串）？ 由于正则式的规则也是由一个字符串定义的，而在正则式中大量使用转义字符’/’，如果不用raw字符串，则在需要写一个’/’的地方，你必须得写成’//’,那么在要从目标字符串中匹配一个’/’的时候，你就得写上4个’/’成为’////’！这当然很麻烦，也不直观，所以一般都使用r’’来定义规则字符串。当然，某些情况下，可能不用raw字符串比较好。

#‘[‘  ‘]’ 字符集合设定符

# ‘|’    或规则

# 第一，           它在’[‘ ‘]’之中不再表示或，而表示他本身的字符。如果要在’[‘ ‘]’外面表示一个’|’字符，必须用反斜杠引导，即 ’/|’ ;

第二，           它的有效范围是它两边的整条规则，比如‘dog|cat’匹配的是‘dog’和’cat’，而不是’g’和’c’。如果想限定它的有效范围，必需使用一个无捕获组 ‘(?: )’包起来。比如要匹配 ‘I have a dog’或’I have a cat’，需要写成r’I have a (?:dog|cat)’ ，而不能写成 r’I have a dog|cat’

# ‘/A’ 匹配字符串开头

匹配字符串的开头。它和’^’的区别是，’/A’只匹配整个字符串的开头，即使在’M’模式下，它也不会匹配其它行的很首。

# ‘/Z’ 匹配字符串结尾

匹配字符串的结尾。它和’$’的区别是，’/Z’只匹配整个字符串的结尾，即使在’M’模式下，它也不会匹配其它各行的行尾。

# ‘/b’ 匹配单词边界

#  '/sbc/s'#只找到那个单独的’bc’，不过注意前后有两个空格，可能有点看不清楚

# ‘/B’ 匹配非边界

# ‘(‘’)’       无命名组

##>>> s = ‘aaa111aaa , bbb222 , 333ccc ‘

>>> re.findall (r'[a-z]+(/d+)[a-z]+' , s )

['111']

# 

# r'<loc>(.[^<>]*)</loc>\n    <priority>(.[^<>]*)</priority>\n    <changefreq>(.[^<>]*)</changefreq>'

# python 多线程执行，只用了cpu的25%


# pip

## pip install cryptography --global-option=build_ext --global-option="-L/usr/local/opt/openssl/lib" --global-option="-I/usr/local/opt/openssl/include"
