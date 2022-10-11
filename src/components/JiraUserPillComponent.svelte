<script lang="ts">
	import type { JiraUser } from '../jira/types';
	import JiraUserComponent from './JiraUserComponent.svelte';

	export let user: JiraUser;
	export let label: string;
</script>

<div class="pill">
	<div class="label">{label}</div>
	<JiraUserComponent {user} />
</div>

<style>
	.pill {
		display: inline-block;
		background: #efefef;
		position: relative;
		height: 30px;
		border-radius: 15px;
		padding: 6px 0 0 0;
	}

	.label {
		position: absolute;
	}
</style>
