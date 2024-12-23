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
    
    // 奖品配置A奖池
    const PRIZE_TYPES = [
        '免一次作业',
        '免一周值日',
        '换座位一周',
        '获得零食'
    ];
    
    // 添加B奖池奖品配置
    const PRIZE_TYPES_B = [
        '给全班带礼物',
        '一张试卷',
        '英语作业x2',
        '罚站两节课'
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
                '给全班带礼物': 0,
                '一张试卷': 0,
                '英语作业x2': 0,
                '罚站两节课': 0
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
    
    // 开始抽奖
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
        
        // 创建10张卡片，每张卡片随机选择一个奖品
        for (let i = 0; i < 10; i++) {
            // 随机选择一个奖品
            const prize = PRIZE_TYPES[Math.floor(Math.random() * PRIZE_TYPES.length)];
            
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
                    // 翻转当前卡片
                    this.classList.add('flipped');
                    
                    // 延迟一秒后显示中奖信息并翻转其他卡片
                    setTimeout(() => {
                        showPrizeAlert(name, prize);
                        updateRecord(name, prize);
                        
                        // 翻转所有其他卡片
                        cards.forEach(otherCard => {
                            if (!otherCard.classList.contains('flipped')) {
                                otherCard.classList.add('flipped');
                            }
                        });
                        
                        // 延迟5秒后关闭模态框并刷新页面
                        setTimeout(() => {
                            cardsModal.style.display = 'none';
                            studentNameInput.value = ''; // 清空输入
                            location.reload(); // 刷新页面
                        }, 5000);
                    }, 1000);
                }
            });
            
            cards.push(card);
            cardsGrid.appendChild(card);
        }
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
        
        // 关闭姓名输入框，显示卡片界面
        poolBModal.style.display = 'none';
        cardsBModal.style.display = 'flex';
        
        // 生成卡片
        const cardsGrid = cardsBModal.querySelector('.cards-grid');
        cardsGrid.innerHTML = ''; // 清空现有卡片
        
        const cards = []; // 存储所有卡片元素
        
        // 创建10张卡片，每张卡片随机选择一个奖品
        for (let i = 0; i < 10; i++) {
            // 随机选择一个奖品
            const prize = PRIZE_TYPES_B[Math.floor(Math.random() * PRIZE_TYPES_B.length)];
            
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
                    // 翻转当前卡片
                    this.classList.add('flipped');
                    
                    // 延迟一秒后显示中奖信息并翻转其他卡片
                    setTimeout(() => {
                        showPrizeAlert(name, prize);
                        updateRecord(name, prize);
                        
                        // 翻转所有其他卡片
                        cards.forEach(otherCard => {
                            if (!otherCard.classList.contains('flipped')) {
                                otherCard.classList.add('flipped');
                            }
                        });
                        
                        // 延迟5秒后关闭模态框并刷新页面
                        setTimeout(() => {
                            cardsBModal.style.display = 'none';
                            studentNameInputB.value = ''; // 清空输入
                            location.reload(); // 刷新页面
                        }, 5000);
                    }, 1000);
                }
            });
            
            cards.push(card);
            cardsGrid.appendChild(card);
        }
    });
}); 