import { Fundraising } from '@/api/Fundraising';

export type FundraisingRoundStatus = 'draft' | 'completed' | 'ongoing' | 'archived';
export type FundraisingRoundInput = Parameters<Fundraising['roundCreate']>[0];
