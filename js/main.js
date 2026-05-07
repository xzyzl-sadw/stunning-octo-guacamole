// 等待页面加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 1. 初始化费用计算器
    initFeeCalculator();
    // 2. 初始化ECharts图表
    initChart();
    // 3. 渲染所有景点
    renderSpots(allSpots.spots);
    // 4. 绑定筛选按钮事件
    bindFilterEvents();
});

// 费用计算器初始化
function initFeeCalculator() {
    const peopleNum = document.getElementById('peopleNum');
    const trafficFee = document.getElementById('trafficFee');
    const ticketFee = document.getElementById('ticketFee');
    const totalFee = document.getElementById('totalFee');

    // 计算总费用
    function calculateTotal() {
        const num = Number(peopleNum.value) || 1;
        const traffic = Number(trafficFee.value) || 0;
        const ticket = Number(ticketFee.value) || 0;
        const total = num * (traffic + ticket);
        totalFee.textContent = total;
    }

    // 绑定输入事件
    peopleNum.addEventListener('input', calculateTotal);
    trafficFee.addEventListener('input', calculateTotal);
    ticketFee.addEventListener('input', calculateTotal);
}

// ECharts图表初始化
function initChart() {
    const chartDom = document.getElementById('tourismChart');
    const myChart = echarts.init(chartDom);
    
    const option = {
        title: {
            text: '陕西热门文旅景点访问量排行',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        xAxis: {
            type: 'category',
            data: allSpots.chartData.names
        },
        yAxis: {
            type: 'value',
            name: '月访问量（人次）'
        },
        series: [
            {
                name: '访问量',
                type: 'bar',
                data: allSpots.chartData.values,
                itemStyle: {
                    color: function(params) {
                        // 不同分类不同颜色
                        const colorList = ['#165DFF', '#36CFC9', '#FF7D00', '#86909C', '#F53F3F'];
                        return colorList[params.dataIndex];
                    }
                }
            }
        ]
    };

    myChart.setOption(option);
    // 自适应窗口大小
    window.addEventListener('resize', function() {
        myChart.resize();
    });
}

// 渲染景点列表
function renderSpots(spots) {
    const spotList = document.getElementById('spotList');
    spotList.innerHTML = ''; // 清空原有内容

    if (spots.length === 0) {
        spotList.innerHTML = '<p class="col-span-full text-center py-8 text-gray-500">暂无相关景点</p>';
        return;
    }

    spots.forEach(spot => {
        // 创建景点卡片
        const card = document.createElement('div');
       card.className = 'bg-white rounded-2xl shadow-card overflow-hidden card-hover';hidden card-hover';
        card.innerHTML = `
            <img src="${spot.img}" alt="${spot.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold mb-1">${spot.name}</h3>
                <p class="text-sm text-gray-600 mb-1"><strong>地址：</strong>${spot.address}</p>
                <p class="text-sm text-gray-600 mb-1"><strong>门票：</strong>${spot.ticket === 0 ? '免费' : spot.ticket + '元'}</p>
                <p class="text-sm text-gray-600 mb-2"><strong>交通：</strong>${spot.traffic}</p>
                <p class="text-sm text-gray-600 mb-3"><strong>简介：</strong>${spot.intro}</p>
                <button class="collect-btn px-3 py-1 bg-blue-500 text-white rounded text-sm" data-id="${spot.id}">
                    收藏
                </button>
            </div>
        `;
        spotList.appendChild(card);

        // 绑定收藏按钮事件
        const collectBtn = card.querySelector('.collect-btn');
        collectBtn.addEventListener('click', function() {
            const spotId = this.getAttribute('data-id');
            collectSpot(spotId, this);
        });
    });
}

// 收藏景点功能（localStorage存储）
function collectSpot(spotId, btn) {
    // 获取已收藏的景点ID
    let collected = localStorage.getItem('collectedSpots') || '';
    let collectedArr = collected ? collected.split(',') : [];

    if (collectedArr.includes(spotId)) {
        // 取消收藏
        collectedArr = collectedArr.filter(id => id !== spotId);
        btn.textContent = '收藏';
        btn.classList.remove('bg-red-500');
        btn.classList.add('bg-blue-500');
    } else {
        // 收藏
        collectedArr.push(spotId);
        btn.textContent = '已收藏';
        btn.classList.remove('bg-blue-500');
        btn.classList.add('bg-red-500');
    }

    // 保存到localStorage
    localStorage.setItem('collectedSpots', collectedArr.join(','));
}

// 绑定筛选按钮事件
function bindFilterEvents() {
    const allBtn = document.getElementById('all');
    const naturalBtn = document.getElementById('natural');
    const culturalBtn = document.getElementById('cultural');
    const redBtn = document.getElementById('red');

    // 筛选按钮样式切换
    function resetFilterBtnStyle() {
        [allBtn, naturalBtn, culturalBtn, redBtn].forEach(btn => {
            btn.classList.remove('active-filter');
            btn.classList.add('bg-gray-200');
        });
    }

    // 全部景点
    allBtn.addEventListener('click', function() {
        resetFilterBtnStyle();
        this.classList.add('active-filter');
        this.classList.remove('bg-gray-200');
        renderSpots(allSpots.spots);
    });

    // 自然景观
    naturalBtn.addEventListener('click', function() {
        resetFilterBtnStyle();
        this.classList.add('active-filter');
        this.classList.remove('bg-gray-200');
        const filtered = allSpots.spots.filter(spot => spot.type === 'natural');
        renderSpots(filtered);
    });

    // 人文古迹
    culturalBtn.addEventListener('click', function() {
        resetFilterBtnStyle();
        this.classList.add('active-filter');
        this.classList.remove('bg-gray-200');
        const filtered = allSpots.spots.filter(spot => spot.type === 'cultural');
        renderSpots(filtered);
    });

    // 红色文旅
    redBtn.addEventListener('click', function() {
        resetFilterBtnStyle();
        this.classList.add('active-filter');
        this.classList.remove('bg-gray-200');
        const filtered = allSpots.spots.filter(spot => spot.type === 'red');
        renderSpots(filtered);
    });
}
/************************** 6. 无缝图片轮播逻辑 **************************/
function initCarousel() {
    // 1. 获取轮播元素
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    const indicatorDots = document.querySelectorAll('.indicator-dot');
    
    if (!carouselWrapper || carouselItems.length === 0) return;

    // 2. 轮播基础配置（关键：真实图片数=总项数-2，因为前后各加了一张假的）
    const realItemCount = 5; // 真实景点图片数量（华山、兵马俑、延安、大雁塔、壶口）
    const totalItemCount = carouselItems.length; // 包含假项的总数量
    let currentIndex = 1; // 初始位置为第一个真实项（跳过假的第一张）
    let autoPlayTimer = null;
    const autoPlayInterval = 5000; // 5秒自动切换
    let isAnimating = false; // 防止动画过程中重复点击

    // 3. 核心切换函数（无缝滚动关键）
    function switchCarousel(index, isAuto = false) {
        if (isAnimating) return; // 动画中禁止操作
        isAnimating = true;

        // 计算目标位置
        let targetIndex = index;
        
        // 无缝滚动逻辑：到达假最后一张时，瞬间切回真实第一张；到达假第一张时，瞬间切回真实最后一张
        if (targetIndex >= totalItemCount - 1) {
            // 滚动到假最后一张后，瞬间复位到真实第一张
            setTimeout(() => {
                carouselWrapper.style.transition = 'none'; // 取消过渡动画
                carouselWrapper.style.transform = `translateX(-${1 * 100}%)`; // 回到真实第一张
                currentIndex = 1;
                isAnimating = false;
            }, 600); // 与CSS过渡时间一致
            targetIndex = totalItemCount - 1; // 先滚动到假最后一张
        } else if (targetIndex <= 0) {
            // 滚动到假第一张后，瞬间复位到真实最后一张
            setTimeout(() => {
                carouselWrapper.style.transition = 'none';
                carouselWrapper.style.transform = `translateX(-${realItemCount * 100}%)`; // 回到真实最后一张
                currentIndex = realItemCount;
                isAnimating = false;
            }, 600);
            targetIndex = 0; // 先滚动到假第一张
        } else {
            // 正常滚动，动画结束后解锁
            setTimeout(() => {
                isAnimating = false;
            }, 600);
        }

        // 执行滚动动画
        carouselWrapper.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
        carouselWrapper.style.transform = `translateX(-${targetIndex * 100}%)`;
        
        // 更新指示器状态（匹配真实图片索引）
        const realIndex = targetIndex === 0 ? realItemCount - 1 : 
                          targetIndex === totalItemCount - 1 ? 0 : 
                          targetIndex - 1;
        indicatorDots.forEach((dot, i) => {
            dot.classList.toggle('active', i === realIndex);
        });
        
        // 更新当前索引（非自动播放时）
        if (!isAuto) {
            currentIndex = targetIndex;
        }
    }

    // 4. 自动播放函数（无缝循环）
    function startAutoPlay() {
        autoPlayTimer = setInterval(() => {
            currentIndex++;
            switchCarousel(currentIndex, true); // 标记为自动播放
        }, autoPlayInterval);
    }

    // 5. 重置自动播放（手动操作后重新计时）
    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    // 6. 手动切换事件
    prevBtn.addEventListener('click', () => {
        switchCarousel(currentIndex - 1);
        resetAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        switchCarousel(currentIndex + 1);
        resetAutoPlay();
    });

    // 7. 指示器点击事件（映射到真实图片索引）
    indicatorDots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            const targetIndex = i + 1; // 指示器0对应真实第一张（索引1）
            switchCarousel(targetIndex);
            resetAutoPlay();
        });
    });

    // 8. 鼠标悬浮暂停自动播放
    const carouselContainer = document.querySelector('.banner-carousel');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(autoPlayTimer);
    });
    carouselContainer.addEventListener('mouseleave', () => {
        startAutoPlay();
    });

    // 9. 初始化轮播（默认显示第一张真实图片）
    carouselWrapper.style.transform = `translateX(-${1 * 100}%)`;
    startAutoPlay();
}

// 页面初始化时调用（保留原有位置）
document.addEventListener('DOMContentLoaded', function() {
    // 数据校验等原有逻辑...

    initCarousel(); // 初始化无缝轮播

    initFeeCalculator();
    initFilterSystem(window.allSpots);
    initTourismCharts('tourismChart', window.allSpots.chartData);
    initCollectedState();

    // 初始化路线规划模块
    initRouteModule();
    // 初始化研学活动模块
    initStudyTripModule();
});

/************************** 路线规划模块 **************************/
function initRouteModule() {
    const routeList = document.getElementById('routeList');
    const routePrefBtns = document.querySelectorAll('.route-pref-btn');

    // 渲染路线列表
    function renderRoutes(routes) {
        routeList.innerHTML = '';
        routes.forEach(route => {
            const card = document.createElement('div');
            card.className = 'group bg-white rounded-2xl p-5 shadow-card hover:shadow-xl transition-all cursor-pointer border border-gray-100 hover:border-primary/30 hover:-translate-y-1';
            card.innerHTML = `
                <div class="flex items-center justify-between mb-4">
                    <span class="px-3 py-1 text-xs rounded-full font-medium ${getThemeClass(route.theme)}">${route.theme}</span>
                    <span class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"><i class="fa-regular fa-clock mr-1"></i>${route.duration}</span>
                </div>
                <h3 class="font-bold text-lg mb-2 text-dark group-hover:text-primary transition-colors">${route.name}</h3>
                <p class="text-sm text-gray-600 mb-4 line-clamp-2">${route.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${route.highlights.map(h => `<span class="text-xs px-2 py-1 bg-primary/5 text-primary rounded-full">${h}</span>`).join('')}
                </div>
                <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span class="text-primary font-bold"><i class="fa-solid fa-coins mr-1"></i>${route.budget}</span>
                    <span class="text-xs text-gray-400"><i class="fa-solid fa-user-tag mr-1"></i>${route.suitable}</span>
                </div>
            `;
            // 点击查看路线详情
            card.addEventListener('click', () => showRouteDetail(route));
            routeList.appendChild(card);
        });
    }

    // 根据主题获取样式类
    function getThemeClass(theme) {
        const themeMap = {
            '人文古迹': 'bg-cultural/10 text-cultural',
            '自然景观': 'bg-natural/10 text-natural',
            '红色文旅': 'bg-redtour/10 text-redtour',
            '自然+人文': 'bg-secondary/10 text-secondary'
        };
        return themeMap[theme] || 'bg-primary/10 text-primary';
    }

    // 显示路线详情
    function showRouteDetail(route) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4';
        modal.innerHTML = `
            <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-3">
                            <span class="px-3 py-1 text-sm rounded-full ${getThemeClass(route.theme)}">${route.theme}</span>
                            <span class="text-gray-500"><i class="fa-regular fa-clock mr-1"></i>${route.duration}</span>
                        </div>
                        <button class="text-gray-400 hover:text-gray-600 text-2xl" onclick="this.closest('.fixed').remove()">&times;</button>
                    </div>
                    <h2 class="text-2xl font-bold mb-4">${route.name}</h2>
                    <p class="text-gray-600 mb-6">${route.description}</p>

                    <div class="mb-6">
                        <h3 class="font-bold mb-3 flex items-center"><i class="fa-solid fa-map-location-dot text-primary mr-2"></i>途经景点</h3>
                        <div class="space-y-3">
                            ${route.spots.map((spot, idx) => `
                                <div class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <span class="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">${idx + 1}</span>
                                    <span class="font-medium">${spot}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="mb-6">
                        <h3 class="font-bold mb-3 flex items-center"><i class="fa-solid fa-star text-yellow-500 mr-2"></i>行程亮点</h3>
                        <div class="flex flex-wrap gap-2">
                            ${route.highlights.map(h => `<span class="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm">${h}</span>`).join('')}
                        </div>
                    </div>

                    <div class="flex items-center justify-between p-4 bg-primary/5 rounded-xl">
                        <div>
                            <span class="text-gray-500 text-sm">预算参考</span>
                            <p class="text-xl font-bold text-primary">${route.budget}</p>
                        </div>
                        <div>
                            <span class="text-gray-500 text-sm">适合人群</span>
                            <p class="font-medium">${route.suitable}</p>
                        </div>
                    </div>

                    <button class="w-full mt-6 btn-primary py-3" onclick="this.closest('.fixed').remove(); showToast('路线已收藏，可在路线规划中查看')">
                        <i class="fa-solid fa-bookmark mr-2"></i>收藏此路线
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    }

    // 筛选路线
    function filterRoutes(duration, theme) {
        let filtered = window.allSpots.routes;

        if (duration && duration !== 'all') {
            filtered = filtered.filter(r => r.duration.includes(duration));
        }
        if (theme) {
            filtered = filtered.filter(r => r.theme.includes(theme) || (theme === 'cultural' && r.theme.includes('人文')) ||
                                              (theme === 'natural' && r.theme.includes('自然')) || (theme === 'red' && r.theme.includes('红色')));
        }

        renderRoutes(filtered);
    }

    // 绑定筛选按钮事件
    routePrefBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 更新按钮状态
            if (this.dataset.duration) {
                routePrefBtns.forEach(b => {
                    if (b.dataset.duration) {
                        b.classList.remove('active-filter', 'bg-primary', 'text-white');
                        b.classList.add('bg-white', 'border', 'border-gray-200', 'text-dark');
                    }
                });
            }
            if (this.dataset.theme) {
                routePrefBtns.forEach(b => {
                    if (b.dataset.theme) {
                        b.classList.remove('active-filter', 'bg-primary', 'text-white');
                        b.classList.add('bg-white', 'border', 'border-gray-200', 'text-dark');
                    }
                });
            }
            this.classList.add('active-filter', 'bg-primary', 'text-white');
            this.classList.remove('bg-white', 'border', 'border-gray-200', 'text-dark');

            filterRoutes(this.dataset.duration, this.dataset.theme);
        });
    });

    // 初始渲染
    renderRoutes(window.allSpots.routes);
}

/************************** 研学活动模块 **************************/
function initStudyTripModule() {
    const studyTripList = document.getElementById('studyTripList');
    const studentBenefitTable = document.getElementById('studentBenefitTable');

    // 渲染研学活动列表
    function renderStudyTrips(trips) {
        studyTripList.innerHTML = '';
        trips.forEach(trip => {
            const card = document.createElement('div');
            card.className = 'group bg-white rounded-2xl p-6 shadow-card hover:shadow-xl transition-all border border-gray-100 hover:border-secondary/30';
            card.innerHTML = `
                <div class="flex items-start gap-4">
                    <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-secondary/20 to-orange-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <i class="fa-solid ${getStudyTripIcon(trip.type)} text-secondary text-2xl"></i>
                    </div>
                    <div class="flex-1">
                        <div class="flex items-center justify-between mb-2">
                            <h3 class="font-bold text-lg group-hover:text-secondary transition-colors">${trip.title}</h3>
                            <span class="px-3 py-1 text-xs rounded-full bg-secondary/10 text-secondary font-medium">${trip.type}</span>
                        </div>
                        <p class="text-sm text-gray-600 mb-4">${trip.description}</p>
                        <div class="grid grid-cols-2 gap-3 text-sm mb-4">
                            <div class="flex items-center text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                                <i class="fa-solid fa-users mr-2 text-gray-400"></i>${trip.targetGroup}
                            </div>
                            <div class="flex items-center text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                                <i class="fa-regular fa-clock mr-2 text-gray-400"></i>${trip.duration}
                            </div>
                            <div class="flex items-center text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                                <i class="fa-solid fa-building mr-2 text-gray-400"></i>${trip.organizer}
                            </div>
                            <div class="flex items-center text-primary font-bold bg-primary/5 px-3 py-2 rounded-lg">
                                <i class="fa-solid fa-coins mr-2 text-primary"></i>${trip.price}
                            </div>
                        </div>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${trip.highlights.map(h => `<span class="text-xs px-3 py-1 bg-gray-100 rounded-full text-gray-600">${h}</span>`).join('')}
                        </div>
                        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span class="text-xs text-gray-400"><i class="fa-solid fa-phone mr-1"></i>${trip.contact}</span>
                            <button class="px-4 py-2 bg-gradient-to-r from-secondary to-orange-500 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all" onclick="showToast('请联系主办方预约：${trip.contact}')">
                                <i class="fa-solid fa-calendar-check mr-1"></i>立即预约
                            </button>
                        </div>
                    </div>
                </div>
            `;
            studyTripList.appendChild(card);
        });
    }

    // 获取研学类型图标
    function getStudyTripIcon(type) {
        const iconMap = {
            '历史探索': 'fa-landmark',
            '红色教育': 'fa-flag',
            '自然科学': 'fa-flask',
            '传统文化': 'fa-masks-theater'
        };
        return iconMap[type] || 'fa-book';
    }

    // 渲染学生优惠信息
    function renderStudentBenefits(benefits) {
        studentBenefitTable.innerHTML = '';
        benefits.forEach(b => {
            const row = document.createElement('tr');
            row.className = 'border-b border-gray-100 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all';
            row.innerHTML = `
                <td class="py-4 px-4 font-medium text-gray-800">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-green-500 rounded-full"></span>
                        ${b.spotName}
                    </div>
                </td>
                <td class="py-4 px-4 text-center text-gray-400 line-through">${b.originalPrice}</td>
                <td class="py-4 px-4 text-center">
                    <span class="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-bold">${b.discountedPrice}</span>
                </td>
                <td class="py-4 px-4 text-gray-500">
                    <span class="px-2 py-1 bg-green-50 text-green-600 rounded text-xs">${b.discount}</span>
                    <span class="text-xs text-gray-400 ml-2">${b.requirement}</span>
                </td>
            `;
            studentBenefitTable.appendChild(row);
        });
    }

    // 初始渲染
    renderStudyTrips(window.allSpots.studyTrips);
    renderStudentBenefits(window.allSpots.studentBenefits);
}