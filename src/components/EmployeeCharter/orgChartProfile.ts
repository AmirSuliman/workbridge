import { IMAGES } from '@/constants/images';
import {
  BTN_SELECT,
  BTN_SHOW_TERMINATED,
  BTN_TERMINATE,
  BTN_HOVER_OPEN_POSITIONS,
  BTN_HOVER_TERMINATED,
} from '@/utils/const';
import { checkForOpenPositions, usFormatNumber } from '@/utils/misc';

type Props = {
  d: any;
  isTerminated: boolean;
  selectedEmployees: number[];
  terminatedParentIds: number[];
  totalTerminated: number;
  shouldShowSalary: boolean;
  hasTerminatedSubordinates: boolean;
  shouldTerminate: boolean;
  isTerminating: boolean;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function ({
  d,
  isTerminated,
  selectedEmployees,
  totalTerminated,
  shouldShowSalary,
  shouldTerminate,
  hasTerminatedSubordinates,
  isTerminating,
}: Props) {
  const isSelected = selectedEmployees.includes(d.data.id);
  const color = isTerminated ? '#EF4444' : isSelected ? '#230E37' : '#97959980';
  const opacity = isTerminating ? 0.2 : isTerminated ? 0.35 : 1;
  const hasOpenPositions =
    (d.data.openPositions && d.data.openPositions.length > 0) ||
    checkForOpenPositions(d);
  return `
  <div class=" profile-${d.data.id}" style="background-color: ${
    d.data._highlighted || d.data._upToTheRootHighlighted
      ? '#ecf0f1'
      : d.data.isOpenPosition
      ? '#BBFFDA'
      : 'white'
  }; 
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); display: flex; flex-direction: column; position: relative; border-radius: 5px; border-width: 1.5px; border-color: ${color}; border-style: solid; padding: .5rem; font-size: 11px;">
    <div style="display: ${
      d.data.isOpenPosition ? 'none' : 'flex'
    }; justify-content: space-between; padding: ${
    d.data.isOpenPosition ? '10px' : 0
  }">
      <div style="${!shouldTerminate ? 'block' : 'none'}"></div>
      <button class="${BTN_SELECT}" style="background: transparent; width: 12px; height: 12px; border: 1px solid #230E37; border-radius: 3px; display: flex; align-items: center; justify-content: center;">
        ${
          isSelected
            ? '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">\n          <path d="M0.818359 5.3799L3.80868 8.34946L10.5369 1.66797" stroke="#230E37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n        </svg>'
            : ''
        }
      </button>
    </div>
    <div style="display: flex; align-items: center; padding-left: 1rem; height: 35px; opacity: ${opacity};">
      <div style="background-color: #86699D; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 25px;">
        <img 
          src="${
            d.data.profilePictureUrl
              ? d.data.profilePictureUrl
              : `https://ui-avatars.com/api/?name=${d.data.firstName[0]}${d.data.lastName[0]}`
          }" 
          style="border-radius: 50%; width: 100%; height: 100%;" 
          alt="user" 
        />

      </div>
      <div style="display: flex; flex-direction: column; align-items: start; margin-left: .5rem; line-height: 13px">
        <div>
          ${d.data.firstName} ${d.data.lastName}
        </div>
        
       <div style="display: flex; align-items: start; gap: 4px;">
        <div style="font-size: 9px; color: rgba(15, 23, 42, 1);">${
          d.data.tittle
            ? d.data.tittle.toLowerCase() === 'employee'
              ? 'Job Title'
              : d.data.tittle
            : ''
        }</div>
        <span>•</span>
        <div style="font-size: 9px; color: rgba(15, 23, 42, 1);">${
          d.data.department.name
        }</div>
       </div>
        <div style="font-size: 9px; color: rgba(151, 149, 153, 1); margin-top: .25rem;">${
          d.data.employmentType ? d.data.employmentType : ''
        } <span>•</span> In-office <span>•</span>${
    d.data?.location ? d.data?.location.country : ''
  }</div>
      </div>
    </div>
    <div style="display: flex; align-items: center; padding-left: 1rem; margin-top: .75rem; opacity: ${opacity}; padding-bottom: 5px;">
      
      <div class="${BTN_HOVER_OPEN_POSITIONS}" style="background: transparent; display: ${
    hasOpenPositions ? 'flex' : 'none'
  }; color: #15A356; margin-left: auto; margin-right: 1rem">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          stroke-width="2" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          style="width: 12px; height: 12px; color: #000000;">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 7V5a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v2"></path>
          <line x1="2" y1="13" x2="22" y2="13"></line>
        </svg>

        <span style="font-size: 10px; font-style: italic">${
          d.data.openPositions.length > 0 ? d.data.openPositions.length : ''
        }</span>
      </div>
      
      <button class="${
        totalTerminated > 0 || !d.data.isOpenPosition
          ? BTN_SHOW_TERMINATED + ' ' + BTN_HOVER_TERMINATED
          : ''
      }" style="background-color: transparent; color: #A31515; display: ${
    hasTerminatedSubordinates ? 'flex' : 'none'
  }; align-items: center; margin-left: ${
    !hasOpenPositions && hasTerminatedSubordinates ? 'auto' : 0
  }; margin-right: 1rem">
          <img src="/user-group.svg" style="width: 12px; height: 12px;" alt="terminated user">
          <span style="font-size: 10px; font-style: italic">${
            totalTerminated > 0 ? totalTerminated : ''
          }</span>
      </button>
      <div style="color: #86699D; display: ${
        d.data.isOpenPosition ? 'none' : 'flex'
      }; align-items: center; margin-left: ${
    !hasOpenPositions && !hasTerminatedSubordinates ? 'auto' : 0
  };">
        <img src="/user-group.svg" style="width: 12px; height: 12px;" alt="user group">
        <span style="font-size: 10px; font-style: italic">${
          d.data._directSubordinatesPaging
        }</span>
      </div>
    </div>
</div>`;
}
