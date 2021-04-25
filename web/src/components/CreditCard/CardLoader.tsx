import { Card, BankName, Chip, Data, AmountBar } from './style';
import Skeleton from '@Common/Skeleton';
function CardLoader() {
  return (
    <Card>
      <BankName>
        <span className="empty" />
        <div className="names">
          <p>
            <Skeleton height="26px" width="190px" />
          </p>
          <span />
        </div>
      </BankName>
      <AmountBar>
        <Chip>
          <div className="side left" />
          <div className="side right" />
          <div className="vertical top" />
          <div className="vertical bottom" />
        </Chip>
      </AmountBar>
      <Data>
        <div className="pan" style={{ marginTop: '18px' }}>
          <Skeleton height="32px" width="80%" />
        </div>
        <div className="details">
          <div className="label">
            <Skeleton height="10px" width="26.6%" />
          </div>
        </div>
      </Data>
    </Card>
  );
}

export default CardLoader;
