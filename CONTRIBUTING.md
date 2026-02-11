# 贡献指南

感谢您对 TTS Toolkit 的关注！我们欢迎任何形式的贡献。

## 如何贡献

### 报告问题

如果您发现了bug或有功能建议，请：

1. 在 [Issues](https://github.com/zhanglinqian/tts-toolkit/issues) 中搜索是否已有相同问题
2. 如果没有，创建新的Issue，详细描述：
   - 问题描述
   - 复现步骤
   - 预期行为
   - 实际行为
   - 环境（操作系统、Node.js版本等）

### 提交代码

1. **Fork** 本仓库
2. **Clone** 您的Fork到本地
3. 创建新的分支：`git checkout -b feature/your-feature`
4. 进行修改并编写测试
5. 提交代码：`git commit -m 'Add some feature'`
6. 推送到您的Fork：`git push origin feature/your-feature`
7. 创建 **Pull Request**

### 代码规范

- 使用 ES6+ 语法
- 添加适当的注释
- 编写测试用例
- 保持代码简洁清晰
- 遵循现有的代码风格

### 测试

在提交PR之前，请确保：

```bash
npm test
```

所有测试都应该通过。

## 开发指南

### 项目结构

```
tts-toolkit/
├── index.js          # 主文件
├── test.js           # 测试文件
├── examples/         # 示例代码
├── LICENSE           # MIT许可证
├── README.md         # 项目说明
└── package.json      # 项目配置
```

### 添加新的TTS引擎

1. 在 `index.js` 的 `TTS` 类中添加新方法
2. 更新 `speak()` 方法以支持新引擎
3. 在 README.md 中添加新引擎的文档
4. 添加测试用例

### 添加新的语音

在 `getVoices()` 方法中添加新语音的配置：

```javascript
{
  id: 'voice-id',
  name: '语音名称',
  gender: '男/女',
  lang: '语言代码'
}
```

## 许可证

通过贡献代码，您同意您的贡献将在 MIT 许可证下发布。
