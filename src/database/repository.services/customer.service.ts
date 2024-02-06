/* eslint-disable no-console */
/* eslint-disable key-spacing */
/* eslint-disable padded-blocks */
import { CustomerModel } from '../models/customer.model';
import {
    CustomerCreateModel,
    CustomerDto,
    CustomerSearchDto,
    CustomerUpdateModel,
} from '../../domain.types/customer.domain.types';
import { Logger } from '../../common/logger';
import { ApiError } from '../../common/api.error';
// import { CurrentClient } from '../../domain.types/miscellaneous/current.client';
import { Op } from 'sequelize';
import { ErrorHandler } from '../../common/error.handler';
import { Helper } from '../../common/helper';

///////////////////////////////////////////////////////////////////////

export class CustomerService {
    Customer = CustomerModel.Model;

    create = async (clientDomainModel: CustomerCreateModel): Promise<CustomerDto> => {
        try {
            const entity = {
                FirstName: clientDomainModel.FirstName,
                LastName: clientDomainModel.LastName,
                Phone: clientDomainModel.Phone,
                Email: clientDomainModel.Email,
                Password: clientDomainModel.Password ?? null,
                Address: clientDomainModel.Address ?? null,
            };
            entity.Password = Helper.hash(clientDomainModel.Password);
            const client = await this.Customer.create(entity);
            const dto = await this.toDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    };

    getById = async (id: string): Promise<CustomerDto> => {
        try {
            const client = await this.Customer.findByPk(id);
            const dto = await this.toDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    };

    getAllCustomer = async (): Promise<CustomerDto> => {
        try {
            const records = await this.Customer.findAll();
            return records;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    };

    search = async (filters: CustomerDto): Promise<CustomerSearchDto> => {
        try {
            var search = this.getSearchModel(filters);
            var { order, orderByColumn } = this.addSortingToSearch(search, filters);
            var { pageIndex, limit } = this.addPaginationToSearch(search, filters);

            const foundResults = await this.Customer.findAndCountAll(search);
            const searchResults: CustomerSearchDto = {
                TotalCount: foundResults.count,
                RetrievedCount: foundResults.rows.length,
                PageIndex: pageIndex,
                ItemsPerPage: limit,
                Order: order === 'DESC' ? 'descending' : 'ascending',
                OrderedBy: orderByColumn,
                Items: foundResults.rows,
            };

            return searchResults;
        } catch (error) {
            ErrorHandler.throwDbAccessError('DB Error: Unable to search api client records!', error);
        }
    };

    update = async (id: string, clientDomainModel: CustomerUpdateModel): Promise<CustomerDto> => {
        try {
            const client = await this.Customer.findByPk(id);

            //Client code is not modifiable

            if (clientDomainModel.FirstName != null) {
                client.FirstName = clientDomainModel.FirstName;
            }
            if (clientDomainModel.LastName != null) {
                client.LastName = clientDomainModel.LastName;
            }
            if (clientDomainModel.Password != null) {
                client.Password = Helper.hash(clientDomainModel.Password);
            }
            if (clientDomainModel.Phone != null) {
                client.Phone = clientDomainModel.Phone;
            }
            if (clientDomainModel.Address != null) {
                client.Address = clientDomainModel.Address;
            }
            if (clientDomainModel.Email != null) {
                client.Email = clientDomainModel.Email;
            }
            await client.save();

            const dto = await this.toDto(client);
            return dto;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    };

    delete = async (id: string): Promise<boolean> => {
        try {
            const result = await this.Customer.destroy({ where: { CustomerID: id } });
            return result === 1;
        } catch (error) {
            Logger.instance().log(error.message);
            throw new ApiError(error.message, 500);
        }
    };

    toDto = (client): CustomerDto => {
        if (client == null) {
            return null;
        }
        const dto: CustomerDto = {
            CustomerID: client.CustomerID,
            FirstName: client.FirstName,
            LastName: client.LastName,
            Phone: client.Phone,
            Email: client.Email,
            Address: client.Address,
            Password: client.Password,
        };
        return dto;
    };

    private getSearchModel = (filters) => {
        var search = {
            where: {},
            include: [],
        };

        if (filters.FirstName) {
            search.where['FirstName'] = {
                [Op.like]: '%' + filters.FirstName + '%',
            };
        }
        if (filters.LastName) {
            search.where['LastName'] = {
                [Op.like]: '%' + filters.LastName + '%',
            };
        }
        if (filters.Email) {
            search.where['Email'] = {
                [Op.like]: '%' + filters.Email + '%',
            };
        }
        if (filters.Phone) {
            search.where['Phone'] = filters.Phone;
        }

        return search;
    };

    private addSortingToSearch = (search, filters) => {
        let orderByColumn = 'CreatedAt';
        if (filters.OrderBy) {
            orderByColumn = filters.OrderBy;
        }
        let order = 'ASC';
        if (filters.Order === 'descending') {
            order = 'DESC';
        }
        search['order'] = [[orderByColumn, order]];

        return {
            order,
            orderByColumn,
        };
    };

    private addPaginationToSearch = (search, filters) => {
        let limit = 25;
        if (filters.ItemsPerPage) {
            limit = filters.ItemsPerPage;
        }
        let offset = 0;
        let pageIndex = 0;
        if (filters.PageIndex) {
            pageIndex = filters.PageIndex < 0 ? 0 : filters.PageIndex;
            offset = pageIndex * limit;
        }
        search['limit'] = limit;
        search['offset'] = offset;

        return {
            pageIndex,
            limit,
        };
    };

    //#endregion
}
