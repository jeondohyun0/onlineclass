import { env } from '$env/dynamic/private';

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

export const load = async (): Promise<page> => {
    const {
      apiKey,
      authDomain,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId
    } = env;

  return {
     firebaseConfig:{
         apiKey, 
         authDomain, 
         projectId, 
         storageBucket, 
         messagingSenderId, 
         appId, 
         measurementId
     }
  };
};
