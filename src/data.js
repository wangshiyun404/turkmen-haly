/* ================= DATA =================
   Markup inside strings:
   {word}  -> Turkmen text, vowels tinted (blue = ýogyn/back, orange = inçe/front)
   [ipa]   -> IPA styling
   {NAME}  -> the player's name
*/

// u, l, kind (v/c), group (friend/hat/trap), harmony (b/f), rounded, ipa, zh, tip, [word, meaning, emoji]
const LETTERS = [
  ['A','a','v','friend','b',false,'ɑ','拼音 a（啊）','嘴张大，舌头放低、靠后。',['alma','苹果','🍎']],
  ['B','b','c','friend','',false,'b','拼音 b，但声带要振动','夹在两个元音中间时会变软，接近很轻的 w。',['balyk','鱼','🐟']],
  ['Ç','ç','c','hat','',false,'tʃ','英语 church 的 ch','介于拼音 q 和 ch 之间，舌尖不卷。',['çaý','茶','🍵']],
  ['D','d','c','friend','',false,'d','拼音 d','比拼音 d 更“浊”，声带振动。',['düýe','骆驼','🐫']],
  ['E','e','v','trap','f',false,'e','像“诶”，英语 bed 的 e','不是拼音 e（饿）！嘴角微微向两边拉，舌头靠前。{e} 永远读短音。',['et','肉','🥩']],
  ['Ä','ä','v','hat','f',false,'æː','英语 cat 的 a，读长一点','嘴比 {e} 张得更大，嘴角向两边拉，通常读长音：{bäş} = [bæːʃ]。',['bäş','五','5️⃣']],
  ['F','f','c','friend','',false,'f','拼音 f','多出现在外来词里，本族词里常用 p。',['futbol','足球','⚽']],
  ['G','g','c','friend','',false,'g','拼音 g','碰上粗元音（如 {gyz}、{gawun}）时发音部位更靠后，从喉咙深处发出；夹在元音间会变成摩擦音。',['gawun','甜瓜','🍈']],
  ['H','h','c','friend','',false,'h ~ x','拼音 h（喝）','常像拼音 h 那样带一点摩擦。',['haly','地毯','🧶']],
  ['I','i','v','friend','f',false,'i','拼音 i（衣）','大写是不带点的 I，和小写 i 是同一个字母。',['it','狗','🐕']],
  ['J','j','c','trap','',false,'dʒ','英语 jeep 的 j','别按拼音读！拼音 ju 是“居”，土库曼语 {ju} 是 [dʒu]。',['jaý','房屋、建筑','🏢']],
  ['Ž','ž','c','hat','',false,'ʒ','英语 measure 里的 s','接近拼音 r（日），但舌尖不翘。只出现在外来词里。',['žurnal','杂志','📰']],
  ['K','k','c','friend','',false,'k','拼音 k','碰上粗元音（如 {balyk} 的 k）时部位更靠后，接近阿拉伯语的 q。',['kitap','书','📖']],
  ['L','l','c','friend','',false,'l','拼音 l','粗元音词里的 l 更“暗”，舌根微微抬起。',['limon','柠檬','🍋']],
  ['M','m','c','friend','',false,'m','拼音 m','和拼音一样。',['maşyn','汽车','🚗']],
  ['N','n','c','friend','',false,'n','拼音 n','和拼音一样。',['nahar','饭菜','🍲']],
  ['Ň','ň','c','hat','',false,'ŋ','拼音 ng（“昂”的尾音）','从不出现在词首，只在词中、词尾：{deňiz}（海）、{meniň}（我的）。',['deňiz','海','🌊']],
  ['O','o','v','friend','b',true,'o','拼音 o（哦）','嘴唇收圆，比汉语“哦”更纯，不滑向 u。',['oba','村庄','🏘️']],
  ['Ö','ö','v','hat','f',true,'ø','圆唇的“诶”，像德语 ö','先摆好发“诶”的舌位，再把嘴唇收圆。',['öý','家、房子','🏠']],
  ['P','p','c','friend','',false,'p','拼音 p','词尾的 p 挂上元音开头的词缀常变 b：{kitap} → {kitabym}。',['palaw','抓饭','🍛']],
  ['R','r','c','trap','',false,'r','大舌音（舌尖颤音）','舌尖抵住上齿龈颤动，像西班牙语 rr、俄语 р；不是拼音 r（日）。一时颤不出来，舌尖轻弹一下也能听懂。',['garpyz','西瓜','🍉']],
  ['S','s','c','trap','',false,'θ','英语 think 的 th','咬舌音！舌尖轻放在上下门牙之间送气。这是土库曼语的“招牌音”，土耳其语里没有。',['suw','水','💧']],
  ['Ş','ş','c','hat','',false,'ʃ','英语 she 的 sh','介于拼音 x 和 sh 之间，嘴唇微微前突。',['şäher','城市','🏙️']],
  ['T','t','c','friend','',false,'t','拼音 t','和拼音 t 一样。',['tüwi','米饭','🍚']],
  ['U','u','v','friend','b',true,'u','拼音 u（乌）','嘴唇收圆，向前突出。',['uçar','飞机','✈️']],
  ['Ü','ü','v','friend','f',true,'y','就是拼音 ü（鱼、绿）','舌位像“衣”，嘴唇收圆。土库曼语里 ü 的两点永远要写。',['üzüm','葡萄','🍇']],
  ['W','w','c','friend','',false,'w ~ β','拼音 w','嘴唇不必太圆，有时像很轻的 v。',['wagt','时间','⏰']],
  ['Y','y','v','trap','b',false,'ɯ','介于“衣”和“饿”之间，像俄语 ы','在土库曼语里 {y} 永远是元音！嘴唇放平像发“衣”，舌头却往后缩。辅音“呀”要写成 {ý}。',['gyz','女孩','👧']],
  ['Ý','ý','c','hat','',false,'j','拼音 y（呀、哟）','这才是辅音 y：{ýa} = “呀”，{ýo} = “哟”。',['ýyldyz','星星','⭐']],
  ['Z','z','c','trap','',false,'ð','英语 this 的 th','浊咬舌音：舌尖放在上下门牙之间，声带振动。不是拼音 z（资）。',['göz','眼睛','👁️']]
].map(a => ({u:a[0], l:a[1], kind:a[2], grp:a[3], h:a[4], r:a[5], ipa:a[6], zh:a[7], tip:a[8], w:a[9]}));

const GROUP_NAME = {friend:'老朋友', hat:'戴帽子', trap:'伪装者'};
const GROUP_DESC = {friend:'读法和拼音或英语基本一样', hat:'新面孔，带附加符号', trap:'长得眼熟，读法不同'};

const LAYERS = [
{ n:1, name:'字母与发音', analog:'≈ 拼音', tkname:'Harplar we sesler', pal:['#2B3A78','#F2E8D5','#E0A030'],
  levels:[
  { id:'1-1', title:'元音九兄弟', sub:'9 个元音，你已经认识 5 个',
    words:[['alma','苹果','🍎'],['et','肉','🥩'],['bäş','五','5️⃣'],['it','狗','🐕'],['gyz','女孩','👧'],['oba','村庄','🏘️'],['öý','家、房子','🏠'],['uçar','飞机','✈️'],['üzüm','葡萄','🍇']],
    learn:[
      {t:'intro', h:'9 个元音，你已经认识 5 个', b:'<p>土库曼语有 9 个元音字母：{a} {e} {ä} {i} {y} {o} {ö} {u} {ü}。</p><p>其中 {a} {o} {i} {u} {ü} 的读法和汉语拼音基本一样。真正要新学的只有 4 个：{e}（不读“饿”）、{ä}、{ö}、{y}。</p>'},
      {t:'chart', h:'两大派：粗元音和细元音', b:'<p>土库曼语法把舌头靠后的元音叫 {ýogyn}（粗），舌头靠前的叫 {inçe}（细）。</p><p>游戏里所有土库曼语单词的元音都会上色：<b class="vb">蓝色 = 粗</b>，<b class="vf">橙色 = 细</b>。第 2 层会讲它为什么是整门语言的“声调”。</p>'},
      {t:'letter', k:'a'},{t:'letter', k:'e'},{t:'letter', k:'ä'},{t:'letter', k:'i'},{t:'letter', k:'y'},
      {t:'letter', k:'o'},{t:'letter', k:'ö'},{t:'letter', k:'u'},{t:'letter', k:'ü'}
    ],
    quiz:[
      {q:'choice', p:'哪个字母的读音就是拼音里的 ü（鱼）？', o:['ü','u','y','i'], tk:true, x:'{ü} 和拼音 ü 完全一样。{y} 不是 ü，也不是辅音。'},
      {q:'choice', p:'土库曼语的 {y} 是什么音？', o:['元音，介于“衣”和“饿”之间','辅音，像拼音 y（呀）','和 i 读法一样','不发音'], x:'土库曼语里 {y} 永远是元音 [ɯ]。辅音“呀”要写成 {ý}。'},
      {q:'choice', p:'{et}（肉）里的 {e} 应该怎么读？', o:['像“诶”，英语 bed 的 e','像拼音 e（饿）','像“啊”','像“衣”'], x:'土库曼语的 {e} 是 [e]，千万别按拼音读成“饿”。'},
      {q:'choice', p:'{ä} 最像哪个英语单词里的元音？', o:['cat','bed','cup','see'], x:'{ä} = [æ]，像 cat 的 a，而且通常读得长一些。'},
      {q:'choice', p:'{ö} 的发音方法是？', o:['舌位像“诶”，嘴唇收圆','舌位像“衣”，嘴唇收圆','和拼音 o 一样','嘴巴张大发“啊”'], x:'舌位像“诶”+ 圆唇 = {ö}；舌位像“衣”+ 圆唇 = {ü}。'},
      {q:'sort', p:'把元音分进两派', bins:['粗元音（靠后）','细元音（靠前）'], items:[['a',0],['e',1],['o',0],['ü',1],['y',0],['ä',1],['u',0],['i',1],['ö',1]], tk:true, x:'粗元音：a o u y；细元音：e ä i ö ü。'},
      {q:'match', p:'配对：字母 ↔ 近似音', pairs:[['a','啊'],['i','衣'],['u','乌'],['ü','鱼（ü）'],['o','哦']]},
      {q:'choice', p:'下面哪个是圆唇元音？', o:['ö','ä','e','y'], tk:true, x:'圆唇元音有 4 个：{o} {ö} {u} {ü}。'},
      {q:'choice', p:'看图选词：葡萄', emoji:'🍇', o:['üzüm','uzum','yzym','özöm'], tk:true, x:'{üzüm}：两个都是 {ü}。'}
    ]},
  { id:'1-2', title:'辅音老朋友', sub:'12 个辅音，和拼音几乎一样',
    words:[['balyk','鱼','🐟'],['düýe','骆驼','🐫'],['futbol','足球','⚽'],['gawun','甜瓜','🍈'],['haly','地毯','🧶'],['kitap','书','📖'],['limon','柠檬','🍋'],['maşyn','汽车','🚗'],['nahar','饭菜','🍲'],['palaw','抓饭','🍛'],['tüwi','米饭','🍚'],['wagt','时间','⏰']],
    learn:[
      {t:'intro', h:'12 个老朋友', b:'<p>{b} {d} {f} {g} {h} {k} {l} {m} {n} {p} {t} {w}——这 12 个辅音和拼音（或英语）的读法基本一样，几乎不用花力气。</p>'},
      {t:'grid', h:'老朋友和它们的例词', letters:['b','d','f','g','h','k','l','m','n','p','t','w']},
      {t:'intro', h:'老朋友的两个小脾气', b:'<p>① {g}、{k} 碰上粗元音（a o u y）时，发音部位更靠后，从喉咙深处出来：{gawun}、{balyk}。</p><p>② {b}、{g} 夹在两个元音之间会变“软”：{b} 接近很轻的 w，{g} 变成摩擦音。初学时按拼音读，对方也能听懂。</p>'}
    ],
    quiz:[
      {q:'choice', p:'看图选词：鱼', emoji:'🐟', o:['balyk','palyk','baluk','balyg'], tk:true, x:'{balyk}：b-a-l-y-k。'},
      {q:'choice', p:'看图选词：甜瓜', emoji:'🍈', o:['gawun','kawun','gawyn','gowun'], tk:true, x:'{gawun}。土库曼斯坦的甜瓜很出名，还有专门的“甜瓜节”。'},
      {q:'spell', hint:'🍋 柠檬', a:'limon', extra:'enr'},
      {q:'choice', p:'看图选词：汽车', emoji:'🚗', o:['maşyn','masyn','maşin','maçyn'], tk:true, x:'{maşyn}：中间是 {ş}（sh），元音是 {y}。'},
      {q:'spell', hint:'🍛 抓饭', a:'palaw', extra:'bou'},
      {q:'match', p:'配对：单词 ↔ 意思', pairs:[['düýe','骆驼 🐫'],['tüwi','米饭 🍚'],['haly','地毯 🧶'],['wagt','时间 ⏰'],['kitap','书 📖']]},
      {q:'choice', p:'哪个字母多出现在外来词里？', o:['f','b','d','m'], tk:true, x:'{f} 多见于外来词，比如 {futbol}（足球）。'},
      {q:'choice', p:'{gawun} 里的 {g} 为什么发得更靠后？', o:['因为旁边是粗元音 a','因为它在词首','因为 g 永远靠后','因为后面有 w'], x:'{g}、{k} 碰上粗元音（a o u y）就往后缩。'},
      {q:'spell', hint:'📖 书', a:'kitap', extra:'bgy'}
    ]},
  { id:'1-3', title:'戴帽子的辅音', sub:'ç ş ž ň ý：帽子一戴，读音就变',
    words:[['çaý','茶','🍵'],['çörek','馕、面包','🫓'],['deňiz','海','🌊'],['şäher','城市','🏙️'],['ýyldyz','星星','⭐'],['žurnal','杂志','📰'],['meniň','我的','']],
    learn:[
      {t:'intro', h:'字母表里没有 c、q、v、x', b:'<p>土库曼语的字母表没有 c、q、v、x，却有 5 个“戴帽子”的辅音：{ç} {ş} {ž} {ň} {ý}。帽子一戴，读音就变了。</p>'},
      {t:'letter', k:'ç'},{t:'letter', k:'ş'},{t:'letter', k:'ž'},{t:'letter', k:'ň'},{t:'letter', k:'ý'},
      {t:'intro', h:'ý 和 y：最容易混的一对', b:'<p>{ý}（带尖帽）= 辅音，像拼音 y：{ýa} 呀、{ýo} 哟。</p><p>{y}（不带帽）= 元音 [ɯ]。</p><p>一个词里可以两个都有：{ýyldyz}（星星）= ý + y + l + d + y + z。注意上色：元音 {y} 会变蓝，辅音 {ý} 不上色。</p>'}
    ],
    quiz:[
      {q:'choice', p:'看图选词：茶', emoji:'🍵', o:['çaý','çay','caý','şaý'], tk:true, x:'{çaý}：{ç} 读 ch，结尾的 {ý} 是辅音。'},
      {q:'choice', p:'哪个字母读作英语 she 里的 sh？', o:['ş','s','ç','ž'], tk:true, x:'{ş} = sh；{s} 是咬舌音；{ç} = ch；{ž} = measure 里的 s。'},
      {q:'choice', p:'{ň} 会出现在词首吗？', o:['不会，只在词中或词尾','会，而且很常见','只出现在外来词开头','只出现在问句里'], x:'{ň} 从不打头：{deňiz}（海）、{meniň}（我的）。'},
      {q:'choice', p:'看图选词：星星', emoji:'⭐', o:['ýyldyz','yýldyz','ýildiz','yyldyz'], tk:true, x:'{ýyldyz}：开头的 {ý} 是辅音，后面的 {y} 是元音。'},
      {q:'spell', hint:'🏙️ 城市', a:'şäher', extra:'sea'},
      {q:'match', p:'配对：字母 ↔ 发音', pairs:[['ç','ch（church）'],['ş','sh（she）'],['ž','s（measure）'],['ň','ng（sing）'],['ý','y（yes）']]},
      {q:'choice', p:'{ý} 和 {y}，哪个是辅音？', o:['{ý}','{y}','两个都是','两个都不是'], x:'带尖帽的 {ý} 是辅音，{y} 是元音。'},
      {q:'spell', hint:'🌊 海', a:'deňiz', extra:'ng'},
      {q:'choice', p:'看图选词：馕、面包', emoji:'🫓', o:['çörek','çorek','şörek','çörük'], tk:true, x:'{çörek}。馕在土库曼人心中很神圣，不能随意丢弃。'}
    ]},
  { id:'1-4', title:'伪装者', sub:'s z r j e y：长得眼熟，读法不同',
    words:[['suw','水','💧'],['salam','你好','👋'],['göz','眼睛','👁️'],['jaý','房屋、建筑','🏢'],['garpyz','西瓜','🍉'],['sary','黄色','🟡'],['duz','盐','🧂'],['şeker','糖','🍬']],
    learn:[
      {t:'intro', h:'6 个伪装者', b:'<p>它们和拼音长得一模一样，读法却不同，是最容易出错的一组：辅音 {s} {z} {r} {j}，以及上一关见过的元音 {e} {y}。</p>'},
      {t:'letter', k:'s'},{t:'letter', k:'z'},{t:'letter', k:'r'},{t:'letter', k:'j'},
      {t:'intro', h:'咬舌音是土库曼语的招牌', b:'<p>{salam}（你好）开口第一个音就是咬舌的 [θ]：[θɑlɑm]。</p><p>同属乌古斯语支，土耳其语、阿塞拜疆语都读 [s]，只有土库曼语咬舌。说对这个音，一开口就像土库曼人。</p>'},
      {t:'intro', h:'回顾：e 和 y', b:'<p>{e} 读“诶”，不读“饿”。</p><p>{y} 是元音 [ɯ]，不是辅音；辅音“呀”写作 {ý}。</p>'}
    ],
    quiz:[
      {q:'choice', p:'{suw}（水）的 {s} 怎么读？', o:['舌尖放在上下齿之间送气，像 think 的 th','和拼音 s 一样','像英语 she 的 sh','不发音'], x:'{s} = [θ]，所以 {suw} 读作 [θuw]。'},
      {q:'choice', p:'{göz}（眼睛）的 {z} 怎么读？', o:['像英语 this 的 th','像拼音 z（资）','像英语 zoo 的 z','像拼音 r（日）'], x:'{z} = [ð]，浊咬舌音。{göz} 读作 [gøð]。'},
      {q:'choice', p:'哪个词的第一个音是咬舌音 [θ]？', o:['salam','şeker','çaý','jaý'], tk:true, x:'{salam} 的 {s} 是咬舌音；{ş} 读 sh。'},
      {q:'choice', p:'土库曼语的 {r} 应该怎么发？', o:['舌尖颤动的大舌音','拼音 r（日）','英语 red 的 r','不发音'], x:'{r} 是颤音：舌尖抵住上齿龈颤动。'},
      {q:'choice', p:'{jaý}（房屋）的 {j} 怎么读？', o:['英语 jeep 的 j [dʒ]','英语 yes 的 y','法语 bonjour 的 j','拼音 q'], x:'{j} = [dʒ]。别和 {ž}（[ʒ]）、{ý}（[j]）搞混。'},
      {q:'sort', p:'它读咬舌音吗？', bins:['读咬舌音（s / z）','不读咬舌音'], items:[['suw',0],['şäher',1],['sary',0],['çaý',1],['duz',0],['jaý',1]], tk:true, x:'只有 {s} 和 {z} 读咬舌音；{ş} {ç} {j} 都不是。'},
      {q:'match', p:'配对：伪装者 ↔ 真实读音', pairs:[['s','[θ] think'],['z','[ð] this'],['j','[dʒ] jeep'],['r','大舌颤音'],['y','[ɯ] 元音']]},
      {q:'choice', p:'{e} 的正确读法：', o:['[e]，像“诶”','[ɤ]，像“饿”','[a]，像“啊”','[i]，像“衣”'], x:'拼音 e 是“饿”，土库曼语的 {e} 是“诶”。'},
      {q:'choice', p:'看图选词：西瓜', emoji:'🍉', o:['garpyz','karpyz','garpiz','garbyz'], tk:true, x:'{garpyz}：{r} 要颤，结尾的 {z} 咬舌。'}
    ]},
  { id:'1-5', title:'拼读', sub:'一字一音，像拼拼音一样',
    words:[['suw','水','💧'],['gyz','女孩','👧'],['öý','家','🏠'],['üzüm','葡萄','🍇'],['alma','苹果','🍎']],
    learn:[
      {t:'intro', h:'一字一音，像拼拼音', b:'<p>土库曼语的拼读和拼音一样：把每个字母的音连起来读就行。</p><p>{s} + {u} + {w} → {suw}（水）[θuw]</p>'},
      {t:'blend', h:'连起来读', items:[[['s','u','w'],'suw','💧','水'],[['ç','a','ý'],'çaý','🍵','茶'],[['g','y','z'],'gyz','👧','女孩'],[['ö','ý'],'öý','🏠','家'],[['a','l','m','a'],'alma','🍎','苹果']]},
      {t:'intro', h:'有几个元音，就有几个音节', b:'<p>元音是音节的核心，一个元音一拍：{al-ma}、{ü-züm}、{sa-lam}、{gar-pyz}、{ýyl-dyz}。</p><p>分不清怎么断开时，先数元音。</p>'}
    ],
    quiz:[
      {q:'spell', hint:'💧 水', a:'suw', extra:'ş'},
      {q:'spell', hint:'👧 女孩', a:'gyz', extra:'iý'},
      {q:'spell', hint:'🏠 家、房子', a:'öý', extra:'oy'},
      {q:'choice', p:'“{sa}” + “{lam}” 拼起来读作？', o:['[θɑlɑm]','[sɑlɑm]','[ʃɑlɑm]','[θɑlɯm]'], x:'{s} 咬舌：[θɑlɑm]。'},
      {q:'choice', p:'{göz}（眼睛）的读音是？', o:['[gøð]','[goz]','[gøz]','[køθ]'], x:'g-ö-z：[g] + [ø] + [ð]。'},
      {q:'choice', p:'{garpyz}（西瓜）有几个音节？', o:['2','3','1','4'], x:'有几个元音就有几个音节：{gar-pyz}。'},
      {q:'spell', hint:'🍇 葡萄', a:'üzüm', extra:'uy'},
      {q:'spell', hint:'🍎 苹果', a:'alma', extra:'e'},
      {q:'choice', p:'{ýyldyz}（星星）有几个音节？', o:['2','3','1','4'], x:'{ýyl-dyz}：两个元音 {y}，两个音节。'}
    ]},
  { id:'1-6', title:'长短音与重音', sub:'写不出来的区别，就像声调',
    words:[['at','马（短音）','🐎'],['at','名字（长音）','🏷️'],['ot','草（短音）','🌿'],['ot','火（长音）','🔥'],['ak','白色（长音）','⚪']],
    learn:[
      {t:'intro', h:'看不见的长短音', b:'<p>土库曼语的元音有长有短，意思会跟着变，但拼写完全一样——就像汉字不标声调。</p><p>这是古突厥语长元音的遗存，土耳其语早已丢失。</p>'},
      {t:'pairs', h:'最经典的两对', items:[['at [ɑt]','马（短音）🐎'],['at [ɑːt]','名字（长音）🏷️'],['ot [ot]','草（短音）🌿'],['ot [oːt]','火（长音）🔥']], b:'<p>怎么记？像记声调一样，跟着单词一起记。好消息：放进句子里基本不会误会，比如 {Meniň adym…}（我的名字……）。</p>'},
      {t:'intro', h:'两条小规律', b:'<p>① {e} 永远是短音。</p><p>② {ä} 通常读长音：{bäş} [bæːʃ]（五）。</p>'},
      {t:'intro', h:'重音：一般在最后一个音节', b:'<p>{sa-LAM}、{ki-TAP}。</p><p>加上词缀后，重音跟着往后挪：{kitap-LAR}、{kitaplar-DA}。</p><p>例外：问句小尾巴 {-my}/{-mi}（第 2 层会学）不抢重音。</p>'}
    ],
    quiz:[
      {q:'choice', p:'{at} 读长音 [ɑːt] 时是什么意思？', o:['名字','马','火','草'], x:'短 [ɑt] = 马，长 [ɑːt] = 名字。'},
      {q:'choice', p:'{ot} 读短音 [ot] 时是什么意思？', o:['草','火','马','名字'], x:'短 [ot] = 草，长 [oːt] = 火。'},
      {q:'choice', p:'长短元音在拼写上怎么区分？', o:['不区分，要跟着单词一起记','长音写成双字母','长音加一顶帽子','长音用大写'], x:'现行拼写不标长短，就像汉字不标声调。'},
      {q:'choice', p:'{salam} 的重音在哪？', o:['sa-LAM（最后一个音节）','SA-lam（第一个音节）','两个音节一样重','没有重音'], x:'土库曼语重音一般落在最后一个音节。'},
      {q:'choice', p:'加上词缀后，{kitaplar} 的重音在？', o:['kitap-LAR','KI-taplar','ki-TAP-lar','没有重音'], x:'重音随词缀后移，落在最后一个音节。'},
      {q:'choice', p:'哪个元音永远是短音？', o:['e','ä','a','o'], tk:true, x:'{e} 永远短；{ä} 通常长。'},
      {q:'choice', p:'“火”怎么读？', emoji:'🔥', o:['[oːt]（长音）','[ot]（短音）','[ɑːt]（长音）','[ɑt]（短音）'], x:'火 = {ot} [oːt]，长音。'},
      {q:'choice', p:'“马”怎么读？', emoji:'🐎', o:['[ɑt]（短音）','[ɑːt]（长音）','[ot]（短音）','[oːt]（长音）'], x:'马 = {at} [ɑt]，短音。'}
    ]}
  ]},

{ n:2, name:'元音和谐', analog:'≈ 声调', tkname:'Ýogyn we inçe', pal:['#F2E8D5','#2B3A78','#2F7D57'],
  levels:[
  { id:'2-1', title:'粗细两派', sub:'一个词里的元音穿同一种颜色',
    words:[['iki','二',''],['alty','六',''],['ýedi','七',''],['sekiz','八',''],['dokuz','九',''],['on','十',''],['ak','白色','⚪'],['gara','黑色','⚫'],['gyzyl','红色','🔴'],['sary','黄色','🟡'],['ýaşyl','绿色','🟢'],['gök','蓝色、青色','🔵'],['ýogyn','粗（后元音）',''],['inçe','细（前元音）','']],
    learn:[
      {t:'intro', h:'一家人穿同一种颜色', b:'<p>土库曼语的本族词里，元音要么全是粗元音，要么全是细元音：</p><p>粗：{balyk} {gyzyl} {dokuz} {alty}<br>细：{üzüm} {şäher} {sekiz} {ýedi}</p><p>这就是<b>元音和谐</b>。它像汉语的声调：不懂就会说错，懂了一通百通。</p>'},
      {t:'intro', h:'为什么它像“声调”', b:'<p>后面要学的每个词缀——复数、“我的”、“在”、“从”、问句——都有粗、细两个版本，挂哪个由词里的元音决定。</p><p>所以先练会一眼分辨粗细，后面的语法就顺了。</p>'},
      {t:'pairs', h:'数字里的和谐', items:[['iki','二（细）'],['alty','六（粗）'],['ýedi','七（细）'],['sekiz','八（细）'],['dokuz','九（粗）'],['on','十（粗）']]},
      {t:'pairs', h:'颜色里的和谐', items:[['ak','白'],['gara','黑'],['gyzyl','红'],['sary','黄'],['ýaşyl','绿'],['gök','蓝、青（绿茶叫 gök çaý）']]}
    ],
    quiz:[
      {q:'sort', p:'这个词属于哪一派？', bins:['粗元音词','细元音词'], items:[['balyk',0],['üzüm',1],['dokuz',0],['sekiz',1],['gyzyl',0],['ýedi',1],['alty',0],['şäher',1]], tk:true, x:'看元音：a o u y 是粗，e ä i ö ü 是细。'},
      {q:'choice', p:'下面哪个词里全是细元音？', o:['ýedi','alty','dokuz','gara'], tk:true, x:'{ýedi}：e、i 都是细元音。'},
      {q:'choice', p:'{gyzyl}（红色）属于哪一派？', o:['粗元音词','细元音词','混合词','没有元音'], x:'两个 {y} 都是粗元音。'},
      {q:'match', p:'配对：数字', pairs:[['iki','2'],['alty','6'],['ýedi','7'],['sekiz','8'],['dokuz','9']]},
      {q:'match', p:'配对：颜色', pairs:[['ak','白'],['gara','黑'],['gyzyl','红'],['sary','黄'],['ýaşyl','绿']]},
      {q:'choice', p:'{gök}（蓝色）属于哪一派？', o:['细元音词','粗元音词'], x:'{ö} 是细元音（舌头靠前）。'},
      {q:'choice', p:'土库曼人把前元音（细元音）叫作？', o:['inçe','ýogyn','uly','kiçi'], tk:true, x:'{inçe} = 细，{ýogyn} = 粗。{uly} 是“大”，{kiçi} 是“小”。'}
    ]},
  { id:'2-2', title:'复数 -lar / -ler', sub:'第一个会变身的词缀',
    words:[['kitaplar','书（复数）','📚'],['itler','狗（复数）',''],['gyzlar','女孩们',''],['öýler','房子（复数）',''],['gözler','眼睛（复数）','👀'],['üç','三','']],
    learn:[
      {t:'intro', h:'复数只有两个版本', b:'<p>粗元音词 + {-lar}，细元音词 + {-ler}：</p><p>{kitap} → {kitaplar}（书）<br>{gyz} → {gyzlar}（女孩们）<br>{it} → {itler}（狗）<br>{öý} → {öýler}（房子）</p>'},
      {t:'intro', h:'有数字就不加复数', b:'<p>{iki kitap}（两本书）、{bäş alma}（五个苹果）——前面有数字，名词保持原形，不说 iki kitaplar。</p><p>这点和汉语的“两本书”一样。</p>'}
    ],
    quiz:[
      {q:'choice', p:'{at}（马）的复数是？', o:['atlar','atler','atlär','atlyr'], tk:true, x:'{a} 是粗元音 → {-lar}。'},
      {q:'choice', p:'{it}（狗）的复数是？', o:['itler','itlar','itlir','itlär'], tk:true, x:'{i} 是细元音 → {-ler}。'},
      {q:'sort', p:'该挂 -lar 还是 -ler？', bins:['-lar','-ler'], items:[['alma',0],['üzüm',1],['oba',0],['şäher',1],['balyk',0],['düýe',1]], tk:true, x:'看元音：粗 → {-lar}，细 → {-ler}。'},
      {q:'choice', p:'{göz}（眼睛）的复数是？', o:['gözler','gözlar','gözlör','gözlür'], tk:true, x:'{ö} 是细元音 → {gözler}。'},
      {q:'choice', p:'“三本书”怎么说？', o:['üç kitap','üç kitaplar','kitaplar üç','üç kitaply'], tk:true, x:'有数字时名词不加复数：{üç kitap}。'},
      {q:'build', p:'拼出“女孩们”', root:'gyz', blocks:['lar','ler'], a:['lar'], forms:['gyzlar'], x:'{gyz} 的 {y} 是粗元音 → {gyzlar}。'},
      {q:'build', p:'拼出“房子（复数）”', root:'öý', blocks:['lar','ler'], a:['ler'], forms:['öýler'], x:'{ö} 是细元音 → {öýler}。'},
      {q:'choice', p:'{düýe}（骆驼）的复数？', o:['düýeler','düýelar','düýler','düýalar'], tk:true, x:'{ü}、{e} 都是细元音 → {düýeler}。'}
    ]},
  { id:'2-3', title:'看最后一个元音', sub:'外来词混搭时的万能规则',
    words:[['telefon','电话','📱'],['kompýuter','电脑','💻'],['restoran','餐厅','🍽️'],['inžener','工程师','👷'],['muzeý','博物馆','🏛️'],['mugallym','老师','🧑‍🏫'],['Türkmenistan','土库曼斯坦','']],
    learn:[
      {t:'intro', h:'外来词会“混搭”', b:'<p>从阿拉伯语、波斯语、俄语借来的词常常粗细混搭：{kitap} 里既有细的 {i}，也有粗的 {a}。</p><p>怎么办？<b>只看最后一个元音。</b></p>'},
      {t:'pairs', h:'看最后一个元音', items:[['kitap → kitaplar','最后是 a → -lar'],['telefon → telefonlar','最后是 o → -lar'],['kompýuter → kompýuterler','最后是 e → -ler'],['inžener → inženerler','最后是 e → -ler'],['restoran → restoranlar','最后是 a → -lar']]},
      {t:'intro', h:'这条规则管所有词缀', b:'<p>不止复数，后面学的“在、从、到、我的”等词缀，统统看最后一个元音。</p><p>{Türkmenistan} 最后是 {a} → {Türkmenistanda}（在土库曼斯坦）。</p>'}
    ],
    quiz:[
      {q:'choice', p:'决定词缀用 a 还是 e 的，是词里的哪个元音？', o:['最后一个元音','第一个元音','最长的元音','重读的元音'], x:'只看最后一个元音。'},
      {q:'choice', p:'{telefon}（电话）的复数？', o:['telefonlar','telefonler'], tk:true, x:'最后一个元音 {o} 是粗元音 → {-lar}。'},
      {q:'choice', p:'{kompýuter}（电脑）的复数？', o:['kompýuterler','kompýuterlar'], tk:true, x:'最后一个元音 {e} 是细元音 → {-ler}。'},
      {q:'sort', p:'挂 -lar 还是 -ler？', bins:['-lar','-ler'], items:[['restoran',0],['inžener',1],['kitap',0],['muzeý',1],['mugallym',0],['kompýuter',1]], tk:true, x:'只看最后一个元音。'},
      {q:'choice', p:'“在土库曼斯坦”', o:['Türkmenistanda','Türkmenistande'], tk:true, x:'{Türkmenistan} 最后一个元音是 {a} → {-da}。'},
      {q:'build', p:'拼出“老师们”', root:'mugallym', blocks:['lar','ler'], a:['lar'], forms:['mugallymlar'], x:'{mugallym} 最后一个元音是 {y} → {-lar}。'},
      {q:'choice', p:'{inžener}（工程师）的复数？', o:['inženerler','inženerlar'], tk:true, x:'最后一个元音 {e} → {-ler}。'}
    ]},
  { id:'2-4', title:'问号小尾巴 -my / -mi', sub:'挂上它，就成了“……吗？”',
    words:[['bu','这',''],['hawa','是',''],['ýok','不、没有',''],['talyp','大学生','🎓']],
    learn:[
      {t:'intro', h:'变问句：挂个小尾巴', b:'<p>陈述句的末尾挂上 {-my}（粗）或 {-mi}（细），就变成“……吗？”，语序不用动：</p><p>{Bu çaý.} 这是茶。→ {Bu çaýmy?} 这是茶吗？<br>{Bu et.} 这是肉。→ {Bu etmi?} 这是肉吗？</p>'},
      {t:'pairs', h:'怎么回答', items:[['Hawa.','是。'],['Ýok.','不。'],['Hawa, bu çaý.','是的，这是茶。'],['Ýok, bu çaý däl.','不，这不是茶。']]},
      {t:'intro', h:'小尾巴也讲和谐', b:'<p>{-my} 里的 {y} 是粗元音，{-mi} 里的 {i} 是细元音——还是看最后一个元音：</p><p>{suwmy?} {kitapmy?} {üzümmi?}</p>'}
    ],
    quiz:[
      {q:'choice', p:'“这是书吗？”', o:['Bu kitapmy?','Bu kitapmi?','Bu my kitap?','My bu kitap?'], tk:true, x:'{kitap} 最后是 {a} → {-my}，挂在词尾。'},
      {q:'choice', p:'“这是肉吗？”', o:['Bu etmi?','Bu etmy?','Bu mi et?','Mi bu et?'], tk:true, x:'{e} 是细元音 → {-mi}。'},
      {q:'sort', p:'挂 -my 还是 -mi？', bins:['-my','-mi'], items:[['suw',0],['üzüm',1],['çaý',0],['öý',1],['gawun',0],['şäher',1]], tk:true, x:'看最后一个元音：粗 → {-my}，细 → {-mi}。'},
      {q:'choice', p:'“你是学生吗？”', o:['Sen talypmy?','Sen talypmi?','Talyp senmi?','Sen my talyp?'], tk:true, x:'{talyp} 最后是 {y} → {-my}。'},
      {q:'dialog', who:'Aýna', line:'Bu çaýmy?', lineZh:'这是茶吗？', p:'是的，回答：', o:['Hawa, bu çaý.','Ýok.','Salam!','Sag bol!'], tk:true, x:'{Hawa} = 是。'},
      {q:'choice', p:'{Ýok} 在回答里的意思是？', o:['不','是','谢谢','你好'], x:'{Ýok} = 不、没有。'},
      {q:'choice', p:'“这是葡萄吗？”', o:['Bu üzümmi?','Bu üzümmy?','Bu mi üzüm?','Üzüm bumy?'], tk:true, x:'{ü} 是细元音 → {-mi}。'}
    ]}
  ]},

{ n:3, name:'词缀积木', analog:'≈ 偏旁部首', tkname:'Goşulmalar', pal:['#E0A030','#2B3A78','#F2E8D5'],
  levels:[
  { id:'3-1', title:'我的、你的', sub:'把“的”挂在词尾',
    words:[['adym','我的名字',''],['adyň','你的名字',''],['kitabym','我的书',''],['maşynym','我的车',''],['kaka','爸爸',''],['kakam','我的爸爸',''],['eje','妈妈',''],['ejäm','我的妈妈',''],['agaç','树','🌳'],['näme','什么','']],
    learn:[
      {t:'intro', h:'“我的”“你的”挂在词尾', b:'<p>“我的”= {-ym}/{-im}（元音结尾只挂 {-m}）<br>“你的”= {-yň}/{-iň}（元音结尾只挂 {-ň}）</p><p>{maşyn} → {maşynym} 我的车 · {maşynyň} 你的车<br>{kaka}（爸爸）→ {kakam} 我的爸爸 · {kakaň} 你的爸爸</p>'},
      {t:'table', h:'物主词尾一览', head:['','辅音结尾：maşyn（车）','元音结尾：kaka（爸爸）'], rows:[['我的','maşynym','kakam'],['你的','maşynyň','kakaň'],['他 / 她的','maşyny','kakasy'],['我们的','maşynymyz','kakamyz'],['您的 / 你们的','maşynyňyz','kakaňyz']]},
      {t:'intro', h:'辅音变身：p→b，t→d，k→g，ç→j', b:'<p>词尾的 {p} {t} {k} {ç} 碰上元音开头的词缀，常会变成浊音：</p><p>{kitap} → {kitabym}（我的书）<br>{at}（名字）→ {adym}（我的名字）<br>{çörek}（馕）→ {çöregim}（我的馕）<br>{agaç}（树）→ {agajym}（我的树）</p><p>短元音的单音节词通常不变：{it} → {itim}（我的狗）。</p>'},
      {t:'intro', h:'e 结尾要变 ä', b:'<p>{eje}（妈妈）→ {ejäm}（我的妈妈）。</p><p>晚安 {Gijäňiz rahat bolsun!} 里的 {gijäňiz}（您的夜晚），也是 {gije} + {ňiz}。</p>'}
    ],
    quiz:[
      {q:'build', p:'拼出“我的名字”', root:'at', blocks:['ym','im','yň','m'], a:['ym'], forms:['adym'], x:'{at}（名字，长音）+ {ym} → {adym}，t 变 d。'},
      {q:'build', p:'拼出“我的书”', root:'kitap', blocks:['ym','im','yň','iň'], a:['ym'], forms:['kitabym'], x:'最后一个元音 {a} → {-ym}；p 变 b：{kitabym}。'},
      {q:'choice', p:'“我的车”', o:['maşynym','maşynim','maşynm','maşyňym'], tk:true, x:'{maşyn} 辅音结尾、粗元音 → {-ym}。'},
      {q:'choice', p:'“你的名字”（对朋友说）', o:['adyň','adym','atyň','adyn'], tk:true, x:'“你的”= {-yň}，t 同样变 d：{adyň}。'},
      {q:'choice', p:'“我的爸爸”', o:['kakam','kakaym','kakym','kakamy'], tk:true, x:'{kaka} 元音结尾，只挂 {-m}。'},
      {q:'choice', p:'“我的妈妈”', o:['ejäm','ejeym','ejim','ejeme'], tk:true, x:'{eje} 词尾的 e 变 ä：{ejäm}。'},
      {q:'choice', p:'{çörek}（馕）+“我的”=？', o:['çöregim','çörekim','çöregym','çörekym'], tk:true, x:'k 变 g，细元音 → {çöregim}。'},
      {q:'choice', p:'“您叫什么名字？”（礼貌）', o:['Adyňyz näme?','Adym näme?','Adyň kim?','Näme adyňyzmy?'], tk:true, x:'{adyňyz} = 您的名字；{näme} = 什么。'}
    ]},
  { id:'3-2', title:'在哪儿：-da / -de', sub:'“在……”也挂在词尾',
    words:[['öýde','在家',''],['bazar','巴扎、市场','🛒'],['bazarda','在巴扎',''],['mekdep','学校','🏫'],['mekdepde','在学校',''],['Aşgabat','阿什哈巴德（首都）',''],['Hytaý','中国',''],['Pekin','北京',''],['dükan','商店','🏪']],
    learn:[
      {t:'intro', h:'“在……” = -da / -de', b:'<p>{öý} → {öýde} 在家<br>{bazar} → {bazarda} 在巴扎<br>{mekdep} → {mekdepde} 在学校<br>{Aşgabat} → {Aşgabatda} 在阿什哈巴德</p>'},
      {t:'intro', h:'-da / -de 不让辅音变身', b:'<p>{-da}/{-de} 以辅音开头，所以 {p} {t} {k} {ç} 保持原样：写 {mekdepde}，不写 mekdebde。</p><p>对比：{mekdebe}（去学校）就会变——第 3-4 关见。</p>'},
      {t:'pairs', h:'常用地点', items:[['Aşgabat','阿什哈巴德（首都）'],['Hytaý','中国'],['Pekin','北京'],['Türkmenistan','土库曼斯坦'],['bazar','巴扎、市场'],['mekdep','学校'],['dükan','商店']]}
    ],
    quiz:[
      {q:'choice', p:'“在家”', o:['öýde','öýda','öýden','öýe'], tk:true, x:'{ö} 是细元音 → {-de}。'},
      {q:'choice', p:'“在巴扎”', o:['bazarda','bazarde','bazara','bazardan'], tk:true, x:'{a} 是粗元音 → {-da}。'},
      {q:'choice', p:'“在学校”', o:['mekdepde','mekdebde','mekdepda','mekdebe'], tk:true, x:'{-de} 以辅音开头，p 不变：{mekdepde}。'},
      {q:'sort', p:'挂 -da 还是 -de？', bins:['-da','-de'], items:[['bazar',0],['öý',1],['Aşgabat',0],['şäher',1],['Hytaý',0],['mekdep',1]], tk:true, x:'{Hytaý} 的元音 y、a 都是粗元音 → {Hytaýda}。'},
      {q:'choice', p:'{Men Aşgabatda.} 的意思是？', o:['我在阿什哈巴德。','我从阿什哈巴德来。','我去阿什哈巴德。','我爱阿什哈巴德。'], x:'{-da} = 在。'},
      {q:'build', p:'拼出“在我的车里”', root:'maşyn', blocks:['ym','im','da','de'], a:['ym','da'], forms:['maşynym','maşynymda'], x:'{maşyn} + {ym}（我的）+ {da}（在）= {maşynymda}。'},
      {q:'choice', p:'“在中国”', o:['Hytaýda','Hytaýde','Hytaýdan','Hytaýa'], tk:true, x:'{Hytaý} 是粗元音词 → {Hytaýda}。'}
    ]},
  { id:'3-3', title:'从哪儿：-dan / -den', sub:'自我介绍的神器',
    words:[['Hytaýdan','从中国',''],['öýden','从家里',''],['Pekinden','从北京',''],['nireden','从哪里','']],
    learn:[
      {t:'intro', h:'“从……” = -dan / -den', b:'<p>{Hytaý} → {Hytaýdan} 从中国<br>{öý} → {öýden} 从家里<br>{Pekin} → {Pekinden} 从北京</p>'},
      {t:'intro', h:'自我介绍神器', b:'<p>{Men Hytaýdan.} = 我来自中国。（字面：我 从中国）</p><p>问别人：{Siz nireden?} 您从哪里来？（对朋友：{Sen nireden?}）</p>'},
      {t:'pairs', h:'三兄弟对照', items:[['Aşgabatda','在阿什哈巴德'],['Aşgabatdan','从阿什哈巴德'],['Aşgabada','去阿什哈巴德（下一关）']]}
    ],
    quiz:[
      {q:'choice', p:'“我来自中国。”', o:['Men Hytaýdan.','Men Hytaýda.','Men Hytaýa.','Men Hytaýden.'], tk:true, x:'{-dan} = 从；{Hytaý} 是粗元音词。'},
      {q:'choice', p:'{Siz nireden?} 的意思是？', o:['您从哪里来？','您在哪里？','您去哪里？','您是谁？'], x:'{nire}（哪里）+ {-den}（从）。'},
      {q:'sort', p:'挂 -dan 还是 -den？', bins:['-dan','-den'], items:[['Hytaý',0],['öý',1],['bazar',0],['Pekin',1],['oba',0],['mekdep',1]], tk:true, x:'粗 → {-dan}，细 → {-den}。'},
      {q:'choice', p:'“从家里”', o:['öýden','öýdan','öýde','öýe'], tk:true, x:'{ö} 是细元音 → {öýden}。'},
      {q:'choice', p:'“从北京”', o:['Pekinden','Pekindan','Pekinde','Pekine'], tk:true, x:'{Pekin} 最后是 {i} → {-den}。'},
      {q:'build', p:'拼出“从那些村庄”', root:'oba', blocks:['lar','ler','dan','den'], a:['lar','dan'], forms:['obalar','obalardan'], x:'{oba} + {lar} + {dan} = {obalardan}。'},
      {q:'dialog', who:'Aýna', line:'Siz nireden?', lineZh:'您从哪里来？', p:'回答你来自中国：', o:['Men Hytaýdan.','Men Hytaýda.','Meniň adym Hytaý.','Hawa, men.'], tk:true, x:'{Men Hytaýdan.} = 我来自中国。'}
    ]},
  { id:'3-4', title:'到哪儿：-a / -e', sub:'“去……”“给……”',
    words:[['bazara','去巴扎',''],['mekdebe','去学校',''],['Aşgabada','去阿什哈巴德',''],['öýe','回家',''],['maňa','给我',''],['saňa','给你',''],['Hoş geldiňiz!','欢迎！','']],
    learn:[
      {t:'intro', h:'“到……去、给……” = -a / -e', b:'<p>{bazar} → {bazara} 去巴扎<br>{öý} → {öýe} 回家<br>{şäher} → {şähere} 进城</p>'},
      {t:'intro', h:'元音开头 → 辅音会变身', b:'<p>{-a}/{-e} 以元音开头，{p} {t} {k} {ç} 就会变浊：</p><p>{mekdep} → {mekdebe}（去学校）<br>{Aşgabat} → {Aşgabada}（去阿什哈巴德）</p><p>入境时你会看到：{Türkmenistana hoş geldiňiz!}（欢迎来到土库曼斯坦！）</p>'},
      {t:'pairs', h:'代词的“给”是不规则的', items:[['maňa','给我、对我'],['saňa','给你'],['oňa','给他 / 她'],['bize','给我们'],['size','给您 / 你们']]}
    ],
    quiz:[
      {q:'choice', p:'“去巴扎”里的“巴扎”要写成？', o:['bazara','bazare','bazarda','bazardan'], tk:true, x:'{a} 粗 → {-a}：{bazara}。'},
      {q:'choice', p:'“去学校”', o:['mekdebe','mekdepe','mekdepa','mekdepde'], tk:true, x:'p 变 b：{mekdebe}。'},
      {q:'choice', p:'“欢迎来到土库曼斯坦！”', o:['Türkmenistana hoş geldiňiz!','Türkmenistanda hoş geldiňiz!','Türkmenistandan hoş geldiňiz!','Türkmenistan hoş geldiňiz!'], tk:true, x:'“来到”用 {-a}：{Türkmenistana}。'},
      {q:'choice', p:'{Aşgabat} +“到”=？', o:['Aşgabada','Aşgabata','Aşgabade','Aşgabatda'], tk:true, x:'t 变 d：{Aşgabada}。'},
      {q:'match', p:'配对：词缀 ↔ 意思', pairs:[['-da / -de','在'],['-dan / -den','从'],['-a / -e','到、给'],['-lar / -ler','复数'],['-ym / -im','我的']]},
      {q:'choice', p:'“给我”', o:['maňa','mene','mana','meňe'], tk:true, x:'{men} 的“给”形式不规则：{maňa}。'},
      {q:'choice', p:'“回家”里的“家”要写成？', o:['öýe','öýa','öýde','öýden'], tk:true, x:'{ö} 是细元音 → {öýe}。'}
    ]},
  { id:'3-5', title:'积木连连看', sub:'词根 + 复数 + 物主 + 格',
    words:[['kitaplarym','我的书（复数）',''],['kitaplarymda','在我的书里',''],['obalardan','从那些村庄',''],['öýlerde','在那些房子里',''],['şäherlerden','从那些城市','']],
    learn:[
      {t:'intro', h:'词缀有固定顺序', b:'<p>词根 + 复数 + 物主 + 格：</p><p>{kitap} → {kitaplar} → {kitaplarym} → {kitaplarymda}<br>书 → 书们 → 我的书们 → 在我的书里</p>'},
      {t:'chain', h:'拆开看看', parts:[['kitap','书'],['lar','复数'],['ym','我的'],['da','在']], result:'kitaplarymda', zh:'在我的书里'},
      {t:'intro', h:'和汉语刚好相反', b:'<p>汉语把“在”“我的”放在前面：在 我的 书 里。</p><p>土库曼语全都挂在后面，而且顺序固定：先“们”，再“我的”，最后“在 / 从 / 到”。</p>'}
    ],
    quiz:[
      {q:'build', p:'拼出“在我的书里（很多本）”', root:'kitap', blocks:['lar','ler','ym','im','da','de'], a:['lar','ym','da'], forms:['kitaplar','kitaplarym','kitaplarymda'], x:'复数 → 物主 → 格：{kitaplarymda}。'},
      {q:'build', p:'拼出“从那些城市”', root:'şäher', blocks:['lar','ler','dan','den'], a:['ler','den'], forms:['şäherler','şäherlerden'], x:'{şäher} 是细元音词：{şäherlerden}。'},
      {q:'build', p:'拼出“在那些房子里”', root:'öý', blocks:['lar','ler','da','de'], a:['ler','de'], forms:['öýler','öýlerde'], x:'{öý} + {ler} + {de} = {öýlerde}。'},
      {q:'choice', p:'{kitaplarymda} 应该怎么拆？', o:['kitap + lar + ym + da','kitap + ym + lar + da','kitap + da + lar + ym','kita + plar + ymda'], tk:true, x:'词根 + 复数 + 物主 + 格。'},
      {q:'choice', p:'{obalardan} 的意思是？', o:['从那些村庄','在那些村庄','去那些村庄','我的村庄'], x:'{oba}（村庄）+ {lar}（复数）+ {dan}（从）。'},
      {q:'choice', p:'下面哪个顺序正确？', o:['词根 → 复数 → 物主 → 格','词根 → 格 → 复数 → 物主','格 → 词根 → 复数','物主 → 复数 → 词根'], x:'先“们”，再“我的”，最后“在 / 从 / 到”。'},
      {q:'build', p:'拼出“从我的车里”', root:'maşyn', blocks:['ym','im','dan','den'], a:['ym','dan'], forms:['maşynym','maşynymdan'], x:'{maşyn} + {ym} + {dan} = {maşynymdan}。'}
    ]}
  ]},

{ n:4, name:'句型骨架', analog:'SOV 主宾谓', tkname:'Sözlemler', pal:['#2F7D57','#F2E8D5','#2B3A78'],
  levels:[
  { id:'4-1', title:'我是…… / 不是……', sub:'没有“是”这个词',
    words:[['men','我',''],['sen','你（熟人）',''],['ol','他、她、它',''],['biz','我们',''],['siz','您；你们',''],['olar','他们',''],['däl','不是',''],['lukman','医生','🩺'],['inžener','工程师','👷'],['syýahatçy','游客','🧳']],
    learn:[
      {t:'intro', h:'没有“是”这个词', b:'<p>{Men talyp.} 我（是）学生。<br>{Ol mugallym.} 他（是）老师。<br>{Bu çaý.} 这（是）茶。</p><p>直接把两个词放在一起就行。</p>'},
      {t:'pairs', h:'人称代词', items:[['men','我'],['sen','你（熟人、晚辈）'],['ol','他、她、它'],['biz','我们'],['siz','您；你们'],['olar','他们']]},
      {t:'intro', h:'否定：句尾加 däl', b:'<p>{Men talyp däl.} 我不是学生。<br>{Bu çaý däl.} 这不是茶。</p><p>书面语有时在后面加 {-dyr}/{-dir} 表示断定：{Aşgabat ulydyr!}（阿什哈巴德很大！）</p>'},
      {t:'pairs', h:'身份', items:[['talyp','大学生'],['mugallym','老师'],['lukman','医生'],['inžener','工程师'],['syýahatçy','游客']]}
    ],
    quiz:[
      {q:'choice', p:'“他是医生。”', o:['Ol lukman.','Men lukman.','Ol lukman däl.','Sen lukman.'], tk:true, x:'{ol} = 他；不需要“是”。'},
      {q:'choice', p:'{Men mugallym däl.} 的意思是？', o:['我不是老师。','我是老师。','他不是老师。','我没有老师。'], x:'{däl} = 不是，放在句尾。'},
      {q:'order', p:'排出：我不是学生。', w:['Men','talyp','däl'], end:'.'},
      {q:'choice', p:'对长辈或陌生人说“您”，用？', o:['siz','sen','ol','biz'], tk:true, x:'{siz} 表示尊敬，也表示“你们”。'},
      {q:'match', p:'配对：代词', pairs:[['men','我'],['sen','你'],['ol','他 / 她'],['biz','我们'],['olar','他们']]},
      {q:'order', p:'排出：这不是茶。', w:['Bu','çaý','däl'], end:'.'},
      {q:'choice', p:'“我是游客。”', o:['Men syýahatçy.','Men syýahatçy däl.','Sen syýahatçy.','Men syýahatçydan.'], tk:true, x:'{Men syýahatçy.}'}
    ]},
  { id:'4-2', title:'有 / 没有：bar / ýok', sub:'放在句尾',
    words:[['bar','有',''],['ýok','没有',''],['mende','我这儿',''],['wagt','时间','⏰'],['manat','马纳特（货币）','']],
    learn:[
      {t:'intro', h:'有 = bar，没有 = ýok', b:'<p>{Meniň kitabym bar.} 我有书。（字面：我的 书 有）<br>{Onuň maşyny ýok.} 他没有车。</p><p>另一种说法：{Mende çörek bar.} 我这儿有馕。</p>'},
      {t:'intro', h:'变成问句', b:'<p>{bar} + {-my} → {barmy?}</p><p>{Suw barmy?} 有水吗？<br>回答：{Hawa, bar.} 有。/ {Ýok.} 没有。</p>'},
      {t:'pairs', h:'马上能用', items:[['Meniň wagtym ýok.','我没时间。'],['Çaý barmy?','有茶吗？'],['Mende manat bar.','我有马纳特（钱）。']]}
    ],
    quiz:[
      {q:'choice', p:'“我有车。”', o:['Meniň maşynym bar.','Meniň maşynym ýok.','Men maşyn bar.','Meniň maşyn barmy.'], tk:true, x:'{Meniň maşynym bar.}：我的车 + 有。'},
      {q:'choice', p:'{Onuň maşyny ýok.} 的意思是？', o:['他没有车。','他有车。','我没有车。','他的车在哪？'], x:'{onuň} 他的，{ýok} 没有。'},
      {q:'choice', p:'“有水吗？”', o:['Suw barmy?','Suw ýokmy?','Suw bar.','Suwmy bar?'], tk:true, x:'{bar} + {-my}：{barmy?}'},
      {q:'order', p:'排出：我这儿有馕。', w:['Mende','çörek','bar'], end:'.'},
      {q:'choice', p:'“我没时间。”', o:['Meniň wagtym ýok.','Meniň wagtym bar.','Men wagt däl.','Wagtym barmy?'], tk:true, x:'{wagtym} 我的时间 + {ýok}。'},
      {q:'dialog', who:'Merdan', line:'Seniň maşynyň barmy?', lineZh:'你有车吗？', p:'你没有车，回答：', o:['Ýok, meniň maşynym ýok.','Hawa, bar.','Men maşyn.','Sag bol, bar.'], tk:true, x:'{Ýok} 既是“不”，也是“没有”。'},
      {q:'choice', p:'{ýok} 可以表示？', o:['“没有”，也可以回答“不”','只表示“不”','只表示“有”','“谢谢”'], x:'{ýok} 一词两用。'}
    ]},
  { id:'4-3', title:'问句', sub:'疑问词放在答案的位置',
    words:[['kim','谁',''],['nirede','在哪里',''],['näçe','多少',''],['haçan','什么时候',''],['nähili','怎么样',''],['hajathana','厕所','🚻']],
    learn:[
      {t:'pairs', h:'疑问词', items:[['näme','什么'],['kim','谁'],['nirede','在哪里'],['nireden','从哪里'],['näçe','多少'],['haçan','什么时候'],['nähili','怎么样']]},
      {t:'intro', h:'答案在哪，疑问词就在哪', b:'<p>语序不用变，把答案换成疑问词：</p><p>{Bu çaý.} → {Bu näme?} 这是什么？<br>{Ol Merdan.} → {Ol kim?} 他是谁？</p><p>有疑问词的句子，不再挂 {-my}/{-mi}。</p>'},
      {t:'pairs', h:'高频问句', items:[['Bu näme?','这是什么？'],['Ol kim?','他是谁？'],['Bazar nirede?','巴扎在哪儿？'],['Bu näçe?','这个多少钱？'],['Ýagdaýlaryňyz nähili?','您好吗？（您的情况怎么样？）']]}
    ],
    quiz:[
      {q:'match', p:'配对：疑问词', pairs:[['näme','什么'],['kim','谁'],['nirede','在哪里'],['näçe','多少'],['haçan','什么时候']]},
      {q:'choice', p:'“这是什么？”', o:['Bu näme?','Bu nämemi?','Näme bumy?','Bu kim?'], tk:true, x:'有疑问词就不加 {-mi}。'},
      {q:'choice', p:'“巴扎在哪儿？”', o:['Bazar nirede?','Bazar nireden?','Bazarda nirede?','Nirede bazarmy?'], tk:true, x:'{nirede} = 在哪里。'},
      {q:'dialog', who:'Aýna', line:'Siz nireden?', lineZh:'您从哪里来？', p:'最合适的回答：', o:['Men Hytaýdan.','Men talyp.','Hawa.','Bu çaý.'], tk:true, x:'问“从哪里”，答“从中国”。'},
      {q:'choice', p:'带疑问词的问句，还要挂 -my / -mi 吗？', o:['不用','要','只在句首挂','只对长辈挂'], x:'疑问词本身已经表示提问。'},
      {q:'order', p:'排出：厕所在哪儿？', w:['Hajathana','nirede'], end:'?'},
      {q:'choice', p:'{Ol kim?} 的意思是？', o:['他是谁？','他在哪？','他怎么样？','他从哪来？'], x:'{kim} = 谁。'}
    ]},
  { id:'4-4', title:'主宾谓：动词压轴', sub:'我 茶 喝',
    words:[['içýärin','我喝',''],['okaýaryn','我读',''],['ýaşaýaryn','我住',''],['iýýär','他吃',''],['türkmençe','用土库曼语',''],['uly','大','']],
    learn:[
      {t:'intro', h:'动词永远在句尾', b:'<p>汉语：我 喝 茶（主谓宾）<br>土库曼语：{Men çaý içýärin.} 我 茶 喝（主宾谓）</p><p>口诀：<b>动词压轴</b>。</p>'},
      {t:'intro', h:'地点放中间，形容词放前面', b:'<p>{Men Aşgabatda ýaşaýaryn.} 我 在阿什哈巴德 住。</p><p>形容词放在名词前：{gyzyl alma} 红苹果、{uly şäher} 大城市。</p>'},
      {t:'pairs', h:'例句（动词变位第 5 层细讲）', items:[['Men çaý içýärin.','我喝茶。'],['Men kitap okaýaryn.','我读书。'],['Ol palaw iýýär.','他吃抓饭。'],['Biz türkmençe gürleýäris.','我们说土库曼语。']]}
    ],
    quiz:[
      {q:'order', p:'排出：我喝茶。', w:['Men','çaý','içýärin'], end:'.'},
      {q:'order', p:'排出：我读书。', w:['Men','kitap','okaýaryn'], end:'.'},
      {q:'order', p:'排出：我住在阿什哈巴德。', w:['Men','Aşgabatda','ýaşaýaryn'], end:'.'},
      {q:'choice', p:'{gyzyl alma} 的意思是？', o:['红苹果','苹果是红的','红色和苹果','很多苹果'], x:'形容词放在名词前面。'},
      {q:'order', p:'排出：他吃抓饭。', w:['Ol','palaw','iýýär'], end:'.'},
      {q:'choice', p:'土库曼语句子里，动词通常放在？', o:['句尾','句首','主语后面','哪里都行'], x:'主语—宾语—动词。'},
      {q:'order', p:'排出：我们说土库曼语。', w:['Biz','türkmençe','gürleýäris'], end:'.'}
    ]}
  ]},

{ n:5, name:'动词时态', analog:'现在 / 过去', tkname:'Işlikler', pal:['#2B3A78','#E0A030','#F2E8D5'],
  levels:[
  { id:'5-1', title:'动词原形 -mak / -mek', sub:'词典里的样子',
    words:[['okamak','读、学习',''],['ýazmak','写','✍️'],['içmek','喝',''],['iýmek','吃',''],['gelmek','来',''],['gitmek','去',''],['bilmek','知道、会',''],['görmek','看见',''],['gürlemek','说话',''],['ýaşamak','生活、住',''],['işlemek','工作',''],['öwrenmek','学习、学会',''],['halamak','喜欢',''],['düşünmek','明白','']],
    learn:[
      {t:'intro', h:'动词都带 -mak / -mek', b:'<p>{-mak}（粗）/ {-mek}（细）相当于动词的“原形标签”。去掉它，就是可以挂词缀的词干：</p><p>{okamak} → {oka-} 读<br>{gelmek} → {gel-} 来</p>'},
      {t:'pairs', h:'14 个高频动词', items:[['okamak','读、学习'],['ýazmak','写'],['içmek','喝'],['iýmek','吃'],['gelmek','来'],['gitmek','去'],['bilmek','知道、会'],['görmek','看见'],['gürlemek','说话'],['ýaşamak','生活、住'],['işlemek','工作'],['öwrenmek','学习、学会'],['halamak','喜欢'],['düşünmek','明白']]}
    ],
    quiz:[
      {q:'sort', p:'这个词干挂 -mak 还是 -mek？', bins:['-mak','-mek'], items:[['oka',0],['gel',1],['ýaz',0],['iç',1],['ýaşa',0],['gör',1]], tk:true, x:'还是看最后一个元音。'},
      {q:'match', p:'配对：动词', pairs:[['içmek','喝'],['iýmek','吃'],['gelmek','来'],['gitmek','去'],['ýazmak','写']]},
      {q:'choice', p:'“写”的原形？', o:['ýazmak','ýazmek','ýazma','ýazýar'], tk:true, x:'{ýaz-} 是粗元音 → {ýazmak}。'},
      {q:'choice', p:'{gitmek} 的词干是？', o:['git-','gitm-','gi-','gitme-'], tk:true, x:'去掉 {-mek}，剩下 {git-}。'},
      {q:'match', p:'配对：动词', pairs:[['okamak','读、学习'],['bilmek','知道、会'],['görmek','看见'],['işlemek','工作'],['öwrenmek','学会']]},
      {q:'choice', p:'“明白、理解”', o:['düşünmek','düşünmak','düşmek','diňlemek'], tk:true, x:'{düşünmek}；{diňlemek} 是“听”。'},
      {q:'choice', p:'“喜欢”的原形是？', o:['halamak','halamek','hala','halamyş'], tk:true, x:'{hala-} + {mak}。'}
    ]},
  { id:'5-2', title:'现在时', sub:'词干 + ýar / ýär + 人称',
    words:[['gelýärin','我来',''],['gidýärin','我去',''],['iýýärin','我吃',''],['iňlisçe','用英语',''],['türkmen dili','土库曼语','']],
    learn:[
      {t:'intro', h:'现在时 = 词干 + ýar / ýär + 人称', b:'<p>粗元音动词挂 {-ýar}，细元音动词挂 {-ýär}，再加上表示“谁”的人称词尾。</p>'},
      {t:'table', h:'现在时变位', head:['','okamak 读','gelmek 来'], rows:[['men 我','okaýaryn','gelýärin'],['sen 你','okaýarsyň','gelýärsiň'],['ol 他 / 她','okaýar','gelýär'],['biz 我们','okaýarys','gelýäris'],['siz 您 / 你们','okaýarsyňyz','gelýärsiňiz'],['olar 他们','okaýarlar','gelýärler']]},
      {t:'intro', h:'三个小心', b:'<p>① {gitmek}（去）的 t 在 ý 前变 d：{gidýärin} 我去。</p><p>② {iýmek}（吃）变成 {iýýärin}，两个 ý 都要写。</p><p>③ 问句把 {-my}/{-mi} 挂在最后：{gelýärsiňmi?} 你来吗？</p>'}
    ],
    quiz:[
      {q:'choice', p:'“我读”', o:['okaýaryn','okaýarin','okaýarys','okaýar'], tk:true, x:'粗元音：{oka} + {ýar} + {yn}。'},
      {q:'choice', p:'“你来”（对朋友说）', o:['gelýärsiň','gelýärin','gelýäris','gelýärler'], tk:true, x:'sen → {-siň}。'},
      {q:'choice', p:'“我们喝”', o:['içýäris','içýärin','içýärler','içýärsiň'], tk:true, x:'biz → {-is}。'},
      {q:'build', p:'拼出“我来”', root:'gel', blocks:['ýar','ýär','yn','in','siň'], a:['ýär','in'], forms:['gelýär','gelýärin'], x:'{gel} + {ýär} + {in} = {gelýärin}。'},
      {q:'choice', p:'“他们工作”', o:['işleýärler','işleýärlar','işleýär','işleýäris'], tk:true, x:'olar → {-ler}（细）。'},
      {q:'choice', p:'“我去学校。”', o:['Men mekdebe gidýärin.','Men mekdepde gidýärin.','Men mekdebe gitýärin.','Men mekdepden gidýärin.'], tk:true, x:'“到学校”用 {mekdebe}；{gitmek} 的 t 变 d：{gidýärin}。'},
      {q:'choice', p:'“您说英语吗？”', o:['Siz iňlisçe gürleýärsiňizmi?','Siz iňlisçe gürleýärmi?','Sen iňlisçe gürleýärinmi?','Siz iňlisçe gürleýäris?'], tk:true, x:'siz → {-siňiz}，再挂 {-mi}。'},
      {q:'order', p:'排出：我在学土库曼语。', w:['Men','türkmen','dilini','öwrenýärin'], end:'.'}
    ]},
  { id:'5-3', title:'过去时', sub:'词干 + dy / di + 人称',
    words:[['geldim','我来了',''],['okadym','我读了',''],['düşündim','我明白了',''],['ýadadym','我累了',''],['gördüm','我看见了','']],
    learn:[
      {t:'intro', h:'过去时 = 词干 + dy / di + 人称', b:'<p>{okadym} 我读了 · {geldim} 我来了</p>'},
      {t:'table', h:'过去时变位', head:['','okamak 读','gelmek 来'], rows:[['men 我','okadym','geldim'],['sen 你','okadyň','geldiň'],['ol 他 / 她','okady','geldi'],['biz 我们','okadyk','geldik'],['siz 您 / 你们','okadyňyz','geldiňiz'],['olar 他们','okadylar','geldiler']]},
      {t:'pairs', h:'马上能用', items:[['Men Hytaýdan geldim.','我是从中国来的。'],['Düşündim.','我明白了。'],['Men ýadadym.','我累了。'],['Gördüm.','我看见了。（ö 让词尾变圆：-düm）']]}
    ],
    quiz:[
      {q:'choice', p:'“我来了”', o:['geldim','geldym','geldik','geldiň'], tk:true, x:'{gel} + {di} + {m}。'},
      {q:'choice', p:'“我们读了”', o:['okadyk','okadym','okadyňyz','okadylar'], tk:true, x:'biz → {-k}：{okadyk}。'},
      {q:'choice', p:'{Men ýadadym.} 的意思是？', o:['我累了。','我读了。','我走了。','我明白了。'], x:'{ýadamak} 累 → {ýadadym}。'},
      {q:'build', p:'拼出“我读了”', root:'oka', blocks:['dy','di','m','k'], a:['dy','m'], forms:['okady','okadym'], x:'{oka} + {dy} + {m} = {okadym}。'},
      {q:'choice', p:'“你来了”（对朋友说）', o:['geldiň','geldim','geldi','geldiňiz'], tk:true, x:'sen → {-ň}。'},
      {q:'order', p:'排出：我是从中国来的。', w:['Men','Hytaýdan','geldim'], end:'.'},
      {q:'choice', p:'“我明白了。”', o:['Düşündim.','Düşünýärin.','Düşünmedim.','Düşündik.'], tk:true, x:'{Düşünýärin} 是“我明白”（现在），“明白了”用过去时 {Düşündim}。'}
    ]},
  { id:'5-4', title:'否定与礼貌请求', sub:'-ma / -me 与 -yň / -iň',
    words:[['gelmeýärin','我不来',''],['düşünemok','我不懂（口语）',''],['bilemok','我不知道（口语）',''],['Gaýtalaň!','请再说一遍',''],['Haýal aýdyň!','请说慢点',''],['Oturyň!','请坐','']],
    learn:[
      {t:'intro', h:'否定：词干后插 -ma / -me', b:'<p>{okamaýaryn} 我不读 · {gelmeýärin} 我不来<br>{okamadym} 我没读 · {gelmedim} 我没来</p>'},
      {t:'intro', h:'两句救命口语', b:'<p>{Düşünemok.} 我不懂。{Bilemok.} 我不知道。</p><p>这是口语里的简短否定，书面语分别是 {düşünmeýärin}、{bilmeýärin}。</p>'},
      {t:'intro', h:'礼貌请求：词干 + -yň / -iň', b:'<p>对“您”或多人说：{Gaýtalaň!} 请再说一遍 · {Haýal aýdyň!} 请说慢点 · {Oturyň!} 请坐 · {Geliň!} 请来</p><p>对朋友直接用词干：{Otur!} 坐！{Gel!} 来！</p>'}
    ],
    quiz:[
      {q:'choice', p:'“我不喝”', o:['içmeýärin','içýärin däl','içmedim','içmeýäris'], tk:true, x:'{iç} + {me} + {ýär} + {in}。'},
      {q:'choice', p:'“我没看见”', o:['görmedim','görmeýärin','gördüm','görmedik'], tk:true, x:'过去否定：{gör} + {me} + {dim}。'},
      {q:'choice', p:'礼貌地说“请再说一遍”', o:['Gaýtalaň!','Gaýtalaýaryn.','Gaýtaladym.','Gaýtalamaýaryn.'], tk:true, x:'{gaýtala-} + {ň}。'},
      {q:'choice', p:'“请说慢一点”', o:['Haýal aýdyň!','Tiz aýdyň!','Haýal aýtdym.','Haýal däl.'], tk:true, x:'{haýal} 慢，{tiz} 快。'},
      {q:'choice', p:'{Düşünemok.} 的意思是？', o:['我不懂。','我懂了。','我不知道。','我累了。'], x:'“我不知道”是 {Bilemok}。'},
      {q:'build', p:'拼出“我不来”', root:'gel', blocks:['me','ma','ýär','ýar','in'], a:['me','ýär','in'], forms:['gelme','gelmeýär','gelmeýärin'], x:'词干 + 否定 + 时态 + 人称。'},
      {q:'choice', p:'请客人坐下（礼貌）', o:['Oturyň!','Otur!','Oturýaryn.','Oturdym.'], tk:true, x:'对朋友说 {Otur!}，对客人说 {Oturyň!}。'}
    ]}
  ]},

{ n:6, name:'场景会话', analog:'日常与旅行', tkname:'Gündelik gürrüň', pal:['#F2E8D5','#2F7D57','#E0A030'],
  levels:[
  { id:'6-1', title:'打招呼', sub:'Salam! 和一天里的问候',
    words:[['Salam!','你好！','👋'],['Ýagdaýlaryňyz nähili?','您好吗？',''],['gowy','好',''],['Sag boluň!','谢谢！/ 再见！',''],['Köp sag boluň!','非常感谢！',''],['Ertiriňiz haýyrly bolsun!','早上好！',''],['Agşamyňyz haýyrly bolsun!','晚上好！',''],['Gijäňiz rahat bolsun!','晚安！',''],['Bagyşlaň!','劳驾 / 对不起',''],['Ertir duşuşarys!','明天见！','']],
    learn:[
      {t:'pairs', h:'见面', items:[['Salam!','你好！（万能）'],['Ýagdaýlaryňyz nähili?','您好吗？（礼貌）'],['Nähili?','怎么样？（随意）'],['Gowy, sag boluň. Siz nähili?','很好，谢谢。您呢？']]},
      {t:'pairs', h:'一天里的问候', items:[['Ertiriňiz haýyrly bolsun!','早上好！'],['Agşamyňyz haýyrly bolsun!','晚上好！'],['Gijäňiz rahat bolsun!','晚安！']]},
      {t:'pairs', h:'感谢与告别', items:[['Sag boluň!','谢谢！也可以当“再见”'],['Köp sag boluň!','非常感谢！'],['Ertir duşuşarys!','明天见！'],['Bagyşlaň!','劳驾 / 对不起'],['Hoş geldiňiz!','欢迎！']]},
      {t:'intro', h:'一个词，两个意思', b:'<p>{sag} 本义是“健康”（也指“右边”）。{Sag boluň} 字面是“祝您健康”，所以既能道谢，也能道别。</p><p>对朋友说 {Sag bol!}。</p>'}
    ],
    quiz:[
      {q:'dialog', who:'Aýna', line:'Salam! Ýagdaýlaryňyz nähili?', lineZh:'你好！您好吗？', p:'回答：', o:['Gowy, sag boluň. Siz nähili?','Hoş geldiňiz!','Gijäňiz rahat bolsun!','Bagyşlaň!'], tk:true, x:'很好，谢谢。您呢？'},
      {q:'choice', p:'早上遇到邻居，说：', o:['Ertiriňiz haýyrly bolsun!','Gijäňiz rahat bolsun!','Agşamyňyz haýyrly bolsun!','Hoş geldiňiz!'], tk:true, x:'{ertir} = 早上。'},
      {q:'choice', p:'{Sag boluň!} 可以表示？', o:['谢谢，也可以是再见','只能表示谢谢','你好','对不起'], x:'字面是“祝您健康”。'},
      {q:'match', p:'配对：常用语', pairs:[['Salam!','你好！'],['Hawa.','是。'],['Ýok.','不。'],['Bagyşlaň!','劳驾 / 对不起'],['Hoş geldiňiz!','欢迎！']]},
      {q:'choice', p:'睡前说“晚安”', o:['Gijäňiz rahat bolsun!','Ertiriňiz haýyrly bolsun!','Sag boluň!','Salam!'], tk:true, x:'{gije} = 夜晚。'},
      {q:'dialog', who:'Merdan', line:'Hoş geldiňiz!', lineZh:'欢迎！', p:'你到朋友家做客，回应：', o:['Sag boluň!','Hoş geldiňiz!','Bagyşlaň!','Ýok.'], tk:true, x:'道一声谢最自然。'},
      {q:'choice', p:'向长辈郑重道谢', o:['Köp sag boluň!','Sag bol!','Salam!','Ýok!'], tk:true, x:'{köp} = 很多；对长辈用礼貌形 {boluň}。'}
    ]},
  { id:'6-2', title:'自我介绍', sub:'Meniň adym…',
    words:[['Adyňyz näme?','您叫什么名字？',''],['Meniň adym …','我叫……',''],['Siz nireden?','您从哪里来？',''],['Tanyşanyma şat!','很高兴认识您！','🤝'],['Men hem şat!','我也很高兴！',''],['öwrenmek','学习','']],
    learn:[
      {t:'name'},
      {t:'dialog', h:'初次见面', lines:[['Aýna','Salam! Meniň adym Aýna. Adyňyz näme?','你好！我叫阿依娜。您叫什么名字？'],['ME','Salam! Meniň adym {NAME}.','你好！我叫{NAME}。'],['Aýna','Siz nireden?','您从哪里来？'],['ME','Men Hytaýdan. Men syýahatçy.','我来自中国。我是游客。'],['Aýna','Tanyşanyma şat!','很高兴认识您！'],['ME','Men hem şat!','我也很高兴！']]},
      {t:'pairs', h:'再多说一句', items:[['Men türkmen dilini öwrenýärin.','我在学土库曼语。'],['Men Pekinde ýaşaýaryn.','我住在北京。'],['Men talyp.','我是大学生。']]}
    ],
    quiz:[
      {q:'dialog', who:'Aýna', line:'Adyňyz näme?', lineZh:'您叫什么名字？', p:'回答：', o:['Meniň adym {NAME}.','Men Hytaýdan.','Hawa, men.','Gowy, sag boluň.'], tk:true, x:'{Meniň adym …} = 我的名字是……'},
      {q:'dialog', who:'Aýna', line:'Siz nireden?', lineZh:'您从哪里来？', p:'回答：', o:['Men Hytaýdan.','Men Hytaýda.','Meniň adym Hytaý.','Men Hytaýa.'], tk:true, x:'“从”用 {-dan}。'},
      {q:'choice', p:'“很高兴认识您！”', o:['Tanyşanyma şat!','Hoş geldiňiz!','Sag boluň!','Gijäňiz rahat bolsun!'], tk:true, x:'{şat} = 高兴。'},
      {q:'order', p:'排出：我叫{NAME}。', w:['Meniň','adym','{NAME}'], end:'.'},
      {q:'choice', p:'“我是游客。”', o:['Men syýahatçy.','Men syýahatçy däl.','Sen syýahatçy.','Men syýahatçydan.'], tk:true, x:'身份句不需要“是”。'},
      {q:'order', p:'排出：我在学土库曼语。', w:['Men','türkmen','dilini','öwrenýärin'], end:'.'},
      {q:'dialog', who:'Aýna', line:'Tanyşanyma şat!', lineZh:'很高兴认识您！', p:'回应：', o:['Men hem şat!','Men hem ýok!','Hoş geldiňiz!','Bagyşlaň!'], tk:true, x:'{hem} = 也。'}
    ]},
  { id:'6-3', title:'数字与钱', sub:'像汉语一样拼数字',
    words:[['bir','一',''],['dört','四',''],['bäş','五',''],['ýigrimi','二十',''],['otuz','三十',''],['kyrk','四十',''],['elli','五十',''],['altmyş','六十',''],['ýetmiş','七十',''],['segsen','八十',''],['togsan','九十',''],['ýüz','一百',''],['müň','一千',''],['manat','马纳特','💵']],
    learn:[
      {t:'pairs', h:'1 – 10', items:[['bir','1'],['iki','2'],['üç','3'],['dört','4'],['bäş','5'],['alty','6'],['ýedi','7'],['sekiz','8'],['dokuz','9'],['on','10']]},
      {t:'pairs', h:'整十、百、千', items:[['ýigrimi','20'],['otuz','30'],['kyrk','40'],['elli','50'],['altmyş','60'],['ýetmiş','70'],['segsen','80'],['togsan','90'],['ýüz','100'],['müň','1000']]},
      {t:'intro', h:'像汉语一样拼', b:'<p>十一 = {on bir}（十 一）<br>二十五 = {ýigrimi bäş}<br>一百五十 = {ýüz elli}<br>两百 = {iki ýüz} · 三千 = {üç müň}</p><p>钱的单位是 {manat}（马纳特）。</p>'}
    ],
    quiz:[
      {q:'match', p:'配对：数字', pairs:[['bir','1'],['üç','3'],['bäş','5'],['ýedi','7'],['dokuz','9']]},
      {q:'choice', p:'{on bäş} = ?', o:['15','50','5','105'], x:'{on}（10）+ {bäş}（5）。'},
      {q:'choice', p:'“二十”', o:['ýigrimi','otuz','kyrk','elli'], tk:true, x:'{ýigrimi} = 20。'},
      {q:'choice', p:'{ýüz elli} = ?', o:['150','105','1500','50'], x:'{ýüz}（100）+ {elli}（50）。'},
      {q:'match', p:'配对：整十', pairs:[['otuz','30'],['kyrk','40'],['elli','50'],['segsen','80'],['togsan','90']]},
      {q:'spell', hint:'7 七', a:'ýedi', extra:'y'},
      {q:'choice', p:'“一千”', o:['müň','ýüz','on','million'], tk:true, x:'{müň} = 1000。'},
      {q:'choice', p:'{iki ýüz} = ?', o:['200','102','12','2000'], x:'{iki}（2）× {ýüz}（100）。'}
    ]},
  { id:'6-4', title:'巴扎购物', sub:'Bu näçe? Gymmat!',
    words:[['Bu näçe?','这个多少钱？',''],['Näçeden?','多少钱一个（一公斤）？',''],['gymmat','贵',''],['arzan','便宜',''],['Bolýar.','好的、行。',''],['beriň','请给',''],['satyjy','卖家','']],
    learn:[
      {t:'dialog', h:'在巴扎买甜瓜', lines:[['Satyjy','Salam! Size näme gerek?','你好！您要什么？'],['ME','Salam! Bu gawun näçe?','你好！这个甜瓜多少钱？'],['Satyjy','On manat.','十马纳特。'],['ME','Gymmat!','太贵了！'],['Satyjy','Bolýar, sekiz manat.','好吧，八马纳特。'],['ME','Bolýar. Iki gawun beriň.','好的。请给我两个甜瓜。'],['Satyjy','Alyň!','拿好！'],['ME','Sag boluň!','谢谢！']]},
      {t:'pairs', h:'巴扎词汇', items:[['Bu näçe?','这个多少钱？'],['Näçeden?','多少钱一个（一公斤）？'],['gymmat','贵'],['arzan','便宜'],['Bolýar.','好的、行。'],['… beriň.','请给我……'],['satyjy','卖家']]},
      {t:'intro', h:'讲价很正常', b:'<p>在土库曼斯坦的巴扎，讲价是交易的一部分。笑着说一句 {Gymmat!}，就是开始。</p><p>买几个就说几个，数字后面的名词不加复数：{iki gawun}。</p>'}
    ],
    quiz:[
      {q:'dialog', who:'Satyjy', line:'Salam! Size näme gerek?', lineZh:'你好！您要什么？', p:'你想问这个多少钱：', o:['Bu näçe?','Bu näme?','Bu kim?','Bu nirede?'], tk:true, x:'{näçe} = 多少。'},
      {q:'choice', p:'“太贵了！”', o:['Gymmat!','Arzan!','Tagamly!','Bolýar!'], tk:true, x:'{gymmat} 贵，{arzan} 便宜。'},
      {q:'choice', p:'{arzan} 的意思是？', o:['便宜','贵','好吃','好的'], x:'{arzan} = 便宜。'},
      {q:'dialog', who:'Satyjy', line:'On manat.', lineZh:'十马纳特。', p:'你觉得贵：', o:['Gymmat!','Arzan!','Sag boluň!','Hoş geldiňiz!'], tk:true, x:'开始讲价。'},
      {q:'choice', p:'“请给我两个甜瓜。”', o:['Iki gawun beriň.','Iki gawunlar beriň.','Iki gawun alyň.','Iki gawun berdim.'], tk:true, x:'有数字不加复数；{beriň} = 请给。'},
      {q:'order', p:'排出：这个甜瓜多少钱？', w:['Bu','gawun','näçe'], end:'?'},
      {q:'dialog', who:'Satyjy', line:'Bolýar, sekiz manat.', lineZh:'好吧，八马纳特。', p:'你同意了：', o:['Bolýar. Sag boluň!','Gymmat!','Ýok, on manat!','Bagyşlaň!'], tk:true, x:'{Bolýar} = 好的。'}
    ]},
  { id:'6-5', title:'餐桌', sub:'Işdäňiz açyk bolsun!',
    words:[['Işdäňiz açyk bolsun!','祝您好胃口！',''],['Tagamly!','好吃！','😋'],['süýt','奶','🥛'],['gök çaý','绿茶',''],['gara çaý','红茶',''],['dograma','碎馕羊肉汤（节日菜）',''],['çal','发酵驼奶',''],['saçak','餐布','']],
    learn:[
      {t:'pairs', h:'餐桌词汇', items:[['palaw','抓饭'],['çörek','馕、面包'],['et','肉'],['süýt','奶'],['suw','水'],['gök çaý','绿茶（字面：青茶）'],['gara çaý','红茶（字面：黑茶）'],['gawun','甜瓜'],['dograma','碎馕羊肉汤（节日菜）'],['çal','发酵驼奶']]},
      {t:'pairs', h:'饭桌上的话', items:[['Işdäňiz açyk bolsun!','祝您好胃口！（开饭时说）'],['Tagamly!','好吃！'],['Maňa gök çaý beriň.','请给我绿茶。'],['Men et iýmeýärin.','我不吃肉。']]},
      {t:'intro', h:'餐桌礼仪', b:'<p>土库曼人常围坐在铺开的餐布 {saçak} 旁用餐。{çörek}（馕）被视为神圣的食物，不要随意丢弃。</p><p>在中亚，主人常只给你倒半杯茶，意思是“我想多为你添几次”。</p>'}
    ],
    quiz:[
      {q:'dialog', who:'Aýna', line:'Işdäňiz açyk bolsun!', lineZh:'祝您好胃口！', p:'回应：', o:['Sag boluň!','Gymmat!','Bagyşlaň!','Ertir duşuşarys!'], tk:true, x:'道谢即可。'},
      {q:'choice', p:'“好吃！”', o:['Tagamly!','Gymmat!','Arzan!','Gowy däl!'], tk:true, x:'{tagamly} = 美味的。'},
      {q:'choice', p:'“请给我绿茶。”', o:['Maňa gök çaý beriň.','Maňa gara çaý beriň.','Men gök çaý.','Maňa gök çaý berdim.'], tk:true, x:'{maňa} 给我 + {gök çaý} 绿茶 + {beriň} 请给。'},
      {q:'match', p:'配对：食物', pairs:[['palaw','抓饭'],['çörek','馕'],['süýt','奶'],['et','肉'],['gawun','甜瓜']]},
      {q:'choice', p:'“我不吃肉。”', o:['Men et iýmeýärin.','Men et iýýärin.','Men et däl.','Men et ýok.'], tk:true, x:'动词否定：{iý} + {me} + {ýär} + {in}。'},
      {q:'order', p:'排出：请给我绿茶。', w:['Maňa','gök','çaý','beriň'], end:'.'},
      {q:'choice', p:'{gara çaý} 是？', o:['红茶（字面：黑茶）','绿茶','奶茶','咖啡'], x:'{gara} = 黑。'}
    ]},
  { id:'6-6', title:'问路与救急', sub:'Bazar nirede?',
    words:[['sag','右；健康',''],['çep','左',''],['göni','直走',''],['sagda','在右边',''],['çepde','在左边',''],['myhmanhana','宾馆','🏨'],['howa menzili','机场','✈️'],['muzeý','博物馆','🏛️'],['Men düşünemok.','我听不懂。',''],['Kömek ediň!','救命！/ 请帮忙！','🆘']],
    learn:[
      {t:'pairs', h:'方向', items:[['sag / sagda','右 / 在右边'],['çep / çepde','左 / 在左边'],['göni','直走'],['Bagyşlaň, bazar nirede?','劳驾，巴扎在哪儿？']]},
      {t:'pairs', h:'地点', items:[['myhmanhana','宾馆'],['howa menzili','机场'],['hajathana','厕所'],['dükan','商店'],['muzeý','博物馆'],['bazar','巴扎']]},
      {t:'pairs', h:'救急句', items:[['Men düşünemok.','我听不懂。'],['Gaýtalaň!','请再说一遍。'],['Haýal aýdyň!','请说慢点。'],['Siz iňlisçe gürleýärsiňizmi?','您说英语吗？'],['Kömek ediň!','救命！/ 请帮忙！']]}
    ],
    quiz:[
      {q:'choice', p:'你想找厕所，问路人：', o:['Bagyşlaň, hajathana nirede?','Hajathana näçe?','Hajathana kim?','Men hajathana.'], tk:true, x:'{Bagyşlaň} 劳驾 + {nirede} 在哪。'},
      {q:'choice', p:'{Sagda.} 的意思是？', o:['在右边','在左边','直走','谢谢'], x:'{sag} + {da}（在）。'},
      {q:'choice', p:'“在左边”', o:['Çepde.','Sagda.','Göni.','Çepden.'], tk:true, x:'{çep} 左 + {de} 在。'},
      {q:'dialog', who:'Adam', line:'Muzeý sagda.', lineZh:'（路人说得很快）博物馆在右边。', p:'你没听清，请他说慢点：', o:['Haýal aýdyň!','Tiz aýdyň!','Sag boluň!','Salam!'], tk:true, x:'{haýal} = 慢。'},
      {q:'choice', p:'紧急情况下求助：', o:['Kömek ediň!','Bagyşlaň!','Hoş geldiňiz!','Tagamly!'], tk:true, x:'{kömek} = 帮助。'},
      {q:'choice', p:'{howa menzili} 是？', o:['机场','火车站','宾馆','商店'], x:'字面意思是“空中驿站”。'},
      {q:'choice', p:'对方说得太快，你没听懂，说：', o:['Men düşünemok.','Men ýadadym.','Men Hytaýdan.','Men talyp.'], tk:true, x:'{Men düşünemok.} 我听不懂。'},
      {q:'order', p:'排出：劳驾，巴扎在哪儿？', w:['Bagyşlaň,','bazar','nirede'], end:'?'}
    ]}
  ]}
];

const PROVERB = {tk:'Okan ozar, okamadyk tozar.', zh:'学习的人向前走，不学的人落在后头。（土库曼谚语）'};
