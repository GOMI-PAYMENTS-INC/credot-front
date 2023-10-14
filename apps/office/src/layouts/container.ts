export const getUnderline = (
  route: {
    text: string;
    path: string;
    icon: string;
    child: string[];
  },
  current: string,
) =>
  current.includes(route.path) || route.child.includes(current)
    ? 'border-b-orange-500 '
    : 'border-b-white';
