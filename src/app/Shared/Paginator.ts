export interface IPaginatorParameters {
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_dir?: string;
}

export class PaginatorParameters implements IPaginatorParameters {
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_dir?: string;

  constructor({ page, per_page, sort_by, sort_dir }: any) {
    this.page = page;
    this.per_page = per_page;
    this.sort_by = sort_by;
    this.sort_dir = sort_dir;
  }
}

export interface IPaginableQueryResult<T> {
  count: number;
  rows: T[];
}

export function createPaginableQuery(query: any, params: IPaginatorParameters) {
  const page = params.page || 1;
  const perPage = params.per_page || 10;
  const sortBy = params.sort_by || null;
  const sortDir = params.sort_dir || "ASC";

  const offset = (page - 1) * perPage;
  const limit = perPage;

  const paginationQuery = {
    ...query,
    offset,
    limit,
    distinct: true,
  };

  if (sortBy) {
    if (sortBy.includes(".")) {
      const auxArr = sortBy.split(".");
      auxArr.push(sortDir);

      paginationQuery.order = [auxArr];
    } else {
      paginationQuery.order = [[sortBy, sortDir]];
    }
  }

  return paginationQuery;
}

export function paginatedResult(
  data: IPaginableQueryResult<any>,
  params: IPaginatorParameters
) {
  const total = data.count;
  const current_page = params.page || 1;
  const per_page = params.per_page || 10;
  const last_page = Math.ceil(data.count / (params.per_page || 10));
  const from = current_page * per_page - per_page + 1;
  const to = current_page * per_page < total ? current_page * per_page : total;

  return {
    total,
    per_page,
    current_page,
    last_page,
    from: last_page >= current_page ? from : 0,
    to: last_page >= current_page ? to : 0,
    data: data.rows,
  };
}
