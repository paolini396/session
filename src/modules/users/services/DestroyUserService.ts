import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUserRepository';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<void> {

    const user = await this.usersRepository.findById(id);

    console.log({user})

    if(!user) {
      throw new AppError('Usuário não existe.')
    }

    await this.usersRepository.destroy(id);

    return;
  }
}

export default UpdateUserService;
