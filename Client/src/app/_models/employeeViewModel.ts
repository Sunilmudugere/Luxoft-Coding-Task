import { Employee } from "./employee";

export class Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

export class EmployeeViewModel {
    employees: Employee[];
    pagination: Pagination = new Pagination;
}

export class EmployeeDto {
    employees: Employee[];
    pagination: Pagination;
}
