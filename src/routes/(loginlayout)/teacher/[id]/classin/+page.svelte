<script lang="ts">
    import type { classinformation } from '$lib/DB';
    import { user as Userstore } from '$lib/store';
    import { onMount } from 'svelte';

    let classinformation: classinformation[] = [];

    let state = false;
    
    const pluscontent = () => {
        state = true
    }
    const delcontent = () => {
        state = false
    }

    onMount(async () => {
        if($Userstore.email) {
            const res = await fetch(`/teacher/${$Userstore.email}/classin/api`, {
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
        <a href="/teacher/${$Userstore.email}/classroom/manage">
            <img src="/classin/before.png" alt="before"style="height: 30px; margin: 10px 5px"/>
        </a>
    </div>
    <div class="container-date">
        <button class="plus-in" on:click={pluscontent}>
            <img src="/classin/plus.png" class="plus" alt="plus">
            <div class="information">일정 추가하기</div>
        </button>
        {#if state}
        <div class="pluscontent">
            <div class="button-head">
                <button class="button-before" on:click={delcontent}>취소</button>
                <button class="button-sure">저장</button>
            </div>
            <div class="date">
                <div class="text-date">날짜</div>
                <input class="bar-date" type="date">
            </div>
            <div class="book">
                <div class="text-book">교재</div>
                <input class="bar-book" type="text">
            </div>
            <div class="time">
                <div class="text-time">시간</div>
                <div class="time-box">
                    <input class="bar-time-first" type="time">
                    ~
                    <input class="bar-time-second" type="time">
                </div>
            </div>
        </div>
        {/if}
        {#each classinformation as c}
        <div class="content-classinformation">
            <div class="left-information">{c.date}</div>
            <div class="length"></div>
            <div class="right-information">
                <div>교재 {c.book}</div>
                <div>시간 {c.stime} ~ {c.etime}</div>
            </div>
            <button class="del-in">
                <div>삭제</div>
            </button>
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
    .plus {
        height: 35px;
        margin-top: 5px;
    }
    .information {
        color: #836666;
        font-weight: 500px;
        margin-top: 3px;
    }
    .plus-in {
        height: 63px;
        width: 100px;
        border-radius: 10px;
        border: #D9D9D9;
        display: flex;
        margin: 30px auto;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
    .length {
        height: 70px;
        border: 1px solid #d4c2c2;
        width: 0px;
    }
    .left-information {
        margin: auto;
        font-size: large;
    }
    .del-in {
        border: #D9D9D9;
        background-color: #e4d8d8;
        display: flex;
        margin: 30px auto;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .container-date {
        display: flex;
        flex-direction: column;
        height: 580px;
        overflow: auto;
        width: 520px;
        margin: auto;
        align-items: center;
    }
    .container-date::-webkit-scrollbar {
        display: none;
    }
    .pluscontent {
        background-color: #f7f5f5;
        width: 310px;
        margin: auto;
        border-radius: 10px;
        padding: 5px;
        margin-bottom: 289px;
    }
    input {
        width: 300px;
        border: 1px solid #000000;
        outline: none;
    }
    .button-before {
        background-color: #e4d8d8;
        width: 42px;
        text-align: center;
        border: none;
        font-size: 15px;
    }
    .button-sure {
        background-color: #e4d8d8;
        width: 42px;
        text-align: center;
        border: none;
        margin: 1px;
        font-size: 15px;
    }
    .button-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding:5px;
    }
    .bar-time-first {
        width: 130px;
    }
    .bar-time-second {
        width: 130px;
    }
    .time-box {
        width: 300px;
        margin: auto;
    }
</style>
