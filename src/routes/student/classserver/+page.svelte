<script lang="ts">
    import { onMount } from "svelte";
    let mstate = true;
    let pstate = false;
    let estate = false;
    let sstate = "off";
    let startButtonDisable = false;

    let canvas1: HTMLCanvasElement;
    let canvas2: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D | null = null;
    let ctx2:CanvasRenderingContext2D | null = null;    //추가
    let painting: boolean = false;
    let painting2: boolean = false;

    const mike = () => {
      mstate = !mstate;
    };

    const pen = () => {
      pstate = !pstate;
      estate = false;
    };

    const eraser = () => {
      estate = !estate;
      pstate = false;
    };

    

    // canvas1 그림 그리기를 멈추는 함수를 정의
    const stopPainting = () => {
      painting = false;
    };

    // canvas1 그림 그리기를 시작하는 함수를 정의
    const startPainting = () => {
      painting = true;
    };

    const stopPainting2 = () => {
        painting2 = false;
    }

    const startPainting2 = () => {
        painting2 = true;
    }

  
    // 마우스가 움직일 때 호출되는 함수를 정의
    const onMouseMove = (event: MouseEvent) => {
      if (ctx && (pstate || estate)) {
        // pstate 또는 estate가 true일 때만 처리
        const x = event.offsetX;
        const y = event.offsetY;

        if (painting) {
          // 마우스 클릭한 상태일 때
          if (estate) {
            // 지우개 모드일 때
            ctx.clearRect(x - 10, y - 10, 20, 20); // 움직인 좌표 주변을 지움
          } else {
            // 그리기 모드일 때
            ctx.lineTo(x, y); //움직인 좌표 그리기
            ctx.stroke();
          }
        } else if (pstate) {
          // 마우스 클릭하지 않은 상태일 때
          ctx.beginPath();
          ctx.moveTo(x, y);
        }
      }
    };

    const onMouseMove2 = (event: MouseEvent) => {
      if (ctx2 && (pstate || estate)) {
        // pstate 또는 estate가 true일 때만 처리
        const x = event.offsetX;
        const y = event.offsetY;

        if (painting2) {
          // 마우스 클릭한 상태일 때
          if (estate) {
            // 지우개 모드일 때
            ctx2.clearRect(x - 10, y - 10, 20, 20); // 움직인 좌표 주변을 지움
          } else {
            // 그리기 모드일 때
            ctx2.lineTo(x, y); //움직인 좌표 그리기
            ctx2.stroke();
          }
        } else if (pstate) {
          // 마우스 클릭하지 않은 상태일 때
          ctx2.beginPath();
          ctx2.moveTo(x, y);
        }
      }
    };

    // 화면 공유 중지 함수
    const stopSharing = () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        stream = null;
        isSharing = false;
        sstate = "off"; // 버튼 변경
        startButtonDisable = false;
        pstate = false;
        estate = false;
      }
    };
  
    const startShare = async () => {
      if (isSharing) {
        stopSharing(); // 화면 공유 중이면 중지
        if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }
      } else {
        const options: MediaStreamConstraints = { audio: true, video: true };
        try {
          stream = await navigator.mediaDevices.getDisplayMedia(options);
          const track = stream.getVideoTracks()[0];
          const process =  new MediaStreamTrackProcessor({track});
          const reader = process.readable.getReader();
          readChunk();
          async function readChunk() {
            const { done, value } = await reader.read();
            if(!value || !ctx) return;
            
            ctx.clearRect( 0, 0, canvas1.width, canvas1.height );
            // value is a VideoFrame
            ctx.drawImage( value, 0, 0, value.displayWidth, value.displayHeight, 0, 0, canvas1.width, canvas1.height);
            value.close(); // close the VideoFrame when we're done with it
            if( !done ) {
              readChunk();
            } else {
              if (!errorMsg) {
                errorMsg = 'The user has ended sharing the screen';
              }
              isSharing = false;
              sstate = 'on';// 버튼 변경
              startButtonDisable = false;
            }
          }
          isSharing = true;
          sstate = 'on'; // 버튼 변경
          startButtonDisable = false;
          
        } catch (err) {
          if (!(err instanceof Error)) return;
          if (!errorMsg) {
            errorMsg = `getDisplayMedia error: ${err.name}`;
          }
          console.error(err);
        }
      }
    };
  
    onMount(() => {
      ctx = canvas1.getContext("2d");
      ctx2 = canvas2.getContext("2d");
    });
    
  
    // 모두 지우기 버튼 클릭 했을 때
    const handleClearButtonClick = () => {
      if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      }
      if (ctx2) {
        ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
      }
      pstate = false;
      estate = false;
    };
  
    let errorMsg: string = "";
  
    let isSharing: boolean = false;
  
    let stream: MediaStream | null = null;
  
    onMount(() => {
      // | null = document.getElementById('startButton') as HTMLButtonElement | null;
  
      if (navigator.mediaDevices && "getDisplayMedia" in navigator.mediaDevices) {
        startButtonDisable = false;
      } else {
        if (!errorMsg) {
          errorMsg = "getDisplayMedia is not supported";
        }
      }
    });
  </script>
  
  <div class="container">
    <div class="button-head">
      <div class="icon-mike">
        {#if mstate}
          <img src="/classserver/mikeon.png" on:click={mike} alt="mike" />
        {:else}
          <img src="/classserver/mikeoff.png" on:click={mike} alt="mike" />
        {/if}
      </div>
      
      <button
        class="icon-sharing"
        id="startButton"
        disabled={startButtonDisable}
        on:click={startShare}
      >
        <img class="share" src="/classserver/sharing{sstate}.png" alt="sharing"/>
      </button>
      <div class="icon-pen">
        {#if pstate}
          <img src="/classserver/penon.png" on:click={pen} alt="pen" />
        {:else}
          <img src="/classserver/penoff.png" on:click={pen} alt="pen" />
        {/if}
      </div>
      <div class="icon-eraser" style="margin-left:px;">
        {#if estate}
          <img src="/classserver/eraseron.png" on:click={eraser} alt="eraser" />
        {:else}
          <img src="/classserver/eraseroff.png" on:click={eraser} alt="eraser" />
        {/if}
      </div>
      <img
        src="/classserver/alldel.png"
        class="alldel"
        on:click={handleClearButtonClick}
        alt="pen"
      />
      <a href="/student/classroom/class">
        <img src="/classserver/exit.png" id="exit" alt="exit" />
      </a>
    </div>
    <hr />
    <div class="box-canvas">
      <canvas
        width={520}
        height={430}
        on:mousemove={onMouseMove}
        on:mousedown={startPainting}
        on:mouseup={stopPainting}
        bind:this={canvas1}
        id="canvas1"
      />
      <canvas 
        width={520}
        height={430}
        on:mousemove={onMouseMove2}
        on:mousedown={startPainting2}
        on:mouseup={stopPainting2}
        bind:this={canvas2}
        id="canvas2" 
      />
    </div>
    
    {#if errorMsg}
      <div id="errorMsg">{errorMsg}</div>
    {/if}
  </div>
  
  <style>
    .container {
      margin: auto;
      width: 520px;
      height: 630px;
      border: 1px solid #000000;
    }
    img {
      height: 45px;
      margin: 4px;
      margin-top: 7px;
      margin-bottom: 0px;
    }
    #exit {
      margin-left: 150px;
      margin-top: 10px;
    }
    #canvas1 {
      cursor: pointer;
    }
    #canvas2 {
        cursor: pointer;
    }
    .button-head {
      display: flex;
    }
    .icon-sharing {
      border: none;
      width: 60px;
      background-color: white
    }
    .share {
      margin: auto;
      margin-top: 4px
    }
    .box-canvas {
        position: relative;
    }
    .box-canvas canvas{
        position: absolute;
        top:0px;
        left:0px;
    }
  </style>
  