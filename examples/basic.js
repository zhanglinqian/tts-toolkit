const { TTS } = require('../index.js');

async function basicExample() {
  console.log('🎤 基础使用示例\n');

  // 创建TTS实例
  const tts = new TTS();

  // 转换文本为语音
  await tts.speak('你好，世界！', '/tmp/basic-example.mp3');

  console.log('✅ 语音已生成: /tmp/basic-example.mp3');
}

basicExample();
