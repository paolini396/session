import { injectable, inject } from 'tsyringe';

import IUsersRepository from '../repositories/IUserRepository';

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    await this.usersRepository.destroy(id);

    return;
  }
}

export default UpdateUserService;
