export type ExtractParams<T extends (...args: any) => any> = Parameters<T>[0];
export type ExtractInputParams<T extends (...args: any) => any> = ExtractParams<T>['input'];
