import React,{ useState }from 'react';
import axios from 'axios';
import {Button, Select, DatePicker, InputNumber, notification, Modal, Result} from 'antd';
import HtmlLabel from 'components/UI/HtmlLabel/HtmlLabel';
import Text from 'components/UI/Text/Text';
import ReservationFormWrapper, {
  FieldWrapper
} from './Reservation.style.js';

const key = "APP_USR-8238586441290981-081903-a754933b606d2ce16bc6a46cbb5d3bfb-165320074"
const api_url = "https://api.mercadolibre.com/checkout/preferences?access_token="+key

const { Option } = Select;
const { RangePicker } = DatePicker;

const planName = {
  1:"Tu mision aqui",
  2:"Plan basico",
  3:"Plan memorable",
  4:"Programa todo tu viaje"
}

const planDesc = {
  1:"Contrata una misión   para tu host , que pueden ir desde conseguir un alojamiento y verificarlo, comprar entradas para un museo o un lugar especial sin filas y sin comisiones.",
  2:"Contrata 5 acciones para tus host",
  3:"Contrata 10  acciones para tus host",
  4:"Sin Limite de acciones para programar tu viaje 5 días cubiertos de soporte durante tu viaje."
}
const planValue = {
  1: 10,
  2: 49,
  3: 100,
  4: 149
}
const planValueAdi = {
  1: 35,
  2: 35,
  3: 30,
  4: 25
}
const planAdic = {
  1:"Valor  día de  acompañamiento : 35 USD",
  2:"Valo días acompañamiento : 35 USD",
  3:"Valor día de  acompañamiento : 30 USD",
  4:"Valor Acompañamiento o disponibiliadad día adicional : 25 USD"
}

const RenderReservationForm = () => {


  const [plan, setPlan] = useState("0");
  const [date, setDate] = useState(null);
  const [total, setTotal] = useState(0);
  const [aditionalDays, setaditionalDays] = useState(0);
  const [planDescription, setplanDescription] = useState("");
  const [planadic, setAdic] = useState("");
  const [visible, setVisible] = useState(false);

  const handlerSelect = (value) => {
    setPlan(value)
    setplanDescription(planDesc[value])
    setAdic(planAdic[value])
    setTotal(planValue[value])
  }
  const aditionalChange = (value) => {
    setaditionalDays(value)
    setTotal(ttl => {
      ttl = planValue[plan] + (planValueAdi[plan] * value)
      return ttl
    })
  }
  const handlerDate = (value) => {
    setDate(value)
  }

  const handlerButton = () => {
    if(plan === "0" || date === null){
      notification['warning']({
        message: 'Campos incompletos',
        description:
          'Por favor selecciona un plan y las fechas para contratar tu Host',
        placement: 'bottomRight'
      });
    }
    getPaymentForm()
  }

  const getPaymentForm = () => {
    let items = [{
        reference_code: planName[plan],
        unit_price: total,
        quantity: 1,
        description: planDesc[plan],
        currency_id: "USD"
      }]

    let headers = {
      'Content-Type' : 'application/json',
      'cache-control' : 'no-cache'
    }
    axios.post(api_url, {items, total_amount: total}, {headers : headers})
    .then(response =>{
      setVisible(true)
      const script = document.createElement('script');
      script.src = 'https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js';
      script.async = true;
      script.setAttribute('data-preference-id', response.data.id);
      document.getElementById('mercadoForm').appendChild(script);
    })
    .catch(error =>{
      const {response} = error
      console.log(response)
    })
  }

  return (
    <ReservationFormWrapper className="form-container">
      <FieldWrapper>
        <HtmlLabel htmlFor="dates" content="Tipo de experiencia" />
        <Select defaultValue="0" bordered={true}
          style={{ width: "100%", backgroundColor: "#f7f7f7 !important", borderColor: "#f7f7f7 !important"}}
          onChange={handlerSelect}
          >
          <Option value="0">Seleccion tipo de plan</Option>
          <Option value="1">Tu mision aqui (9.99 USD)</Option>
          <Option value="2">Plan basico (49 USD)</Option>
          <Option value="3">Plan memorable (100 USD)</Option>
          <Option value="4">Programa todo tu viaje (149.99 USD)</Option>
        </Select>
        { plan !== "0" ?
        (<Text content={planDescription} style={{fontSize: "12px" , fontWeight: "Bold", marginTop: "4px", padding: "4px" }}/>) : ''}
      </FieldWrapper>
      <FieldWrapper>
        <HtmlLabel htmlFor="guests" content="Fecha" />
        <RangePicker onChange={handlerDate}/>
      </FieldWrapper>

      {plan !== "0" ? (<FieldWrapper>
        <HtmlLabel htmlFor="guests" content="Dias de acompanmiento adicionales" />
        { plan !== "0" ?
        (<Text content={planadic} style={{fontSize: "12px" , fontWeight: "Bold", marginTop: "4px", padding: "4px" }}/>) : ''}
          <InputNumber min={0} max={10} defaultValue={0} style={{width: '100%'}} onChange={aditionalChange}/>
      </FieldWrapper>) : ''}
      <FieldWrapper>
        <HtmlLabel htmlFor="dates" content="Tipo de viaje" />
        <Select defaultValue="0" bordered={true}
          style={{ width: "100%", backgroundColor: "#f7f7f7 !important", borderColor: "#f7f7f7 !important"}}>
          <Option value="0">Seleccion tipo de viaje</Option>
          <Option value="Negocios">Negocios</Option>
          <Option value="Familiar">Viaje Familiar</Option>
          <Option value="diversion">Viaje diversion</Option>
          <Option value="Otro">Otro</Option>
        </Select>
      </FieldWrapper>
      <FieldWrapper>
      <HtmlLabel htmlFor="guests" content="Total" />
        <b>$ {total} USD</b>
      </FieldWrapper>
      <FieldWrapper>
        <Button type="primary" size="large" block style={{backgroundColor: "#ffcf2a", borderColor: "#ffcf2a"}}  onClick={handlerButton}>
            Contratar Host
          </Button>
      </FieldWrapper>
      <Modal
        centered
        visible={visible}
        footer={null}
        >
           <Result
              key={1}
              status="info"
              title="Contratar Host"
              subTitle={`Plan: ${planName[plan]} - Valor: ${total} USD - Fecha: ${date}.`}
              extra={[
                <form key={2} action="/procesar-pago" method="POST" id="mercadoForm" />,
              ]}
            />
        </Modal>
    </ReservationFormWrapper>

  );
};

export default RenderReservationForm;
