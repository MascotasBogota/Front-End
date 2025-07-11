import React, { useState } from 'react';
import styles from '../../styles/Login.module.css';
import FormLogin from '../../components/Login/FormLogin';

const ViewHome = () => {
  return (
      <div className={styles.background}>
        <FormLogin />
      </div>
  );
};

export default ViewHome;