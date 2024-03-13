import service from '../utils/request';

export function getLastTask() {
  return service({
    url: '/text2video/new',
    method: 'get',
  });
}

export async function getTaskInfo(id: string) {
  let res = { success: false, data: { footage: [] } };
  try {
    res = await service.get(`/text2video/info/${id}`);
  } catch (Error) {
    console.log(Error);
  }
  if (res.success) {
    res.data.footage.forEach((footage: any) => {
      footage.name = '镜头' + footage.order;
      footage.description = footage.content;
    });
  }
  return res;
}

export async function updateTaskInfo(current_step: number, scriptInfo: any, script: any, footageDidUpdated: boolean) {
  let res = { success: false, data: '' };
  if (script.id == undefined) return res.success;
  let footage_list = undefined;
  if (footageDidUpdated) {
    footage_list = script.footage.map((footage: any, index: number) => {
      return { content: footage.description, voice: footage.voice, order: index };
    });
  }
  let data = {
    id: script.id,
    current_step: current_step,
    work_name: scriptInfo.title,
    work_type: scriptInfo.type.join(','),
    work_description: scriptInfo.description,
    bgm_prompt: script.bgm_prompt.join(','),
    aspect_ratio: script.aspect_ratio,
    footage: footage_list,
  };
  try {
    res = await service.post('/text2video/update/task', data);
  } catch (Error) {
    console.log(Error);
  }
  return res.success;
}

export async function generateScriptGPT(id: string | undefined, work_name: string, work_type: string[], work_description: string, model: string) {
  let res = { success: false, data: '',code:500 };
  if (id == undefined) return res;
  let data = { id: id, work_name: work_name, work_type: work_type.join(','), work_description: work_description };
  try {
    res = await service.post(`/text2video/script/generate/${model}`, data, { timeout: 100000 });
  } catch (Error) {
    console.log(Error);
  }
  return res;
}

export async function generateVideo(id: string | undefined) {
  let res = { success: false, data: '',code:500 };
  if (id == undefined) return res;
  try {
    res = await service.post(`/text2video/video/generate/${id}`, );
  } catch (Error) {
    console.log(Error);
  }
  return res;
}

export async function checkVideoGeneration(id: string | undefined) {
  let res = { success: false, data: '',code:500 };
  if (id == undefined) return res;
  try {
    res = await service.get(`/video/info/${id}`, );
  } catch (Error) {
    console.log(Error);
  }
  return res;
}

