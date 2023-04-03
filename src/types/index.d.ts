import { HttpResponse } from '@/api/http-client';

type NotDefined<T> = T | null | undefined;
type Rule<T> = ((value: T) => boolean | string);
type Rules<T> = Array<Rule<T>>;
type ExtractHttpResponseType<P> = P extends Promise<HttpResponse<infer T>> ? T : never;
