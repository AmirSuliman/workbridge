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
// import { OrgChartTerminatedEmployees } from './OrgChartTerminatedEmployees';
import OrgChartOpenPositionProfile from './Profiles/OrgChartOpenPositionProfile';
import orgChartProfile from './orgChartProfile';
import Button from '../Button';

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
  function detectMultipleRoots(employees) {
    const rootNodes = employees.filter((emp) => emp.parentId === null);

    if (rootNodes.length > 1) {
      console.error('Multiple root nodes detected:', rootNodes);
      return rootNodes; // Returns the list of multiple roots for debugging
    }

    return [];
  }

  const multipleRoots = detectMultipleRoots(employees);
  console.log('Multiple roots detected:', multipleRoots.length > 0);

  const hasMultiRoots = multipleRoots.length > 0;

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
    if (employees && d3Container.current && !hasMultiRoots && !hasCycle) {
      refOrgChart2.current = refOrgChart.current;
      refOrgChart.current
        .container(d3Container.current)
        .data(employees)
        .nodeHeight(() => 95)
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
          // console.log("node data:", data)
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
              // hideElement(openPositionsCnt.current);
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
                ? '#00B87D'
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
              d.data._upToTheRootHighlighted ? '#00B87D' : '#E4E2E9'
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
    hasMultiRoots,
    totalTerminated,
    selectedEmployees,
    terminatedParents,
    terminatedEmployees,
    onSelectedEmployees,
    showTerminatedEmployeesModal,
  ]);
  console.log('employees: ', employees);
  return (
    <div className="h-[calc(100vh-10rem)] overflow-hidden relative">
      {hasMultiRoots && (
        <div className="border-b-[1px] border-gray-border px-6 py-4">
          <h1>There are multiple roots in the data</h1>
        </div>
      )}
      {hasCycle && (
        <div className="border-b-[1px] border-gray-border px-6 py-4">
          <h1>There is a cycle in the data</h1>
        </div>
      )}
      <div
        className="shadow-lg w-fit bg-[#D5F6DD] rounded-lg h-fit border-[1.5px] border-[#00B87D] p-4 absolute hidden"
        ref={openPositionsCnt}
      >
        <div className="flex gap-2 relative">
          {/* 3 dots */}
          <svg
            className="absolute top-0 right-0 "
            width="13"
            height="4"
            viewBox="0 0 13 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.0901 1.98438C12.0901 2.6208 11.5742 3.13672 10.9377 3.13672C10.3013 3.13672 9.7854 2.6208 9.7854 1.98438C9.7854 1.34795 10.3013 0.832031 10.9377 0.832031C11.5742 0.832031 12.0901 1.34795 12.0901 1.98438Z"
              fill="#0F172A"
            />
            <path
              d="M7.19751 1.98438C7.19751 2.6208 6.68159 3.13672 6.04517 3.13672C5.40874 3.13672 4.89282 2.6208 4.89282 1.98438C4.89282 1.34795 5.40874 0.832031 6.04517 0.832031C6.68159 0.832031 7.19751 1.34795 7.19751 1.98438Z"
              fill="#0F172A"
            />
            <path
              d="M2.30469 1.98438C2.30469 2.6208 1.78877 3.13672 1.15234 3.13672C0.515922 3.13672 0 2.6208 0 1.98438C0 1.34795 0.515922 0.832031 1.15234 0.832031C1.78877 0.832031 2.30469 1.34795 2.30469 1.98438Z"
              fill="#0F172A"
            />
          </svg>

          <svg
            width="59"
            height="58"
            viewBox="0 0 59 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="29.1447" cy="28.9513" r="28.9513" fill="#0F172A" />
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
          </svg>

          <div className="text-[#0F172A] space-y-1">
            <h4 className="text-sm font-semibold">Open Positions</h4>
            <p className="text-xs  ">Graphic Design Lead • Design Department</p>
            <nav className="flex justify-between gap-2 items-center !mt-4">
              <svg
                width="9"
                height="11"
                viewBox="0 0 9 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.193115 4.89551C0.193115 6.92767 1.88554 8.60592 3.71354 10.4186C3.87265 10.5764 4.03297 10.7354 4.19312 10.8955C4.35325 10.7354 4.51338 10.5766 4.67249 10.4188C6.50048 8.60612 8.19312 6.92767 8.19312 4.89551C8.19312 2.68637 6.40225 0.895508 4.19312 0.895508C1.98397 0.895508 0.193115 2.68637 0.193115 4.89551ZM4.10607 5.89551C4.82645 5.89551 5.41042 5.33586 5.41042 4.64551C5.41042 3.95515 4.82645 3.39551 4.10607 3.39551C3.3857 3.39551 2.80173 3.95515 2.80173 4.64551C2.80173 5.33586 3.3857 5.89551 4.10607 5.89551Z"
                  fill="#0F172A"
                />
              </svg>

              <p className="text-xs ml-0 mr-auto">Sarasota, Florida</p>
              <Link
                className="w-fit h-fit"
                href="https://isaconsulting.com/search-job"
                target="_blank"
              >
                <Button
                  name="See Position"
                  className="!text-[9px] py-[2px] !px-[14px]"
                />
              </Link>
            </nav>
          </div>
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
