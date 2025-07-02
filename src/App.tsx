import { Button, Layout, message } from 'antd';
import ScheduleSelector from './components/ScheduleSelector';
import { useSchedule } from './hooks/useSchedule.ts';
import './App.css'

function App() {
  const [schedule, setSchedule] = useSchedule();

  const handleSave = () => {
    message.success('スケジュールを保存しました');
  };

  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 48 }}>
      <div className="app-container" style={{ width: 480 }}>
        <h1 style={{ textAlign: 'center' }}>服薬スケジュール設定</h1>
        <ScheduleSelector value={schedule} onChange={setSchedule} />
        <Button type="primary" block style={{ marginTop: 16 }} onClick={handleSave}>
          保存
        </Button>
      </div>
    </Layout>
  );
}

export default App
