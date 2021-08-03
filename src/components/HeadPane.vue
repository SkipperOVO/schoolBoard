<template>
  <el-row class="head-pane" type="flex" justify="center" >
    <button class="head-pane-btn" :class="[this.btnActivate=='btn-time'?'btn-time':'']" @click="sortByTime" >
        <span>最新</span>
    </button>
    <button class="head-pane-btn" :class="[this.btnActivate=='btn-hot'?'btn-hot':'']" @click="sortByVotes">
      <span>最热</span>
    </button>
  </el-row>
</template>

<script>
export default {
  name: "HeadPane",

  data() {
    return {
      btnActivate:"btn-time",
    }
  },

  methods: {
    sortByTime() {
      this.btnActivate = "btn-time"
      this.$parent.fetch("sortByTime");
    },

    sortByVotes() {
      this.btnActivate = "btn-hot"
      this.$parent.fetch("sortByVotes");
    }
  }
}
</script>


<style scoped>

.head-pane {
  position: fixed;
  top: 1.459rem;
  left: 0;
  right: 0;

  display: flex;
  height: 0.849rem;

  background-color: white;

  align-items: center;
  z-index: 65535;
}


.head-pane-btn:active {
  background-color: #61dca9;
}

.head-pane-btn {
  height: 100%;
  width: 100%;
  /*padding: 0.08rem 0.186rem 0.08rem 0.186rem;*/
  border-width: 0;
  color: #818989;
  background-color: white;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: 0.2s;

}

.btn-time {
  background-color: #9deaea;
}

.btn-hot {
  background-color: #f1aab1;
}


.head-pane-btn span {
  font-size: 0.424rem;
}


</style>