document.addEventListener('DOMContentLoaded', () => {
    const poolA = document.getElementById('poolA');
    const poolAModal = document.getElementById('poolAModal');
    const cardsModal = document.getElementById('cardsModal');
    const studentNameInput = document.getElementById('studentName');
    const startLotteryBtn = document.getElementById('startLottery');
    const recordBtn = document.getElementById('recordBtn');
    const recordModal = document.getElementById('recordModal');
    const confirmModal = document.getElementById('confirmModal');
    const confirmText = document.getElementById('confirmText');
    const cancelUse = document.getElementById('cancelUse');
    const confirmUse = document.getElementById('confirmUse');
    const prizeAlert = document.getElementById('prizeAlert');
    
    // A奖池奖品配置
    const PRIZE_TYPES = [
        '免一次作业',
        '免一周值日',
        '换座位一周',
        '获得零食',
        '万能卡'
    ];
    
    // B奖池奖品配置
    const PRIZE_TYPES_B = [
        '给全班带礼物',
        '一张试卷',
        '英语作业x2',
        '罚站两节课',
        '摆一周桌子',
        '表演节目'
    ];
    
    // 从本地存储获取记录
    function getRecords() {
        try {
            const records = localStorage.getItem('lotteryRecords');
            return records ? JSON.parse(records) : {};
        } catch (error) {
            console.error('读取记录失败:', error);
            return {};
        }
    }
    
    // 保存记录到本地存储
    function saveRecords(records) {
        try {
            localStorage.setItem('lotteryRecords', JSON.stringify(records));
        } catch (error) {
            console.error('保存记录失败:', error);
        }
    }
    
    // 更新抽奖记录
    async function updateRecord(name, prize) {
        const records = getRecords();
        if (!records[name]) {
            records[name] = {
                '免一次作业': 0,
                '免一周值日': 0,
                '换座位一周': 0,
                '获得零食': 0,
                '万能卡': 0,
                // B奖池奖品
                '给全班带礼物': 0,
                '一张试卷': 0,
                '英语作业x2': 0,
                '罚站两节课': 0,
                '摆一周桌子': 0,
                '表演节目': 0
            };
        }
        records[name][prize]++;
        saveRecords(records);
    }
    
    // 使用奖励
    async function usePrize(name, prize) {
        try {
            const records = getRecords();
            if (records[name] && records[name][prize] > 0) {
                records[name][prize]--;
                saveRecords(records);
                return true;
            }
            return false;
        } catch (error) {
            console.error('使用奖励失败:', error);
            return false;
        }
    }
    
    // 修改显示记录函数
    async function showRecords() {
        const tbody = document.getElementById('recordTableBody');
        tbody.innerHTML = '';
        
        const records = getRecords();
        
        Object.entries(records).forEach(([name, prizes]) => {
            // 免一次作业
            if (prizes['免一次作业'] > 0) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${name}</td>
                    <td>免作业一次</td>
                    <td>×${prizes['免一次作业']}</td>
                    <td><button class="use-btn" data-name="${name}" data-prize="免一次作业">使用</button></td>
                `;
                tbody.appendChild(row);
            }
            
            // 免一周值日
            if (prizes['免一周值日'] > 0) {
                const row2 = document.createElement('tr');
                row2.innerHTML = `
                    <td>${name}</td>
                    <td>免一周值日</td>
                    <td>×${prizes['免一周值日']}</td>
                    <td><button class="use-btn" data-name="${name}" data-prize="免一周值日">使用</button></td>
                `;
                tbody.appendChild(row2);
            }
            
            // 换座位一周
            if (prizes['换座位一周'] > 0) {
                const row3 = document.createElement('tr');
                row3.innerHTML = `
                    <td>${name}</td>
                    <td>换座位一周</td>
                    <td>×${prizes['换座位一周']}</td>
                    <td><button class="use-btn" data-name="${name}" data-prize="换座位一周">使用</button></td>
                `;
                tbody.appendChild(row3);
            }
            
            // 获得零食
            if (prizes['获得零食'] > 0) {
                const row4 = document.createElement('tr');
                row4.innerHTML = `
                    <td>${name}</td>
                    <td>获得零食</td>
                    <td>×${prizes['获得零食']}</td>
                    <td><button class="use-btn" data-name="${name}" data-prize="获得零食">使用</button></td>
                `;
                tbody.appendChild(row4);
            }
            
            // 添加万能卡显示
            if (prizes['万能卡'] > 0) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${name}</td>
                    <td>万能卡</td>
                    <td>×${prizes['万能卡']}</td>
                    <td><button class="use-btn" data-name="${name}" data-prize="万能卡">使用</button></td>
                `;
                tbody.appendChild(row);
            }
            
            // B奖池奖品显示
            if (prizes['给全班带礼物'] > 0) {
                const row5 = document.createElement('tr');
                row5.innerHTML = `
                    <td>${name}</td>
                    <td>给全班带礼物</td>
                    <td>×${prizes['给全班带礼物']}</td>
                    <td><button class="use-btn" data-name="${name}" data-prize="给全班带礼物">使用</button></td>
                `;
                tbody.appendChild(row5);
            }
            
            if (prizes['一张试卷'] > 0) {
                const row6 = document.createElement('tr');
                row6.innerHTML = `
                    <td>${name}</td>
                    <td>一张试卷</td>
                    <td>×${prizes['一张试卷']}</td>
                    <td><button class="use-btn" data-name="${name}" data-prize="一张试卷">使用</button></td>
                `;
                tbody.appendChild(row6);
            }
            
            if (prizes['英语作业x2'] > 0) {
                const row7 = document.createElement('tr');
                row7.innerHTML = `
                    <td>${name}</td>
                    <td>英语作业x2</td>
                    <td>×${prizes['英语作业x2']}</td>
                    <td><button class="use-btn" data-name="${name}" data-prize="英语作业x2">使用</button></td>
                `;
                tbody.appendChild(row7);
            }
            
            if (prizes['罚站两节课'] > 0) {
                const row8 = document.createElement('tr');
                row8.innerHTML = `
                    <td>${name}</td>
                    <td>罚站两节课</td>
                    <td>×${prizes['罚站两节课']}</td>
                    <td><button class="use-btn" data-name="${name}" data-prize="罚站两节课">使用</button></td>
                `;
                tbody.appendChild(row8);
            }
            
            // 添加新的B奖池奖品显示
            if (prizes['摆一周桌子'] > 0) {
                const row9 = document.createElement('tr');
                row9.innerHTML = `
                    <td>${name}</td>
                    <td>摆一周桌子</td>
                    <td>×${prizes['摆一周桌子']}</td>
                    <td><button class="use-btn" data-name="${name}" data-prize="摆一周桌子">使用</button></td>
                `;
                tbody.appendChild(row9);
            }
            
            if (prizes['表演节目'] > 0) {
                const row10 = document.createElement('tr');
                row10.innerHTML = `
                    <td>${name}</td>
                    <td>表演节目</td>
                    <td>×${prizes['表演节目']}</td>
                    <td><button class="use-btn" data-name="${name}" data-prize="表演节目">使用</button></td>
                `;
                tbody.appendChild(row10);
            }
        });
        
        // 修改使用按钮事件
        document.querySelectorAll('.use-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const name = e.target.dataset.name;
                const prize = e.target.dataset.prize;
                confirmText.textContent = `${name} ${prize}？`;
                confirmModal.style.display = 'flex';
                
                // 存储当前选择的信息到确认按钮上
                document.getElementById('confirmUse').dataset.name = name;
                document.getElementById('confirmUse').dataset.prize = prize;
            });
        });
    }
    
    // 打开A奖池模态框
    poolA.addEventListener('click', () => {
        poolAModal.style.display = 'flex';
    });
    
    // 打开记录模态框
    recordBtn.addEventListener('click', () => {
        recordModal.style.display = 'flex';
        showRecords();
    });
    
    // 添加显示结果提示的函数
    function showResultAlert(success) {
        const resultAlert = document.getElementById('resultAlert');
        const icon = resultAlert.querySelector('.result-icon');
        const text = resultAlert.querySelector('.result-text');
        
        if (success) {
            icon.innerHTML = '✓';
            text.textContent = '使用成功！';
            icon.className = 'result-icon result-success';
            text.className = 'result-text result-success';
        } else {
            icon.innerHTML = '✕';
            text.textContent = '使用失败，请重试！';
            icon.className = 'result-icon result-error';
            text.className = 'result-text result-error';
        }
        
        resultAlert.classList.add('show');
        
        // 1秒后自动关闭
        setTimeout(() => {
            resultAlert.classList.remove('show');
        }, 1000);
    }
    
    // 修改确认使用事件
    confirmUse.addEventListener('click', async (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        const name = confirmUse.dataset.name;
        const prize = confirmUse.dataset.prize;
        
        const success = await usePrize(name, prize);
        confirmModal.style.display = 'none';
        showResultAlert(success);
        if (success) {
            await showRecords(); // 刷新记录显示
        }
    });
    
    // 取消使用
    cancelUse.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        confirmModal.style.display = 'none';
    });
    
    // 点击模态框外部关闭
    [poolAModal, cardsModal, recordModal, confirmModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                if (modal === confirmModal) {
                    // 重置确认框状态
                    confirmUse.dataset.name = '';
                    confirmUse.dataset.prize = '';
                }
            }
        });
    });
    
    // 添加概率浮动函数
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    // 修改获取随机奖品的函数
    function getRandomPrize(prizeTypes) {
        const probabilities = getProbabilities();
        const random = Math.random() * 100;
        let sum = 0;
        
        // 创建带浮动的概率表
        let fluctuatedProbabilities = {};
        let totalFluctuated = 0;
        
        if (prizeTypes === PRIZE_TYPES) {
            // A奖池概率浮动
            const fixedWildCardProb = probabilities.A['万能卡']; // 保存万能卡原始概率
            
            // 先处理除万能卡外的其他奖品
            for (const [prize, probability] of Object.entries(probabilities.A)) {
                if (prize !== '万能卡') {
                    // 在正负5%范围内随机浮动，且保证是整数
                    const fluctuation = getRandomInt(-5, 5);
                    const newProb = Math.max(1, probability + fluctuation);
                    fluctuatedProbabilities[prize] = newProb;
                    totalFluctuated += newProb;
                }
            }
            
            // 添加万能卡固定概率
            fluctuatedProbabilities['万能卡'] = fixedWildCardProb;
            totalFluctuated += fixedWildCardProb;
            
            // 调整除万能卡外的其他奖品概率，使总和为100%
            const remainingProb = 100 - fixedWildCardProb;
            const currentTotal = totalFluctuated - fixedWildCardProb;
            const adjustment = Math.floor((remainingProb - currentTotal) / (Object.keys(fluctuatedProbabilities).length - 1));
            
            for (const prize in fluctuatedProbabilities) {
                if (prize !== '万能卡') {
                    fluctuatedProbabilities[prize] += adjustment;
                }
            }
            
            // 最终调整，确保总和正好是100%
            const finalAdjustment = 100 - Object.values(fluctuatedProbabilities).reduce((a, b) => a + b, 0);
            if (finalAdjustment !== 0) {
                // 将差值分配给第一个非万能卡奖品
                const firstNonWildPrize = Object.keys(fluctuatedProbabilities).find(prize => prize !== '万能卡');
                fluctuatedProbabilities[firstNonWildPrize] += finalAdjustment;
            }
            
            // 使用调整后的概率进行抽奖
            for (const [prize, probability] of Object.entries(fluctuatedProbabilities)) {
                sum += probability;
                if (random < sum) return prize;
            }
        } else {
            // B奖池概率浮动，逻辑不变
            for (const [prize, probability] of Object.entries(probabilities.B)) {
                const fluctuation = getRandomInt(-5, 5);
                const newProb = Math.max(1, probability + fluctuation);
                fluctuatedProbabilities[prize] = newProb;
                totalFluctuated += newProb;
            }
            
            const adjustment = Math.floor((100 - totalFluctuated) / Object.keys(fluctuatedProbabilities).length);
            for (const prize in fluctuatedProbabilities) {
                fluctuatedProbabilities[prize] += adjustment;
            }
            
            const finalAdjustment = 100 - Object.values(fluctuatedProbabilities).reduce((a, b) => a + b, 0);
            if (finalAdjustment !== 0) {
                const firstPrize = Object.keys(fluctuatedProbabilities)[0];
                fluctuatedProbabilities[firstPrize] += finalAdjustment;
            }
            
            for (const [prize, probability] of Object.entries(fluctuatedProbabilities)) {
                sum += probability;
                if (random < sum) return prize;
            }
        }
        
        return prizeTypes[0];
    }
    
    // 修改检查重复奖品的函数
    function checkAndReplaceRepeatedPrizes(prizes, prizeTypes) {
        // 检查连续重复的奖品
        for (let i = 0; i < prizes.length - 1; i++) {  // 改为检查相邻两个
            if (prizes[i] === prizes[i + 1]) {  // 如果相邻两个相同
                // 获取当前未使用的奖品列表（排除当前奖品和前后相邻的奖品）
                const unusedPrizes = prizeTypes.filter(prize => 
                    prize !== prizes[i] && 
                    prize !== prizes[i-1] && // 避免与前一个相同
                    prize !== prizes[i+2]    // 避免与后一个相同
                );
                
                // 随机选择是替换第一个还是第二个
                const replaceIndex = i + Math.floor(Math.random() * 2);
                
                // 如果有可用的替换奖品，随机选择一个进行替换
                if (unusedPrizes.length > 0) {
                    prizes[replaceIndex] = unusedPrizes[Math.floor(Math.random() * unusedPrizes.length)];
                }
            }
        }
        
        // 再次检查一遍，确保没有遗漏
        for (let i = 0; i < prizes.length - 1; i++) {
            if (prizes[i] === prizes[i + 1]) {
                const unusedPrizes = prizeTypes.filter(prize => 
                    prize !== prizes[i] && 
                    prize !== prizes[i-1] && 
                    prize !== prizes[i+2]
                );
                if (unusedPrizes.length > 0) {
                    prizes[i + 1] = unusedPrizes[Math.floor(Math.random() * unusedPrizes.length)];
                }
            }
        }
        
        return prizes;
    }
    
    // 修改开始抽奖的事件处理
    startLotteryBtn.addEventListener('click', () => {
        const name = studentNameInput.value.trim();
        if (!name) {
            alert('请输入学生姓名！');
            return;
        }
        
        // 关闭姓名输入框，显示卡片界面
        poolAModal.style.display = 'none';
        cardsModal.style.display = 'flex';
        
        // 生成卡片
        const cardsGrid = document.querySelector('.cards-grid');
        cardsGrid.innerHTML = ''; // 清空现有卡片
        
        const cards = []; // 存储所有卡片元素
        const prizes = []; // 存储所有奖品
        
        // 先生成所有奖品
        for (let i = 0; i < 10; i++) {
            if (name === 'wxy') {
                if (i === 3) { // 第4号卡片
                    prizes.push('万能卡');
                } else {
                    let newPrize = getRandomPrize(PRIZE_TYPES);
                    // 确保新奖品不会与前一个相同
                    while (i > 0 && newPrize === prizes[i-1]) {
                        newPrize = getRandomPrize(PRIZE_TYPES);
                    }
                    prizes.push(newPrize);
                }
            } else {
                let newPrize = getRandomPrize(PRIZE_TYPES);
                // 确保新奖品不会与前一个相同
                while (i > 0 && newPrize === prizes[i-1]) {
                    newPrize = getRandomPrize(PRIZE_TYPES);
                }
                prizes.push(newPrize);
            }
        }
        
        // 检查并替换重复奖品
        checkAndReplaceRepeatedPrizes(prizes, PRIZE_TYPES);
        
        // 如果是wxy，确保第4号卡片一定是万能卡
        if (name === 'wxy') {
            prizes[3] = '万能卡';
            // 确保万能卡前后没有相同的奖品
            if (prizes[2] === prizes[3]) {
                const unusedPrizes = PRIZE_TYPES.filter(prize => 
                    prize !== '万能卡' && 
                    prize !== prizes[1] && 
                    prize !== prizes[4]
                );
                if (unusedPrizes.length > 0) {
                    prizes[2] = unusedPrizes[Math.floor(Math.random() * unusedPrizes.length)];
                }
            }
            if (prizes[3] === prizes[4]) {
                const unusedPrizes = PRIZE_TYPES.filter(prize => 
                    prize !== '万能卡' && 
                    prize !== prizes[2] && 
                    prize !== prizes[5]
                );
                if (unusedPrizes.length > 0) {
                    prizes[4] = unusedPrizes[Math.floor(Math.random() * unusedPrizes.length)];
                }
            }
        }
        
        // 创建卡片
        prizes.forEach((prize, i) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        ${i + 1}
                    </div>
                    <div class="card-back">
                        ${prize}
                    </div>
                </div>
            `;
            
            // 添加翻牌事件
            card.addEventListener('click', function() {
                if (!this.classList.contains('flipped')) {
                    this.classList.add('flipped');
                    
                    setTimeout(() => {
                        showPrizeAlert(name, prize);
                        updateRecord(name, prize);
                        
                        cards.forEach(otherCard => {
                            if (!otherCard.classList.contains('flipped')) {
                                otherCard.classList.add('flipped');
                            }
                        });
                        
                        setTimeout(() => {
                            cardsModal.style.display = 'none';
                            studentNameInput.value = '';
                            location.reload();
                        }, 5000);
                    }, 1000);
                }
            });
            
            cards.push(card);
            cardsGrid.appendChild(card);
        });
    });
    
    // 显示中奖提示
    function showPrizeAlert(name, prize) {
        prizeAlert.querySelector('.student-name').textContent = name;
        prizeAlert.querySelector('.prize-name').textContent = prize;
        prizeAlert.classList.add('show');
        
        // 3秒后自动关闭
        setTimeout(() => {
            prizeAlert.classList.remove('show');
        }, 4000);
    }
    
    // 添加B奖池相关元素
    const poolB = document.getElementById('poolB');
    const poolBModal = document.getElementById('poolBModal');
    const cardsBModal = document.getElementById('cardsBModal');
    const studentNameInputB = document.getElementById('studentNameB');
    const startLotteryBtnB = document.getElementById('startLotteryB');
    
    // 打开B奖池模态框
    poolB.addEventListener('click', () => {
        poolBModal.style.display = 'flex';
    });
    
    // 点击模态框外部关闭
    [poolBModal, cardsBModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // 开始B奖池抽奖
    startLotteryBtnB.addEventListener('click', () => {
        const name = studentNameInputB.value.trim();
        if (!name) {
            alert('请输入学生姓名！');
            return;
        }
        
        poolBModal.style.display = 'none';
        cardsBModal.style.display = 'flex';
        
        const cardsGrid = cardsBModal.querySelector('.cards-grid');
        cardsGrid.innerHTML = '';
        
        const cards = [];
        const prizes = [];
        
        // 先生成所有奖品
        for (let i = 0; i < 10; i++) {
            prizes.push(getRandomPrize(PRIZE_TYPES_B));
        }
        
        // 检查并替换重复奖品
        checkAndReplaceRepeatedPrizes(prizes, PRIZE_TYPES_B);
        
        // 创建卡片
        prizes.forEach((prize, i) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">
                        ${i + 1}
                    </div>
                    <div class="card-back">
                        ${prize}
                    </div>
                </div>
            `;
            
            // 添加翻牌事件
            card.addEventListener('click', function() {
                if (!this.classList.contains('flipped')) {
                    this.classList.add('flipped');
                    
                    setTimeout(() => {
                        showPrizeAlert(name, prize);
                        updateRecord(name, prize);
                        
                        cards.forEach(otherCard => {
                            if (!otherCard.classList.contains('flipped')) {
                                otherCard.classList.add('flipped');
                            }
                        });
                        
                        setTimeout(() => {
                            cardsBModal.style.display = 'none';
                            studentNameInputB.value = '';
                            location.reload();
                        }, 5000);
                    }, 1000);
                }
            });
            
            cards.push(card);
            cardsGrid.appendChild(card);
        });
    });
    
    // 添加概率设置相关元素
    const probabilityBtn = document.getElementById('probabilityBtn');
    const probabilityModal = document.getElementById('probabilityModal');
    const saveProbabilityBtn = document.getElementById('saveProbability');
    const resetProbabilityBtn = document.getElementById('resetProbability');
    
    // 默认概率配置
    const DEFAULT_PROBABILITIES = {
        A: {
            '免一次作业': 22.5,
            '免一周值日': 22.5,
            '换座位一周': 22.5,
            '获得零食': 22.5,
            '万能卡': 10
        },
        B: {
            '给全班带礼物': 16.67,
            '一张试卷': 16.67,
            '英语作业x2': 16.67,
            '罚站两节课': 16.67,
            '摆一周桌子': 16.67,
            '表演节目': 16.67
        }
    };
    
    // 获取当前概率设置
    function getProbabilities() {
        const stored = localStorage.getItem('prizeProbabilities');
        return stored ? JSON.parse(stored) : DEFAULT_PROBABILITIES;
    }
    
    // 保存概率设置
    function saveProbabilities(probabilities) {
        localStorage.setItem('prizeProbabilities', JSON.stringify(probabilities));
    }
    
    // 更新概率显示
    function updateProbabilityDisplay() {
        const probabilities = getProbabilities();
        document.querySelectorAll('.probability-slider').forEach(slider => {
            const pool = slider.dataset.pool;
            const prize = slider.dataset.prize;
            const value = probabilities[pool][prize];
            slider.value = value;
            slider.nextElementSibling.textContent = `${parseFloat(value).toFixed(2)}%`;
        });
    }
    
    // 打开概率设置模态框
    probabilityBtn.addEventListener('click', () => {
        probabilityModal.style.display = 'flex';
        updateProbabilityDisplay();
    });
    
    // 保存概率设置
    saveProbabilityBtn.addEventListener('click', () => {
        const probabilities = {A: {}, B: {}};
        let totalA = 0;
        let totalB = 0;
        
        // 收集所有概率值
        document.querySelectorAll('.probability-slider').forEach(slider => {
            const pool = slider.dataset.pool;
            const prize = slider.dataset.prize;
            const value = parseFloat(slider.value);
            probabilities[pool][prize] = value;
            
            if (pool === 'A') {
                totalA += value;
            } else {
                totalB += value;
            }
        });
        
        // 检查总概率是否为100%
        if (Math.abs(totalA - 100) > 0.01 || Math.abs(totalB - 100) > 0.01) {
            alert('每个奖池的概率总和必须为100%！');
            return;
        }
        
        saveProbabilities(probabilities);
        probabilityModal.style.display = 'none';
    });
    
    // 重置默认概率
    resetProbabilityBtn.addEventListener('click', () => {
        const defaultProbabilities = {
            A: {
                '免一次作业': 22.5,
                '免一周值日': 22.5,
                '换座位一周': 22.5,
                '获得零食': 22.5,
                '万能卡': 10
            },
            B: {
                '给全班带礼物': 16.67,
                '一张试卷': 16.67,
                '英语作业x2': 16.67,
                '罚站两节课': 16.67,
                '摆一周桌子': 16.67,
                '表演节目': 16.66
            }
        };
        
        saveProbabilities(defaultProbabilities);
        updateProbabilityDisplay();
    });
    
    // 修改概率滑块的事件监听
    document.querySelectorAll('.probability-slider').forEach(slider => {
        // 初始化时更新显示
        const value = slider.value;
        slider.nextElementSibling.textContent = `${parseFloat(value).toFixed(2)}%`;
        
        // 添加滑动事件监听
        slider.addEventListener('input', function() {
            this.nextElementSibling.textContent = `${parseFloat(this.value).toFixed(2)}%`;
            
            // 计算同一奖池中所有奖品的总概率
            const pool = this.dataset.pool;
            let total = 0;
            document.querySelectorAll(`.probability-slider[data-pool="${pool}"]`).forEach(s => {
                total += parseFloat(s.value);
            });
            
            // 如果总概率超过100%，调整当前滑块的值
            if (total > 100) {
                this.value = 100 - (total - parseFloat(this.value));
                this.nextElementSibling.textContent = `${parseFloat(this.value).toFixed(2)}%`;
            }
        });
    });
}); 