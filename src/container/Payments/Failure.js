import React ,{ useEffect, useState }from 'react';
import Loader from 'components/Loader/Loader';
import { Result, Button } from 'antd';
import { firestore } from '../../firebaseConfig';

export default function Failure({history}) {
  const  [payment, setPayment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem("last_payment")){
      setPayment(localStorage.getItem("last_payment"))
    }else{
      history.push('/')
    }
  },[]);

  useEffect(() => {
    if(payment){
      firestore.collection("contract_houst").doc(payment).set({status: "REJECTED"}, {merge: true})
      setLoading(false)
    }
  },[payment]);


  const goHome = () => {
    localStorage.removeItem("last_payment")
    history.push('/')
  }
  return (
   <>
    <br/>
    <br/>
    <br/>
    {loading ?
    (<Loader/>) :
    (<Result
      status="error"
      title="Su Pago ha sido rechazado!"
      subTitle="Por favor valide sus datos e intente nuevamente"
      extra={[
        <Button type="primary" key="console" onClick={goHome} style={{backgroundColor: '#ffcf2c', borderColor: '#ffcf2c'}}>
          Ir Inicio
        </Button>
      ]}
    />)}
   </>
  );
}
