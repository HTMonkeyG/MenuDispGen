# MenuDispGen
&emsp;Languages: **简体中文** | English

&emsp;1号雪球菜单引擎的菜单页面生成小程序。使用NodeJS运行。

## 使用方法
1. 下载NodeJS。
2. 克隆仓库到本地并切换进仓库文件夹。
3. 根据需要修改```menu.json```。
4. 运行```node main.js```。
5. 在```result.txt```内查看生成结果。

## 菜单页面格式规范
### 示例
```json
{
  "onlyJson": false, // 返回结果仅包含json部分
  "iuTag": "iu", // 正在使用菜单的玩家的标签
  "cuTag": "cu", // 可以使用菜单的玩家的标签
  "mCtrScb": "mCtr", // 菜单选项计数器
  "mLayerScb":"mLayer", // 菜单页面计数器
  "mColorScb": "mColor", // 菜单颜色计分项
  "prompt": "＞", // 选中的提示符
  "Layer": 2, // 以下内容所在页面
  "Content": [
    {
      "Static": true, // 是否为静态文本（即不作为选项）
      "Text": "§d女巫§d操作面板\n§b请在下方选择目标\n§c倒计时: ", // 文本内容
      "NewLine": false // 是否换行
    },
    {
      "Static": true, // 是否为静态文本（即不作为选项）
      "Score": { // 显示计分项，与Text不兼容
        "Objective": "sem", // 计分项
        "Name": "witchTmrInSec" // 实体
      },
      "NewLine": true // 是否换行
    },
    {
      "Ctr": 0, // 当前选项所对应计数器值，与Static不兼容
      "Text": "§c红",
      "NewLine": false
    },
    {
      "Ctr": 1,
      "Text": "§9蓝",
      "NewLine": true
    }
  ]
}
```
&emsp;如上示例返回的指令：
```json
execute 
  as @a[tag=iu,scores={mLayer=2}] 
  run titleraw @s actionbar 
  {
    "rawtext":[
      {"text":"§d女巫§d操作面板\n§b请在下方选择目标\n§c倒计时: "},
      {"score":{"objective":"sem","name":"witchTmrInSec"}},
      {"text":"\n§r§"},
      {"score":{"objective":"mColor","name":"@s[scores={mCtr=0}]"}},
      {"text":"＞§c红§"},
      {"score":{"objective":"mColor","name":"@s[scores={mCtr=1}]"}},
      {"text":"＞§9蓝"}
    ]
  }
```
### 一些小细节
&emsp;如果要使静态Score显示的分数带颜色，在其前方加上一个静态的不换行Text修改颜色即可。