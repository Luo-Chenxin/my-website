import React, { useState } from 'react';
import styles from './styles.module.css';

interface Props {
  logic?: 'conv' | 'convT';
}

export default function KernelPaddingCalculator({ logic = 'conv' }: Props) {
  const [kernel, setKernel] = useState<number | string>(logic === 'conv' ? 3 : 4);
  const [padding, setPadding] = useState<number | string>(1);
  const [error, setError] = useState<string>('');

  // Processing Kernel Input (Kernel = 2 * padding + 1)
  const handleKernelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setKernel('');
      setPadding('');
      setError('');
      return;
    }
    const k = parseInt(val, 10);
    if (!isNaN(k)) {
      setKernel(k);
      if (logic === 'conv'){
        if (k > 0 && k % 2 !== 0) {
          // Auto Caculate: Padding = (k - 1) / 2
          setPadding((k - 1) / 2);
          setError('');
        } else {
          setError('Kernel must be a positive odd number.');
        }
      } else {
        if (k > 0 && k % 2 === 0) {
          // Auto Caculate: Padding = k / 2 - 1
          setPadding(k / 2 - 1);
          setError('');
        } else {
          setError('Kernel must be a positive even number.');
        }
      }
    }
  };

  // Processing Padding Input (Padding = (kernel - 1) / 2)
  const handlePaddingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setPadding('');
      setKernel('');
      setError('');
      return;
    }
    const p = parseInt(val, 10);
    if (!isNaN(p)) {
      setPadding(p);
      if (p >= 0) {
        if (logic === 'conv') {
          // Auto Caculate: Kernel = 2 * p + 1
          setKernel(2 * p + 1);
        } else {
          // Auto Caculate: Kernel = 2 * (p + 1)
          setKernel(2 * (p + 1));
        }
        setError('');
      } else {
        setError('Padding must be a non-negative integers.');
      }
    }
  };

  return (
    <div className={styles.calcContainer}>
      <table className={styles.calcTable}>
        <thead>
          <tr>
            <th>Kernel (<var>k</var>)</th>
            <th>Padding (<var>p</var>)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="number"
                value={kernel}
                onChange={handleKernelChange}
                className={error.includes('Kernel') ? styles.inputError : ''}
              />
            </td>
            <td>
              <input
                type="number"
                value={padding}
                onChange={handlePaddingChange}
                className={error.includes('Padding') ? styles.inputError : ''}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.messageArea}>
        {error ? (
          <span className={styles.errorText}>{error}</span>
        ) : (
          <span className={styles.formulaHint}>
            Relational formula: {logic === 'conv'?
              (<><var>k = 2p + 1</var>(Maintain Resolution)</>):
              (<><var>k = 2(p + 1)</var> (Double Resolution)</>)
            }
          </span>
        )}
      </div>
    </div>
  );
}