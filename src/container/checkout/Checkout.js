import React ,{ useEffect, useState } from 'react';
import { Result, Descriptions, Divider, Button } from 'antd';
import { AiFillSchedule } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import Container from 'components/UI/Container/Container';
import Heading from 'components/UI/Heading/Heading';
import { isArray } from 'lodash';
import moment from 'moment';
import axios from 'axios'

const key = "APP_USR-8238586441290981-081903-a754933b606d2ce16bc6a46cbb5d3bfb-165320074"
const api_url = "https://api.mercadolibre.com/checkout/preferences?access_token="+key


export default function Checkout() {
  let plans = []
  const  [newDate, setNewDate] = useState(null)
  const  [data, setdata] = useState({})
  let history = useHistory();

  useEffect(() => {
    if(localStorage.getItem("order")){
      setdata(JSON.parse(localStorage.getItem("order")))
    }else{
      history.push('/')
    }

  }, []);

  if(data.plans){
    let items = [{
      reference_code: "Contrata one local host"+' Host:'+data.hostName,
      unit_price: data.total,
      quantity: 1,
      description: 'Contrata one local host para planificar tu viaje',
      currency_id: "USD"
    }]
    let headers = {
      'Content-Type' : 'application/json',
      'cache-control' : 'no-cache'
    }
    axios.post(api_url, {items, total_amount: data.total}, {headers : headers})
    .then(response =>{
      const script = document.createElement('script');
      script.src = 'https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js';
      script.async = true;
      script.setAttribute('data-preference-id', response.data.id);
      document.getElementById('mercadoForm').appendChild(script);
    })
    .catch(error =>{
      const {response} = error
      console.log(error)
    })
  }

  return (
  <div>
    <Result
      icon={<AiFillSchedule style={{fontSize: '5rem', color: '#ffcf2a'}}/>}
      status="success"
      title=""/>
<Container style={{textAlign: 'center'}}>
        <Heading as="h2" content="Resumen de tu compra" style={{textAlign: 'center'}}/>
        <Divider />

          <Descriptions title="" bordered>
            <Descriptions.Item label="Plan" span={3}>{data.plans?.map((plan, index) =>{
              return <div key={index}>{plan.name}</div>
            })}</Descriptions.Item>
            <Descriptions.Item label="Fecha" span={3}>{data.date && isArray(data.date) ? (moment(data.date[0], "YYYY-MM-DD").format('L')+' - '+moment(data.date[1], "YYYY-MM-DD").format('L')) : (moment(data.date, "YYYY-MM-DD").format('L'))}</Descriptions.Item>

            <Descriptions.Item label="Tipo de viaje" span={3}>
              {data.typeTravel}
            </Descriptions.Item>
            <Descriptions.Item label="Host" span={3}>{data.hostName}</Descriptions.Item>
            <Descriptions.Item label="Destino" span={3}>{data.city}, {data.country}</Descriptions.Item>
            <Descriptions.Item label="Total" span={3}> <b>${data.total} USD</b></Descriptions.Item>
          </Descriptions>
          <Divider />

          <form action="/procesar-pago" method="POST" id="mercadoForm" style={{display: 'flex', flexDirection: 'row-reverse'}}/>
      </Container>
  </div>





  );
}
