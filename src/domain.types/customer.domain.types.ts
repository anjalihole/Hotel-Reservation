import { BaseSearchFilters, BaseSearchResults } from './miscellaneous/base.search.types';
export interface CustomerCreateModel {
    CustomerID?: string;
    FirstName?: string;
    LastName?: string;
    Password?: string;
    Phone?: string;
    Email?: string;
    Address?: string;
}

export interface CustomerUpdateModel {
    FirstName?: string;
    LastName?: string;
    Password?: string;
    Phone?: string;
    Email?: string;
    Address?: string;
}

export interface CustomerDto {
    CustomerID?: string;
    FirstName?: string;
    LastName?: string;
    Password?: string;
    Phone?: string;
    Email?: string;
    Address?: string;
}

export interface CustomerSearchFilters extends BaseSearchFilters {
    CustomerID?: string;
    FirstName?: string;
    LastName?: string;
    Password?: string;
    Phone?: string;
    Email?: string;
    Address?: string;
}

export interface CustomerSearchDto extends BaseSearchResults {
    Items: CustomerDto[];
}
