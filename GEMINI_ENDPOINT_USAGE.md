# Gemini API URL 自定义功能

## 概述

现在void支持为Gemini provider配置自定义API URL，这允许用户：
- 使用代理服务器
- 连接到替代的Gemini API端点
- 使用自托管的兼容服务

## 使用方法

### 1. 在设置中配置

1. 打开Void设置
2. 找到Gemini provider配置
3. 填写API Key（必需）
4. 在"API URL"字段中输入自定义端点（可选）

### 2. API URL配置示例

#### 默认配置（留空）
- API URL: `（留空）`
- 将使用默认的Google Gemini API: `https://generativelanguage.googleapis.com`

#### 使用代理
- API URL: `https://your-proxy.com/gemini`
- 代理服务器需要转发请求到Google Gemini API

#### 使用替代端点
- API URL: `https://alternative-gemini-api.com`
- 需要兼容Google Gemini API的服务

## 技术实现

### 代码更改

1. **modelCapabilities.ts**: 为gemini provider添加了endpoint字段
2. **voidSettingsTypes.ts**: 更新了UI显示信息和帮助文本
3. **sendLLMMessage.impl.ts**: 修改了GoogleGenAI客户端初始化逻辑

### 向后兼容性

- 如果endpoint字段为空，将使用默认的Google Gemini API
- 现有配置不会受到影响
- 新功能是可选的

### 实现细节

```typescript
// 在sendLLMMessage.impl.ts中的实现
const genAIOptions: any = { apiKey: thisConfig.apiKey };

// 如果提供了自定义endpoint，则使用httpOptions.baseUrl
if (thisConfig.endpoint && thisConfig.endpoint.trim() !== '') {
    genAIOptions.httpOptions = {
        baseUrl: thisConfig.endpoint
    };
}

const genAI = new GoogleGenAI(genAIOptions);
```

## 注意事项

1. **API兼容性**: 自定义端点必须与Google Gemini API兼容
2. **安全性**: 确保自定义端点是可信的
3. **性能**: 代理可能会增加延迟
4. **错误处理**: 如果自定义端点不可用，会显示相应的错误信息

## 故障排除

### 常见问题

1. **连接失败**
   - 检查API URL是否正确
   - 确认端点是否可访问
   - 验证API Key是否有效

2. **API不兼容**
   - 确保端点支持Google Gemini API格式
   - 检查响应格式是否正确

3. **代理问题**
   - 验证代理配置
   - 检查代理是否正确转发请求头

### 测试配置

可以使用以下方法测试配置：
1. 在Void中发送一个简单的消息
2. 检查网络请求是否发送到正确的端点
3. 验证响应是否正常

## 示例配置

### 使用本地代理
```
API Key: AIzaSyYourApiKeyHere
API URL: http://localhost:8080/v1
```

### 使用企业代理
```
API Key: AIzaSyYourApiKeyHere  
API URL: https://api-proxy.company.com/gemini
```

### 使用默认设置
```
API Key: AIzaSyYourApiKeyHere
API URL: （留空）
```
