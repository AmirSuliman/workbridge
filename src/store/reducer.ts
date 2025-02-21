'use client';

import { forEach } from 'lodash';

import { DataTypes } from '@/types/data';
import { getAllParents } from '@/utils/misc';

interface IApplicationState {
  terminatedEmployees: DataTypes.Employee[];
  totalTerminated: Record<number, number>;
  terminatedParents: number[];
  selectedEmployees: number[];
  totalCost: number;
  totalSaved: number;
}

export const initialState: IApplicationState = {
  terminatedEmployees: [],
  totalTerminated: {},
  terminatedParents: [],
  selectedEmployees: [],
  totalCost: 0,
  totalSaved: 0,
};

export function reducer(
  state: IApplicationState,
  action: { type: string; payload: any },
) {
  switch (action.type) {
    case 'TOTAL_TERMINATED_EMPLOYEES_PER_PARENT':
      const employees = action.payload;
      const totalTerminated = state.totalTerminated;
      employees.forEach((e: DataTypes.Employee) => {
        totalTerminated[e.id] = employees
          .filter((emp: DataTypes.Employee) => e.id === emp.parentId)
          .filter((emp: DataTypes.Employee) => emp.isTerminated).length;
      });
      return {
        ...state,
        totalTerminated: totalTerminated,
      };
    case 'TERMINATED_PARENTS':
      const parents = getAllParents(action.payload.node);
      const parentIds = parents.map((parent) => Number(parent.id));
      forEach(parentIds, (id) => {
        const index = state.terminatedParents.indexOf(id);
        if (action.payload.employee.isTerminated) {
          state.terminatedParents.push(id);
        } else if (index !== -1) {
          state.terminatedParents.splice(index, 1);
        }
      });
      return {
        ...state,
        terminatedParents: state.terminatedParents,
      };
    case 'PARENT_TOTAL_TERMINATED_EMPLOYEES':
      const parentId = action.payload.parentId;
      const employeeId = action.payload.employeeId;
      const parentTerminatedEmployees = state.totalTerminated;
      const isTerminated = state.terminatedEmployees.some(
        (e) => e.id === employeeId,
      );
      return {
        ...state,
        totalTerminated: {
          ...parentTerminatedEmployees,
          [parentId]: isTerminated
            ? parentTerminatedEmployees[parentId] + 1
            : parentTerminatedEmployees[parentId] - 1,
        },
      };
    case 'TERMINATED_EMPLOYEE':
      return {
        ...state,
        terminatedEmployees: action.payload,
      };
    case 'TOGGLE_TERMINATE_EMPLOYEE':
      const employee = action.payload[0];
      const index = state.terminatedEmployees.findIndex(
        (e) => e.id === employee.id,
      );
      // total cost is sum of salary of all terminated employees
      return {
        ...state,
        terminatedEmployees:
          index === -1
            ? [...state.terminatedEmployees, employee]
            : state.terminatedEmployees.filter((e) => e.id !== employee.id),
      };
    case 'SET_REVENUE_COST':
      return {
        ...state,
        totalCost: action.payload.totalCost,
        totalSaved: action.payload.totalSaved,
      };
    case 'CALCULATE_REVENUE_AND_COST':
      const employeeSalary = action.payload;
      const totalCost = state.totalCost + employeeSalary;
      const totalSaved = state.totalSaved - employeeSalary;
      return {
        ...state,
        totalCost,
        totalSaved,
      };
    case 'TOGGLE_SELECTED_EMPLOYEES':
      const idx = state.selectedEmployees.indexOf(action.payload);
      return {
        ...state,
        selectedEmployees:
          idx === -1
            ? [...state.selectedEmployees, action.payload]
            : state.selectedEmployees.filter((e) => e !== action.payload),
      };
    default:
      return state;
  }
}
