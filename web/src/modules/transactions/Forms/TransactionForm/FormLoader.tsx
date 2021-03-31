import Skeleton from '@Common/Skeleton';
import { Row, Col } from '@Globals/index';
import { Body } from '../style';

function FormLoader() {
  return (
    <>
      <Body aria-disabled="true" aria-label="Loading">
        <Row>
          <Col width="25%">
            <Skeleton height="50px" width="100%" />
          </Col>
          <Col width="37.5%">
            <Skeleton height="50px" width="100%" />
          </Col>
          <Col width="37.5%">
            <Skeleton height="50px" width="100%" />
          </Col>
        </Row>
        <Row>
          <Col width="100%">
            <Skeleton height="50px" width="100%" />
          </Col>
        </Row>
        <Row>
          <Col width="100%">
            <Skeleton height="50px" width="100%" />
          </Col>
        </Row>
        <Row>
          <Col width="50%">
            <Skeleton height="50px" width="100%" />
          </Col>
          <Col width="50%">
            <Skeleton height="50px" width="100%" />
          </Col>
        </Row>
      </Body>
    </>
  );
}

export default FormLoader;
