import {
  BTN_HOVER_OPEN_POSITIONS,
  BTN_HOVER_TERMINATED,
  BTN_SELECT,
  BTN_SHOW_TERMINATED,
} from '@/utils/const';
import { checkForOpenPositions } from '@/utils/misc';

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
            ? '<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M0.818359 5.3799L3.80868 8.34946L10.5369 1.66797" stroke="#230E37" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>\n </svg>'
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
      <div style="display: flex; flex-direction: column; align-items: start; margin-left: .5rem; line-height: 13px; gap: 2px;">
        <h1 style="font-weight: 600; text-transform: capitalize;">
          ${d.data.firstName} ${d.data.lastName}
        </h1>
        
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
        
      </div>
    </div>
    <div style="display: flex; align-items: center; padding-left: 1rem; margin-top: .75rem; opacity: ${opacity}; padding-bottom: 5px;">
      <div style="display: flex; align-items: center; padding-left: 1rem; margin-left: 2rem;">
        ${
          d.data?.location
            ? `<svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M0 4C0 6.03216 1.69243 7.71041 3.52042 9.5231C3.67954 9.68088 3.83986 9.83986 4 10C4.16013 9.83987 4.32027 9.68107 4.47937 9.5233C6.30737 7.71061 8 6.03216 8 4C8 1.79086 6.20914 0 4 0C1.79086 0 0 1.79086 0 4ZM3.91296 5C4.63333 5 5.21731 4.44036 5.21731 3.75C5.21731 3.05964 4.63333 2.5 3.91296 2.5C3.19259 2.5 2.60861 3.05964 2.60861 3.75C2.60861 4.44036 3.19259 5 3.91296 5Z" fill="#0F172A"/>
        </svg>`
            : ''
        }

        <span style="font-size: 10px; color: #000; margin-right: 20px; margin-left: 2px;" >${
          d.data?.location
            ? `${d.data?.location?.city}, ${d.data?.location?.country}`
            : ''
        }
        </span>
    
      </div>
      <div class="${BTN_HOVER_OPEN_POSITIONS}" style="background: transparent; display: ${
    hasOpenPositions ? 'flex' : 'none'
  }; color: rgba(21, 163, 86, 1); margin-left: auto; margin-right: 1rem">
  
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M2.90386 1.65935C2.90386 0.742916 3.64678 0 4.56321 0H6.22256C7.139 0 7.88191 0.742917 7.88191 1.65935V1.77273C8.39767 1.81994 8.90927 1.88168 9.41628 1.95754C10.2205 2.07788 10.7858 2.77755 10.7858 3.57075V5.24847C10.7858 5.91837 10.38 6.54959 9.71479 6.77075C8.35571 7.2226 6.90244 7.46708 5.39291 7.46708C3.88336 7.46708 2.43007 7.22259 1.07098 6.77073C0.405789 6.54958 0 5.91835 0 5.24845V3.57075C0 2.77755 0.565234 2.07788 1.36949 1.95755C1.87651 1.88168 2.3881 1.81994 2.90386 1.77273V1.65935ZM7.05224 1.65935V1.70959C6.50335 1.67626 5.95008 1.65935 5.39289 1.65935C4.83571 1.65935 4.28242 1.67626 3.73354 1.70959V1.65935C3.73354 1.20113 4.105 0.829675 4.56321 0.829675H6.22256C6.68078 0.829675 7.05224 1.20113 7.05224 1.65935ZM5.39289 6.22256C5.622 6.22256 5.80773 6.03684 5.80773 5.80773C5.80773 5.57862 5.622 5.39289 5.39289 5.39289C5.16378 5.39289 4.97805 5.57862 4.97805 5.80773C4.97805 6.03684 5.16378 6.22256 5.39289 6.22256Z" fill="#15A356"/>
        <path d="M0.414838 8.93281V7.38628C0.538203 7.45394 0.669809 7.51169 0.809228 7.55804C2.25167 8.03761 3.79328 8.29675 5.39291 8.29675C6.99252 8.29675 8.53412 8.03761 9.97654 7.55805C10.116 7.5117 10.2476 7.45396 10.3709 7.38629V8.93281C10.3709 9.7359 9.79169 10.4415 8.97535 10.5498C7.80311 10.7055 6.60727 10.7858 5.39289 10.7858C4.1785 10.7858 2.98266 10.7055 1.81043 10.5498C0.994084 10.4415 0.414838 9.73589 0.414838 8.93281Z" fill="#15A356"/>
        </svg>

        <span style="font-size: 10px; font-style: italic; margin-left: 2px;" >${
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
