import React from 'react'
import FormHeading from './FormHeading'
import { HiMiniBriefcase } from 'react-icons/hi2'
import FormField from './FormField'
import InfoGrid from './InfoGrid'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { MdStickyNote2 } from 'react-icons/md'

const NotesSection = () => {
    const header = ["Note Tile", "Note", "Date Created", ""]
    const buttons = <div className="flex space-x-2">
        <button className="text-dark-navy"><FaEdit /></button>
        <button className="text-dark-navy"><FaTrash /></button>
    </div>
    const values = [
        ["Note Title",
            "aliquipLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            "01.01.2025", "", buttons],
        ["Note Title",
            "aliquipLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
            "01.01.2025", "", buttons]
    ]
    const colSpans = [1, 2, 1, 1]
    return (
        <div className='p-4 rounded-md  h-full'>

            <div className='p-6 rounded-[10px] border-gray-border border-[1px] bg-white my-5' >
                <div className='mb-6'>
                    <FormHeading icon={<MdStickyNote2 className='w-4' />} text='Note' />
                </div>
                <InfoGrid cols={5} headers={header} values={values} colSpans={colSpans} />


            </div>



        </div>
    )
}

export default NotesSection