export interface TableAction<T> {
  label: string;
  color?: string;
  onClick: (row: T) => void;
  icon?: React.ReactNode;
}
