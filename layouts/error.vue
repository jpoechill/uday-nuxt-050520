<template>
  <div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$router.push({
      path: '/'
    })
  },
}
</script>
<style>
html, body {
  background-color: #eee;
}

html, #default-layout, #default-layout > div {
  height: 100%;
}
</style>
