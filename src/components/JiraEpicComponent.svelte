<script lang="ts">
	import type { CombinedEpic } from '../jira/combine';
	import JiraIssueComponent from './JiraIssueComponent.svelte';

	export let epic: CombinedEpic;
</script>

<div>
	<JiraIssueComponent issue={epic.epic} />
</div>

<style>
	div {
		display: inline-block;
		vertical-align: top;
		width: 300px;
		padding: 12px;
		margin: 6px;
		border: solid 1px gainsboro;
		background: white;
	}
</style>
