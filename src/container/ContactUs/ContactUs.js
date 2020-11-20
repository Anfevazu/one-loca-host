import React from 'react';
import PageWrapper from './ContatcUs.style';
import Container from 'components/UI/Container/Container';
import { useForm, Controller } from 'react-hook-form';
import { Input, Button, notification } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import Heading from 'components/UI/Heading/Heading';

const { TextArea } = Input;

const ContactUs = () => {
  const { control, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
   console.log(data)
   notification["success"]({
    message: 'Mensaje Enviado',
    description:
      'Hemos recibo tu mensaje, pronto te contactaremos.',
    placement: 'bottomRight'
  });
  };

  return (
    <PageWrapper>
      <Container>
      <Heading as="h2" content="Contáctanos" />
      <Heading as="h3" content="Si tienes algúna duda o comentario escríbenos" />

    <form onSubmit={handleSubmit(onSubmit)} id="contact-form" >
      <FormControl
        label="Nombre y apellido"
        htmlFor="text"
        error={
          errors.name && (
            <>
              {errors.name?.type === 'required' && (
                <span>Este campo es requerido</span>
              )}
            </>
          )
        }
      >
        <Controller
          as={<Input />}
          placeholder="Juan Perez"
          type="text"
          id="name"
          name="name"
          defaultValue=""
          control={control}
          rules={{
            required: true
          }}
        />
      </FormControl>
      <FormControl
        label="Correo electrónico"
        htmlFor="email"
        error={
          errors.email && (
            <>
              {errors.email?.type === 'required' && (
                <span>Este campo es requerido!</span>
              )}
              {errors.email?.type === 'pattern' && (
                <span>Por favor ingrese un Correo electrónico valido!</span>
              )}
            </>
          )
        }
      >
        <Controller
          as={<Input />}
          placeholder="micorreo@correo.com"
          type="email"
          id="email"
          name="email"
          defaultValue=""
          control={control}
          rules={{
            required: true,
            pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          }}
        />
      </FormControl>
      <FormControl
        label="Teléfono de contacto"
        htmlFor="text"
        error={
          errors.name && (
            <>
              {errors.phone?.type === 'required' && (
                <span>Este campo es requerido</span>
              )}
            </>
          )
        }
      >
        <Controller
          as={<Input />}
          placeholder="+57 300000000"
          type="text"
          id="phone"
          name="phone"
          defaultValue=""
          control={control}
          rules={{
            required: true
          }}
        />
      </FormControl>
      <FormControl
        label="Mensaje"
        htmlFor="text"
        error={
          errors.name && (
            <>
              {errors.phone?.type === 'required' && (
                <span>Este campo es requerido</span>
              )}
            </>
          )
        }
      >
        <Controller
          as={<TextArea rows={4}/>}
          type="text"
          id="mensaje"
          name="mensaje"
          defaultValue=""
          control={control}
          rules={{
            required: true
          }}
        />
      </FormControl>
      <FormControl>
        <Button type="primary" htmlType="submit" size="large">
          Enviar
        </Button>
      </FormControl>
    </form>
      </Container>
    </PageWrapper>
  );
}


export default ContactUs;
