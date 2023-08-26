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
        estate = false;
    }

    const eraser = () => {
        estate = !estate;
        pstate = false;
    }

    const sharing = () => {
        sstate = !sstate;
    }

</script><div class="container">
    <div class="button-head">
        <div class="icon-mike">
            {#if mstate}
            <img src="/classserver/mikeon.png" on:click={mike} alt="mike">
            {:else}
            <img src="/classserver/mikeoff.png" on:click={mike} alt="mike">
            {/if}
        </div>
        <div class="icon-pen">
            {#if pstate}
            <img src="/classserver/penon.png" on:click={pen} alt="pen">
            {:else}
            <img src="/classserver/penoff.png" on:click={pen} alt="pen">
            {/if}
        </div>
        <div class="icon-eraser">
            {#if estate}
            <img src="/classserver/eraseron.png" on:click={eraser} alt="eraser">
            {:else}
            <img src="/classserver/eraseroff.png" on:click={eraser} alt="eraser">
            {/if}
        </div>
        <div class="icon-sharing">
            {#if sstate}
            <img src="/classserver/sharingon.png" on:click={sharing} alt="sharing">
            {:else}
            <img src="/classserver/sharingoff.png" on:click={sharing} alt="sharing">
            {/if}
        </div>
        <img src="/classserver/alldel.png" class="alldel" alt="pen">
        <a href="/teacher/classroom/class">
            <img src="/classserver/exit.png" id="exit" alt="exit">
        </a>
    </div>
    <hr>
    
    <hr>
</div>
<style>
    .container {
        margin: auto;
        width: 520px;
        height: 630px;
        border: 1px solid #000000;
    }
    img {
        height: 45px;
        margin: 4px;
        margin-top: 7px;
        margin-bottom: 0px;
    }
    #exit {
        margin-left: 160px;
        margin-top: 10px;
    }
    .button-head {
        display: flex;
    }
</style>