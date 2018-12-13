<template>
  <div class="home">
    <div class="input-area">
      <textarea placeholder="快来和我聊聊天吧" ></textarea>
      <button class="send-btn">发</button>
    </div>
    <div class="tabs">
      <ul>
        <li :class="{'active': activeId === 1}" @click="activeId = 1">互动</li>
        <li :class="{'active': activeId === 2}" @click="activeId = 2">观察</li>
      </ul>
    </div>
    <div class="container">
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
      <div>test</div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      activeId: 1
    }
  }
}
</script>

<style scoped>
.home {
  position: fixed;
  width: 100vw;
  height: 100vh;
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
  height: calc(100vh - 150px);
  box-sizing: border-box;
  padding: 15px;
  font-size: 15px;
  overflow: auto;
  width: 100%;
}

.input-area {
  position: relative;
  height: 100px;
  width: 100%;
  background-color: #f0f3f6;
  -webkit-box-shadow: 0 -13px 32px 1px rgba(236,239,241,0.50);
  -moz-box-shadow: 0 -13px 32px 1px rgba(236,239,241,0.50);
  box-shadow: 0 -13px 32px 1px rgba(236,239,241,0.50);
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
</style>
