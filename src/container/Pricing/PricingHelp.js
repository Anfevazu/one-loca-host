import React from 'react';
import { Row, Col, Collapse } from 'antd';

const { Panel } = Collapse;
const text = (
  <p style={{ paddingLeft: 24 }}>
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
    as a welcome guest in many households across the world.
  </p>
);
export default function PricingHelp() {
  return <>
  <Row>
      <Col span={12}>
      <Collapse bordered={false} >
        <Panel header="¿Qué es One Local Host?" key="1" style={{'font-weight':'bold','font-size': '16px'}}>
          {text}
        </Panel>
        <Panel header="¿Cómo saber si un host es recomendable?" key="2" style={{'font-weight':'bold','font-size': '16px'}}>
          {text}
        </Panel>
        <Panel header="¿Qué hago si mi host no me contesta?" key="3" style={{'font-weight':'bold','font-size': '16px'}}>
          {text}
        </Panel>
      </Collapse>
      </Col>
      <Col span={12}>
        <Collapse bordered={false} >
          <Panel header="¿Debo pagar algo extra al host?" key="1" style={{'font-weight':'bold','font-size': '16px'}}>
            {text}
          </Panel>
          <Panel header="¿A donde llamo si tengo un problema con mi host?" key="2" style={{'font-weight':'bold','font-size': '16px'}}>
            {text}
          </Panel>
          <Panel header="¿Qué debo hacer si mi pago no se ve reflejado?" key="3" style={{'font-weight':'bold','font-size': '16px'}}>
            {text}
          </Panel>
        </Collapse>
      </Col>
    </Row>
  </>
}
