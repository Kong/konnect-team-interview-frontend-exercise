<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  profiles: {
    id: string,
    avatar?: string,
    name?: string
  }[],
  limit?: number;
}>()

const displayedProfiles = computed(() => {
  const limit = props.limit || 2
  if (props.profiles.length > limit) {
    return [...props.profiles].slice(0, limit)
  }
  return props.profiles
})

const notDisplayedProfiles = computed(() => {
  const limit = props.limit || 2
  return props.profiles.length - limit
})
</script>

<template>
  <div class="group-avatars">
    <div v-if="notDisplayedProfiles > 0">
      <p>+{{ notDisplayedProfiles }}</p>
    </div>
    <img
      v-for="(profile, n) in displayedProfiles"
      :key="profile.id"
      v-tooltip="profile.name"
      :alt="profile.name"
      :src="profile.avatar"
      :style="{ zIndex: 14-n}"
    >
  </div>
</template>

<style lang="scss" scoped>
.group-avatars {
  display: flex;
  isolation: isolate;

  img, div {
    margin-left: -0.5rem;
    display: inline-block;
    height: 30px;
    width: 30px;
    border-radius: 100%;
    border: white 3px;
  }

  div {
    z-index: 15;
    background: $grey-200;
    font-size: 1.2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
  }
}
</style>
