<script lang="ts">
    import { onMount } from "svelte";
    import { user as Userstore } from "$lib/store";
    import {
        GoogleAuthProvider, //로그인
        browserSessionPersistence, //로그인 기록 남김
        getAuth, //로그인 인증 정보 나옴
        onAuthStateChanged,
        setPersistence, //browserSessionPersistence과 같이 쓰임
        signInWithPopup, //어떻게 뜨게 할지
    } from "firebase/auth";
    import type { User } from "firebase/auth";
    import {
        getApps, //들어와 있는 상태인지 파악
        initializeApp, //앱 만들 때
        FirebaseError,
    } from "firebase/app";
    import type { FirebaseOptions } from "firebase/app";
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    export let data: PageData;
    const firebaseConfig = data.firebaseConfig;
    let curUser: User | null = null;
    let Cstate = false;
    let job = "선택";
    let route = "";
    let errmsg = "";
    let tbc = 'edf2f7'
    let sbc = 'edf2f7'
    onMount(() => {
        if (getApps().length === 0) {
            initializeApp(firebaseConfig);
        }
        const auth = getAuth();
        const un = onAuthStateChanged(auth, (user) => {
            curUser = user;
            if(user) {
                if(route !== '') {
                    goto(`${route}/home`);
                } else {
                    logout(firebaseConfig);
                }
            }
        });
        return () => {
            un();
        };
    });
    const login = async (firebaseConfig: FirebaseOptions) => {
        if (job !== "선택") {
            if (getApps().length === 0) {
                initializeApp(firebaseConfig);
            }
            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            provider.addScope(
                "https://www.googleapis.com/auth/contacts.readonly"
            );
            try {
                await setPersistence(auth, browserSessionPersistence);
                const result: any = await signInWithPopup(auth, provider);
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                const user = result.user;
                $Userstore.name = `${curUser?.displayName}`;
                $Userstore.email = `${curUser?.email}`;
                $Userstore.phone = `${curUser?.phoneNumber}`;
                $Userstore.photoaddress = `${curUser?.photoURL}`;
                $Userstore.job = `${job}`;
                goto(`${route}/home`);
                return { token, user };
            } catch (error) {
                if (error instanceof FirebaseError) {
                    const code = error.code;
                    const message = error.message;
                    // The email of the user's account used.
                    const email = error.customData?.email;
                    // The AuthCredential type that was used.
                    const credential =
                        GoogleAuthProvider.credentialFromError(error);
                    console.log({
                        code,
                        message,
                        email,
                        credential,
                    });
                } else {
                    console.log(error);
                }
            }
        } else {
            errmsg = "직업을 선택해주세요";
        }
    };

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
    };
    const cs = () => {
        Cstate = !Cstate;
    };
    const tstate = () => {
        job = "선생님";
        route = "teacher";
        Cstate = false;
        errmsg = "";
        tbc = 'E4E8FF';
        sbc = 'edf2f7';
    };
    const sstate = () => {
        job = "학생";
        route = "student";
        Cstate = false;
        errmsg = "";
        sbc = 'E4E8FF';
        tbc = 'edf2f7';
    };
</script>

<div class="container">
    <div class="head">로그인</div>
    <div class="box-job">
        <button class="job-select" on:click={cs}>
            <div class="text-select">{job}</div>
            <img src="/log/down.png" alt="down" style="height: 30px;" />
        </button>
        {#if Cstate}
            <button class="job-teacher" on:click={tstate} style="background-color:#{tbc}">선생님</button>
            <button class="job-student" on:click={sstate} style="background-color:#{sbc}">학생</button>
        {:else}
            <div class="blank" />
        {/if}
    </div>

    {#if curUser}
        <button
            class="loginbutton"
            on:click={async () => logout(firebaseConfig)}
        >
            로그아웃
        </button>
        <div>{$Userstore.name}</div>
        <div>{$Userstore.email}</div>
        <div>{$Userstore.phone}</div>
        <img src="{$Userstore.photoaddress}" alt="프로필 사진">
    {:else}
        <button class="loginbutton" on:click={() => login(firebaseConfig)}>
            로그인
        </button>
    {/if}
    <div class="errmsg">{errmsg}</div>
</div>

<style>
    .container {
        width: 520px;
        height: 630px;
        margin: auto;
    }
    .head {
        color: #32bbe7;
        margin: auto;
        width: 120px;
        font-size: 40px;
        font-weight: 600;
        margin: auto;
        padding-top: 40px;
        margin-bottom: 30px;
    }
    .loginbutton {
        background-color: #32bbe7;
        width: 400px;
        margin: auto;
        height: 60px;
        display: flex;
        color: white;
        border: none;
        font-size: 18px;
        margin-top: 50px;
        align-items: center;
        justify-content: center;
    }
    .job-select {
        background-color: #edf2f7;
        height: 50px;
        color: #b6a0a0;
        width: 130px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
    }
    .job-teacher {
        background-color: #edf2f7;
        height: 50px;
        color: #b6a0a0;
        width: 130px;
        text-align: center;
        display: flex;
        align-items: center;
        border: none;
        justify-content: center;
        font-size: 17px;
    }
    .job-student {
        background-color: #edf2f7;
        height: 50px;
        color: #b6a0a0;
        width: 130px;
        text-align: center;
        display: flex;
        align-items: center;
        border: none;
        justify-content: center;
        font-size: 17px;
    }
    .text-select {
        margin-right: 20px;
        margin-left: 10px;
        font-size: 15px;
        width: 100px;
    }
    .box-job {
        width: 130px;
        margin: auto;
    }
    .blank {
        height: 100px;
    }
    .errmsg {
        color: red;
        width: 400px;
        margin: auto;
    }
</style>
