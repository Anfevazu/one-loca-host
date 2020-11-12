import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Row, Col, Button } from 'antd';
import { InstagramOutlined, TwitterOutlined, FacebookFilled, GoogleOutlined} from '@ant-design/icons';
import { AuthContext } from 'context/AuthProvider';

const SocialLogin = () => {
  const { signUp, loggedIn } = useContext(AuthContext);
  const [state, setState] = useState({
    facebook: false,
    instagram: false,
    twitter: false,
    google: false,
  });
  const handleSocialAuth = (key) => {
    setState({
      ...state,
      [key]: true,
    });
    setTimeout(() => {
      setState({
        ...state,
        [key]: false,
      });
      signUp({});
    }, 600);
  };
  if (loggedIn) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Button
            loading={state.facebook}
            className="facebook-btn"
            type="primary"
            style={{ width: '100%', marginBottom: 16 }}
            size="large"
            onClick={() => handleSocialAuth('facebook')}
            icon={<FacebookFilled />}>
            Facebook
          </Button>
        </Col>
        <Col span={12}>
          <Button
            loading={state.instagram}
            className="insta-btn"
            type="primary"
            style={{ width: '100%', marginBottom: 16 }}
            size="large"
            onClick={() => handleSocialAuth('instagram')}
            icon={<InstagramOutlined />}
          >
            Instagram
          </Button>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginBottom: '37px' }}>
        <Col span={12}>
          <Button
            loading={state.twitter}
            className="twitter-btn"
            type="primary"
            style={{ width: '100%', marginBottom: 16 }}
            size="large"
            onClick={() => handleSocialAuth('twitter')}
            icon={<TwitterOutlined />}>
            Twitter
          </Button>
        </Col>
        <Col span={12}>
          <Button
            loading={state.google}
            className="google-btn"
            type="primary"
            style={{ width: '100%', marginBottom: 16 }}
            size="large"
            onClick={() => handleSocialAuth('google')}
            icon={<GoogleOutlined />}
          >
            Google
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default SocialLogin;
