<template>
  <router-view/>
  <FooterMusic v-show="$store.state.isFooterMusic"/>
</template>

<script>
import FooterMusic from "@/components/Item/FooterMusic.vue"
export default {
  name:'App',
  components:{ FooterMusic },
}
</script>

<style lang="less">
html,body,#app{
  height: 100%;
}
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon{
  width: .5rem;
  height: .5rem;
}
a{
  color: black;
}
</style>
