>输入如下代码并回车：
defaults write com.apple.Dock autohide-delay -float 0 && killall Dock
复制代码这样当Dock再次隐藏或者显示的时候就会立即执行的

如果想要恢复原来默认的延迟速度，就在终端输入如下代码并回车即可：
defaults delete com.apple.Dock autohide-delay && killall Dock