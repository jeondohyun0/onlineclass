import { writable } from "svelte/store";

export const user = writable({
  name: '',
  email: '',
  phone: '',
  photoaddress: '',
  job:''
});

export const classcode = writable({
  code:''
})