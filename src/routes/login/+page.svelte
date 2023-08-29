<script lang="ts">
    import { onMount } from 'svelte';
    import { 
        GoogleAuthProvider, //로그인
        browserSessionPersistence, //로그인 기록 남김
        getAuth, //로그인 인증 정보 나옴
        onAuthStateChanged, 
        setPersistence, //browserSessionPersistence과 같이 쓰임
        signInWithPopup //어떻게 뜨게 할지
    } from 'firebase/auth';
    import type { User } from 'firebase/auth';
    import {
        getApps, //들어와 있는 상태인지 파악
        initializeApp, //앱 만들 때
        FirebaseError
    } from 'firebase/app';
    import type { FirebaseOptions } from 'firebase/app';
    import type { PageData } from './$types';
    export let data:PageData;
    const firebaseConfig = data.firebaseConfig;
    let curUser:User|null = null;
    onMount(() => {
        if(getApps().length === 0){
            initializeApp(firebaseConfig);
        }
        const auth = getAuth();
        const un = onAuthStateChanged(auth, user => {
            curUser = user;
        });
        return () => {
            un();
        }
    });

    const login = async (firebaseConfig:FirebaseOptions) => {
        if(getApps().length === 0){
            initializeApp(firebaseConfig);
        }
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        try{
            await setPersistence(auth, browserSessionPersistence);
            const result = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            const user = result.user;
            return { token , user};
        } catch(error){
            if(error instanceof FirebaseError){
                const code = error.code;
                const message = error.message;
                // The email of the user's account used.
                const email = error.customData?.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                console.log({
                    code, message, email, credential
                });
            } else {
                console.log(error);
            }
        }
    };

    const logout = async (firebaseConfig:FirebaseOptions) => {
        if(getApps().length === 0) {
            initializeApp(firebaseConfig);
        }
        const auth = getAuth();
        await auth.signOut();
    }
</script>
<div class="container">
    <div class="head">로그인</div>
    
    {#if curUser}
    <button on:click={async () => logout(firebaseConfig)}>
        로그아웃
    </button>
        <div>{curUser.displayName}</div>
        <div>{curUser.phoneNumber}</div>
        <div>{curUser.email}</div>
    {:else}
    <button on:click={() => login(firebaseConfig)}>
        로그인
    </button>
    {/if}
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
    button {
        background-color: #32BBE7;
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
</style>