import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AttributeInfDatabaseController from '../controllers/AttributeInfDatabaseController';

const attributesInfRouter = Router();
const attributesInfController = new AttributeInfDatabaseController();

attributesInfRouter.use(is([]));

attributesInfRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  attributesInfController.show,
);

export default attributesInfRouter;
