<script lang="ts">
    import type { classinformation } from "$lib/DB";
    import { user as Userstore } from "$lib/store";
    import { onMount } from "svelte";
    import { classcode as Code } from "$lib/store";

    let classinformation: classinformation[] = [];

    let date: Date | null = null;
    let book: string = "";
    let stime: Date | null = null;
    let etime: Date | null = null;

    let errmsg: string = "";

    let state = false;

    const pluscontent = () => {
        state = true;
        errmsg = '';
    };
    const delcontent = () => {
        state = false;
    };

    const show = async () => {
        const res = await fetch(`/teacher/${$Userstore.email}/classin/api`, {
            method: "POST",
            body: JSON.stringify($Code.code),
            headers: {
                "content-type": "application/json",
            },
        });
        classinformation = await res.json();
        console.log(classinformation);
    };

    const storage = async () => {
        let D = date ? date.toString() : "";
        let B = book || "";
        let S = stime ? stime.toString() : "";
        let E = etime ? etime.toString() : "";
        if (D === "") {
            errmsg = "날짜를 선택해주세요";
        } else if (B === "") {
            errmsg = "교재를 선택해주세요";
        } else if (D === "" || E === "") {
            errmsg = "시간을 선택해주세요";
        } else {
            let C = $Code.code;
            console.log(D, B, S, E, C);
            const res = await fetch(
                `/teacher/${$Userstore.email}/classin/api2`,
                {
                    method: "POST",
                    body: JSON.stringify([D, B, S, E, C]),
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );
            state = false;
            date = null;
            book = "";
            stime = null;
            etime = null;
            show();
        }
    };

    const delclassin = async (id: string) => {
        const res = await fetch(
            `/teacher/${$Userstore.email}/classin/api3`,
            {
                method: "POST",
                body: JSON.stringify(id),
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        show();
    };

    onMount(async () => {
        if ($Userstore.email) {
            show();
        } else {
            console.error("User email is not defined");
        }
    });
</script>

<div class="container">
    <div class="box-head">
        <a href="/teacher/{$Userstore.email}/classroom/manage">
            <img
                src="/classin/before.png"
                alt="before"
                style="height: 30px; margin: 10px 5px"
            />
        </a>
    </div>
    <div class="container-date">
        <button class="plus-in" on:click={pluscontent}>
            <img src="/classin/plus.png" class="plus" alt="plus" />
            <div class="information">일정 추가하기</div>
        </button>
        {#if state}
            <div class="pluscontent">
                <div class="button-head">
                    <button class="button-before" on:click={delcontent}
                        >취소</button
                    >
                    <button class="button-sure" on:click={storage}>저장</button>
                </div>
                <div class="date">
                    <div class="text-date">날짜</div>
                    <input class="bar-date" type="date" bind:value={date} />
                </div>
                <div class="book">
                    <div class="text-book">교재</div>
                    <input class="bar-book" type="text" bind:value={book} />
                </div>
                <div class="time">
                    <div class="text-time">시간</div>
                    <div class="time-box">
                        <input
                            class="bar-time-first"
                            type="time"
                            bind:value={stime}
                        />
                        ~
                        <input
                            class="bar-time-second"
                            type="time"
                            bind:value={etime}
                        />
                    </div>
                </div>
                <div style="color: red;">{errmsg}</div>
            </div>
        {/if}
        {#each classinformation as c}
            <div class="content-classinformation">
                <div class="left-information">{c.date}</div>
                <div class="length" />
                <div class="right-information">
                    <div>교재 {c.book}</div>
                    <div>시간 {c.stime} ~ {c.etime}</div>
                </div>
                <button class="del-in" on:click={() => delclassin(c._id)}>
                    <div>삭제</div>
                </button>
            </div>
        {/each}
    </div>
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
    }
    .plus {
        height: 35px;
        margin-top: 5px;
    }
    .information {
        color: #836666;
        font-weight: 500px;
        margin-top: 3px;
    }
    .plus-in {
        height: 63px;
        width: 100px;
        border-radius: 10px;
        border: #d9d9d9;
        display: flex;
        margin: 30px auto;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .content-classinformation {
        width: 500px;
        border-radius: 10px;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding-left: 5px;
        color: #836666;
        background-color: #f7f5f5;
        margin-bottom: 30px;
        display: flex;
        flex-wrap: wrap;
    }
    .length {
        height: 70px;
        border: 1px solid #d4c2c2;
        width: 0px;
    }
    .left-information {
        margin: auto;
        font-size: large;
    }
    .del-in {
        border: #d9d9d9;
        background-color: #e4d8d8;
        display: flex;
        margin: 30px auto;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .container-date {
        display: flex;
        flex-direction: column;
        height: 580px;
        overflow: auto;
        width: 520px;
        margin: auto;
        align-items: center;
    }
    .container-date::-webkit-scrollbar {
        display: none;
    }
    .pluscontent {
        background-color: #f7f5f5;
        width: 310px;
        margin: auto;
        border-radius: 10px;
        padding: 5px;
        margin-bottom: 289px;
    }
    input {
        width: 300px;
        border: 1px solid #000000;
        outline: none;
    }
    .button-before {
        background-color: #e4d8d8;
        width: 42px;
        text-align: center;
        border: none;
        font-size: 15px;
    }
    .button-sure {
        background-color: #e4d8d8;
        width: 42px;
        text-align: center;
        border: none;
        margin: 1px;
        font-size: 15px;
    }
    .button-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
    }
    .bar-time-first {
        width: 130px;
    }
    .bar-time-second {
        width: 130px;
    }
    .time-box {
        width: 300px;
        margin: auto;
    }
</style>
