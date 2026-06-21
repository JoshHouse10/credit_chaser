import { useState } from 'react';
import { Switch } from '@mantine/core';

export default function Toggle ({setRange}) {
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
      const isChecked = event.currentTarget.checked
      setChecked(isChecked);
      setRange(isChecked ? 'Monthly' : 'Yearly');
      };

  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      label={checked ? 'This month' : 'This year'}
    />
  );
}