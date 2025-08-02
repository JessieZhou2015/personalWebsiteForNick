// 按钮样式修复脚本 - 确保Windows上按钮样式正确显示
(function() {
    'use strict';
    
    function fixButtonStyles() {
        // 查找下载简历按钮
        const downloadButton = document.querySelector('a[href*="倪辰_高级UI_10年经验_18514592618.pdf"]');
        
        if (downloadButton) {
            console.log('找到下载简历按钮，应用样式修复');
            
            // 强制应用样式
            downloadButton.style.setProperty('background-color', '#FFA826', 'important');
            downloadButton.style.setProperty('color', '#fff', 'important');
            downloadButton.style.setProperty('border', '1px solid #FFA826', 'important');
            downloadButton.style.setProperty('padding', '12px 30px', 'important');
            downloadButton.style.setProperty('border-radius', '30px', 'important');
            downloadButton.style.setProperty('font-weight', '500', 'important');
            downloadButton.style.setProperty('display', 'inline-flex', 'important');
            downloadButton.style.setProperty('align-items', 'center', 'important');
            downloadButton.style.setProperty('text-decoration', 'none', 'important');
            downloadButton.style.setProperty('transition', 'all 0.3s ease', 'important');
            downloadButton.style.setProperty('background-image', 'none', 'important');
            downloadButton.style.setProperty('box-shadow', 'none', 'important');
            
            // 添加悬停事件
            downloadButton.addEventListener('mouseenter', function() {
                this.style.setProperty('background-color', '#e89518', 'important');
                this.style.setProperty('border-color', '#e89518', 'important');
                this.style.setProperty('transform', 'translateY(-3px)', 'important');
                this.style.setProperty('box-shadow', '0 10px 20px rgba(255, 168, 38, 0.2)', 'important');
            });
            
            downloadButton.addEventListener('mouseleave', function() {
                this.style.setProperty('background-color', '#FFA826', 'important');
                this.style.setProperty('border-color', '#FFA826', 'important');
                this.style.setProperty('transform', 'translateY(0)', 'important');
                this.style.setProperty('box-shadow', 'none', 'important');
            });
            
            // 定期检查样式是否被覆盖
            setInterval(function() {
                const computedStyle = window.getComputedStyle(downloadButton);
                if (computedStyle.backgroundColor !== 'rgb(255, 168, 38)' && 
                    computedStyle.backgroundColor !== 'rgba(255, 168, 38, 1)') {
                    console.log('检测到按钮样式被覆盖，重新应用');
                    downloadButton.style.setProperty('background-color', '#FFA826', 'important');
                }
            }, 1000);
        }
    }
    
    // 页面加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', fixButtonStyles);
    } else {
        fixButtonStyles();
    }
    
    // 延迟执行，确保所有CSS都加载完成
    setTimeout(fixButtonStyles, 100);
    setTimeout(fixButtonStyles, 500);
    setTimeout(fixButtonStyles, 1000);
    
    // 监听DOM变化
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const target = mutation.target;
                if (target.matches && target.matches('a[href*="倪辰_高级UI_10年经验_18514592618.pdf"]')) {
                    console.log('检测到按钮样式变化，重新应用');
                    setTimeout(fixButtonStyles, 50);
                }
            }
        });
    });
    
    // 开始观察
    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['style'],
        subtree: true
    });
    
    console.log('按钮样式修复脚本已加载');
})(); 