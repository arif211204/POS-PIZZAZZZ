import { useState } from 'react';

export default (defaultValue = null) => {
  const [value, setValue] = useState(defaultValue);
  const handleValueChange = (event, newValue) => setValue(newValue);
  return [value, handleValueChange, setValue];
};
