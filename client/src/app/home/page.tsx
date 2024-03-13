'use client';

import Page from '@/components/layout/Page';
import Link from 'next/link';
import { Space } from 'antd';
import {
  BulbOutlined,
  ThunderboltOutlined,
  DollarOutlined,
  AccountBookOutlined,
  CodeOutlined, RobotOutlined,
} from '@ant-design/icons';

function HomePage() {
  return (
    <Page subtitle={'home'}
          style={{ maxWidth: '2000px !important', width: '100%', minWidth: '99vw', paddingBottom: '0rem' }}>
      <div className="relative pb-32 flex content-center items-center justify-center min-h-screen-75"
           style={{ paddingTop: '22rem', paddingBottom: '22rem' }}
      >
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              'url(\'/img/landing-top.jpeg\')',
          }}
        >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <h1 className="text-white font-semibold text-6xl">
                  每个人都能成为导演
                </h1>
                <p className="mt-4 text-lg " style={{ color: 'rgba(226,232,240,1)' }}>
                  这是一个免费试用AI视频创作平台，集成了基于GPT的视频剧本生成和视频生成功能。
                  我们的理想是让每个人都能成为导演，以最快的方式将日常中的任何创意转化为高质量的视频，
                  无论是电影、营销视频、还是自媒体视频
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
          style={{ transform: 'translateZ(0)' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
            color={'#F3F4F6'}
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </div>

      <section className="pb-20 bg-blueGray-200 -mt-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap">
            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  {/*<div*/}
                  {/*  className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">*/}
                  {/*  <i className="fas fa-award"></i>*/}
                  {/*</div>*/}
                  <Space
                    className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400"
                    style={{ background: 'rgba(248, 113, 113,1)' }}
                  >
                    <BulbOutlined
                      style={{ color: '#fff', fontSize: '1.5rem' }} />
                  </Space>
                  <h6 className="text-xl font-semibold">高度智能</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    平台集成了OpenAI GPT、百度千帆大模型、智谱ChatGLM等等主流GPT生成接口，只需简单输入您的想法，即可快速生成完整的视频剧本。
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  <Space
                    className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400"
                    style={{ background: 'rgba(56, 189, 248,1)' }}
                  >
                    <DollarOutlined
                      style={{ color: '#fff', fontSize: '1.5rem' }} />
                  </Space>

                  <h6 className="text-xl font-semibold">免费试用</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    新注册用户拥有免费的算力额度，任何人都能生成一分钟左右的视频而无需任何付费。
                    即使是免费用户，也可以享受到高质量的视频生成服务。
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 w-full md:w-4/12 px-4 text-center">
              <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                <div className="px-4 py-5 flex-auto">
                  {/*<div*/}
                  {/*  className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">*/}
                  {/*  <i className="fas fa-fingerprint"></i>*/}
                  {/*</div>*/}
                  <Space
                    className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400"
                    style={{ background: 'rgba(52, 211, 153,1)' }}
                  >
                    <ThunderboltOutlined
                      style={{ color: '#fff', fontSize: '1.5rem' }} />
                  </Space>
                  <h6 className="text-xl font-semibold">一键生成</h6>
                  <p className="mt-2 mb-4 text-blueGray-500">
                    一键完成文字转视频，无论是电影、营销视频、还是自媒体视频，无需任何技术背景，几分钟即可完成从一句话想法到高质量视频的创作。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center mt-32">
            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
              <Space
                    className="text-white p-3 text-center inline-flex items-center justify-center w-14 h-14 mb-5 shadow-lg rounded-full bg-red-400"
                    style={{ background: 'white' }}
                  >
                    <RobotOutlined
                      style={{ color: 'rgba(100,116,139,1)', fontSize: '1.5rem' }} />
                  </Space>
              <h3 className="text-3xl mb-2 font-semibold leading-normal">
                视频创作没有想法？
              </h3>
              <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                还在为没有好的创意而烦恼？剧本脚本写了一半却不知道怎么继续？
              </p>
              <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                用AI帮你完成剧本吧！
                我们的平台集成了多种主流GPT生成接口，无需任何编程，只需简单输入您的想法，即可快速生成完整的视频剧本。
                平台也支持长剧本的生成，您也可以输入已有的剧本，让AI帮您继续完成。
              </p>
              <Link href="/director" className="font-bold text-blueGray-700 mt-8">
                立即开始!
              </Link>
            </div>

            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
              <div
                className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                <img
                  alt="..."
                  src= '/img/landing-1.jpeg'
                  className="w-full align-middle rounded-t-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20" style={{ background: 'white' }}>
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: 'translateZ(0)' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
            color={'#fff'}
          >
            <polygon
              className="text-white fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto px-4">
          <div className="items-center flex flex-wrap">
            <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
              <img
                alt="..."
                className="max-w-full rounded-lg shadow-lg"
                src='/img/landing-2.jpeg'
              />
            </div>
            <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
              <div className="md:pr-12">
                <Space
                    className="text-white p-3 text-center inline-flex items-center justify-center w-14 h-14 mb-5 shadow-lg rounded-full bg-red-400"
                    style={{ background: 'rgba(158,173,194,1)' }}
                  >
                    <CodeOutlined
                      style={{ color: '#fff', fontSize: '1.5rem' }} />
                  </Space>
                <h3 className="text-3xl font-semibold">制作视频存在门槛？</h3>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  无需任何技术背景，甚至无需任何创意，只需一句话、一个标题，即可快速生成只属于你的视频。
                </p>
                <ul className="list-none mt-6">
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                          <span
                            className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fas fa-fingerprint"></i>
                          </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          GPT生成剧本
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                          <span
                            className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="fab fa-html5"></i>
                          </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          AI视频生成
                        </h4>
                      </div>
                    </div>
                  </li>
                  <li className="py-2">
                    <div className="flex items-center">
                      <div>
                          <span
                            className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-100 mr-3">
                            <i className="far fa-paper-plane"></i>
                          </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          在线剪辑与视频导出
                        </h4>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20" style={{ background: 'white' }}>
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: 'translateZ(0)' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
            color={'#fff'}
          >
            <polygon
              className="text-white fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>

        <div className="container mx-auto px-4 mb-12">
          <div className="items-center flex flex-wrap">
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <Space
                    className="text-white p-3 text-center inline-flex items-center justify-center w-14 h-14 mb-5 shadow-lg rounded-full bg-red-400"
                    style={{ background: 'rgba(158,173,194,1)' }}
                  >
                    <AccountBookOutlined
                      style={{ color: '#fff', fontSize: '1.5rem' }} />
                  </Space>
                <h3 className="text-3xl mb-2 font-semibold leading-normal">
                  拍视频开销太大？
                </h3>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  0成本，0技术，0门槛，只需一句话、一个标题，即可快速生成只属于你的视频。
                </p>
                <p className="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-600">
                  对于专业用户，我们支持生成多达十几分钟的视频，相比传统的视频制作，我们的成本优势毋庸置疑。
                </p>
                {/*<Link href="/#pablo" className="font-bold text-blueGray-700 mt-8">*/}
                {/*  Check Notus NextJS!*/}
                {/*</Link>*/}
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div
                  className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-blueGray-700">
                  <img
                    alt="..."
                    src="/img/landing-3.jpg"
                    className="w-full align-middle rounded-t-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20 relative block bg-blueGray-800" style={{ background: '#1E293B', color: '#fff' }}>
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: 'translateZ(0)' }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
            color={'#1E293B'}
          >
            <polygon
              className="text-blueGray-800 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4 pb-16">
          <div className="flex flex-wrap justify-center text-center mb-24 pt-16">
            <div className="w-full lg:w-6/12 px-4">
              <h2 className="text-4xl font-semibold">任何视频我们都能帮你完成</h2>
              <p className="text-lg leading-relaxed m-4 text-blueGray-500"
                 style={{ color: 'rgba(148,163,184,1)' }}
              >
                通过提示AI模型，我们可以帮助您生成各种类型的视频，包括电影、动画、短视频、营销视频、科普视频等等。
              </p>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-full md:w-6/12 lg:w-1/5 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                {/*<img*/}
                {/*  alt="..."*/}
                {/*  src="/img/team-1-800x800.jpg"*/}
                {/*  className="shadow-lg rounded-full mx-auto max-w-120-px"*/}
                {/*/>*/}
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">电影</h5>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    Movie
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-1/5 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                {/*<img*/}
                {/*  alt="..."*/}
                {/*  src="/img/team-2-800x800.jpg"*/}
                {/*  className="shadow-lg rounded-full mx-auto max-w-120-px"*/}
                {/*/>*/}
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">动画</h5>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    Anime
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-1/5 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                {/*<img*/}
                {/*  alt="..."*/}
                {/*  src="/img/team-3-800x800.jpg"*/}
                {/*  className="shadow-lg rounded-full mx-auto max-w-120-px"*/}
                {/*/>*/}
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">社交媒体</h5>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    Social Media
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-1/5 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                {/*<img*/}
                {/*  alt="..."*/}
                {/*  src="/img/team-4-470x470.png"*/}
                {/*  className="shadow-lg rounded-full mx-auto max-w-120-px"*/}
                {/*/>*/}
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">营销视频</h5>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    Marketing
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-6/12 lg:w-1/5 lg:mb-0 mb-12 px-4">
              <div className="px-6">
                {/*<img*/}
                {/*  alt="..."*/}
                {/*  src="/img/team-4-470x470.png"*/}
                {/*  className="shadow-lg rounded-full mx-auto max-w-120-px"*/}
                {/*/>*/}
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">宣传视频</h5>
                  <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                    Promotional
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*<section className="pb-20 relative block bg-blueGray-800" style={{ background: '#1E293B' }}>*/}
      {/*  <div*/}
      {/*    className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"*/}
      {/*    style={{ transform: 'translateZ(0)' }}*/}
      {/*  >*/}
      {/*    <svg*/}
      {/*      className="absolute bottom-0 overflow-hidden"*/}
      {/*      xmlns="http://www.w3.org/2000/svg"*/}
      {/*      preserveAspectRatio="none"*/}
      {/*      version="1.1"*/}
      {/*      viewBox="0 0 2560 100"*/}
      {/*      x="0"*/}
      {/*      y="0"*/}
      {/*      color={'#1E293B'}*/}
      {/*    >*/}
      {/*      <polygon*/}
      {/*        className="text-blueGray-800 fill-current"*/}
      {/*        points="2560 0 2560 100 0 100"*/}
      {/*      ></polygon>*/}
      {/*    </svg>*/}
      {/*  </div>*/}

      {/*  <div className="container mx-auto px-4 lg:pt-24 lg:pb-64">*/}
      {/*    <div className="flex flex-wrap text-center justify-center">*/}
      {/*      <div className="w-full lg:w-6/12 px-4">*/}
      {/*        <h2 className="text-4xl font-semibold text-white">*/}
      {/*          Build something*/}
      {/*        </h2>*/}
      {/*        <p className="text-lg leading-relaxed mt-4 mb-4 text-blueGray-400">*/}
      {/*          Put the potentially record low maximum sea ice extent tihs*/}
      {/*          year down to low ice. According to the National Oceanic and*/}
      {/*          Atmospheric Administration, Ted, Scambos.*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <div className="flex flex-wrap mt-12 justify-center">*/}
      {/*      <div className="w-full lg:w-3/12 px-4 text-center">*/}
      {/*        <div*/}
      {/*          className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">*/}
      {/*          <i className="fas fa-medal text-xl"></i>*/}
      {/*        </div>*/}
      {/*        <h6 className="text-xl mt-5 font-semibold text-white">*/}
      {/*          Excelent Services*/}
      {/*        </h6>*/}
      {/*        <p className="mt-2 mb-4 text-blueGray-400">*/}
      {/*          Some quick example text to build on the card title and make up*/}
      {/*          the bulk of the card's content.*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*      <div className="w-full lg:w-3/12 px-4 text-center">*/}
      {/*        <div*/}
      {/*          className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">*/}
      {/*          <i className="fas fa-poll text-xl"></i>*/}
      {/*        </div>*/}
      {/*        <h5 className="text-xl mt-5 font-semibold text-white">*/}
      {/*          Grow your market*/}
      {/*        </h5>*/}
      {/*        <p className="mt-2 mb-4 text-blueGray-400">*/}
      {/*          Some quick example text to build on the card title and make up*/}
      {/*          the bulk of the card's content.*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*      <div className="w-full lg:w-3/12 px-4 text-center">*/}
      {/*        <div*/}
      {/*          className="text-blueGray-800 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">*/}
      {/*          <i className="fas fa-lightbulb text-xl"></i>*/}
      {/*        </div>*/}
      {/*        <h5 className="text-xl mt-5 font-semibold text-white">*/}
      {/*          Launch time*/}
      {/*        </h5>*/}
      {/*        <p className="mt-2 mb-4 text-blueGray-400">*/}
      {/*          Some quick example text to build on the card title and make up*/}
      {/*          the bulk of the card's content.*/}
      {/*        </p>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
      {/*<section className="relative block py-24 lg:pt-0 bg-blueGray-800" style={{background:'#1E293B'}}>*/}
      {/*  <div className="container mx-auto px-4">*/}
      {/*    <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">*/}
      {/*      <div className="w-full lg:w-6/12 px-4">*/}
      {/*        <div*/}
      {/*          className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">*/}
      {/*          <div className="flex-auto p-5 lg:p-10">*/}
      {/*            <h4 className="text-2xl font-semibold">*/}
      {/*              Want to work with us?*/}
      {/*            </h4>*/}
      {/*            <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">*/}
      {/*              Complete this form and we will get back to you in 24*/}
      {/*              hours.*/}
      {/*            </p>*/}
      {/*            <div className="relative w-full mb-3 mt-8">*/}
      {/*              <label*/}
      {/*                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
      {/*                htmlFor="full-name"*/}
      {/*              >*/}
      {/*                Full Name*/}
      {/*              </label>*/}
      {/*              <input*/}
      {/*                type="text"*/}
      {/*                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
      {/*                placeholder="Full Name"*/}
      {/*              />*/}
      {/*            </div>*/}

      {/*            <div className="relative w-full mb-3">*/}
      {/*              <label*/}
      {/*                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
      {/*                htmlFor="email"*/}
      {/*              >*/}
      {/*                Email*/}
      {/*              </label>*/}
      {/*              <input*/}
      {/*                type="email"*/}
      {/*                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"*/}
      {/*                placeholder="Email"*/}
      {/*              />*/}
      {/*            </div>*/}

      {/*            <div className="relative w-full mb-3">*/}
      {/*              <label*/}
      {/*                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"*/}
      {/*                htmlFor="message"*/}
      {/*              >*/}
      {/*                Message*/}
      {/*              </label>*/}
      {/*              <textarea*/}
      {/*                rows="4"*/}
      {/*                cols="80"*/}
      {/*                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"*/}
      {/*                placeholder="Type a message..."*/}
      {/*              />*/}
      {/*            </div>*/}
      {/*            <div className="text-center mt-6">*/}
      {/*              <button*/}
      {/*                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"*/}
      {/*                type="button"*/}
      {/*              >*/}
      {/*                Send Message*/}
      {/*              </button>*/}
      {/*            </div>*/}
      {/*          </div>*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</section>*/}
    </Page>
  );
}

HomePage.diplsayName = 'HomePage';

export default HomePage;
