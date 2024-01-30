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
