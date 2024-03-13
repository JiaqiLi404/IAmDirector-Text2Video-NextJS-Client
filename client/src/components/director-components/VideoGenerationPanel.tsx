import { Button, Card, Progress, Statistic, Steps } from 'antd';
import React, { useEffect, useImperativeHandle, useReducer, useRef, useState } from 'react';
// @ts-ignore
import Video from 'next-video';
import { getToken } from '@/auth';
import type { ProgressProps } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined, CloudDownloadOutlined } from '@ant-design/icons';

const twoColors: ProgressProps['strokeColor'] = {
  '0%': '#108ee9',
  '100%': '#87d068',
};

const loadingSteps = [
  {
    title: '上传剧本',
    min_process: 0,
    max_process: 10,
  },
  {
    title: 'AI生成视频',
    min_process: 10,
    max_process: 90,
  },
  {
    title: '提取视频',
    min_process: 90,
    max_process: 99,
  },
  {
    title: '完成',
    min_process: 99,
    max_process: 100,
  },
];


// @ts-ignore
export function VideoGenerationPanel({ script, formerStep, step, lastStep, nextStep, changeScript }) {
  function useInterval(callback: any, delay: number | null) {
    const savedCallback = useRef();

    // 保存新回调
    useEffect(() => {
      savedCallback.current = callback;
    });

    // 建立 interval
    useEffect(() => {
      function tick() {
        // @ts-ignore
        savedCallback.current();
      }

      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const [url, setUrl] = useState<string>('');
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [pointNum, setPointNum] = useState(1);
  const [loadingStep, setLoadingStep] = useState<number>(0);

  useEffect(() => {
    if (!script.video_url) {
      setUrl('');
      return;
    }
    if (script.video_url.startsWith('http')) {
      setUrl(script.video_url);
      return;
    }
    let url_split: string[] = script.video_url.split('/');
    const file_id = url_split.pop();
    const add_path = url_split.join('/');
    setUrl(process.env.NEXT_PUBLIC_BACKEND_URL + add_path + '/' + getToken() + '=token=' + file_id);
    console.log(url);
  }, [script]);

  useInterval(() => {
    console.log(loadingPercentage);
    setLoadingPercentage(loadingPercentage + 1);
  }, loadingPercentage < loadingSteps[loadingStep].max_process ? 100 : null);

  useInterval(() => {
    setPointNum((pointNum + 1) % 6);
  }, loadingPercentage < 100 ? 500 : null);

  function renderVideo() {
    return (
      <>
        <div>
          <Video src={url} />
        </div>
        <div className={'flex flex-row justify-center'} style={{marginTop:"2rem"}}>
          <Button className={'director-step-btn'} onClick={lastStep} icon={<ArrowLeftOutlined />}
                  size={'large'}>修改剧本</Button>
          <Button className={'director-step-btn'} onClick={nextStep} icon={<CloudDownloadOutlined />}
                  size={'large'} type={'primary'}>导出视频</Button>
        </div>
      </>
    );
  }

  function renderLoading() {
    return (
      <div className={'flex flex-col w-full justify-center pb-24 pt-24'}>
        <div className={'flex flex-row w-full justify-center'}>
          <div className={'mr-8'}>
            <Progress percent={loadingPercentage} type="circle" strokeColor={twoColors} size={150} strokeWidth={8}
                      style={{ margin: 'auto', display: 'block' }}
                      className={'animate__animated animate__pulse '} />
          </div>
          <div className={'ml-8'}>
            <Steps
              progressDot
              current={loadingStep}
              direction="vertical"
              items={loadingSteps}
              size={'small'}
            />

          </div>
        </div>
        <p style={{ fontSize: '0.95rem', textAlign: 'center', margin: '1rem' }}>
          <b>{loadingPercentage == 100 ? '视频生成成功' : 'AI正在全力生成您的视频，请稍候 ' + '.'.repeat(pointNum)}</b>
        </p>
        <Button onClick={() => {
          if (loadingStep + 1 < loadingSteps.length) {
            setLoadingStep(loadingStep + 1);
          } else {
            changeScript({ video_url: '/file/7172845626240012288.mp4' });
          }
        }}>next</Button>
      </div>
    );

  }

  return (
    <div
      className={formerStep < step ? 'direction-block animate__animated animate__fadeInRight animate__faster' : 'direction-block animate__animated animate__fadeInLeft animate__faster'}>
      <div className="">
        {/*<p>{url}</p>*/}
        {
          url != '' ? renderVideo() : renderLoading()
        }
      </div>
    </div>
  );
}