import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IndexUserService from '@modules/users/services/IndexUserService';
import StoreUserService from '@modules/users/services/StoreUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import DestroyUserService from '@modules/users/services/DestroyUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexUsers = container.resolve(IndexUserService);

    const users = await indexUsers.execute();

    users.forEach(user => {
      delete user.password;
    });

    return response.json({ users });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showUsers = container.resolve(ShowUserService);

    const user = await showUsers.execute(id);

    delete user?.password;


    return response.json({ user });
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const storeUser = container.resolve(StoreUserService);

    const user = await storeUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json({ user });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const data = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute(data);

    return response.json({ user });
  }

  public async destroy(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const destroyUser = container.resolve(DestroyUserService);

    await destroyUser.execute(id);

    return response.json({});
  }
}
