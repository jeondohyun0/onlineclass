<script>
    let state = false;
    const logoutb = () => {
        state = !state
    }
</script>
<div class="container">
    <header class="text-head">나의 클래스</header>
    <hr>
    <div class="content">
        <a href="/student/classroom/class">
            <div class="box-class">
                <div class="box-sub"></div>
            </div>
        </a>
        <a href="/student/classplus" style="text-decoration: none;">
            <div class="box-plusclass">
                <img src="/home/plus.png" alt="plus" id="plus" style="height: 60px;">
                <div class="text-plusclass">새로운 수업 채널을 추가하세요</div>
            </div>
        </a>
    </div>
    <div class="logoutbutton">
        {#if state}
        <button class="logout">로그아웃</button>
        {:else}
        <div style="width: 300px;"></div>
        {/if}
        <img src="/home/account.png" alt="account" id="account" style="height: 120px" on:click={logoutb}>
    </div>
</div>
<style>
    .container {
        margin: auto;
        width: 520px;
        height: 630px;
    }
    .text-head {
        font-weight: 600;
        padding: 20px;
        padding-left: 10px;
    }
    .content {
        height: 360px;
        overflow: auto;
        width: 420px;
        margin: auto;
    }
    .content::-webkit-scrollbar {
        display: none;
    }
    .box-class {
        background-color: #F5F5F5;
        border-radius: 30px;
        height: 150px;
        width: 420px;
        margin: auto;
        margin-top: 30px;
    }
    .box-sub {
        background-color: #32BBE7;
        border-radius: 30px;
        height: 110px;
    }
    .box-plusclass {
        background-color: #F5F5F5;
        border-radius: 30px;
        height: 150px;
        width: 420px;
        text-align: center;
        margin: auto;
        margin-top: 30px;
    }
    .text-plusclass {
        color: #202A8A;
        font-size: 10px;
    }
    #plus {
        padding-top: 40px;
    }
    #account {
        float: right;
        margin-top: 50px;
    }
    .logoutbutton {
        display: flex;
        margin-left: 300px;
    }
    .logout {
        height: 50px;
        width: 120px;
        background-color: red;
        color: white;
        border-color: white;
        border-radius: 20px;
        margin-top: 100px;
    }
</style>