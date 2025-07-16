import React, { useState } from 'react';
import styles from '../../styles/DetailsReport.module.css';
import ReportDetails from '../../components/Reportes/ReportDetails';
import ResponseDetails from '../../components/Reportes/ResponseDetails';

const ViewDetailsReport = () => {
  return (
      <div className={styles.background}>  
        <div className={styles.view_column_left}>
          <ReportDetails />
        </div>
        <div className={styles.view_column_right}>
          <ResponseDetails />
        </div>
      </div>
  );
};

export default ViewDetailsReport;