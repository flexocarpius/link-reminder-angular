import { Link } from './link.model';

export interface Pagination {
  docs: Link[];
  limit: number;
  page: number;
  pages: number;
  total: number;
}
