// 延迟加载图片和PDF
document.addEventListener('DOMContentLoaded', function() {
    // 为所有图片添加 lazy loading 属性
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.loading = 'lazy';
    });

    // 创建 Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                
                // 如果是图片
                if (element.tagName === 'IMG') {
                    if (element.dataset.src) {
                        element.src = element.dataset.src;
                        element.removeAttribute('data-src');
                    }
                }
                
                // 如果是PDF链接
                if (element.tagName === 'A' && element.href.endsWith('.pdf')) {
                    if (element.dataset.href) {
                        element.href = element.dataset.href;
                        element.removeAttribute('data-href');
                    }
                }
                
                observer.unobserve(element);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    // 观察所有图片和PDF链接
    document.querySelectorAll('img[data-src], a[data-href]').forEach(element => {
        observer.observe(element);
    });
}); 