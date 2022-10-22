<script setup lang="ts">
import Logo from '@/assets/static/logo.svg?component'
import Organization from '@/assets/icons/organization.svg?component'
import Settings from '@/assets/icons/settings.svg?component'
</script>

<template>
  <header class="default-header">
    <div class="nav">
      <router-link to="/">
        <Logo />
      </router-link>
      <div>
        <router-link to="/">
          <Organization class="icon fill-current" />
          Organization
        </router-link>
        <router-link to="/">
          <Settings class="icon fill-current" />
          Settings
        </router-link>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
.default-header {
  background: linear-gradient(180deg, $blue-700 0%, $blue-500 100%);

  .nav {
    padding: 1em;
    margin-bottom: 4em;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      color: $white;
      font-weight: 600;
      padding: 0.3em;
      display: inline-flex;

      &:hover {
        color: $grey-200;
      }

      .icon {
        margin-right: 12px;
      }

      margin-right: 1em;
    }
  }
}
</style>
