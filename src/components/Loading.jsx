import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <LoadingBar style={{ backgroundColor: 'red' }} />
    </div>
  );
}

export default Loading;
