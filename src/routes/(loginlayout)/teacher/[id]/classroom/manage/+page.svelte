<script lang="ts">
    import { user as Userstore } from "$lib/store";
    import type { homework } from "$lib/DB";
    import { onMount } from "svelte";
    import { classcode as Code } from "$lib/store";

    let homework: homework[] = [];

    let Rdate: Date | null = null;
    let Sdate: Date | null = null;
    let Book: string;
    let Srange: number = 0;
    let Erange: number = 0;

    let errmsg: string = "";

    let state = false;

    const pluscontent = () => {
        state = true;
    };
    const cancel = () => {
        state = false;
        errmsg = "";
    };

    const show = async () => {
        const res = await fetch(
            `/teacher/${$Userstore.email}/classroom/manage/api`,
            {
                method: "POST",
                body: JSON.stringify($Code.code),
                headers: {
                    "content-type": "application/json",
                },
            }
        );
        homework = await res.json();
    };

    const addhomework = async () => {
        let R = Rdate ? Rdate.toString() : "";
        let S = Sdate ? Sdate.toString() : "";
        let B = Book || "";
        let F = Srange ? Srange.toString() : "";
        let E = Erange ? Erange.toString() : "";
        if (R === "") {
            errmsg = "등록일을 선택해주세요";
        } else if (S === "") {
            errmsg = "제출일을 선택해주세요";
        } else if (B === "") {
            errmsg = "교재를 선택해주세요";
        } else if (F === "" || E === "") {
            errmsg = "범위를 선택해주세요";
        } else {
            let C = $Code.code;
            console.log(R, S, B, F, E, C);
            const res = await fetch(
                `/teacher/${$Userstore.email}/classroom/manage/api2`,
                {
                    method: "POST",
                    body: JSON.stringify([R, S, B, F, E, C]),
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );
            state = false;
            Rdate = null;
            Sdate = null;
            Book = "";
            Srange = 0;
            Erange = 0;
            errmsg = "";
            show();
        }
    };

    const delhomework = async (id: string) => {
        const res = await fetch(
            `/teacher/${$Userstore.email}/classroom/manage/api3`,
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

    onMount(() => {
        if ($Userstore.email) {
            show();
        } else {
            console.error("User email is not defined");
        }
    });
</script>

<div class="box-classin">
    <div class="text-classin">수업 정보</div>
    <a href="/teacher/${$Userstore.email}/classin">
        <img
            src="/classroom/manage/classin.png"
            class="classin"
            alt="classin"
        />
    </a>
</div>
<div class="box-task">
    <div class="text-task">과제</div>
</div>

<div class="container-homework">
    <button class="homeworkplus" on:click={pluscontent}>
        <img src="/classroom/manage/plus.png" class="plus" alt="plus" />
        <div class="homework">숙제 추가하기</div>
    </button>
    {#if state}
        <div class="pluscontent">
            <div class="button-head">
                <button class="button-before" on:click={cancel}>취소</button>
                <button class="button-sure" on:click={addhomework}>저장</button>
            </div>
            <div class="rdate">
                <div class="text-rdate">등록일</div>
                <input class="bar-rdate" type="date" bind:value={Rdate} />
            </div>
            <div class="sdate">
                <div class="text-sdate">제출일</div>
                <input class="bar-sdate" type="date" bind:value={Sdate} />
            </div>
            <div class="book">
                <div class="text-book">교재</div>
                <input class="bar-book" type="text" bind:value={Book} />
            </div>
            <div class="range">
                <div class="text-range">범위</div>
                <div class="range-box">
                    <input
                        class="bar-range-first"
                        type="number"
                        min="0"
                        bind:value={Srange}
                    />
                    ~
                    <input
                        class="bar-range-second"
                        type="number"
                        min="0"
                        bind:value={Erange}
                    />
                </div>
            </div>
            <div style="color: red;">{errmsg}</div>
        </div>
    {/if}
    {#each homework as h}
        <div class="content-homework">
            <div>등록일 | {h.sdate}</div>
            <div>제출일 | {h.edate}</div>
            <div>교재 | {h.book}</div>
            <div>범위 | {h.srange} ~ {h.erange}</div>
            <button class="del-in" on:click={() => delhomework(h._id)}>
                <div>삭제</div>
            </button>
        </div>
    {/each}
</div>

<style>
    .box-classin {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        background-color: #32bbe7;
        width: 520px;
        height: 30px;
        padding: 5px;
        border: 1px solid #b6a0a0;
    }
    .text-classin {
        color: #ffffff;
    }
    .box-task {
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-sizing: border-box;
        background-color: #32bbe7;
        width: 520px;
        height: 30px;
        padding: 5px;
        border: 1px solid #b6a0a0;
    }
    .text-task {
        color: #ffffff;
    }
    .homeworkplus {
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
    .plus {
        height: 35px;
        margin-top: 5px;
    }
    .homework {
        color: #836666;
        font-weight: 500px;
        margin-top: 3px;
    }
    .content-homework {
        width: 500px;
        border-radius: 10px;
        height: 100px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 5px;
        color: #836666;
        background-color: #f7f5f5;
        margin-bottom: 30px;
        display: flex;
        flex-wrap: wrap;
    }
    .del-in {
        background-color: #e4d8d8;
        display: flex;
        margin: auto;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        border: #d9d9d9;
        width: 100px;
        height: 50px;
        font-size: 18px;
    }
    .container-homework {
        display: flex;
        flex-direction: column;
        height: 477px;
        overflow: auto;
        width: 520px;
        margin: auto;
        align-items: center;
    }
    .container-homework::-webkit-scrollbar {
        display: none;
    }
    .classin {
        height: 20px;
        margin-top: 4px;
    }
    input {
        width: 300px;
        border: 1px solid #000000;
        outline: none;
    }
    .pluscontent {
        background-color: #f7f5f5;
        width: 310px;
        margin: auto;
        border-radius: 10px;
        padding: 5px;
        margin-bottom: 135px;
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
    .bar-range-first {
        width: 130px;
    }
    .bar-range-second {
        width: 130px;
    }
    .range-box {
        width: 300px;
        margin: auto;
    }
</style>
