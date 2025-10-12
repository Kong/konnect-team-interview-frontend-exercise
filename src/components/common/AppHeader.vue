<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import BaseIcon from '../base/BaseIcon.vue'

const auth = useAuthStore()
</script>

<template>
  <header class="app-header">
    <a
      aria-label="Go to home"
      class="app-header__brand"
      href="/"
    >
      <BaseIcon
        alt="Konnect logo"
        class="app-header__logo"
        name="IconLogo"
      />
    </a>

    <nav
      aria-label="Main navigation"
      class="app-header__nav"
    >
      <RouterLink
        class="app-header__link"
        to="/organization"
      >
        <BaseIcon name="IconOrg" />
        <span>Organization</span>
      </RouterLink>
      <RouterLink
        class="app-header__link"
        to="/settings"
      >
        <BaseIcon name="IconSetting" />
        <span>Settings</span>
      </RouterLink>
      <RouterLink
        class="app-header__link"
        :to="`/user/${auth.userId}`"
      >
        <BaseIcon :name="auth.userAvatar" />
        <span>{{ auth.userName }}</span>
      </RouterLink>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.app-header {
  background: var(--header-bg);
  color: var(--header-text);
  padding: 0 var(--pad-x);
  position: sticky;
  top: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);

  &__brand {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    text-decoration: none;
  }

  &__logo {
    height: 28px;
  }

  &__nav {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }

  &__link {
    color: var(--header-text);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    font-size: var(--font-sm);
    font-weight: var(--weight-medium);
  }
}
</style>
