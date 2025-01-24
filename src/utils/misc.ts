import clsx from 'clsx';
import {
  ComponentPropsWithoutRef,
  ElementType,
  Ref,
  createElement,
  forwardRef,
} from 'react';

import api from '@/modules/api/client';
import { DataTypes } from '@/types/data';

export function styled<El extends ElementType>(el: El, baseClassName?: string) {
  function PrimitiveWithProps(
    props: ComponentPropsWithoutRef<El>,
    ref?: Ref<El>
  ) {
    const { children = null, ...propsNoChildren } = props;

    return createElement(
      el,
      {
        ...propsNoChildren,
        ref,
        className: clsx(props.className, baseClassName),
      },
      children
    );
  }

  return forwardRef(PrimitiveWithProps);
}

export const searchResults = (items: any[], search: string) => {
  if (!search) {
    return items;
  }
  return items.filter((item) =>
    Object.values(item)
      .join('')
      .toLowerCase()
      .includes(search.toLowerCase().trim().trimEnd().trimStart())
  );
};

export function randomHexColorCode() {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
}

const numberFormat = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function usFormatNumber(number: number) {
  return numberFormat.format(number);
}

// recursive function based on children or _children property
// node -> children or _children -> data: DataTypes.Employee
export function checkForTerminatedEmployees(
  node: any,
  terminatedEmployees: DataTypes.Employee[]
): boolean {
  if (terminatedEmployees.some((e) => e.id === node.data.id)) {
    return true;
  }
  if (node.children) {
    for (const child of node.children) {
      if (checkForTerminatedEmployees(child, terminatedEmployees)) {
        return true;
      }
    }
  } else if (node._children) {
    for (const child of node._children) {
      if (checkForTerminatedEmployees(child, terminatedEmployees)) {
        return true;
      }
    }
  }
  return false;
}

// recursive function based on children or _children property
// node -> children or _children -> data: DataTypes.Employee
// check if there are open positions like openPositions.length > 0
export function checkForOpenPositions(node: any): boolean {
  console.log('node.data: ', node.data);
  if (node.data.openPositions.length > 0) {
    return true;
  }
  if (node.children) {
    for (const child of node.children) {
      if (checkForOpenPositions(child)) {
        return true;
      }
    }
  } else if (node._children) {
    for (const child of node._children) {
      if (checkForOpenPositions(child)) {
        return true;
      }
    }
  }
  return false;
}

export function downloadBlob(blob: Blob, filename: string) {
  // Create an object URL for the blob object
  const url = URL.createObjectURL(blob);

  // Create a new anchor element
  const a = document.createElement('a');

  // Set the href and download attributes for the anchor element
  // You can optionally set other attributes like `title`, etc
  // Especially, if the anchor element will be attached to the DOM
  a.href = url;
  a.download = filename || 'download';

  // Click handler that releases the object URL after the element has been clicked
  // This is required for one-off downloads of the blob content
  const clickHandler = () => {
    setTimeout(() => {
      URL.revokeObjectURL(url);
      removeEventListener('click', clickHandler);
    }, 150);
  };

  // Add the click event listener on the anchor element
  // Comment out this line if you don't want a one-off download of the blob content
  a.addEventListener('click', clickHandler, false);

  // Programmatically trigger a click on the anchor element
  // Useful if you want the download to happen automatically
  // Without attaching the anchor element to the DOM
  // Comment out this line if you don't want an automatic download of the blob content
  a.click();

  // Return the anchor element
  // Useful if you want a reference to the element
  // in order to attach it to the DOM or use it in some other way
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function debounce(callback: Function, wait = 500) {
  let timeoutId: any = null;
  return (...args: any[]) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
}

function extractNumberFromScale(scaleString: string) {
  // Use a regular expression to match the number inside the parentheses
  const match = scaleString.match(/scale\(([^)]+)\)/);

  // If a match is found, return the number; otherwise, return null
  return match ? parseFloat(match[1]) : null;
}

export function updateElementPosition(
  e: MouseEvent,
  element: HTMLDivElement | null
) {
  const transformed = element?.style.getPropertyValue('transform');
  const number = extractNumberFromScale(transformed || '');
  let top = 165;
  let left = 80;
  if (number) {
    const step = 0.1;
    const multiplier = Math.floor(Math.abs(number - 1) / step);
    const offset = 10 * (multiplier + 1);

    if (number < 1) {
      top = 160 + offset;
      left = 80 + offset;
    } else if (number > 1) {
      top = 165 - offset;
      left = 80 - offset;
    }
  }
  element?.style.setProperty('display', 'block');
  element?.style.setProperty('top', `${e.y - top}px`);
  element?.style.setProperty('left', `${e.x - left}px`);
}

export const downloadOrgChartExcelFile = (selectedCompany: number) => {
  api('GET /company/{id}/organogram/export', {
    params: {
      id: selectedCompany,
    },
  }).then((response) => {
    if (response.data) {
      // Blob object for the content to be download
      const blob = new Blob([response.data], { type: 'text/csv' });
      // Create a download link for the blob content
      downloadBlob(blob, `organogram-${new Date().toISOString()}.csv`);
    }
  });
};

export function prepareOrgChartData(
  employeesData: Partial<DataTypes.Employee>[]
): DataTypes.Employee[] {
  const employeesArray: Partial<DataTypes.Employee>[] = [];
  // extract openPositions from employees and add it to array as an employee object
  employeesData?.forEach((employee) => {
    employeesArray.push(employee);
    if (employee.openPositions && employee.openPositions.length > 0) {
      employee.openPositions.forEach((position) => {
        employeesArray.push({
          ...position,
          id: Math.floor(Math.random() * 100000),
          firstName: position.position?.name,
          lastName: '',
          tittle: position.tittle ?? 'N/A',
          parentId: employee.id,
          companyId: employee.companyId,
          departmentId: employee.departmentId,
          positionId: position.id,
          openPositions: [],
          internalEmployeeId: '',
          isOpenPosition: true,
          email: '',
          phoneNumber: '',
          yearsExperience: 0,
          locationId: 0,
          hireDate: '',
          createdAt: '',
          updatedAt: '',
          rating: 0,
          isTerminated: false,
        });
      });
    }
  });
  return employeesArray as DataTypes.Employee[];
}

export function getAllParents(node: any): any[] {
  const parents: any[] = [];

  function collectParents(current: any) {
    if (current?.parent) {
      parents.push(current.parent); // Add the parent to the list
      collectParents(current.parent); // Recursively collect the next parent
    }
  }

  collectParents(node);

  return parents;
}
