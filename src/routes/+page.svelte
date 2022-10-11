<script lang="ts">
	import JiraEpicComponent from '../components/JiraEpicComponent.svelte';
	import type { CombinedEpic } from '../jira/combine';

	export let data: { epics: CombinedEpic[] };
	console.log(data.epics);
</script>

{#each data.epics as epic}
	<JiraEpicComponent {epic} />
{/each}

<style>
	:global(html, body) {
		margin: 0;
		padding: 6px;
		background: #efefef;
		font-family: 'Avenir', 'Helvetica', 'Arial', sans-serif;
		line-height: 1.15;
	}

	:global(a) {
		color: inherit;
		text-decoration: underline dotted rgb(214, 214, 214);
	}
</style>
