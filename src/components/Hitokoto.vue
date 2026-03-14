<style lang="scss" scoped>
#Hitokoto {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .hitokoto {
    max-width: 80%;
    text-align: center;
    padding: 6px 24px;
    background-color: rgba($color: white, $alpha: 0);
    border-radius: 12px;
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba($color: white, $alpha: 0.3);

      span {
        text-shadow: 1px 1px 2px rgba($color: black, $alpha: 0.2);
      }
    }

    span {
      font-family: "swei";
      font-size: 18px;
      transition: all 0.3s ease;
    }
  }
}
</style>

<template>
  <div :id="appName">
    <Transition>
      <div v-if="hitokotoStore.hitokoto" class="hitokoto" @click.right="copy"
        @click.left="hitokotoStore.getHitokoto(true)">
        <span v-show="hitokotoStore.hitokoto">{{
          `「${hitokotoStore.hitokoto}」`
        }}</span>
        <span v-show="hitokotoStore.hitokoto && hitokotoStore.author">{{
          ` —— ${hitokotoStore.author}`
        }}</span>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
/**变量 */
const appName = ref("Hitokoto");

/**函数 */

// 复制文案
function copy() {
  if (!hitokotoStore.hitokoto) return;
  ut.copyText(hitokotoStore.hitokoto);
  Message.success("已复制到粘贴板");
}

/**监听 */
// 挂载
onMounted(() => {
  hitokotoStore.getHitokoto();
});

/**导入 */
// vue
import { ref, onMounted } from "vue";
// pinia
import { useHitokotoStore } from "../stores/hitokotoStore";
const hitokotoStore = useHitokotoStore();
// utils
import { Message } from "../utils/notifier";
import ut from "../utils/utools";
</script>
