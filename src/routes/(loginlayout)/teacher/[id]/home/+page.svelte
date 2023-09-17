<script lang="ts">
    import type { classplus } from "$lib/DB";
    import { onMount } from "svelte";
    import { user as Userstore } from "$lib/store";
    import { classcode as Code } from "$lib/store";

    import type { PageServerData } from "./$types";
    import { goto } from "$app/navigation";
    //  export let data: PageServerData;

    //    let classplus = data.teacher;
    
    let classplus: classplus[] = [];

    onMount(async () => {
        if ($Userstore.email) {
            const res = await fetch(`/teacher/${$Userstore.email}/home/api`, {
                method: "POST",
            });
            classplus = await res.json();
        } else {
            console.error("User email is not defined");
        }
    });
</script>

<div class="container">
    <header class="text-head">나의 클래스</header>
    <hr />
    <div class="content">
        {#each classplus as c}
            <a href="/teacher/${$Userstore.email}/classroom/class">
                <div
                    class="box-class"
                    on:click={() => {
                        $Code.code = `${c.classcode}`
                        console.log($Code.code)
                    }}
                >
                    <div class="box-sub">
                        <div class="sname">{c.sname}학생</div>
                    </div>
                    <div class="classcode">코드: {c.classcode}</div>
                </div>
            </a>
        {/each}
        <a
            href="/teacher/${$Userstore.email}/classplus"
            style="text-decoration: none;"
        >
            <div class="box-plusclass">
                <img
                    src="/home/plus.png"
                    alt="plus"
                    id="plus"
                    style="height: 60px;"
                />
                <div class="text-plusclass">새로운 수업 채널을 추가하세요</div>
            </div>
        </a>
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
        background-color: #f5f5f5;
        border-radius: 30px;
        height: 150px;
        width: 420px;
        margin: auto;
        margin-top: 30px;
    }
    .box-sub {
        background-color: #32bbe7;
        border-radius: 30px;
        height: 110px;
    }
    .box-plusclass {
        background-color: #f5f5f5;
        border-radius: 30px;
        height: 150px;
        width: 420px;
        text-align: center;
        margin: auto;
        margin-top: 30px;
    }
    .text-plusclass {
        color: #202a8a;
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
    .profile {
        height: 80px;
        border-radius: 50px;
        margin-right: 20px;
    }
    .classcode {
        margin-left: 30px;
        margin-top: 7px;
        color: #b6a0a0;
    }
    .sname {
        padding-top: 80px;
        margin-left: 30px;
        color: white;
    }
    a {
        text-decoration-line: none;
    }
</style>
