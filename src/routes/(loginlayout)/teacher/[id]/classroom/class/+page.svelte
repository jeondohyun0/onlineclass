<script>
    import { user as Userstore } from "$lib/store";
    import { classcode as Code } from "$lib/store";
</script>

<div class="box">
    <a href="/teacher/${$Userstore.email}/classserver" style="text-decoration: none;">
        <div class="box-enter">
            <div class="text-enter">수업 채널 참가하기</div>
        </div>
    </a>
</div>
<style>
    .box-enter {
        height: 30px;
        width: 300px;
        border-radius: 5px;
        background-color: #32BBE7;
        margin: 100px auto;
    }
    .text-enter {
        font-size: 12px;
        color: #FFFFFF;
        text-align: center;
        padding: 7px 0;
    }
    .box {
        width: 300px;
        margin: auto;
    }
</style>