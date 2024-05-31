export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  pageCount: number;
}
