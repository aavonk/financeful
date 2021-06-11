import type { Category } from '@Generated/graphql';

type DefaultCategory = Omit<Category, 'id' | 'user' | 'userId'>;

export type Group = {
  groupName: string;
  categories: DefaultCategory[];
};

type ExpenseGroup = {
  autoAndTransportation: Group;
  billsAndUtilities: Group;
  education: Group;
  entertainment: Group;
  feesAndCharges: Group;
  foodAndDining: Group;
  healthAndFitness: Group;
  home: Group;
  insurance: Group;
  personalCare: Group;
  pets: Group;
  shopping: Group;
  tax: Group;
};

type IncomeGroup = {
  income: Group;
  employerBenefit: Group;
};

type DefaultCategoryStruct = {
  income: IncomeGroup;
  expense: ExpenseGroup;
  getIncomeGroup: () => Group[];
  getExpenseGroup: () => Group[];
};

const defaultExpenseOptions = {
  description: null,
  excludeFromBudget: false,
  isHidden: false,
  isIncome: false,
};

const defaultIncomeOptions = {
  description: null,
  excludeFromBudget: false,
  isHidden: false,
  isIncome: true,
};

const DEFAULT_EXPENSE_CATEGORIES: ExpenseGroup = {
  autoAndTransportation: {
    groupName: 'Auto & Transportation',
    categories: [
      {
        name: 'Auto Payment',
        ...defaultExpenseOptions,
      },
      {
        name: 'Auto & Transportation',
        ...defaultExpenseOptions,
      },
      {
        name: 'Gas & Fuel',
        ...defaultExpenseOptions,
      },
      {
        name: 'Lyft & Uber',
        ...defaultExpenseOptions,
      },
      {
        name: 'Service & Parts',
        ...defaultExpenseOptions,
      },
      {
        name: 'Public Transportation',
        ...defaultExpenseOptions,
      },
    ],
  },
  billsAndUtilities: {
    groupName: 'Bills & Utilities',
    categories: [
      {
        name: 'Cable / Satellite',
        ...defaultExpenseOptions,
      },
      {
        name: 'Bills & Utilities',
        ...defaultExpenseOptions,
      },
      {
        name: 'Electricity',
        ...defaultExpenseOptions,
      },
      {
        name: 'Gas & Water',
        ...defaultExpenseOptions,
      },
      {
        name: 'Internet & Wifi',
        ...defaultExpenseOptions,
      },
      {
        name: 'Rent',
        ...defaultExpenseOptions,
      },
      {
        name: 'Mortgage',
        ...defaultExpenseOptions,
      },
      {
        name: 'Property Tax',
        ...defaultExpenseOptions,
      },
      {
        name: 'Utilities',
        ...defaultExpenseOptions,
      },
    ],
  },
  education: {
    groupName: 'Education',
    categories: [
      {
        name: 'Activity Fees',
        ...defaultExpenseOptions,
      },
      {
        name: 'Education',
        ...defaultExpenseOptions,
      },
      {
        name: 'Tuition',
        ...defaultExpenseOptions,
      },
      {
        name: 'Textbooks',
        ...defaultExpenseOptions,
      },
      {
        name: 'School Supplies',
        ...defaultExpenseOptions,
      },
    ],
  },
  entertainment: {
    groupName: 'Entertainment',
    categories: [
      {
        name: 'Entertainment',
        ...defaultExpenseOptions,
      },
      {
        name: 'Movies',
        ...defaultExpenseOptions,
      },
      {
        name: 'Music & Concerts',
        ...defaultExpenseOptions,
      },
      {
        name: 'Streaming Services',
        ...defaultExpenseOptions,
      },
      {
        name: 'Amusement',
        ...defaultExpenseOptions,
      },
    ],
  },
  feesAndCharges: {
    groupName: 'Feed & Charges',
    categories: [
      {
        name: 'Fees & Charges',
        ...defaultExpenseOptions,
      },
      {
        name: 'ATM Fee',
        ...defaultExpenseOptions,
      },
      {
        name: 'Bank Fee',
        ...defaultExpenseOptions,
      },
      {
        name: 'Late Fee',
        ...defaultExpenseOptions,
      },
    ],
  },
  foodAndDining: {
    groupName: 'Food & Dining',
    categories: [
      {
        name: 'Food & Dining',
        ...defaultExpenseOptions,
      },
      {
        name: 'Drinks',
        ...defaultExpenseOptions,
      },
      {
        name: 'Groceries',
        ...defaultExpenseOptions,
      },
      {
        name: 'Restaurants',
        ...defaultExpenseOptions,
      },
    ],
  },
  healthAndFitness: {
    groupName: 'Health & Fitness',
    categories: [
      {
        name: 'Doctor',
        ...defaultExpenseOptions,
      },
      {
        name: 'Eye Care',
        ...defaultExpenseOptions,
      },
      {
        name: 'Gym',
        ...defaultExpenseOptions,
      },
      {
        name: 'Health & Fitness',
        ...defaultExpenseOptions,
      },
      {
        name: 'Medicine',
        ...defaultExpenseOptions,
      },
      {
        name: 'Prescriptions',
        ...defaultExpenseOptions,
      },
    ],
  },
  home: {
    groupName: 'Home',
    categories: [
      {
        name: 'Furnishings',
        ...defaultExpenseOptions,
      },
      {
        name: 'Home Improvements',
        ...defaultExpenseOptions,
      },
      {
        name: 'Home Supplies',
        ...defaultExpenseOptions,
      },
      {
        name: 'HOA Fees',
        ...defaultExpenseOptions,
      },
    ],
  },
  insurance: {
    groupName: 'Insurance',
    categories: [
      {
        name: 'Car Insurance',
        ...defaultExpenseOptions,
      },
      {
        name: 'Health Insurance',
        ...defaultExpenseOptions,
      },
      {
        name: 'Life Insurance',
        ...defaultExpenseOptions,
      },
      {
        name: 'Long Term Disability Insurance',
        ...defaultExpenseOptions,
      },
    ],
  },
  personalCare: {
    groupName: 'Personal Care',
    categories: [
      {
        name: 'Haircut',
        ...defaultExpenseOptions,
      },
      {
        name: 'Hair Salon',
        ...defaultExpenseOptions,
      },
      {
        name: 'Hygiene Products',
        ...defaultExpenseOptions,
      },
      {
        name: 'Laundry',
        ...defaultExpenseOptions,
      },
      {
        name: 'Spa & Massage',
        ...defaultExpenseOptions,
      },
      {
        name: 'Personal Care',
        ...defaultExpenseOptions,
      },
    ],
  },
  pets: {
    groupName: 'Pets',
    categories: [
      {
        name: 'Pet Food & Supplies',
        ...defaultExpenseOptions,
      },
      {
        name: 'Pet Grooming',
        ...defaultExpenseOptions,
      },
      {
        name: 'Pet Insurance',
        ...defaultExpenseOptions,
      },
      {
        name: 'Pets',
        ...defaultExpenseOptions,
      },
      {
        name: 'Vet',
        ...defaultExpenseOptions,
      },
    ],
  },
  shopping: {
    groupName: 'Shopping',
    categories: [
      {
        name: 'Books',
        ...defaultExpenseOptions,
      },
      {
        name: 'Clothing',
        ...defaultExpenseOptions,
      },
      {
        name: 'Electronics',
        ...defaultExpenseOptions,
      },
      {
        name: 'Electronics & Software',
        ...defaultExpenseOptions,
      },
      {
        name: 'Shopping',
        ...defaultExpenseOptions,
      },
    ],
  },
  tax: {
    groupName: 'Taxes',
    categories: [
      {
        name: 'Medicare',
        ...defaultExpenseOptions,
      },
      {
        name: 'Social Security Tax',
        ...defaultExpenseOptions,
      },
      {
        name: 'State Tax',
        ...defaultExpenseOptions,
      },
      {
        name: 'Federal Tax',
        ...defaultExpenseOptions,
      },
    ],
  },
};

const DEFAULT_INCOME_CATEGORIES: IncomeGroup = {
  employerBenefit: {
    groupName: 'Employer Benefits',
    categories: [
      {
        name: 'Dental Benefit',
        ...defaultIncomeOptions,
      },
      {
        name: 'Medical Benefit',
        ...defaultIncomeOptions,
      },
      {
        name: 'Vision Benefit',
        ...defaultIncomeOptions,
      },
      {
        name: 'Holiday Pay',
        ...defaultIncomeOptions,
      },
      {
        name: 'Sick Pay',
        ...defaultIncomeOptions,
      },
      {
        name: 'Vacation Pay',
        ...defaultIncomeOptions,
      },
      {
        name: '401 Employer Contribution',
        ...defaultIncomeOptions,
      },
    ],
  },
  income: {
    groupName: 'Personal Income',
    categories: [
      {
        name: 'Freelance Income',
        ...defaultIncomeOptions,
      },
      {
        name: 'Gifts Income',
        ...defaultIncomeOptions,
      },

      {
        name: 'Investment Income',
        ...defaultIncomeOptions,
      },
      {
        name: 'Salary',
        ...defaultIncomeOptions,
      },
      {
        name: 'Net Salary',
        ...defaultIncomeOptions,
      },
      {
        name: 'Reimbursement Income',
        ...defaultIncomeOptions,
      },
    ],
  },
};

export const DEFAULT_CATEGORIES: DefaultCategoryStruct = {
  income: DEFAULT_INCOME_CATEGORIES,
  expense: DEFAULT_EXPENSE_CATEGORIES,
  getIncomeGroup: () => {
    const data = DEFAULT_INCOME_CATEGORIES;
    //@ts-ignore
    return Object.keys(data).map((key) => data[key]);
  },
  getExpenseGroup: () => {
    const data = DEFAULT_EXPENSE_CATEGORIES;

    //@ts-ignore
    return Object.keys(data).map((key) => data[key]);
  },
};
