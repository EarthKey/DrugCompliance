import { useState } from 'react'
import { Button, Layout, message } from 'antd';
import dayjs from 'dayjs';
import ScheduleSelector, { ScheduleItem } from './components/ScheduleSelector';
import { useSchedule } from './hooks/useSchedule';
import './App.css'

function App() {
  const [schedule, setSchedule] = useSchedule();

  const handleSave = () => {
    message.success('スケジュールを保存しました');
  };

  return (
    <Layout style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
      <h1 style={{ textAlign: 'center' }}>服薬スケジュール設定</h1>
      <ScheduleSelector value={schedule} onChange={setSchedule} />
      <Button type="primary" block style={{ marginTop: 16 }} onClick={handleSave}>
        保存
      </Button>
    </Layout>
  );
}

export default App
