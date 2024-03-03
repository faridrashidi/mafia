<template>
  <div
    class="navigation"
  >
    <nav>
      <router-link
        v-for="(nav, index) in navigation"
        :to="{name: nav.url}"
        :key="index"
        :disabled="nav.disabled"
      >
        <span>
          <img
            :src="getImg('', nav.image)"
            :alt="$t(nav.alt)"
          >
          <strong>
            {{ $t(nav.name) }}
          </strong>
        </span>
      </router-link>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'Navigation',
  data() {
    return {
      navigation: [
        {
          name: 'navigation[0].name',
          url: 'home',
          image: 'creator.svg',
          alt: 'navigation[0].alt'
        }
      ]
    }
  }
}
</script>
