<script>
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    onMount( () => {
        goto('/login')
    })
</script>
<div>로딩 중</div>