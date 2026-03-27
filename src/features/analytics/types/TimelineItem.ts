import { Tag } from "@/src/features/analytics/types/TimelineTag";

export type TimelineItem = {
  time: string;
  date: string;
  title: string;
  description: string;
  tag: Tag;
};
