import { Tokentable } from '@/api/Tokentable';
import { ExtractHttpResponseType } from '@/types/http';

export type TokenAllocationInput = Parameters<Tokentable['tokenAllocationCreate']>[0];
export type TokenAllocationListItem = NonNullable<NonNullable<NonNullable<ExtractHttpResponseType<ReturnType<Tokentable['tokenAllocationList']>>['data']>['tokentable']>['token_allocation']>[0];
