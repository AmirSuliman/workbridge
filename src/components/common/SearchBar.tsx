'use client';
import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Using Font Awesome for the search icon

interface SearchInputProps {
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  value = '',
  onChange = () => {},
}) => {
  return (
    <div className='relative w-full max-w-sm'>
      <input
        type='search'
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='pl-10 pr-2 py-2 w-full border border-gray-border rounded-[5px] outline-none focus:outline-none ring-0 text-xs text-dark-gray '
      />
      <FaSearch className='absolute left-3 top-1/2 transform -translate-y-1/2 text-dark-navy' />
    </div>
  );
};

export default SearchInput;
