import React, { useState } from 'react';
import PricingItems from './PricingItems';
import PricingWrapper, {
  PricingHeader,
  Title,
  Description,
  Steps,
  PricingTableArea
} from './Pricing.style';
import PricingHelp from './PricingHelp'
import Footer from '../Layout/Footer/Footer'
// demo data
import { monthlyPlans, annuallyPlans } from './Pricing.data';

const Pricing = () => {
  const [currentPlan, setCurrentPlan] = useState('monthly');
  let plans = [];
  if (currentPlan === 'monthly') {
    plans = monthlyPlans;
  }
  if (currentPlan === 'annually') {
    plans = annuallyPlans;
  }

  return (
    <div>
        <PricingWrapper>
      <PricingHeader/>
      <Title>Selecciona el mejor plan para tu viaje</Title>
        <Description>
        Precios simples y transparentes para todos
        </Description>
      <PricingTableArea>
        <PricingItems plans={plans} />
      </PricingTableArea>
      <Steps>
      <Title>Planea tu viaje en 4 pasos</Title>
      <div style={{'display': 'flex', 'justify-content': 'space-around'}}>
        <div>
        <Title>1</Title>
        <Title>Busca tu destino</Title>
        </div>
        <div>
        <Title>2</Title>
        <Title>Selecciona tu Host </Title>
        </div>
        <div>
        <Title>3</Title>
        <Title>Elige el plan que quieres</Title>
        </div>
        <div>
        <Title>4</Title>
        <Title>Contacta a tu host y vive las mejores experiencias</Title>
        </div>
      </div>
      </Steps>
      <Description style={{'margin-top': '35px', 'font-size':'20px'}}>
        ¿Tienes preguntas?
      </Description>
      <Title>Nosotros podemos ayudar</Title>
      <PricingHelp/>
    </PricingWrapper>
    </div>


  );
};

export default Pricing;
