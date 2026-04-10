import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

interface Props {
  children: React.ReactElement;
  initialZoom?: number;
  initialX?: number;
  initialY?: number;
  title?: string;
  height: number;
}

export default function SvgAdjuster({ 
  children, 
  initialZoom = 100, 
  initialX = 0, 
  initialY = 0,
  title,
  height
}: Props) {
  // state manager
  const [zoom, setZoom] = useState(initialZoom);
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  
  const viewerRef = useRef<HTMLDivElement>(null);

  // --- define handleMouseDown ---
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // only response to left-click of mouse
    setIsDragging(true);
    e.preventDefault(); // prevent system's default text selection behavior from being triggered
  };

  // --- scroll interception（prevent webpage from scaling） ---
  useEffect(() => {
    const viewerElement = viewerRef.current;
    if (!viewerElement) return;

    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault(); // intercept browser default behavior
      const delta = e.deltaY > 0 ? -5 : 5;
      setZoom((prev) => Math.min(Math.max(prev + delta, 20), 1500));
    };

    // force interception using { passive: false }
    viewerElement.addEventListener('wheel', handleNativeWheel, { passive: false });

    return () => {
      viewerElement.removeEventListener('wheel', handleNativeWheel);
    };
  }, []);

  // --- monitor global mouse movement to complete drag-and-drop. ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPos((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className={styles.adjusterWrapper}>
      {/* Top parameter display */}
      <div className={styles.statusBadge}>
        Zoom: {zoom}% | X: {pos.x}px | Y: {pos.y}px
      </div>
      
      <div 
        ref={viewerRef}
        className={styles.viewer}
        onMouseDown={handleMouseDown}
        style={{ 
          cursor: isDragging ? 'grabbing' : 'grab', 
          height: `${height}px`
        }}
      >
        <div style={{
          transform: `translate(${pos.x}px, ${pos.y}px) scale(${zoom / 100})`,
          transition: isDragging ? 'none' : 'transform 0.15s ease-out',
          transformOrigin: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none'
        }}>
          {children}
        </div>
      </div>
      {title && (
        <div className={styles.titleContainer}>
          {title}
        </div>
      )}
      <p className={styles.hint}>Scroll wheel to zoom / Left-click to drag</p>
    </div>
  );
}