<script setup lang="ts">
import BaseAvatar, { type AvatarSize, type AvatarUser } from '../base/BaseAvatar.vue'

const props = withDefaults(
  defineProps<{
    users: AvatarUser[]
    max?: number
    size?: AvatarSize
  }>(),
  { max: 2, size: 'md' },
)

const visible = props.users.slice(0, props.max)
const remaining = props.users.length - visible.length
</script>

<template>
  <div class="avatar-group">
    <BaseAvatar
      v-if="remaining"
      class="avatar-group__avatar"
      :size="props.size"
      :user="{ name: `+${remaining}` }"
    />
    <BaseAvatar
      v-for="(user, idx) in visible"
      :key="idx"
      class="avatar-group__avatar"
      :size="props.size"
      :user="user"
    />
  </div>
</template>

<style lang="scss" scoped>
.avatar-group {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
