import React from 'react';

const Page404 = () => {
  const handleError = () => {
    throw new Error('CABOOM');
  };

  return (
    <>
      <p>Its 404 Page</p>
      <button onClick={handleError}>errors up</button>
    </>
  );
};

export default Page404;
