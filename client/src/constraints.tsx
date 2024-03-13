export const constraints = {
  VIP_NAMES: {
    'free': '普通',
    'advanced': '高级',
    'ultimate': '至尊',
  },
  SCRIPT_TITLE_MAX_LENGTH: 20,
  SCRIPT_DESCRIPTION_MAX_LENGTH: {
    free: 400,
    advanced: 1000,
    ultimate: 1000,
  },
  VIDEO_TYPES: [{
    label: '电影',
    value: '电影',
  }, {
    label: '动画',
    value: '动画',
  }, {
    label: '短视频',
    value: '短视频',
  }, {
    label: '营销视频',
    value: '营销视频',
  }, {
    label: '科普视频',
    value: '科普视频',
  }],
  FOOTAGE_DESCRIPTION_MAX_LENGTH: {
    free: 150,
    advanced: 300,
    ultimate: 500,
  },
  FOOTAGE_MAX_NUM: {
    free: 3,
    advanced: 10,
    ultimate: 20,
  },
  ASPECT_RATIO: [{
    label: '纵向',
    value: 'portrait',
  }, {
    label: '正方形',
    value: 'square',
  }, {
    label: '横向',
    value: 'horizontal',
  }],
  BGM_PROMPTS: [{
    label: '科幻',
    value: '科幻',
  }, {
    label: '动画',
    value: '动画',
  }, {
    label: '激情',
    value: '激情',
  }, {
    label: '文艺',
    value: '文艺',
  }, {
    label: '戏剧',
    value: '戏剧',
  }, {
    label: '喜剧',
    value: '喜剧',
  }, {
    label: '古典',
    value: '古典',
  }],
  GPT_MODELS: [{
    label: 'OpenAI GPT3.5 Turbo (基础开销0.1，镜头开销0.07) **推荐,性价比高** ',
    value: 'gpt-3.5-turbo-1106',
  }, {
    label: 'OpenAI GPT4 Turbo (基础开销1，镜头开销1) **推荐,业界标杆**',
    value: 'gpt-4-turbo-preview',
  }, {
    label: 'Claude 3 Opus (基础开销1.5，镜头开销2.6) **推荐,强,贵,慢**',
    value: 'claude-3-opus-20240229',
  }, {
    label: 'Claude 3 Sonnet (基础开销0.3，镜头开销0.5) **推荐,性价比高**',
    value: 'claude-3-sonnet-20240229',
  }, {
    label: '百度千帆大模型 ERNIE-Bot 4.0 (基础开销0.9，镜头开销0.3) **国产遥遥领先**',
    value: 'ERNIE-Bot-4',
  }, {
    label: '百度千帆大模型 ERNIE-Bot 3.5 (基础开销0.06，镜头开销0.02)',
    value: 'ERNIE-Bot-turbo',
  }, {
    label: '智谱AI GLM-4 (基础开销0.8，镜头开销0.53) **国产遥遥领先**',
    value: 'glm-4',
  }, {
    label: '智谱AI GLM-3 Turbo (基础开销0.04，镜头开销0.02)',
    value: 'glm-3-turbo',
  }, {
    label: '谷歌Gemini Pro (基础开销0.15，镜头开销0.1)',
    value: 'gemini-pro',
  }],
  VIDEO_COST: 100,
};