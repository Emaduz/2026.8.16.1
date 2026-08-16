export function isActiveRoute(currentPath: string, targetPath: string) {
  return currentPath === targetPath;
}

export function getWheelDirection(deltaY: number, deltaX: number) {
  if (Math.abs(deltaY) < 12 || Math.abs(deltaY) < Math.abs(deltaX)) return 0;
  return deltaY > 0 ? 1 : -1;
}
