import { Button, message, Result } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CloudDownloadOutlined,
  DownloadOutlined,
  HomeOutlined, ShareAltOutlined,
} from '@ant-design/icons';
import { getToken } from '@/auth';
import { useRouter } from 'next/navigation';


// @ts-ignore
export function ExportPanel({ script }) {
  const router = useRouter();

  useEffect(() => {
    download();
  }, []);

  function getURL() {
    let url = '';
    if (!script.video_url) {
      console.log('no video url', script);
    } else if (script.video_url.startsWith('http')) {
      url = script.video_url;
    } else {
      let url_split: string[] = script.video_url.split('/');
      const file_id = url_split.pop();
      const add_path = url_split.join('/');
      url = process.env.NEXT_PUBLIC_BACKEND_URL + add_path + '/' + getToken() + '=token=' + file_id;
    }
    console.log(url);
    return url;
  }

  function download() {
    const url = getURL();
    const iframe = document.createElement('iframe');
    iframe.setAttribute('hidden', 'hidden');
    document.body.appendChild(iframe);
    iframe.onload = () => {
      if (iframe) {
        iframe.setAttribute('src', 'about:blank');
      }
    };
    iframe.setAttribute('src', url);
  }

  function share() {
    const url = getURL();
    const share_txt = `一个超级好用的AI视频生成工具，快来试试吧！https://iamdirector.cn \n这个是我生成的作品哦：${url}`;
    navigator.clipboard.writeText(share_txt).then(function() {
      message.success('已复制到剪贴板，快去分享吧！');
    });
  }

  return (
    <div
      className={'direction-block animate__animated animate__fadeInRight animate__faster'}>
      <Result
        status="success"
        title="导出视频成功！"
        subTitle="如果没有自动下载，请点击下载按钮。由于保存时间有限，下载后请妥善保存该视频，一旦丢失可能没有办法找回。"
        extra={[
          <Button className={'director-step-btn'} type="primary" key="console" onClick={() => router.push('/home')}
                  size={'large'} icon={<HomeOutlined />}>
            返回主页
          </Button>,
          <Button className={'director-step-btn'} key="buy" size={'large'} onClick={download}
                  icon={<DownloadOutlined />}>下载</Button>,
          <Button className={'director-step-btn'} key="share" size={'large'} onClick={share}
                  icon={<ShareAltOutlined />}>分享</Button>
        ]}
      />
    </div>
  );
}