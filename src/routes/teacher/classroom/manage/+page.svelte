<script>
    import Homework from '$lib/asset/homework.json'
    const inform = Homework.homework
    const homeworkin = [];
    const plus = () => {
       
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
<button>
    <img src="/classroom/manage/plus.png" class="plus" alt="plus">
    <div class="homework">숙제 추가하기</div>
</button>
<div class="container-homework">
    {#each Homework.homework as {rdate, sdate, book, range}}
    <div class="content-homework">
        <div>등록일 | {rdate}</div>
        <div>제출기한 | {sdate}</div>
        <div>교재 | {book}</div>
        <div>범위 | {range}</div>
        <button class="del-in">
            <div>삭제</div>
        </button>
    </div>
    {/each}
</div>
    <!-- 
        
     -->
<style>
    .box-classin {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        background-color: #32bbe7;
        width: 600px;
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
        width: 600px;
        height: 30px;
        padding:5px;
        border: 1px solid #b6a0a0;
    }
    .text-task {
        color: #FFFFFF;
    }
    button {
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
    .plus {
        height: 35px;
    }
    .homework {
        color: #836666;
        font-weight: 500px;
        margin-top: 3px;
    }
    .content-homework {
        width: 580px;
        border-radius: 10px;
        height: 100px;
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
    .del-in {
        background-color: #e4d8d8;
        display: flex;
        margin: 30px auto;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .container-homework {
        display: flex;
        flex-direction: column;
        height: 347px;
        overflow: auto;
        width: 600px;
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
</style>