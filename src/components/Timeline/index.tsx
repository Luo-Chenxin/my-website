import React, { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface TimelineDetail {
  text: ReactNode;
  detailName?: string;
  detailPath?: string;
}

interface TimelineItemProps {
  date: string;
  items: TimelineDetail[];
}

export default function Timeline({ children }: { children: ReactNode }) {
  return <div className={styles.timelineContainer}>{children}</div>;
}

export function TimelineItem({ 
    date, 
    items
}: TimelineItemProps) {

  return (
    <div className={styles.timelineItem}>
      <div className={styles.timelineDate}>{date}</div>
      <div className={styles.timelineContent}>

        {items.map((item, index) => (
          <div key={index} style={{ marginBottom: index === items.length - 1 ? 0 : '12px' }}>
            <div className={styles.timelineMainRow}>
               {item.text}
            </div>

            {item.detailName && item.detailPath && (
                <div>
                  <strong>See details in: </strong>
                  <Link to={item.detailPath}>{item.detailName}</Link>
                </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}