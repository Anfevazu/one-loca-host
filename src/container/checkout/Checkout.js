import React ,{ useEffect, useState, useContext } from 'react';
import { Result, Descriptions, Divider, Button,  Row, Col, } from 'antd';
import { AiFillSchedule } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
import Container from 'components/UI/Container/Container';
import Heading from 'components/UI/Heading/Heading';
import { isArray } from 'lodash';
import moment from 'moment';
import axios from 'axios'
import { AuthContext } from 'context/AuthProvider';
import { firestore } from '../../firebaseConfig';


const api_url = process.env.REACT_APP_MERCADO_PAGO_API_KEY
const iva = process.env.REACT_APP_IVA
const ivaValue = process.env.REACT_APP_IVA_VALUE

export default function Checkout() {
  const { user } = useContext(AuthContext);
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
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(data.plans){
    let items = [{
      reference_code: `Contrata one local host, Host: ${data.hostName}`,
      unit_price: data.total +  (data.total * iva ),
      quantity: 1,
      description: 'Contrata one local host para planificar tu viaje',
      currency_id: "USD"
    }]
    let headers = {
      'Content-Type' : 'application/json',
      'cache-control' : 'no-cache'
    }
    let back_url = {
      "success": process.env.REACT_APP_SUCCESS_PAYMENT,
      "failure": process.env.REACT_APP_REJECTED_PAYMENT
    }
    let taxes =  [
      {
          "type": "IVA",
          "value": 19
      }
    ]
    let payment_methods = {
      "excluded_payment_types": [
          {
              "id": "ticket"
          }
      ]
    }
    let body = {
      items,
      back_urls: back_url,
      binary_mode: true,
      auto_return: "approved",
      taxes: taxes,
      external_reference: "Compra One Local Host",
      payment_methods: payment_methods
    }
    axios.post(api_url, body, {headers : headers})
    .then(response =>{
      setPayment(response.data)
      setUrl(response.data.sandbox_init_point)
    })
    .catch(error =>{
      const {response} = error
      console.log(response)
    })
  }}, [data]);// eslint-disable-line react-hooks/exhaustive-deps

  const handlerButton = () =>{
    let newId = firestore.collection("contract_houst").doc().id
    let buy = {
      "order" : data,
      "payment": payment.id,
      "sub_total" : data.total,
      "iva" : data.total * iva,
      "iva_percent": ivaValue,
      "total": (data.total * iva) + data.total,
      "user": user.id,
      "id": newId,
      "status": "PENDDING",
      "date": new Date(),
      "hostId": data.hostId
    }
    firestore.collection("contract_houst").doc(newId).set(buy)
    localStorage.setItem("last_payment", newId)
    window.open(url)
    localStorage.removeItem("order")
    history.push('/')
  }

  return (
  <>
        <Result
        style={{padding: '0 !important'}}
        icon={<AiFillSchedule style={{fontSize: '5rem', color: '#ffcf2a'}}/>}
        status="success"
        title=""/>
        <Container style={{textAlign: 'center'}}>
          <Heading as="h2" content="Resumen de tu compra" style={{textAlign: 'center'}}/>
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
            <Descriptions.Item label="Sub-Total" span={3}> <b>${data.total} USD</b></Descriptions.Item>
            <Descriptions.Item label={`IVA ${ivaValue}%`} span={3}> <b>${data.total * iva} USD</b></Descriptions.Item>
            <Descriptions.Item label="Total" span={3}> <b>${(data.total * iva) + data.total} USD</b></Descriptions.Item>
          </Descriptions>
            <br/>
          <Row justify="start">
            <Col className="gutter-row" span={8}></Col>
            <Col className="gutter-row" span={8}>
            <Button type="primary" onClick={handlerButton} size="large" style={{backgroundColor: '#ffcf2c', borderColor: '#ffcf2c'}} block>Pagar</Button>
            </Col>
            <Col className="gutter-row" span={8}></Col>
          </Row>
          <Divider />
      </Container>
  </>
  );
}
