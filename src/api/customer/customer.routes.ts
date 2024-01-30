import express from 'express';
import { CustomerController } from './customer.controller';

///////////////////////////////////////////////////////////////////////////////////

export const register = (app: express.Application): void => {
    const router = express.Router();
    const controller = new CustomerController();

    router.post('/', controller.create);

    //router.get('/search', controller.search);
    router.get('/:id', controller.getById);
    router.put('/:id', controller.update);
    router.delete('/:id', controller.delete);

    app.use('/api/v1/api-customers', router);
};
