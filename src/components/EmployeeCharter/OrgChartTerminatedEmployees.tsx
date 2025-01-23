// eslint-disable-next-line import/no-extraneous-dependencies
import * as d3 from 'd3';
import { OrgChart } from 'd3-org-chart';
import React, { FC, useEffect, useRef } from 'react';

import { DataTypes } from '@/types/data';

import OrgChartTerminatedEmployeeProfile from './Profiles/OrgChartTerminatedEmployeeProfile';

type Props = {
  node: any;
  shouldShowSalary: boolean;
};

export const OrgChartTerminatedEmployees: FC<Props> = ({
  node,
  shouldShowSalary,
}) => {
  const d3Container = useRef(null);
  const refOrgChart = useRef(new OrgChart<DataTypes.Employee>());
  const children = node?.children ?? node?._children;
  const data = children
    .map((e: any) => e.data)
    .filter((e: any) => e.isTerminated);
  const nodeData = {
    ...node.data,
    parentId: null,
  };
  useEffect(() => {
    if (data && d3Container.current) {
      refOrgChart.current
        .container(d3Container.current)
        .data([nodeData, ...data])
        .nodeHeight(() => 100)
        .nodeWidth(() => 350)
        .svgHeight(600)
        .svgWidth(700)
        .initialZoom(0.7)
        .buttonContent(() => '')
        .setActiveNodeCentered(true)
        .scaleExtent([1, 1])
        .childrenMargin(() => 60)
        .compactMarginBetween(() => 35)
        .compactMarginPair(() => 40)
        .nodeUpdate(() => {
          // @ts-ignore
          d3.select(this).select('.node-rect').attr('stroke', 'none');
        })
        .neighbourMargin(() => 30)
        .nodeContent((d) =>
          OrgChartTerminatedEmployeeProfile(d, shouldShowSalary),
        )
        .render();
    }
  });
  return (
    <div>
      <div draggable="false" ref={d3Container} />
    </div>
  );
};
