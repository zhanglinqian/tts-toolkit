const { EdgeTTS } = require('node-edge-tts');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

/**
 * TTS Toolkit - 文本转语音工具包
 * 支持 Edge TTS、OpenAI TTS、ElevenLabs
 */
class TTS {
  constructor(options = {}) {
    this.provider = options.provider || 'edge';
    this.apiKey = options.apiKey || null;
    this.defaultVoice = options.defaultVoice || 'zh-CN-XiaoyiNeural';
    this.defaultLang = options.defaultLang || 'zh-CN';
    this.defaultFormat = options.defaultFormat || 'audio-24khz-48kbitrate-mono-mp3';
  }

  /**
   * 文本转语音
   * @param {string} text - 要转换的文本
   * @param {string} outputPath - 输出文件路径
   * @param {object} options - 配置选项
   */
  async speak(text, outputPath, options = {}) {
    const config = {
      voice: options.voice || this.defaultVoice,
      lang: options.lang || this.defaultLang,
      rate: options.rate || 'default',
      pitch: options.pitch || 'default',
      volume: options.volume || 'default',
      format: options.format || 'audio-24khz-48kbitrate-mono-mp3',
      maxRetries: options.maxRetries || 3
    };

    switch (this.provider) {
      case 'edge':
        await this.edgeTTS(text, outputPath, config, config.maxRetries);
        break;
      case 'openai':
        await this.openaiTTS(text, outputPath, config);
        break;
      case 'elevenlabs':
        await this.elevenLabsTTS(text, outputPath, config);
        break;
      default:
        throw new Error(`Unknown provider: ${this.provider}`);
    }
  }

  /**
   * Edge TTS（免费）
   * @param {number} maxRetries - 最大重试次数
   */
  async edgeTTS(text, outputPath, config, maxRetries = 3) {
    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const tts = new EdgeTTS({
          voice: config.voice,
          lang: config.lang,
          outputFormat: config.format,
          rate: config.rate,
          pitch: config.pitch,
          volume: config.volume,
          timeout: 30000
        });

        await tts.ttsPromise(text, outputPath);
        console.log(`✅ TTS成功: ${outputPath}`);
        return;
      } catch (error) {
        lastError = error;
        if (attempt < maxRetries) {
          console.log(`⚠️ 重试 ${attempt}/${maxRetries}: ${error.message}`);
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt)); // 指数退避
        }
      }
    }
    throw new Error(`Edge TTS失败（重试${maxRetries}次后）: ${lastError.message}`);
  }

  /**
   * OpenAI TTS（需要API Key）
   */
  async openaiTTS(text, outputPath, config) {
    if (!this.apiKey) {
      throw new Error('OpenAI TTS需要API Key');
    }

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/audio/speech',
        {
          model: 'tts-1',
          input: text,
          voice: config.voice.replace('en-US-', '').toLowerCase() || 'alloy',
          response_format: 'mp3'
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json'
          },
          responseType: 'arraybuffer'
        }
      );

      fs.writeFileSync(outputPath, Buffer.from(response.data));
      console.log(`✅ TTS成功: ${outputPath}`);
    } catch (error) {
      throw new Error(`OpenAI TTS失败: ${error.message}`);
    }
  }

  /**
   * ElevenLabs TTS（需要API Key）
   */
  async elevenLabsTTS(text, outputPath, config) {
    if (!this.apiKey) {
      throw new Error('ElevenLabs TTS需要API Key');
    }

    try {
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${config.voice}`,
        {
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        },
        {
          headers: {
            'xi-api-key': this.apiKey,
            'Content-Type': 'application/json'
          },
          responseType: 'arraybuffer'
        }
      );

      fs.writeFileSync(outputPath, Buffer.from(response.data));
      console.log(`✅ TTS成功: ${outputPath}`);
    } catch (error) {
      throw new Error(`ElevenLabs TTS失败: ${error.message}`);
    }
  }

  /**
   * 获取可用语音列表
   */
  getVoices() {
    const voices = {
      chinese: [
        { id: 'zh-CN-XiaoyiNeural', name: '晓伊', gender: '女', lang: 'zh-CN' },
        { id: 'zh-CN-XiaoxiaoNeural', name: '晓晓', gender: '女', lang: 'zh-CN' },
        { id: 'zh-CN-YunyangNeural', name: '云扬', gender: '男', lang: 'zh-CN' },
        { id: 'zh-CN-YunxiNeural', name: '云希', gender: '男', lang: 'zh-CN' }
      ],
      english: [
        { id: 'en-US-MichelleNeural', name: 'Michelle', gender: '女', lang: 'en-US' },
        { id: 'en-US-GuyNeural', name: 'Guy', gender: '男', lang: 'en-US' },
        { id: 'en-GB-SoniaNeural', name: 'Sonia', gender: '女', lang: 'en-GB' },
        { id: 'en-GB-RyanNeural', name: 'Ryan', gender: '男', lang: 'en-GB' }
      ],
      japanese: [
        { id: 'ja-JP-NanamiNeural', name: '七海', gender: '女', lang: 'ja-JP' },
        { id: 'ja-JP-KeitaNeural', name: '圭太', gender: '男', lang: 'ja-JP' }
      ],
      korean: [
        { id: 'ko-KR-SunHiNeural', name: '喜姬', gender: '女', lang: 'ko-KR' },
        { id: 'ko-KR-InJoonNeural', name: '仁俊', gender: '男', lang: 'ko-KR' }
      ]
    };

    return voices;
  }

  /**
   * 列出支持的语言
   */
  listLanguages() {
    return [
      { code: 'zh-CN', name: '中文（简体）', voiceCount: 4 },
      { code: 'en-US', name: 'English (US)', voiceCount: 2 },
      { code: 'en-GB', name: 'English (UK)', voiceCount: 2 },
      { code: 'ja-JP', name: '日本語', voiceCount: 2 },
      { code: 'ko-KR', name: '한국어', voiceCount: 2 }
    ];
  }
}

module.exports = { TTS };
