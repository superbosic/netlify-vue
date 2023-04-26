import { Tokentable } from '@/api/token/Tokentable';
import { ExtractHttpResponseType } from '@/types/http';

export type TokenAllocationInput = Parameters<Tokentable['tokenAllocationCreate']>[0];
export type TokenAllocationUnlockSchemeInput = Parameters<Tokentable['tokenAllocationUnlockSchemeCreate']>[0];
export type TokenAllocationListItem = NonNullable<NonNullable<NonNullable<ExtractHttpResponseType<ReturnType<Tokentable['tokenAllocationList']>>['data']>['tokentable']>['token_allocation']>[0];
export type TokenAllocationListItemUnlockScheme = NonNullable<TokenAllocationListItem['unlock_scheme']>[0];
