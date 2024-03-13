'use client';

import Page from '@/components/layout/Page';
import { Auth, removeToken } from '@/auth';
import { Button, Card, message, Statistic } from 'antd';
import { useEffect, useState } from 'react';
import { constraints } from '@/constraints';
import { getInfo, getUserTaskCount } from '@/api/user';
import { useRouter } from 'next/navigation';

function AccountPage() {
  const [userInfo, setUserInfo] = useState({
    username: '',
    identity: '',
    vip_level: '',
    balance: 0,
    task_num: 0,
    work_num: 0,
  });
  const router = useRouter();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  function fetchUserInfo() {
    getInfo().then((res: any) => {
      if (res.success) {
        const newUserInfo = {
          username: res.data.username,
          identity: res.data.identity,
          vip_level: res.data.vip_level,
          balance: res.data.balance,
        };
        handleChangeUserInfo(newUserInfo);
      } else {
        console.log(res);
        message.error('获取用户信息失败');
      }
    });
    getUserTaskCount('self').then((res: any) => {
      if (res.success) {
        const newUserInfo = {
          task_num: res.data.task_num,
          work_num: res.data.work_num,
        };
        handleChangeUserInfo(newUserInfo);
      } else {
        console.log(res);
        message.error('获取用户信息失败');
      }
    });
  }

  function handleChangeUserInfo(newUserInfo: {
    balance?: any;
    identity?: any;
    vip_level?: any;
    username?: any,
    task_num?: any;
    work_num?: any;
  }) {
    Object.keys(newUserInfo).forEach(key => {
      // @ts-ignore
      if (newUserInfo[key] === undefined) {
        // @ts-ignore
        delete newUserInfo[key];
      }
    });
    let newUserInfo_temp = { ...Object.assign(userInfo, newUserInfo) };
    setUserInfo(newUserInfo_temp);
  }

  return (
    <Auth>
      <Page subtitle={'IAmDirector - 账户'}
            style={{ maxWidth: '2000px !important', width: '100%', minWidth: '99vw', paddingBottom: '0rem' }}>
        <section className="relative block"
                 style={{ height: '32rem' }}
        >
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{ backgroundImage: 'url(\'/img/account-bg.jpeg\')' }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div
              className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative w-full h-full contents">
                      <img
                        alt="..."
                        src="/img/user.jpeg"
                        className="padding-image flex shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 ml-auto mr-auto  max-w-150-px"
                      />
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      {/*<button*/}
                      {/*  className="bg-blueGray-700 active:bg-blueGray-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"*/}
                      {/*  type="button"*/}
                      {/*>*/}
                      {/*  Connect*/}
                      {/*</button>*/}
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {userInfo.task_num}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          总作品
                        </span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {userInfo.work_num}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          已完成
                        </span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                          {userInfo.task_num - userInfo.work_num}
                        </span>
                        <span className="text-sm text-blueGray-400">
                          进行中
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                    {userInfo.username}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    {userInfo.identity}
                  </div>
                  <div className="mb-2 text-blueGray-600 mt-10">
                    您现在是尊贵的{' '}<b>{
                    //@ts-ignore
                    constraints.VIP_NAMES[userInfo.vip_level]
                  }</b>{' '}会员
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">

                    </div>
                  </div>
                  <div className="balance-panel shadow-lg">
                    <Card title={<Statistic className={'balance-title'} title="算力余额" value={userInfo.balance}
                                            precision={4}
                                            valueStyle={{ color: '#3f8600' }} />}
                          bordered={false}>
                    </Card>
                  </div>
                  <Button size={'large'}
                          style={{color:"grey", minWidth:"8rem",marginTop:"2.5rem"}}
                          onClick={()=>{
                    removeToken();
                    router.push('/home');
                  }}>退出登陆</Button>
                </div>

              </div>

            </div>
          </div>

        </section>
      </Page>
    </Auth>
  );
}

AccountPage.diplsayName = 'EditorPage';

export default AccountPage;
