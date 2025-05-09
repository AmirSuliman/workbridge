import { RootState } from '@/store/store';
import { BTN_HOVER_OPEN_POSITIONS } from '@/utils/const';
import { checkForOpenPositions } from '@/utils/misc';
import { useSelector } from 'react-redux';

const OrgChartNode = ({ d, actualSubordinates }) => {
  const user = useSelector((state: RootState) => state.myInfo);
  const role = user?.user?.role;

  const isUserPanel = role === 'ViewOnly' || role === 'Manager';
  const directSubordinatesCount = actualSubordinates[d.data.id] || 0;
  const hasOpenPositions =
    d.data.openPositions?.length > 0 || checkForOpenPositions(d);
  const nodeDiv = document.createElement('div');
  nodeDiv.style.width = `${d.width}px`;
  nodeDiv.style.height = `${d.height}px`;
  nodeDiv.style.backgroundColor =
    d.data._highlighted || d.data._upToTheRootHighlighted
      ? '#D5F6DD'
      : d.data.isOpenPosition
        ? '#D5F6DD'
        : 'white';
  nodeDiv.style.border = `1.5px solid ${
    d.data.selectedEmployees?.includes(d.data.id) ? '#230E37' : '#97959980'
  }`;
  nodeDiv.style.borderRadius = '5px';
  nodeDiv.style.padding = '0.5rem';
  nodeDiv.style.display = 'flex';
  nodeDiv.style.flexDirection = 'column';

  nodeDiv.innerHTML = `
          <div class="profile-${d.data.id}" >
            <div style="display: flex; align-items: center; padding-left: 1rem; height: 35px; ">
              <div style="background-color: #86699D; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 25px;">
                ${
                  d.data?.isOpenPosition
                    ? `<svg
                      width="59"
                      height="58"
                      viewBox="0 0 59 58"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        cx="29.1447"
                        cy="28.9513"
                        r="28.9513"
                        fill="#0F172A"
                      />
                      <path
                        d="M21.1934 23.125C21.1934 20.8468 23.0402 19 25.3184 19C27.5965 19 29.4434 20.8468 29.4434 23.125C29.4434 25.4032 27.5965 27.25 25.3184 27.25C23.0402 27.25 21.1934 25.4032 21.1934 23.125Z"
                        fill="white"
                      />
                      <path
                        d="M30.9434 25.375C30.9434 23.511 32.4544 22 34.3184 22C36.1823 22 37.6934 23.511 37.6934 25.375C37.6934 27.239 36.1823 28.75 34.3184 28.75C32.4544 28.75 30.9434 27.239 30.9434 25.375Z"
                        fill="white"
                      />
                      <path
                        d="M18.1934 35.875C18.1934 31.94 21.3833 28.75 25.3184 28.75C29.2534 28.75 32.4434 31.94 32.4434 35.875V35.8776C32.4433 35.9174 32.443 35.9574 32.4423 35.9969C32.438 36.2554 32.3008 36.4935 32.0793 36.6268C30.1041 37.8161 27.7899 38.5 25.3184 38.5C22.8468 38.5 20.5327 37.8161 18.5574 36.6268C18.3359 36.4935 18.1987 36.2554 18.1944 35.9969C18.1937 35.9564 18.1934 35.9157 18.1934 35.875Z"
                        fill="white"
                      />
                      <path
                        d="M33.9432 35.8781C33.9432 35.9262 33.9428 35.9744 33.942 36.0222C33.9363 36.3608 33.8546 36.6878 33.709 36.982C33.9106 36.9939 34.1137 37 34.3182 37C35.9139 37 37.4254 36.6303 38.7698 35.9713C39.0168 35.8502 39.1777 35.6036 39.189 35.3287C39.1918 35.2611 39.1932 35.1932 39.1932 35.125C39.1932 32.4326 37.0106 30.25 34.3182 30.25C33.5718 30.25 32.8645 30.4178 32.2321 30.7176C33.3068 32.1561 33.9432 33.9412 33.9432 35.875V35.8781Z"
                        fill="white"
                      />
                    </svg>`
                    : `<img 
                  src="${
                    d.data.profilePictureUrl ||
                    `https://ui-avatars.com/api/?name=${d.data.firstName[0]}${d.data.lastName[0]}`
                  }" 
                  style="border-radius: 50%; width: 100%; height: 100%;" 
                  alt="user" 
                />`
                }
              </div>
              <div style="display: flex; flex-direction: column; align-items: start; margin-left: .5rem; line-height: 13px; gap: 2px;">
                <h1 style="font-weight: 600; text-transform: capitalize;">
                  ${d.data.firstName} ${d.data.lastName}
                </h1>
                <div style="display: flex; align-items: start; gap: 4px;">
                  <div style="font-size: 9px; color: rgba(15, 23, 42, 1);">
                    ${d.data.tittle}
                  </div>
                  <span>•</span>
                  <div style="font-size: 9px; color: rgba(15, 23, 42, 1);">
                    ${d.data.department?.name}
                  </div>
                </div>
              </div>
            </div>
            <div style="display: flex; align-items: center; padding-left: 1rem; margin-top: .75rem;  padding-bottom: 5px;">
                  <div style="display: flex; align-items: center; padding-left: 1rem; margin-left: 2rem; white-space: nowrap;">
                    ${
                      d.data?.location
                        ? `<svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 4C0 6.03216 1.69243 7.71041 3.52042 9.5231C3.67954 9.68088 3.83986 9.83986 4 10C4.16013 9.83987 4.32027 9.68107 4.47937 9.5233C6.30737 7.71061 8 6.03216 8 4C8 1.79086 6.20914 0 4 0C1.79086 0 0 1.79086 0 4ZM3.91296 5C4.63333 5 5.21731 4.44036 5.21731 3.75C5.21731 3.05964 4.63333 2.5 3.91296 2.5C3.19259 2.5 2.60861 3.05964 2.60861 3.75C2.60861 4.44036 3.19259 5 3.91296 5Z" fill="#0F172A"/>
                    </svg>`
                        : ''
                    }
            
                    <span style="font-size: 10px; color: #000; margin-right: 20px; margin-left: 2px;" >${
                      d.data?.location
                        ? `${
                            d.data?.location?.city
                              ? d.data?.location?.city + ','
                              : ''
                          } ${d.data?.location?.country}`
                        : ''
                    }
                    </span>
                
                  </div>
            ${
              d.data.isOpenPosition
                ? `<a
                style="width: 100%; height: fit-content"
                href=${
                  isUserPanel
                    ? `https://dev.isaconsulting.com/job/${
                        d.data.id.split('-')[2]
                      }`
                    : `/hr/hiring/job/${d.data.id.split('-')[2]}`
                }
              >
                <button
                  style="font-size:9px; padding-top: 2px; font-weight: 400; background: #0F172A; color: white; border-radius: 3px; padding: 8px 14px; margin-right: 0; margin-left: auto; display: block;"
                >See Position</button>
              </a>`
                : `<div class="${BTN_HOVER_OPEN_POSITIONS}" style="background: transparent; display: ${
                    hasOpenPositions ? 'flex' : 'none'
                  }; color: rgba(21, 163, 86, 1); margin-left: auto; margin-right: 1rem">
              
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.90386 1.65935C2.90386 0.742916 3.64678 0 4.56321 0H6.22256C7.139 0 7.88191 0.742917 7.88191 1.65935V1.77273C8.39767 1.81994 8.90927 1.88168 9.41628 1.95754C10.2205 2.07788 10.7858 2.77755 10.7858 3.57075V5.24847C10.7858 5.91837 10.38 6.54959 9.71479 6.77075C8.35571 7.2226 6.90244 7.46708 5.39291 7.46708C3.88336 7.46708 2.43007 7.22259 1.07098 6.77073C0.405789 6.54958 0 5.91835 0 5.24845V3.57075C0 2.77755 0.565234 2.07788 1.36949 1.95755C1.87651 1.88168 2.3881 1.81994 2.90386 1.77273V1.65935ZM7.05224 1.65935V1.70959C6.50335 1.67626 5.95008 1.65935 5.39289 1.65935C4.83571 1.65935 4.28242 1.67626 3.73354 1.70959V1.65935C3.73354 1.20113 4.105 0.829675 4.56321 0.829675H6.22256C6.68078 0.829675 7.05224 1.20113 7.05224 1.65935ZM5.39289 6.22256C5.622 6.22256 5.80773 6.03684 5.80773 5.80773C5.80773 5.57862 5.622 5.39289 5.39289 5.39289C5.16378 5.39289 4.97805 5.57862 4.97805 5.80773C4.97805 6.03684 5.16378 6.22256 5.39289 6.22256Z" fill="#15A356"/>
                <path d="M0.414838 8.93281V7.38628C0.538203 7.45394 0.669809 7.51169 0.809228 7.55804C2.25167 8.03761 3.79328 8.29675 5.39291 8.29675C6.99252 8.29675 8.53412 8.03761 9.97654 7.55805C10.116 7.5117 10.2476 7.45396 10.3709 7.38629V8.93281C10.3709 9.7359 9.79169 10.4415 8.97535 10.5498C7.80311 10.7055 6.60727 10.7858 5.39289 10.7858C4.1785 10.7858 2.98266 10.7055 1.81043 10.5498C0.994084 10.4415 0.414838 9.73589 0.414838 8.93281Z" fill="#15A356"/>
                </svg>
        
                <span style="font-size: 10px; font-style: italic; margin-left: 2px;" >${
                  d.data.openPositions.length > 0
                    ? d.data.openPositions.length
                    : ''
                }</span>
              </div>
              
              
              ${
                directSubordinatesCount
                  ? `<div style="color: #86699D; display: flex; align-items: center; margin-left: auto;">
                <img src="/user-group.svg" style="width: 12px; height: 12px;" alt="user group">
                <span style="font-size: 10px; font-style: italic">${directSubordinatesCount}</span>
              </div>`
                  : ``
              }`
            }
            </div>
          </div>
        `;
  return nodeDiv.outerHTML;
};
export default OrgChartNode;
