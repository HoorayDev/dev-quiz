export interface RepositoryInterface<T, K, F> {
  findOneWithKey(key: K): T;
  findOneWithFilter(key: K, filter: F): T;
  findAll(filter: F): T[];
  create(createProp: T): T;
  update({ key, prop }: { key: K; prop: T }): T;
  remove(key: K): T;
}
