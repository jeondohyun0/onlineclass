<script lang="ts">
    import { user as Userstore} from '$lib/store'
    import { goto } from "$app/navigation";
    // src/routes/teacher/classplus/+page.svelte

    let input1 = "";
    let input2 = "";
    let errmasg = "";

    const check = async () => {
    if (input1 !== input2) {
      errmasg = "수업 코드가 서로 일치하지 않습니다.";
    } else if (input1.length < 7 || input2.length < 7) {
      errmasg = "수업 코드를 7자 이상 입력해주세요.";
    } else {
      goto(`/teacher/${$Userstore.email}/home`);
    }
  };
</script>

<div class="container">
    <div class="box-head">
        <a href="/teacher/${$Userstore.email}/home">
            <img
                src="/classplus/before.png"
                alt="before"
                style="height: 30px; margin: 10px 5px"
            />
        </a>
    </div>
    <div class="container-classcode">
        <div class="text-input">수업 채널 코드 입력하기</div>
        <div class="text-code">
            <input
                type="text"
                bind:value={input1}
                minlength="7"
                maxlength="12"
                placeholder="수업 채널 코드 7 ~ 12자리"
            />
        </div>
        <div class="text-code">
            <input
                type="text"
                bind:value={input2}
                minlength="7"
                maxlength="12"
                placeholder="수업 채널 코드 7 ~ 12자리 확인"
            />
        </div>
        <div class="errmsg">{errmasg}</div>
        <button on:click={check}>확인</button>
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
    .container-classcode {
        display: flex;
        margin: 50px auto;
        flex-direction: column;
        justify-content: center;
        width: 320px;
    }
    .text-input {
        color: #836666;
    }
    input {
        width: 313px;
        height: 30px;
        margin-top: 30px;
        font-size: 15px;
    }
    button {
        background-color: #32bbe7;
        color: #ffffff;
        margin-top: 30px;
        width: 320px;
        height: 30px;
        border: none;
    }
    .errmsg {
        color: red;
        font-size: 10px;
        height: 10px;
    }
</style>
