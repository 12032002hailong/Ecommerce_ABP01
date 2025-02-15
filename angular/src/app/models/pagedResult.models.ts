export interface PagedResult<T> {
  results: T[];
  rowCount: number;
  currentPage: number;
  pageSize: number;
}
