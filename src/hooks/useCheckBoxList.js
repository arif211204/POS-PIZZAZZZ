import { useState } from 'react';

export default (defaultValue = []) => {
  const [values, setValues] = useState(defaultValue);

  const handleValueChange = (newValue) => {
    const currentIndex = values.indexOf(newValue);
    const newValues = [...values];

    if (currentIndex === -1) {
      newValues.push(newValue);
    } else {
      newValues.splice(currentIndex, 1);
    }

    setValues(newValues);
  };

  return [values, handleValueChange, setValues];
};
