<script lang="ts">
	import { env } from '$env/dynamic/public';
	import type { JiraIssue } from '../jira/types';
	import JiraDocComponent from './JiraDocComponent.svelte';
	import JiraIssueTypeComponent from './JiraIssueTypeComponent.svelte';
	import JiraStatusComponent from './JiraStatusComponent.svelte';
	import JiraUserComponent from './JiraUserComponent.svelte';
	import JiraUserPillComponent from './JiraUserPillComponent.svelte';

	export let issue: JiraIssue;
</script>

<div class="issue-key">
	<JiraIssueTypeComponent issueType={issue.fields.issuetype} />
	<span
		><a href={`https://${env.PUBLIC_JIRA_DOMAIN}.atlassian.net/browse/${issue.key}`} target="_blank"
			>{issue.key}</a
		></span
	>
</div>
<h1>{issue.fields.summary}</h1>
<div>
	{#if issue.fields.assignee}
		<JiraUserPillComponent user={issue.fields.assignee} label="Assignee" />
	{/if}
	<JiraUserPillComponent user={issue.fields.reporter} label="Reporter" />
</div>
<hr />
<JiraDocComponent doc={issue.renderedFields.description} />
<JiraStatusComponent status={issue.fields.status} />

<style>
	h1 {
		font-size: 24px;
	}

	.issue-key :global(*) {
		display: inline-block;
		vertical-align: middle;
	}
</style>
