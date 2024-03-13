import React, { useImperativeHandle, useRef, useState } from 'react';
import {
  Button,
  Input,
  Typography,
  Select,
  Radio,
  Col,
  Row,
  Collapse,
  Popconfirm,
  RadioChangeEvent,
  message, Modal,
} from 'antd';
import {
  ArrowLeftOutlined,
  BulbOutlined,
  SnippetsFilled,
  PlusSquareFilled,
  DeliveredProcedureOutlined, ExclamationCircleOutlined, ArrowRightOutlined,
} from '@ant-design/icons';
import 'animate.css/animate.css';
import { constraints } from '@/constraints';
import { FootageDescriptionPanel } from '@/components/director-components/FootageDescriptionPanel';
import { BalancePanel } from '@/components/director-components/balancePanel';
import { generateVideo } from '@/api/director';

const { TextArea } = Input;

// @ts-ignore
export function GenerateScriptPanel(this: any, {
  // @ts-ignore
  lastStep,
  // @ts-ignore
  nextStep,
  // @ts-ignore
  formerStep,
  // @ts-ignore
  step,
  // @ts-ignore
  nextbutton,
  // @ts-ignore
  nexticon,
  // @ts-ignore
  scriptInfo,
  // @ts-ignore
  changeScriptInfo,
  // @ts-ignore
  callScriptGenerating,
  // @ts-ignore
  script,
  // @ts-ignore
  changeScript,
  // @ts-ignore
  callLoadTask,
  // @ts-ignore
  callSaveTask,
  // @ts-ignore
  model,
  // @ts-ignore
  changeModel,
  // @ts-ignore
  onRef,
}) {
  const [voiceOptions, setVoiceOptions] = useState([]);
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const balanceComponentRef = useRef();
  const [modal, contextHolder] = Modal.useModal();


  const scriptTypeOptions = constraints.VIDEO_TYPES;
  const modelOptions = constraints.GPT_MODELS;

  const confirmGeneration = () => {
    modal.confirm({
      title: '消耗算力',
      icon: <ExclamationCircleOutlined />,
      content: `本次生成共${script.footage.length}个镜头，预计消耗${(script.footage.length / 6 * constraints.VIDEO_COST).toFixed(2)}点算力`,
      okText: '生成',
      cancelText: '取消',
      async onOk() {
        setIsGenerating(true);
        const success = await callSaveTask();
        if (!success) {
          message.error('保存失败');
          return;
        }
        const res = await generateVideo(script.id);
        if (res.success) {
          message.success('开始生成');
          nextStep();
        } else {
          if (res.code == 402) {
            message.error('余额不足');
          } else {
            message.error('生成失败');
          }
        }
        setIsGenerating(false);
      },
    });
  };

  function addFootage() {
    let myFootageTemp = [...script.footage];
    myFootageTemp.push({ name: `镜头${script.footage.length + 1}`, description: '', voice: '' });
    changeScript({ footage: myFootageTemp });
  }

  function handleFootageDescriptionChange(id: number, e: { target: { value: any; }; }) {
    let myFootageTemp = [...script.footage];
    myFootageTemp[id].description = e.target.value;
    changeScript({ footage: myFootageTemp });
  }

  function handleFootageVoiceChange(id: number, voice: string) {
    let myFootageTemp = [...script.footage];
    myFootageTemp[id].voice = voice;
    changeScript({ footage: myFootageTemp });
  }

  function handleFootageDescriptionBlur() {

  }


  function handleFootageMoveUp(id: number) {
    if (id == 0) {
      return;
    }
    let myFootageTemp = [...script.footage];
    let temp = { ...myFootageTemp[id - 1] };
    myFootageTemp[id - 1] = myFootageTemp[id];
    myFootageTemp[id] = temp;
    changeScript({ footage: myFootageTemp });
  }

  function handleFootageMoveDown(id: number) {
    if (id == script.footage.length - 1) {
      return;
    }
    let myFootageTemp = [...script.footage];
    let temp = { ...myFootageTemp[id + 1] };
    myFootageTemp[id + 1] = myFootageTemp[id];
    myFootageTemp[id] = temp;
    changeScript({ footage: myFootageTemp });
  }

  function handleFootageDelete(id: number) {
    let myFootageTemp = [...script.footage];
    myFootageTemp.splice(id, 1);
    changeScript({ footage: myFootageTemp });
  }

  function handleAspectRatio({ target: { value } }: RadioChangeEvent) {
    changeScript({ aspect_ratio: value });
  }

  function callUpdateBalance() {
    // @ts-ignore
    balanceComponentRef.current.updateBalance();
  }

  useImperativeHandle(onRef, () => {
    return {
      callUpdateBalance: callUpdateBalance,
    };
  });

  return (
    <div
      className={formerStep < step ? 'direction-block animate__animated animate__fadeInRight animate__faster' : 'direction-block animate__animated animate__fadeInLeft animate__faster'}>
      <Collapse
        className={'director-start-prefix-script-collapse'}
        items={[
          {
            key: '1',
            label: <Typography.Title level={5}>GPT编剧</Typography.Title>,
            children:
              <><Typography.Title level={4} style={{ marginTop: '1rem' }}>作品描述</Typography.Title><p
                className={'director-description-text'}>
                如果您已经有详细完整的剧本，不需要GPT编剧的协助，您可以跳过提供该信息，直接输入剧本信息。
              </p><p className={'director-description-text'}>
                如果您有创意，但不知道如何开始，通过您提供的创意，我们可以帮助您生成一个自定义的剧本。
              </p><p className={'director-description-text'}>
                您也可以先完成部分剧本信息，然后通过GPT编剧自动获取作品描述。
              </p>
                <div className={'director-start-script-prompt-div'}>
                  <Typography.Title level={5} style={{ marginTop: '1rem' }}>作品名称</Typography.Title>
                  <Input
                    value={scriptInfo.title}
                    onChange={(e: { target: { value: any; }; }) => changeScriptInfo({ title: e.target.value })}
                    placeholder="请输入您拟订的作品名称"
                    count={{
                      show: true,
                      max: constraints.SCRIPT_TITLE_MAX_LENGTH,
                    }} />
                  <Typography.Title level={5} style={{ marginTop: '1rem' }}>作品类型</Typography.Title>
                  <Select
                    value={scriptInfo.type}
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="默认"
                    onChange={(value: string[]) => changeScriptInfo({ type: value })}
                    options={scriptTypeOptions} />
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
                <div style={{ width: '100%', display: 'flex', marginBottom: '1rem' }}>
                  <Button
                    className={'director-step-btn'}
                    size={'large'}
                    style={{ marginTop: '1rem' }}
                    icon={<SnippetsFilled />}
                    onClick={() => {
                      message.info('即将上线，敬请期待');
                    }}>生成描述</Button>
                  <Button
                    loading={isGeneratingScript}
                    className={'director-step-btn'}
                    type={'primary'}
                    size={'large'}
                    style={{ marginTop: '1rem' }}
                    icon={<BulbOutlined />}
                    onClick={async () => {
                      setIsGeneratingScript(true);
                      const success = await callScriptGenerating(true);
                      if (success) {
                        message.success('剧本生成成功');
                      }
                      setIsGeneratingScript(false);
                    }}>生成剧本</Button>
                </div>
              </>,
          },
        ]}
      />
      <hr style={{ marginTop: '2rem' }} className="mt-3 mb-6 border-gray-300" />
      <div>
        <Typography.Title level={3} style={{ marginTop: '0rem' }}>我的剧本</Typography.Title>
        {
          script.footage.map((footage: {
            name: string,
            description: string,
            voice: string
          }, index: React.Key | number) => {
            return (
              <div key={index}>
                <FootageDescriptionPanel id={index}
                                         footage={footage}
                                         voiceOptions={voiceOptions}
                                         onDescriptionChange={handleFootageDescriptionChange}
                                         handleFootageMoveUp={handleFootageMoveUp}
                                         handleFootageMoveDown={handleFootageMoveDown}
                                         handleFootageDelete={handleFootageDelete}
                                         handleFootageVoiceChange={handleFootageVoiceChange}
                                         handleFootageDescriptionBlur={handleFootageDescriptionBlur}
                />
              </div>
            );
          })
        }
        {
          // @ts-ignore
          script.footage.length < constraints.FOOTAGE_MAX_NUM[localStorage.getItem('vip_level') || 'free'] ?
            <Button className={'director-step-btn'} style={{ marginTop: '2rem' }} onClick={addFootage}
                    icon={<PlusSquareFilled />} size={'large'}>
              新增镜头
            </Button> : null}
      </div>
      <hr style={{ marginTop: '2rem' }} className="mt-3 mb-6 border-gray-300" />
      <div style={{ marginTop: '0rem' }}>
        <Typography.Title level={5} style={{ marginTop: '0rem' }}>背景音乐提示（可以使用回车键输入）</Typography.Title>
        <Select
          mode="tags"
          style={{ width: '100%' }}
          placeholder="默认"
          onChange={(value: string[]) => {
            changeScript({ bgm_prompt: value });
          }}
          options={constraints.BGM_PROMPTS}
          value={script.bgm_prompt}
        />
      </div>
      <div>
        <Typography.Title level={5} style={{ marginTop: '1rem' }}>视频属性</Typography.Title>
        <Radio.Group
          options={constraints.ASPECT_RATIO}
          onChange={handleAspectRatio}
          value={script.aspect_ratio}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <div style={{ marginTop: '2rem' }}><BalancePanel onRef={balanceComponentRef} /></div>
      <div style={{ width: '85%', display: 'flex', marginTop: '2.6rem', marginLeft: 'auto', marginRight: 'auto' }}>
        <Button className={'director-step-btn'} type="default" onClick={async () => {
          const res = await callSaveTask();
          if (res) {
            lastStep();
          } else {
            message.error('信息更新失败');
          }
        }} icon={<ArrowLeftOutlined />}
                size={'large'}>上一步</Button>
        <Button className={'director-step-btn'} type="default" icon={<DeliveredProcedureOutlined />}
                size={'large'} loading={isSaving}
                onClick={async () => {
                  setIsSaving(true);
                  const success = await callSaveTask();
                  if (success) {
                    message.success('保存成功');
                  } else {
                    message.error('保存失败');
                  }
                  setIsSaving(false);
                }}>保存</Button>
        <Button className={'director-step-btn'} type="primary" onClick={confirmGeneration} icon={nexticon}
                size={'large'} loading={isGenerating}>
          {nextbutton}
        </Button>
        <Button className={'director-step-btn'} type="default" onClick={async () => {
          const res = await callSaveTask();
          if (res) {
            nextStep();
          } else {
            message.error('信息更新失败');
          }
        }} icon={<ArrowRightOutlined />}
                size={'large'} disabled={script.video_url == '' || script.video_url == undefined}>
          查看视频
        </Button>
      </div>
      {contextHolder}
    </div>
  );
}