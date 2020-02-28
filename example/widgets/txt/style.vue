<template>
  <div>
    <hr />
    <div class="panel-row" flex>
      <vpd-icon name="sliders" />
      <div class="panel-label">行高</div>
      <div class="panel-value">
        <Input v-model="activeElement.lineHeight" />
      </div>
    </div>

    <div class="panel-row" flex>
      <vpd-icon name="type" />
      <div class="panel-label">字号</div>
      <div class="panel-value">
        <Input v-model="activeElement.fontSize" />
      </div>
    </div>

    <div class="panel-row" flex>
      <vpd-icon name="edit-3" />
      <div class="panel-label">颜色</div>
      <div class="panel-value">
        <input type="color" v-model="activeElement.color" />
      </div>
    </div>

    <div class="panel-row" flex>
      <vpd-icon name="bold" />
      <div class="panel-label">加粗</div>
      <div class="panel-value">
        <Switch v-model="activeElement.fontWeight"></Switch>
      </div>
    </div>

    <div class="panel-row" flex>
      <vpd-icon name="align-justify" />
      <div class="panel-label">对齐</div>
      <div class="panel-value">
        <label class="form-radio tooltip" data-tooltip="左对齐">
          <input type="radio" name="align" value="left" v-model="activeElement.textAlign" />
          <i class="form-icon"></i>
          <vpd-icon name="align-left" />
        </label>
        <label class="form-radio tooltip" data-tooltip="居中">
          <input type="radio" name="align" value="center" v-model="activeElement.textAlign" />
          <i class="form-icon"></i>
          <vpd-icon name="align-center" />
        </label>
        <label class="form-radio tooltip" data-tooltip="右对齐">
          <input type="radio" name="align" value="right" v-model="activeElement.textAlign" />
          <i class="form-icon"></i>
          <vpd-icon name="align-center" />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "braid-txt-style",
  props: ["activeElement"]
};
</script>
