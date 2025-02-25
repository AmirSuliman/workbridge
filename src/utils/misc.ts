// recursive function based on children or _children property
// node -> children or _children -> data: DataTypes.Employee
// check if there are open positions like openPositions.length > 0
export function checkForOpenPositions(node: any): boolean {
  if (node.data.openPositions.length > 0) {
    // console.log('node.data: ', node.data.openPositions);
    return true;
  }
  if (node.children) {
    for (const child of node.children) {
      if (checkForOpenPositions(child)) {
        return true;
      }
    }
  } else if (node._children) {
    for (const child of node._children) {
      if (checkForOpenPositions(child)) {
        return true;
      }
    }
  }
  return false;
}
