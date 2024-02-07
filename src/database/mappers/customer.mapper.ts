/* eslint-disable padded-blocks */
/* eslint-disable key-spacing */
import { CustomerDto } from '../../domain.types/customer.domain.types';

///////////////////////////////////////////////////////////////////////////////////

export class CustomerMapper {
    static toDto = (customer: any): CustomerDto => {
        if (customer == null) {
            return null;
        }
        const dto: CustomerDto = {
            CustomerId: customer.id,
            FirstName: customer.FirstName,
            LastName: customer.LastName,
            Phone: customer.Phone,
            Email: customer.Email,
            Address: customer.Address,
            Password: customer.Password,
        };
        return dto;
    };
}
