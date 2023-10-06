import { useState } from 'react';

export default (defaultFile = null) => {
  const [file, setFile] = useState(defaultFile);
  const handleFileChange = ({ target }) => setFile(target.files[0]);
  return [file, handleFileChange, setFile];
};
