import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import SessionsController from '../controllers/SessionsController';
import RefreshTokenController from '../controllers/RefreshTokenController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();
const refreshTokenController = new RefreshTokenController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

sessionsRouter.post(
  '/refresh-token',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().required(),
    },
  }),
  refreshTokenController.create,
);

export default sessionsRouter;
