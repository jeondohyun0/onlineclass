<script>
    let mstate = true;
    let pstate = false;
    let estate = false;
    let sstate = false;

    const mike = () => {
        mstate = !mstate;
    }

    const pen = () => {
        pstate = !pstate;
    }

    const eraser = () => {
        estate = !estate;
    }

    const sharing = () => {
        sstate = !sstate;
    }

</script><div class="container">
    <div class="button-head">
        {#if mstate}
        <img src="/classserver/mikeon.png" on:click={mike} alt="mike">
        {:else}
        <img src="/classserver/mikeoff.png" on:click={mike} alt="mike">
        {/if}
        {#if pstate}
        <img src="/classserver/penon.png" on:click={pen} alt="pen">
        {:else}
        <img src="/classserver/penoff.png" on:click={pen} alt="pen">
        {/if}
        {#if estate}
        <img src="/classserver/eraseron.png" on:click={eraser} alt="eraser">
        {:else}
        <img src="/classserver/eraseroff.png" on:click={eraser} alt="eraser">
        {/if}
        {#if sstate}
        <img src="/classserver/sharingon.png" on:click={sharing} alt="sharing">
        {:else}
        <img src="/classserver/sharingoff.png" on:click={sharing} alt="sharing">
        {/if}
        <a href="/student/classroom/class">
            <img src="/classserver/exit.png" id="exit" alt="exit">
        </a>
    </div>
    <hr>
</div>
<style>
    .container {
        margin: auto;
        width: 600px;
        height: 630px;
    }
    img {
        height: 45px;
        margin: 4px;
        margin-top: 7px;
        margin-bottom: 0px;
    }
    #exit {
        margin-left: 280px;
    }
</style>