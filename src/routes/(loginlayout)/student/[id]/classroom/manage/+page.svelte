<script lang="ts">
    import { user as Userstore } from "$lib/store";
    import type { homework } from "$lib/DB";
    import { onMount } from "svelte";
    import { classcode as Code } from "$lib/store";
    let homework: homework[] = [];
    
    onMount(async () => {
        if ($Userstore.email) {
            const res = await fetch(`/student/${$Userstore.email}/classroom/manage/api`, {
                method: "POST",
                body: JSON.stringify($Code.code),
                headers: {
                    'content-type': 'application/json'
                }
            });
            homework = await res.json();
        } else {
            console.error("User email is not defined");
        }
    });
</script>

<div class="box-classin">
    <div class="text-classin">수업 정보</div>
    <a href="/student/${$Userstore.email}/classin">
        <img
            src="/classroom/manage/classin.png"
            class="classin"
            alt="classin"
        />
    </a>
</div>
<div class="box-task">
    <div class="text-task">과제</div>
</div>
<div class="container-homework">
    {#each homework as h}
        <div class="content-homework">
            <div>등록일 | {h.sdate}</div>
            <div>제출일 | {h.edate}</div>
            <div>교재 | {h.book}</div>
            <div>범위 | {h.srange} ~ {h.erange}</div>
            <!--
            <button class="sub">
            <div>숙제 제출하기</div>
            </button>
        -->
        </div>
    {/each}
</div>

<style>
    .box-classin {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        background-color: #32bbe7;
        width: 520px;
        height: 30px;
        padding: 5px;
        border: 1px solid #b6a0a0;
    }
    .text-classin {
        color: #ffffff;
    }
    .box-task {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        background-color: #32bbe7;
        width: 520px;
        height: 30px;
        padding: 5px;
        border: 1px solid #b6a0a0;
    }
    .text-task {
        color: #ffffff;
    }
    .classin {
        height: 20px;
        margin-top: 4px;
    }
    .content-homework {
        width: 500px;
        border-radius: 10px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 5px 5px 5px;
        color: #836666;
        background-color: #f7f5f5;
        margin-bottom: 30px;
        display: flex;
        flex-wrap: wrap;
    }
    .container-homework {
        display: flex;
        flex-direction: column;
        height: 437px;
        overflow: auto;
        width: 520px;
        margin: auto;
        align-items: center;
        margin: 40px auto;
    }
    .container-homework::-webkit-scrollbar {
        display: none;
    }
    .sub {
        height: 70px;
        width: 100px;
        border-radius: 10px;
        border: #d9d9d9;
        display: flex;
        margin: 30px auto;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #e4d8d8;
    }
</style>
