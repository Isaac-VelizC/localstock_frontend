export type Option = {
  value: string | number;
  label: string;
  price?: number | null;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export type SearchParams = {
  search: string;
  page?: number;
};
