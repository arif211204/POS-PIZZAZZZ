import { useState } from 'react';

export default (defaultValue = '') => {
  const [value, setValue] = useState(defaultValue);
  const handleValueChange = ({ target }) => setValue(target.value);
  return [value, handleValueChange, setValue];
};
