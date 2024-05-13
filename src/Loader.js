import React, { useEffect, useState } from 'react';
import "./App.css";

const Loader = ({ contents, delay }) => {
  const [textLoaded, setTextLoaded] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setTextLoaded(true);
    }, delay);
  }, [delay]);

  return (
    <div style={{ width: '100%', display:'flex', justifyContent:'center' }} className={`loader ${textLoaded ? 'loaded' : ''}`}>
      {contents}
    </div>
  );
};

export default Loader;
