import React from 'react';
import { Button, Input, Typography, Select, Popconfirm } from 'antd';
import { constraints } from '@/constraints';
import { CloseOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

// @ts-ignore
export function FootageDescriptionPanel(this: any, {
  // @ts-ignore
  id,
  // @ts-ignore
  footage,
  // @ts-ignore
  voiceOptions,
  // @ts-ignore
  onDescriptionChange,
  // @ts-ignore
  handleFootageDelete,
  // @ts-ignore
  handleFootageMoveUp,
  // @ts-ignore
  handleFootageMoveDown,
  // @ts-ignore
  handleFootageVoiceChange,
  // @ts-ignore
  handleFootageDescriptionBlur,
}) {

  return (
    <div className={'director-script-footage-div animate__animated animate__fadeIn animate__faster'}>
      <div className={'director-script-footage-div-left'}>
        <Typography.Title level={4} style={{ marginTop: '1rem' }}>镜头{id + 1}</Typography.Title>
        <Typography.Title level={5} style={{ marginTop: '1rem' }}>内容</Typography.Title>
        <TextArea
          onBlur={handleFootageDescriptionBlur}
          value={footage.description}
          onChange={onDescriptionChange.bind(this, id)}
          autoSize={{ minRows: 1, maxRows: 4 }}
          placeholder="请描述详细的镜头内容"
          count={{
            show: true,
            // @ts-ignore
            max: constraints.FOOTAGE_DESCRIPTION_MAX_LENGTH[localStorage.getItem('vip_level')||'free'],
          }} />
        <Typography.Title level={5} style={{ marginTop: '1rem' }}>音色</Typography.Title>
        <Select
          showSearch
          placeholder="默认"
          optionFilterProp="children"
          value={footage.voice}
          onChange={handleFootageVoiceChange.bind(this, id)}
          filterOption={filterOption}
          options={voiceOptions}
          style={{ marginBottom: '2rem' }}
        />
      </div>
      <div className={'director-script-footage-div-right'}>
        <Popconfirm
          title="删除镜头"
          description="删除后不可恢复，确定删除镜头吗？"
          onConfirm={handleFootageDelete.bind(this, id)}
          okText="确定"
          cancelText="取消"
        >
          <Button className={'director-script-footage-div-btn'}
                  type="default" icon={<CloseOutlined />} danger
          >删除</Button>
        </Popconfirm>
        <Button className={'director-script-footage-div-btn'} onClick={handleFootageMoveUp.bind(this, id)}
                type="default" icon={<ArrowUpOutlined />}
        >上移</Button>
        <Button className={'director-script-footage-div-btn'} onClick={handleFootageMoveDown.bind(this, id)}
                type="default" icon={<ArrowDownOutlined />}
        >下移</Button>
      </div>
    </div>
  );
}