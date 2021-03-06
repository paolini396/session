import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  index(): Promise<User[]>;
  store(data: ICreateUserDTO): Promise<User | undefined>;
  update(newData: IUpdateUserDTO): Promise<User | undefined>;
  destroy(id: string): Promise<User | undefined>;
  save(user: User): Promise<User>;
}
