import { StyledContainer } from './style';

type Props = {
  children: React.ReactNode;
  drawerOpen: boolean;
};

function PageContainer({ children, drawerOpen }: Props) {
  return <StyledContainer $open={drawerOpen}>{children}</StyledContainer>;
}

export default PageContainer;
