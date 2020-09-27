import React, { useState, useEffect } from 'react';
import { FiTrash2 } from 'react-icons/fi';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';

import api from '../../services/api';

import Header from '../../components/Header';

import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  useEffect(() => {
    api
      .get<{ transactions: Transaction[]; balance: Balance }>('/transactions')
      .then(response => {
        const transactionsResponse = response.data.transactions;

        const formattedTransactions = transactionsResponse.map(transaction => {
          const formattedValue = formatValue(transaction.value);
          const formattedDate = Intl.DateTimeFormat('pt-BR').format(
            new Date(transaction.created_at),
          );

          return Object.assign(transaction, { formattedValue, formattedDate });
        });

        const balanceResponse = response.data.balance;

        const formattedBalance = {
          total: formatValue(Number(balanceResponse.total)),
          income: formatValue(Number(balanceResponse.income)),
          outcome: formatValue(Number(balanceResponse.outcome)),
        };

        setBalance(formattedBalance);
        return setTransactions(formattedTransactions);
      });
  }, []);

  async function handleDeleteTransaction(id: string): Promise<void> {
    try {
      await api.delete(`/transactions/${id}`);

      const response = await api.get('/transactions/balance');

      const newBalance = response.data;

      const formattedNewBalance = {
        total: formatValue(newBalance.total),
        income: formatValue(newBalance.income),
        outcome: formatValue(newBalance.outcome),
      };

      setTransactions(oldTransactions =>
        oldTransactions.filter(transaction => transaction.id !== id),
      );

      setBalance(formattedNewBalance);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Header />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">{balance.income}</h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">{balance.outcome}</h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">{balance.total}</h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
                <th> </th>
              </tr>
            </thead>

            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id}>
                  <td className="title">{transaction.title}</td>
                  <td className={transaction.type}>
                    {transaction.type === 'outcome'
                      ? `- ${transaction.formattedValue}`
                      : transaction.formattedValue}
                  </td>
                  <td>{transaction.category.title}</td>
                  <td>{transaction.formattedDate}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDeleteTransaction(transaction.id)}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Dashboard;
