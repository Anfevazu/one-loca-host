import React, { useState } from 'react';
import { Button, Input, Tag} from 'antd';
import HtmlLabel from 'components/UI/HtmlLabel/HtmlLabel';
import DatePickerRange from 'components/UI/DatePicker/ReactDates';
import ViewWithPopup from 'components/UI/ViewWithPopup/ViewWithPopup';
import InputIncDec from 'components/UI/InputIncDec/InputIncDec';
import ReservationFormWrapper, {
  FormActionArea,
  FieldWrapper,
  RoomGuestWrapper,
  ItemWrapper,
} from './Reservation.style.js';

const RenderReservationForm = ({email, country_code, phone}) => {
  return (
    <ReservationFormWrapper className="form-container">
      <FieldWrapper>
        <HtmlLabel htmlFor="dates" content="Correo" />
        <Tag color="green">{email}</Tag>
      </FieldWrapper>
      <FieldWrapper>
        <HtmlLabel htmlFor="guests" content="Telefono" />
        <Tag color="green">{country_code+' '+phone}</Tag>
      </FieldWrapper>
    </ReservationFormWrapper>
  );
};

export default RenderReservationForm;
