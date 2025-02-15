
export interface BaseListFilterDto extends PagedResultRequestBase {
  keyword?: string;
}

export interface PagedResultRequestBase {
  currentPage: number;
  pageSize: number;
}

export interface PageResultBase {
  currentPage: number;
  pageSize: number;
  rowCount: number;
  pageCount: number;
  firstRowOnPage: number;
  lastRowOnPage: number;
  additionalData?: string;
}

export interface PagedResult<T> extends PageResultBase {
  results: T[];
}
