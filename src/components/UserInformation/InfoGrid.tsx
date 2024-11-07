'use client'
import React from 'react';
import classNames from 'classnames';

interface InfoGridProps {
    headers: string[];
    values: React.ReactNode[][];
    cols?: number;
    colSpans?: number[]; // Array of cols=8;colSpans values for each column
}

const InfoGrid: React.FC<InfoGridProps> = ({ headers, values, cols = 8, colSpans = [] }) => {
    console.log(cols, "cols")
    return (
        <div className={classNames(`grid  gap-4 mb-2 mt-4`, `grid-cols-${cols}`)}>
            {/* Render Headers with Dynamic Column Span */}
            {headers.map((header, index) => {
                const span = colSpans[index] || 1;
                return (
                    <h3 key={index} className={classNames('text-xs text-gray-400 ', `col-span-${span}`)}>
                        {header}
                    </h3>
                );
            })}

            {/* Fill empty columns if headers have fewer than 8 items */}
            {headers.length < 8 &&
                Array.from({ length: 8 - headers.length }).map((_, idx) => (
                    <h3 key={`empty-header-${idx}`} />
                ))}

            {/* Horizontal line spanning all columns */}
            <hr className="col-span-8" />

            {/* Render Rows with Dynamic Column Span */}
            {values.map((row, rowIndex) => (
                <React.Fragment key={rowIndex}>
                    {row.map((value, colIndex) => {
                        const span = colSpans[colIndex] || 1; // Use colSpans from prop or 1 by default
                        return (
                            <div key={`${rowIndex}-${colIndex}`} className={classNames('text-xs text-dark-navy my-1.5 ', `col-span-${span}`)}>
                                {value}
                            </div>
                        );
                    })}

                    {/* Fill empty columns if the row has fewer than 8 items */}
                    {row.length < 8 &&
                        Array.from({ length: 8 - row.length }).map((_, idx) => (
                            <div key={`empty-row-${rowIndex}-${idx}`} />
                        ))}
                </React.Fragment>
            ))}
        </div>
    );
};

export default InfoGrid;
