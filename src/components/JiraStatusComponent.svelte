<script lang="ts">
	import type { JiraIssue, JiraStatusColor } from '../jira/types';

	export function getStyle(colorName: JiraStatusColor) {
		switch (colorName) {
			case 'blue-gray':
				return 'background: rgb(223, 225, 230); color: rgb(23, 43, 77);';
		}
	}

	export let status: JiraIssue['fields']['status'];
</script>

<div style={getStyle(status.statusCategory.colorName)}>{status.name}</div>
