import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id, name, email, password }: IRequest): Promise<User | undefined> {
    const findUser = await this.usersRepository.findById(id);

    if(!findUser) {
      throw new AppError('Usuário não encontrado.')
    }

    const user = await this.usersRepository.update({...findUser, id, email, name, password, updated_at: new Date });

    return user;
  }
}

export default UpdateUserService;
