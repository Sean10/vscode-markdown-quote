# 由来

主要有整理笔记时, 有些内容需要注意引用的需求, 在给[^2]提交`PR`后很可惜作者一直没有上线, 就去提交给了`markdown all in one`, 在大佬们的讨论中, 发现这样一个场景, `markdown`的语法中对于引用只要求`>`符号即可, 但是在各渲染及自动补充的实现中, 追加空格是个优雅的习惯. 然后在[^3]的`review`中, 大佬发现针对是否增加空格, 针对多级列表, `github`的`markdown`渲染的表现还不一致. 这就导致这套实现存在局限性了, 轻易引入存在较大`bug`风险了. 

所以这个插件暂时主要用于下述需求的场景, 对于需要对多级列表等进行引用的场景, 还没有一个比较好的方案.

# 支持场景

* increase
  * keybinding: None
* decrease
  * keybinding: None
* toggle
  * keybinding: cmd + . / alt + .
  * 当`cursor`在某个位置, 未选中任何内容
    * 需求: 该行行首增加`> `即可
  * 当选中了多行文本
    * 每行选中文本无引用标记的行首增加`> `即可.
    * 若全部均以引用,则统一去除行首的引用标记.


# 设置

* spaceBetweenPrefixes: True(default)

# Reference
1. [leidichen/markdown\-add\-quote](https://github.com/leidichen/markdown-add-quote)
2. [Shortcut to toggle block quotes? · Issue \#704 · yzhang\-gh/vscode\-markdown](https://github.com/yzhang-gh/vscode-markdown/issues/704)
3. [✨ Add "toggle block quote" by Sean10 · Pull Request \#811 · yzhang\-gh/vscode\-markdown](https://github.com/yzhang-gh/vscode-markdown/pull/811)