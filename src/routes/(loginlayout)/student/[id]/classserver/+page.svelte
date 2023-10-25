<script lang="ts">
  import { onMount } from "svelte";
  import type Peer from "peerjs";
  import type { MediaConnection } from "peerjs";
  import type { DataConnection } from "peerjs";
  import { user as Userstore } from "$lib/store";
  import { classcode as Code } from "$lib/store";
  import { goto } from "$app/navigation";

  let peerId: string = "";
  let remotePeerIdValue: string = "";
  let peer: Peer;

  let screenconn: DataConnection | null = null; //화면
  let screencall: MediaConnection | null = null; //화면

  let videoconn: DataConnection | null = null; //비디오
  let videocall: MediaConnection | null = null; //비디오

  let audiocall: MediaConnection | null = null; //오디오

  let audioElement: HTMLAudioElement | undefined; //오디오

  let screensharestate = "off";
  let screenstartButtonDisable = false;

  let videosharestate = "off";
  let videostartButtonDisable = false;

  let canvas1: HTMLCanvasElement; //자신의 화면
  let canvas2: HTMLCanvasElement; //상대의 화면
  let ctx1: CanvasRenderingContext2D | null = null;
  let ctx2: CanvasRenderingContext2D | null = null;

  let canvas3: HTMLCanvasElement; //나의 비디오
  let canvas4: HTMLCanvasElement; //상대의 비디오
  let ctx3: CanvasRenderingContext2D | null = null;
  let ctx4: CanvasRenderingContext2D | null = null;

  let errorMsg: string = "";

  let isscreenSharing: boolean = false;
  let isvideoSharing: boolean = false;

  let screenstream: MediaStream | null = null;
  let videostream: MediaStream | null = null;

  let Screensharestate = false;
  let Videosharestate = false;

  let screenshareroom: HTMLElement;

  let sharestate = false;

  let pstate = false;
  let estate = false;

  let canvasconn: DataConnection | null = null;
  let remotepainting: boolean | null = null;

  let canvas5: HTMLCanvasElement;
  let ctx5: CanvasRenderingContext2D | null = null;
  let painting: boolean = false;

  const pen = () => {
    pstate = !pstate;
    estate = false;
  };

  const eraser = () => {
    estate = !estate;
    pstate = false;
  };

  const mine = () => {
    screenshareroom.scrollTo({ left: 0 });
  };

  const opp = () => {
    screenshareroom.scrollTo({ left: 520 });
  };

  const AudiostopSharing = () => {
    if (audiocall) {
      audiocall.close();
      audiocall = null;
    }
  };

  const Audiosendstream = (stream: MediaStream) => {
    if (remotePeerIdValue && stream) {
      audiocall = peer.call(remotePeerIdValue, stream, {
        metadata: { type: "auido" },
      });
    }
  };

  const AudiostartShare = async () => {
    if (audiocall) {
      AudiostopSharing();
    } else {
      const options: MediaStreamConstraints = {
        audio: true,
        video: false,
      };

      try {
        const audiostream = await navigator.mediaDevices.getUserMedia(options);
        Audiosendstream(audiostream);
      } catch (err: any) {
        console.log(`getUserMedia error:${err.name}`);
      }
    }
  };

  const Audioreceive = () => {
    peer.on("call", (incomingCall) => {
      if (incomingCall.metadata && incomingCall.metadata.type) {
        console.log(incomingCall.metadata.type);
        if (incomingCall.metadata.type !== "auido") return;
      }
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((stream) => {
          incomingCall.answer(stream);
          incomingCall.on("stream", (receivedStream) => {
            if (audioElement) {
              audioElement.srcObject = receivedStream;
            }
          });
        })
        .catch((err) => {
          console.error("Failed to get local stream", err);
        });
    });
  };

  // 화면 공유 중지 함수
  const ScreenstopSharing = () => {
    if (screenstream) {
      screenstream.getTracks().forEach((track) => track.stop());
      screenstream = null;
      isscreenSharing = false;
      screensharestate = "off"; // 버튼 변경
      Screensharestate = false;
      screenstartButtonDisable = false;
    }

    if (screencall) {
      screencall.close();
      screencall = null;
    }
  };

  // 비디오 공유 중지 함수
  const VideostopSharing = () => {
    if (videostream) {
      videostream.getTracks().forEach((track) => track.stop());
      videostream = null;
      isvideoSharing = false;
      videosharestate = "off"; // 버튼 변경
      Videosharestate = false;
      videostartButtonDisable = false;
    }

    if (videocall) {
      videocall.close();
      videocall = null;
    }
  };

  const Screensendstream = () => {
    if (remotePeerIdValue && screenstream) {
      screencall = peer.call(remotePeerIdValue, screenstream, {
        metadata: { type: "screen" },
      });
    }
  };

  const Videosendstream = () => {
    if (remotePeerIdValue && videostream) {
      videocall = peer.call(remotePeerIdValue, videostream, {
        metadata: { type: "video" },
      });
    }
  };

  const Screenreceive = () => {
    peer.on("call", (incomingCall) => {
      if (incomingCall.metadata && incomingCall.metadata.type) {
        console.log(incomingCall.metadata.type);
        if (incomingCall.metadata.type !== "screen") return;
      }

      incomingCall.answer();

      incomingCall.on("stream", (remoteStream) => {
        const track = remoteStream.getVideoTracks()[0];
        const process = new MediaStreamTrackProcessor({ track });
        const reader = process.readable.getReader();
        readChunk();

        async function readChunk() {
          const { done, value } = await reader.read();
          if (!value || !ctx2) return;

          ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
          ctx2.drawImage(
            value,
            0,
            0,
            value.displayWidth,
            value.displayHeight,
            0,
            0,
            canvas2.width,
            canvas2.height
          );

          value.close();

          if (!done) {
            readChunk();
          }
        }
      });
    });
  };

  const Videoreceive = () => {
    peer.on("call", (incomingCall) => {
      if (incomingCall.metadata && incomingCall.metadata.type) {
        console.log(incomingCall.metadata.type);
        if (incomingCall.metadata.type !== "video") return;
      }

      incomingCall.answer();

      incomingCall.on("stream", (remoteStream) => {
        const track = remoteStream.getVideoTracks()[0];
        const process = new MediaStreamTrackProcessor({ track });
        const reader = process.readable.getReader();
        readChunk();

        async function readChunk() {
          const { done, value } = await reader.read();
          if (!value || !ctx4) return;

          ctx4.clearRect(0, 0, canvas4.width, canvas4.height);
          ctx4.drawImage(
            value,
            0,
            0,
            value.displayWidth,
            value.displayHeight,
            0,
            0,
            canvas4.width,
            canvas4.height
          );

          value.close();

          if (!done) {
            readChunk();
          }
        }
      });
    });
  };

  //화면 공유 버튼을 클릭했을 때
  const ScreenstartShare = async () => {
    screenconn = peer.connect(remotePeerIdValue);
    if (isscreenSharing) {
      sharestate = false;
      screenconn.on("open", () => {
        screenconn?.send("screendel");
      });
      ScreenstopSharing();
      if (ctx1) {
        ctx1.clearRect(0, 0, ctx1.canvas.width, ctx1.canvas.height);
      }
    } else {
      sharestate = true;
      const options: MediaStreamConstraints = {
        audio: true,
        video: true,
      };
      try {
        screenstream = await navigator.mediaDevices.getDisplayMedia(options);
        Screensendstream();
        const track = screenstream.getVideoTracks()[0];
        const process = new MediaStreamTrackProcessor({ track });
        const reader = process.readable.getReader();
        readChunk();
        async function readChunk() {
          const { done, value } = await reader.read();
          if (!value || !ctx1) return;

          ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
          ctx1.drawImage(
            value,
            0,
            0,
            value.displayWidth,
            value.displayHeight,
            0,
            0,
            canvas1.width,
            canvas1.height
          );
          value.close();
          if (!done) {
            readChunk();
          } else {
            if (!errorMsg) {
              alert("The user has ended sharing the screen");
            }
            isscreenSharing = false;
            screensharestate = "on"; // 버튼 변경
            Screensharestate = true;
            screenstartButtonDisable = false;
          }
        }
        isscreenSharing = true;
        screensharestate = "on"; // 버튼 변경
        Screensharestate = true;
        screenstartButtonDisable = false;
      } catch (err) {
        if (!(err instanceof Error)) return;
        if (!errorMsg) {
          console.log(`getDisplayMedia error: ${err.name}`);
        }
        console.error(err);
      }
    }
  };

  //비디오 공유 버튼을 클릭했을 때
  const VideostartShare = async () => {
    videoconn = peer.connect(remotePeerIdValue);
    if (isvideoSharing) {
      videoconn.on("open", () => {
        videoconn?.send("videodel");
      });
      VideostopSharing();
      if (ctx3) {
        ctx3.clearRect(0, 0, ctx3.canvas.width, ctx3.canvas.height);
      }
    } else {
      const options: MediaStreamConstraints = {
        audio: true,
        video: true,
      };
      try {
        videostream = await navigator.mediaDevices.getUserMedia(options);
        Videosendstream();
        const track = videostream.getVideoTracks()[0];
        const process = new MediaStreamTrackProcessor({ track });
        const reader = process.readable.getReader();
        readChunk();
        async function readChunk() {
          const { done, value } = await reader.read();
          if (!value || !ctx3) return;

          ctx3.clearRect(0, 0, canvas3.width, canvas3.height);
          ctx3.drawImage(
            value,
            0,
            0,
            value.displayWidth,
            value.displayHeight,
            0,
            0,
            canvas3.width,
            canvas3.height
          );
          value.close();
          if (!done) {
            readChunk();
          } else {
            if (!errorMsg) {
              console.log("The user has ended sharing the screen");
            }
            isvideoSharing = false;
            videosharestate = "on"; // 버튼 변경
            Videosharestate = true;
            videostartButtonDisable = false;
          }
        }
        isvideoSharing = true;
        videosharestate = "on"; // 버튼 변경
        Videosharestate = true;
        videostartButtonDisable = false;
      } catch (err) {
        if (!(err instanceof Error)) return;
        if (!errorMsg) {
          console.log(`getUserMedia error: ${err.name}`);
        }
        console.error(err);
      }
    }
  };

  const join = () => {
    if (canvasconn) {
      canvasconn.close();
    }
    canvasconn = peer!.connect(remotePeerIdValue);

    ready();
  };

  const ready = () => {
    canvasconn!.on("data", function (data: any) {
      if (data === "alldel") {
        if (ctx5) {
          ctx5.clearRect(0, 0, ctx5.canvas.width, ctx5.canvas.height);
        }
      }
      if (typeof data === "boolean") {
        remotepainting = data;
      } else if (typeof data === "object") {
        drawing(data);
        console.log(data);
      }
    });

    canvasconn!.on("close", function () {
      status = "Connection reset. Awaiting connection...";
      canvasconn = null;
    });
  };
  const stopPainting = () => {
    painting = false;
    if (canvasconn && canvasconn.open) {
      canvasconn.send([[-1, -1, "stop"]]); // 그림 그리기를 멈춘 정보를 전달
    }
  };

  const startPainting = () => {
    painting = true;
    if (canvasconn && canvasconn.open) {
      canvasconn.send([[-1, -1, "start"]]); // 그림 그리기를 시작한 정보를 전달
    }
  };

  const onMouseMove = (event: MouseEvent) => {
    if (ctx5 && (pstate || estate)) {
      const x = event.offsetX;
      const y = event.offsetY;

      let drawarr: [number, number, string][] = [];
      if (painting) {
        if (estate) {
          drawarr = [[x, y, "del"]];
          ctx5.clearRect(x - 10, y - 10, 20, 20); // 움직인 좌표 주변을 지움
        } else if (pstate) {
          drawarr = [[x, y, "add"]];
          ctx5.lineTo(x, y); //움직인 좌표 그리기
          ctx5.stroke();
        }
        if (canvasconn && canvasconn.open) {
          canvasconn.send(drawarr);
          console.log(drawarr);
        }
      } else {
        ctx5.beginPath();
        ctx5.moveTo(x, y);
        if (canvasconn && canvasconn.open) {
          canvasconn.send([[x, y, "move"]]); // 마우스를 뗀 지점의 정보를 전달
        }
      }
    }
  };

  const drawing = (drawarr: [number, number, string][]) => {
    let xco = drawarr[0][0];
    let yco = drawarr[0][1];
    let action = drawarr[0][2];

    if (ctx5) {
      if (action === "move") {
        ctx5.beginPath();
        ctx5.moveTo(xco, yco);
      } else if (action === "start") {
        painting = true;
      } else if (action === "stop") {
        painting = false;
      } else if (action === "del") {
        ctx5.clearRect(xco - 10, yco - 10, 20, 20);
      } else if (action === "add") {
        if (painting) {
          ctx5.lineTo(xco, yco);
          ctx5.stroke();
        }
      }
    }
  };

  const handleClearButtonClick = () => {
    if (ctx5) {
      ctx5.clearRect(0, 0, ctx5.canvas.width, ctx5.canvas.height);
    }
    if (canvasconn && canvasconn.open) {
      canvasconn.send("alldel");
    }
    pstate = false;
    estate = false;
  };

  const init = () => {
    peer.on("connection", function (con2) {
      if (canvasconn && canvasconn.open) {
        con2.on("open", function () {
          con2.send("Already canvasconnected to another client");
          setTimeout(function () {
            con2.close();
          }, 500);
        });
        return;
      }
      canvasconn = con2;
      status = "연결됨";
      ready();
    });

    peer.on("disconnected", function () {
      status = "Connection lost. Please reconnect";
      console.log(peer.id);
      peer.reconnect();
    });

    peer.on("close", function () {
      canvasconn = null;
      status = "Connection destroyed";
    });

    peer.on("error", function (err) {
      console.log(err);
    });
  };

  onMount(() => {
    ctx1 = canvas1.getContext("2d");
    ctx2 = canvas2.getContext("2d");
    ctx3 = canvas3.getContext("2d");
    ctx4 = canvas4.getContext("2d");
    ctx5 = canvas5.getContext("2d");
    if (navigator.mediaDevices && "getDisplayMedia" in navigator.mediaDevices) {
      screenstartButtonDisable = false;
    } else if (
      navigator.mediaDevices &&
      "getUserMedia" in navigator.mediaDevices
    ) {
      videostartButtonDisable = false;
    } else {
      if (!errorMsg) {
        console.log("getDisplayMedia is not supported");
      }
    }
  });
  let ws: WebSocket | undefined;

  onMount(async () => {
    const Peer = (await import("peerjs")).default;
    peer = new Peer();
    ws = new WebSocket("ws://0nlineclass.kro.kr:3000/");

    peer.on("open", (id) => {
      peerId = id;
      console.log(peerId);

      ID = {
        id: peerId,
        classcode: $Code.code,
        loc: "classserver",
      };
      if (ws) {
        ws.send(JSON.stringify(ID));
        ws.addEventListener("message", (ev) => {
          /** @type {{type: string, message:string, user:number}} */
          const json = JSON.parse(ev.data);
          if (json.type === "message") {
            const message = JSON.parse(json.message);
            if (message.classcode !== $Code.code) {
              return;
            }
            if (message.loc !== "classserver") {
              return;
            }
            if (message.job === "student") {
              return;
            }
            if (message.id === (peerId || remotePeerIdValue)) {
              return;
            }
            if (remotePeerIdValue === "") {
              remotePeerIdValue = message.id;
            }
            if (!connect) {
              connect = true;
              ws!.send(JSON.stringify(ID));
            }
            join();
          } else if (json.type === "close") {
            if (remotePeerIdValue !== "") {
              connect = false;
              remotePeerIdValue = "";
              if (ctx2) {
                ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
              }
              if (ctx4) {
                ctx4.clearRect(0, 0, ctx4.canvas.width, ctx4.canvas.height);
              }
            }
          }
        });
      }
      Screenreceive();
      Videoreceive();
      Audioreceive();
    });

    init();

    peer.on("connection", (incomingConn) => {
      incomingConn.on("data", (data: any) => {
        console.log(data);
        if (typeof data === "string") {
          if (data === "screendel" && ctx2) {
            ctx2.clearRect(0, 0, ctx2.canvas.width, ctx2.canvas.height);
          } else if (data === "videodel" && ctx4) {
            ctx4.clearRect(0, 0, ctx4.canvas.width, ctx4.canvas.height);
          }
        }
      });
    });
  });

  interface sendid {
    id: string;
    classcode: string;
    loc: string;
  }

  let ID: sendid;
  let connect = false;

  const exit = () => {
    ScreenstopSharing();
    VideostopSharing();
    AudiostartShare();
    if (ws) {
      ws.close();
    }
    goto(`/student/${$Userstore.email}/classroom/class`);
  };
</script>

<div class="container">
  <div class="button-head">
    <audio controls bind:this={audioElement} autoplay class="hidden-audio" />
    <button
      class="icon-audiosharing"
      id="startButton"
      on:click={AudiostartShare}
    >
      <img
        class="audioshare"
        src="/classserver/mike{audiocall ? 'on' : 'off'}.png"
        alt="sharing"
      />
    </button>
    <button
      class="icon-videosharing"
      id="startButton"
      disabled={videostartButtonDisable}
      on:click={VideostartShare}
    >
      <img
        class="videoshare"
        src="/classserver/cam{videosharestate}.png"
        alt="sharing"
      />
    </button>
    <button
      class="icon-screensharing"
      id="startButton"
      disabled={screenstartButtonDisable}
      on:click={ScreenstartShare}
    >
      <img
        class="screenshare"
        src="/classserver/sharing{screensharestate}.png"
        alt="sharing"
      />
    </button>
    {#if sharestate}
      <div style="width: 170px; display: flex">
        <div class="icon-pen">
          <img
            src="/classserver/pen{pstate ? 'on' : 'off'}.png"
            on:click={pen}
            alt="pen"
            class="icon-pen"
          />
        </div>
        <div class="icon-eraser" style="margin-left:px;">
          <img
            src="/classserver/eraser{estate ? 'on' : 'off'}.png"
            on:click={eraser}
            alt="eraser"
            class="icon-eraser"
          />
        </div>
        <img
          src="/classserver/alldel.png"
          class="alldel"
          on:click={handleClearButtonClick}
          alt="alldel"
        />
      </div>
    {:else}
      <div style="width: 170px;" />
    {/if}
    <img src="/classserver/exit.png" id="exit" alt="exit" on:click={exit} />
  </div>
  <hr />
  <div class="classroom">
    <div class="screenshareroom" bind:this={screenshareroom}>
      <canvas width={520} height={430} bind:this={canvas1} id="canvas1" />
      <canvas width={520} height={430} bind:this={canvas2} id="canvas2" />
    </div>
    <canvas
      width={520}
      height={430}
      on:mousemove={onMouseMove}
      on:mousedown={startPainting}
      on:mouseup={stopPainting}
      bind:this={canvas5}
      id="canvas5"
    />
  </div>
  <div class="videoshareroom">
    <canvas
      class="myvideo"
      width={200}
      height={124}
      on:click={mine}
      bind:this={canvas3}
      id="canvas3"
    />
    <canvas
      class="oppvideo"
      width={200}
      height={124}
      on:click={opp}
      bind:this={canvas4}
      id="canvas4"
    />
  </div>
</div>
<br />
My ID : {peerId}
<br />
Opp ID : {remotePeerIdValue}

<style>
  .container {
    margin: auto;
    width: 520px;
    height: 630px;
  }
  img {
    margin-top: 7px;
    margin-bottom: 0px;
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
  .icon-screensharing {
    border: none;
    width: 60px;
    background-color: white;
  }
  .icon-videosharing {
    width: 60px;
    border: none;
    background-color: white;
  }
  .icon-audiosharing {
    border: none;
    background-color: white;
  }
  .screenshare {
    height: 45px;
  }
  .videoshare {
    height: 40px;
  }
  .icon-pen,
  .icon-eraser,
  .alldel,
  .audioshare {
    height: 45px;
  }
  .videoshareroom {
    border: 1px solid black;
    width: 400px;
    height: 124px;
    margin: auto;
    height: 125px;
    display: flex;
    margin-top: 438px;
  }
  .screenshareroom {
    width: 520px;
    height: 430px;
    display: flex;
    overflow: hidden;
    position: absolute;
  }
  .screenshareroom::-webkit-scrollbar {
    display: none;
    pointer-events: none;
  }
  .hidden-audio {
    display: none;
  }
  .classroom {
    position: relative;
  }
  canvas#canvas5 {
    position: absolute;
  }
  #exit {
    margin-left: 70px;
    margin-top: 10px;
    height: 45px;
  }
</style>
