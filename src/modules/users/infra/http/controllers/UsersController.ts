import {Request, Response} from 'express';
import { container } from 'tsyringe';

import IndexUserService from '@modules/users/services/IndexUserService';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';


export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexUsers = container.resolve(IndexUserService);

    const users = await indexUsers.execute();

    users.forEach((user) => {
      delete user.password;
    })

    return response.json({users});
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json({user});
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute(data);

    return response.json({user});
  }
}
