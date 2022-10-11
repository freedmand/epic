import { env } from '$env/dynamic/private';
import { env as envPublic } from '$env/dynamic/public';
import { cachedFetch } from '../utils/cachedFetch';
import type { JiraIssue } from './types';

const JIRA_API_TOKEN = env.JIRA_API_TOKEN;
const JIRA_DOMAIN = envPublic.PUBLIC_JIRA_DOMAIN;
const JIRA_EMAIL = env.JIRA_EMAIL;

/**
 * @param apiRoute The Jira API route to fetch, e.g. `/rest/api/3/issuetype/project`
 * @param fetchArgs Args to pass into fetch (defaults to {method: 'GET'})
 * @returns The JSON response, typed via the <ReturnType> param
 */
export async function jiraFetch<ReturnType>(
	apiRoute: string,
	fetchArgs: Parameters<typeof fetch>[1] = { method: 'GET' }
): Promise<ReturnType> {
	// Ensure the API route is correctly formatted
	if (!apiRoute.startsWith('/')) {
	}
	return await cachedFetch(`https://${JIRA_DOMAIN}.atlassian.net${apiRoute}`, {
		headers: {
			Authorization: `Basic ${Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString('base64')}`,
			Accept: 'application/json'
		},
		...fetchArgs
	});
}

export interface JiraSearchResults {
	issues: JiraIssue[];
	startAt: number;
	total: number;
}

export async function jiraSearchIssues(jql: string) {
	let resultIssues: JiraIssue[] = [];

	let startAt = 0;
	while (true) {
		const searchResults = await jiraFetch<JiraSearchResults>(
			`/rest/api/3/search?${new URLSearchParams({
				jql,
				startAt: `${startAt}`,
				maxResults: '100',
				expand: 'renderedFields'
			})}`
		);
		resultIssues = resultIssues.concat(searchResults.issues);
		if (searchResults.startAt + searchResults.issues.length < searchResults.total) {
			// Increment start at
			startAt += searchResults.issues.length;
		} else {
			break;
		}
	}

	return resultIssues;
}

export const jiraFetchIssue = (issueKey: string) =>
	jiraFetch<JiraIssue>(
		`/rest/api/3/issue/${issueKey}?${new URLSearchParams({
			expand: 'renderedFields'
		})}`
	);

export const jiraFetchIssuesInEpics = (epics: string[]) =>
	jiraSearchIssues(`parentEpic in (${epics.join(', ')})`);
