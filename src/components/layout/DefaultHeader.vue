<script setup lang="ts">
import Logo from '@/assets/static/logo.svg?component'
import Organization from '@/assets/icons/organization.svg?component'
import Settings from '@/assets/icons/settings.svg?component'
import User from '@/assets/icons/user.svg?component'
import { useAuthStore } from '@/stores/auth'
import PopoverButton from '@/components/common/PopoverButton.vue'
import Menu from '@/assets/icons/menu.svg?component'

const { user } = useAuthStore()
</script>

<template>
  <header class="default-header">
    <nav class="nav">
      <router-link to="/">
        <Logo />
      </router-link>
      <div class="menu-large">
        <router-link to="/">
          <Organization class="icon fill-current" />
          Organization
        </router-link>
        <router-link to="/">
          <Settings class="icon fill-current" />
          Settings
        </router-link>
      </div>
      <PopoverButton class="menu-small">
        <Menu class="icon fill-current" />
        <template #content>
          <router-link
            class="popover-item"
            to="/"
          >
            Organization
          </router-link>
          <router-link
            class="popover-item"
            to="/"
          >
            Settings
          </router-link>
          <router-link
            class="popover-item"
            to="/"
          >
            Log Out
          </router-link>
        </template>
      </PopoverButton>
    </nav>
    <div class="user">
      <PopoverButton>
        <span class="icon-container-circle">
          <User class="icon fill-current" />
        </span>
        {{ user?.name || 'Sign In' }}
        <template #content>
          <router-link
            class="popover-item"
            to="/"
          >
            Log Out
          </router-link>
        </template>
      </PopoverButton>
    </div>
  </header>
</template>

<style lang="scss">
.default-header {
  display: inline-flex;
  width: 100%;
  margin-bottom: 2em;

  .nav {
    padding: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: linear-gradient(180deg, $blue-700 0%, $blue-500 100%);

    a {
      color: $white;
      font-weight: 600;
      padding: 0.3em;
      display: inline-flex;
      margin-right: 1em;

      &:hover {
        color: $grey-200;
      }

      .icon {
        margin-right: 12px;
        color: white;
      }
    }

    .menu-large {
      display: none;
      @media (min-width: $md) {
        display: flex;
      }
    }

    .menu-small {
      @media (min-width: $md) {
        display: none;
      }
    }
  }

  .user {
    padding-left: 1.3em;
    padding-right: 1.3em;
    white-space: nowrap;
    background: $blue-600;
    align-items: center;

    button {
      color: $white;
      display: inline-flex;
      align-items: center;

      &:hover {
        color: $grey-200;
      }

      .icon-container-circle {
        margin-right: 12px;
        background: $teal-400;
        width: 2em;
        height: 2em;
        border-radius: 100%;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        .icon {
          color: $white;
        }
      }
    }

    display: none;
    @media (min-width: $md) {
      display: inline-flex;
    }
  }
}
</style>
