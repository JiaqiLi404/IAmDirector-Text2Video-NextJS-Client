import service from '@/utils/request';

export async function login(data: { phone: any; password: any; }) {
  let res = { data: '' };
  try {
    res = await service.post('/login/login', data);
  } catch (Error) {
    console.log(Error);
  }
  return res;
}

export async function sendCode(phone: string) {
  let data = { phone: phone };
  let res = { data: '' };
  try {
    res = await service.post('/login/getSMSCode', data);
  } catch (Error) {
    console.log(Error);
  }
  return res;
}

export async function varifyCode(phone: string, code: string) {
  let data = { phone: phone, code: code };
  let res = { success: false, data: { token: '', vip_level: 'none' } };
  if(phone.length<6||code.length!=4){return res;}
  try {
    res = await service.post('/login/varifySMSCode', data);
  } catch (Error) {
    console.log(Error);
  }
  return res;
}

export async function getInfo() {
  let res = { success: false, data: { balance: undefined } };
  try {
    res = await service.get('/user/info');
  } catch (Error) {
    console.log(Error);
  }
  return res;
}

export async function getUserTaskCount(user_id: string) {
  let res = { success: false, data: { task_num: 0,work_num:0 } };
  try {
    res = await service.get(`/text2video/user/count/${user_id}`);
  } catch (Error) {
    console.log(Error);
  }
  return res;
}

