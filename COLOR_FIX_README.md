# 字体颜色问题修复说明

## 问题描述
在Windows系统上访问网站时，字体显示为灰色而不是预期的浅色（#FFF9F5）。

## 问题原因分析

### 1. 备用CSS覆盖主样式
在 `css/bootstrap-fallback.css` 文件中，`body` 元素的颜色被设置为 `#212529`（深灰色），这覆盖了主CSS文件中的颜色设置。

### 2. CSS优先级问题
备用CSS文件中的颜色设置没有考虑网站的主题色彩，直接使用了Bootstrap的默认颜色。

### 3. 颜色冲突
当CDN不可用，启用备用样式时，备用样式会覆盖网站的主题颜色。

## 修复方案

### 1. 移除备用CSS中的默认颜色
在 `css/bootstrap-fallback.css` 中：
```css
body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-size: 1rem;
    line-height: 1.5;
    /* 移除默认颜色，让主CSS文件控制颜色 */
    /* color: #212529; */
}
```

### 2. 增强主CSS的颜色优先级
在 `css/style.css` 中：
```css
body {
    font-family: 'Poppins', 'Microsoft YaHei', sans-serif;
    background-color: var(--dark-bg) !important;
    color: var(--text-color) !important;
    line-height: 1.6;
    overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    margin-bottom: 15px;
    color: var(--text-color) !important;
}
```

### 3. 修复其他颜色冲突
- 移除备用CSS中模态框的默认背景色
- 移除备用CSS中按钮关闭按钮的默认颜色
- 确保所有颜色设置都遵循网站主题

## 修复后的效果

### 正常情况（CDN可用）
- 文字颜色：浅色 (#FFF9F5)
- 背景色：深色 (#090712)
- 主要颜色：橙色 (#FFA826)

### CDN不可用情况（启用备用样式）
- 文字颜色：仍然保持浅色 (#FFF9F5)
- 背景色：仍然保持深色 (#090712)
- 主要颜色：仍然保持橙色 (#FFA826)

## 颜色主题规范

### 主要颜色
- **深色背景**：`#090712`
- **主要颜色**：`#FFA826` (橙色)
- **文字颜色**：`#FFF9F5` (浅色)

### 次要颜色
- **次要文字**：`rgba(255, 249, 245, 0.8)` (半透明浅色)
- **边框颜色**：`rgba(255, 255, 255, 0.05)` (半透明白色)
- **悬停颜色**：`#e89518` (深橙色)

## 测试方法

### 1. 使用颜色测试页面
打开 `test-colors.html` 页面，检查：
- 背景色是否正确显示为深色
- 文字颜色是否正确显示为浅色
- 主要颜色是否正确显示为橙色

### 2. 模拟CDN失败
1. 在浏览器开发者工具中阻止Bootstrap CSS加载
2. 刷新页面
3. 检查颜色是否仍然正确

### 3. 检查控制台
- 确认没有颜色相关的错误
- 确认备用样式正确启用

## 文件修改清单

### 修改的文件
- `css/bootstrap-fallback.css` - 移除默认颜色设置
- `css/style.css` - 增强颜色优先级
- `test-colors.html` - 新增颜色测试页面

### 修改的具体内容
1. **备用CSS文件**：
   - 注释掉 `body` 的默认颜色
   - 注释掉模态框的默认背景色
   - 注释掉按钮关闭按钮的默认颜色

2. **主CSS文件**：
   - 为 `body` 颜色添加 `!important`
   - 为标题颜色添加 `!important`
   - 确保颜色优先级

## 注意事项

1. **CSS优先级**：使用 `!important` 确保主题颜色不被覆盖
2. **备用样式**：备用样式只提供布局功能，不覆盖颜色主题
3. **兼容性**：确保在所有浏览器中颜色显示一致
4. **维护**：定期检查颜色主题的一致性

## 建议

1. **颜色变量**：使用CSS变量统一管理颜色
2. **主题系统**：考虑实现多主题支持
3. **颜色测试**：定期使用测试页面验证颜色
4. **文档化**：保持颜色规范文档的更新 