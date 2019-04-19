
export interface ITableColumn {
  header: string;
  value: (item: any) => string;
  sortable?: boolean;
  width?: number;
  alignment?: string;
}