import React, {Fragment, useEffect, useContext, useState}from 'react';
import {codes} from '../../../settings/CountryCodes';
import { Row, Col,  Avatar, Tooltip, notification } from 'antd';
import Container from 'components/UI/Container/Container.style';
import AccountSettingWrapper, {
  AccountSidebar,
  AgentAvatar,
  ContentWrapper,
  AgentName,
} from './AccountSettings.style';
import AuthProvider from 'context/AuthProvider';
import { useForm, Controller } from 'react-hook-form';
import { Input, Select, Button } from 'antd';
import FormControl from 'components/UI/FormControl/FormControl';
import { FormTitle } from './AccountSettings.style';
import { AuthContext } from 'context/AuthProvider';
import { firestore } from '../../../firebaseConfig';

const { Option } = Select;

const options = [];
codes.forEach((code, index) => {
  options.push(
  <Option key={index} value={code.dial_code}>
    <Tooltip title={code.name} placement="right">
    {code.dial_code} - {code.name}
    </Tooltip>
  </Option>);
});


const  AgentAccountSettingsPage = () => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(user)

  useEffect(() => {
    setUserData(user)
  }, [user]);

  return (
    <AuthProvider>
    <AccountSettingWrapper>
      <Container fullWidth={true}>
        <Row gutter={30}>
          <Col md={9} lg={6}>
            <AccountSidebar>
              <AgentAvatar>
                <Avatar
                  src={userData.picture}
                  alt="avatar"/>
                <ContentWrapper>
                  <AgentName>{userData.name} {userData.last_name}</AgentName>
                </ContentWrapper>
              </AgentAvatar>
            </AccountSidebar>
          </Col>
          <Col md={15} lg={18}>
           <FormProfile/>
          </Col>
        </Row>
      </Container>
    </AccountSettingWrapper>
    </AuthProvider>
  );
}

const FormProfile =  () => {
  const { control, errors, handleSubmit } = useForm();
  const user  = JSON.parse(localStorage.getItem("user"));
  const [userData ] = useState(user)
  const onSubmit = (data) => {
    data.id = user.id;
    data.picture = user.picture;
    firestore.collection("guest").doc(userData.id).set(data)
    localStorage.setItem("user", JSON.stringify(data))
    notification.open({
      message: 'Perfil Actualizado',
      description:
        'Se han actualizado tus datos de perfil',
      onClick: () => {
        console.log('Notification Clicked!');
      },
      placement: 'bottomRight'
    });
    setTimeout(function(){ window.location.reload(); }, 1000);

  };
  return (
    <Fragment>
      <FormTitle>Datos Personales</FormTitle>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <Row gutter={30}>
          <Col lg={12}>
            <FormControl
              label="Nombres"
              htmlFor="name"
              error={errors.name && <span>Este campo es requerido !</span>}>
              <Controller
                as={<Input />}
                id="name"
                name="name"
                defaultValue={userData.name}
                control={control}
                rules={{ required: true }}
              />
            </FormControl>
          </Col>
          <Col lg={12}>
            <FormControl
              label="Apellidos"
              htmlFor="last_name"
              error={errors.last_name && <span>Este campo es requerido !</span>}
            >
              <Controller
                as={<Input />}
                id="last_name"
                name="last_name"
                defaultValue={userData.last_name}
                control={control}
                rules={{ required: true }}
              />
            </FormControl>
          </Col>
        </Row>
        <Row gutter={30}>
          <Col lg={12}>
          <FormControl
              label="Correo electronico"
              htmlFor="email"
              error={
                errors.email && (
                  <>
                    {errors.email?.type === 'required' && (
                      <span>Este campo es requerido !</span>
                    )}
                    {errors.email?.type === 'pattern' && (
                      <span>Ingrese un email valido!</span>
                    )}
                  </>
                )
              }
            >
              <Controller
                as={<Input disabled={true}/>}
                type="email"
                id="email"
                name="email"
                defaultValue={userData.email}
                control={control}
                // rules={{
                //   required: true,
                //   pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                // }}
              />
            </FormControl>
          </Col>
          <Col lg={12}>
            <Row gutter={30}>
              <Col md={12}>
                <FormControl
                  label="Codigo de Pais"
                  htmlFor="country_code"
                  error={
                    errors.country_code && <span>Este campo es requerido !</span>
                  }
                >
                  <Controller
                    as={<Select>{options}</Select>}
                    id="country_code"
                    name="country_code"
                    defaultValue={userData.country_code || "+57"}
                    control={control}
                    rules={{ required: true }}
                  />
                </FormControl>
              </Col>
              <Col md={12}>
              <FormControl
              label="Numero telefonico"
              htmlFor="phone_number"
              error={
                errors.phone_number && (
                  <>
                    {errors.phone_number?.type === 'required' && (
                      <span>Este campo es requerido !</span>
                    )}
                    {errors.phone_number?.type === 'pattern' && (
                      <span>Por favor ingrese un numero telefonico valido</span>
                    )}
                  </>
                )
              }
            >
              <Controller
                as={<Input />}
                id="phone_number"
                name="phone_number"
                placeholder="300000000"
                defaultValue={userData.phone_number || ""}
                control={control}
                rules={{
                  required: true,
                  pattern: /^[0-9]*$/,
                }}
              />
            </FormControl>
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="submit-container" style={{display: 'flex', flexDirection: 'row-reverse'}}>
          <Button htmlType="submit" type="primary" size="large"
          style={{background: "#ffcf2a", borderColor: "#ffcf2a", borderRadius: '10px'}}>
            Guardar
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default AgentAccountSettingsPage;
