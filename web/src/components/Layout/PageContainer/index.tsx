import { StyledContainer } from './style';

type Props = {
  children: React.ReactNode;
  isSidebarOpen: boolean;
};

function PageContainer({ children, isSidebarOpen }: Props) {
  return <StyledContainer $open={isSidebarOpen}>{children}</StyledContainer>;
}

export default PageContainer;
