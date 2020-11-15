import React from 'react';
import PriceCard from 'components/PriceCard/PriceCard';
import { height } from 'styled-system';
export default function PricingItems({ plans }) {
  return plans.map((plan) => (
    <PriceCard
      className="price_card"
      data={plan}
      key={plan.title}
      buttonText={'Seleccionar Plan'}
    />
  ));
}
