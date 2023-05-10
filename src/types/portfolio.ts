import { ExtractHttpResponseType } from '@/types/http';
import { Portfolio } from '@/api/token/Portfolio';

export type PortfolioListItem = NonNullable<ExtractHttpResponseType<ReturnType<Portfolio['portfolioList']>>['data'][0]>;
export type PortfolioListItemFundraisingRound = NonNullable<PortfolioListItem['fundraising_rounds']>[0];
