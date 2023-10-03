<script lang="ts">
    import { classcode as Code } from "$lib/store";
    import { page } from "$app/stores";
    import { user as Userstore } from "$lib/store";
    import { goto } from "$app/navigation";
    $: pathname = $page.url.pathname;
    const urlInfo = [
        { url: "/class", name: "수업" },
        { url: "/chat", name: "채팅" },
        { url: "/manage", name: "수업 관리" },
    ];

    let mstate = false;

    const more = () => {
        mstate = true;
    };

    const del = async () => {
        let C  = $Code.code;
        console.log("C");
        const res = await fetch(
            `/teacher/${$Userstore.email}/classroom/api`,
            {
                method: "POST",
                body: JSON.stringify(C),
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        goto(`/teacher/${$Userstore.email}/home`);
    };

    const cancel = () => {
        mstate = false;
    };
</script>

<div class="container">
    <div class="box-head">
        <a href="/teacher/${$Userstore.email}/home">
            <img
                src="/classroom/class/home.png"
                on:click={() => {
                    $Code.code = "";
                    console.log($Code.code);
                }}
                alt="home"
                id="home"
                style="height: 40px; margin: 5px auto"
            />
        </a>
        {#if mstate}
            <button>
                <div class="delroom" on:click={del}>방 없애기</div>
                <div class="blank" />
                <div class="cancel" on:click={cancel}>취소</div>
            </button>
        {:else}
            <img
                src="/classroom/more.png"
                alt=""
                class="seemore"
                on:click={more}
            />
        {/if}
    </div>
    <table>
        <tr>
            {#each urlInfo as { url, name }}
                <td
                    class={pathname ===
                    `/teacher/${$Userstore.email}/classroom${url}`
                        ? "active"
                        : ""}
                >
                    <a
                        href="/teacher/${$Userstore.email}/classroom{url}"
                        style="text-decoration: none; color: #836666;"
                    >
                        <div style="width: auto;">{name}</div>
                    </a>
                </td>
            {/each}
        </tr>
    </table>
    <slot />
</div>

<style>
    .container {
        margin: auto;
        width: 520px;
        height: 630px;
    }
    .box-head {
        background-color: #32bbe7;
        width: 520px;
        height: 50px;
        display: flex;
        justify-content: space-between;
    }
    table {
        background-color: #ffffff;
        color: #836666;
        border: 1px solid #b6a0a0;
        border-collapse: collapse;
        width: 520px;
        text-align: center;
    }
    table td {
        border: 1px solid #b6a0a0;
        padding: 10px 0;
        width: 120px;
    }
    .active {
        background-color: #e4dcdc;
    }
    .seemore {
        height: 30px;
        margin-top: 10px;
        margin-right: 15px;
    }

    button {
        margin-left: 250px;
        margin-top: 6px;
        width: 200px;
        height: 40px;
        margin-right: 15px;
        background-color: transparent;
        border: 1px solid white;
        display: flex;
        justify-content: space-between;
    }
    .delroom {
        font-size: 20px;
        margin-top: 5px;
        color: #ffffff;
    }

    .cancel {
        margin-left: 70px;
        margin-top: 18px;
        color: black;
    }
</style>
