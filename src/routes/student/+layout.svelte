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
    interface page {
    firebaseConfig: {
        apiKey: string,
        authDomain: string,
        projectId: string,
        storageBucket: string,
        messagingSenderId: string,
        appId: string,
        measurementId?: string
    }
}
    export let data:page;
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
        if(getApps().length === 0) {
            initializeApp(firebaseConfig);
        }
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        try{
            await setPersistence(auth, browserSessionPersistence);
            const result:any = await signInWithPopup(auth, provider);
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
<slot/>