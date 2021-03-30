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
  BsArrowUpShort,
  BsArrowDownShort,
  BsThreeDotsVertical,
} from 'react-icons/bs';
import { BiMenuAltLeft } from 'react-icons/bi';
import { FaRegBell } from 'react-icons/fa';
import {
  FiLogOut,
  FiArrowUpCircle,
  FiArrowDownCircle,
  FiCheckCircle,
} from 'react-icons/fi';
import {
  MdSchedule,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdClose,
  MdErrorOutline,
  MdInfoOutline,
} from 'react-icons/md';

export const VerticalMenuIcon = ({ ...props }) => {
  return <BsThreeDotsVertical {...props} aria-hidden="true" />;
};

export const InfoIcon = ({ ...props }) => {
  return <MdInfoOutline {...props} aria-hidden="true" />;
};

export const ErrorIcon = ({ ...props }) => {
  return <MdErrorOutline {...props} aria-hidden="true" />;
};

export const CheckCircleIcon = ({ ...props }) => {
  return <FiCheckCircle {...props} aria-hidden="true" />;
};

export const CloseIcon = ({ ...props }) => {
  return <MdClose {...props} aria-hidden="true" />;
};

export const UpArrowCircle = ({ ...props }) => {
  return <FiArrowUpCircle {...props} aria-hidden="true" />;
};
export const DownArrowCircle = ({ ...props }) => {
  return <FiArrowDownCircle {...props} aria-hidden="true" />;
};
export const UpArrow = ({ ...props }) => {
  return <BsArrowUpShort {...props} aria-hidden="true" />;
};

export const DownArrow = ({ ...props }) => {
  return <BsArrowDownShort {...props} aria-hidden="true" />;
};

export const CheckOutline = ({ ...props }) => {
  return <MdCheckBoxOutlineBlank {...props} aria-hidden="true" />;
};

export const CheckFilled = ({ ...props }) => {
  return <MdCheckBox {...props} aria-hidden="true" />;
};
export const DashboardIcon = ({ ...props }) => {
  return <BsColumns {...props} aria-hidden="true" />;
};

export const SettingsIcon = ({ ...props }) => {
  return <BsGear {...props} aria-hidden="true" />;
};

export const CalendarIcon = ({ ...props }) => {
  return <BsCalendar {...props} aria-hidden="true" />;
};

export const ChevronDownIcon = ({ ...props }) => {
  return <BsChevronDown {...props} aria-hidden="true" />;
};

export const ChevronLeftIcon = ({ ...props }) => {
  return <BsChevronLeft {...props} aria-hidden="true" />;
};

export const NotificationsIcon = ({ ...props }) => {
  return <FaRegBell {...props} aria-hidden="true" />;
};

export const ScheduleIcon = ({ ...props }) => {
  return <MdSchedule {...props} aria-hidden="true" />;
};

export const BillsIcon = ({ ...props }) => {
  return <BsNewspaper {...props} aria-hidden="true" />;
};

export const WalletIcon = ({ ...props }) => {
  return <BsWallet {...props} aria-hidden="true" />;
};

export const LogoutIcon = ({ ...props }) => {
  return <FiLogOut {...props} aria-hidden="true" />;
};

export const MenuIcon = ({ ...props }) => {
  return <BiMenuAltLeft {...props} aria-hidden="true" />;
};

export const PlusIcon = ({ ...props }) => {
  return <BsPlusCircle {...props} aria-hidden="true" />;
};

export const CreditCardIcon = ({ ...props }) => {
  return <BsCreditCard {...props} aria-hidden="true" />;
};

export const SearchIcon = ({ ...props }) => {
  return <BsSearch {...props} aria-hidden="true" />;
};
