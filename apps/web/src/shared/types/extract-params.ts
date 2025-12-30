type UnknownFn = (...args: any) => Promise<any>;

export type ExtractParams<T extends (...args: any) => any> = Parameters<T>[0];

export type Input<T extends (...args: any) => any> = ExtractParams<T>['input'];
export type QueryParams<T extends (...args: any) => any> = ExtractParams<T>['queryParams'];
export type ApiResponse<T extends UnknownFn> = Awaited<ReturnType<T>>;
