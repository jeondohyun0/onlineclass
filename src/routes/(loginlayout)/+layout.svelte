<script lang="ts">
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
    import type { LayoutServerData } from "./$types";
    import { onMount } from "svelte";
    import { goto } from "$app/navigation";
    export let data:LayoutServerData;
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
</script>
{#if curUser}
    <slot />
    <div class="logoutbutton">
        {#if state}
        <button class="logout" on:click={async () => logout(firebaseConfig)}>로그아웃</button>
        {:else}
        <div style="width: 300px;"></div>
        {/if}
        <img class="profile" src="{$Userstore.photoaddress}" alt="account" id="account" on:click={logoutb}>
    </div>
{:else}
    <div>로딩 중...</div>
{/if}