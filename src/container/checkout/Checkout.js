import React ,{ useEffect, useState } from 'react';
import { Result, Descriptions, Divider, Button } from 'antd';
import { AiFillSchedule } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import Container from 'components/UI/Container/Container';
import Heading from 'components/UI/Heading/Heading';
import { isArray } from 'lodash';
import moment from 'moment';
import axios from 'axios'

const api_url = process.env.REACT_APP_MERCADO_PAGO_API_KEY

export default function Checkout() {

  const  [url, setUrl] = useState(null)
  const  [data, setdata] = useState({})
  const [payment, setPayment] = useState(null)

  let history = useHistory();

  useEffect(() => {
    if(localStorage.getItem("order")){
      setdata(JSON.parse(localStorage.getItem("order")))
    }else{
      history.push('/')
    }
  }, []);

  useEffect(() => {
    if(data.plans){
    let items = [{
      reference_code: "Contrata one local host"+' Host:'+ data.hostName+ ' Contratado por',
      unit_price: data.total,
      quantity: 1,
      description: 'Contrata one local host para planificar tu viaje',
      currency_id: "USD"
    }]
    let headers = {
      'Content-Type' : 'application/json',
      'cache-control' : 'no-cache'
    }
    let back_url = {
      "success": "http://localhost:3000/success",
      "failure": "http://www.tu-sitio/failure",
      "pending": "http://www.tu-sitio/pending"
  }
  let body = {items,  "back_urls": back_url, "binary_mode": true, "auto_return": "approved"}
  axios.post(api_url, body, {headers : headers})
  .then(response =>{
    setPayment(response.data)
    setUrl(response.data.sandbox_init_point)
  })
  .catch(error =>{
    const {response} = error
    console.log(error)
  })
}}, [data]);


  const handlerButton = () =>{
    let buy = {
      "order" : data,
      "payment": payment.id
    }
    localStorage.removeItem("order")
    localStorage.setItem("payment", JSON.stringify(buy))
    window.open(url)
    history.push('/')
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
          {/* <form action="/procesar-pago" method="POST" id="mercadoForm" style={{display: 'flex', flexDirection: 'row-reverse'}}/> */}
          <Button type="primary" onClick={handlerButton}>Pagar</Button>
      </Container>
  </div>





  );
}
