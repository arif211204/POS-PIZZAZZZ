import { useSearchParams } from 'react-router-dom';

export default () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Function to add or update query parameters
  const updateQueryParams = (params) => {
    const currentParams = Object.fromEntries(searchParams.entries());

    // Merge the current parameters with the new ones
    const updatedParams = { ...currentParams, ...params };

    // Set the updated query parameters
    setSearchParams(updatedParams);
  };

  return [searchParams, updateQueryParams];
};
