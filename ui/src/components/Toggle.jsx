import { useState } from 'react';
import { SegmentedControl } from '@mantine/core';

export default function Toggle ({setRange}) {
  const [value, setValue] = useState('Yearly');

  const handleChange = (val) => {
    setValue(val);
    setRange(val);
  };

  return (
    <SegmentedControl
      value={value}
      onChange={handleChange}
      radius="xl"
      color="indigo"
      data={['Yearly', 'Monthly']}
    />
  );
}
