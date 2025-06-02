# UI设计师个人介绍网站

这是一个UI设计师的个人介绍网站模板，用于展示个人信息、技能、经验和作品。

## 特点

- 现代化设计风格
- 响应式布局，适配各种设备
- 5个主要栏目：首页、技能、经验、作品和联系
- 精美的动画和交互效果
- 基于Bootstrap 5构建，易于定制

## 技术栈

- 前端：HTML5, CSS3, JavaScript
- 框架/库：Bootstrap 5, Font Awesome 6
- 插件：Slick.js（轮播图）, Animate.css（动画）

## 文件结构

```
.
├── index.html          # 主HTML文件
├── css/
│   └── style.css       # 自定义样式
├── js/
│   └── script.js       # JavaScript脚本
├── img/                # 图片目录
│   ├── profile.jpg     # 个人照片
│   ├── portfolio-1.jpg # 作品图片
│   └── ...
└── files/              # 文件目录
    └── resume.pdf      # 简历PDF
```

## 使用说明

1. 替换 `img/profile.jpg` 为您的个人照片
2. 在 `files/` 目录中放入您的简历PDF文件
3. 编辑 `index.html` 文件，更新个人信息、技能、经验和联系方式
4. 在 `img/` 目录中添加您的作品图片，并更新 `index.html` 中的作品集部分
5. 根据需要修改 `css/style.css` 调整样式

## 自定义配色

网站使用以下配色方案：

- 背景色：#090712（深黑色）
- 主色调：#FFA826（橙黄色），用于标题、按钮等
- 辅助色：#FFF9F5（淡米色），用于文本和次要元素

要更改配色方案，请编辑 `css/style.css` 文件中的根变量：

```css
:root {
    --dark-bg: #090712;
    --primary-color: #FFA826;
    --text-color: #FFF9F5;
    ...
}
```

## 注意事项

- 请确保所有图片都是您拥有版权的或可免费商用的
- 联系表单需要后端支持才能正常工作，目前仅展示UI效果

## 许可

此模板基于MIT许可证开源，您可以自由使用、修改和分发。 