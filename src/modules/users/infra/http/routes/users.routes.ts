import { Router } from 'express';

import UsersController from '../controllers/UsersController';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.get('/', usersController.index);
usersRouter.post('/', usersController.store);
usersRouter.put('/', usersController.update);

export default usersRouter;
