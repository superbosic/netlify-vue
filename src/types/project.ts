import { Project } from '@/api/Project';
import { ExtractHttpResponseType } from '@/types/http';

export type ProjectInfo = NonNullable<ExtractHttpResponseType<ReturnType<Project['projectList']>>['data']>;
export type ProjectInput = Parameters<Project['projectCreate']>[0];
