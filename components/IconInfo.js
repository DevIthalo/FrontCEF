import React, { useState } from 'react';
import styles from '@/styles/iconInfo.module.css';

const IconWithInfo = ({ iconText, icon }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleMouseEnter = () => {
    setShowInfo(true);
  };

  const handleMouseLeave = () => {
    setShowInfo(false);
  };

  return (
    <div
      className={styles.iconContainer}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon}
      {showInfo && <div className={styles.info}> {iconText}</div>}
    </div>
  );
};

export default IconWithInfo;
