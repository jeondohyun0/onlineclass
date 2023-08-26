<script lang="ts">
    import Homework from '$lib/asset/homework.json'
    const inform = Homework.homework
    
    interface homeworkin {
        RDATE?: string;
        SDATE?: string;
        BOOK?: string;
        RANGE?: string;
        INDEX?: number;
    }

    let homeworkin: homeworkin[] = [];

    let num = 0;
    let state = false
    const homeworks = () => {
        let RDATE = inform[num].rdate;
        let SDATE = inform[num].sdate;
        let BOOK = inform[num].book;
        let RANGE = inform[num].range;
        let INDEX = inform[num].index;

        return {
            RDATE,
            SDATE,
            BOOK,
            RANGE,
            INDEX
        }
    }
    const pluscontent = () => {
        state = true
    }
    const plus = () => {
        state = false;
        num = num + 1
        return homeworkin = [...homeworkin, homeworks()]
    }
    const cancel = () => {
        state = false
    }
</script>
<div class="box-classin">
    <div class="text-classin">수업 정보</div>
    <a href="/teacher/classin">
        <img src="/classroom/manage/classin.png" class="classin" alt="classin">
    </a>
</div>
<div class="box-task">
    <div class="text-task">과제</div>
</div>

<div class="container-homework"> 
    <button class="homeworkplus" on:click={pluscontent}>
        <img src="/classroom/manage/plus.png" class="plus" alt="plus">
        <div class="homework">숙제 추가하기</div>
    </button>
    {#if state}
    <div class="pluscontent">
        <div class="button-head">
            <button class="button-before" on:click={cancel}>취소</button>
            <button class="button-sure" on:click={plus}>저장</button>
        </div>
        <div class="rdate">
            <div class="text-rdate">등록일</div>
            <input class="bar-rdate" type="date">
        </div>
        <div class="sdate">
            <div class="text-sdate">제출일</div>
            <input class="bar-sdate" type="date">
        </div>
        <div class="book">
            <div class="text-book">교재</div>
            <input class="bar-book" type="text">
        </div>
        <div class="range">
            <div class="text-range">범위</div>
            <div class="range-box">
                <input class="bar-range-first" type="number" min="0">
                ~
                <input class="bar-range-second" type="number" min="0">
            </div>
        </div>
    </div>
    {/if}
    {#each homeworkin as {RDATE, SDATE, BOOK, RANGE}}
    <div class="content-homework">
        <div>등록일 | {RDATE}</div>
        <div>제출일 | {SDATE}</div>
        <div>교재 | {BOOK}</div>
        <div>범위 | {RANGE}</div>
        <button class="del-in">
            <div>삭제</div>
        </button>
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
        padding:5px;
        border: 1px solid #b6a0a0;
    }
    .text-classin {
        color: #FFFFFF;
    }
    .box-task {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        background-color: #32bbe7;
        width: 520px;
        height: 30px;
        padding:5px;
        border: 1px solid #b6a0a0;
    }
    .text-task {
        color: #FFFFFF;
    }
    .homeworkplus {
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
    .plus {
        height: 35px;
        margin-top: 5px;
    }
    .homework {
        color: #836666;
        font-weight: 500px;
        margin-top: 3px;
    }
    .content-homework {
        width: 500px;
        border-radius: 10px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 5px;
        color: #836666;
        background-color: #f7f5f5;
        margin-bottom: 30px;
        display: flex;
        flex-wrap: wrap
    }
    .del-in {
        background-color: #e4d8d8;
        display: flex;
        margin: auto;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: #D9D9D9;
        width: 100px;
        height: 50px;
        font-size: 18px;
    }
    .container-homework {
        display: flex;
        flex-direction: column;
        height: 477px;
        overflow: auto;
        width: 520px;
        margin: auto;
        align-items: center;
    }
    .container-homework::-webkit-scrollbar {
        display: none;
    }
    .classin {
        height: 20px;
        margin-top: 4px;
    }
    input {
        width: 300px;
        border: 1px solid #000000;
        outline: none;
    }
    .pluscontent {
        background-color: #f7f5f5;
        width: 310px;
        margin: auto;
        border-radius: 10px;
        padding: 5px;
        margin-bottom: 135px;
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
    .bar-range-first {
        width: 130px;
    }
    .bar-range-second {
        width: 130px;
    }
    .range-box {
        width: 300px;
        margin: auto;
    }
</style>