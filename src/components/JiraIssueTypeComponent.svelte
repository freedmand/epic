<script lang="ts">
	import type { JiraIssue } from '../jira/types';

	export let issueType: JiraIssue['fields']['issuetype'];
</script>

<img src={issueType.iconUrl} alt={issueType.name} />
