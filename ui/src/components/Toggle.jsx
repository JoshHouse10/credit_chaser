import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';

export default function Toggle({ setRange }) {
  const [value, setValue] = useState('Yearly');

  const handleChange = (val) => {
    setValue(val);
    setRange(val);
  };

  return (
    <SegmentedControl
      value={value}
      onChange={handleChange}
      radius={7}
      size="sm"
      data={['Yearly', 'Monthly']}
      styles={{
        root: { background: '#eef1f4', border: '1px solid var(--line)', padding: 3 },
        indicator: { background: 'var(--card)', boxShadow: 'var(--shadow-sm)' },
        label: {
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--text)',
          '&[dataActive]': { color: 'var(--text-h)' },
        },
      }}
    />
  );
}
