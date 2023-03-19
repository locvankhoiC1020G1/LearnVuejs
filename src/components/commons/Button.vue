<template>
  <div id="button">
    <button
      :class="class"
      :type="type"
      :style="{
        fontSize: fontSize + 'px',
        width: width + 'px',
        height: height + 'px',
      }"
      @click="click"
    >
      {{ title }}
    </button>
  </div>
</template>

<script src="../../js/components/common/button"></script>
