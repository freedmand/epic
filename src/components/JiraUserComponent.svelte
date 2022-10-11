<script lang="ts">
	import type { JiraUser } from '../jira/types';

	export let user: JiraUser;
</script>

<div class="user">
	<img src={user.avatarUrls['48x48']} alt="Avatar for {user.displayName}" />
	<span>{user.displayName}</span>
</div>

<style>
	img {
		width: 24px;
		height: 24px;
		border-radius: 12px;
	}

	.user :global(*) {
		display: inline-block;
		vertical-align: middle;
	}
</style>
