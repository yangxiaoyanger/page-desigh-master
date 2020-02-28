<template>
  <div
    v-if="activeElement.page && tab === 1"
    class="panel-wrap">
    <div
      class="panel-row"
      flex>
      <vpd-icon name="type" />
      <div class="panel-label">页面标题</div>
      <div class="panel-value">
        <Input
          v-model="activeElement.title"
          />
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <vpd-icon name="smartphone" />
      <div class="panel-label">页面高度</div>
      <div class="panel-value">
        <Input
          v-model="activeElement.height"
          />
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <vpd-icon name="droplet" />
      <div class="panel-label">页面背景色</div>
      <div class="panel-value">
        <input
          v-model="activeElement.backgroundColor"
          type="color">
      </div>
    </div>

    <div
      class="panel-row"
      flex>
      <vpd-icon name="clock" />
      <div class="panel-label">截止日期</div>
      <div class="panel-value">
        <DatePicker type="date" :value="activeElement.endTime" placeholder="请选择日期" style="width: 200px"></DatePicker>
        <!-- <input
          v-model="activeElement.endTime"
          type="date" /> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['activeElement', 'tab']
}
</script>
