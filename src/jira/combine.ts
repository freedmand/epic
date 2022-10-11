import type { JiraIssue } from './types';

export interface CombinedEpic {
	epic: JiraIssue;
	subtickets: JiraIssue[];
}

export function combineTickets(epics: JiraIssue[], subtickets: JiraIssue[]): CombinedEpic[] {
	const results: CombinedEpic[] = [];

	// Create the high-level tickets
	const epicMap: { [key: string]: JiraIssue[] } = {};
	for (const epic of epics) {
		const subtickets: JiraIssue[] = [];
		results.push({
			epic,
			subtickets
		});
		epicMap[epic.key] = subtickets;
	}

	// Sort the subtickets
	for (const subticket of subtickets) {
		if (subticket.fields.parent != null && epicMap[subticket.fields.parent.key] != null) {
			// Add it in
			epicMap[subticket.fields.parent.key].push(subticket);
		}
	}

	// Return the combined epics
	return results;
}
