import Dropdown from '@Common/Dropdown';
type Props = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  setOpen: (_: boolean) => void;
};

function NotificationsMenu({ open, setOpen }: Props) {
  return (
    <>
      <Dropdown open={open} setOpen={setOpen} className="notification-menu">
        <li>Hiu</li>
        <li>Hiu</li>
        <li>Hiu</li>
      </Dropdown>
    </>
  );
}

export default NotificationsMenu;
