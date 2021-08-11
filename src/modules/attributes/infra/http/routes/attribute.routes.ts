import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import is from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AttributesController from '../controllers/AttributesController';
import AttributesStatusController from '../controllers/AttributesStatusController';
import AttributesOriginController from '../controllers/AttributesOriginController';
import AttributesSegmentController from '../controllers/AttributesSegmentController';

const attributesRouter = Router();
const attributesController = new AttributesController();
const attributesStatusController = new AttributesStatusController();
const attributesOriginController = new AttributesOriginController();
const attributesSegmentController = new AttributesSegmentController();

attributesRouter.use(is([]));

attributesRouter.get('/status/', attributesStatusController.index);
attributesRouter.get('/origins/', attributesOriginController.index);
attributesRouter.get('/segments/', attributesSegmentController.index);

attributesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      segment_id: Joi.string().required().uuid(),
      origin_id: Joi.string().required().uuid(),
      requester_id: Joi.string().required().uuid(),
      attribute_name: Joi.string().required(),
      status_id: Joi.string().required().uuid(),
    },
  }),
  attributesController.create,
);

attributesRouter.get('/', attributesController.index);

attributesRouter.get(
  '/:id/',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required().uuid(),
    },
  }),
  attributesController.show,
);

export default attributesRouter;
