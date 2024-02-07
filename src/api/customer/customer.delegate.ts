/* eslint-disable no-console */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
import { CustomerService } from '../../database/repository.services/customer.service';
import { ErrorHandler } from '../../common/error.handler';
import { Helper } from '../../common/helper';
import { ApiError } from '../../common/api.error';
import { CustomerValidator as validator } from './customer.validator';
import { uuid } from '../../domain.types/miscellaneous/system.types';
import {
    CustomerCreateModel,
    CustomerUpdateModel,
    CustomerSearchDto,
    CustomerSearchFilters,
} from '../../domain.types/customer.domain.types';

///////////////////////////////////////////////////////////////////////////////////////

export class CustomerControllerDelegate {
    //#region member variables and constructors

    _service: CustomerService = null;

    constructor() {
        this._service = new CustomerService();
    }

    //#endregion

    create = async (requestBody: any) => {
        await validator.validateCreateRequest(requestBody);
        var createModel: CustomerCreateModel = this.getCreateModel(requestBody);
        const record = await this._service.create(createModel);
        if (record === null) {
            throw new ApiError('Unable to create customer!', 400);
        }
        return this.getEnrichedDto(record);
    };

    getById = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Customer with id ' + id.toString() + ' cannot be found!');
        }
        return this.getEnrichedDto(record);
    };

    getAllCustomer = async () => {
        const record = await this._service.getAllCustomer();
        if (record === null) {
            ErrorHandler.throwNotFoundError('Customer cannot be found!');
        }
        return record;
    };

    update = async (id: uuid, requestBody: any) => {
        const record = await this._service.getById(id);
        if (record === null) {
            ErrorHandler.throwNotFoundError('Customer with id ' + id.toString() + ' cannot be found!');
        }
        const updateModel: CustomerUpdateModel = this.getUpdateModel(requestBody);
        const updated = await this._service.update(id, updateModel);
        if (updated == null) {
            throw new ApiError('Unable to update customer!', 400);
        }
        return this.getEnrichedDto(updated);
    };

    delete = async (id: uuid) => {
        const record = await this._service.getById(id);
        if (record == null) {
            ErrorHandler.throwNotFoundError('Customer with id ' + id.toString() + ' cannot be found!');
        }
        const apiClientDeleted: boolean = await this._service.delete(id);
        return {
            Deleted: apiClientDeleted,
        };
    };

    getUpdateModel = (requestBody): CustomerUpdateModel => {
        const updateModel: CustomerUpdateModel = {};

        if (Helper.hasProperty(requestBody, 'FirstName')) {
            updateModel.FirstName = requestBody.FirstName;
        }
        if (Helper.hasProperty(requestBody, 'LastName')) {
            updateModel.LastName = requestBody.LastName;
        }
        if (Helper.hasProperty(requestBody, 'Phone')) {
            updateModel.Phone = requestBody.Phone;
        }
        if (Helper.hasProperty(requestBody, 'Email')) {
            updateModel.Email = requestBody.Email;
        }
        if (Helper.hasProperty(requestBody, 'Password')) {
            updateModel.Password = requestBody.Password;
        }
        if (Helper.hasProperty(requestBody, 'Address')) {
            updateModel.Address = requestBody.Address;
        }

        return updateModel;
    };

    getCreateModel = (requestBody): CustomerCreateModel => {
        return {
            FirstName: requestBody.FirstName ? requestBody.FirstName : null,
            LastName: requestBody.LastName ? requestBody.LastName : null,
            Phone: requestBody.Phone ? requestBody.Phone : null,
            Email: requestBody.Email ? requestBody.Email : null,
            Password: requestBody.Password ? requestBody.Password : null,
            Address: requestBody.Address ? requestBody.Address : null,
        };
    };

    getEnrichedDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            CustomerId: record.CustomerId,
            FirstName: record.FirstName,
            LastName: record.LastName,
            Phone: record.Phone,
            Email: record.Email,
            Address: record.Address,
            Password: record.Password,
        };
    };

    getSearchFilters = (query) => {
        var filters = {};

        var FirstName = query.FirstName ? query.FirstName : null;
        if (FirstName != null) {
            filters['FirstName'] = FirstName;
        }

        var LastName = query.LastName ? query.LastName : null;
        if (LastName != null) {
            filters['LastName'] = LastName;
        }

        var Email = query.Email ? query.Email : null;
        if (Email != null) {
            filters['Email'] = Email;
        }

        var Phone = query.Phone ? query.Phone : null;
        if (Phone != null) {
            filters['Phone'] = Phone;
        }

        return filters;
    };

    getSearchDto = (record) => {
        if (record == null) {
            return null;
        }
        return {
            CustomerId: record.id,
            FirstName: record.FirstName,
            LastName: record.LastName,
            Password: record.Password,
            Phone: record.Phone,
            Email: record.Email,
            Address: record.Address,
        };
    };

    search = async (query: any) => {
        // await validator.validateCreateRequest(query);
        var filters: CustomerSearchFilters = this.getSearchFilters(query);
        var searchResults: CustomerSearchDto = await this._service.search(filters);
        var items = searchResults.Items.map((x) => this.getSearchDto(x));
        searchResults.Items = items;
        return searchResults;
    };
}
