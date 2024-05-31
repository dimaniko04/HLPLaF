import { IPaginatedList } from "../types/paginatedList";

export const toPaginatedList = <T>(
  items: T[],
  total: number,
  page: number,
  limit: number
): IPaginatedList<T> => {
  return {
    items,
    limit,
    page,
    pageCount: Math.ceil(total / limit),
  };
};
