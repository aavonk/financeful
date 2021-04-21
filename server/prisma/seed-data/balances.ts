
type Balance = {
  amount: number;
  date: Date | string;
}

 const getDaysInMonth = (month: number, year: number): Date[] => {
  const date = new Date(year, month, 1);
  const days = [];

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

const  randomNumber = (min: number, max: number): number =>  { 
  return Math.floor(Math.random() * (max - min) + min);
}

export const generateBalanceObjects = () : Balance[] => {
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const dates = getDaysInMonth(month, year)

  const arr: Balance[] = []

  for(let date of dates) {
    const balanceItem: Balance = {
      amount: randomNumber(100000, 200000),
      date: date
    } 

    arr.push(balanceItem)
  }

  return arr;
}