/* eslint-disable padded-blocks */
import express from 'express';
import { ResponseHandler } from '../../common/response.handler';
import { CustomerControllerDelegate } from './customer.delegate';
import { BaseController } from '../base.controller';

///////////////////////////////////////////////////////////////////////////////////////

export class CustomerController extends BaseController {
    _delegate: CustomerControllerDelegate = null;

    constructor() {
        super();
        this._delegate = new CustomerControllerDelegate();
    }

    create = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            // await this.authorize('Customer.Create', request, response);
            const record = await this._delegate.create(request.body);
            const message = 'Customer added successfully!';
            ResponseHandler.success(request, response, message, 201, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    getById = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            // await this.authorize('Customer.GetById', request, response);
            const record = await this._delegate.getById(request.params.id);
            const message = 'Customers retrieved successfully!';
            ResponseHandler.success(request, response, message, 200, record);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    update = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            // await this.authorize('Customer.Update', request, response);
            const updatedRecord = await this._delegate.update(request.params.id, request.body);
            const message = 'Customers updated successfully!';
            ResponseHandler.success(request, response, message, 200, updatedRecord);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    delete = async (request: express.Request, response: express.Response): Promise<void> => {
        try {
            // await this.authorize('Customer.Delete', request, response);
            const result = await this._delegate.delete(request.params.id);
            const message = 'Customers deleted successfully!';
            ResponseHandler.success(request, response, message, 200, result);
        } catch (error) {
            ResponseHandler.handleError(request, response, error);
        }
    };

    // search = async (request: express.Request, response: express.Response): Promise<void> => {
    //     try {
    //         await this.authorize('Customer.Search', request, response);
    //         const searchResults = await this._delegate.search(request.query);
    //         const message = 'Api client records retrieved successfully!';
    //         ResponseHandler.success(request, response, message, 200, searchResults);
    //     } catch (error) {
    //         ResponseHandler.handleError(request, response, error);
    //     }
    // };
}
