import React,{ useState, useContext  }from 'react';
import { useHistory } from 'react-router-dom';
import {Button, Select, DatePicker, notification, Tooltip} from 'antd';
import HtmlLabel from 'components/UI/HtmlLabel/HtmlLabel';
import ReservationFormWrapper, {
  FieldWrapper
} from './Reservation.style.js';
import { isArray } from 'lodash';
import { AuthContext } from '../../../context/AuthProvider';
import {
  LOGIN_PAGE,
  CHECKOUT
} from '../../../settings/constant';

const { Option } = Select;
const { RangePicker } = DatePicker;

const plans = [
 {
    id: 1,
    name: "Contrata una mision - 10 USD",
    price: 10,
    description: "Contrata una misión   para tu host , que pueden ir desde conseguir un alojamiento y verificarlo, comprar entradas para un museo o un lugar especial sin filas y sin comisiones."
  },
  { id: 2,
    name: "Contrata por dias - 25 USD/DIA",
    price: 25,
    description: "Contrata 5 acciones para tus host"
  },
  {
    id: 3,
    name: "Programa todo tu viaje - 150 USD",
    price: 150,
    description: "Sin Limite de acciones para programar tu viaje 5 días cubiertos de soporte durante tu viaje."
  },
]

const options = [];
plans.forEach((plan, index) => {
  options.push(
  <Option key={index} value={plan.id}>
    <Tooltip title={plan.description} placement="right">
    {plan.name}
    </Tooltip>
  </Option>);
});

const RenderReservationForm = ({hostName, hostId, country, city}) => {
  let history = useHistory();
  const { loggedIn } = useContext(AuthContext);
  let buyObject = []
  const [plan, setPlan] = useState([]);
  const [date, setDate] = useState(null);
  const [total, setTotal] = useState(0);
  const [typeTravel, setTypeTravel] = useState("");
  const [showDate, setShowDate] = useState(false);
  const [showSimpleDate, setshowSimpleDate] = useState(false);
  const [daysAditional, setDaysAditional] = useState(0);

  function calculaTotal(plans=plan, days=daysAditional){
    setTotal(0)
    plans.forEach(pn=> {
      if(pn.id === 1 || pn.id === 3){
        setTotal(prevState => {
          return prevState + pn.price
        })
      }
      if(pn.id === 2){
        setTotal(prevState => prevState + (pn.price*days))
      }
    })
  }
  const handlerSelect = (values) => {
    buyObject = []
    plans.forEach((pn)=> {
      if(values.includes(pn.id)){
        buyObject.push(pn)
      }
    });

    if(buyObject.length === 1 && buyObject[0].id === 1){
      setshowSimpleDate(true)
    }else{
      setshowSimpleDate(false)
      setShowDate(true)
    }
    if(buyObject.length >= 1 && ((buyObject[0] && (buyObject[0].id === 2 || buyObject[0].id === 3)) || (buyObject[1] && (buyObject[1].id === 2 || buyObject[1].id === 3)) || (buyObject[2] && (buyObject[2].id === 2 || buyObject[2].id === 3)))){
      setShowDate(true)
    }else{
      setShowDate(false)
    }
    setDaysAditional(0)
    setDate(null)
    setPlan(buyObject)
    calculaTotal(buyObject, daysAditional)
  }
  const handlerDate = (value, dateStrings) => {
    let days = 0
    if(isArray(value) && value[0] !== "" & value[1] !== ""){
      days = value[1].diff(value[0], 'days')+1
      setDaysAditional(days)
      setDate(value)
    }
    if(!isArray(value)){
      setDate(value)
    }
    calculaTotal(plan,days)
  }

  const handlerButton = () => {
    if(plan.length === 0 || date === null){
      notification['warning']({
        message: 'Campos incompletos',
        description:
          'Por favor selecciona un plan y las fechas para contratar tu Host',
        placement: 'bottomRight'
      });
      return;
    }else{
      getPaymentForm()
    }
  }

  const changeTypeTravel = (value) => {
    setTypeTravel(value)
  }
  const getPaymentForm = () => {
    let order = {
      plans: plan,
      total: total,
      date: date,
      daysAditional: daysAditional,
      typeTravel: typeTravel,
      hostId: hostId,
      hostName: hostName,
      country: country,
      city: city
    }
    localStorage.setItem("order", JSON.stringify(order))

    if(loggedIn){
      history.push(CHECKOUT);
    }else{
      history.push(LOGIN_PAGE);
    }
    // let items = [{
    //     reference_code: planName[plan],
    //     unit_price: total,
    //     quantity: 1,
    //     description: planDesc[plan],
    //     currency_id: "USD"
    //   }]

    // let headers = {
    //   'Content-Type' : 'application/json',
    //   'cache-control' : 'no-cache'
    // }

    // axios.post(api_url, {items, total_amount: total}, {headers : headers})
    // .then(response =>{
    //   setVisible(true)
    //   const script = document.createElement('script');
    //   console.log(script)
    //   script.src = 'https://www.mercadopago.com.co/integrations/v1/web-payment-checkout.js';
    //   script.async = true;
    //   script.setAttribute('data-preference-id', response.data.id);
    //   document.getElementById('mercadoForm').appendChild(script);
    // })
    // .catch(error =>{
    //   const {response} = error
    //   console.log(error)
    // })
  }

  return (
    <ReservationFormWrapper className="form-container">
      <FieldWrapper>
        <HtmlLabel htmlFor="dates" content="Plan" />
        <Select bordered={true}
          style={{ width: "100%", backgroundColor: "#f7f7f7 !important", borderColor: "#f7f7f7 !important"}}
          onChange={handlerSelect}
          placeholder="Selecciona tipo de plan"
          mode="multiple">
            {options}
        </Select>
      </FieldWrapper>

      {showSimpleDate ? (<FieldWrapper>
        <HtmlLabel htmlFor="guests" content="Selecciona la Fecha" />
          <DatePicker
            onChange={handlerDate}
            placeholder="Fecha de la mision"
            style={{width: "100%"}}
            format='MM/DD/YY'
          />
      </FieldWrapper>) : ('')}

      {showDate ? (<FieldWrapper>
        <HtmlLabel htmlFor="guests" content="Selecciona la Fecha" />
          <RangePicker
            onChange={handlerDate}
            style={{width: "100%"}}
            format='MM/DD/YY'
          />
      </FieldWrapper>) : ('')}

      <FieldWrapper>
        <HtmlLabel htmlFor="dates" content="Tipo de viaje" />
        <Select bordered={true}
          style={{ width: "100%", backgroundColor: "#f7f7f7 !important", borderColor: "#f7f7f7 !important"}}
          onChange={changeTypeTravel}
          placeholder="Seleccione tipo de viaje"
          >
          <Option value="Negocios">Negocios</Option>
          <Option value="Viaje Familiar">Viaje Familiar</Option>
          <Option value="Viaje diversion">Viaje diversion</Option>
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

      {/* <Modal
        centered
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
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
        </Modal> */}
    </ReservationFormWrapper>

  );
};

export default RenderReservationForm;
