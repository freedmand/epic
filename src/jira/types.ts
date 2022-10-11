export interface JiraUser {
	/** The full name of the assignee */
	displayName: string;
	/** The avatar image URLs */
	avatarUrls: {
		'48x48': string;
	};
}

export type JiraIssueType = 'Epic';

export type JiraStatusType = 'Backlog';

export type JiraStatusColor = 'blue-gray';

export interface JiraDoc {
	content: JiraDocElement[];
}

export type JiraDocElement = JiraParagraphElement | JiraTextElement;

export interface JiraParagraphElement {
	type: 'paragraph';
	content: JiraDocElement[];
}

export interface JiraTextElement {
	type: 'text';
	text: string;
}

export interface JiraIssue {
	/** The issue key, e.g. "ORG-1337" */
	key: string;

	/** The visible fields */
	fields: {
		/** The time the issue was last viewed */
		lastViewed: string;
		/** The time the issue was created */
		created: string;
		/** The time the issue was last updated */
		updated: string;
		/** A summary of the issue */
		summary: string;
		/** The issue description */
		description: JiraDoc;
		/** The person assigned to the epic */
		assignee: JiraUser | undefined;
		/** The person who reported the epic */
		reporter: JiraUser;
		/** The type of issue, e.g. "Epic" */
		issuetype: {
			iconUrl: string;
			name: JiraIssueType;
		};
		/** The status of the issue, e.g. "Backlog" */
		status: {
			name: JiraStatusType;
			statusCategory: {
				colorName: JiraStatusColor;
			};
		};

		/** The parent epic, if it exists */
		parent?: { key: string };
	};

	/** The rendered fields */
	renderedFields: {
		description: string;
	};
}
