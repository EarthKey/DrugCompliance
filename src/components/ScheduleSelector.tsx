import { TimePicker, Select, Row, Col, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const SLOT_LABELS = [
  "起床時",
  "朝食前",
  "朝食後",
  "昼食前",
  "昼食後",
  "夕食前",
  "夕食後",
  "寝る前",
] as const;

export type SlotId = (typeof SLOT_LABELS)[number];

export interface ScheduleItem {
  label: SlotId;
  time: dayjs.Dayjs | null;
}

export interface ScheduleSelectorProps {
  value: ScheduleItem[];
  onChange: (value: ScheduleItem[]) => void;
}

export default function ScheduleSelector({ value, onChange }: ScheduleSelectorProps) {
  const handleLabelChange = (index: number, newLabel: SlotId) => {
    const next = [...value];
    next[index] = { ...next[index], label: newLabel };
    onChange(next);
  };

  const handleTimeChange = (index: number, newTime: dayjs.Dayjs | null) => {
    const next = [...value];
    next[index] = { ...next[index], time: newTime };
    onChange(next);
  };

  const addSlot = () => {
    if (value.length >= 8) return;
    onChange([...value, { label: "起床時", time: null }]);
  };

  const removeSlot = (index: number) => {
    const next = value.filter((_, i) => i !== index);
    onChange(next);
  };

  return (
    <>
      {value.map((slot, i) => (
        <Row key={i} gutter={8} style={{ marginBottom: 8 }} align="middle">
          <Col flex="180px">
            <Select
              value={slot.label}
              onChange={(v) => handleLabelChange(i, v as SlotId)}
              options={SLOT_LABELS.map((l) => ({ value: l, label: l }))}
              style={{ width: "100%" }}
            />
          </Col>
          <Col flex="120px">
            <TimePicker
              value={slot.time}
              onChange={(t) => handleTimeChange(i, t)}
              format="HH:mm"
              style={{ width: "100%" }}
            />
          </Col>
          <Col flex="40px">
            <Button
              type="text"
              icon={<DeleteOutlined />}
              danger
              onClick={() => removeSlot(i)}
            />
          </Col>
        </Row>
      ))}

      <Button type="dashed" block onClick={addSlot} disabled={value.length >= 8}>
        スロット追加
      </Button>
    </>
  );
}
