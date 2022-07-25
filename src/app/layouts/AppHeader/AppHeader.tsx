import React from 'react';
import s from './AppHeader.module.scss';

const AppHeader = () => {
  return (
    <div className={s.header}>
      <h1 className={s.title}>Header</h1>
    </div>
  );
};

export default AppHeader;
