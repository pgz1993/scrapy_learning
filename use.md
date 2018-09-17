>输入如下代码并回车：

>defaults write com.apple.Dock autohide-delay -float 0 && killall Dock

>复制代码这样当Dock再次隐藏或者显示的时候就会立即执行的
如果想要恢复原来默认的延迟速度，就在终端输入如下代码并回车即可：

>defaults delete com.apple.Dock autohide-delay && killall Dock


>不使用 IDE, 纯手写（比如用纸和笔写代码）更提高代码水平。比如：

>实现算法的时候，手写代码。
>代码不依赖第三方包时，手写代码（更能体会编程语言本身的特性）。
>预先写伪代码。简单的代码看不出伪代码的好处，但是如果项目复杂，提前写好伪代码，能避免很多坑。
>最后，手写代码对面试帮助非常大。


# pycharm document

> pip list --outdated

> pip install --upgrade SomePackage

# 升级所有可用的包
> pip freeze --local | grep -v '^-e' | cut -d = -f 1  | xargs -n1 pip install -U

#切换源
> vim ~/.pip/pip.conf