/* ============================================================
   艾瑟兰编年史 · 事件数据
   ============================================================ */

/* ---------- 通用随机事件 ---------- */
const EVENTS = [
  // 童年 & 少年
  {title:'第一次看见魔法', minAge:6, maxAge:20, text:['你在森林边缘看见一团漂浮的光。它像是有生命一样，慢慢地靠近你。'], choices:[
    {label:'伸手去碰', check:{attr:'mag',dc:10}, success:{mag:2}, successText:'光融进了你的身体，你感到一阵温暖。', fail:{hp:-5}, failText:'一阵刺痛，你被弹开了。'},
    {label:'转身就跑', effect:{int:1}}
  ]},
  {title:'镇上的孩子王', minAge:8, maxAge:18, text:['几个孩子围住你，其中一个推了你一把。'], choices:[
    {label:'打回去', check:{attr:'phy',dc:11}, success:{phy:1,rep:1}, successText:'你打赢了，从此没人敢惹你。', fail:{hp:-10}, failText:'你被打倒在地，鼻血流了一脸。'},
    {label:'用言语化解', check:{attr:'int',dc:12}, success:{int:1,rep:1}, successText:'几句话就把他们说得哑口无言。', fail:{rep:-1}, failText:'他们笑得更厉害了。'},
    {label:'忍气吞声', effect:{karma:1}}
  ]},
  {title:'流浪的商人', minAge:12, text:['一个衣衫褴褛的商人向你兜售一枚"能带来好运"的护身符。'], choices:[
    {label:'买下来（花 3 金币）', req:{attr:'gold',val:3}, effect:{gold:-3}, text:'你买下了护身符。它看起来确实有点特别。'},
    {label:'不感兴趣', effect:{int:1}},
    {label:'抢走它', check:{attr:'phy',dc:14}, success:{gold:3,karma:-3}, successText:'你抢走了护身符，商人骂骂咧咧地跑了。', fail:{hp:-8,karma:-2}, failText:'商人掏出一把小刀，划伤了你的手臂。'}
  ]},
  {title:'雨夜的旅人', minAge:14, text:['暴雨夜，一个浑身湿透的旅人敲响了你的门，请求借宿一晚。'], choices:[
    {label:'收留他', effect:{karma:2}, text:'第二天早上他走了，桌上留下一枚银币和一张写着"谢谢"的纸条。'},
    {label:'拒绝', effect:{karma:-1}},
    {label:'收留他，并追问来历', check:{attr:'int',dc:13}, success:{int:1,rep:1}, successText:'他告诉你一个关于远方王国的秘密。', fail:{karma:0}, failText:'他沉默不语，第二天一早就走了。'}
  ]},
  {title:'森林深处的低语', minAge:10, race:['elf','fae','dragon'], text:['你听见森林深处传来低语，像是有人在呼唤你的名字。'], choices:[
    {label:'循声而去', check:{attr:'mag',dc:12}, success:{mag:2}, successText:'你找到了一处古老的魔力泉眼，喝下泉水后感到力量涌动。', fail:{hp:-12}, failText:'你迷路了三天，被荆棘划得遍体鳞伤。'},
    {label:'不去理会', effect:{int:1}}
  ]},
  {title:'酒馆斗殴', minAge:18, text:['酒馆里两个醉汉打了起来，其中一个撞翻了你的酒杯。'], choices:[
    {label:'加入混战', check:{attr:'phy',dc:13}, success:{phy:1,rep:1}, successText:'你打赢了，酒馆老板免了你的酒钱。', fail:{hp:-15}, failText:'你被两个人一起揍了。'},
    {label:'趁乱摸走钱包', check:{attr:'int',dc:14}, success:{gold:4,karma:-2}, successText:'你摸到了一个鼓鼓的钱包。', fail:{karma:-2,rep:-2}, failText:'你被当场抓住，挨了一顿打。'},
    {label:'悄悄离开', effect:{}}
  ]},
  {title:'受伤的野兽', minAge:12, text:['你在路边发现一只受伤的狼，它警惕地看着你，但没有攻击。'], choices:[
    {label:'帮它包扎', effect:{karma:2,hp:-2}, text:'狼舔了舔你的手，然后消失在树林里。'},
    {label:'杀了它取皮', check:{attr:'phy',dc:12}, success:{gold:3,karma:-2}, successText:'你得到了张不错的狼皮。', fail:{hp:-10}, failText:'狼在最后一刻咬伤了你的腿。'},
    {label:'绕开它', effect:{}}
  ]},
  {title:'神秘的委托', minAge:18, text:['一个蒙面人找到你，递给你一封信："送到北边的废弃塔楼，报酬丰厚。"'], choices:[
    {label:'接下委托', check:{attr:'phy',dc:14}, success:{gold:8,rep:2}, successText:'任务顺利完成，你得到了丰厚的报酬。', fail:{hp:-20}, failText:'塔楼里埋伏着强盗，你差点没能活着回来。'},
    {label:'拒绝', effect:{int:1}},
    {label:'打开信看内容', check:{attr:'int',dc:15}, success:{int:2}, successText:'信里藏着一个惊人的秘密，你决定留下它。', fail:{rep:-2}, failText:'蒙面人发现了，冷冷地看了你一眼就消失了。'}
  ]},
  {title:'丰收节', minAge:10, text:['一年一度的丰收节到了，镇广场上挤满了人。'], choices:[
    {label:'参加比武', check:{attr:'phy',dc:15}, success:{rep:3,gold:5}, successText:'你赢得了比武大会的冠军！', fail:{hp:-12}, failText:'你在第一轮就被淘汰了。'},
    {label:'参加魔法表演', check:{attr:'mag',dc:15}, success:{rep:3,mag:1}, successText:'你的表演引来阵阵喝彩。', fail:{rep:-1}, failText:'你的法术失控了，烧掉了一顶帐篷。'},
    {label:'摆摊做生意', check:{attr:'gold',dc:12}, success:{gold:6}, successText:'你的摊位生意兴隆。', fail:{gold:-2}, failText:'没人买你的东西。'}
  ]},
  {title:'瘟疫', minAge:15, text:['一场瘟疫席卷了小镇，许多人病倒了。'], choices:[
    {label:'留下来照顾病人', check:{attr:'mag',dc:14}, success:{karma:3,rep:2}, successText:'你用草药和祈祷救活了不少人。', fail:{hp:-25}, failText:'你也被感染了，在床上躺了整整一个月。'},
    {label:'逃离小镇', effect:{karma:-2,hp:5}, text:'你逃到了邻镇，躲过了瘟疫。'},
    {label:'趁乱敛财', check:{attr:'gold',dc:13}, success:{gold:10,karma:-4}, successText:'你高价卖出了囤积的药材。', fail:{rep:-3,karma:-3}, failText:'你被人发现，赶出了小镇。'}
  ]},
  {title:'古墓入口', minAge:20, text:['你在荒野中发现了一个被藤蔓覆盖的石门，门上刻着古老的符文。'], choices:[
    {label:'推门进去', check:{attr:'mag',dc:16}, success:{gold:12,mag:2}, successText:'墓室里堆满了陪葬品，你带走了一部分。', fail:{hp:-30}, failText:'触发了陷阱，你被毒箭射中，狼狈逃出。'},
    {label:'研究符文', check:{attr:'int',dc:15}, success:{int:2}, successText:'你解读出了符文的意思——这是一个警告。', fail:{hp:-8}, failText:'符文突然发光，灼伤了你的手。'},
    {label:'离开', effect:{}}
  ]},
  {title:'旧友重逢', minAge:25, text:['你在街上遇见了童年时的玩伴，他/她看起来变了很多。'], choices:[
    {label:'叙旧', effect:{rep:1,hp:10}, text:'你们聊了一整夜，回忆起了很多往事。'},
    {label:'借钱给他/她', req:{attr:'gold',val:5}, effect:{gold:-5,karma:2}, text:'他/她感激涕零，说一定会还。'},
    {label:'假装不认识', effect:{karma:-1}}
  ]},
  {title:'龙焰之夜', minAge:30, race:['dragon','human','elf'], text:['一头巨龙掠过夜空，火焰照亮了整片天空。'], choices:[
    {label:'追随巨龙', check:{attr:'mag',dc:17}, success:{mag:3,rep:3}, successText:'巨龙降落在一座山峰上，它看了你一眼，然后飞走了。你感到血脉在沸腾。', fail:{hp:-35}, failText:'龙焰擦过你的身体，你险些丧命。'},
    {label:'躲进地窖', effect:{hp:5}},
    {label:'组织村民灭火', check:{attr:'int',dc:14}, success:{rep:3,karma:2}, successText:'你指挥村民扑灭了大火，救了半个镇子。', fail:{hp:-15,rep:-1}, failText:'火势失控，烧毁了几间房屋。'}
  ]},
  {title:'魔女的邀约', minAge:22, race:['demon','fae','undead','elf'], text:['一个穿着黑裙的女人出现在你面前："我知道你一直在寻找什么。"'], choices:[
    {label:'跟她走', check:{attr:'mag',dc:16}, success:{mag:3,int:1}, successText:'她教了你一个禁忌的法术，代价是……你暂时不想去想。', fail:{hp:-20,karma:-2}, failText:'这是一个陷阱，你被抽走了一部分生命力。'},
    {label:'拒绝', effect:{int:1}},
    {label:'反过来试探她', check:{attr:'int',dc:17}, success:{int:3}, successText:'你识破了她的伪装——她其实是一个被放逐的天使。', fail:{hp:-10}, failText:'她笑了："有趣。"然后消失了。'}
  ]},
  {title:'战争爆发', minAge:20, text:['边境传来战报，王国正在征召士兵。'], choices:[
    {label:'应征入伍', check:{attr:'phy',dc:16}, success:{rep:4,gold:8,phy:1}, successText:'你在战场上立下战功，被授予了勋章。', fail:{hp:-40}, failText:'你身负重伤，被送回了后方。'},
    {label:'花钱免役', req:{attr:'gold',val:8}, effect:{gold:-8}},
    {label:'逃往他乡', effect:{karma:-2,gold:-3}, text:'你连夜离开了家乡。'}
  ]},
  {title:'神秘的书', minAge:16, text:['你在旧书店的角落里发现一本没有封面的书，翻开后里面的文字似乎在动。'], choices:[
    {label:'买下它（5 金币）', req:{attr:'gold',val:5}, check:{attr:'int',dc:15}, success:{int:3,mag:1}, successText:'你读懂了书中的一部分内容，那是失传已久的古代知识。', fail:{hp:-15}, failText:'书中的文字灼伤了你的眼睛，你失明了好几天。'},
    {label:'放回去', effect:{int:1}}
  ]},
  {title:'雪夜', minAge:10, text:['大雪封山，你被困在一间废弃的小屋里。'], choices:[
    {label:'生火取暖', check:{attr:'phy',dc:12}, success:{hp:10}, successText:'你成功生起了火，熬过了寒夜。', fail:{hp:-20}, failText:'火怎么也点不着，你冻得几乎失去知觉。'},
    {label:'用魔法取暖', check:{attr:'mag',dc:13}, success:{mp:-10,hp:15}, successText:'你维持着一个小火球，度过了漫长的夜晚。', fail:{hp:-15,mp:-20}, failText:'魔力耗尽，你陷入了昏迷。'}
  ]},
  {title:'赌局', minAge:18, text:['一个赌徒向你发起挑战："敢不敢赌一把？"'], choices:[
    {label:'赌 5 金币', req:{attr:'gold',val:5}, check:{attr:'int',dc:14}, success:{gold:10}, successText:'你赢了！', fail:{gold:-5}, failText:'你输了。'},
    {label:'赌 10 金币', req:{attr:'gold',val:10}, check:{attr:'int',dc:16}, success:{gold:20}, successText:'你大赚一笔！', fail:{gold:-10}, failText:'你输得很惨。'},
    {label:'不赌', effect:{}}
  ]},
  {title:'受伤的骑士', minAge:18, text:['一个浑身是血的骑士倒在路边，他的盔甲上刻着王国的徽记。'], choices:[
    {label:'救他', check:{attr:'mag',dc:13}, success:{rep:3,karma:2,gold:5}, successText:'骑士醒来后感激不尽，给了你一笔酬金。', fail:{hp:-10}, failText:'你尽力了，但他还是没能撑过去。'},
    {label:'搜刮他的财物', effect:{gold:6,karma:-3}, text:'你拿走了他的钱袋，把他留在了那里。'},
    {label:'去找人帮忙', check:{attr:'phy',dc:11}, success:{rep:2,karma:1}, successText:'你及时找来了人，骑士得救了。', fail:{rep:-1}, failText:'等你回来时，他已经不见了。'}
  ]},
  {title:'梦境', minAge:12, race:['fae','elf','demon','angel'], text:['你做了一个奇怪的梦，梦里有一个声音在问："你想要什么？"'], choices:[
    {label:'"我想要力量"', effect:{mag:2,hp:-10}, text:'醒来后，你感到体内多了一股陌生的力量。'},
    {label:'"我想要财富"', effect:{gold:5,hp:-5}, text:'第二天早上，你在枕头下发现了几枚金币。'},
    {label:'"我什么都不想要"', effect:{int:2}, text:'那个声音笑了："有趣。"'}
  ]},
  {title:'流浪的吟游诗人', minAge:14, text:['一个吟游诗人在广场上唱着古老的歌谣，歌词讲述了一个关于你的种族的故事。'], choices:[
    {label:'听完', effect:{int:1,rep:1}},
    {label:'给他一些钱', req:{attr:'gold',val:2}, effect:{gold:-2,rep:2,karma:1}, text:'他为你唱了一首专属的歌。'},
    {label:'追问歌谣的来历', check:{attr:'int',dc:13}, success:{int:2}, successText:'他告诉你，这首歌谣已经流传了上千年。', fail:{}, failText:'他摇摇头："我只是个吟游诗人，不知道那么多。"'}
  ]},
];

/* ---------- 主线剧情（按种族） ---------- */
const MAIN_LINES = {
  human: [
    {title:'离乡', minAge:16, text:['你在小镇生活了十六年，今天，你决定离开。','母亲塞给你一个布包，里面是几块干粮和一枚旧铜币。"活着回来。"她说。'], choices:[
      {label:'带上布包，头也不回地走', effect:{gold:2,karma:1}, text:'你没有回头。'},
      {label:'抱了抱母亲', effect:{hp:10,karma:2,rep:1}, text:'她的眼泪落在了你的肩上。'},
      {label:'把铜币还给她', effect:{karma:3}, text:'"留着吧，我会自己挣。"'}
    ]},
    {title:'王都', minAge:18, text:['你来到了王国的心脏——白垩王都。','高耸的城墙、川流不息的人群、还有远处那座直插云霄的白色高塔。','在这里，一个平民可以成为任何东西，也可以什么都不是。'], choices:[
      {label:'去佣兵公会登记', check:{attr:'phy',dc:13}, success:{rep:2,gold:5,job:'佣兵'}, successText:'你通过了试炼，成为了一名注册佣兵。', fail:{hp:-10}, failText:'你被打得鼻青脸肿，但公会还是收下了你。'},
      {label:'去魔法学院应试', check:{attr:'mag',dc:15}, success:{rep:2,mag:2,job:'魔法学徒'}, successText:'你的天赋让考官刮目相看。', fail:{rep:-1}, failText:'你落榜了。'},
      {label:'在街头找活干', check:{attr:'gold',dc:11}, success:{gold:4}, successText:'你找到了一份搬运工的活。', fail:{gold:1}, failText:'你只挣到了几个铜板。'}
    ]},
    {title:'阴谋', minAge:22, text:['你在王都混了几年，渐渐发现了一些不对劲的事。','夜里，一个黑衣人找到你："我知道你看见了什么。跟我来。"'], choices:[
      {label:'跟他走', check:{attr:'int',dc:15}, success:{int:2,rep:2}, successText:'你被引入了一个反抗组织，他们正在策划推翻暴政。', fail:{hp:-20}, failText:'这是一个陷阱，你被关进了地牢，好不容易才逃出来。'},
      {label:'拒绝，并去告发', effect:{rep:3,karma:-2}, text:'你得到了官方的赏赐，但也因此失去了很多朋友。'},
      {label:'假装答应，暗中调查', check:{attr:'int',dc:17}, success:{int:3,gold:8}, successText:'你同时掌握了两边的秘密，成了最危险的人。', fail:{hp:-25,karma:-1}, failText:'你的伪装被识破了。'}
    ]},
    {title:'王座之前', minAge:30, text:['多年之后，你站在了王座之前。','国王已经老了，他看着你："你就是那个从边境来的孩子？"'], choices:[
      {label:'"是的，陛下。"', check:{attr:'int',dc:16}, success:{rep:5,title:'王国重臣'}, successText:'国王笑了："那么，这个国家就交给你了。"', fail:{rep:-2}, failText:'国王挥了挥手，卫兵把你带了下去。'},
      {label:'拔出武器', check:{attr:'phy',dc:20}, success:{rep:8,title:'弑王者',karma:-5}, successText:'王座易主。历史将记住这一天。', fail:{hp:-50}, failText:'你被皇家卫队制服，投入了死牢。'},
      {label:'转身离开', effect:{int:2,karma:2}, text:'你转身走出了大殿。有些事，不是你能改变的。'}
    ]},
    {title:'凡人的终点', minAge:40, text:['你老了。','回望这一生，你从一个边境小镇的孩子，走到了今天。','你坐在窗边，看着夕阳。'], choices:[
      {label:'安静地等待', effect:{karma:2}, text:'你闭上眼睛，感到前所未有的平静。'},
      {label:'写下回忆录', check:{attr:'int',dc:14}, success:{rep:5,title:'传奇凡人'}, successText:'你的故事被后人传颂。', fail:{}, failText:'笔尖颤抖，你写不下去了。'}
    ]}
  ],
  elf: [
    {title:'月桂之誓', minAge:16, text:['精灵成年礼上，长老把一枚月桂叶放在你掌心。','"从今天起，你要为自己的选择负责。精灵的寿命很长，长到足以看清每一个决定的后果。"'], choices:[
      {label:'"我愿守望森林"', effect:{mag:2,karma:2}, text:'长老点了点头。'},
      {label:'"我想去看看外面的世界"', effect:{int:2,rep:1}, text:'长老沉默了很久，最后说："去吧。记得回来。"'},
      {label:'"我想知道永生的意义"', check:{attr:'mag',dc:14}, success:{mag:3,int:1}, successText:'长老的眼中闪过一丝惊讶："你问了一个连我都无法回答的问题。"', fail:{}, failText:'长老摇了摇头。'}
    ]},
    {title:'人类的城邦', minAge:25, text:['你第一次走出森林，来到了人类的城邦。','这里的建筑粗糙、嘈杂，人们匆匆忙忙，好像明天就会死掉一样。'], choices:[
      {label:'融入他们', check:{attr:'int',dc:14}, success:{int:2,rep:2}, successText:'你学会了人类的语言和习惯。', fail:{rep:-1}, failText:'你始终格格不入。'},
      {label:'保持距离', effect:{mag:1,karma:1}, text:'你只是静静地观察。'},
      {label:'寻找同类', check:{attr:'mag',dc:13}, success:{rep:1,mag:1}, successText:'你找到了一处精灵的隐居地。', fail:{}, failText:'你什么也没找到。'}
    ]},
    {title:'千年的孤独', minAge:100, text:['一百年过去了。','你认识的人类朋友一个接一个地老去、死去。','你开始明白长老那句话的意思。'], choices:[
      {label:'继续走下去', effect:{int:3,karma:2}, text:'你决定承受这份孤独。'},
      {label:'回到森林', effect:{mag:2,hp:20}, text:'你回到了月桂树下，那里一切如旧。'},
      {label:'寻找永生的秘密', check:{attr:'mag',dc:18}, success:{mag:4}, successText:'你触碰到了某种古老的真理。', fail:{hp:-30}, failText:'你付出了惨痛的代价，却什么也没得到。'}
    ]},
    {title:'世界之树', minAge:200, text:['传说中，世界之树的根系连接着所有精灵的灵魂。','你终于找到了它。'], choices:[
      {label:'与树对话', check:{attr:'mag',dc:20}, success:{mag:5,int:2,title:'树语者'}, successText:'你听到了世界本身的声音。', fail:{hp:-40}, failText:'你的精神几乎被冲垮。'},
      {label:'守护它', effect:{karma:3,rep:3}, text:'你决定留在这里，成为它的守护者。'}
    ]}
  ],
  dwarf: [
    {title:'第一把锤', minAge:16, text:['矮人的成年礼是打造一件属于自己的作品。','父亲把一块精铁放在你面前："让我看看你的手艺。"'], choices:[
      {label:'打造一把剑', check:{attr:'phy',dc:13}, success:{phy:2,gold:3}, successText:'父亲满意地点了点头。', fail:{hp:-8}, failText:'铁块裂开了。'},
      {label:'打造一枚戒指', check:{attr:'int',dc:14}, success:{int:2,gold:5}, successText:'戒指上刻着精细的符文。', fail:{}, failText:'太精细了，你失败了。'},
      {label:'什么也不做', effect:{karma:-1}, text:'父亲失望地转过身。'}
    ]},
    {title:'深矿', minAge:20, text:['矿洞里传来了奇怪的声音。','老矿工说那是"地底的呼吸"，但你知道，那可能是别的东西。'], choices:[
      {label:'下去看看', check:{attr:'phy',dc:15}, success:{gold:10,phy:2}, successText:'你发现了一条富矿脉。', fail:{hp:-25}, failText:'塌方了，你被埋了半宿。'},
      {label:'报告长老', effect:{rep:2,karma:1}},
      {label:'独自保守秘密', effect:{int:2,gold:3}, text:'你悄悄开采了一部分。'}
    ]},
    {title:'熔炉之心', minAge:50, text:['传说矮人王国的地底有一座永不熄灭的熔炉。','你找到了它的入口。'], choices:[
      {label:'走进去', check:{attr:'phy',dc:18}, success:{phy:4,gold:15,title:'熔炉之子'}, successText:'你从熔炉中取出了一块传说中的金属。', fail:{hp:-45}, failText:'高温几乎把你烤熟了。'},
      {label:'封印它', effect:{karma:3,rep:3}, text:'你决定让它继续沉睡。'}
    ]}
  ],
  orc: [
    {title:'血之试炼', minAge:16, text:['兽人的成年礼是杀死一头野兽，把它的牙挂在脖子上。'], choices:[
      {label:'猎杀一头狼', check:{attr:'phy',dc:13}, success:{phy:2,rep:2}, successText:'你带回了一颗狼牙。', fail:{hp:-20}, failText:'你被咬伤了。'},
      {label:'猎杀一头熊', check:{attr:'phy',dc:17}, success:{phy:4,rep:4,gold:5}, successText:'整个部落都为你欢呼。', fail:{hp:-40}, failText:'你差点死在熊掌下。'},
      {label:'拒绝试炼', effect:{rep:-3,karma:1}, text:'你被部落视为懦夫。'}
    ]},
    {title:'人类的边境', minAge:20, text:['人类的军队正在向兽人的领地推进。','族长召集了所有战士。'], choices:[
      {label:'冲在最前面', check:{attr:'phy',dc:16}, success:{rep:4,phy:2}, successText:'你砍倒了三个敌人。', fail:{hp:-35}, failText:'你被长矛刺穿了肩膀。'},
      {label:'提议谈判', check:{attr:'int',dc:17}, success:{rep:3,karma:2}, successText:'你促成了停战协议。', fail:{rep:-2}, failText:'人类拒绝了，还嘲笑了你。'},
      {label:'带族人撤退', effect:{karma:2,rep:-1}, text:'你保住了族人的性命，但也失去了领地。'}
    ]},
    {title:'新的部落', minAge:35, text:['兽人的旧秩序正在崩塌。','你意识到，光靠蛮力已经无法让族人活下去了。'], choices:[
      {label:'建立新的部落', check:{attr:'int',dc:16}, success:{rep:5,title:'部落缔造者',gold:10}, successText:'一个新的兽人国度在废墟上崛起。', fail:{hp:-20,rep:-2}, failText:'内斗让你失去了很多族人。'},
      {label:'继续征战', check:{attr:'phy',dc:18}, success:{rep:4,phy:3}, successText:'你的名字让敌人闻风丧胆。', fail:{hp:-40}, failText:'你败了。'}
    ]}
  ],
  halfling: [
    {title:'洞府之外', minAge:16, text:['半身人的一生通常都在洞府里度过，安稳、舒适、无聊。','但你总觉得，外面有什么在等着你。'], choices:[
      {label:'出发去冒险', effect:{int:1,rep:1}, text:'你背上行囊，走出了洞府。'},
      {label:'留下来', effect:{gold:3,hp:10}, text:'你继承了家里的面包店。'},
      {label:'先去看看再说', check:{attr:'int',dc:11}, success:{int:2}, successText:'你在外面转了一圈，学到了不少东西。', fail:{hp:-5}, failText:'你迷路了三天。'}
    ]},
    {title:'一枚戒指', minAge:20, text:['你在河边捡到了一枚金色的戒指。','它看起来很普通，但戴上的瞬间，你感到自己变得……透明了。'], choices:[
      {label:'戴上它', check:{attr:'int',dc:14}, success:{gold:8,int:2}, successText:'你利用隐身的能力，做了不少"好事"。', fail:{hp:-10,karma:-2}, failText:'戒指的力量反噬了你。'},
      {label:'卖掉它', effect:{gold:10}, text:'你把它卖给了一个商人。'},
      {label:'扔掉它', effect:{karma:2}, text:'你把它扔回了河里。有些东西不该被找到。'}
    ]},
    {title:'幸运的一夜', minAge:30, text:['你在一场赌局中赢了一大笔钱。','但你也知道，幸运不会永远站在你这边。'], choices:[
      {label:'见好就收', effect:{gold:15,int:1}, text:'你带着钱离开了。'},
      {label:'继续赌', check:{attr:'int',dc:18}, success:{gold:30}, successText:'你赢下了整个赌场。', fail:{gold:-20}, failText:'你输光了所有。'}
    ]}
  ],
  dragon: [
    {title:'血脉觉醒', minAge:16, text:['你感到体内有什么东西在燃烧。','那是龙的血脉在苏醒。'], choices:[
      {label:'接受它', check:{attr:'mag',dc:14}, success:{mag:3,phy:2}, successText:'你的皮肤上浮现出龙鳞的纹路。', fail:{hp:-20}, failText:'力量失控，你烧毁了自己的房间。'},
      {label:'压制它', effect:{int:2}, text:'你决定暂时不让它显露。'},
      {label:'向族人求助', check:{attr:'int',dc:13}, success:{int:2,mag:1}, successText:'一位年长的龙裔教会了你如何控制力量。', fail:{}, failText:'没有人愿意帮你。'}
    ]},
    {title:'龙的遗产', minAge:50, text:['你找到了祖先留下的洞窟。','里面堆满了金币，还有一枚巨大的龙蛋。'], choices:[
      {label:'带走金币', effect:{gold:30}, text:'你搬走了能搬的一切。'},
      {label:'孵化龙蛋', check:{attr:'mag',dc:18}, success:{mag:4,title:'育龙者',rep:3}, successText:'一条小龙破壳而出，它看着你，叫了一声。', fail:{hp:-30}, failText:'龙蛋碎裂了。'},
      {label:'守护这里', effect:{karma:2,rep:2,mag:2}, text:'你决定留在这里，守护祖先的遗产。'}
    ]},
    {title:'天界的注视', minAge:200, text:['你的存在引起了天界的注意。','一位天使降临在你面前："龙裔不该存在于这个世界。"'], choices:[
      {label:'战斗', check:{attr:'phy',dc:22}, success:{rep:8,phy:4,title:'屠天使者'}, successText:'你击败了天使，从此无人敢小觑你。', fail:{hp:-60}, failText:'你被击落，坠落在大地上。'},
      {label:'谈判', check:{attr:'int',dc:20}, success:{rep:5,int:3}, successText:'你说服了天使，为自己争取到了生存的权利。', fail:{hp:-30}, failText:'天使没有听你的。'},
      {label:'逃跑', effect:{hp:-20,karma:-1}, text:'你逃进了深山。'}
    ]}
  ],
  demon: [
    {title:'契约', minAge:16, text:['魔族成年时，必须与某个存在签订契约。','深渊的低语在你耳边响起："把你的灵魂给我，我给你力量。"'], choices:[
      {label:'签订契约', check:{attr:'mag',dc:13}, success:{mag:4,hp:-10}, successText:'你获得了强大的力量，但也失去了一部分自己。', fail:{hp:-30}, failText:'契约反噬了你。'},
      {label:'拒绝', effect:{int:2,karma:2}, text:'你选择了自己的道路。'},
      {label:'与另一个存在签约', check:{attr:'int',dc:16}, success:{mag:2,int:3}, successText:'你找到了一个更温和的契约对象。', fail:{hp:-15}, failText:'你被欺骗了。'}
    ]},
    {title:'人间的诱惑', minAge:30, text:['你来到了人间。','这里的一切都那么脆弱，那么容易被摧毁。'], choices:[
      {label:'征服它', check:{attr:'mag',dc:17}, success:{rep:5,gold:15,karma:-3}, successText:'你控制了一座城市。', fail:{hp:-35}, failText:'你被人类的圣骑士击退了。'},
      {label:'融入它', check:{attr:'int',dc:15}, success:{int:2,rep:2}, successText:'你学会了像人类一样生活。', fail:{rep:-2}, failText:'你的身份暴露了。'},
      {label:'观察它', effect:{int:3}, text:'你只是静静地看着。'}
    ]},
    {title:'深渊的召唤', minAge:100, text:['深渊在呼唤你回去。','那里是你的故乡，也是你的牢笼。'], choices:[
      {label:'回去', effect:{mag:3,rep:2}, text:'你回到了深渊，成为了那里的领主。'},
      {label:'拒绝', check:{attr:'mag',dc:20}, success:{mag:5,title:'叛逃者'}, successText:'你斩断了与深渊的联系。', fail:{hp:-50}, failText:'深渊的力量撕扯着你。'}
    ]}
  ],
  angel: [
    {title:'神谕', minAge:16, text:['你听到了神的声音。','"去人间，找到那个将要毁灭世界的人。"'], choices:[
      {label:'遵从神谕', effect:{mag:2,karma:2}, text:'你展开了翅膀，飞向人间。'},
      {label:'质疑神谕', check:{attr:'int',dc:15}, success:{int:3,karma:1}, successText:'你开始思考：神真的永远正确吗？', fail:{hp:-20}, failText:'你的信仰动摇了，圣光开始排斥你。'},
      {label:'拒绝', effect:{karma:-2,mag:1}, text:'你留在了天界。'}
    ]},
    {title:'人间', minAge:25, text:['人间比你想象的复杂得多。','这里没有绝对的对错，只有挣扎着活下去的人。'], choices:[
      {label:'帮助穷人', check:{attr:'mag',dc:14}, success:{karma:4,rep:3}, successText:'你治愈了很多病人。', fail:{hp:-15}, failText:'你的力量耗尽了。'},
      {label:'寻找目标', check:{attr:'int',dc:16}, success:{int:2,rep:1}, successText:'你找到了一些线索。', fail:{}, failText:'你一无所获。'},
      {label:'隐藏身份', effect:{int:2}, text:'你决定先观察。'}
    ]},
    {title:'堕落', minAge:100, text:['你爱上了一个人类。','这在天使的律法中是被禁止的。'], choices:[
      {label:'放弃天使的身份', check:{attr:'mag',dc:18}, success:{karma:3,title:'堕落天使',mag:3}, successText:'你斩断了自己的翅膀，成为了一个凡人。', fail:{hp:-40}, failText:'天界的力量惩罚了你。'},
      {label:'压抑感情', effect:{karma:1,hp:-20}, text:'你选择了职责。'},
      {label:'向神祈求', check:{attr:'int',dc:20}, success:{int:4,rep:3}, successText:'神沉默了。也许这就是答案。', fail:{hp:-30}, failText:'神没有回应。'}
    ]}
  ],
  undead: [
    {title:'为何而活', minAge:16, text:['你记得自己死过一次。','但此刻，你又站在这里。为什么？'], choices:[
      {label:'寻找答案', check:{attr:'int',dc:14}, success:{int:2,mag:1}, successText:'你找到了一些关于复活的线索。', fail:{}, failText:'你什么也没找到。'},
      {label:'接受现实', effect:{karma:1,hp:10}, text:'活着就好。'},
      {label:'追求力量', check:{attr:'mag',dc:15}, success:{mag:3}, successText:'你从死亡中汲取了力量。', fail:{hp:-20}, failText:'死亡的力量反噬了你。'}
    ]},
    {title:'生者的排斥', minAge:25, text:['你走进一个村庄，所有人都惊恐地逃开了。','"亡灵！是亡灵！"'], choices:[
      {label:'解释', check:{attr:'int',dc:15}, success:{rep:2,karma:2}, successText:'有人愿意听你说话。', fail:{hp:-15}, failText:'他们朝你扔石头。'},
      {label:'离开', effect:{karma:1}},
      {label:'报复', check:{attr:'mag',dc:14}, success:{karma:-4,rep:-2,gold:5}, successText:'你让他们付出了代价。', fail:{hp:-20}, failText:'你被驱赶了出去。'}
    ]},
    {title:'死亡的真谛', minAge:100, text:['你活了很久，久到忘记了自己曾经是个活人。','你开始理解死亡的意义。'], choices:[
      {label:'成为死亡的使者', check:{attr:'mag',dc:18}, success:{mag:4,title:'死亡使者',rep:4}, successText:'你成为了生与死之间的桥梁。', fail:{hp:-30}, failText:'你被死亡的力量吞噬了一部分。'},
      {label:'寻找安息', check:{attr:'int',dc:17}, success:{karma:3,title:'安息者'}, successText:'你找到了让自己真正死去的方法。', fail:{}, failText:'你找不到。'}
    ]}
  ],
  fae: [
    {title:'梦的边界', minAge:16, text:['妖精的成年礼是进入"梦的边界"。','那里是现实与虚幻的交界处。'], choices:[
      {label:'走进去', check:{attr:'mag',dc:14}, success:{mag:3,int:1}, successText:'你从梦里带回了一件宝物。', fail:{hp:-20}, failText:'你差点迷失在梦里。'},
      {label:'留在外面', effect:{int:1}}
    ]},
    {title:'人类的愿望', minAge:30, text:['一个人类找到了你，说："请实现我的愿望。"'], choices:[
      {label:'实现它', check:{attr:'mag',dc:15}, success:{karma:2,rep:2}, successText:'你实现了他的愿望，他感激涕零。', fail:{hp:-15,karma:-1}, failText:'你的魔法失控了，愿望变成了诅咒。'},
      {label:'拒绝', effect:{karma:-1}},
      {label:'索取代价', check:{attr:'int',dc:13}, success:{gold:10,karma:-2}, successText:'你从他那里得到了很多。', fail:{}, failText:'他拒绝了。'}
    ]},
    {title:'梦境之主', minAge:100, text:['你渐渐成为了梦境的主宰。','所有的梦都在你的掌控之中。'], choices:[
      {label:'统治梦境', check:{attr:'mag',dc:19}, success:{mag:5,title:'梦境之主'}, successText:'你成为了梦境的王。', fail:{hp:-40}, failText:'梦境反噬了你。'},
      {label:'守护梦境', effect:{karma:3,rep:3}, text:'你决定让梦境保持自由。'}
    ]}
  ]
};

/* ---------- 支线剧情 ---------- */
const SUBS = [
  {id:'lost_cat', title:'寻找走失的猫', minAge:10, text:['邻居家的孩子哭着跑来找你："我的猫不见了！"'], choices:[
    {label:'帮忙找', check:{attr:'int',dc:11}, success:{karma:2,rep:1}, successText:'你在屋顶上找到了那只猫。', fail:{}, failText:'你找了一整天也没找到。'},
    {label:'给他一些钱', req:{attr:'gold',val:2}, effect:{gold:-2,karma:1}},
    {label:'拒绝', effect:{karma:-1}}
  ]},
  {id:'old_smith', title:'老铁匠的委托', minAge:18, text:['镇上最老的铁匠找到了你："我想在死之前，再打一把剑。"'], choices:[
    {label:'帮他', check:{attr:'phy',dc:13}, success:{gold:8,rep:2,karma:2}, successText:'剑打成了，他把它送给了你。', fail:{hp:-10}, failText:'你搞砸了，但他没有怪你。'},
    {label:'拒绝', effect:{}}
  ]},
  {id:'haunted_house', title:'闹鬼的宅邸', minAge:20, text:['镇子边缘有一栋废弃的宅邸，据说里面闹鬼。'], choices:[
    {label:'进去探险', check:{attr:'mag',dc:15}, success:{gold:12,int:2}, successText:'你发现了一个藏在地板下的宝箱。', fail:{hp:-25}, failText:'你被什么东西袭击了，狼狈逃出。'},
    {label:'在外面看看', effect:{int:1}},
    {label:'离开', effect:{}}
  ]},
  {id:'plague_doctor', title:'瘟疫医生', minAge:22, text:['一个戴着鸟嘴面具的医生在镇上免费治病。','有人说他是骗子，有人说他是圣人。'], choices:[
    {label:'协助他', check:{attr:'mag',dc:14}, success:{karma:3,rep:2,int:1}, successText:'你学到了很多医术。', fail:{hp:-15}, failText:'你被传染了。'},
    {label:'揭穿他', check:{attr:'int',dc:16}, success:{rep:2,int:1}, successText:'他确实是个骗子，但你从他身上学到了骗术。', fail:{rep:-2}, failText:'他是真的医生，你成了笑柄。'},
    {label:'不管', effect:{}}
  ]},
  {id:'lost_princess', title:'失踪的公主', minAge:25, text:['王国的公主失踪了，国王悬赏重金寻找。'], choices:[
    {label:'接受委托', check:{attr:'int',dc:17}, success:{gold:25,rep:5,title:'王国英雄'}, successText:'你找到了公主，她其实是为了逃避政治联姻而出走。你选择了帮她。', fail:{hp:-30}, failText:'你卷入了宫廷阴谋，差点丧命。'},
    {label:'不趟浑水', effect:{}}
  ]},
  {id:'dragon_egg', title:'龙蛋', minAge:30, text:['你在市场上看到一个商人正在出售一枚龙蛋。'], choices:[
    {label:'买下它（20 金币）', req:{attr:'gold',val:20}, check:{attr:'mag',dc:16}, success:{mag:3,title:'育龙者',gold:-20}, successText:'龙蛋孵化了，一条小龙认你为主。', fail:{gold:-20}, failText:'龙蛋是假的。'},
    {label:'举报他', effect:{rep:2,karma:1}},
    {label:'离开', effect:{}}
  ]},
  {id:'cursed_ring', title:'被诅咒的戒指', minAge:20, text:['你在路边捡到一枚戒指，戴上后怎么也摘不下来。'], choices:[
    {label:'寻找解除诅咒的方法', check:{attr:'mag',dc:16}, success:{mag:2,karma:1}, successText:'你解除了诅咒，戒指变成了一枚普通的银戒。', fail:{hp:-20}, failText:'诅咒加深了。'},
    {label:'接受它', effect:{mag:2,hp:-15}, text:'你决定和诅咒共存。'},
    {label:'砍掉手指', effect:{hp:-20,phy:-1}, text:'你砍掉了戴着戒指的手指。'}
  ]},
  {id:'old_friend', title:'旧友的背叛', minAge:28, text:['你多年的好友突然消失了，还带走了你的一大笔钱。'], choices:[
    {label:'追查', check:{attr:'int',dc:16}, success:{gold:10,karma:-1}, successText:'你找到了他，他把钱还给了你，但你们的友谊结束了。', fail:{gold:-5}, failText:'你什么也没找到。'},
    {label:'原谅', effect:{karma:2}, text:'你选择了放下。'},
    {label:'报复', check:{attr:'phy',dc:15}, success:{karma:-3,gold:8}, successText:'你让他付出了代价。', fail:{hp:-20}, failText:'你受了伤。'}
  ]},
  {id:'mysterious_stranger', title:'神秘的旅人', minAge:22, text:['一个旅人在酒馆里讲述了一个关于"永恒之城"的传说。'], choices:[
    {label:'追问细节', check:{attr:'int',dc:14}, success:{int:2}, successText:'他告诉你，那座城就在北方的迷雾之中。', fail:{}, failText:'他喝醉了，什么也说不清。'},
    {label:'请他喝酒', req:{attr:'gold',val:3}, effect:{gold:-3,rep:1,int:1}, text:'他告诉了你一些有用的信息。'}
  ]},
  {id:'orphan_girl', title:'孤儿', minAge:25, text:['你在街上看到一个瘦弱的小女孩，正在翻找垃圾。'], choices:[
    {label:'收养她', effect:{karma:3,child:1,gold:-5}, text:'她跟着你回了家，从此你多了一个家人。'},
    {label:'给她一些钱', req:{attr:'gold',val:2}, effect:{gold:-2,karma:1}},
    {label:'视而不见', effect:{karma:-1}}
  ]},
  {id:'forbidden_book', title:'禁书', minAge:20, text:['你在图书馆的禁书区发现了一本被锁链锁住的书。'], choices:[
    {label:'打开它', check:{attr:'int',dc:17}, success:{int:3,mag:2}, successText:'书中记载着失传的古代魔法。', fail:{hp:-30}, failText:'书中的力量灼伤了你的精神。'},
    {label:'报告管理员', effect:{rep:1,karma:1}},
    {label:'离开', effect:{}}
  ]},
  {id:'bandit_raid', title:'山贼来袭', minAge:18, text:['一伙山贼袭击了村庄。'], choices:[
    {label:'组织抵抗', check:{attr:'phy',dc:15}, success:{rep:3,gold:8,karma:2}, successText:'你们击退了山贼。', fail:{hp:-30}, failText:'村庄被洗劫了。'},
    {label:'交钱了事', req:{attr:'gold',val:6}, effect:{gold:-6,karma:-1}},
    {label:'逃跑', effect:{karma:-2}}
  ]},
  {id:'star_fall', title:'流星', minAge:16, text:['一颗流星划过夜空，坠落在一座山丘上。'], choices:[
    {label:'去寻找', check:{attr:'mag',dc:15}, success:{mag:3,gold:5}, successText:'你找到了一块散发着微光的陨石。', fail:{hp:-15}, failText:'陨石周围的高温烫伤了你。'},
    {label:'许愿', effect:{karma:1,hp:10}, text:'你闭上眼睛，许了一个愿。'}
  ]},
  {id:'twin_flame', title:'双生火焰', minAge:20, text:['你遇见了一个和你有着相同眼神的人。','你们之间似乎有一种奇妙的联系。'], choices:[
    {label:'接近他/她', check:{attr:'int',dc:14}, success:{spouse:'命运之人',rep:2}, successText:'你们相爱了。', fail:{}, failText:'你们擦肩而过。'},
    {label:'保持距离', effect:{int:1}}
  ]},
];

/* ---------- 扩充事件库 ---------- */
EVENTS.push(
  // 通用日常
  {title:'雨夜', minAge:10, text:['一场大雨困住了你。屋檐下，你遇见了一个同样躲雨的陌生人。'], choices:[
    {label:'和他聊天', check:{attr:'int',dc:12}, success:{int:1,rep:1}, successText:'你们聊了一整夜，成了朋友。', fail:{}, failText:'你们只是沉默地等雨停。'},
    {label:'独自看雨', effect:{karma:1}, text:'雨声很好听。'}
  ]},
  {title:'路边的钱袋', minAge:14, text:['你在路上捡到一个鼓鼓的钱袋。'], choices:[
    {label:'收下', effect:{gold:5,karma:-2}, text:'你把它塞进了怀里。'},
    {label:'寻找失主', check:{attr:'int',dc:10}, success:{gold:2,rep:2,karma:2}, successText:'你找到了失主，他重谢了你。', fail:{karma:1}, failText:'你没找到人，只好交给了守卫。'},
    {label:'交给守卫', effect:{karma:1,rep:1}}
  ]},
  {title:'决斗挑战', minAge:18, text:['一个年轻的剑士拦住你："我要向你挑战！"'], choices:[
    {label:'接受', check:{attr:'phy',dc:14}, success:{rep:3,phy:1}, successText:'你赢了，围观的人为你欢呼。', fail:{hp:-20,rep:-1}, failText:'你输了，但对方扶你起来，说你是条汉子。'},
    {label:'拒绝', effect:{rep:-1}},
    {label:'用智慧化解', check:{attr:'int',dc:13}, success:{int:1,rep:1}, successText:'你几句话就让他心服口服。', fail:{rep:-1}, failText:'他觉得你在耍他。'}
  ]},
  {title:'深夜的敲门声', minAge:16, text:['半夜，有人敲你的门。开门，门外站着一个浑身是血的人。'], choices:[
    {label:'救他', check:{attr:'mag',dc:13}, success:{karma:3,rep:2}, successText:'你救活了他。他说他欠你一条命。', fail:{hp:-10,karma:1}, failText:'你尽力了，但他还是走了。'},
    {label:'关上门', effect:{karma:-2}},
    {label:'叫守卫', effect:{karma:-1}}
  ]},
  {title:'集市奇遇', minAge:12, text:['集市上，一个老妇人拉住你："孩子，你印堂发黑，最近有血光之灾。"'], choices:[
    {label:'听她说完', check:{attr:'int',dc:11}, success:{int:1,luck:1}, successText:'她给了你一个护身符，说能挡一次灾。', fail:{gold:-2}, failText:'她骗了你两个铜板。'},
    {label:'甩开她', effect:{}},
    {label:'给她一些钱', req:{attr:'gold',val:2}, effect:{gold:-2,karma:1}}
  ]},
  {title:'旧书摊', minAge:14, text:['一个旧书摊上，你发现一本封面破损的古书。'], choices:[
    {label:'买下来', req:{attr:'gold',val:3}, check:{attr:'int',dc:12}, success:{gold:-3,int:2,mag:1}, successText:'书里记载着古老的咒语。', fail:{gold:-3}, failText:'只是一本无聊的账本。'},
    {label:'翻几页就走', effect:{int:1}},
    {label:'离开', effect:{}}
  ]},
  {title:'山贼', minAge:16, text:['三个山贼拦住了你的去路："留下买路钱！"'], choices:[
    {label:'战斗', check:{attr:'phy',dc:15}, success:{gold:4,rep:2}, successText:'你打跑了他们，还缴获了他们的钱。', fail:{hp:-25,gold:-5}, failText:'你被打劫了。'},
    {label:'交钱了事', req:{attr:'gold',val:5}, effect:{gold:-5}},
    {label:'逃跑', check:{attr:'phy',dc:12}, success:{}, successText:'你跑得很快。', fail:{hp:-15,gold:-3}, failText:'你被追上了。'}
  ]},
  {title:'流浪诗人', minAge:15, text:['一个诗人在酒馆里唱着一首关于英雄的歌。'], choices:[
    {label:'请他喝酒', req:{attr:'gold',val:2}, effect:{gold:-2,rep:1,karma:1}, text:'他为你唱了一首专属的歌。'},
    {label:'听完就走', effect:{}},
    {label:'和他学唱歌', check:{attr:'int',dc:12}, success:{int:1,charm:1}, successText:'你学会了几首歌。', fail:{}, failText:'你五音不全。'}
  ]},
  {title:'雪夜', minAge:12, text:['大雪封山，你在一个山洞里过夜。'], choices:[
    {label:'生火取暖', check:{attr:'phy',dc:11}, success:{hp:10}, successText:'火光照亮了山洞。', fail:{hp:-10}, failText:'你没生起火，冻了一夜。'},
    {label:'冥想', check:{attr:'mag',dc:13}, success:{mag:2,mp:20}, successText:'你在寒冷中感受到了魔力的流动。', fail:{hp:-5}, failText:'你什么也没感觉到。'}
  ]},
  {title:'孤儿院', minAge:18, text:['你路过一家孤儿院，孩子们在门口玩耍。'], choices:[
    {label:'捐一些钱', req:{attr:'gold',val:5}, effect:{gold:-5,karma:3,rep:1}, text:'孩子们围着你笑。'},
    {label:'陪他们玩', effect:{karma:2,hp:5}, text:'你度过了一个快乐的下午。'},
    {label:'离开', effect:{}}
  ]},
  {title:'神秘商人', minAge:20, text:['一个披着斗篷的商人向你展示一瓶发光的药水："喝下它，你会得到力量。"'], choices:[
    {label:'买下（10 金币）', req:{attr:'gold',val:10}, check:{attr:'mag',dc:14}, success:{gold:-10,mag:3,hp:20}, successText:'药水让你感到前所未有的强大。', fail:{gold:-10,hp:-15}, failText:'药水是假的，你中毒了。'},
    {label:'拒绝', effect:{}},
    {label:'偷走它', check:{attr:'phy',dc:16}, success:{mag:2,gold:5}, successText:'你得手了。', fail:{hp:-15,rep:-2}, failText:'你被发现了。'}
  ]},
  {title:'古墓', minAge:22, text:['你发现了一座半塌的古墓，入口处刻着警告。'], choices:[
    {label:'进去', check:{attr:'int',dc:15}, success:{gold:15,int:2}, successText:'你避开了陷阱，找到了陪葬品。', fail:{hp:-30}, failText:'你触发了机关。'},
    {label:'在外面看看', effect:{int:1}},
    {label:'离开', effect:{}}
  ]},
  {title:'比武大会', minAge:20, text:['城里举办比武大会，冠军有丰厚的奖金。'], choices:[
    {label:'报名参加', check:{attr:'phy',dc:17}, success:{gold:20,rep:5,phy:1}, successText:'你一路过关斩将，夺得冠军！', fail:{hp:-25,rep:1}, failText:'你在半决赛被淘汰了。'},
    {label:'观战', effect:{int:1}},
    {label:'下注', req:{attr:'gold',val:5}, check:{attr:'int',dc:13}, success:{gold:10}, successText:'你押中了冠军。', fail:{gold:-5}, failText:'你押错了。'}
  ]},
  {title:'瘟疫', minAge:18, text:['城里爆发了瘟疫，人心惶惶。'], choices:[
    {label:'留下来帮忙', check:{attr:'mag',dc:15}, success:{karma:5,rep:3}, successText:'你救了很多人的命。', fail:{hp:-30,karma:2}, failText:'你被传染了，但活了下来。'},
    {label:'逃出城', check:{attr:'phy',dc:12}, success:{}, successText:'你逃了出去。', fail:{hp:-20}, failText:'你被拦下了。'},
    {label:'闭门不出', effect:{hp:-5}}
  ]},
  {title:'龙的传说', minAge:25, text:['酒馆里流传着一个消息：北方的山上出现了一条龙。'], choices:[
    {label:'去猎龙', check:{attr:'phy',dc:20}, success:{gold:50,rep:10,title:'屠龙者'}, successText:'你杀死了那条龙，成为了传奇。', fail:{hp:-60}, failText:'你差点死在那里。'},
    {label:'去谈判', check:{attr:'int',dc:18}, success:{gold:20,rep:5}, successText:'你和龙达成了协议。', fail:{hp:-30}, failText:'龙对你喷了一口火。'},
    {label:'不去', effect:{}}
  ]},
  // 种族专属
  {title:'月桂树的低语', race:['elf'], minAge:20, text:['森林深处的月桂树在呼唤你。'], choices:[
    {label:'回应它', check:{attr:'mag',dc:14}, success:{mag:3,int:1}, successText:'你听见了祖先的声音。', fail:{hp:-10}, failText:'你被强大的力量震退了。'},
    {label:'无视', effect:{}}
  ]},
  {title:'熔炉的考验', race:['dwarf'], minAge:18, text:['族中长老要你打造一件传家宝。'], choices:[
    {label:'接受考验', check:{attr:'phy',dc:15}, success:{gold:10,rep:3,phy:1}, successText:'你打造出了一把好剑。', fail:{hp:-15}, failText:'你失败了，长老很失望。'},
    {label:'拒绝', effect:{rep:-2}}
  ]},
  {title:'血怒', race:['orc'], minAge:16, text:['你的血液在沸腾，战斗的渴望难以抑制。'], choices:[
    {label:'释放它', check:{attr:'phy',dc:13}, success:{phy:3,hp:-10}, successText:'你进入了狂怒状态，力量大增。', fail:{hp:-20}, failText:'你失控了，伤害了自己。'},
    {label:'压制它', check:{attr:'int',dc:14}, success:{int:2}, successText:'你学会了控制它。', fail:{hp:-10}, failText:'你勉强压住了。'}
  ]},
  {title:'龙之记忆', race:['dragon'], minAge:20, text:['你梦见了一条巨龙，它说："孩子，回来吧。"'], choices:[
    {label:'追寻记忆', check:{attr:'mag',dc:16}, success:{mag:4,int:2}, successText:'你继承了祖先的部分力量。', fail:{hp:-20}, failText:'记忆太沉重了。'},
    {label:'醒来', effect:{}}
  ]},
  {title:'深渊的召唤', race:['demon'], minAge:18, text:['深渊在呼唤你回去。'], choices:[
    {label:'回应', check:{attr:'mag',dc:15}, success:{mag:3,rep:2}, successText:'你获得了深渊的祝福。', fail:{hp:-25}, failText:'深渊的力量灼伤了你。'},
    {label:'拒绝', effect:{karma:1}}
  ]},
  {title:'圣光试炼', race:['angel'], minAge:18, text:['天界派来使者，要考验你的信仰。'], choices:[
    {label:'接受试炼', check:{attr:'mag',dc:15}, success:{mag:3,karma:3}, successText:'你通过了试炼，圣光更亮了。', fail:{hp:-20}, failText:'你动摇了。'},
    {label:'质疑', effect:{int:2,karma:-1}, text:'你开始怀疑一切。'}
  ]},
  {title:'死亡的记忆', race:['undead'], minAge:16, text:['你梦见自己死前的最后一刻。'], choices:[
    {label:'看清它', check:{attr:'int',dc:14}, success:{int:3,mag:1}, successText:'你想起了生前的一些事。', fail:{hp:-15}, failText:'记忆太痛苦了。'},
    {label:'醒来', effect:{}}
  ]},
  {title:'月下的舞会', race:['fae'], minAge:15, text:['月光下，妖精们邀请你参加舞会。'], choices:[
    {label:'加入', check:{attr:'mag',dc:12}, success:{mag:2,charm:2,hp:10}, successText:'你跳了一整夜，快乐极了。', fail:{hp:-5}, failText:'你被恶作剧了。'},
    {label:'拒绝', effect:{}}
  ]},
  {title:'乡愁', race:['halfling'], minAge:20, text:['你想起了家乡的炉火和面包香。'], choices:[
    {label:'回家看看', effect:{hp:20,karma:1}, text:'家里一切都好。'},
    {label:'寄一封信', effect:{karma:1}, text:'你写了很多话。'}
  ]}
);

/* ---------- 第三批事件 ---------- */
EVENTS.push(
  {title:'迷路的孩子', minAge:12, text:['一个小孩在森林里迷路了，哭得很伤心。'], choices:[
    {label:'送他回家', check:{attr:'int',dc:11}, success:{karma:2,rep:1}, successText:'他的父母感激涕零。', fail:{}, failText:'你们一起迷了路，天亮才找到。'},
    {label:'不管', effect:{karma:-1}}
  ]},
  {title:'酒馆斗殴', minAge:18, text:['酒馆里两拨人打了起来，你被卷了进去。'], choices:[
    {label:'打回去', check:{attr:'phy',dc:13}, success:{rep:1,hp:-5}, successText:'你打退了他们。', fail:{hp:-20}, failText:'你被打得很惨。'},
    {label:'躲到桌子下', check:{attr:'int',dc:10}, success:{}, successText:'你安然无恙。', fail:{hp:-10}, failText:'你还是挨了一拳。'},
    {label:'劝架', check:{attr:'int',dc:15}, success:{rep:2,karma:1}, successText:'你成功平息了冲突。', fail:{hp:-15}, failText:'你被两边一起打了。'}
  ]},
  {title:'神秘的信', minAge:20, text:['你收到一封没有署名的信，上面只写了一个地址。'], choices:[
    {label:'去看看', check:{attr:'int',dc:14}, success:{gold:10,int:1}, successText:'你找到了一个藏起来的宝箱。', fail:{hp:-15}, failText:'这是个陷阱。'},
    {label:'烧掉它', effect:{}}
  ]},
  {title:'落难的贵族', minAge:18, text:['一个衣着华贵的女子被强盗追赶。'], choices:[
    {label:'救她', check:{attr:'phy',dc:14}, success:{gold:15,rep:3}, successText:'她重金酬谢了你。', fail:{hp:-20}, failText:'你没能救下她。'},
    {label:'装作没看见', effect:{karma:-2}}
  ]},
  {title:'魔法失控', minAge:16, text:['你体内的魔力突然失控了。'], choices:[
    {label:'强行压制', check:{attr:'mag',dc:15}, success:{mag:2,int:1}, successText:'你控制住了它。', fail:{hp:-25}, failText:'魔力灼伤了你自己。'},
    {label:'任其释放', check:{attr:'phy',dc:13}, success:{mag:3}, successText:'你因祸得福，魔力大增。', fail:{hp:-30}, failText:'你被自己的力量反噬了。'}
  ]},
  {title:'丰收节', minAge:10, text:['镇上的丰收节到了，到处是欢声笑语。'], choices:[
    {label:'参加庆典', effect:{hp:10,karma:1,rep:1}, text:'你玩得很开心。'},
    {label:'帮忙干活', effect:{gold:3,karma:1}, text:'你挣了几个铜板。'},
    {label:'独自待着', effect:{}}
  ]},
  {title:'受伤的狼', minAge:14, text:['你在森林里发现一只受伤的狼。'], choices:[
    {label:'救它', check:{attr:'mag',dc:12}, success:{karma:2,phy:1}, successText:'它康复后成了你的伙伴。', fail:{hp:-15}, failText:'它咬了你一口。'},
    {label:'杀了它', effect:{gold:2,karma:-1}, text:'你剥下了它的皮。'},
    {label:'离开', effect:{}}
  ]},
  {title:'赌局', minAge:18, text:['一个赌徒邀请你玩一局。'], choices:[
    {label:'赌一把', req:{attr:'gold',val:5}, check:{attr:'int',dc:14}, success:{gold:10}, successText:'你赢了。', fail:{gold:-5}, failText:'你输了。'},
    {label:'拒绝', effect:{}}
  ]},
  {title:'古老石碑', minAge:20, text:['荒野中矗立着一块刻满符文的石碑。'], choices:[
    {label:'研究它', check:{attr:'int',dc:15}, success:{int:2,mag:2}, successText:'你解读出了古老的秘密。', fail:{hp:-10}, failText:'符文灼伤了你的眼睛。'},
    {label:'离开', effect:{}}
  ]},
  {title:'旅店老板娘', minAge:18, text:['旅店老板娘对你格外热情。'], choices:[
    {label:'和她攀谈', check:{attr:'int',dc:12}, success:{rep:1,charm:1}, successText:'她告诉了你很多本地传闻。', fail:{}, failText:'她只是笑了笑。'},
    {label:'早早休息', effect:{hp:10}}
  ]},
  {title:'山崩', minAge:16, text:['山路突然塌方，你被困住了。'], choices:[
    {label:'挖出去', check:{attr:'phy',dc:14}, success:{phy:1}, successText:'你成功脱困。', fail:{hp:-25}, failText:'你被埋了很久。'},
    {label:'等救援', check:{attr:'int',dc:12}, success:{}, successText:'有人来救你了。', fail:{hp:-15}, failText:'你等了很久。'}
  ]},
  {title:'流浪的猫', minAge:10, text:['一只瘦弱的猫跟着你走了很远。'], choices:[
    {label:'收养它', effect:{karma:2,hp:5}, text:'它成了你的伙伴。'},
    {label:'赶走它', effect:{karma:-1}}
  ]},
  {title:'梦境', minAge:14, text:['你做了一个奇怪的梦，梦里有个人对你说："记住我。"'], choices:[
    {label:'努力回想', check:{attr:'int',dc:13}, success:{int:1,mag:1}, successText:'你记住了那个人的脸。', fail:{}, failText:'醒来后什么都忘了。'},
    {label:'不去在意', effect:{}}
  ]},
  {title:'边境哨所', minAge:18, text:['你路过一个边境哨所，士兵们正在招募。'], choices:[
    {label:'应征入伍', check:{attr:'phy',dc:13}, success:{gold:8,rep:2,job:'士兵'}, successText:'你成为了一名士兵。', fail:{}, failText:'他们觉得你不够格。'},
    {label:'路过', effect:{}}
  ]},
  {title:'魔法学院招生', minAge:16, text:['魔法学院在各地招生。'], choices:[
    {label:'去应试', check:{attr:'mag',dc:15}, success:{mag:2,rep:2,job:'魔法学徒'}, successText:'你被录取了。', fail:{}, failText:'你落榜了。'},
    {label:'不感兴趣', effect:{}}
  ]}
);

/* ---------- 扩充事件包（第二批） ---------- */
const EVENTS_MORE = [
  // ===== 童年 6-14 =====
  {title:'井边的回声', minAge:6, maxAge:14, text:['你对着一口枯井喊了一声，回音却比你喊的多了一声。'], choices:[
    {label:'再喊一次', check:{attr:'mag',dc:11}, success:{mag:1}, successText:'第二声回音里，你听见了一个陌生的词。', fail:{hp:-3}, failText:'一阵眩晕，你差点栽进井里。'},
    {label:'往井里丢石头', effect:{int:1}, text:'石头落下去，久久没有声音。'},
    {label:'走开', effect:{}}
  ]},
  {title:'偷苹果', minAge:7, maxAge:16, text:['邻居家的苹果树伸到了墙外，果子红得诱人。'], choices:[
    {label:'翻墙去摘', check:{attr:'phy',dc:10}, success:{hp:3,karma:-1}, successText:'你摘了满满一兜，甜得很。', fail:{hp:-6,karma:-1}, failText:'你摔了下来，还被邻居看见了。'},
    {label:'敲门讨要', check:{attr:'int',dc:9}, success:{karma:1,hp:2}, successText:'老太太笑着给了你两个。', fail:{}, failText:'没人应门。'},
    {label:'算了', effect:{}}
  ]},
  {title:'第一场雪', minAge:6, maxAge:20, text:['今年的第一场雪落下来了，整个村子安静得能听见雪的声音。'], choices:[
    {label:'出门堆雪人', effect:{hp:2,karma:1}, text:'你堆了一个歪歪扭扭的雪人，路过的孩子都笑了。'},
    {label:'坐在窗边看', effect:{int:1}, text:'你想了很多事，有些想明白了。'},
    {label:'练剑/练功', check:{attr:'phy',dc:10}, success:{phy:1}, successText:'雪地里挥汗，身体热了起来。', fail:{hp:-3}, failText:'冻得手脚发麻。'}
  ]},
  {title:'受伤的小鸟', minAge:6, maxAge:18, text:['一只翅膀受伤的鸟落在你脚边。'], choices:[
    {label:'带回家照顾', effect:{karma:2,hp:-1}, text:'几天后它飞走了，临走前在你窗台上停了一会儿。'},
    {label:'不管', effect:{karma:-1}},
    {label:'烤了吃', effect:{hp:3,karma:-3}, text:'味道一般，但你确实饿了。'}
  ]},
  {title:'村里的疯老头', minAge:8, maxAge:20, text:['村口那个疯老头又在对空气说话了。今天他拦住了你。'], choices:[
    {label:'听他讲', check:{attr:'int',dc:12}, success:{int:1,mag:1}, successText:'他说的话乱七八糟，但有一句你记住了。', fail:{}, failText:'你听了半天，什么也没听懂。'},
    {label:'绕开', effect:{}}
  ]},
  {title:'第一次打架', minAge:9, maxAge:18, text:['有人当着所有人的面嘲笑你。'], choices:[
    {label:'动手', check:{attr:'phy',dc:11}, success:{phy:1,rep:1}, successText:'你把他按在了地上。', fail:{hp:-8,rep:-1}, failText:'你被揍得很惨。'},
    {label:'冷笑走开', check:{attr:'int',dc:12}, success:{int:1,rep:1}, successText:'你的眼神让他闭了嘴。', fail:{rep:-1}, failText:'他笑得更欢了。'}
  ]},

  // ===== 青年 16-30 =====
  {title:'酒馆的赌局', minAge:16, text:['几个佣兵在酒馆里摆了个骰子赌局，招呼你过去。'], choices:[
    {label:'押 5 金币', req:{attr:'gold',val:5}, check:{attr:'int',dc:13}, success:{gold:10}, successText:'你赢了，他们拍着桌子叫好。', fail:{gold:-5}, failText:'你输得干干净净。'},
    {label:'只看着', effect:{int:1}, text:'你看了两局，摸清了他们的手法。'},
    {label:'掀桌子', check:{attr:'phy',dc:15}, success:{gold:8,rep:1,karma:-2}, successText:'你抢了钱就跑。', fail:{hp:-15,karma:-2}, failText:'你被几个人按在地上打。'}
  ]},
  {title:'失踪的孩子', minAge:18, text:['镇上一个孩子失踪了，大人们在广场上吵成一团。'], choices:[
    {label:'独自去找', check:{attr:'int',dc:14}, success:{karma:3,rep:2,gold:5}, successText:'你在废弃的磨坊里找到了他，他哭着抱住了你。', fail:{hp:-12,karma:1}, failText:'你找了很久，最后是别人找到的。'},
    {label:'组织大家搜山', check:{attr:'int',dc:13}, success:{rep:2,karma:2}, successText:'你指挥得当，孩子平安归来。', fail:{}, failText:'大家各说各话，耽误了时间。'},
    {label:'不关我事', effect:{karma:-2}}
  ]},
  {title:'雨中的葬礼', minAge:18, text:['一个你认识的老兵死了，葬礼上只有寥寥几个人。'], choices:[
    {label:'留下来送他一程', effect:{karma:2,int:1}, text:'你站在雨里，直到最后一铲土落下。'},
    {label:'献一束花就走', effect:{karma:1}},
    {label:'不去', effect:{}}
  ]},
  {title:'黑市的邀请', minAge:18, text:['一个戴兜帽的人在巷子里拦住你，说有一桩"来钱快"的活。'], choices:[
    {label:'听他说完', check:{attr:'int',dc:12}, success:{gold:6,karma:-2}, successText:'你帮他运了一批货，钱来得很快。', fail:{hp:-10,karma:-1}, failText:'货出了问题，你被追着打。'},
    {label:'拒绝', effect:{karma:1}},
    {label:'举报他', check:{attr:'int',dc:14}, success:{rep:2,gold:3,karma:1}, successText:'卫兵赏了你一笔钱。', fail:{hp:-15}, failText:'他逃了，他的同伙找到了你。'}
  ]},
  {title:'战场来信', minAge:20, text:['一封来自前线的信，字迹潦草，说你的旧友快撑不住了。'], choices:[
    {label:'立刻赶去', check:{attr:'phy',dc:14}, success:{rep:2,karma:2,phy:1}, successText:'你赶到了，把他从死人堆里拖了出来。', fail:{hp:-20}, failText:'你赶到时，已经晚了。'},
    {label:'回信鼓励', effect:{int:1,karma:1}},
    {label:'不去', effect:{karma:-2}}
  ]},
  {title:'魔法暴走', minAge:20, text:['你在施法时失控了，一团火焰从掌心窜了出去。'], choices:[
    {label:'强行压制', check:{attr:'mag',dc:15}, success:{mag:2}, successText:'你压住了它，还摸到了新的门道。', fail:{hp:-18}, failText:'火焰烧伤了你的手臂。'},
    {label:'任其释放', check:{attr:'mag',dc:12}, success:{mag:1,rep:-1}, successText:'火球炸飞了半个屋顶，没人受伤。', fail:{hp:-25,karma:-1}, failText:'火烧到了别人家的房子。'}
  ]},
  {title:'雪夜的行商', minAge:18, text:['一个商队在雪夜里迷了路，敲开了你的门。'], choices:[
    {label:'收留他们', effect:{karma:2,gold:3}, text:'第二天他们留下了一袋货物作为谢礼。'},
    {label:'只给指路', effect:{karma:1}},
    {label:'关门', effect:{karma:-1}}
  ]},

  // ===== 中年 30-80 =====
  {title:'旧友重逢', minAge:30, text:['你在集市上看见了一张熟悉的脸——很多年前的朋友。'], choices:[
    {label:'上前相认', effect:{karma:2,rep:1}, text:'你们在酒馆里聊了一整夜，仿佛从没分开过。'},
    {label:'远远看着', effect:{int:1}, text:'他老了很多，你也是。'},
    {label:'装作没看见', effect:{}}
  ]},
  {title:'领主的征召', minAge:30, text:['领主的使者来到你的门前，要你为一场战争效力。'], choices:[
    {label:'应召', check:{attr:'phy',dc:15}, success:{gold:15,rep:3}, successText:'你立了功，回来时披着领主的旗帜。', fail:{hp:-25}, failText:'你负了重伤，勉强活着回来。'},
    {label:'花钱免役', req:{attr:'gold',val:10}, effect:{gold:-10}, text:'你交了钱，留在了家里。'},
    {label:'拒绝', check:{attr:'int',dc:15}, success:{}, successText:'你说了些话，使者悻悻地走了。', fail:{rep:-2,gold:-5}, failText:'你被罚了一笔钱。'}
  ]},
  {title:'瘟疫', minAge:30, text:['城里爆发了瘟疫，街上到处是焚烧草药的味道。'], choices:[
    {label:'留下来帮忙', check:{attr:'mag',dc:14}, success:{karma:3,rep:2,mag:1}, successText:'你救了不少人。', fail:{hp:-20,karma:1}, failText:'你自己也染上了，差点没挺过来。'},
    {label:'逃出城', check:{attr:'int',dc:12}, success:{}, successText:'你及时离开了。', fail:{hp:-12}, failText:'封城了，你被困在里面。'},
    {label:'闭门不出', effect:{hp:-5}}
  ]},
  {title:'继承的遗产', minAge:35, text:['一个远房亲戚死了，留给你一间破屋和一堆债务。'], choices:[
    {label:'接手', check:{attr:'int',dc:13}, success:{gold:12}, successText:'你变卖了屋子，还清了债，还剩一些。', fail:{gold:-8}, failText:'债务比你想的多得多。'},
    {label:'放弃', effect:{karma:-1}}
  ]},
  {title:'收徒', minAge:40, text:['一个年轻人跪在你门前，求你收他为徒。'], choices:[
    {label:'收下', check:{attr:'int',dc:13}, success:{rep:2,karma:2,gold:4}, successText:'他学得很快，几年后成了你的骄傲。', fail:{gold:-3}, failText:'他学了一半就跑了，还偷了你的东西。'},
    {label:'拒绝', effect:{}}
  ]},
  {title:'古墓的入口', minAge:35, text:['一场地震后，山壁上露出了一道刻满符文的石门。'], choices:[
    {label:'撬开它', check:{attr:'phy',dc:16}, success:{gold:20,mag:1}, successText:'里面是陪葬的财宝，你搬了一部分出来。', fail:{hp:-25,karma:-1}, failText:'机关触发，你被射中了一箭。'},
    {label:'研究符文', check:{attr:'int',dc:16}, success:{int:2,mag:1}, successText:'你读懂了一段失传的历史。', fail:{hp:-10}, failText:'符文灼伤了你的眼睛。'},
    {label:'报告领主', effect:{rep:2,gold:5}}
  ]},
  {title:'一场大火', minAge:30, text:['半夜，你被火光惊醒——隔壁的街区烧起来了。'], choices:[
    {label:'冲进去救人', check:{attr:'phy',dc:15}, success:{karma:3,rep:2}, successText:'你救出了三个人。', fail:{hp:-25,karma:1}, failText:'你被烧伤了，只救出一个。'},
    {label:'帮忙运水', effect:{karma:1,hp:-3}},
    {label:'收拾东西跑', effect:{karma:-1}}
  ]},

  // ===== 老年 / 长寿种族 80+ =====
  {title:'百年的树', minAge:80, text:['你小时候种下的那棵树，如今已经高得看不见顶了。'], choices:[
    {label:'在树下坐一会儿', effect:{int:1,hp:5}, text:'风穿过树叶，像很多年前一样。'},
    {label:'刻上名字', effect:{karma:1}, text:'你在树皮上刻下自己的名字，旁边是许多别人的名字。'}
  ]},
  {title:'又一代人', minAge:80, text:['你看着一个孩子的孩子长大，忽然意识到自己已经活得比大多数人都久了。'], choices:[
    {label:'把故事讲给他们听', effect:{karma:2,rep:1}, text:'孩子们围坐在你脚边，眼睛亮亮的。'},
    {label:'独自沉默', effect:{int:1}, text:'有些事，说出来就不一样了。'}
  ]},
  {title:'老对手', minAge:80, text:['一个你以为早就死了的人，出现在你面前。'], choices:[
    {label:'了结旧账', check:{attr:'phy',dc:16}, success:{rep:2,phy:1}, successText:'你赢了，但没杀他。', fail:{hp:-30}, failText:'你输了，他放过了你。'},
    {label:'一笑泯恩仇', effect:{karma:2,int:1}, text:'你们坐下来喝了杯酒，谁也没提当年的事。'},
    {label:'转身离开', effect:{}}
  ]},
  {title:'世界的尽头', minAge:100, text:['你走到了地图上标注"此处之外，无人知晓"的地方。'], choices:[
    {label:'继续往前走', check:{attr:'mag',dc:18}, success:{mag:3,int:2}, successText:'你看见了不该看见的东西，也理解了不该理解的事。', fail:{hp:-30}, failText:'你被某种力量推了回来。'},
    {label:'停下脚步', effect:{int:2}, text:'你站在边界上，看了很久很久。'}
  ]},
  {title:'传承', minAge:100, text:['你意识到，自己已经成了别人口中的"传说"。'], choices:[
    {label:'写下回忆录', effect:{int:2,rep:2}, text:'你写了很多，有些是真的，有些是你希望是真的。'},
    {label:'隐姓埋名', effect:{karma:1}, text:'你搬到了一个没人认识你的地方。'}
  ]},
  {title:'一场梦里的战争', minAge:120, text:['你梦见自己又回到了年轻时的战场，只是这次，所有人都还活着。'], choices:[
    {label:'在梦里留下', check:{attr:'mag',dc:17}, success:{mag:2,int:1}, successText:'你在梦里学会了一件事。', fail:{hp:-15}, failText:'醒来时，枕头湿了。'},
    {label:'醒来', effect:{hp:5}}
  ]},

  // ===== 通用小事件（任何年龄）=====
  {title:'路边的乞丐', minAge:10, text:['一个乞丐向你伸出手。'], choices:[
    {label:'给一枚金币', req:{attr:'gold',val:1}, effect:{gold:-1,karma:2}, text:'他连声道谢。'},
    {label:'给点吃的', effect:{karma:1,hp:-1}},
    {label:'视而不见', effect:{karma:-1}}
  ]},
  {title:'迷路的旅人', minAge:12, text:['一个旅人在岔路口发愁。'], choices:[
    {label:'带他走一段', effect:{karma:1,hp:-2}, text:'他临走前给了你一个地址。'},
    {label:'指个方向', effect:{}},
    {label:'骗他走错路', effect:{karma:-2}, text:'你看着他走向了相反的方向。'}
  ]},
  {title:'月圆之夜', minAge:14, text:['月亮大得不像话，你睡不着。'], choices:[
    {label:'出门走走', check:{attr:'mag',dc:12}, success:{mag:1}, successText:'月光下，你看见了一些平时看不见的东西。', fail:{}, failText:'只是普通的夜路。'},
    {label:'继续躺着', effect:{hp:3}}
  ]},
  {title:'一场赌约', minAge:16, text:['有人跟你打赌，说你不敢做某件事。'], choices:[
    {label:'接下赌约', check:{attr:'phy',dc:13}, success:{gold:6,rep:1}, successText:'你做到了，对方乖乖掏钱。', fail:{hp:-10,rep:-1}, failText:'你摔了个大跟头，成了笑柄。'},
    {label:'不接', effect:{}}
  ]},
  {title:'流浪的乐师', minAge:12, text:['一个乐师在广场上弹琴，围了不少人。'], choices:[
    {label:'听完再走', effect:{hp:2,karma:1}, text:'音乐让人心里松快。'},
    {label:'丢一枚金币', req:{attr:'gold',val:1}, effect:{gold:-1,karma:2,rep:1}, text:'他朝你鞠了一躬。'},
    {label:'走开', effect:{}}
  ]},
  {title:'旧书摊', minAge:14, text:['一个旧书摊上，有本书的封面在发光。'], choices:[
    {label:'买下来（5 金币）', req:{attr:'gold',val:5}, check:{attr:'int',dc:12}, success:{gold:-5,int:1,mag:2}, successText:'书里夹着一张手绘的法阵图。', fail:{gold:-5}, failText:'只是一本普通的旧书。'},
    {label:'翻两页就走', effect:{int:1}},
    {label:'偷走', check:{attr:'phy',dc:14}, success:{mag:1,karma:-2}, successText:'你揣进怀里溜了。', fail:{hp:-8,karma:-2}, failText:'摊主一把抓住了你的手腕。'}
  ]},
  {title:'雪崩', minAge:20, text:['山顶传来一声闷响，白色的墙朝你压下来。'], choices:[
    {label:'往侧面跑', check:{attr:'phy',dc:15}, success:{phy:1}, successText:'你堪堪避开了。', fail:{hp:-25}, failText:'你被埋了半截。'},
    {label:'找掩体', check:{attr:'int',dc:14}, success:{}, successText:'你躲在一块巨岩后面。', fail:{hp:-20}, failText:'掩体不够结实。'}
  ]},
  {title:'赌场', minAge:18, text:['一家赌场灯火通明，门口站着两个彪形大汉。'], choices:[
    {label:'进去试试手气', req:{attr:'gold',val:10}, check:{attr:'int',dc:15}, success:{gold:25}, successText:'你连赢三把，被请了出去。', fail:{gold:-10}, failText:'你输光了带进去的钱。'},
    {label:'路过', effect:{}}
  ]},
  {title:'一场婚礼', minAge:16, text:['你被邀请参加一场婚礼。'], choices:[
    {label:'送上祝福', effect:{karma:1,rep:1}, text:'新人朝你笑了笑。'},
    {label:'喝个痛快', effect:{hp:-3,rep:1}, text:'你喝多了，在院子里睡了一夜。'},
    {label:'不去', effect:{}}
  ]},
  {title:'一封没有署名的信', minAge:20, text:['信里只有一句话："你欠我的，该还了。"'], choices:[
    {label:'追查来源', check:{attr:'int',dc:15}, success:{int:1,gold:5}, successText:'你找到了写信的人，是个你早就忘了的旧账。', fail:{hp:-10}, failText:'你被引到了一个陷阱里。'},
    {label:'烧掉', effect:{}},
    {label:'离开这座城', effect:{karma:-1,gold:-5}, text:'你连夜收拾东西走了。'}
  ]},
  {title:'山中的温泉', minAge:18, text:['你在山里发现了一处冒着热气的温泉。'], choices:[
    {label:'泡一泡', effect:{hp:15}, text:'泡完之后，浑身的酸痛都消了。'},
    {label:'看看有没有人', check:{attr:'int',dc:11}, success:{}, successText:'四下无人。', fail:{hp:-5}, failText:'你踩到了一块滑石。'}
  ]},
  {title:'一场辩论', minAge:20, text:['广场上有人在辩论神是否真的存在。'], choices:[
    {label:'加入辩论', check:{attr:'int',dc:14}, success:{int:2,rep:1}, successText:'你把对方说得哑口无言。', fail:{rep:-1}, failText:'你被驳得体无完肤。'},
    {label:'听着', effect:{int:1}}
  ]},
  {title:'被偷的钱袋', minAge:14, text:['你摸了摸腰间，钱袋不见了。'], choices:[
    {label:'追上去', check:{attr:'phy',dc:13}, success:{gold:5}, successText:'你抓住了小偷，要回了钱。', fail:{hp:-8}, failText:'你追丢了，还摔了一跤。'},
    {label:'认栽', effect:{gold:-5}}
  ]},
  {title:'一只黑猫', minAge:10, text:['一只黑猫跟着你走了三条街。'], choices:[
    {label:'蹲下来摸摸它', check:{attr:'mag',dc:12}, success:{mag:1,karma:1}, successText:'它的眼睛里有星图。', fail:{}, failText:'它蹭了蹭你，走了。'},
    {label:'赶走', effect:{}}
  ]},
  {title:'暴风雨中的灯塔', minAge:20, text:['你在海边遇上了暴风雨，灯塔的光忽明忽暗。'], choices:[
    {label:'去点亮灯塔', check:{attr:'mag',dc:15}, success:{karma:3,rep:2,mag:1}, successText:'船队看见了光，平安靠岸。', fail:{hp:-20}, failText:'你被浪打倒了。'},
    {label:'找地方躲雨', effect:{hp:-5}}
  ]},
  {title:'一场梦', minAge:12, text:['你梦见自己站在一片没有边界的白地上。'], choices:[
    {label:'往前走', check:{attr:'int',dc:13}, success:{int:1}, successText:'你看见了一扇门。', fail:{hp:-5}, failText:'你掉进了虚空。'},
    {label:'醒来', effect:{}}
  ]},
  {title:'旧伤复发', minAge:40, text:['年轻时留下的旧伤在阴雨天又开始疼了。'], choices:[
    {label:'找医师', req:{attr:'gold',val:5}, effect:{gold:-5,hp:10}, text:'医师给你敷了药，好多了。'},
    {label:'忍着', effect:{hp:-8}},
    {label:'用魔法压制', check:{attr:'mag',dc:13}, success:{hp:5}, successText:'疼痛暂时消退了。', fail:{hp:-12}, failText:'魔力反噬，更疼了。'}
  ]},
  {title:'徒弟的背叛', minAge:45, text:['你教出来的人，带着你所有的秘密投靠了你的敌人。'], choices:[
    {label:'亲自去追', check:{attr:'phy',dc:16}, success:{rep:2,gold:10}, successText:'你把他揪了回来。', fail:{hp:-20,rep:-1}, failText:'他跑了，还伤了你。'},
    {label:'算了', effect:{int:1,karma:1}, text:'你只是叹了口气。'}
  ]},
  {title:'一场雪', minAge:30, text:['雪下了一整夜，早上推开门，世界白得刺眼。'], choices:[
    {label:'在雪地里走很久', effect:{int:1,hp:-2}, text:'你想通了一些事。'},
    {label:'生火取暖', effect:{hp:5}}
  ]},
  {title:'陌生人递来的酒', minAge:18, text:['酒馆里，一个陌生人把一杯酒推到你面前。'], choices:[
    {label:'喝下去', check:{attr:'phy',dc:13}, success:{hp:5,rep:1}, successText:'酒很好，你们聊得投机。', fail:{hp:-15}, failText:'酒里有东西，你昏了过去。'},
    {label:'推开', effect:{}}
  ]},
  {title:'悬崖边的人', minAge:20, text:['你看见一个人站在悬崖边上，一动不动。'], choices:[
    {label:'走过去劝他', check:{attr:'int',dc:14}, success:{karma:3}, successText:'他哭了很久，最后跟着你下了山。', fail:{karma:1}, failText:'他什么也没说，转身走了。'},
    {label:'报警', effect:{karma:1}}
  ]},
  {title:'一场拍卖', minAge:25, text:['拍卖会上，一件据说是古代圣物的东西正在被叫价。'], choices:[
    {label:'参与竞拍', req:{attr:'gold',val:20}, check:{attr:'int',dc:15}, success:{gold:-20,mag:2,rep:1}, successText:'你拍下了它，它确实有些特别。', fail:{gold:-20}, failText:'你花了大价钱，买了个赝品。'},
    {label:'看着', effect:{int:1}}
  ]},
  {title:'森林深处', minAge:18, text:['你迷路了，森林深处传来某种声音。'], choices:[
    {label:'循声而去', check:{attr:'mag',dc:15}, success:{mag:2}, successText:'你遇见了一个古老的灵体，它教了你一些东西。', fail:{hp:-18}, failText:'那是个陷阱，你差点没出来。'},
    {label:'原地等天亮', check:{attr:'phy',dc:12}, success:{}, successText:'你熬过了一夜。', fail:{hp:-10}, failText:'你冻了一夜，还遇上了野兽。'}
  ]},
  {title:'一个承诺', minAge:20, text:['你曾答应过某个人一件事，如今期限到了。'], choices:[
    {label:'履行承诺', effect:{karma:3,rep:1}, text:'你做到了，虽然代价不小。'},
    {label:'食言', effect:{karma:-3,rep:-1}, text:'你转过身，没有回头。'}
  ]},
  {title:'流浪的剑客', minAge:18, text:['一个背着旧剑的人在你面前停下，说要和你切磋。'], choices:[
    {label:'应战', check:{attr:'phy',dc:14}, success:{phy:2,rep:1}, successText:'你赢了，他笑着走了。', fail:{hp:-15,phy:1}, failText:'你输了，但学到了东西。'},
    {label:'拒绝', effect:{}}
  ]},
  {title:'一场梦里的婚礼', minAge:25, text:['你梦见自己站在祭坛前，对面的人面目模糊。'], choices:[
    {label:'在梦里说"我愿意"', check:{attr:'mag',dc:14}, success:{mag:1,karma:1}, successText:'醒来时，你记得那个人的手很暖。', fail:{hp:-5}, failText:'你惊醒过来，心跳得厉害。'},
    {label:'醒来', effect:{}}
  ]},
  {title:'一个孩子的提问', minAge:30, text:['一个孩子问你："人为什么会死？"'], choices:[
    {label:'认真回答', effect:{karma:2,int:1}, text:'你说了很久，孩子似懂非懂地点了点头。'},
    {label:'敷衍过去', effect:{}}
  ]},
  {title:'旧地图', minAge:20, text:['你在一堆旧物里翻出一张地图，上面标着一个从未听说过的地名。'], choices:[
    {label:'按图索骥', check:{attr:'int',dc:15}, success:{gold:15,mag:1}, successText:'你找到了一个废弃的宝库。', fail:{hp:-15}, failText:'你走了很久，什么也没找到。'},
    {label:'收起来', effect:{}}
  ]},
  {title:'一场雪崩后的寂静', minAge:40, text:['灾难过后，山谷里安静得可怕。'], choices:[
    {label:'去救人', check:{attr:'phy',dc:15}, success:{karma:3,rep:2}, successText:'你从雪里挖出了两个人。', fail:{hp:-20,karma:1}, failText:'你只挖出了一具尸体。'},
    {label:'离开', effect:{}}
  ]},
  {title:'一个老朋友的信', minAge:35, text:['信里说他快不行了，想见你最后一面。'], choices:[
    {label:'赶去', check:{attr:'phy',dc:13}, success:{karma:2,int:1}, successText:'你赶上了，他握着你的手笑了。', fail:{karma:1}, failText:'你去晚了。'},
    {label:'回信', effect:{karma:1}}
  ]},
  {title:'一场梦里的雨', minAge:50, text:['梦里下着雨，你在雨里走了很久，不知道要去哪里。'], choices:[
    {label:'继续走', check:{attr:'int',dc:14}, success:{int:1}, successText:'你看见了一盏灯。', fail:{hp:-5}, failText:'你一直在原地打转。'},
    {label:'醒来', effect:{hp:3}}
  ]}
];

/* ---------- 扩充支线包 ---------- */
const SUBS_MORE = [
  {id:'m1', title:'井底的孩子', minAge:8, text:['村里的孩子说，井底住着一个人。'], choices:[
    {label:'下井去看', check:{attr:'phy',dc:12}, success:{karma:2,mag:1}, successText:'井底是个废弃的地窖，里面有个吓坏了的孩子。', fail:{hp:-12}, failText:'绳子断了，你摔了下去。'},
    {label:'告诉大人', effect:{karma:1}},
    {label:'不管', effect:{karma:-1}}
  ]},
  {id:'m2', title:'会说话的乌鸦', minAge:12, text:['一只乌鸦落在你窗台上，开口说了人话。'], choices:[
    {label:'听它说', check:{attr:'int',dc:13}, success:{int:1,mag:1}, successText:'它说了一个地名，还有一句话："别去。"', fail:{hp:-5}, failText:'它啄了你的手，飞走了。'},
    {label:'赶走它', effect:{}}
  ]},
  {id:'m3', title:'消失的商队', minAge:20, text:['一支商队在官道上凭空消失了，只留下车辙。'], choices:[
    {label:'追查', check:{attr:'int',dc:15}, success:{gold:18,rep:2}, successText:'你找到了劫匪的窝点，救出了人。', fail:{hp:-20}, failText:'你被埋伏了。'},
    {label:'报告官府', effect:{rep:1}}
  ]},
  {id:'m4', title:'镜中的另一个人', minAge:18, text:['你照镜子时，镜中的自己慢了半拍才动。'], choices:[
    {label:'和它说话', check:{attr:'mag',dc:16}, success:{mag:2,int:1}, successText:'它告诉了你一个秘密。', fail:{hp:-18}, failText:'它伸手抓住了你。'},
    {label:'砸碎镜子', effect:{hp:-3}}
  ]},
  {id:'m5', title:'荒村', minAge:22, text:['你路过一个村子，家家户户门都开着，却一个人也没有。'], choices:[
    {label:'留下来过夜', check:{attr:'mag',dc:15}, success:{mag:2,gold:8}, successText:'夜里你看见了真相，也带走了一些东西。', fail:{hp:-25}, failText:'你被某种东西追了一整夜。'},
    {label:'连夜离开', effect:{hp:-5}}
  ]},
  {id:'m6', title:'一枚戒指', minAge:16, text:['你在河边捡到一枚刻着名字的戒指。'], choices:[
    {label:'寻找失主', check:{attr:'int',dc:13}, success:{karma:3,rep:2,gold:5}, successText:'失主是个富商，重谢了你。', fail:{}, failText:'你没找到人。'},
    {label:'留下', effect:{gold:3,karma:-1}}
  ]},
  {id:'m7', title:'地下的歌声', minAge:25, text:['夜里，你听见地板下传来歌声。'], choices:[
    {label:'挖开地板', check:{attr:'phy',dc:14}, success:{mag:2,karma:1}, successText:'地下有个被封住的房间，歌声来自一枚旧留声机。', fail:{hp:-15}, failText:'地板塌了，你掉了下去。'},
    {label:'装作没听见', effect:{}}
  ]},
  {id:'m8', title:'被诅咒的剑', minAge:25, text:['一把剑插在石头上，周围寸草不生。'], choices:[
    {label:'拔出来', check:{attr:'phy',dc:17}, success:{phy:3,rep:2,mag:1}, successText:'剑出鞘时，你听见了一声叹息。', fail:{hp:-25}, failText:'剑纹丝不动，反震伤了你的手。'},
    {label:'离开', effect:{}}
  ]},
  {id:'m9', title:'一个陌生人的葬礼', minAge:30, text:['你被邀请参加一个你完全不认识的人的葬礼。'], choices:[
    {label:'去', check:{attr:'int',dc:14}, success:{int:1,gold:10}, successText:'遗嘱里居然有你的名字。', fail:{}, failText:'你白跑了一趟。'},
    {label:'不去', effect:{}}
  ]},
  {id:'m10', title:'森林里的教堂', minAge:28, text:['森林深处有一座没有神像的教堂。'], choices:[
    {label:'进去祈祷', check:{attr:'mag',dc:15}, success:{mag:2,hp:10}, successText:'你感到某种东西回应了你。', fail:{hp:-10}, failText:'里面什么也没有。'},
    {label:'在门口看看', effect:{int:1}}
  ]},
  {id:'m11', title:'老友的遗物', minAge:35, text:['一个旧友死了，他的家人把一个盒子交给你。'], choices:[
    {label:'打开', check:{attr:'int',dc:14}, success:{int:2,gold:12}, successText:'里面是一份地图和一笔钱。', fail:{hp:-12}, failText:'盒子里有机关。'},
    {label:'原封不动埋了', effect:{karma:2}}
  ]},
  {id:'m12', title:'一场没有观众的戏', minAge:30, text:['剧院里空无一人，舞台上却有人在演。'], choices:[
    {label:'坐下来看', check:{attr:'int',dc:14}, success:{int:2}, successText:'戏演完了，演员朝你鞠了一躬，然后消失了。', fail:{hp:-8}, failText:'你睡着了，醒来时天亮了。'},
    {label:'上台', check:{attr:'mag',dc:16}, success:{mag:2,rep:1}, successText:'你成了戏的一部分。', fail:{hp:-15}, failText:'你被赶下了台。'}
  ]},
  {id:'m13', title:'海边的瓶子', minAge:20, text:['一个封着蜡的瓶子被冲上了岸。'], choices:[
    {label:'打开', check:{attr:'int',dc:13}, success:{gold:10,rep:1}, successText:'里面是一张藏宝图。', fail:{}, failText:'里面只有一封看不懂的信。'},
    {label:'放回海里', effect:{karma:1}}
  ]},
  {id:'m14', title:'一个自称是你的人', minAge:30, text:['有人到处说，他才是你。'], choices:[
    {label:'当面对质', check:{attr:'int',dc:15}, success:{rep:2,int:1}, successText:'你揭穿了他，围观的人都站在你这边。', fail:{rep:-2}, failText:'他比你能说。'},
    {label:'不理', effect:{}}
  ]},
  {id:'m15', title:'一场雪中的告别', minAge:40, text:['你要送走一个很重要的人。'], choices:[
    {label:'送到最后', effect:{karma:2,int:1}, text:'你一直站到看不见为止。'},
    {label:'提前离开', effect:{karma:-1}}
  ]},
  {id:'m16', title:'地底的钟声', minAge:40, text:['每隔一百年，地底会传来一次钟声。今年是第一百次。'], choices:[
    {label:'循声而去', check:{attr:'mag',dc:17}, success:{mag:3,int:2,rep:2}, successText:'你看见了时间的形状。', fail:{hp:-30}, failText:'你被震得七窍流血。'},
    {label:'留在地上', effect:{int:1}}
  ]},
  {id:'m17', title:'最后一棵树', minAge:60, text:['这片林子里最后一棵老树也要被砍了。'], choices:[
    {label:'阻止砍伐', check:{attr:'int',dc:15}, success:{karma:3,rep:2}, successText:'你保住了它。', fail:{hp:-10,karma:1}, failText:'你还是没能拦住。'},
    {label:'买下这片地', req:{attr:'gold',val:30}, effect:{gold:-30,karma:3,rep:2}}
  ]},
  {id:'m18', title:'一个孩子的名字', minAge:50, text:['有人要给新生的孩子取你的名字。'], choices:[
    {label:'答应', effect:{rep:2,karma:2}, text:'你成了某种象征。'},
    {label:'拒绝', effect:{}}
  ]},
  {id:'m19', title:'旧日战场的遗骸', minAge:60, text:['你回到了年轻时打仗的地方，白骨还散在草丛里。'], choices:[
    {label:'埋葬他们', check:{attr:'phy',dc:13}, success:{karma:3,int:1}, successText:'你挖了三天三夜。', fail:{hp:-15,karma:1}, failText:'你累倒了。'},
    {label:'离开', effect:{karma:-1}}
  ]},
  {id:'m20', title:'一个请求', minAge:80, text:['一个年轻人跪在你面前，求你教他如何不死。'], choices:[
    {label:'告诉他真相', check:{attr:'int',dc:15}, success:{karma:2,int:2}, successText:'他哭了，然后走了。', fail:{rep:-1}, failText:'他不信，恨上了你。'},
    {label:'骗他', effect:{karma:-2}}
  ]},
  {id:'m21', title:'一座空城', minAge:100, text:['你回到出生的地方，那里已经没有人了。'], choices:[
    {label:'住下来', effect:{int:2,hp:5}, text:'你在旧屋的废墟上盖了一间小屋。'},
    {label:'离开', effect:{int:1}}
  ]},
  {id:'m22', title:'最后一位旧识', minAge:120, text:['你认识的人里，只剩下一个还活着。'], choices:[
    {label:'去见他', check:{attr:'phy',dc:12}, success:{karma:2,int:2}, successText:'你们什么也没说，只是坐着。', fail:{}, failText:'你去晚了。'},
    {label:'写信', effect:{int:1}}
  ]},
  {id:'m23', title:'一场梦的尽头', minAge:150, text:['你梦见自己走完了所有的路，前面是一扇门。'], choices:[
    {label:'推开门', check:{attr:'mag',dc:18}, success:{mag:3,int:3}, successText:'门后是你自己的记忆。', fail:{hp:-20}, failText:'门推不开。'},
    {label:'坐下来', effect:{int:2,hp:10}}
  ]},
  {id:'m24', title:'一个传说的诞生', minAge:150, text:['你发现自己已经成了酒馆里讲的故事。'], choices:[
    {label:'去听一听', effect:{rep:2,int:1}, text:'故事里的你比真实的你厉害多了。'},
    {label:'纠正他们', check:{attr:'int',dc:14}, success:{rep:1,karma:1}, successText:'他们更爱听了。', fail:{rep:-1}, failText:'他们觉得你在吹牛。'}
  ]}
];

/* ---------- 主线追加章节 ---------- */
const MAIN_EXTRA = {
  human: [
    {title:'余烬', minAge:55, text:['你已经不再年轻。','一天夜里，一个和你当年一样的孩子敲开了你的门，说他要去王都。'], choices:[
      {label:'给他一枚铜币', effect:{karma:3,rep:1}, text:'"活着回来。"你说。'},
      {label:'给他讲你的故事', check:{attr:'int',dc:14}, success:{int:2,rep:2}, successText:'他听得眼睛发亮。', fail:{}, failText:'他听得睡着了。'},
      {label:'劝他留下', effect:{karma:1}, text:'他没听。'}
    ]},
    {title:'最后一课', minAge:65, text:['你开始教村里的孩子识字。','他们问你："你年轻的时候是什么样的？"'], choices:[
      {label:'如实说', effect:{karma:2,int:2}, text:'他们听完，沉默了很久。'},
      {label:'讲成故事', check:{attr:'int',dc:13}, success:{rep:3}, successText:'这个故事后来传遍了整个王国。', fail:{}, failText:'你讲砸了。'}
    ]}
  ],
  elf: [
    {title:'森林的低语', minAge:60, text:['你在森林里住了几十年，树木开始对你说话了。'], choices:[
      {label:'倾听', check:{attr:'mag',dc:16}, success:{mag:3,int:2}, successText:'你听见了森林的记忆。', fail:{hp:-15}, failText:'声音太杂，你头痛欲裂。'},
      {label:'封住耳朵', effect:{int:1}}
    ]},
    {title:'同族的葬礼', minAge:100, text:['你送走了第一个同龄的朋友。','精灵的葬礼没有哭声，只有歌声。'], choices:[
      {label:'唱完那首歌', effect:{karma:2,mag:2}, text:'你的声音在林间回荡了很久。'},
      {label:'中途离开', effect:{int:2}, text:'你走开了，一个人待了很久。'}
    ]},
    {title:'千年的门', minAge:200, text:['森林最深处有一道门，只有活过千年的精灵才能看见。'], choices:[
      {label:'推开它', check:{attr:'mag',dc:20}, success:{mag:5,int:3,rep:3}, successText:'门后是精灵一族的起源。', fail:{hp:-40}, failText:'你被弹了回来，浑身是血。'},
      {label:'守在门前', effect:{mag:2,karma:2}, text:'你成了守门人。'}
    ]},
    {title:'落叶归根', minAge:400, text:['你活了太久，久到已经记不清自己最初的样子。'], choices:[
      {label:'回到出生的那棵树', effect:{int:3,karma:3}, text:'你在树下坐了很久，然后闭上了眼睛。'},
      {label:'继续走下去', effect:{mag:2,hp:10}, text:'你站起来，朝森林外走去。'}
    ]}
  ],
  dwarf: [
    {title:'深处的回声', minAge:60, text:['你在矿脉深处听见了敲击声，规律得像心跳。'], choices:[
      {label:'挖下去', check:{attr:'phy',dc:16}, success:{gold:25,phy:2}, successText:'你挖到了一条从未被记载的矿脉。', fail:{hp:-25}, failText:'矿道塌了，你被埋了半日。'},
      {label:'封住矿道', effect:{int:2,karma:1}}
    ]},
    {title:'锻造大师', minAge:100, text:['族里要选出一位新的锻造大师。'], choices:[
      {label:'参赛', check:{attr:'phy',dc:18}, success:{rep:5,gold:20,title:'锻造大师'}, successText:'你打出的剑被供进了祖庙。', fail:{rep:-1,hp:-15}, failText:'你的作品在最后一刻裂开了。'},
      {label:'支持别人', effect:{karma:2,rep:1}}
    ]},
    {title:'山的记忆', minAge:200, text:['矮人的山会记住每一个族人。今天，山对你说话了。'], choices:[
      {label:'回应它', check:{attr:'int',dc:17}, success:{int:3,phy:2,mag:2}, successText:'你知道了族里所有的秘密。', fail:{hp:-20}, failText:'山沉默了。'},
      {label:'沉默', effect:{phy:1}}
    ]}
  ],
  orc: [
    {title:'部落的裂痕', minAge:40, text:['部落里年轻的一代想要离开，去城市里生活。'], choices:[
      {label:'支持他们', check:{attr:'int',dc:15}, success:{rep:3,karma:2}, successText:'部落开始改变。', fail:{rep:-2}, failText:'长老们把你赶出了议事厅。'},
      {label:'镇压', check:{attr:'phy',dc:16}, success:{rep:2,karma:-2}, successText:'没人再敢提。', fail:{hp:-20}, failText:'你被围住了。'}
    ]},
    {title:'最后一场决斗', minAge:80, text:['一个年轻的战士向你挑战，要夺取你的地位。'], choices:[
      {label:'应战', check:{attr:'phy',dc:17}, success:{rep:4,phy:2}, successText:'你赢了，但你知道自己老了。', fail:{hp:-30,rep:-2}, failText:'你输了，让出了位置。'},
      {label:'让位', effect:{karma:2,int:2}, text:'你把武器交给了他。'}
    ]},
    {title:'荒原的尽头', minAge:150, text:['你走到了荒原的尽头，那里什么也没有。'], choices:[
      {label:'在这里终老', effect:{phy:2,int:2,karma:2}, text:'你在这里搭了个棚子。'},
      {label:'回去', effect:{rep:2}}
    ]}
  ],
  halfling: [
    {title:'远方的来信', minAge:50, text:['一封来自你年轻时旅伴的信，说他快不行了。'], choices:[
      {label:'赶去', check:{attr:'phy',dc:13}, success:{karma:3,int:1}, successText:'你赶上了。', fail:{karma:1}, failText:'你去晚了。'},
      {label:'回信', effect:{karma:1}}
    ]},
    {title:'一场盛宴', minAge:80, text:['你办了一场宴席，请了全村的人。'], choices:[
      {label:'讲个故事', check:{attr:'int',dc:13}, success:{rep:3,karma:2}, successText:'大家笑得前仰后合。', fail:{}, failText:'你忘词了。'},
      {label:'安静地吃', effect:{hp:10,karma:1}}
    ]},
    {title:'小小的永恒', minAge:120, text:['你活得比任何一个同族都久。'], choices:[
      {label:'把家传的食谱写下来', effect:{int:2,karma:3}, text:'这本食谱后来传了很多代。'},
      {label:'继续过日子', effect:{hp:10}}
    ]}
  ],
  dragon: [
    {title:'第一次沉睡', minAge:80, text:['龙的血脉让你开始感到困倦，你知道这是沉睡的前兆。'], choices:[
      {label:'找一处山洞睡下', check:{attr:'mag',dc:16}, success:{mag:3,phy:2}, successText:'你睡了三十年，醒来时强大了许多。', fail:{hp:-20}, failText:'你睡得很不安稳。'},
      {label:'强撑着不睡', check:{attr:'phy',dc:17}, success:{phy:2}, successText:'你撑住了。', fail:{hp:-30}, failText:'你在半路上倒下了。'}
    ]},
    {title:'龙的审判', minAge:200, text:['古龙议会召见了你，要审判你与凡人走得太近。'], choices:[
      {label:'为自己辩护', check:{attr:'int',dc:18}, success:{rep:4,int:3}, successText:'议会接受了你。', fail:{hp:-30,rep:-2}, failText:'你被逐出了龙族。'},
      {label:'低头认罪', effect:{mag:2,karma:-1}},
      {label:'挑战议会', check:{attr:'phy',dc:22}, success:{rep:8,phy:4,title:'龙之王'}, successText:'你击败了长老。', fail:{hp:-50}, failText:'你被烧成了重伤。'}
    ]},
    {title:'千年的沉睡', minAge:500, text:['你终于要睡一场很长的觉了。'], choices:[
      {label:'睡下', effect:{mag:5,phy:5}, text:'你闭上眼睛，世界安静了下来。'},
      {label:'再飞一次', effect:{rep:3,mag:2}, text:'你在云层之上飞了整整一天。'}
    ]}
  ],
  demon: [
    {title:'契约的代价', minAge:50, text:['你当年签下的契约开始索取代价。'], choices:[
      {label:'履行', check:{attr:'mag',dc:16}, success:{mag:3,karma:1}, successText:'你付出了代价，也获得了力量。', fail:{hp:-30}, failText:'代价比你想的重。'},
      {label:'毁约', check:{attr:'int',dc:18}, success:{mag:4,int:2,karma:-2}, successText:'你骗过了契约。', fail:{hp:-40}, failText:'契约反噬，你差点灰飞烟灭。'}
    ]},
    {title:'深渊的召唤', minAge:150, text:['深渊在召唤你回去。'], choices:[
      {label:'回去', effect:{mag:4,rep:2}, text:'你回到了故乡，那里比你想的冷。'},
      {label:'拒绝', check:{attr:'int',dc:17}, success:{int:3,karma:2}, successText:'你斩断了联系。', fail:{hp:-25}, failText:'深渊留下了印记。'}
    ]},
    {title:'恶魔的黄昏', minAge:400, text:['你活了太久，连恶魔都开始敬畏你。'], choices:[
      {label:'成为传说', effect:{rep:5,mag:3}, text:'你的名字成了禁忌。'},
      {label:'隐去', effect:{int:3,karma:2}, text:'你消失在了人群里。'}
    ]}
  ],
  angel: [
    {title:'翅膀的重量', minAge:60, text:['你的翅膀开始变得沉重，那是信仰动摇的征兆。'], choices:[
      {label:'祈祷', check:{attr:'mag',dc:15}, success:{mag:3,karma:2}, successText:'光重新充满了你。', fail:{hp:-15}, failText:'没有回应。'},
      {label:'去人间走走', effect:{int:2,karma:1}}
    ]},
    {title:'审判日', minAge:200, text:['天上传来号角声，审判日到了。'], choices:[
      {label:'站在天上这边', check:{attr:'mag',dc:18}, success:{mag:4,rep:4}, successText:'你成了审判者之一。', fail:{hp:-30}, failText:'你被剥夺了羽翼。'},
      {label:'站在人间这边', check:{attr:'int',dc:18}, success:{karma:5,int:3}, successText:'你选择了怜悯。', fail:{hp:-40,rep:-3}, failText:'你被逐出了天国。'}
    ]},
    {title:'坠落与升起', minAge:500, text:['你终于明白，光与暗本是一体。'], choices:[
      {label:'接受', effect:{mag:4,int:4,karma:3}, text:'你的翅膀变成了灰色。'},
      {label:'拒绝', effect:{mag:3,rep:2}}
    ]}
  ],
  undead: [
    {title:'记忆的碎片', minAge:50, text:['你想起了生前的一件事，但记不清是谁的脸。'], choices:[
      {label:'去找', check:{attr:'int',dc:15}, success:{int:2,karma:2}, successText:'你找到了那座坟。', fail:{hp:-15}, failText:'你什么也没找到。'},
      {label:'不再去想', effect:{mag:2}}
    ]},
    {title:'第二次死亡', minAge:150, text:['有人要来彻底杀死你。'], choices:[
      {label:'迎战', check:{attr:'phy',dc:17}, success:{phy:3,rep:3}, successText:'你赢了。', fail:{hp:-40}, failText:'你被打散了，花了很久才聚回来。'},
      {label:'谈判', check:{attr:'int',dc:16}, success:{karma:2,int:2}, successText:'你们达成了协议。', fail:{hp:-20}, failText:'他骗了你。'}
    ]},
    {title:'永恒之后', minAge:400, text:['你已经不记得自己为什么还活着。'], choices:[
      {label:'寻找答案', check:{attr:'mag',dc:19}, success:{mag:4,int:4}, successText:'你找到了。', fail:{hp:-25}, failText:'答案不在那里。'},
      {label:'就这样吧', effect:{int:3,hp:10}}
    ]}
  ],
  fae: [
    {title:'名字的代价', minAge:50, text:['有人问起了你的真名。'], choices:[
      {label:'告诉他', check:{attr:'mag',dc:16}, success:{mag:3,karma:1}, successText:'你赌赢了。', fail:{hp:-30,mag:-2}, failText:'你被束缚了。'},
      {label:'说谎', check:{attr:'int',dc:15}, success:{int:2}, successText:'谎言骗过了他。', fail:{hp:-20}, failText:'妖精不能说谎，你痛苦地蜷缩起来。'}
    ]},
    {title:'妖精的舞会', minAge:150, text:['森林深处正在举行一场持续百年的舞会。'], choices:[
      {label:'加入', check:{attr:'mag',dc:17}, success:{mag:4,rep:3}, successText:'你跳了一百年。', fail:{hp:-30}, failText:'你被困在了舞步里。'},
      {label:'在门外看', effect:{int:2}}
    ]},
    {title:'季节的尽头', minAge:400, text:['你活过了太多个春天。'], choices:[
      {label:'变成一棵树', effect:{mag:3,karma:3}, text:'你站在原地，慢慢长出了枝丫。'},
      {label:'继续游荡', effect:{int:3,rep:2}}
    ]}
  ]
};

for(const k in MAIN_EXTRA){ if(MAIN_LINES[k]) MAIN_LINES[k] = MAIN_LINES[k].concat(MAIN_EXTRA[k]); }
