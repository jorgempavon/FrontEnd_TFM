export type SortColumn = string | '';
export type SortDirection = 'asc' | 'desc' | '';

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

export const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc'
};
