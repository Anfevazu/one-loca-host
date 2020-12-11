import React ,{ useEffect, useState }from 'react';
import Loader from 'components/Loader/Loader';
import { Result, Button } from 'antd';

export default function Success({history}) {
  const  [payment, setPayment] = useState({order: {}})
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if(localStorage.getItem("payment")){
      setPayment(JSON.parse(localStorage.getItem("payment")))

      // consuiltar pago https://www.mercadopago.com.co/developers/es/guides/manage-account/account/retrieving-payments
      setLoading(false)

      // crear experiencia //
      console.log(payment)
    }else{
      history.push('/')
    }
  }, []);

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
      subTitle={`Pago ID : ${payment.payment} - ${new Date()}`}
      extra={[
        <Button type="primary" key="console">
          Ver Host
        </Button>
      ]}
    />)}
   </>
  );
}
