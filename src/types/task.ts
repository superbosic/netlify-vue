import { ExtractHttpResponseType } from '@/types/http';
import { Tasks } from '@/api/token/Tasks';

export type TasksListItem = NonNullable<NonNullable<ExtractHttpResponseType<ReturnType<Tasks['tasksList']>>['data']>[0]>;
export type TasksListItemFundraisingRound = NonNullable<TasksListItem['fundraising_rounds']>[0];
