import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

interface IRequest {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: IRequest): Promise<void> {
    const transactionsRepository = getRepository(Transaction);

    const transaction = await transactionsRepository.findOne(id);

    if (!transaction) {
      throw new AppError("This transaction doesn't exists.");
    }

    await transactionsRepository.remove(transaction);
  }
}

export default DeleteTransactionService;
