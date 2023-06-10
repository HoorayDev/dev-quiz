export enum Operation {
  CREATE = 'CREATE',
  READ = 'READ',
  READ_ALL = 'READ_ALL',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}
export enum Description {
  CREATE = '생성',
  READ = '조회',
  READ_ALL = '전체 조회',
  UPDATE = '수정',
  DELETE = '삭제',
}

export enum Resource {
  USER = 'USER',
  SUBSCRIBE = 'SUBSCRIBE',
  QUIZ_SET = 'QUIZ_SET',
  QUIZ = 'QUIZ',
  QUIZ_ANSWER = 'QUIZ_ANSWER',
  QUIZ_RESPONSE = 'QUIZ_RESPONSE',
}

type ResourceKey = keyof typeof Resource;
type OperationKey = keyof typeof Operation;
type SwaggerDescription = {
  summary: string;
  description: string;
};
type GenerateSwaggerDescription = {
  [key in ResourceKey]: {
    [key in OperationKey]: SwaggerDescription;
  };
};

export const generateSwaggerDescription = (): GenerateSwaggerDescription => {
  const temp = {};
  for (const key in Resource) {
    temp[key] = {};
    const resourceName = Resource[key];
    temp[resourceName] = {};
    for (const key in Operation) {
      const operationName = Operation[key];
      temp[resourceName][operationName] = {
        summary: `${resourceName} ${Description[operationName]}`,
        description: `${resourceName} ${Description[operationName]}`,
      };
    }
  }

  return temp as GenerateSwaggerDescription;
};

export const description = generateSwaggerDescription();
