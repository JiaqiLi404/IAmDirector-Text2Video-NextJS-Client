import React, { useRef, useState } from 'react';
import { Button, Input, Typography, Select, Card, Col, Row, Collapse, Popconfirm, message } from 'antd';
import { BulbOutlined } from '@ant-design/icons';
import 'animate.css/animate.css';
import { constraints } from '@/constraints';
import { BalancePanel } from '@/components/director-components/balancePanel';

const { TextArea } = Input;

// @ts-ignore
export function CollectInfoPanel(this: any, {
  // @ts-ignore
  nextStep,
  // @ts-ignore
  formerStep,
  // @ts-ignore
  step,
  // @ts-ignore
  scriptInfo,
  // @ts-ignore
  changeScriptInfo,
  // @ts-ignore
  callScriptGenerating,
  // @ts-ignore
  model,
  // @ts-ignore
  changeModel
}) {
  const [scriptOption, setScriptOption] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const balanceComponentRef = useRef();
  const [scriptPromptVisibility, setScriptPromptVisibility] = useState(false);

  function handleScriptOptionChange(option: number, e: React.MouseEvent<HTMLButtonElement>) {
    setScriptOption(option);
    if (option == 1) {
      setScriptPromptVisibility(false);
      setTimeout(() => {
        nextStep();
      }, 400);
    } else if (option == 2) {
      setScriptPromptVisibility(true);
    }
  }

  const prefix_scripts = [{
    title: '石猴诞生',
    type: ['动画'],
    description:
      `海外有个国家，叫傲来国。傲来国临近东海，海上有座名山，叫花果山。花果山是地脉的起始，山脉的主脉，天地分开时就有，混沌初开就已经存在（天下第一山）。花果山正山顶，有块仙石，仙石周围没有树木遮挡，倒是有灵芝兰草陪衬。石头里边有个仙胎。
有一天仙石破碎，里边产出一个石卵，有圆球那么大。入世见风，石卵化作一个石猴。那石猴有头有脸，有手有脚。出生没一会儿，就学会走路，又过了会儿，朝四面八方行了祭拜礼仪。
拜完四方，石猴双眼金光四射，扫视苍穹，查知周围环境。金光扫过天宫，惊动了玉皇大帝，玉皇大帝召集群仙在凌霄宝殿中询问。此时殿外金光刺眼，绚丽璀璨，于是派千里眼、顺风耳去南天门外查看。`,
  },
    {
      title: '什么是生成式AI',
      type: ['短视频'],
      description:
        `一个科普视频包括以下要点：
1. 什么是生成式AI：生成式人工智能是一种可用于创建新的内容和想法（包括对话、故事、图像、视频和音乐）的人工智能；
2. 为什么生成式人工智能很重要： 像 ChatGPT 这样的生成式人工智能应用程序吸引了广泛的关注，并且可让用户充分发挥想象力。它们可以帮助重塑大多数客户体验和应用程序，创建前所未有的新应用程序，以及协助客户达到新的工作效率水平。
2. 生成式AI的应用：生成式AI的应用领域包括电影、游戏、广告、设计、音乐、文学、编程、科学研究等。金融服务公司可以利用生成式人工智能的强大功能，在降低成本的同时更好地为客户提供服务；娱乐行业中，生成式人工智能模型只需花费相当于传统生产一小部分的成本和时间，即可制作出新颖的内容；医学中生成式人工智能使用模型创建具有特定特性的新型蛋白质序列，以此设计抗体、酶、疫苗和基因疗法。`,
    },
    {
      title: '黑客帝国',
      type: ['电影'],
      description:
        `不久的将来，网络黑客尼奥对这个看似正常的现实世界产生了怀疑。他结识了黑客崔妮蒂，并见到了黑客组织的首领墨菲斯。墨菲斯告诉他，现实世界其实是由一个名叫“母体”的计算机人工智能系统控制，人们就像他们饲养的动物，没有自由和思想，而尼奥就是能够拯救人类的救世主。
可是，救赎之路从来都不会一帆风顺，到底哪里才是真实的世界？如何才能打败那些超人一样的特勤？尼奥是不是人类的希望？`,
    },
  ];

  const scriptTypeOptions = constraints.VIDEO_TYPES;
  const modelOptions = constraints.GPT_MODELS;

  function choosePrefixScript(id: number) {
    changeScriptInfo(
      {
        title: prefix_scripts[id].title,
        type: prefix_scripts[id].type,
        description: prefix_scripts[id].description,
      },
    );
    // setScriptTitle(prefix_scripts[id].title);
    // setScriptType(prefix_scripts[id].type);
    // setScriptText(prefix_scripts[id].text);
  }

  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  // @ts-ignore
  return (
    <div
      className={formerStep < step ? 'direction-block animate__animated animate__fadeInRight animate__faster' : 'direction-block animate__animated animate__fadeInLeft animate__faster'}>
      <p style={{ fontSize: '16px' }}><b>您是否已经拥有了一个具体、完整的剧本呢？</b></p>
      <div className={'director-start-option-div'}>
        <Button type={scriptOption == 1 ? 'primary' : 'dashed'}
                size={'large'}
                onClick={handleScriptOptionChange.bind(this, 1)}>是的，我已经拥有了完整的剧本</Button>
        <Button type={scriptOption == 2 ? 'primary' : 'dashed'} size={'large'}
                style={{ marginTop: '1rem' }}
                onClick={handleScriptOptionChange.bind(this, 2)}> 还没有，我需要AI协助自定义一份剧本</Button>
      </div>
      {scriptPromptVisibility ? (
        <div className={'animate__animated animate__backInUp animate__faster'}>
          <hr style={{ marginTop: '2rem' }} className="mt-3 mb-6 border-gray-300" />

          <div key={'1'}
               className={'director-start-script-prompt-div'}>
            <Collapse
              className={'director-start-prefix-script-collapse'}
              items={[
                {
                  key: '1',
                  label: <Typography.Title level={5}>选择预置剧本</Typography.Title>,
                  children: <div>
                    {/*<Typography.Title level={5} style={{ marginTop: '1rem' }}>选择预置剧本</Typography.Title>*/}
                    <Row gutter={16}>
                      {prefix_scripts.map((script, index) => {
                        return (
                          <Col key={index} span={8}>
                            <Popconfirm
                              title="覆盖你的剧本"
                              description="选择预置剧本将会覆盖已填写的剧本信息"
                              onConfirm={choosePrefixScript.bind(this, index)}
                              okText="好的"
                              cancelText="取消"
                            >
                              <Card title={prefix_scripts[index].title}
                                    bordered={false}
                                    className={'director-start-prefix-script-card'}>
                                {prefix_scripts[index].description}
                              </Card>
                            </Popconfirm>
                          </Col>
                        );
                      })
                      }
                    </Row>
                  </div>,
                },
              ]}
            />

            <Typography.Title level={5} style={{ marginTop: '1rem' }}>作品名称</Typography.Title>
            <Input
              value={scriptInfo.title}
              onChange={(e: { target: { value: any; }; }) => changeScriptInfo({ title: e.target.value })}
              placeholder="请输入您拟订的作品名称"
              count={{
                show: true,
                max: constraints.SCRIPT_TITLE_MAX_LENGTH,
              }}
            />
            <Typography.Title level={5} style={{ marginTop: '1rem' }}>作品类型</Typography.Title>
            <Select
              value={scriptInfo.type}
              mode="multiple"
              allowClear
              style={{ width: '100%' }}
              placeholder="默认"
              onChange={(value: string[]) => changeScriptInfo({ type: value })}
              options={scriptTypeOptions}
            />
            <Typography.Title level={5} style={{ marginTop: '1rem' }}>创意描述</Typography.Title>
            <TextArea
              showCount
              maxLength={
                // @ts-ignore
                constraints.SCRIPT_DESCRIPTION_MAX_LENGTH[localStorage.getItem('vip_level') || 'free']
              }
              value={scriptInfo.description}
              onChange={(e: { target: { value: any; }; }) => changeScriptInfo({ description: e.target.value })}
              placeholder="请输入您的创意描述，用于生成自定义的剧本"
              autoSize={{ minRows: 3, maxRows: 10 }} />
            <Typography.Title level={5} style={{ marginTop: '1rem' }}>模型选择</Typography.Title>
             <Select
              value={model}
              style={{ width: '100%' }}
              onChange={(value: string) => changeModel(value)}
              options={modelOptions}
            />
          </div>
          <BalancePanel onRef={balanceComponentRef}/>
          <div style={{ width: '100%', display: 'flex' }}>
            <Button
              loading={isGenerating}
              className={'director-step-btn'}
              type={'primary'}
              size={'large'}
              style={{ marginTop: '1rem' }}
              icon={<BulbOutlined />}
              onClick={async () => {
                setIsGenerating(true);
                const success = await callScriptGenerating(false);
                if (success) {
                  nextStep();
                }
                setIsGenerating(false);

              }}>生成剧本</Button>
          </div>
        </div>
      ) : null
      }
    </div>
  );
};