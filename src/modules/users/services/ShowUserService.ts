import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUserRepository';

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<User | undefined> {
      const user = await this.usersRepository.findById(id);

      if(!user) {
        throw new AppError('Usuário não encontrado!');
      }

      return user;
  }
}

export default ShowUserService;
