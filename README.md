# 织毯学土库曼语 · Haly

零基础土库曼语学习网页游戏。土库曼语的“拼音”，就是它的 30 个拉丁字母：从字母发音起步，经过元音和谐、词缀、句型、动词，一直学到日常与旅行会话。每过一关，地毯上就织出一个纹样（göl）。

**在线试玩：** https://OWNER.github.io/turkmen-haly/

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

共 6 层、29 关、279 道练习题，8 种玩法：选择、听力、配对、分拣、拼词、词缀积木、排句、情景对话。

## 特点

- **元音上色**：蓝色 = 粗元音（ýogyn：a o u y），橙色 = 细元音（inçe：e ä i ö ü），随时看出元音和谐。
- **发音**：所有字母、单词和句子都有发音（共 479 条），随游戏离线播放。全部 30 个字母的名称和 70 多个常用词句是**土库曼母语者录音**（切自美国和平队公共领域教材，喇叭上带绿点、词库里标“真人”）；其余由 Meta 开源的 MMS 土库曼语语音模型合成，并经音素识别模型逐条核对、三选一。字母卡先读字母名称（be、çe、ef……）再读例词；点喇叭或带下划线的词都能听；答题后自动播放正确答案。
- **听力题**：每关都有“听发音、选出你听到的”题目，从分辨 ü / u / y 到听整句。
- **字母卡**：每个字母都有国际音标、汉语或英语近似音、口型提示和带图例词。
- **复习篮**：答错的题自动收进来，之后集中重练。
- **无需账号**：进度保存在浏览器本地（localStorage）。
- **纯静态单文件**：没有依赖；字体来自 Google Fonts，加载不到时自动用系统字体。
- **试玩模式**：在“设置”里打开，可以跳过顺序限制，直接看任意关卡。

## 目录结构

```
index.html   构建好的游戏（GitHub Pages 直接发布这个文件）
audio/       tk.mp3 发音合集（一个音频雪碧图）、map.json 每条发音的起止时间和来源（1 = 母语者录音）
             native/ 母语者录音切片（16 kHz wav）和 native.json（每条的出处、时间点、核对分数）
src/         源码：shell.html、style.css、akey.js、data.js（全部教学内容）、app.js（游戏引擎）
tools/       audio_items.js 从 data.js 提取需要发音的条目；gen_audio.py 打包发音（母语者切片优先，其余用 MMS 合成）；gop.py + tk_g2p.py 用 allosaurus 音素识别给每条发音打分
build.py     把 src/ 和 audio/map.json 合成为 index.html
test/        Playwright 自动通关测试
```

## 本地开发

```bash
python3 build.py      # 修改 src/ 后重新生成 index.html
python3 test/run.py   # 自动玩通全部 29 关，截图存到 test/shots/
```

测试需要先安装 Playwright：`pip install playwright && python -m playwright install chromium`。

教学内容都在 `src/data.js`：字母表 `LETTERS`，关卡 `LAYERS`。字符串里 `{词}` 表示土库曼语（会自动给元音上色、可点击发音），`[ipa]` 表示国际音标。

改了内容之后重新生成发音：

```bash
node tools/audio_items.js > audio/items.json          # 提取需要发音的条目
python3 tools/gen_audio.py --model /path/to/mms-tts-tuk-script_latin --score   # 需要 torch + transformers（--score 还需要 allosaurus）
python3 build.py
```

语音模型 [facebook/mms-tts-tuk-script_latin](https://huggingface.co/facebook/mms-tts-tuk-script_latin)（CC BY-NC 4.0）需先从 Hugging Face 下载；`--score` 用 [allosaurus](https://github.com/xinjli/allosaurus) 的通用音素识别器给每条合成音打分（`pip install allosaurus`），从三次合成里挑最贴近拼写音素的一条，并在 `audio/log.json` 里标出分数差的条目。`audio/native/` 里的母语者切片优先于合成：只要 `native/<key>.wav` 存在就直接使用。

### 母语者录音是怎么来的

发音核查时，土库曼本地人反映合成的字母读音不对。没有母语者可以重新录音，于是从网上找权威的公开录音来对比、对齐：美国和平队的《Introduction to the Turkmen Language》（公共领域，Zohre、Ata、Andrej 三位母语者朗读字母表、问候、数字、家庭、食物、购物、颜色、常用句）。处理流程都在 `tools/` 之外的核查脚本里完成，结果记录在 `audio/native/native.json`：

1. 按能量把录音切成片段，用 allosaurus 逐段识别音素；
2. 把教材文本（英文提示 + 土库曼语）按朗读顺序和片段做单调对齐：证据是 CTC 强制对齐分数（期望音素 vs 识别模型），辅以和 MMS 合成音的 MFCC-DTW 距离；允许跳过、重复、一句拆成几段或一段含几句；
3. 切出每个词句，再用同一模型核对（分数、和英文提示的区分度、时长），可疑的用共振峰轨迹人工复核；
4. 字母名称另用共振峰核对元音（a/e/ä/i/o/ö/u/ü/y 的 F1/F2 各归其位）。

## 已知限制

- 合成音（约 380 条）的元音空间比真人窄，e/ä、o/u、ö/ü 的区别不如母语者录音分明；长短元音（at 马 / at 名字）在拼写上无法区分，这类词对没有配音。字母 y 的母语者读音带有向 i 滑动的色彩，是录音本身如此。
- 母语者录音切片来自 2000 年代的教材 MP3，音质一般，个别切片带一点前后词的余音。
- 教学内容对照了维基百科、SIL 与 Webonary 的土库曼语语法、Peace Corps 教材等资料；土库曼语的学习资源较少，正式教学前建议请母语者审校。

## 参考资料

- [Turkmen alphabet – Wikipedia](https://en.wikipedia.org/wiki/Turkmen_alphabet)
- [Turkmen language – Wikipedia](https://en.wikipedia.org/wiki/Turkmen_language)
- [Webonary 土库曼语–英语词典：语音](https://www.webonary.org/turkmen/language/phonology/)、[语法](https://www.webonary.org/turkmen/en/language/grammar/)
- [David Gray, A Short Descriptive Grammar of Turkmen (SIL, 2011)](https://theswissbay.ch/pdf/Books/Linguistics/Mega%20linguistics%20pack/Turkic/Turkmen%20Language,%20A%20Short%20Descriptive%20Grammar%20of%20the%20(Gray).pdf)
- [安卡拉大学公开课：土库曼语现在时](https://acikders.ankara.edu.tr/pluginfile.php/132768/mod_resource/content/0/TT-III-12.pdf)
- [Peace Corps: Introduction to the Turkmen Language](https://files.peacecorps.gov/multimedia/audio/languagelessons/turkmenistan/TK_Turkmen_Language_Lessons.pdf) — 母语者录音的来源（[Live Lingua 镜像](https://www.livelingua.com/peace-corps/Turkmen)）
- [Allosaurus: universal phone recognizer](https://github.com/xinjli/allosaurus) — 发音核对与对齐
- [Omniglot: Useful phrases in Turkmen](https://www.omniglot.com/language/phrases/turkmen.htm)
- [Meta MMS: Scaling Speech Technology to 1,000+ Languages](https://arxiv.org/abs/2305.13516) — 发音模型
