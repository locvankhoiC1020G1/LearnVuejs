<template>
  <div id="home">
    <h1>Home page</h1>
    <p>{{ config.defaultPageSize }}</p>
    <Input />

    <Button :title="title" :type="type" :click="test" />
  </div>
</template>

<script src="../js/views/home"></script>
