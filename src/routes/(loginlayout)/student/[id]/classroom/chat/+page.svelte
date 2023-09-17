<script lang="ts">
    import Chat from '$lib/asset/chat.json'
    import { afterUpdate } from 'svelte';

    const inform = Chat.chat

    interface chatting {
        CONTENT?: string;
        TIME?: string;
    }

    let chatin: chatting[] = [];

    let element:HTMLDivElement;
    afterUpdate(() => {
		if(chatin) scrollToBottom(element);
    });
    $: if(chatin && element) {
        scrollToBottom(element);
    }
    const scrollToBottom = async (node:HTMLDivElement) => {
    node.scroll({ top: node.scrollHeight, behavior: 'smooth' });
    }; 

    let num = 0

    const chats = () => {
        let CONTENT = inform[num].content;
        let TIME = inform[num].time;

        return {
            CONTENT,
            TIME
        }
    }

    const plus = () => {
        num = num + 1;
        return chatin = [...chatin, chats()]
    }








    




</script>
<div bind:this={element} class="container-chatting">
    {#each chatin as {CONTENT, TIME}}
    <div class="container-message">
        <div class="content-time">
            <div class="time">{TIME}</div>
        </div>    
        <div class="content-chat">
                <div class="message">{CONTENT}</div>
        </div>
    </div>
    {/each}
</div>
<div class="box-chat">
    <img src="/classroom/chat/plus.png" id="plus" alt="plus">
    <input type="text">
    <button on:click={plus}>
        <img src="/classroom/chat/send.png" id="send" alt="send">
    </button>
</div>
<style>
    .box-chat {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        background-color: #F5F5F5;
        border-radius: 20px;
        width: 470px;
        height: 40px;
        padding:5px;
        gap:10px;
        margin: 3px auto;
    }
    img{
        height: 100%;
    }
    input{

        font-size: 20px;
        flex-grow: 1;
        background-color: transparent;
        outline: none;
        border: none;
    }
    button {
        height: 100%;
        border: none;
        border-radius: 10px;
        background-color: #F5F5F5;
    }
    .container-chatting {
        display: flex;
        flex-direction: column;
        height: 490px;
        overflow: auto;
        width: 500px;
        margin: auto;
    }
    .container-chatting::-webkit-scrollbar {
        display: none;
    }
    .content-chat {
        margin-bottom: 15px;
        border-radius: 5px;
        background-color: #F5F5F5;
        color: #836666;
    }
    .container-message {
        display: flex;
        justify-content: center;
        margin: 0 0 0 auto;
    }
    .time {
        font-size: 10px;
        font-weight: 700px;
        margin-top: 10px;
        margin-right: 3px;
    }
</style>