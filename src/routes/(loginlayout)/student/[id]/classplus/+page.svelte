<script>
    import { user as Userstore } from "$lib/store";
    import { goto } from "$app/navigation";

    let inputcode = "";
    let errmsg = "";

    const check = async () => {
    if(inputcode.length < 7) {
      errmsg = "수업 코드를 7자 이상 입력해주세요.";
    } else {
      let n = $Userstore.name;
      let e = $Userstore.email;
      let co = inputcode;
      const res = await fetch(
          `/student/${$Userstore.email}/classplus/api`,
          {
              method: "POST",
              body: JSON.stringify([n, e, co]),
              headers:{
                  "content-type": "application/json",
              },
          }
       );

       const status = res.status;

       if(status === 200){
           goto(`/student/${$Userstore.email}/home`);
       } else if(status === 404){
           errmsg="그런 코드를 가진 값은 없습니다";
       } else if(status === 409){
           errmsg="방이 이미 꽉 찼습니다";
       } else{
           errmsg="알 수 없는 오류가 발생했습니다";
       }
   }
};

</script>

<div class="container">
    <div class="box-head">
        <a href="/student/${$Userstore.email}/home">
            <img
                src="/classplus/before.png"
                alt="before"
                style="height: 30px; margin: 10px 5px"
            />
        </a>
    </div>
    <div class="container-classcode">
        <div class="text-input">선생님이 주신 수업 채널 코드로 가입하기</div>
        <div class="text-code">
            <input
                type="text"
                bind:value={inputcode}
                minlength="7"
                maxlength="12"
                placeholder="수업 채널 코드 7 ~ 12자리"
            />
        </div>
        <div class="errmsg">{errmsg}</div>
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
