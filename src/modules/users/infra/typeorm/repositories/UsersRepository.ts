import { getRepository, Repository } from 'typeorm';

import IUserRepository from '@modules/users/repositories/IUserRepository';
import ICreateUsersDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../entities/User';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    try {
    const user = await this.ormRepository.findOne(id);

    return user;
    } catch (err) {
      return;
    }
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    try {
      const user = await this.ormRepository.findOne({
        where: {email},
      });
  
      return user;
    }catch(err) {
      return;
    }

  }

  public async index(): Promise<User[]> {
    try {
      const users = await this.ormRepository.find({
        order: {
          name: 'ASC',
          id: 'DESC'
        },
      });
  
      return users;
    }catch (err) {
      return [];
    }
 
  }

  public async store(UserData: ICreateUsersDTO): Promise<User | undefined> {
    try {
      const user = this.ormRepository.create(UserData);

      await this.ormRepository.save(user);
  
      return user;

    } catch (err) {

      return;
    }
 
  }

  public async update(newUserData: IUpdateUserDTO): Promise<User | undefined> {
    await this.ormRepository.update(newUserData.id, newUserData);

    const user = await this.ormRepository.findOne(newUserData.id);

    delete user?.password;

    return user;
  }

  public async destroy(id: string): Promise<User | undefined> {
    try {
      const user = this.ormRepository.findOne(id);

      await this.ormRepository.delete(id);
      
      return user;

    } catch (err) {
      return;
    }
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

}

export default UsersRepository;
