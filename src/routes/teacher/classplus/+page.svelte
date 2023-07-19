<script>
    import Homework from '$lib/asset/homework.json'
    const inform = Homework.homework

    

</script>

<div>
    {inform[1].rdate}
</div>
{#each inform as {rdate, sdate, book, range}}
    <div class="content-homework">
        <div>등록일 | {rdate}</div>
        <div>제출기한 | {sdate}</div>
        <div>교재 | {book}</div>
        <div>범위 | {range}</div>
    </div>
{/each}