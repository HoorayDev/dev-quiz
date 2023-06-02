export interface QuizSerServiceInterface {
  // TODO: FindAll Item 추상화
  findAll(filter: any): void;

  findOne(key: number): void;
}
