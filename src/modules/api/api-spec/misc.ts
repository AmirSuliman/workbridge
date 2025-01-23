import { DataTypes } from '@/types/data';
import { EmployeeFormValuesType } from '@/views/Employees';
import { OpenPositionFormValues } from '@/views/OpenPositions/types';

import RunAction = DataTypes.RunAction;

export type MiscEndpoints = {
  /**
   * Log in
   */
  'POST /user/login': {
    body: {
      email: string;
      password: string;
      rememberMe: boolean;
    };
    response: {
      data: {
        user: DataTypes.User;
        accessToken: {
          accessToken: string;
          refreshToken: string;
        };
      };
    };
    responses: {};
  };
  'GET /users': {
    query: {
      page: number;
      size: number;
      roleIds?: string;
    };
    response: {
      data: {
        items: DataTypes.User[];
        totalItems: number;
      };
    };
    responses: {};
  };
  'GET /roles': {
    query: {
      page: number;
      size: number;
    };
    response: {
      data: {
        items: DataTypes.Role[];
        totalItems: number;
      };
    };
    responses: {};
  };
  'POST /user': {
    body: {
      email: string;
      password?: string;
      firstName: string;
      lastName: string;
      roleId: number | string;
      publicPictureUrl: string;
    };
    response: {};
    responses: {};
  };
  'PUT /user/{id}': {
    params: {
      id: number;
    };
    body: {
      email: string;
      password?: string;
      firstName: string;
      lastName: string;
      roleId: number | string;
      publicPictureUrl: string;
    };
    response: {};
    responses: {};
  };
  'GET /user/{id}': {
    params: {
      id: number;
    };
    response: {
      data: DataTypes.User;
    };
    responses: {};
  };
  'DELETE /user/{id}': {
    params: {
      id: number;
    };
    response: {};
    responses: {};
  };
  'POST /user/resetPassword': {
    body: {
      email: string;
    };
    response: {};
    responses: {};
  };

  'POST /user/confirmResetPassword': {
    body: {
      token: string | null;
      newPassword: string;
    };
    response: {};
    responses: {};
  };

  'GET /companies': {
    query?: {
      page: number;
      size: number;
    };
    response: {
      data: {
        items: DataTypes.Company[];
        totalItems: number;
      };
    };
    responses: {};
  };
  'GET /companies/financials': {
    response: {
      data: {
        companyId: number;
        companyName: string;
        totalSalary: number;
      }[];
    };
    responses: {};
  };
  'GET /company/{id}/openPositions{status}': {
    params: {
      id: number;
      status: string;
    };
    response: {
      data: {
        items: DataTypes.OpenPosition[];
        totalItems: number;
      };
    };
    responses: {};
  };
  'PUT /company/{id}/assignCeo': {
    params: {
      id: number;
    };
    body: {
      employeeId: number | string;
    };
    response: {
      data: DataTypes.Company;
    };
    responses: {};
  };
  'GET /company/{id}/departments/expenses': {
    params: {
      id: number | null;
    };
    response: {
      data: DataTypes.DepartmentExpense[];
    };
  };
  'GET /companies/{id}/expensesByParentCompany': {
    params: {
      id: number | null;
    };
    response: {
      data: DataTypes.CompanyExpense[];
    };
  };
  'GET /company/{id}/financialsByCountry': {
    params: {
      id: number | null;
    };
    response: {
      data: {
        companyId: number;
        totalMonthlyCost: number;
        totalQuarterlyCost: number;
        totalYearlyCost: number;
        totalEmployees: number;
        financialsByCountry: DataTypes.FinancialsByCountry[];
      };
    };
    responses: {};
  };
  'GET /company/{id}/employees?associations=true': {
    params: {
      id: number;
    };
    response: {
      data: {
        items: DataTypes.Employee[];
        totalItems: number;
      };
    };
    responses: {};
  };
  'GET /company/{id}/organogram': {
    params: {
      id: number;
    };
    query?: {
      withCEO?: boolean;
      flat: boolean;
    };
    response: {
      data: {
        totalCost: number;
        totalSaved: number;
        orgChartData: DataTypes.Employee[];
        nrOfTerminated: number;
      };
    };
    responses: {};
  };
  'PUT /employee/toggle-termination/{id}': {
    params: {
      id: number;
    };
    response: {
      data: DataTypes.Employee;
    };
    responses: {};
  };
  'POST /company': {
    params?: {
      id: number;
    };
    body: {
      name: string;
      phoneNumber: string;
      website: string;
      address: string;
      purchasedAt: Date;
      locationIds: number[];
      file: File;
    };
    response: {
      data: DataTypes.Company;
    };
    responses: {};
  };
  'DELETE /company/{id}': {
    params: {
      id: number;
    };
    response: {};
    responses: {};
  };
  'GET /company/{id}': {
    params: {
      id: number | string;
    };
    query?: {
      associations?: boolean;
    };
    response: {
      data: DataTypes.Company;
    };
    responses: {};
  };
  'GET /company/{id}/departments': {
    params: {
      id: number;
    };
    response: {
      data: DataTypes.Department[];
    };
    responses: {};
  };
  'PUT /company/{id}': {
    params: {
      id: number;
    };
    body: {
      name: string;
      phoneNumber: string;
      website: string;
      address: string;
      purchasedAt: string;
      locationIds: number[];
      file: File;
    };
    response: {
      data: DataTypes.Company;
    };
    responses: {};
  };
  'GET /company/{id}/compareParentDepartmentExpenses': {
    params: {
      id: number;
    };
    query: {
      departmentId: number;
    };
    response: {
      data: {
        departmentId: number;
        departmentName: string;
        companies: {
          companyId: number;
          companyName: string;
          departmentCost: number;
          departmentCostInPercentage: number;
        }[];
      };
    };
  };
  'GET /company/{id}/positions': {
    params: {
      id: number;
    };
    response: {
      data: { id: number; name: string }[];
    };
  };
  'GET /company/{id}/locations': {
    params: {
      id: number;
    };
    response: {
      data: DataTypes.Location[];
    };
  };
  'GET /roles{pagination}': {
    params?: {
      pagination: string;
    };
    response: {
      data: {
        items: DataTypes.Role[];
        totalItems: number;
      };
    };
    responses: {};
  };
  'GET /employees': {
    query?: {
      size?: number;
      page?: number;
      companyIds?: string;
      departmentIds?: string;
      locationIds?: string;
      minSalary?: number | string;
      maxSalary?: number | string;
    };
    response: {
      data: {
        items: DataTypes.Employee[];
        totalItems: number;
      };
    };
    responses: {};
  };
  'POST /employees/compare': {
    body: {
      employeeIds: number[];
      action: RunAction | null;
    };
    response: {
      data: DataTypes.InsightsCompare;
    };
    responses: {};
  };
  'POST /openPositions/compare': {
    body: {
      openPositionIds: number[];
    };
    response: {
      data: {
        totalOpenPositions: number;
        totalSalary: number;
        totalSavings: number;
        openPositions: {
          id: number;
          tittle: string;
          description: string;
          salary: number;
          positionName: string;
          departmentName: string;
          savings: number;
        }[];
      };
    };
    responses: {};
  };
  'GET /employee/{id}': {
    params?: {
      id: number;
    };
    response: {
      data: DataTypes.Employee;
    };
    responses: {};
  };
  'DELETE /employee/{id}': {
    params: {
      id: number;
    };
    response: {
      data: DataTypes.Employee;
    };
    responses: {};
  };
  'POST /employee': {
    body: EmployeeFormValuesType;
    response: {
      data: DataTypes.Employee;
    };
    responses: {};
  };
  'PUT /employee/{id}': {
    params?: {
      id: number;
    };
    body: Partial<DataTypes.Employee>;
    response: {
      data: DataTypes.Employee;
    };
    responses: {};
  };
  'GET /employee/{id}?associations=true': {
    params?: {
      id: number;
    };
    response: {
      data: DataTypes.Employee;
    };
    responses: {};
  };
  'GET /openPositions': {
    query?: {
      page: number;
      size: number;
      status?: string;
      name: string;
      departmentIds?: string;
      locationIds?: string;
      positionIds?: string;
      minSalary?: number | string;
      maxSalary?: number | string;
      dateOpened: string | null;
      reportingToEmployeeId?: string;
      hourlyRate?: string;
    };
    response: {
      data: {
        items: DataTypes.OpenPosition[];
        totalItems: number;
        totalPages: number;
      };
    };
    responses: {};
  };
  'GET /openPosition/{id}': {
    params: {
      id: number;
    };
    response: {
      data: DataTypes.OpenPosition;
    };
    responses: {};
  };
  'DELETE /openPosition/{id}': {
    params: {
      id: number;
    };
    response: {};
    responses: {};
  };
  'POST /openPosition': {
    body: OpenPositionFormValues;
    response: {
      data: DataTypes.OpenPosition;
    };
    responses: {};
  };
  'PUT /openPosition/{id}': {
    params: {
      id: number;
    };
    body: Partial<OpenPositionFormValues>;
    response: {
      data: DataTypes.OpenPosition;
    };
    responses: {};
  };
  'GET /skills{pagination}': {
    params?: {
      pagination: string;
    };
    response: {
      data: {
        items: DataTypes.Skill[];
        totalItems: number;
        totalPages: number;
      };
    };
    responses: {};
  };
  'GET /departments': {
    query?: {
      page?: number;
      size?: number;
      name?: string;
      companyIds?: string;
    };
    response: {
      data: {
        items: DataTypes.Department[];
        totalItems: number;
        totalPages: number;
      };
    };
    responses: {};
  };
  'GET /department/{id}': {
    params: {
      id: number | null;
    };
    query?: {
      associations: boolean;
    };
    response: {
      data: DataTypes.Department;
    };
    responses: {};
  };
  'POST /department': {
    body: {
      name: string;
      companyId: number;
    };
    response: {};
    responses: {};
  };
  'PUT /department/{id}': {
    params: {
      id: number;
    };
    body: {
      name: string;
      companyId: number;
    };
    response: {};
    responses: {};
  };
  'GET /departmentEmployees/{id}': {
    params: {
      id: null | number;
    };
    response: {
      data: DataTypes.Employee[];
    };
    responses: {};
  };
  'GET /department/{departmentId}/employees/{companyId}': {
    params: {
      departmentId: number | null;
      companyId?: number;
    };
    response: {
      data: DataTypes.Employee[];
    };
    responses: {};
  };
  'GET /locations{pagination}': {
    params?: {
      pagination: string;
    };
    response: {
      data: {
        items: DataTypes.Location[];
        totalItems: number;
      };
    };
    responses: {};
  };
  'GET /allFinancials': {
    params: {
      id: number | null;
    };
    response: {
      data: {
        totalMonthlyCost: number;
        totalQuarterlyCost: number;
        totalYearlyCost: number;
        totalEmployees: number;
      };
    };
    responses: {};
  };
  'GET /company/{id}/financials': {
    params: {
      id: number | null;
    };
    response: {
      data: {
        totalMonthlyCost: number;
        totalQuarterlyCost: number;
        totalYearlyCost: number;
        totalEmployees: number;
      };
    };
    responses: {};
  };
  'PUT /company/{id}/updateLogo': {
    params: {
      id: number;
    };
    body: {
      file: File;
    };
    response: {
      data: any;
    };
    responses: {};
  };
  'GET /company/{id}/organogram/export': {
    params: {
      id: number | null;
    };
    response: string;
    responses: {};
  };
  'POST /employees/compare/export': {
    body: {
      employeeIds: number[];
      action: RunAction | null;
      upgradeEmployees?: { employeeId: number; percentage: number }[];
    };
    response: string;
    responses: {};
  };
  'GET /company/{id}/employees': {
    params: {
      id: number | null;
    };
    query?: {
      size: number;
      page: number;
      departmentIds?: string;
      companyIds?: string;
      locationIds?: string;
      positionIds?: string;
      minSalary?: number | string;
      maxSalary?: number | string;
    };
    response: {
      data: {
        items: DataTypes.Employee[];
        totalItems: number;
      };
    };
    responses: {};
  };
  'GET /positions': {
    query?: {
      size: number;
      page: number;
    };
    response: {
      data: {
        items: DataTypes.Position[];
        totalItems: number;
      };
    };
    responses: {};
  };

  'GET /csvfiledata': {
    query?: {
      size: number;
      page: number;
    };
    response: {
      data: {
        items: DataTypes.CSVFileData[];
        totalItems: number;
      };
    };
    responses: {};
  };

  'POST /csvfiledata': {
    body: {
      file: File | null;
    };
    response: any;
    responses: {};
  };

  'GET /saveView': {
    query?: {
      page: number;
      size: number;
    };
    response: {
      data: {
        items: DataTypes.SaveView[];
        totalItems: number;
        totalPages: number;
        currentPage: number;
      };
    };
    responses: {};
  };

  'GET /saveView/{id}': {
    params: {
      id: number;
    };
    query?: {
      associations: boolean;
    };
    response: {
      data: DataTypes.SaveView;
    };
    responses: {};
  };

  'DELETE /saveView/{id}': {
    params: {
      id: number;
    };
    response: {};
    responses: {};
  };

  'POST /saveView': {
    body: {
      name: string;
      description?: string;
      companyId: number;
      employeeIds: number[];
    };
    response: any;
    responses: {};
  };
  'POST /saveView/dCrystal': {
    body: {
      name: string;
      description?: string;
      companyId: number;
      action?: RunAction | null;
      employeeIds: number[];
      upgradeEmployees?: { employeeId: number; percentage: number }[];
    };
    response: any;
    responses: {};
  };

  'GET /locations': {
    query?: {
      size: number;
      page: number;
    };
    response: {
      data: {
        items: DataTypes.Location[];
        totalItems: number;
      };
    };
    responses: {};
  };
};
