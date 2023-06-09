import { HttpResponse } from '@/api/token/http-client';

export type ExtractHttpResponseType<P> = P extends Promise<HttpResponse<infer T>> ? T : never;
