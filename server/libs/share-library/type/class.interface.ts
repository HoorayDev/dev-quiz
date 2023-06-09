export class ReadAllResponse<T> {
  list: T[];
  currentPage: number;
  totalPage: number;
  count: number;
}

export interface RepositoryInterface<T, K, F> {
  findOneWithKey(key: K): Promise<T>;
  findOneWithFilter(key: K, filter: F): Promise<T>;
  findAll(filter: F): Promise<ReadAllResponse<T>>;
  create(createProp: T): Promise<T>;
  update({ key, prop }: { key: K; prop: T }): Promise<T>;
  remove(key: K): Promise<K>;
}
