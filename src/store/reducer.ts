'use client';

import { DataTypes } from '@/types/data';

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
  action: { type: string; payload: any }
) {
  switch (action.type) {
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
