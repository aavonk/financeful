import { Card, BankName, Chip, Data } from './style';
import Skeleton from '@Common/Skeleton';
function CardLoader() {
  return (
    <Card>
      <BankName>
        <span />
        <p>
          <Skeleton height="26px" width="190px" />
        </p>
      </BankName>
      <Chip>
        <div className="side left" />
        <div className="side right" />
        <div className="vertical top" />
        <div className="vertical bottom" />
      </Chip>
      <Data>
        <div className="pan">
          <Skeleton height="32px" width="80%" />
        </div>
        <div className="details">
          <div className="label">
            <Skeleton height="10px" width="26.6%" />
          </div>
          <div className="date" style={{ marginTop: '5px' }}>
            <Skeleton height="14px" width="28.6%" />
          </div>
        </div>
      </Data>
    </Card>
  );
}

export default CardLoader;
