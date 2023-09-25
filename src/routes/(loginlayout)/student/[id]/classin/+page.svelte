<script lang="ts">
    import type { classinformation } from '$lib/DB';
    import { onMount } from 'svelte';
    import { user as Userstore } from '$lib/store';

    let classinformation: classinformation[] = [];

    onMount(async () => {
        if($Userstore.email) {
            const res = await fetch(`/student/${$Userstore.email}/classin/api`, {
                method: "POST",
            });
            classinformation = await res.json();
            console.log(classinformation)
        } else {
            console.error("User email is not defined")
        }
    })
</script>
<div class="container">
    <div class="box-head">
        <a href="/student/${$Userstore.email}/classroom/manage">
            <img src="/classin/before.png" alt="before"style="height: 30px; margin: 10px 5px"/>
        </a>
    </div>
    <div class="container-date">
        {#each classinformation as c}
        <div class="content-classinformation">
            <div class="left-information">{c.date}</div>
            <div class="length"></div>
            <div class="right-information">
                <div>교재 {c.book}</div>
                <div>시간 {c.stime} ~ {c.etime}</div>
            </div>
        </div>
        {/each}
    </div>
</div>
<style>
    .container {
        margin: auto;
        width: 520px;
        height: 630px;
    }
    .box-head {
        background-color: #32bbe7;
        width: 520px;
        height: 50px;
    }
    .container-date {
        display: flex;
        flex-direction: column;
        height: 550px;
        overflow: auto;
        width: 520px;
        margin: 30px auto;
        align-items: center;
    }
    .container-date::-webkit-scrollbar {
        display: none;
    }
    .content-classinformation {
        width: 500px;
        border-radius: 10px;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 5px;
        color: #836666;
        background-color: #f7f5f5;
        margin-bottom: 30px;
        display: flex;
        flex-wrap: wrap
    }
    .left-information {
        margin: auto;
        font-size: large;
    }
    .length {
        height: 70px;
        border: 1px solid #d4c2c2;
        width: 0px;
    }
</style>