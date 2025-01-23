import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { BookmarkIcon, DocumentArrowDownIcon } from '@heroicons/react/24/solid';
import React from 'react';

import { Button } from '@/components/Button';
import { downloadOrgChartExcelFile } from '@/utils/misc';

type Props = {
  selectedCompany: number;
  refOrgChart: React.RefObject<any>;
  saveViewRef: React.RefObject<any>;
};

export const ExportActions: React.FC<Props> = ({
  selectedCompany,
  refOrgChart,
  saveViewRef,
}) => (
  <div className="flex space-x-4 items-center">
    <Button
      className="px-8 !py-2 w-32"
      onClick={() => downloadOrgChartExcelFile(selectedCompany)}
    >
      <DocumentArrowDownIcon className="w-4 h-4 mr-2" />
      Export
    </Button>
    <Button
      className="px-8 !py-2 w-32"
      onClick={() => refOrgChart.current.exportImg({ full: true })}
    >
      <PhotoIcon className="w-4 h-4 mr-2" />
      Export
    </Button>
    <button
      className="flex items-center bg-primary w-32 text-white px-4 py-2 rounded-full text-sm"
      onClick={() => saveViewRef.current?.show()}
    >
      <BookmarkIcon className="text-white mr-2 w-4 h-4" />
      Save View
    </button>
    <div>
      <button className="w-8 h-8 border border-primary rounded-full flex items-center justify-center">
        <XMarkIcon className="w-4 h-4" />
      </button>
    </div>
  </div>
);
