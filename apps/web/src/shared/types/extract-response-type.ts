type UnknownFn = (...args: any) => Promise<any>;
export type ExtractResponseType<T extends UnknownFn> = Awaited<ReturnType<T>>;
