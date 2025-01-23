import { usFormatNumber } from '@/utils/misc';

export default function (d: any, shouldShowSalary?: boolean) {
  const borderColor = !d.data.parentId ? '#97959980' : '#00853D';
  const bgColor = !d.data.parentId ? 'white' : '#BBFFDA';
  const bgColorNext = !d.data.parentId ? '#86699D' : '#230E37';
  return `<div class="profile-${d.data.id}" style="background-color: ${bgColor}; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); display: flex; flex-direction: column;  border-radius: 5px; border-width: 1.5px; border-color: ${borderColor}; border-style: solid; padding: .5rem; font-size: 11px;">
    <div style="display: flex; align-items: center; padding: 10px; height: 43px;">
        <div style="background-color: ${bgColorNext}; display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 25px; color: white">
          <img src="${!!d.data.parentId ? '/icons/open-positions-black.svg' : '/icons/user.svg'}"  alt="user">
        </div>
        <div style="display: flex; flex-direction: column; align-items: start; margin-left: .5rem; line-height: 13px">
          <div>
            ${d.data.tittle}
          </div>
          <div style="font-size: 12px; color: ${!d.data.parentId ? '#979599' : '#230E37'};">${d.data.position.name}</div>
          <div style="font-size: 12px; color: ${!d.data.parentId ? '#979599' : '#230E37'}; margin-top: .25rem; font-style: italic">${d.data.department.name}</div>
        </div>
      </div>
      <div style="display: ${!d.data.parentId ? 'flex' : 'none'}; padding-left: 1rem; margin-top: .75rem;">
        <div style="border: 1px solid #97959980; border-radius: 50px; height: 17px; width: 5rem; padding: 0 .75rem; display: flex; align-items: center; justify-content: center">
          <span>${d.data.salary ? usFormatNumber(d.data.salary) : 0}</span>
        </div>
        <div style="border: 1px solid #97959980; border-radius: 50px; height: 21px; width: 3rem; margin-left: .25rem; padding: 0 .75rem; display: flex; align-items: center; justify-content: center">
          <img src="/icons/rate-star.svg" alt="user group">
          <span style="font-size: 12px; margin-left: .25rem;">${d.data.rating ?? 5}</span>
        </div>
        <div style="color: #86699D; display: flex; align-items: center; margin-left: auto">
          <img src="/icons/user-group.svg" style="width: 1rem; height: 1rem;" alt="user group">
          <span style="font-size: 12px; font-style: italic">${d.data._directSubordinatesPaging}</span>
        </div>
    </div>
    <div style="display: flex; align-items: center; padding-left: 1rem; margin-top: .75rem; padding-bottom: 5px;">
      <div style="border: 1px solid ${shouldShowSalary ? '#97959980' : 'transparent'}; border-radius: 50px; height: 17px; width: 5rem; padding: 0 .75rem; display: flex; align-items: center; justify-content: center">
        <span style="font-size: 10px">${shouldShowSalary && d.data.salary ? usFormatNumber(d.data.salary) : ''}</span>
      </div>
    </div>
</div>`;
}
