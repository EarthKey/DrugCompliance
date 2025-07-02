import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { ScheduleItem } from '../components/ScheduleSelector';

const STORAGE_KEY = 'drugcompliance_schedule_v1';

export function useSchedule(): [ScheduleItem[], (s: ScheduleItem[]) => void] {
  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed: ScheduleItem[] = JSON.parse(raw).map((item) => ({
        ...item,
        time: item.time ? dayjs(item.time) : null,
      }));
      return parsed;
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        schedule.map((s) => ({ ...s, time: s.time ? s.time.toISOString() : null }))
      )
    );
  }, [schedule]);

  return [schedule, setSchedule];
}
