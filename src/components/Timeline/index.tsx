import React, { ReactNode } from 'react';
import styles from './styles.module.css';

interface TimelineItemProps {
  date: string;
  title: string;
  children: ReactNode;
  type?: 'fix' | 'feat' | 'update' | 'setup';
}

export default function Timeline({ children }: { children: ReactNode }) {
  return <div className={styles.timelineContainer}>{children}</div>;
}

export function TimelineItem({ date, title, children, type = 'update' }: TimelineItemProps) {
  const typeEmoji: Record<string, string> = {
    fix: '🐛',
    feat: '✨',
    update: '📝',
    setup: '⚙️',
  };

  return (
    <div className={styles.timelineItem}>
      <div className={styles.timelineDate}>{date}</div>
      <div className={styles.timelineContent}>
        <h4>{typeEmoji[type] || '🚀'} {title}</h4>
        <div>{children}</div>
      </div>
    </div>
  );
}