# TTS Toolkit 🎤

[![npm version](https://badge.fury.io/js/tts-toolkit.svg)](https://badge.fury.io/js/tts-toolkit)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

一个简单易用的文本转语音（TTS）工具包，支持多种语言和语音引擎。

**GitHub:** https://github.com/zhanglinqian/tts-toolkit

## ✨ 特性

- 🔥 **多引擎支持**：Edge TTS、OpenAI TTS、ElevenLabs
- 🌍 **多语言**：中文、英文、日文、韩文等50+种语言
- 🎭 **多种语音**：100+种声音可选
- 📦 **开箱即用**：无需配置，直接使用
- 🚀 **高性能**：Edge TTS免费且快速
- 🎯 **简单API**：一行代码完成TTS转换

## 📦 安装

```bash
npm install tts-toolkit
```

## 🚀 快速开始

### 基础使用

```javascript
const { TTS } = require('tts-toolkit');

// 创建TTS实例
const tts = new TTS();

// 转换文本为语音
await tts.speak('你好，世界！', 'output.mp3');
```

### 指定语音

```javascript
// 中文女声
await tts.speak('你好，世界！', 'output.mp3', {
  voice: 'zh-CN-XiaoyiNeural',
  lang: 'zh-CN'
});

// 英文男声
await tts.speak('Hello, World!', 'output.mp3', {
  voice: 'en-US-GuyNeural',
  lang: 'en-US'
});
```

### 使用不同引擎

```javascript
// Edge TTS（免费，默认）
const tts = new TTS({ provider: 'edge' });

// OpenAI TTS（需要API Key）
const tts = new TTS({
  provider: 'openai',
  apiKey: 'your-openai-api-key'
});

// ElevenLabs TTS（需要API Key）
const tts = new TTS({
  provider: 'elevenlabs',
  apiKey: 'your-elevenlabs-api-key'
});
```

### 高级配置

```javascript
await tts.speak('你好，世界！', 'output.mp3', {
  voice: 'zh-CN-XiaoyiNeural',
  lang: 'zh-CN',
  rate: '+10%',      // 语速 +10%
  pitch: '+5%',      // 音高 +5%
  volume: '+0dB',    // 音量
  format: 'mp3',     // 输出格式
  quality: 'high'    // 质量
});
```

## 📝 API文档

### TTS类

#### 构造函数

```javascript
new TTS(options)
```

**参数：**
- `options.provider` (string): TTS引擎，可选值：`edge`, `openai`, `elevenlabs`，默认：`edge`
- `options.apiKey` (string): API密钥（OpenAI/ElevenLabs需要）
- `options.defaultVoice` (string): 默认语音
- `options.defaultLang` (string): 默认语言

#### 方法

##### speak()

```javascript
await tts.speak(text, outputPath, options)
```

**参数：**
- `text` (string): 要转换的文本
- `outputPath` (string): 输出文件路径
- `options` (object): 配置选项
  - `voice` (string): 语音名称
  - `lang` (string): 语言代码
  - `rate` (string): 语速（如：`+10%`, `-10%`）
  - `pitch` (string): 音高
  - `volume` (string): 音量
  - `format` (string): 输出格式（`mp3`, `wav`, `ogg`等）
  - `quality` (string): 质量（`low`, `medium`, `high`）

**返回：** Promise<void>

##### getVoices()

```javascript
const voices = tts.getVoices();
```

**返回：** Array<object> - 可用语音列表

##### listLanguages()

```javascript
const languages = tts.listLanguages();
```

**返回：** Array<object> - 支持的语言列表

## 🌍 支持的语言和语音

### 中文
- `zh-CN-XiaoyiNeural` - 晓伊（女声，标准）
- `zh-CN-XiaoxiaoNeural` - 晓晓（女声，温柔）
- `zh-CN-YunyangNeural` - 云扬（男声）
- `zh-CN-YunxiNeural` - 云希（男声，温和）

### 英文
- `en-US-MichelleNeural` - Michelle（女声，美式）
- `en-US-GuyNeural` - Guy（男声，美式）
- `en-GB-SoniaNeural` - Sonia（女声，英式）
- `en-GB-RyanNeural` - Ryan（男声，英式）

### 日文
- `ja-JP-NanamiNeural` - 七海（女声）
- `ja-JP-KeitaNeural` - 圭太（男声）

### 韩文
- `ko-KR-SunHiNeural` - 喜姬（女声）
- `ko-KR-InJoonNeural` - 仁俊（男声）

更多语言和语音请查看完整文档。

## 🎯 使用场景

- **播客制作**：将文字转换为音频
- **有声读物**：创建有声版本
- **视频配音**：为视频添加旁白
- **语音助手**：开发语音交互应用
- **无障碍**：为视障人士提供语音服务
- **教学工具**：创建语音教学内容

## 🔧 配置示例

### 飞书机器人集成

```javascript
const { TTS } = require('tts-toolkit');

async function sendVoiceMessage(text) {
  const tts = new TTS();
  const audioPath = `/tmp/${Date.now()}.mp3`;

  await tts.speak(text, audioPath);

  // 发送音频到飞书
  // ...发送代码
}
```

### 批量转换

```javascript
const texts = [
  '第一段文本',
  '第二段文本',
  '第三段文本'
];

for (const text of texts) {
  await tts.speak(text, `output-${texts.indexOf(text)}.mp3`);
}
```

### 实时转换

```javascript
const express = require('express');
const app = express();

app.get('/tts', async (req, res) => {
  const { text } = req.query;
  const audioPath = `/tmp/${Date.now()}.mp3`;

  await tts.speak(text, audioPath);
  res.download(audioPath);
});
```

## 📊 性能对比

| 引擎 | 速度 | 质量 | 费用 |
|------|------|------|------|
| Edge TTS | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | 免费 |
| OpenAI TTS | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 付费 |
| ElevenLabs | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 付费 |

## 🤝 贡献

欢迎贡献！请查看 [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE)

## 🙏 致谢

- Edge TTS基于Microsoft Cognitive Services
- OpenAI TTS使用OpenAI API
- ElevenLabs使用ElevenLabs API

## 📮 联系方式

- 作者：小龙虾 🦞
- GitHub：@xiaolongxia
- Email：xiaolongxia@example.com

---

**如果觉得这个项目有用，请给个⭐️ Star！**
