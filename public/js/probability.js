document.addEventListener('DOMContentLoaded', () => {
    const saveProbabilityBtn = document.getElementById('saveProbability');
    const resetProbabilityBtn = document.getElementById('resetProbability');
    
    // 默认概率配置
    const DEFAULT_PROBABILITIES = {
        A: {
            '免一次作业': 26,
            '免一周值日': 22,
            '换座位一周': 26,
            '获得零食': 18,
            '万能卡': 8
        },
        B: {
            '给全班带礼物': 22,
            '一张试卷': 20,
            '英语作业x2': 18,
            '罚站两节课': 16,
            '摆一周桌子': 12,
            '表演节目': 12
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
    
    // 初始化显示
    updateProbabilityDisplay();
    
    // 保存概率设置
    saveProbabilityBtn.addEventListener('click', () => {
        const probabilities = {A: {}, B: {}};
        let totalA = 0;
        let totalB = 0;
        
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
        
        if (Math.abs(totalA - 100) > 0.01 || Math.abs(totalB - 100) > 0.01) {
            alert('每个奖池的概率总和必须为100%！');
            return;
        }
        
        saveProbabilities(probabilities);
        alert('保存成功！');
    });
    
    // 重置默认概率
    resetProbabilityBtn.addEventListener('click', () => {
        saveProbabilities(DEFAULT_PROBABILITIES);
        updateProbabilityDisplay();
        alert('已重置为默认概率！');
    });
    
    // 概率滑块事件监听
    document.querySelectorAll('.probability-slider').forEach(slider => {
        const value = slider.value;
        slider.nextElementSibling.textContent = `${parseFloat(value).toFixed(2)}%`;
        
        slider.addEventListener('input', function() {
            this.nextElementSibling.textContent = `${parseFloat(this.value).toFixed(2)}%`;
            
            const pool = this.dataset.pool;
            let total = 0;
            document.querySelectorAll(`.probability-slider[data-pool="${pool}"]`).forEach(s => {
                total += parseFloat(s.value);
            });
            
            if (total > 100) {
                this.value = 100 - (total - parseFloat(this.value));
                this.nextElementSibling.textContent = `${parseFloat(this.value).toFixed(2)}%`;
            }
        });
    });
}); 