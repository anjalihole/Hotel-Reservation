/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
import * as joi from 'joi';
import { ErrorHandler } from '../../common/error.handler';

///////////////////////////////////////////////////////////////////////////////////////////////

export class CustomerValidator {
    static validateCreateRequest = async (requestBody) => {
        try {
            const schema = joi.object({
                FirstName: joi.string().max(256).optional(),
                LastName: joi.string().max(256).optional(),
                Phone: joi.string().required(),
                Email: joi.string().email().required(),
                Password: joi.string().optional(),
                Address: joi.string().optional(),
            });
            return await schema.validateAsync(requestBody);
        } catch (error) {
            ErrorHandler.handleValidationError(error);
        }
    };
}
