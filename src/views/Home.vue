<template>
  <div
    class="home"
  >
    <!-- Extra Meta Description for SEO -->
    <p
      class="seo-clipboard"
    >
      {{ $t('meta.home.description') }}
    </p>
    <!-- If last game saved data is available in localstorage, show Alert to load data from localstorage or start a new game -->
    <SavedGameAlert
      v-if="gameSettings.hasSavedGame"
    />
    <template
      v-else
    >
      <transition
        name="slide"
        mode="out-in"
      >
        <!-- Show Create Game Panel when the game is not started -->
        <CreateGamePanel
          v-if="!gameSettings.gameStarted"
        />
        <!-- Show Dashboard Panel when the game is started -->
        <DashboardPanel
          v-else
        />
      </transition>
    </template>
  </div>
</template>

<script>
import CreateGamePanel from '@/components/CreateGamePanel.vue';
import DashboardPanel from '@/components/DashboardPanel.vue';
import SavedGameAlert from '@/components/SavedGameAlert.vue';

export default {
  name: 'Home',
  components: {
    CreateGamePanel,
    DashboardPanel,
    SavedGameAlert
  },
  metaInfo () {
    return {
      title: `${this.$t('meta.home.title')}`,
      meta: []
    }
  }
}
</script>
