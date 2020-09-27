import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';

import { Container, Title, FormContainer } from './styles';

import api from '../../services/api';

const NewTransaction: React.FC = () => {
  const [titleInput, setTitleInput] = useState('');
  const [typeSelect, setTypeSelect] = useState('');
  const [valueInput, setValueInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');

  const history = useHistory();

  console.log(typeSelect);

  async function handleSubmit(): Promise<void> {
    try {
      await api.post('/transactions', {
        title: titleInput,
        type: typeSelect,
        value: valueInput,
        category: categoryInput,
      });

      history.push('/');
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Adicionar uma transação</Title>
        <FormContainer>
          <input
            name="title"
            placeholder="Título"
            value={titleInput}
            onChange={e => setTitleInput(e.target.value)}
          />

          <select
            value={typeSelect}
            onChange={e => {
              setTypeSelect(e.currentTarget.value);
            }}
          >
            <option value="" disabled>
              Tipo de transação
            </option>
            <option value="income">Entrada</option>
            <option value="outcome">Saída</option>
          </select>

          <input
            name="value"
            placeholder="Preço"
            value={valueInput}
            onChange={e => setValueInput(e.target.value)}
          />

          <input
            name="category"
            placeholder="Categoria"
            value={categoryInput}
            onChange={e => setCategoryInput(e.target.value)}
          />

          <button type="submit" onClick={handleSubmit}>
            Adicionar transação
          </button>
        </FormContainer>
      </Container>
    </>
  );
};

export default NewTransaction;
