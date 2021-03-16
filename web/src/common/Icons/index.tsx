import * as React from 'react';
import {
  BsCalendar,
  BsChevronDown,
  BsChevronLeft,
  BsNewspaper,
  BsColumns,
  BsGear,
  BsWallet,
  BsPlusCircle,
  BsCreditCard,
  BsSearch,
} from 'react-icons/bs';
import { BiMenuAltLeft } from 'react-icons/bi';
import { FaRegBell } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { MdSchedule } from 'react-icons/md';

export const DashboardIcon = ({ ...props }) => {
  return <BsColumns {...props} />;
};

export const SettingsIcon = ({ ...props }) => {
  return <BsGear {...props} />;
};

export const CalendarIcon = ({ ...props }) => {
  return <BsCalendar {...props} />;
};

export const ChevronDownIcon = ({ ...props }) => {
  return <BsChevronDown {...props} />;
};

export const ChevronLeftIcon = ({ ...props }) => {
  return <BsChevronLeft {...props} />;
};

export const NotificationsIcon = ({ ...props }) => {
  return <FaRegBell {...props} />;
};

export const ScheduleIcon = ({ ...props }) => {
  return <MdSchedule {...props} />;
};

export const BillsIcon = ({ ...props }) => {
  return <BsNewspaper {...props} />;
};

export const WalletIcon = ({ ...props }) => {
  return <BsWallet {...props} />;
};

export const LogoutIcon = ({ ...props }) => {
  return <FiLogOut {...props} />;
};

export const MenuIcon = ({ ...props }) => {
  return <BiMenuAltLeft {...props} />;
};

export const PlusIcon = ({ ...props }) => {
  return <BsPlusCircle {...props} />;
};

export const CreditCardIcon = ({ ...props }) => {
  return <BsCreditCard {...props} />;
};

export const SearchIcon = ({ ...props }) => {
  return <BsSearch {...props} />;
};
