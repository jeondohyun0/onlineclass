<script lang="ts">
    import { page } from '$app/stores';
    $:pathname = $page.url.pathname;
    const urlInfo = [
        { url: "/class", name:"수업"},
        { url: "/chat", name:"채팅"},
        { url: "/manage", name:"수업 관리"}
    ]
</script>
<div class="container">
    <div class="box-head">
        <a href="/teacher/home">
            <img src="/classroom/class/home.png" alt="home" id="home" style="height: 40px; margin: 5px auto"/>
        </a>
    </div>
    <table>
        <tr>
            {#each urlInfo as { url, name}}
                <td class={pathname === `/teacher/classroom${url}` ? 'active' : ''}>
                    <a
                        href="/teacher/classroom{url}"
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
    .active{
        background-color: #E4DCDC;
    }
</style>
