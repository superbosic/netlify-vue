import { Fundraising } from '@/api/token/Fundraising';
import { ExtractHttpResponseType } from '@/types/http';

export type FundraisingRoundStatus = 'draft' | 'completed' | 'ongoing' | 'archived';
export type FundraisingRoundInput = Parameters<Fundraising['roundCreate']>[0];
export type RoundListItem = NonNullable<ExtractHttpResponseType<ReturnType<Fundraising['roundList']>>['data']>;
export type InvestorsListItem = NonNullable<RoundListItem['investors'][0]>;
