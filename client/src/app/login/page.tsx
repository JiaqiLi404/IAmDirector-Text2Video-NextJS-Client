'use client';

import React, { HTMLAttributes, PropsWithChildren, useEffect } from 'react';
import Head from '@/components/layout/Head';
import { setToken } from '@/auth';
import { login, sendCode, varifyCode } from '@/api/user';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, Space, Input, message, Modal } from 'antd';
import Captcha from 'react-captcha-code';


function LoginPage() {
  const router = useRouter();
  const [code_cooldown, setCodeCooldown] = React.useState(0);
  const [captcha, setCaptcha] = React.useState('');
  const [stateNumber, setStateNumber] = React.useState('+86');
  const [phone, setPhone] = React.useState('');
  const [captchaInput, setCaptchaInput] = React.useState('');
  const [codeInput, setCodeInput] = React.useState('');
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';
  const [showPolicy, setShowPolicy] = React.useState(false);

  useEffect(() => {

    // const fetchData = async () => {
    //   const result: any = await login({ identity: 'your phone', password: '111' }, router);
    //   setToken(result.data.token);
    //   console.log('result', result.data.token);
    // };
    // fetchData();
  }, []);

  async function getCode() {
    if (phone == '') {
      return;
    }
    setCodeCooldown(60);
    const result: any = await sendCode(phone);
    console.log(result);
    const timer = setInterval(() => {
      setCodeCooldown((prev) => {
        if (prev === 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }

  async function handleLogin() {
    const result = await varifyCode(phone, codeInput);
    if (result.success) {
      setToken(result.data.token);
      localStorage.setItem('phone', phone);
      localStorage.setItem('vip_level', result.data.vip_level);
      message.success('登录成功');
      setTimeout(() => {
        router.push(redirect);
      }, 1000);
    } else {
      message.error('验证码错误');
    }
  }

  return (
    <>
      <Head title={'login'} subtitle={'IAmDirector'} />
      <main className={'flex-grow flex items-center justify-center bg-gray-100 h-full'}>

        <div
          className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          style={{
            backgroundImage: 'url(\'/img/register_bg_2.png\')',
            backgroundColor: 'rgba(30, 41, 59,1) ',
            backgroundSize: '100%',
          }}
        ></div>
        <div className={'container mx-auto py-16 '}>
          <div className="container mx-auto px-4 h-full" style={{ marginBottom: '0rem', marginLeft: '0rem' }}>
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4" style={{ minWidth: '30rem' }}>
                <div
                  style={{ backgroundColor: 'rgba(226,232,240,var(--tw-bg-opacity))' }}
                  className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0"
                >
                  {/*<div className="rounded-t mb-0 px-6 py-6">*/}
                  {/*  <div className="text-center mb-3">*/}
                  {/*    <h6 className="text-blueGray-500 text-sm font-bold">*/}
                  {/*      Sign in with*/}
                  {/*    </h6>*/}
                  {/*  </div>*/}
                  {/*  <div className="btn-wrapper text-center">*/}
                  {/*    <button*/}
                  {/*      className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"*/}
                  {/*      type="button"*/}
                  {/*    >*/}
                  {/*      <img alt="..." className="w-5 mr-1" src="/img/github.svg" />*/}
                  {/*      Github*/}
                  {/*    </button>*/}
                  {/*    <button*/}
                  {/*      className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"*/}
                  {/*      type="button"*/}
                  {/*    >*/}
                  {/*      <img alt="..." className="w-5 mr-1" src="/img/google.svg" />*/}
                  {/*      Google*/}
                  {/*    </button>*/}
                  {/*  </div>*/}
                  {/*  <hr className="mt-6 border-b-1 border-blueGray-300" />*/}
                  {/*</div>*/}
                  <div className="flex-auto px-4 lg:px-10 py-3 pt-0" style={{ marginTop: '2rem' }}>
                    {/*<div className="text-blueGray-400 text-center mb-3 font-bold">*/}
                    {/*  <small>Or sign in with credentials</small>*/}
                    {/*</div>*/}
                    <form>
                      <div className="relative w-full mb-3">
                        <label
                          className="block text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          手机号
                        </label>
                        <Space.Compact style={{ width: '100%' }}>
                          <Input size={'large'} style={{ width: '17%' }}  value={stateNumber}
                                 autoComplete={'tel-country-code'}
                                 onChange={(e) => {
                                   setStateNumber(e.target.value);
                                 }} />
                          <Input size={'large'} style={{ width: '83%' }} placeholder="请输入手机号"
                                 value={phone} autoComplete={'tel'}
                                 onChange={(e) => {
                                   setPhone(e.target.value);
                                 }}
                          />
                        </Space.Compact>
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          图片验证码
                        </label>
                        <div className="flex">
                          <Input size={'large'} style={{ width: '70%' }} placeholder="请输入验证码" type={'text'}
                                 value={captchaInput}
                                 status={captchaInput.length != 4 || captchaInput == captcha ? '' : 'error'}
                                 onChange={(e) => {
                                   setCaptchaInput(e.target.value);
                                 }}
                          />
                          <Captcha
                            className="ml-auto"
                            charNum={4}
                            onChange={(v) => {
                              //console.log(v)
                              setCaptcha(v);
                            }} />
                        </div>

                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          短信验证码
                        </label>
                        <Input size={'large'} placeholder="请输入验证码" type={'text'} value={codeInput}
                               onChange={(e) => {
                                 setCodeInput(e.target.value);
                               }}
                        />

                        <Button type="link"
                                disabled={code_cooldown != 0 || captchaInput != captcha}
                                onClick={getCode}
                                style={{ position: 'absolute', right: '0.5rem', top: '1.853rem' }}
                        >
                          {code_cooldown === 0 ? '获取验证码' : `重新发送(${code_cooldown})`}
                        </Button>
                      </div>
                      {/*<div>*/}
                      {/*  <label className="inline-flex items-center cursor-pointer">*/}
                      {/*    <input*/}
                      {/*      id="customCheckLogin"*/}
                      {/*      type="checkbox"*/}
                      {/*      className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"*/}
                      {/*    />*/}
                      {/*    <span className="ml-2 text-sm font-semibold text-blueGray-600">*/}
                      {/*  Remember me*/}
                      {/*</span>*/}
                      {/*  </label>*/}
                      {/*</div>*/}

                      <div className="text-center mt-6">
                        <Button
                          className={'w-full'}
                          type={'primary'}
                          size={'large'}
                          onClick={handleLogin}
                        >
                          登录
                        </Button>
                      </div>
                      <Modal
                        title="隐私政策"
                        centered
                        open={showPolicy}
                        onOk={() => setShowPolicy(false)}
                        onCancel={() => setShowPolicy(false)}
                        okText="同意"
                        cancelText="关闭"
                        width={1000}
                      >
                        <p>
                          欢迎使用<b>IAmDirector</b>（以下简称“本平台”），本平台尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本平台会按照本隐私政策的规定使用和披露您的个人信息。但本平台将以高度的勤勉、审慎义务对待这些信息。除非本隐私政策中另有说明，否则未经您事先许可，本平台不会将这些信息对外披露或向第三方提供。本平台会不时更新本隐私政策。
                          您在同意本平台服务使用协议之时，即视为您已经同意本隐私政策全部内容。
                        </p>
                        <p>
                          <b>1. 适用范围</b> a. 在您注册本平台帐户时，您根据本平台要求提供的个人注册信息； b.
                          在您使用本平台网络服务，或访问本平台平台网页时，本平台自动接收并记录的您的浏览器和计算机上的信息；
                          c. 本平台通过合法途径从商业伙伴处获取的用户个人数据。
                        </p>
                        <p>
                          <b>2. 信息使用</b> a. 本平台不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可；
                          b. 本平台亦不允许任何第三方以任何手段收集、编辑、出售或者无偿传播您的个人信息； c.
                          为服务用户的目的，本平台可能通过使用您的个人信息，向您提供您可能感兴趣的信息，包括但不限于向您发出产品和服务信息，或者与本平台合作伙伴共享信息以便他们向您发送有关其产品和服务的信息（后者需要您的事先同意）。
                        </p>
                        <p>
                          <b>3. 信息披露</b> 在如下情况下，本平台会依据您的个人意愿或法律的规定全部或部分的披露您的个人信息：
                          a. 经您事先同意，向第三方披露； b. 如您是合法的知识产权投诉的被投诉人，应对方的要求而披露； c.
                          根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露； d.
                          如您出现违反中国有关法律、法规或者本平台服务协议或相关规则的情况，需要向第三方披露； e.
                          为提供您所要求的产品和服务，而必须和第三方分享您的个人信息； f. 其他本平台根据法律、法规或者网站政策认为适合的披露。
                        </p>
                        <p>
                          <b>4.
                            信息存储和交换</b> 本平台收集的有关您的信息和资料将保存在本平台及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或本平台收集信息和资料所在地的境外，并在境外被访问、存储和展示。
                        </p>
                        <p>
                          <b>5. 信息安全</b> 本平台帐户均有安全保护功能，请妥善保管您的用户名及密码信息。
                        </p>
                      </Modal>
                      <div style={{ marginTop: '1.2rem' }}>
                        <small className={'flex justify-center content-center items-center'}
                               style={{ color: 'grey', cursor: 'pointer' }}
                               onClick={() => {
                                 setShowPolicy(true);
                               }}
                        >
                          登录即默认同意隐私协议
                        </small>
                      </div>

                    </form>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </main>
    </>
  )
    ;
}

LoginPage.diplsayName = 'LoginPage';

export default LoginPage;
