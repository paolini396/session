import { Router } from 'express';

import UsersController from '../controllers/UsersController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const usersController = new UsersController();

usersRouter.post('/', usersController.store);
usersRouter.get('/', ensureAuthenticated, usersController.index);
usersRouter.get('/:id', ensureAuthenticated, usersController.show);
usersRouter.put('/', ensureAuthenticated, usersController.update);
usersRouter.delete('/:id', ensureAuthenticated, usersController.destroy);

export default usersRouter;
