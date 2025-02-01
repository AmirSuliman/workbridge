import * as d3 from 'd3';
// eslint-disable-next-line import/no-extraneous-dependencies
import { HierarchyNode } from 'd3-hierarchy';
import { OrgChart } from 'd3-org-chart';
import { debounce } from 'lodash';
import Link from 'next/link';
import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

// import Modal from '@/components/NewModal';
import { useModal } from '@/hooks/use-modal';
import { DataTypes } from '@/types/data';
import {
  BTN_MODAL_CLASS_NAME,
  BTN_TERMINATE,
  BTN_SELECT,
  BTN_SHOW_TERMINATED,
  BTN_HOVER_OPEN_POSITIONS,
  BTN_HOVER_TERMINATED,
} from '@/utils/const';
import {
  checkForTerminatedEmployees,
  updateElementPosition,
} from '@/utils/misc';
// import orgChartProfile from '@/views/Companies/orgChartProfile';
// import OrgChartOpenPositionProfile from '@/views/OrgChart/Profiles/OrgChartOpenPositionProfile';
import { EmployeeData } from '@/types/employee';
import { OrgChartTerminatedEmployees } from './OrgChartTerminatedEmployees';
import OrgChartOpenPositionProfile from './Profiles/OrgChartOpenPositionProfile';
import orgChartProfile from './orgChartProfile';

type Props = {
  terminatedEmployees: EmployeeData[];
  onTerminate: (employee: EmployeeData, node: any) => void;
  employees: EmployeeData[];
  onSelectedEmployees: (selectedEmployees: number) => void;
  selectedEmployees: number[];
  search: string;
  refOrgChart2: any;
  compact: boolean;
  terminatedParents: number[];
  totalTerminated: Record<number, number>;
  user?: DataTypes.User;
};

export const OrgChartComponent: FC<Props> = ({
  terminatedEmployees,
  onTerminate,
  search,
  employees,
  compact,
  terminatedParents,
  onSelectedEmployees,
  selectedEmployees,
  totalTerminated,
  refOrgChart2,
  user,
}) => {
  const d3Container = useRef(null);
  const refOrgChart = useRef(new OrgChart<EmployeeData>());
  const modal = useModal();
  const showTerminatedEmployeesModal = useModal();
  const openPositionsCnt = useRef<HTMLDivElement | null>(null);
  const terminatedCnt = useRef<HTMLDivElement | null>(null);
  const [selectedNode, setSelectedNode] =
    useState<HierarchyNode<EmployeeData> | null>(null);
  const [employee, setEmployee] = useState<any>(null);
  const [isTerminating, setIsTerminating] = useState<Record<number, boolean>>(
    {}
  );

  function detectCycle(employee) {
    const visited = new Set();
    const stack = new Set();

    const hasCycle = (nodeId, idMap) => {
      if (stack.has(nodeId)) return true; // Cycle detected
      if (visited.has(nodeId)) return false;

      visited.add(nodeId);
      stack.add(nodeId);

      const node = idMap[nodeId];
      if (node && node.parentId) {
        if (hasCycle(node.parentId, idMap)) {
          return true;
        }
      }

      stack.delete(nodeId);
      return false;
    };

    const idMap = employee.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {});

    for (const node of employee) {
      if (hasCycle(node.id, idMap)) {
        console.log('Cycle detected at node:', node);
        return true;
      }
    }

    return false;
  }

  const hasCycle = detectCycle(employees);
  console.log('Cycle detected:', hasCycle);

  const handleClickNode = useCallback(
    ({ data }: HierarchyNode<EmployeeData>) => {
      setEmployee(data);
      modal.openModal();
    },
    [modal]
  );

  const hideElement = (element: HTMLElement | null) => {
    element?.style.setProperty('display', 'none');
  };

  function filterChart(value: string) {
    // Clear previous higlighting
    refOrgChart.current.clearHighlighting();

    // Get chart nodes
    const data = refOrgChart.current.data();

    // Mark all previously expanded nodes for collapse
    data?.forEach((d) => (d._expanded = false));

    // Loop over data and check if input value matches any name
    data?.forEach((d) => {
      if (
        value != '' &&
        Object.values(d).join(' ').toLowerCase().includes(value.toLowerCase())
      ) {
        // If matches, mark node as highlighted
        d._highlighted = true;
        d._expanded = true;
      }
    });

    // Update data and rerender graph
    refOrgChart.current.data(data).render();
  }

  const handleTerminate = useCallback(
    (employeeId: number, node: any) => {
      setIsTerminating({
        ...isTerminating,
        [employeeId]: true,
      });
    },
    [isTerminating]
  );

  const processChange = debounce(() => filterChart(search), 1000);

  useEffect(() => {
    if (search.length > 0) {
      processChange();
    }
  }, [processChange, search]);

  // We need to manipulate DOM
  useLayoutEffect(() => {
    if (employees && d3Container.current && !hasCycle) {
      refOrgChart2.current = refOrgChart.current;
      refOrgChart.current
        .container(d3Container.current)
        .data(employees)
        .nodeHeight(() => 100)
        .nodeWidth(() => 300)
        .setActiveNodeCentered(false)
        .svgHeight(window.innerHeight)
        // .nodeButtonY(() => -50)
        .compact(compact)
        .childrenMargin(() => 60)
        .compactMarginBetween(() => 25)
        .onZoomStart(() => {
          openPositionsCnt.current?.style.setProperty('display', 'none');
        })

        .compactMarginPair(() => 40)
        .neighbourMargin(() => 20)
        .onNodeClick((node: any) => {
          if (node.data._upToTheRootHighlighted) {
            refOrgChart.current.clearHighlighting();
          } else {
            refOrgChart.current.setUpToTheRootHighlighted(node.id).render();
          }
        })
        .nodeContent((data: any) => {
          // props.onTerminate(isEmployeeTerminated);
          if (data.data.isOpenPosition) {
            return OrgChartOpenPositionProfile(
              data,
              user?.role === DataTypes.EUserRoles.SUPER_ADMIN
            );
          }
          const isTerminated = terminatedEmployees.some(
            (e) => e.id === data.data.id
          );
          const isTerminatedParent =
            terminatedParents.indexOf(data.data.id) > -1;
          const hasTerminatedSubordinates =
            totalTerminated[data.id] > 0 ||
            checkForTerminatedEmployees(
              data,
              terminatedEmployees as unknown as DataTypes.Employee[]
            ) ||
            isTerminatedParent;
          return orgChartProfile({
            d: data,
            isTerminated,
            selectedEmployees,
            hasTerminatedSubordinates,
            isTerminating: isTerminating[data.id],
            terminatedParentIds: terminatedParents,
            totalTerminated: totalTerminated[data.id],
            shouldShowSalary: user?.role === DataTypes.EUserRoles.SUPER_ADMIN,
            shouldTerminate: user?.role !== DataTypes.EUserRoles.VIEW_ONLY,
          });
        })
        .nodeUpdate(function (node) {
          const id = node.data.id as number;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3.select(this)
            .select(`.${BTN_MODAL_CLASS_NAME}`)
            .on('click', (e) => {
              e.stopPropagation();
              handleClickNode(node);
            });
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3.select(this)
            .select(`.${BTN_SELECT}`)
            .on('click', (e) => {
              e.stopPropagation();
              onSelectedEmployees(id);
            });
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3.select(this)
            .select(`.${BTN_TERMINATE}`)
            .on('click', (e) => {
              e.stopPropagation();
              handleTerminate(id, node);
            });

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3.select(this)
            .select(`.${BTN_SHOW_TERMINATED}`)
            .on('click', (e) => {
              e.stopPropagation();
              setSelectedNode(node);
              terminatedCnt.current?.style.setProperty('display', 'none');
              openPositionsCnt.current?.style.setProperty('display', 'none');
              showTerminatedEmployeesModal.openModal();
            });

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3.select(this)
            .select(`.${BTN_HOVER_OPEN_POSITIONS}`)
            .on('mouseover', (e) => {
              e.stopPropagation();
              updateElementPosition(e, openPositionsCnt.current);
            });

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3.select(this)
            .select(`.${BTN_HOVER_TERMINATED}`)
            .on('mouseover', (e) => {
              e.stopPropagation();
              updateElementPosition(e, terminatedCnt.current);
            });

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3.select(this)
            .select(`.${BTN_HOVER_OPEN_POSITIONS}`)
            .on('mouseout', (e) => {
              e.stopPropagation();
              hideElement(openPositionsCnt.current);
            });

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3.select(this)
            .select(`.${BTN_HOVER_TERMINATED}`)
            .on('mouseout', (e) => {
              e.stopPropagation();
              hideElement(terminatedCnt.current);
            });

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3.select(this)
            .select('.node-rect')
            .attr('stroke', (d: any) =>
              d.data._highlighted || d.data._upToTheRootHighlighted
                ? '#6315A3'
                : 'none'
            )
            .attr(
              'stroke-width',
              node.data._highlighted || node.data._upToTheRootHighlighted
                ? 5
                : 1
            );
        })
        .linkUpdate(function (d) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          d3.select(this)
            .attr('stroke', () =>
              d.data._upToTheRootHighlighted ? '#6315A3' : '#E4E2E9'
            )
            .attr('stroke-width', d.data._upToTheRootHighlighted ? 3 : 1);
          // will raise the highlighted link to the top
          if (d.data._upToTheRootHighlighted) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            d3.select(this).raise();
          }
        })
        .render();
    }

    return () => {
      const nodes = document.querySelectorAll(`.${BTN_MODAL_CLASS_NAME}`);
      const btnHoverOpenPositions = document.querySelectorAll(
        `.${BTN_HOVER_OPEN_POSITIONS}`
      );
      btnHoverOpenPositions.forEach((_, i) => {
        const btn = btnHoverOpenPositions[i] as HTMLElement;
        btn.removeEventListener('mouseover', () => console.log('hover'));
      });

      nodes.forEach((_, i) => {
        const btn = nodes[i] as HTMLElement;
        const employeeNode = employees[
          i
        ] as unknown as HierarchyNode<EmployeeData>;
        btn.removeEventListener('click', () => handleClickNode(employeeNode));
      });
    };
  }, [
    modal,
    compact,
    hasCycle,
    employees,
    user?.role,
    refOrgChart,
    refOrgChart2,
    isTerminating,
    handleTerminate,
    handleClickNode,
    totalTerminated,
    selectedEmployees,
    terminatedParents,
    terminatedEmployees,
    onSelectedEmployees,
    showTerminatedEmployeesModal,
  ]);

  return (
    <div className="h-[calc(100vh-22rem)] overflow-hidden relative">
      {hasCycle && (
        <div className="border-b-[1px] border-gray-border px-6 py-4">
          <h1>There is a cycle in the data</h1>
        </div>
      )}
      <div
        className="shadow-lg w-80 bg-white rounded-lg h-24 border p-4 absolute hidden"
        ref={openPositionsCnt}
      >
        <div className="flex mb-2 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              width: '20px',
              height: '20px',
              color: '#000000',
              marginRight: '1rem',
            }}
          >
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 7V5a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v2"></path>
            <line x1="2" y1="13" x2="22" y2="13"></line>
          </svg>
          <div className="text-sm">Open Positions</div>
        </div>
        <div className="text-xs">
          There are open positions further down the node who report directly or
          indirectly to this individual.
        </div>
      </div>
      <div
        className="w-80 bg-white rounded-lg h-24 border p-4 absolute hidden"
        ref={terminatedCnt}
      >
        <div className="flex mb-2">
          {/* <img
            src="/icons/terminated-hover.svg"
            alt="terminated"
            className="mr-2"
          /> */}
          <div className="text-sm">Selected Employees</div>
        </div>
        <div className="text-xs">
          There are employees further down the node who report directly or
          indirectly to this individual.
        </div>
      </div>
      <div ref={d3Container} />
      {/* <Modal
        contentClassName="w-96"
        showDialog={modal.showDialog}
        onDismiss={modal.closeModal}
      >
        <div className="flex flex-col px-8 pb-2 text-230E37 text-sm">
          <Link target="_blank" href={`/employees/${employee?.id}`}>
            <button className="flex items-center space-x-2">
              <UserIcon className="w-6 h-6" />
              <span>Go to employee</span>
            </button>
          </Link>
          <button className="flex items-center space-x-2 mt-4">
            <ArrowPathIcon className="w-6 h-6" />
            <span>Change Reporting Manager</span>
          </button>
          <button className="flex items-center space-x-2 mt-12">
            <TrashIcon className="w-6 h-6 text-red-600" />
            <span>Terminate Employee</span>
          </button>
        </div>
      </Modal>
      <Modal
        size="large"
        contentClassName="overflow-y-auto"
        title="Terminated Employees"
        showDialog={showTerminatedEmployeesModal.showDialog}
        onDismiss={showTerminatedEmployeesModal.closeModal}
      >
        <OrgChartTerminatedEmployees
          node={selectedNode}
          shouldShowSalary={
            !!user && user?.role === DataTypes.EUserRoles.SUPER_ADMIN
          }
        />
      </Modal> */}
    </div>
  );
};
