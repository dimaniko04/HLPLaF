export interface IPaginatedList<T> {
  items: T[];
  page: number;
  limit: number;
  pageCount: number;
}
