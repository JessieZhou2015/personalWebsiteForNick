/*
==============================================
UI设计师个人网站 - JavaScript脚本
作者：倪辰
==============================================
*/

document.addEventListener('DOMContentLoaded', function() {
    "use strict";
    
    // 预加载
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 1000);
    
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // 更新导航激活状态
                document.querySelectorAll('.nav-link').forEach(navLink => {
                    navLink.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // 导航激活状态
    function updateNavActive() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(navLink => {
            navLink.classList.remove('active');
            if (navLink.getAttribute('href') === `#${current}`) {
                navLink.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateNavActive);
    
    // 作品集模态框
    const projectItems = document.querySelectorAll('.portfolio-item');
    const projectLinks = document.querySelectorAll('.btn-view-project');
    const projectModal = document.getElementById('projectModal');
    const projectTitle = document.getElementById('projectTitle');
    const projectContent = document.getElementById('projectContent');
    
    // 整个卡片点击事件
    projectItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // 如果点击的是查看详情按钮，不执行卡片的点击事件，避免重复触发
            if (e.target.closest('.btn-view-project')) {
                return;
            }
            
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
    
    // "查看详情"按钮点击事件
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectId = this.getAttribute('data-project');
            openProjectModal(projectId);
        });
    });
    
    // 打开项目模态框的通用函数
    function openProjectModal(projectId) {
        const project = projectData[projectId];
        
        if (project) {
            projectTitle.textContent = project.title;
            
            let content = `
                <div class="project-image">
                    <img src="${project.images[0]}" alt="${project.title}" style="width: 100%; height: auto;">
                </div>
            `;
            
            projectContent.innerHTML = content;
            
            // 显示模态框
            const bsModal = new bootstrap.Modal(projectModal);
            bsModal.show();
        }
    }
    
    // 模态框关闭时清理
    projectModal.addEventListener('hidden.bs.modal', function () {
        projectContent.innerHTML = '';
    });
    
    // 联系表单已使用FormSubmit服务处理，无需JavaScript代码
    
    // 添加滚动动画
    function addScrollAnimation() {
        const elements = document.querySelectorAll('.skill-card, .timeline-item, .portfolio-item, .contact-item');
        const isMobile = window.innerWidth <= 767;
        
        elements.forEach((element, index) => {
            element.classList.add('animate__animated');
            element.classList.add('animate__fadeInUp');
            
            // 手机端两列显示时，调整动画延迟
            if (isMobile && element.classList.contains('skill-card')) {
                // 在手机端，每行有两个元素，所以第1和第3个元素应该没有延迟，第2和第4个元素有延迟
                const delayMultiplier = index % 2 === 0 ? 0 : 1;
                element.style.animationDelay = `${0.1 * delayMultiplier}s`;
            } else {
                // 桌面端三列显示，保持原有逻辑
                element.style.animationDelay = `${0.1 * (index % 3)}s`;
            }
            
            element.style.opacity = '0';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.style.opacity = '1';
                        }, 100);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            
            observer.observe(element);
        });
    }
    
    // 初始化滚动动画
    addScrollAnimation();
    
    // 监听窗口大小变化，更新动画效果
    window.addEventListener('resize', function() {
        // 重新应用动画效果
        addScrollAnimation();
    });
}); 