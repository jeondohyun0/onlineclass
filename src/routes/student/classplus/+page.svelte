<div class="container">
    <div class="box-head">
        <a href="/student/home">
            <img src="/classplus/before.png" alt="before"style="height: 30px; margin: 10px 5px"/>
        </a>
    </div>
    <div class="container-classcode">
        <div class="text-input">선생님이 주신 수업 채널 코드로 가입하기</div>
        <div class="text-code">
            <input type="text" minlength="7" maxlength="12" placeholder="수업 채널 코드 7 ~ 12자리">
        </div>
        <a href="/student/home">
            <button>확인</button>
        </a>
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
    .container-classcode {
        display: flex;
        margin: 50px auto;
        flex-direction: column;
        justify-content: center;
        width: 400px;
    }
    .text-input {
        color: #836666;
    }
    input {
        width: 393px;
        height: 30px;
        margin-top: 30px;
        font-size: 15px;
    }
    button {
        background-color: #32bbe7;
        color: #ffffff;
        margin-top: 30px;
        width: 400px;
        height: 30px;
        border: none;
    }
</style>