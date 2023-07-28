<script>
    import Chat from '$lib/asset/chat.json'
    let index=0
    const plus = () => {
        index = index+1;
    }

</script>
<div class="container-chatting" id="container-chatting">
    {#each Chat.chat.slice(0, index) as {content, time}}
    <div class="container-message">
        <div class="content-time">
            <div class="time">{time}</div>
        </div>    
        <div class="content-chat">
                <div class="message">{content}</div>
        </div>
    </div>
    {/each}
</div>
<div class="box-chat">
    <img src="/classroom/chat/plus.png" id="plus" alt="plus">
    <input type="text">
    <button on:click={plus} id="plus">
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
        width: 550px;
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
        width: 580px;
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