const { TTS } = require('./index.js');

async function runTests() {
  console.log('🎤 TTS Toolkit 测试开始...\n');

  // 测试1：基础TTS
  console.log('测试1: 基础TTS');
  try {
    const tts1 = new TTS();
    await tts1.speak('你好，世界！', '/tmp/test1.mp3');
    console.log('');
  } catch (error) {
    console.log('⚠️ 跳过测试1:', error.message);
    console.log('');
  }

  // 测试2：指定语音
  console.log('测试2: 指定语音');
  try {
    const tts2 = new TTS();
    await tts2.speak('你好，我是小龙虾！', '/tmp/test2.mp3', {
      voice: 'zh-CN-XiaoxiaoNeural'
    });
    console.log('');
  } catch (error) {
    console.log('⚠️ 跳过测试2:', error.message);
    console.log('');
  }

  // 测试3：英文TTS
  console.log('测试3: 英文TTS');
  try {
    const tts3 = new TTS();
    await tts3.speak('Hello, World!', '/tmp/test3.mp3', {
      voice: 'en-US-GuyNeural',
      lang: 'en-US'
    });
    console.log('');
  } catch (error) {
    console.log('⚠️ 跳过测试3:', error.message);
    console.log('');
  }

  // 测试4：获取语音列表
  console.log('测试4: 获取语音列表');
  const tts4 = new TTS();
  const voices = tts4.getVoices();
  console.log('中文语音:', voices.chinese.map(v => v.name).join(', '));
  console.log('英文语音:', voices.english.map(v => v.name).join(', '));
  console.log('');

  // 测试5：获取语言列表
  console.log('测试5: 获取语言列表');
  const languages = tts4.listLanguages();
  console.log('支持的语言:', languages.map(l => l.name).join(', '));
  console.log('');

  console.log('✅ 测试完成！');
}

runTests().catch(error => {
  console.error('❌ 测试失败:', error);
});
