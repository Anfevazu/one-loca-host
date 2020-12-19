import React, {Fragment, useEffect, useState, useContext} from 'react';
import { Link } from 'react-router-dom';
import { SettingOutlined } from '@ant-design/icons';
import citiesPhotos from './Cities';
import { List, Card, Tooltip } from 'antd';
import {firestore} from '../../../firebaseConfig';
import { AuthContext } from 'context/AuthProvider';
import Loader from 'components/Loader/Loader';
import moment from 'moment';
import 'moment/locale/es'  // without this line it didn't work
import { isArray } from 'lodash';

moment.locale('es')
const { Meta } = Card;

const HistoryTripsList = ({history}) => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(user.id){
      let tmpData =[];
      firestore.collection("contract_houst")
      .where("user" , "==", user.id)
      .where("tripStatus", "==", "INACTIVE").get()
      .then(snap =>{
        snap.forEach(function(doc) {
          tmpData.push(doc.data())
      });
      setData(tmpData)
      setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
    }

  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  const getDate = (date) => {
    if(isArray(date)){
      let newDate1 = new Date(date[0])
      let momentDate1 = moment(newDate1).format('ll');
      let newDate2 = new Date(date[1])
      let momentDate2 = moment(newDate2).format('ll');
      return `${momentDate1} - ${momentDate2}`
    }else{
      let newDate = new Date(date)
      let momentDate = moment(newDate).format('ll');
      return momentDate
    }
  }

  return (
   <Fragment>
    {!loading ? (<List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 2,
        md: 4,
        lg: 4,
        xl: 3,
        xxl: 5,
      }}
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <Card
            hoverable={true}
            style={{ width: 300 }}
            cover={
              <img
                alt="example"
                src={citiesPhotos[item.order.city]}
                style={{maxHeight: '400px'}}
              />
            }
            actions={[
              <Tooltip title="Abrir Viaje" placement="top">
                <Link to="/mytrips" style={{fontSize: '1.2rem'}}>
                  <SettingOutlined key="setting" />
                </Link>
              </Tooltip>
            ]}>
            <Meta title={`${item.order.city}, ${item.order.country}`} description={getDate(item.order.date)} />
            <span style={{color: '#aeaeae'}}>Anfitrion :</span> {item.order.hostName}
          </Card>
        </List.Item>
      )}
    />) : <Loader/>}
   </Fragment>
  );
};

export default HistoryTripsList;
