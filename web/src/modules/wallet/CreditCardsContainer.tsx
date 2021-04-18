import CreditCard from '@Components/CreditCard';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import { CardGridItem } from './CreditCardList/style';
function CreditCardsContainer() {
  const arr = new Array(4).fill(undefined).map((val, idx) => idx);

  return (
    <>
      <AnimateSharedLayout>
        {arr.map((item, index) => (
          <CardGridItem
            key={item}
            style={
              index === 0
                ? undefined
                : { marginLeft: `${200 * index}px`, zIndex: 4 + index }
            }
          >
            <CreditCard layoutId={item.toString()} />
          </CardGridItem>
        ))}
        <AnimatePresence></AnimatePresence>
      </AnimateSharedLayout>
    </>
  );
}

export default CreditCardsContainer;
