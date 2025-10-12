<script setup lang="ts">
export type AvatarUser = {
  name?: string
  url?: string
  alt?: string
}

export type AvatarSize = 'sm' | 'md' | 'lg'
const props = defineProps<{
  user: AvatarUser
  size?: AvatarSize
}>()

const { user } = props
const size = props.size ?? 'md'
</script>

<template>
  <div
    class="base-avatar"
    :class="[`base-avatar--${size}`]"
    :title="user.name"
  >
    <img
      v-if="user.url"
      :alt="user.alt"
      class="base-avatar__img"
      :src="user.url"
    >
    <span
      v-else-if="user.name"
      class="base-avatar__content"
    >
      {{ user.name }}
    </span>
  </div>
</template>

<style lang="scss" scoped>
.base-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: var(--color-secondary-light);
  color: var(--color-secondary);
  overflow: hidden;

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: inline-block;
  }

  &--md {
    width: 36px;
    height: 36px;
    font-size: 14px;
  }
}
</style>
