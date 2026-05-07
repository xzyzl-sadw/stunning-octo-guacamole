// 直接将景点数据挂载到window全局，确保所有JS都能读取
window.allSpots = {
    "spots": [
        {
            "id": 1,
            "name": "华山",
            "type": "natural",
            "address": "陕西省渭南市华阴市",
            "ticket": 160,
            "traffic": "西安北站乘高铁至华山北站，约40分钟",
            "intro": "华山是中国著名的五岳之一，以奇险天下第一山著称，拥有长空栈道、鹞子翻身等著名景点，是大学生户外徒步的热门选择。",
            "img": "img/华山.jpg"
        },
        {
            "id": 2,
            "name": "秦始皇兵马俑博物馆",
            "type": "cultural",
            "address": "陕西省西安市临潼区",
            "ticket": 120,
            "traffic": "西安地铁9号线至华清池站，换乘公交前往",
            "intro": "世界八大奇迹之一，是秦始皇陵的陪葬坑，展示了秦代兵马俑的恢弘气势，是了解中国古代历史的必去景点。",
            "img": "img/兵马俑.jpg"
        },
        {
            "id": 3,
            "name": "延安革命纪念馆",
            "type": "red",
            "address": "陕西省延安市宝塔区",
            "ticket": 0,
            "traffic": "延安市区乘1路、3路公交可达",
            "intro": "展示中国共产党在延安的革命历史，是全国重要的红色教育基地，适合大学生开展红色研学活动。",
            "img": "img/延安革命纪念馆.jpg"
        },
        {
            "id": 4,
            "name": "西安大雁塔",
            "type": "cultural",
            "address": "陕西省西安市雁塔区",
            "ticket": 40,
            "traffic": "西安地铁3号线/4号线至大雁塔站",
            "intro": "为保存玄奘法师由天竺经丝绸之路带回长安的经卷佛像而建，是西安的标志性建筑之一。",
            "img": "img/大雁塔.jpg"
        },
        {
            "id": 5,
            "name": "壶口瀑布",
            "type": "natural",
            "address": "陕西省延安市宜川县",
            "ticket": 90,
            "traffic": "西安纺织城客运站乘大巴至壶口，约4小时",
            "intro": "中国第二大瀑布，黄河上的著名瀑布，以气势磅礴的黄河水景观著称，四季景色各有不同。",
            "img": "img/壶口瀑布.jpg"
        }
    ],
    "chartData": {
        "names": ["华山", "兵马俑", "延安革命纪念馆", "大雁塔", "壶口瀑布"],
        "values": [8500, 12000, 9500, 10000, 7800]
    },
    // 路线规划数据
    "routes": [
        {
            "id": 1,
            "name": "西安经典一日游",
            "theme": "人文古迹",
            "duration": "1日",
            "spots": ["秦始皇兵马俑博物馆", "西安大雁塔"],
            "budget": "200元以内",
            "suitable": "初次来陕游客",
            "description": "涵盖西安最经典的两个世界级文化遗产，领略秦唐风采",
            "highlights": ["世界第八大奇迹", "玄奘取经地", "大唐不夜城夜景"]
        },
        {
            "id": 2,
            "name": "华山探险两日游",
            "theme": "自然景观",
            "duration": "2日",
            "spots": ["华山"],
            "budget": "400-600元",
            "suitable": "户外爱好者",
            "description": "挑战奇险天下第一山，体验长空栈道的惊险刺激",
            "highlights": ["长空栈道", "鹞子翻身", "日出云海"]
        },
        {
            "id": 3,
            "name": "延安红色研学之旅",
            "theme": "红色文旅",
            "duration": "2-3日",
            "spots": ["延安革命纪念馆"],
            "budget": "500-800元",
            "suitable": "研学团体",
            "description": "追寻革命足迹，传承红色基因，深入了解延安精神",
            "highlights": ["枣园旧址", "杨家岭", "红色主题讲座"]
        },
        {
            "id": 4,
            "name": "黄河文明探索三日游",
            "theme": "自然+人文",
            "duration": "3日",
            "spots": ["壶口瀑布", "延安革命纪念馆"],
            "budget": "800-1200元",
            "suitable": "深度游客",
            "description": "从壶口瀑布的黄河之魂到延安的革命圣地，感受中华文明的波澜壮阔",
            "highlights": ["黄河壶口", "延安红色文化", "陕北风情"]
        }
    ],
    // 研学活动数据
    "studyTrips": [
        {
            "id": 1,
            "title": "秦始皇帝陵考古体验营",
            "type": "历史探索",
            "organizer": "秦始皇帝陵博物院",
            "targetGroup": "中学生、大学生",
            "duration": "半天/全天",
            "price": "80-150元/人",
            "highlights": ["考古发掘模拟", "兵马俑修复体验", "秦文化讲座"],
            "contact": "029-81399123",
            "description": "在专业讲解员带领下，深入了解秦代军事、政治、文化，亲手体验考古发掘的乐趣"
        },
        {
            "id": 2,
            "title": "延安红色文化宣讲实践",
            "type": "红色教育",
            "organizer": "延安革命纪念馆",
            "targetGroup": "大学生社团、党支部",
            "duration": "1-3日",
            "price": "免费（需预约）",
            "highlights": ["革命历史党课", "延安精神宣讲", "枣园实地参观"],
            "contact": "0911-8219214",
            "description": "依托延安丰富的红色资源，开展沉浸式红色文化教育活动，传承革命精神"
        },
        {
            "id": 3,
            "title": "华山自然科普研学营",
            "type": "自然科学",
            "organizer": "华山风景名胜区",
            "targetGroup": "中小学生亲子家庭",
            "duration": "1-2日",
            "price": "120-200元/人",
            "highlights": ["地质知识科普", "植物标本采集", "户外生存技能"],
            "contact": "0913-4362621",
            "description": "在专业导师带领下探索华山的奇异地貌和丰富植被，学习野外生存技能"
        },
        {
            "id": 4,
            "title": "大唐文化体验日",
            "type": "传统文化",
            "organizer": "大慈恩寺遗址公园",
            "targetGroup": "不限",
            "duration": "1日",
            "price": "60-100元/人",
            "highlights": ["汉服体验", "茶艺表演", "唐诗背诵互动"],
            "contact": "029-85517914",
            "description": "在大雁塔下穿汉服、品茶道、诵唐诗，感受盛唐文化的魅力"
        }
    ],
    // 学生优惠信息
    "studentBenefits": [
        {
            "id": 1,
            "spotName": "秦始皇兵马俑博物馆",
            "discount": "学生票半价",
            "requirement": "凭有效学生证",
            "originalPrice": "120元",
            "discountedPrice": "60元"
        },
        {
            "id": 2,
            "spotName": "华山",
            "discount": "学生票优惠",
            "requirement": "凭有效学生证",
            "originalPrice": "160元",
            "discountedPrice": "80元"
        },
        {
            "id": 3,
            "spotName": "西安城墙",
            "discount": "学生票半价",
            "requirement": "凭有效学生证",
            "originalPrice": "54元",
            "discountedPrice": "27元"
        },
        {
            "id": 4,
            "spotName": "大唐芙蓉园",
            "discount": "学生票优惠",
            "requirement": "凭有效学生证",
            "originalPrice": "120元",
            "discountedPrice": "60元"
        }
    ]
};