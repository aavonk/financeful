import Paper from '@Common/Paper';
import {
  Table,
  TableHead,
  TableRow,
  Header,
  TableBody,
  TableCell,
} from './style';
import { Transaction } from '@Generated/graphql';
import { Checkbox } from '@Common/FormElements';

type Props = {
  data?: Array<Transaction>;
};

function TransactionTable({ data }: Props) {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <Header>
              <Checkbox />
            </Header>
            <Header>Date</Header>
            <Header>Payee</Header>
            <Header>Amount</Header>
            <Header>Type</Header>
            <Header>Category</Header>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.date.toString()}</TableCell>
              <TableCell>{item.payee}</TableCell>
              <TableCell bold>${item.amount}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default TransactionTable;
