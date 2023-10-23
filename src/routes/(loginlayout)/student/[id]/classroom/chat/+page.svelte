<script lang="ts">
    import { afterUpdate } from "svelte";
    import { classcode as Code } from "$lib/store";
    import { onMount } from "svelte";
    import type { chatting } from "$lib/DB";
    import { user as Userstore } from "$lib/store";
    import type Peer from "peerjs";
    import type { DataConnection } from "peerjs";

    interface Message {
        text: string;
        side: string;
        time: string;
    }

    let peer: Peer;
    let conn: DataConnection | null = null;

    let peerId: string = "";
    let remoteId: string = "";
    let sendMessageBox: string = "";

    let status: string = "";

    let premessages: chatting[] = [];
    let messages: Message[] = [];

    let element: HTMLDivElement;
    afterUpdate(() => {
        if (messages) scrollToBottom(element);
    });
    $: if (messages && element) {
        scrollToBottom(element);
    }
    const scrollToBottom = async (node: HTMLDivElement) => {
        node.scroll({ top: node.scrollHeight, behavior: "smooth" });
    };

    const show = async () => {
        const res = await fetch(
            `/student/${$Userstore.email}/classroom/chat/api`,
            {
                method: "POST",
                body: JSON.stringify($Code.code),
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        premessages = await res.json();
    };

    const storechat = async (msg: string, t: string) => {
        let M = msg;
        let C = $Code.code;
        let T = t;
        const res = await fetch(
            `/student/${$Userstore.email}/classroom/chat/api2`,
            {
                method: "POST",
                body: JSON.stringify([M, C, T]),
                headers: {
                    "content-type": "application/json",
                },
            }
        );
    };

    interface sendid {
        id: string;
        classcode: string;
        loc: string;
    }
    let ID: sendid;
    let connect = false;

    onMount(async () => {
        if ($Userstore.email) {
            show();
        } else {
            console.error("User email is not defined");
        }
        const Peer = (await import("peerjs")).default;
        peer = new Peer();
        const ws = new WebSocket("ws://0nlineclass.kro.kr:3000/");

        peer.on("open", function (id) {
            peerId = id;
            status = "Awaiting connection...";

            ID = {
                id: peerId,
                classcode: $Code.code,
                loc: "chattingroom",
            };
            ws.send(JSON.stringify(ID));
        });

        ws.addEventListener("message", (ev) => {
            /** @type {{type: string, message:string, user:number}} */
            const json = JSON.parse(ev.data);
            if (json.type === "message") {
                const message = JSON.parse(json.message);
                if (message.classcode !== $Code.code) {
                    return;
                }
                if (message.loc !== "chattingroom") {
                    return;
                }
                if (message.id === (peerId || remoteId)) {
                    return;
                }
                if (remoteId === "") {
                    remoteId = message.id;
                    console.log(remoteId);
                }
                if (!connect) {
                    connect = true;
                    ws.send(JSON.stringify(ID));
                }
                join();
            } else if (json.type === "close") {
                if (remoteId !== "") {
                    connect = false;
                    remoteId = "";
                }
            }
        });

        peer.on("connection", function (con2) {
            if (conn && conn.open) {
                con2.on("open", function () {
                    con2.send("Already connected to another client");
                    setTimeout(function () {
                        con2.close();
                    }, 500);
                });
                return;
            }
            conn = con2;
            status = "연결됨";
            ready();
        });

        peer.on("disconnected", () => {
            status = "Connection lost. Please reconnect.";
            peer!.reconnect();
        });

        peer.on("close", () => {
            conn = null;
            status = "Connection destroyed";
        });

        peer.on("error", (err) => {
            alert(err);
        });
    });

    const ready = () => {
        conn!.on("data", (data: any) => {
            if (typeof data === "string") addMessage(data, "left");
        });

        conn!.on("close", () => {
            status = "Connection reset. Awaiting connection...";
            conn = null;
        });
    };

    const join = () => {
        if (conn) {
            conn.close();
        }
        conn = peer!.connect(remoteId);

        ready();
    };

    const addMessage = (msg: string, side: string) => {
        let now = new Date();
        let h: number = now.getHours();
        let m: number = now.getMinutes();
        let s: number = now.getSeconds();

        let hString: string = h < 10 ? "0" + h : h.toString();
        let mString: string = m < 10 ? "0" + m : m.toString();
        let sString: string = s < 10 ? "0" + s : s.toString();
        let t = `${hString}:${mString}:${sString}`;

        storechat(msg, t);

        messages = [
            ...messages,
            {
                text: msg,
                side: side,
                time: t,
            },
        ];
    };

    const sendMessage = () => {
        let msg = sendMessageBox;
        if (msg !== "") {
            sendMessageBox = "";
            addMessage(msg, "right");
            if (conn && conn.open) {
                conn.send(msg);
            }
        }
    };
</script>

<div bind:this={element} class="container-chatting">
    <!--이전에 채팅했던 기록들-->
    {#each premessages as message}
        {#if message.side === "student"}
            <div class="container-message-right">
                <div class="content-time-right">
                    <div class="time-right">{message.time}</div>
                </div>
                <div class="content-chat-right">
                    <div class="message-right">{message.text}</div>
                </div>
            </div>
        {:else}
            <div class="container-message-left">
                <div class="name">name</div>
                <div class="chattime">
                    <div class="content-chat-left">
                        <div class="message-left">{message.text}</div>
                    </div>
                    <div class="content-time-left">
                        <div class="time-left">{message.time}</div>
                    </div>
                </div>
            </div>
        {/if}
    {/each}
    <!--실시간 채팅할 때-->
    {#each messages as message}
        {#if message.side === "right"}
            <div class="container-message-right">
                <div class="content-time-right">
                    <div class="time-right">{message.time}</div>
                </div>
                <div class="content-chat-right">
                    <div class="message-right">{message.text}</div>
                </div>
            </div>
        {:else}
            <div class="container-message-left">
                <div class="name">name</div>
                <div class="chattime">
                    <div class="content-chat-left">
                        <div class="message-left">{message.text}</div>
                    </div>
                    <div class="content-time-left">
                        <div class="time-left">{message.time}</div>
                    </div>
                </div>
            </div>
        {/if}
    {/each}
</div>
<div class="box-chat">
    <img src="/classroom/chat/plus.png" id="plus" alt="plus" />
    <input type="text" bind:value={sendMessageBox} />
    <button on:click={sendMessage} id="plus">
        <img src="/classroom/chat/send.png" id="send" alt="send" />
    </button>
</div>
<div>my id {peerId}</div>
<div>opp id {remoteId}</div>

<style>
    .box-chat {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        background-color: #f5f5f5;
        border-radius: 20px;
        width: 470px;
        height: 40px;
        padding: 5px;
        gap: 10px;
        margin: 3px auto;
    }
    img {
        height: 100%;
    }
    input {
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
        background-color: #f5f5f5;
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
    .content-chat-left {
        margin-bottom: 15px;
        border-radius: 5px;
        background-color: #f5f5f5;
        color: #836666;
    }
    .container-message-left {
        margin: 0 auto 0 0;
    }
    .time-left {
        font-size: 10px;
        font-weight: 700px;
        margin-top: 10px;
        margin-right: 3px;
    }
    .chattime {
        display: flex;
        justify-content: center;
        margin-left: 5px;
    }
    /*왼쪽*/
    /*오른쪽*/
    .content-chat-right {
        margin-bottom: 15px;
        border-radius: 5px;
        background-color: #f5f5f5;
        color: #836666;
    }
    .container-message-right {
        display: flex;
        justify-content: center;
        margin: 0 0 0 auto;
    }
    .time-right {
        font-size: 10px;
        font-weight: 700px;
        margin-top: 10px;
        margin-right: 3px;
    }
    /*오른쪽*/
</style>

