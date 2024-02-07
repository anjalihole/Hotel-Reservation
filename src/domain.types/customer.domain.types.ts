import { BaseSearchFilters, BaseSearchResults } from './miscellaneous/base.search.types';
export interface CustomerCreateModel {
    CustomerId?: string;
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
    CustomerId?: string;
    FirstName?: string;
    LastName?: string;
    Password?: string;
    Phone?: string;
    Email?: string;
    Address?: string;
}

export interface CustomerSearchFilters extends BaseSearchFilters {
    CustomerId?: string;
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
