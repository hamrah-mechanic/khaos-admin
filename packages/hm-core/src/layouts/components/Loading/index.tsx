import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

TopBarProgress.config({
  barColors: {
    '0': '#fff',
    '1.0': '#fff',
  },
  shadowBlur: 5,
});

const Loading: React.FC = () => {
  const location = useLocation();

  const [progress, setProgress] = useState(false);
  const [prevLocation, setPrevLocation] = useState('');

  useEffect(() => {
    setPrevLocation(location.pathname);
    setProgress(true);
    if (location.pathname === prevLocation) {
      setPrevLocation('');
    }
  }, [location]);

  useEffect(() => {
    setProgress(false);
  }, [prevLocation]);

  return progress ? <TopBarProgress /> : null;
};

export default Loading;
