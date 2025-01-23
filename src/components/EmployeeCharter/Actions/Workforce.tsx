import clsx from 'clsx';
import React from 'react';

import { Spinner } from '@/components/Spinner';
import { DataTypes } from '@/types/data';

import RunAction = DataTypes.RunAction;

type Props = {
  action: RunAction | null;
  isActionLoading: boolean;
  handleSetAction: (action: RunAction) => void;
  user?: DataTypes.User;
};

export const Workforce: React.FC<Props> = ({
  action,
  isActionLoading,
  handleSetAction,
  user,
}) => {
  if (!user || user.role !== DataTypes.EUserRoles.SUPER_ADMIN) {
    return null;
  }
  return (
    <div>
      <div className="mb-1 text-right">Workforce Transformation</div>
      <div className="flex gap-4">
        <button
          value="terminate"
          name="action"
          disabled={isActionLoading}
          className={clsx(
            'flex space-x-1 items-center justify-center border border-230E37 text-sm h-8 w-30 rounded-full',
            action === RunAction.TERMINATE
              ? 'bg-red-700 text-white border-red-700'
              : '',
          )}
          onClick={() => handleSetAction(RunAction.TERMINATE)}
        >
          {action === RunAction.TERMINATE && isActionLoading && (
            <Spinner className="w-4 h-4" />
          )}
          <span>Terminate</span>
        </button>
        <button
          value="offshore"
          name="action"
          disabled={isActionLoading}
          className={clsx(
            'flex space-x-1 items-center justify-center border border-230E37 text-sm h-8 w-28 rounded-full',
            action === RunAction.OFFSHORE
              ? 'bg-primary text-white border-primary'
              : '',
          )}
          onClick={() => handleSetAction(RunAction.OFFSHORE)}
        >
          {action === RunAction.OFFSHORE && isActionLoading && (
            <Spinner className="w-4 h-4" />
          )}
          <span>Offshore</span>
        </button>
        <button
          value="upgrade"
          name="action"
          disabled={isActionLoading}
          className={clsx(
            'flex space-x-1 items-center justify-center border border-230E37 text-sm h-8 w-30 rounded-full',
            action === RunAction.UPGRADE
              ? 'bg-green-600 text-white border-green-600'
              : '',
          )}
          onClick={() => handleSetAction(RunAction.UPGRADE)}
        >
          {action === RunAction.UPGRADE && isActionLoading && (
            <Spinner className="w-4 h-4" />
          )}
          <span>Upgrade</span>
        </button>
      </div>
    </div>
  );
};
