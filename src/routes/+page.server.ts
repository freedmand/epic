import { env } from '$env/dynamic/public';
import { jiraFetchIssue, jiraFetchIssuesInEpics } from '../jira/api';
import { combineTickets } from '../jira/combine';

/** Epics to load into Jira */
const EPICS = env.PUBLIC_EPICS!.split(',');

export async function load() {
	const epicIssues = await Promise.all(EPICS.map(jiraFetchIssue));
	const subtickets = await jiraFetchIssuesInEpics(EPICS);

	const epics = combineTickets(epicIssues, subtickets);

	return { epics };
}
