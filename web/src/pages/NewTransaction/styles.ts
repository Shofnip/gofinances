import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 736px;
  margin: 0 auto;
  padding: 40px 20px;
`;

export const Title = styled.h1`
  font-weight: 500;
  font-size: 36px;
  line-height: 54px;
  color: #363f5f;
  text-align: center;
`;

export const FormContainer = styled.section`
  background: #fff;
  margin-top: 40px;
  border-radius: 5px;
  padding: 64px;

  display: flex;
  flex-direction: column;

  input {
    margin: 10px 0;
    padding: 0 10px;
    height: 50px;

    border: 2px solid #ff872c;
    border-radius: 5px;
  }

  select {
    margin: 10px 0;
    padding: 5px;
    height: 50px;

    border: 2px solid #ff872c;
    border-radius: 5px;
  }

  button {
    background: #ff872c;
    color: #fff;
    border-radius: 5px;
    padding: 15px 80px;
    border: 0;
    transition: background-color 0.2s;

    p {
      display: flex;
      align-items: center;
      font-size: 12px;
      line-height: 18px;
      color: #969cb3;

      img {
        margin-right: 5px;
      }
    }

    &:hover {
      background: ${shade(0.2, '#ff872c')};
    }
  }
`;
