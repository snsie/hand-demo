import { activityTitles } from '@/utils/store';
export default function TaskTitle({ titleIndex, ...props }) {
  return <h1 className="Task-title">{activityTitles[titleIndex]}</h1>;
}
