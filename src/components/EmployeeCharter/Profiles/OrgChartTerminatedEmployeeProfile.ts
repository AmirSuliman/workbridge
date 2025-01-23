import { usFormatNumber } from '@/utils/misc';

export default function (d: any, shouldShowSalary?: boolean) {
  const color = d.data.isTerminated ? '#EF4444' : '#97959980';
  const opacity = d.data.isTerminated ? 0.35 : 1;
  return `<div class="profile-${d.data.id}" style="background-color: white; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); display: flex; flex-direction: column;  border-radius: 10px; border-width: 1.5px; border-color: ${color}; border-style: solid; padding: .5rem; font-size: 12px;">
    <div style="display: flex; align-items: center; padding-left: 1rem; height: 3.75rem; opacity: ${opacity}; font-size: 14px;">
        <div style="background-color: #86699D; display: flex; align-items: center; justify-content: center; width: 45px; height: 45px; border-radius: 50px;">
          <img src="/icons/user.svg"  alt="user">
        </div>
        <div style="display: flex; flex-direction: column; align-items: start; margin-left: .5rem; line-height: 18px">
          <div>
            ${d.data.firstName} ${d.data.lastName}
          </div>
          <div style="font-size: 12px; color: #979599;">${d.data.tittle}</div>
          <div style="font-size: 12px; color: #979599; margin-top: .25rem; font-style: italic">${d.data.location?.location}</div>
        </div>
      </div>
    <div style="display: flex; padding-left: 1rem; margin-top: .75rem; opacity: ${opacity};">
      <div style="border: 1px solid #97959980; border-radius: 50px; height: 21px; width: 5rem; padding: 0 .75rem; display: ${shouldShowSalary ? 'flex' : 'none'}; align-items: center; justify-content: center">
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
</div>`;
}
