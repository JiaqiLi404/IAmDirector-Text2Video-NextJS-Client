'use client';

import Page from '@/components/layout/Page';
import { SetStateAction, useEffect, useRef, useState } from 'react';
import { loadCookies, saveCookies } from '@/store/cookies';
import { useRouter } from 'next/navigation';
import { Button, Steps, message } from 'antd';
import {
  FormOutlined,
  CloudDownloadOutlined,
  SendOutlined,
  VideoCameraOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { CollectInfoPanel } from '@/components/director-components/CollectInfoPanel';
import { Auth } from '@/auth';
import { GenerateScriptPanel } from '@/components/director-components/GenerateScriptPanel';
import { generateScriptGPT, getLastTask, getTaskInfo, updateTaskInfo } from '@/api/director';
import { constraints } from '@/constraints';
import { VideoGenerationPanel } from '@/components/director-components/VideoGenerationPanel';
import { ExportPanel } from '@/components/director-components/ExportPanel';

function DirectorPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formerStep, setFormerStep] = useState(-1);
  const [scriptInfo, setScriptInfo] = useState({ title: '', type: [], description: '' });
  const [script, setScript] = useState({ id: undefined, bgm_prompt: [], aspect_ratio: '', footage: [], video_url: '' });
  const [model, setModel] = useState(constraints.GPT_MODELS[0].value);
  const subComponentsRef = useRef();

  let steps = [
    {
      title: '开始',
      description: '描述你的创意',
      icon: <SendOutlined />,
      children: <CollectInfoPanel nextStep={nextStep} step={0} formerStep={formerStep} scriptInfo={scriptInfo}
                                  changeScriptInfo={handleChangeScriptInfo}
                                  callScriptGenerating={handleCallGeneratingScript} model={model}
                                  changeModel={handleChangeModel} />,
      nextbutton: '生成剧本',
      nexticon: null,
    },
    {
      title: '编写剧本',
      description: '细化视频场景',
      icon: <FormOutlined />,
      children: <GenerateScriptPanel lastStep={lastStep} nextStep={nextStep} step={1} formerStep={formerStep}
                                     nextbutton={'生成作品'} nexticon={<VideoCameraOutlined />} scriptInfo={scriptInfo}
                                     changeScriptInfo={handleChangeScriptInfo}
                                     callScriptGenerating={handleCallGeneratingScript} script={script}
                                     changeScript={handleChangeScript} callLoadTask={handleLoadTask}
                                     callSaveTask={handleUpdateTaskAndFootage} model={model}
                                     changeModel={handleChangeModel} onRef={subComponentsRef} />,
      nextbutton: '生成作品',
      nexticon: <VideoCameraOutlined />,
    },
    {
      title: '场景生成',
      description: '细调视频内容',
      icon: <VideoCameraOutlined />,
      children: <VideoGenerationPanel lastStep={lastStep} nextStep={nextStep} script={script} formerStep={formerStep}
                                      step={currentStep} changeScript={handleChangeScript} />,
      nextbutton: '导出作品',
      nexticon: <CloudDownloadOutlined />,
    },
    {
      title: '导出',
      description: '导出你的作品',
      icon: <CloudDownloadOutlined />,
      children: <ExportPanel script={script}/>,
      nextbutton: null,
      nexticon: null,
    },
  ];

  const [footageDidUpdated, setFootageDidUpdated] = useState(false);
  const [skipFirstFetch, setSkipFirstFetch] = useState(true);

  useEffect(() => {
    if (skipFirstFetch) {
      return;
    }
    handleLoadTask(script.id);
  }, [currentStep]);


  useEffect(() => {
    getLastTask().then((res: any) => {
      if (res.success) {
        // handleChangeScript({ id: res.data });
        handleLoadTask(res.data, true);
        setSkipFirstFetch(false);
      } else {
        message.error('获取任务失败');
        console.log(res);
      }
    });
  }, []);


  function handleLoadTask(id: string | undefined, changeStep = false) {
    if (id == undefined) {
      return;
    }
    getTaskInfo(id).then((res: any) => {
      if (res.success) {
        console.log(res.data);
        if (changeStep) {
          setCurrentStep(res.data.current_step);
        }
        handleChangeScriptInfo(
          {
            title: res.data.work_name,
            type: res.data.work_type ? res.data.work_type.split(',') : [],
            description: res.data.work_description,
          });
        handleChangeScript(
          {
            id: res.data.id,
            bgm_prompt: res.data.bgm_prompt ? res.data.bgm_prompt.split(',') : [],
            aspect_ratio: res.data.aspect_ratio,
            footage: res.data.footage,
            video_url: res.data.video_url,
          }, true);
        setFootageDidUpdated(false);
        // console.log(script);
        // console.log(scriptInfo);
      } else {
        message.error('获取任务失败');
        console.log(res);
      }
    });
  }

  function handleChangeScriptInfo(info: { title: string; type: string[]; description: string; }) {
    Object.keys(info).forEach(key => {
      // @ts-ignore
      if (info[key] === undefined) {
        // @ts-ignore
        delete info[key];
      }
    });
    let newInfo = { ...Object.assign(scriptInfo, info) };
    setScriptInfo(newInfo);
  }

  function handleChangeScript(changedScript: any, force_update_video = false) {
    Object.keys(changedScript).forEach(key => {
      if (key != 'video_path' && (changedScript[key] === undefined || changedScript[key] === null)) {
        delete changedScript[key];
      }
    });
    if (changedScript.footage != undefined) {
      setFootageDidUpdated(true);
    }
    let newScript = { ...Object.assign(script, changedScript) };
    if(force_update_video){
      newScript.video_url= changedScript.video_url;
    }
    setScript(newScript);
  }

  function handleChangeModel(value: string) {
    setModel(value);
  }

  async function handleCallGeneratingScript(require_update = true) {
    // console.log(script);
    // console.log(scriptInfo);
    // @ts-ignore
    if (scriptInfo.title.length > constraints.SCRIPT_TITLE_MAX_LENGTH || scriptInfo.description.length > constraints.SCRIPT_DESCRIPTION_MAX_LENGTH[localStorage.getItem('vip_level') || 'free']) {
      message.error('请减少标题或描述长度');
      return false;
    }
    console.log('call generating script');

    const res = await generateScriptGPT(script.id, scriptInfo.title, scriptInfo.type, scriptInfo.description, model);
    console.log(res);
    if (res.success) {
      if (require_update) {
        handleLoadTask(script.id);
      }
    }
    callUpdateBalance();
    if (res.code == 402) {
      message.error('您的算力余额不足');
    } else if (!res.success) {
      message.error('生成失败，请稍候再试');
    }
    return res.success;
  }

  async function handleUpdateTaskAndFootage() {
    // console.log(localStorage.getItem('vip_level'));
    // @ts-ignore
    if (scriptInfo.title.length > constraints.SCRIPT_TITLE_MAX_LENGTH || scriptInfo.description.length > constraints.SCRIPT_DESCRIPTION_MAX_LENGTH[localStorage.getItem('vip_level') || 'free']) {
      message.error('请减少标题或描述长度');
      return false;
    }
    for (let i = 0; i < script.footage.length; i++) {
      // @ts-ignore
      if (script.footage[i].description.length > constraints.FOOTAGE_DESCRIPTION_MAX_LENGTH[localStorage.getItem('vip_level') || 'free']) {
        message.error('请减少镜头描述长度');
        return false;
      }
    }
    console.log('call update task and footage');
    const info_update_success = await updateTaskInfo(currentStep, scriptInfo, script, footageDidUpdated);
    if (info_update_success) {
      setFootageDidUpdated(false);
    }
    return info_update_success;
  }

  function callUpdateBalance() {
    if (subComponentsRef.current != null) {
      // @ts-ignore
      subComponentsRef.current.callUpdateBalance();
    }
  }


  function nextStep() {
    if (currentStep + 1 < steps.length) {
      setFormerStep(currentStep);
      setCurrentStep(currentStep + 1);
    }
  }

  function lastStep() {
    if (currentStep - 1 >= 0) {
      setFormerStep(currentStep);
      setCurrentStep(currentStep - 1);
    }
  }

  console.log(script);

  return (
    <Auth>
      <Page subtitle={'IAmDirector - 创作视频'}>
        <div style={{ minWidth: '65vw' }}>
          <Steps current={currentStep} items={steps} style={{ marginTop: '5rem' }} />
          {steps[currentStep].children}
        </div>
      </Page>
    </Auth>
  );
}

DirectorPage.diplsayName = 'EditorPage';
export default DirectorPage;
