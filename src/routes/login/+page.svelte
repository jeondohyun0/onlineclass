<script>
    let state = false;
    let job = '선택';
    let tcolor = 'EDF2F7';
    let scolor = 'EDF2F7';
    let route = ''

    const select = () => {
        state = !state;
    }


    const selectTeacher = () => {
        state = false;
        job = '선생님'
        route = 'teacher'
        tcolor = 'E4E8FF';
        scolor = 'EDF2F7';
    }
    const selectStudent = () => {
        state = false;
        job = '학생'
        route = 'student'
        tcolor = 'EDF2F7';
        scolor = 'E4E8FF';
    }
    
</script>
<div class="container">
    <div class="head">로그인</div>
    <div class="container-select">
        <div on:click={select} class="box-job" style="background-color: #EDF2F7">
            <div class="select">{job}</div>
            <img src="/log/down.png" alt="down" style="width:40px">
        </div>
        {#if state}
        <div class="select-box">
            <div class="select-teacher" on:click={selectTeacher} style="background-color: #{tcolor};">선생님</div>
            <div class="select-student" on:click={selectStudent} style="background-color: #{scolor};">학생</div>
        </div>
        {/if}
    </div>
    <a href="/{route}/home" style="text-decoration: none;">
        <div class="login" style="margin-top: 50px;">
            <div class="login-text">로그인</div>
        </div>
    </a>
</div>
<style>
    .container {
        width: 520px;
        height: 630px;
        margin: auto;
    }
    .head {
        color: #32BBE7;
        margin: auto;
        width: 120px;
        font-size: 40px;
        font-weight: 600;
        margin: auto;
        padding-top: 40px;
    }
    .box-job {
        width: 180px;
        height: 60px;
        border-radius: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .select {
        margin: auto;
        font-size: 20px;
        color: #B6A0A0;
    }
    .container-select {
        width: 180px;
        margin: auto;
        margin-top: 40px;
    }
    .select-box {
        width: 180px;
    }
    .select-teacher {
        color: #B6A0A0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 50px;
        border-top: 1px solid #B6A0A0;
        font-size: 20px;
    }
    .select-student {
        color: #B6A0A0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 50px;
        font-size: 20px;
    }
    .login {
        background-color: #32BBE7;
        width: 400px;
        margin: auto;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: white;
    }
    .login-text {
        margin: auto;
    }
</style>