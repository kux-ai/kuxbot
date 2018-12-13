<template>
  <div class="home">
    <div class="logo">KUX</div>
    <div class="window">
      <div class="input-area">
        <textarea
          style="resize:none"
          :disabled="activeId === 2"
          placeholder="快来和我聊聊天吧"
          v-model="content"
        ></textarea>
        <button class="send-btn" @click="action()">发</button>
      </div>
      <div class="tabs">
        <ul>
          <li :class="{'active': activeId === 1}" @click="activeId = 1">互动</li>
          <li :class="{'active': activeId === 2}" @click="activeId = 2">观察</li>
        </ul>
      </div>
      <div class="container" id="chat1" v-show="activeId === 1">
        <div class="block" v-for="(item, idx) in log" :key="idx">
          <div class="avatar">
            <img :src="item.avatar" alt>
          </div>
          <div class="nickname">
            {{item.nickname}}
            <span class="time">{{item.time}}</span>
          </div>
          <div class="content">
            <p>{{item.content}}</p>
          </div>
        </div>
      </div>
      <div class="container" id="chat2" v-show="activeId === 2">
        <div class="options" v-if="robotLog.length === 0">
          <div class="title">请选择开端话题</div>
          <ul>
            <li>
              <button @click="robotBegin('你是谁')">你是谁</button>
            </li>
            <li>
              <button @click="robotBegin('我是谁')">我是谁</button>
            </li>
            <li>
              <button @click="robotBegin('亲爱的')">亲爱的</button>
            </li>
            <li>
              <button @click="robotBegin('有什么可以帮助你的')">帮助</button>
            </li>
            <li>
              <button @click="robotBegin('傻逼')">傻逼</button>
            </li>
            <li>
              <button @click="robotBegin('什么')">什么</button>
            </li>
          </ul>
        </div>
        <div class="block" v-for="(item, idx) in robotLog" :key="idx">
          <div class="avatar">
            <img :src="item.avatar" alt>
          </div>
          <div class="nickname">
            {{item.nickname}}
            <span class="time">{{item.time}}</span>
          </div>
          <div class="content">
            <p>{{item.content}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fly from "flyio";
import moment from "moment";
import uuid from "uuid";

const robotObj = {
  avatar:
    "http://fimage.oss-cn-shenzhen.aliyuncs.com/upload/image/20181213/1544692114530065436.png",
  nickname: "KUXBOT",
  id: 1,
};

const robot2Obj = {
  avatar:
    "http://fimage.oss-cn-shenzhen.aliyuncs.com/upload/image/20181213/1544692327408065264.jpeg",
  nickname: "机器侠",
  id: 2
};

export default {
  name: "home",
  data() {
    return {
      moment: moment,
      activeId: 1,
      content: "",
      userId: uuid.v4(),
      log: [
        {
          avatar: robotObj.avatar,
          nickname: robotObj.nickname,
          time: this.getTime(),
          content: "你好朋友！"
        }
      ],
      robotLog: []
    };
  },
  methods: {
    async action() {
      if (!this.content) return;
      setTimeout(() => {
        this.log.push({
          avatar:
            "http://fimage.oss-cn-shenzhen.aliyuncs.com/upload/image/20181213/1544692327408065264.jpeg",
          nickname: "你",
          time: this.getTime(),
          content: this.content
        });
        this.log.push({
          avatar: robotObj.avatar,
          nickname: robotObj.nickname,
          time: "",
          content: "（正在输入...）"
        });
        this.toEnd();
        setTimeout(() => {
          this.postData(res => {
            let contentObj = this.getRand(res.action_list);
            setTimeout(() => {
              this.log[this.log.length - 1].content = contentObj.say;
              this.log[this.log.length - 1].time = this.getTime();
            }, 100);
          });
          this.content = "";
        }, 500);
      }, 200);
    },

    async postData(callback, content) {
      let url = "http://api.kuxbot.kux.ai/api/chat";
      //let url = "http://127.0.0.1:7788/api/chat";
      let res = fly
        .post(url, {
          userId: this.userId,
          content: content || this.content
        })
        .then(res => {
          if (typeof callback === "function") {
            callback(res.data);
          }
        })
        .catch(err => {});
    },

    async robotBegin(beginContent) {
      this.robotLog.push({
        avatar: robotObj.avatar,
        nickname: robotObj.nickname,
        time: this.getTime(),
        content: beginContent
      });
      this.robotLog.push({
        avatar: robot2Obj.avatar,
        nickname: robot2Obj.nickname,
        time: this.getTime(),
        content: "（正在输入...）"
      });
      this.toEnd();
      setTimeout(() => {
        this.postData(res => {
          let contentObj = this.getRand(res.action_list);
          setTimeout(() => {
            this.robotLog[this.robotLog.length - 1].content = contentObj.say;
            this.robotLog[this.robotLog.length - 1].time = this.getTime();
            this.robotAction(1, contentObj.say);
          }, 100);
        }, beginContent);
      }, 1500);
    },

    async robotAction(robotId, pervContent) {
      let _robotObj = {};
      if ( robotId === 1 ) {
        _robotObj = robotObj;
      } else {
        _robotObj = robot2Obj;
      }
      this.robotLog.push({
        avatar: _robotObj.avatar,
        nickname: _robotObj.nickname,
        time: this.getTime(),
        content: "（正在输入...）"
      });
      this.toEnd();
      setTimeout(() => {
        this.postData(res => {
          let contentObj = this.getRand(res.action_list);
          setTimeout(() => {
            this.robotLog[this.robotLog.length - 1].content = contentObj.say;
            this.robotLog[this.robotLog.length - 1].time = this.getTime();
            this.robotAction(robotId === 1 ? 2 : 1, contentObj.say);
          }, 100);
        }, pervContent);
      }, 2000);
    },

    getRand(arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    getTime() {
      let now = new Date().getTime();
      return moment(now).format("HH:mm:ss");
    },

    toEnd() {
      setTimeout(() => {
        if ( this.activeId === 1 ) {
          let e = document.querySelector("#chat1");
          e.scrollTop = e.scrollHeight;
        } else {
          let e = document.querySelector("#chat2");
          e.scrollTop = e.scrollHeight;
        }
      }, 100);
    }
  }
};
</script>

<style scoped>
.home {
  width: 100vw;
  height: 100vh;
}

.logo {
  display: none;
  position: fixed;
  left: 20px;
  top: 20px;
  font-weight: bold;
}

.tabs {
  height: 50px;
  width: 100%;
  background-color: #fff !important;
  box-shadow: 0 2px 4px 0 rgba(133, 138, 180, 0.14) !important;
}

.tabs ul {
  height: 50px;
  width: 100%;
}

.tabs ul li {
  cursor: pointer;
  position: relative;
  height: 48px;
  line-height: 48px;
  width: 50%;
  float: left;
  text-align: center;
}

.tabs ul li.active {
  border-bottom: 2px solid #a2aec3;
}

.container {
  position: relative;
  height: calc(100vh - 150px);
  box-sizing: border-box;
  padding: 15px;
  font-size: 15px;
  overflow: auto;
  width: 100%;
}

.container .options {
  width: 100%;
  text-align: center;
  padding-top: 20px;
}

.container .options .title {
  font-size: 18px;
  margin-bottom: 20px;
}

.container .options ul li {
  padding: 10px;
}

.container .options ul li button {
  height: 40px;
  width: 120px;
  font-size: 16px;
  text-align: center;
  border: 1px solid #a2aec3;
  border-radius: 8px;
  background-color: #fff;
}

.input-area {
  position: relative;
  height: 100px;
  width: 100%;
  background-color: #f0f3f6;
  -webkit-box-shadow: 0 -13px 32px 1px rgba(236, 239, 241, 0.5);
  -moz-box-shadow: 0 -13px 32px 1px rgba(236, 239, 241, 0.5);
  box-shadow: 0 -13px 32px 1px rgba(236, 239, 241, 0.5);
}

.input-area textarea {
  font-size: 16px;
  padding: 15px;
  margin: 0px;
  box-sizing: border-box;
  height: 95px;
  width: 100%;
  appearance: none;
  background-color: transparent;
  border: none;
}

.input-area textarea:focus {
  background-color: #fff;
}

.send-btn {
  position: absolute;
  right: 15px;
  top: calc(50% - 17px);
  border: 1px solid rgba(225, 227, 232, 0.48);
  opacity: 0.8;
  background-color: #fff;
  border-radius: 3px;
  width: 34px;
  height: 34px;
  box-sizing: border-box;
  box-shadow: 0 2px 2px 0 rgba(44, 71, 146, 0.17);
}

.send-btn:active {
  box-shadow: 0 2px 12px 0 rgba(44, 71, 146, 0.17);
  -webkit-transform: scale(1.07) translateY(-3px);
  transform: scale(1.07) translateY(-3px);
}

.container .block {
  width: 100%;
  position: relative;
}

.container .block .avatar {
  height: 38px;
  width: 38px;
  position: absolute;
  left: 0px;
}

.container .block .avatar img {
  height: 38px;
  width: 38px;
  border-radius: 50%;
}

.container .block .nickname {
  margin-left: 50px;
  font-weight: bold;
  color: #262b4a;
}

.container .block .nickname .time {
  font-size: 12px;
  color: #6c708c;
  padding-left: 10px;
}

.container .block .content {
  margin-left: 50px;
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 16px;

  display: inline-block;
  background-color: hsl(0, 0%, 98%);
  -webkit-border-radius: 6px;
  border-radius: 6px;
  border: 1px solid #f5f5f5;
  padding: 10px 8px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  color: #333;
  font-size: 14px;
  max-width: 80%;
}

.container .block .content p {
  margin: 0;
  word-wrap: break-word;
}

@media screen and (min-width: 415px) {
  .window {
    position: absolute;
    width: 375px;
    height: 667px;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    background-image: linear-gradient(-180deg, #ffffff 8%, #f2f2f7 97%);
    border: 1px solid #e9eaec;
    -webkit-box-shadow: 0 3px 4px 0 rgba(44, 71, 146, 0.32),
      inset 0 -2px 0 0 #e1e3e8;
    box-shadow: 0 3px 4px 0 rgba(44, 71, 146, 0.32), inset 0 -2px 0 0 #e1e3e8;
  }

  .container {
    height: calc(100% - 150px);
  }
}

@media screen and (min-height: 737px) {
  .logo {
    display: block;
  }
}
</style>
