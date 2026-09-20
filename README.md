# 织毯学土库曼语 · Haly

零基础土库曼语学习网页游戏。土库曼语的“拼音”，就是它的 30 个拉丁字母：从字母发音起步，经过元音和谐、词缀、句型、动词，一直学到日常与旅行会话。每过一关，地毯上就织出一个纹样（göl）。

**在线试玩：** https://wangshiyun404.github.io/turkmen-haly/

## 学习路径

学汉语要先学拼音、声调和偏旁部首；学土库曼语对应的是字母、元音和谐和词缀。

| 层 | 对应汉语入门 | 关卡 |
| --- | --- | --- |
| ① 字母与发音 | ≈ 拼音 | 元音九兄弟 · 辅音老朋友 · 戴帽子的辅音 · 伪装者 · 拼读 · 长短音与重音 |
| ② 元音和谐 | ≈ 声调 | 粗细两派 · 复数 -lar/-ler · 看最后一个元音 · 问句小尾巴 -my/-mi |
| ③ 词缀积木 | ≈ 偏旁部首 | 我的、你的 · 在哪儿 · 从哪儿来 · 到哪儿去 · 积木连连看 |
| ④ 句型骨架 | SOV 主宾谓 | 我是 / 不是 · 有 / 没有 · 疑问词 · 动词压轴 |
| ⑤ 动词时态 | 现在 / 过去 | 动词原形 · 现在时 · 过去时 · 否定与请求 |
| ⑥ 场景会话 | 日常与旅行 | 打招呼 · 自我介绍 · 数字与钱 · 巴扎购物 · 餐桌 · 问路与救急 |

共 6 层、29 关、219 道练习题，7 种玩法：选择、配对、分拣、拼词、词缀积木、排句、情景对话。

## 特点

- **元音上色**：蓝色 = 粗元音（ýogyn：a o u y），橙色 = 细元音（inçe：e ä i ö ü），随时看出元音和谐。
- **字母卡**：每个字母都有国际音标、汉语或英语近似音、口型提示和带图例词。
- **复习篮**：答错的题自动收进来，之后集中重练。
- **无需账号**：进度保存在浏览器本地（localStorage）。
- **纯静态单文件**：没有依赖；字体来自 Google Fonts，加载不到时自动用系统字体。
- **试玩模式**：在“设置”里打开，可以跳过顺序限制，直接看任意关卡。

## 目录结构

```
index.html   构建好的游戏（GitHub Pages 直接发布这个文件）
src/         源码：shell.html、style.css、data.js（全部教学内容）、app.js（游戏引擎）
build.py     把 src/ 合成为 index.html
test/        Playwright 自动通关测试
```

## 本地开发

```bash
python3 build.py      # 修改 src/ 后重新生成 index.html
python3 test/run.py   # 自动玩通全部 29 关，截图存到 test/shots/
```

测试需要先安装 Playwright：`pip install playwright && python -m playwright install chromium`。

教学内容都在 `src/data.js`：字母表 `LETTERS`，关卡 `LAYERS`。字符串里 `{词}` 表示土库曼语（会自动给元音上色），`[ipa]` 表示国际音标。

## 已知限制

- 暂无发音音频：浏览器没有土库曼语语音。计划用 Meta 开源的 MMS 土库曼语语音模型生成音频后嵌入。
- 教学内容对照了维基百科、SIL 与 Webonary 的土库曼语语法、Peace Corps 教材等资料；土库曼语的学习资源较少，正式教学前建议请母语者审校。

## 参考资料

- [Turkmen alphabet – Wikipedia](https://en.wikipedia.org/wiki/Turkmen_alphabet)
- [Turkmen language – Wikipedia](https://en.wikipedia.org/wiki/Turkmen_language)
- [Webonary 土库曼语–英语词典：语音](https://www.webonary.org/turkmen/language/phonology/)、[语法](https://www.webonary.org/turkmen/en/language/grammar/)
- [David Gray, A Short Descriptive Grammar of Turkmen (SIL, 2011)](https://theswissbay.ch/pdf/Books/Linguistics/Mega%20linguistics%20pack/Turkic/Turkmen%20Language,%20A%20Short%20Descriptive%20Grammar%20of%20the%20(Gray).pdf)
- [安卡拉大学公开课：土库曼语现在时](https://acikders.ankara.edu.tr/pluginfile.php/132768/mod_resource/content/0/TT-III-12.pdf)
- [Peace Corps: Introduction to the Turkmen Language](https://files.peacecorps.gov/multimedia/audio/languagelessons/turkmenistan/TK_Turkmen_Language_Lessons.pdf)
- [Omniglot: Useful phrases in Turkmen](https://www.omniglot.com/language/phrases/turkmen.htm)
