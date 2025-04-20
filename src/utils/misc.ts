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

// this function is responsible for a same format of the date throughtout the app
// this also compatible with HTML input field of type date
export const formatDate = (date: string) =>
  new Date(date).toISOString().split('T')[0];

// Convert file size to bytes, kb, mb or gb
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Function to calculate time passed for a policy being posted
export const getTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} days ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} months ago`;
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} years ago`;
};
