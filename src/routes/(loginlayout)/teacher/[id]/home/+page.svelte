<script lang="ts">
    import type { classplus } from "$lib/DB";
    
    let classplus: classplus[] = [];
    import { classcode as Code } from "$lib/store";
    import {
        GoogleAuthProvider, //로그인
        browserSessionPersistence, //로그인 기록 남김
        getAuth, //로그인 인증 정보 나옴
        onAuthStateChanged,
        setPersistence, //browserSessionPersistence과 같이 쓰임
        signInWithPopup, //어떻게 뜨게 할지
    } from "firebase/auth";
    import type { User } from "firebase/auth";
    import { user as Userstore } from "$lib/store";
    import {
        getApps, //들어와 있는 상태인지 파악
        initializeApp, //앱 만들 때
        FirebaseError,
    } from "firebase/app";
    import type { FirebaseOptions } from "firebase/app";
    import type { PageData } from './$types';
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    export let data:PageData;
    const firebaseConfig = data.firebaseConfig;
    let curUser: User | null = null;
    onMount(async () => {
        if (getApps().length === 0) {
            initializeApp(firebaseConfig);
        }
        const auth = getAuth();
        const un = onAuthStateChanged(auth, (user) => {
            curUser = user;
        });
        return () => {
            un();
        };
    });
    const logout = async (firebaseConfig: FirebaseOptions) => {
        if (getApps().length === 0) {
            initializeApp(firebaseConfig);
        }
        const auth = getAuth();
        await auth.signOut();
        $Userstore.name = '';
        $Userstore.email = '';
        $Userstore.phone = '';
        $Userstore.photoaddress = '';
        $Code.code = '';
        goto('/login')
        console.log($Userstore);
        console.log($Code.code)
    };
    let state = false;
    const logoutb = () => {
        state = !state
    }

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
        {#each classplus as c, index}
            <a href="/teacher/{$Userstore.email}/classroom/class">
                <div
                    class="box-class"
                    on:click={() => {
                        $Code.code = `${c.classcode}`
                        console.log(classplus, Object.keys(classplus[index]).length)
                    }}
                >
                    <div class="box-sub">
                        {#if c.sname}
                        <div class="sname">{c.sname} 학생</div>
                        {:else}
                        <div class="sname">빈방</div>
                        {/if}              
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
    <div class="logoutbutton">
        {#if state}
        <button class="logout" on:click={async () => logout(firebaseConfig)}>로그아웃</button>
        {:else}
        <div style="width: 300px;"></div>
        {/if}
        <img class="profile" src="{$Userstore.photoaddress}" alt="account" id="account" on:click={logoutb}>
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
