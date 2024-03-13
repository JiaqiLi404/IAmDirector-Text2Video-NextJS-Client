import { Card, Statistic } from 'antd';
import { useEffect, useImperativeHandle, useState } from 'react';
import { getInfo } from '@/api/user';
import { constraints } from '@/constraints';


// @ts-ignore
export function BalancePanel({ onRef }) {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    updateBalance();
  }, []);

  useImperativeHandle(onRef, () => {
    return {
      updateBalance: updateBalance,
    };
  });

  function updateBalance() {
    getInfo().then((res: any) => {
      if (res.success) {
        setBalance(res.data.balance);
      }
    });
  }

  return (
    <div className="balance-panel shadow-lg">
      <Card title={<Statistic className={'balance-title'} title="算力余额" value={balance} precision={4}
                              valueStyle={{ color: '#3f8600' }} />}
            bordered={false}>
        <p>免费用户拥有100点算力，请合理规划使用(可生成约1分钟的视频)</p>
        <p>一次<b>GPT调用</b>的算力消耗为:</p>
        <p><b>基础开销 + 镜头开销 * 镜头数（免费用户镜头数为2-3个）</b></p>
        <p>一次<b>视频生成</b>的算力消耗为：</p>
        <p>100 * 视频分钟数（<b>若单个镜头约10秒钟,则消耗{(constraints.VIDEO_COST/6).toFixed(1)}算力</b>）</p>
        <p>如果要<b>下载视频</b>，则还需要额外的<b>1点算力</b></p>
      </Card>
    </div>
  );
}