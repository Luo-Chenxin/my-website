import React, { ReactNode } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface TimelineItemProps {
  date: string;
  title: string;
  children: ReactNode;
  detailName?: string;
  detailPath?: string;
}
export default function Timeline({ children }: { children: ReactNode }) {
  return <div className={styles.timelineContainer}>{children}</div>;
}

export function TimelineItem({ 
    date, 
    title, 
    children,
    detailName, 
    detailPath 
}: TimelineItemProps) {

  return (
    <div className={styles.timelineItem}>
      <div className={styles.timelineDate}>{date}</div>
      <div className={styles.timelineContent}>
        <div>
            <div className={styles.timelineMainRow}>
                <strong>{title}: </strong> {children}
            </div>

            {detailName && detailPath && (
                <div>
                <strong>See details in: </strong>
                <Link to={detailPath}>{detailName}</Link>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}