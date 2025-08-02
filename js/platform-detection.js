// 平台检测和CDN优化脚本
(function() {
    'use strict';
    
    // 检测操作系统
    function detectOS() {
        const userAgent = navigator.userAgent;
        const platform = navigator.platform;
        
        if (userAgent.indexOf('Windows') !== -1) {
            return 'windows';
        } else if (userAgent.indexOf('Mac') !== -1) {
            return 'mac';
        } else if (userAgent.indexOf('Linux') !== -1) {
            return 'linux';
        } else {
            return 'other';
        }
    }
    
    // 检测网络环境
    function detectNetwork() {
        // 检查是否在中国大陆网络环境
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const language = navigator.language || navigator.userLanguage;
        
        // 中国大陆时区
        const chinaTimezones = ['Asia/Shanghai', 'Asia/Urumqi', 'Asia/Harbin'];
        
        // 中国大陆语言
        const chinaLanguages = ['zh-CN', 'zh-Hans', 'zh'];
        
        if (chinaTimezones.includes(timezone) || chinaLanguages.includes(language)) {
            return 'china';
        }
        
        return 'global';
    }
    
    // 获取优化的CDN配置
    function getOptimizedCDN() {
        const os = detectOS();
        const network = detectNetwork();
        
        // Windows + 中国大陆网络环境：使用unpkg.com作为主要CDN
        if (os === 'windows' && network === 'china') {
            return {
                bootstrap: {
                    css: 'https://unpkg.com/bootstrap@5.1.3/dist/css/bootstrap.min.css',
                    js: 'https://unpkg.com/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js'
                },
                slick: {
                    css: 'https://unpkg.com/slick-carousel@1.8.1/slick/slick.css',
                    theme: 'https://unpkg.com/slick-carousel@1.8.1/slick/slick-theme.css',
                    js: 'https://unpkg.com/slick-carousel@1.8.1/slick/slick.min.js'
                },
                fontawesome: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
                animate: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
                jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'
            };
        }
        
        // 其他环境：使用混合CDN策略
        return {
            bootstrap: {
                css: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/css/bootstrap.min.css',
                js: 'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/js/bootstrap.bundle.min.js'
            },
            slick: {
                css: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick/slick.css',
                theme: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick/slick-theme.css',
                js: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick/slick.min.js'
            },
            fontawesome: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css',
            animate: 'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css',
            jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js'
        };
    }
    
    // 动态加载资源
    function loadResource(type, url, attributes = {}) {
        return new Promise((resolve, reject) => {
            let element;
            
            if (type === 'css') {
                element = document.createElement('link');
                element.rel = 'stylesheet';
                element.href = url;
            } else if (type === 'js') {
                element = document.createElement('script');
                element.src = url;
            }
            
            // 设置额外属性
            Object.keys(attributes).forEach(key => {
                element.setAttribute(key, attributes[key]);
            });
            
            element.onload = () => resolve(element);
            element.onerror = () => reject(new Error(`Failed to load ${url}`));
            
            document.head.appendChild(element);
        });
    }
    
    // 初始化优化加载
    function initOptimizedLoading() {
        const cdn = getOptimizedCDN();
        const os = detectOS();
        const network = detectNetwork();
        
        console.log(`检测到平台: ${os}, 网络环境: ${network}`);
        console.log('使用优化的CDN配置:', cdn);
        
        // 移除现有的CDN链接
        const existingLinks = document.querySelectorAll('link[href*="cdn.jsdelivr.net"], link[href*="cdnjs.cloudflare.com"]');
        existingLinks.forEach(link => {
            if (link.href.includes('bootstrap') || link.href.includes('slick') || link.href.includes('font-awesome') || link.href.includes('animate')) {
                link.remove();
            }
        });
        
        // 移除现有的脚本
        const existingScripts = document.querySelectorAll('script[src*="cdn.jsdelivr.net"], script[src*="cdnjs.cloudflare.com"]');
        existingScripts.forEach(script => {
            if (script.src.includes('bootstrap') || script.src.includes('slick') || script.src.includes('jquery')) {
                script.remove();
            }
        });
        
        // 按顺序加载资源
        const loadSequence = [
            // CSS资源
            () => loadResource('css', cdn.bootstrap.css),
            () => loadResource('css', cdn.fontawesome),
            () => loadResource('css', cdn.animate),
            () => loadResource('css', cdn.slick.css),
            () => loadResource('css', cdn.slick.theme),
            
            // JavaScript资源
            () => loadResource('js', cdn.jquery),
            () => loadResource('js', cdn.bootstrap.js),
            () => loadResource('js', cdn.slick.js)
        ];
        
        // 顺序加载
        loadSequence.reduce((promise, loader) => {
            return promise.then(() => loader());
        }, Promise.resolve()).then(() => {
            console.log('所有资源加载完成');
            
            // 初始化Bootstrap功能
            if (typeof bootstrap !== 'undefined') {
                // 初始化tooltip
                var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
                var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
                    return new bootstrap.Tooltip(tooltipTriggerEl);
                });
                console.log('Bootstrap tooltip初始化完成');
            }
        }).catch(error => {
            console.warn('资源加载失败，启用备用方案:', error);
            // 启用备用样式
            var fallbackCSS = document.getElementById('bootstrap-fallback');
            if (fallbackCSS) {
                fallbackCSS.disabled = false;
            }
        });
    }
    
    // 页面加载完成后执行
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initOptimizedLoading);
    } else {
        initOptimizedLoading();
    }
    
    // 导出检测函数供外部使用
    window.PlatformDetection = {
        detectOS: detectOS,
        detectNetwork: detectNetwork,
        getOptimizedCDN: getOptimizedCDN
    };
})(); 