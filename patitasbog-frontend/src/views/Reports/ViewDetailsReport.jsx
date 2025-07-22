import React, { useState, useEffect } from 'react';
import styles from '../../styles/DetailsReport.module.css';
import ReportDetails from '../../components/Reportes/ReportDetails';
import ResponseDetails from '../../components/Reportes/ResponseDetails';
import { useNavigate, useParams } from 'react-router-dom';
import { userService } from '../../services/userService';
import { responseService } from '../../services/responseService';

const ViewDetailsReport = () => {
  const { idReporte } = useParams();
  const [idvieweruser, setIdViewerUser] = useState('');
  const [responses, setResponses] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errormessage, setErrorMessage] = useState('');
  const [successmessage, setSuccessMessage] = useState('');

  useEffect(() => {
    setLoading(true);

    const fetchResponses = async () => {
      setErrorMessage(true);
      try{
        const response = await responseService.getResponsesByReportId(idReporte);
        console.log(response);
        setResponses(response);

      }
      catch(error){
        setErrorMessage(error);
      }
      finally{
        setLoading(false);
      }
    }

    const fetchViewerUser = async () => {
      try{
        const response3 = await userService.getUserProfile();
        setIdViewerUser(response3.profile._id);
      }
      catch(error){
        setErrorMessage(`Error obteniendo el id del usuario logueado`);
      }
      finally{
        setLoading(false);
      }
    }   

    fetchViewerUser();
    fetchResponses();
  }, []);

  return (
      <div className={styles.background}>  
        <div className={styles.view_column_left}>
          {!loading && idvieweruser && (
            <ReportDetails idviewer={idvieweruser}/>
          )
        }
        </div>
        <div className={styles.view_column_right}>
          {!loading && idvieweruser && responses && responses.length > 0 ? (
            responses.map((response) => (
              <ResponseDetails
                key={response.id}
                data={response}
                idviewer={idvieweruser}
                idreport={idReporte}
              />
            ))
          ) : (
           !loading && <p className={styles.loadingmessage}>No hay respuestas aún.</p>
          )}
        </div>
      </div>
  );
};

export default ViewDetailsReport;