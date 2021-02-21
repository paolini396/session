import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AutenticateUserService from '@modules/users/services/AutenticateUserService';

class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AutenticateUserService);

    const { user, token } = await authenticateUser.execute({ email, password })

    delete user.password;

    return response.json({ user, token })
  }
}

export default SessionsController;
