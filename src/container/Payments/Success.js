import React ,{ useEffect, useState }from 'react';
import Loader from 'components/Loader/Loader';
import { Result, Button } from 'antd';
import { firestore } from '../../firebaseConfig';
import {MY_TRIPS} from '../../settings/constant';
export default function Success({history}) {
  const  [payment, setPayment] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem("last_payment")){
      setPayment(localStorage.getItem("last_payment"))
      setLoading(false)
    }else{
      history.push('/')
    }
  },[]);

  useEffect(() => {
    if(payment){
      firestore.collection("contract_houst").doc(payment).set({status: "APPROVED", tripStatus: "ACTIVE"}, {merge: true})
    }
  },[payment]);


  const goHostDetail = () => {
    localStorage.removeItem("last_payment")
    history.push(MY_TRIPS)
  }
  return (
   <>
    <br/>
    <br/>
    <br/>
    {loading ?
    (<Loader/>) :
    (<Result
      status="success"
      title="Su Pago ha sido exitoso!"
      subTitle={`Pago ID : ${payment} - ${new Date()}`}
      extra={[
        <Button type="primary" key="console" onClick={goHostDetail} style={{backgroundColor: '#ffcf2c', borderColor: '#ffcf2c'}}>
          Ver Host
        </Button>
      ]}
    />)}
   </>
  );
}
