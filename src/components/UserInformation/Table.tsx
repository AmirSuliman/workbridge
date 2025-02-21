'use client';
import React, { useState } from 'react';
import { BiLoaderCircle } from 'react-icons/bi';

// Utility function to get a nested property by string accessor
const getNestedValue = (obj: Object, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

interface Header {
  title: string;
  accessor: string; // The path to the data field, e.g., "user.address.street"
  render?: (value: any, context: { row: any; col: any }) => React.ReactNode;
}

interface TableConfig {
  selectable?: boolean;
  rowBorder?: boolean;
}

interface TableProps {
  headers: Header[];
  values: { [key: string]: any }[]; // Array of objects
  tableConfig?: TableConfig;
  onSelectionChange?: (selectedRows: { [key: string]: any }[]) => void;
  isLoading?: boolean; // Handle loading state
  loader?: React.ReactNode; // Custom loader component
}

const Table: React.FC<TableProps> = ({
  headers,
  values,
  tableConfig = {},
  onSelectionChange,
  isLoading = false,
  loader = <div className='h-full'><BiLoaderCircle className="mt-[5%] h-8 w-8 animate-spin mx-auto" /></div>,
}) => {
  const [selectedRows, setSelectedRows] = useState<{ [key: string]: any }[]>([]);

  const handleRowSelection = (rowData: { [key: string]: any }) => {
    const isSelected = selectedRows.some((row) => row === rowData);
    let newSelectedRows;

    if (isSelected) {
      newSelectedRows = selectedRows.filter((row) => row !== rowData);
    } else {
      newSelectedRows = [...selectedRows, rowData];
    }

    setSelectedRows(newSelectedRows);

    // Notify parent of selected rows
    if (onSelectionChange) {
      onSelectionChange(newSelectedRows);
    }
  };

  return (
    <div className="overflow-x-auto max-w-[86vw] min-h-[40vh] sm:w-full">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr>
            {tableConfig.selectable && (
              <th className="text-xs py-2 px-2 text-gray-400 whitespace-nowrap"></th>
            )}
            {headers.map((header) => (
              <th
                key={header.accessor}
                className="text-xs text-left py-2 px-2 text-gray-400 whitespace-nowrap font-[500]"
              >
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody        >
          {isLoading ? (
            <tr>
              <td
                colSpan={headers.length + (tableConfig.selectable ? 1 : 0)}
                className="text-center py-6"
              >
                {loader}
              </td>
            </tr>
          ) : values.length > 0 ? (
            values.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={tableConfig.rowBorder ? 'border-b' : ''}
              >
                {tableConfig.selectable && (
                  <td className="text-center py-2 px-2">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row)}
                      onChange={() => handleRowSelection(row)}
                      className="form-checkbox h-4 w-4 text-gray-border hover:cursor-pointer"
                    />
                  </td>
                )}
                {headers.map((header) => {
                  const cellValue = getNestedValue(row, header.accessor);

                  // If render is provided, use it to render the cell; otherwise, display the raw value
                  const content = header.render
                    ? header.render(cellValue, { row, col: header.accessor })
                    : cellValue;

                  return (
                    <td
                      key={`${rowIndex}-${header.accessor}`}
                      className="text-xs py-2 px-2 text-dark-navy"
                    >
                      {content as any}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length + (tableConfig.selectable ? 1 : 0)}
                className="text-center py-6 text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
