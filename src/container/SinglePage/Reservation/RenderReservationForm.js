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

const RenderReservationForm = ({hostName, hostId, country, city, cellphone, country_code}) => {
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
      city: city,
      hostPhone: cellphone,
      hostCountryCode: country_code
    }
    localStorage.setItem("order", JSON.stringify(order))

    if(loggedIn){
      history.push(CHECKOUT);
    }else{
      history.push(LOGIN_PAGE);
    }
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
            <Option value="Negocios ( solo )">
              <Tooltip title="Negocios ( solo )" placement="right">
                Negocios ( solo )
              </Tooltip>
            </Option>

          <Option value="Negocios (con compañeros de trabajo)">
              <Tooltip title="Negocios (con compañeros de trabajo)" placement="right">
                Negocios (con compañeros de trabajo)
              </Tooltip>
          </Option>
          <Option value="negocios (acompañado de la familia)">
              <Tooltip title="negocios (acompañado de la familia)" placement="right">
                negocios (acompañado de la familia)
              </Tooltip>
          </Option>
          <Option value=" Vacaciones (solo)">
              <Tooltip title=" Vacaciones (solo)" placement="right">
                 Vacaciones (solo)
              </Tooltip>
          </Option>
          <Option value="Vacaciones (en pareja)">
              <Tooltip title="Vacaciones (en pareja)" placement="right">
                Vacaciones (en pareja)
              </Tooltip>
          </Option>
          <Option value="Vacaciones (con amigos)">
              <Tooltip title="Vacaciones (con amigos)" placement="right">
                Vacaciones (con amigos)
              </Tooltip>
          </Option>
          <Option value="Vacaciones (con familia)">
              <Tooltip title="Vacaciones (con familia)" placement="right">
                Vacaciones (con familia)
              </Tooltip>
          </Option>
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
    </ReservationFormWrapper>

  );
};

export default RenderReservationForm;
