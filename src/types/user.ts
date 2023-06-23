import { User } from '@/api/token/User';
import { ExtractHttpResponseType } from '@/types/http';

export type IUser = NonNullable<ExtractHttpResponseType<ReturnType<User['userCreate']>>['data']>;
export type UserInput = Parameters<User['userCreate']>[0];
