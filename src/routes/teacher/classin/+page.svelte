<script>
    import Information from '$lib/asset/information.json'
    let index=0
    const plus = () => {
        index = index+1;
    }
</script>
<div class="container">
    <div class="box-head">
        <a href="/teacher/classroom/manage">
            <img src="/classin/before.png" alt="before"style="height: 30px; margin: 10px 5px"/>
        </a>
    </div>
    <button on:click={plus} class="plus-in">
        <img src="/classin/plus.png" class="plus" alt="plus">
        <div class="information">일정 추가하기</div>
    </button>
    <div class="container-date">
        {#each Information.information.slice(0, index) as {date, book, time}, i}
        <div class="content-classinformation">
            <div class="left-information">{date}</div>
            <div class="length"></div>
            <div class="right-information">
                <div>교재 {book}</div>
                <div>시간 {time}</div>
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
        width: 600px;
        height: 630px;
    }
    .box-head {
        background-color: #32bbe7;
        width: 600px;
        height: 50px;
    }
    .plus {
        height: 35px;
    }
    .information {
        color: #836666;
        font-weight: 500px;
        margin-top: 3px;
    }
    .plus-in {
        height: 70px;
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
        width: 580px;
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
        height: 450px;
        overflow: auto;
        width: 600px;
        margin: auto;
        align-items: center;
    }
    .container-date::-webkit-scrollbar {
        display: none;
    }
</style>
