<script setup lang="ts">
import { ref, computed } from 'vue'
import Home from './Home.vue'
import HowToVote from './HowToVote.vue'
import Privacy from './Privacy.vue'
import TermsOfUse from './TermsOfUse.vue'
import ReleaseNotes from './ReleaseNotes.vue'

const routes: { [prop: string]: any } = {
    '/': Home,
    '/how-to-vote': HowToVote,
    '/legal/privacy': Privacy,
    '/legal/terms': TermsOfUse,
    '/release-notes': ReleaseNotes,
}

const currentPath = ref(window.location.pathname)

window.addEventListener('popstate', () => {
    currentPath.value = window.location.pathname
})

const currentView = computed(() => routes[currentPath.value] || Home)

var darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
handleDarkmode(darkModeMediaQuery)
function handleDarkmode(e: MediaQueryList) {
    var darkModeOn = e.matches
    var favicon_ico = document.querySelector('link.ico') as HTMLLinkElement
    var favicon_svg = document.querySelector('link.svg') as HTMLLinkElement
    var favicon_apple = document.querySelector('link.apple') as HTMLLinkElement

    if (darkModeOn) {
        favicon_ico.href = '/favicon-darkmode32.ico'
        favicon_svg.href = '/favicon-darkmode.svg'
        favicon_apple.href = '/favicon-darkmode180.png'
    } else {
        favicon_ico.href = '/favicon-lightmode32.ico'
        favicon_svg.href = '/favicon-lightmode.svg'
        favicon_apple.href = '/favicon-lightmode180.png'
    }
}
darkModeMediaQuery.addEventListener('change', () => {
    handleDarkmode(darkModeMediaQuery)
})
</script>

<template>
    <component :is="currentView" />
</template>

<style lang="scss">
@use 'base' as *;

@font-face {
    font-family: 'museo-sans';
    src: url('./assets/fonts/MuseoSansRounded-300.woff2') format('woff2');
    font-display: auto;
    font-style: normal;
    font-weight: 300;
}

@font-face {
    font-family: 'museo-sans';
    src: url('./assets/fonts/MuseoSansRounded-500-Italic.woff2') format('woff2');
    font-display: auto;
    font-style: italic;
    font-weight: 500;
}

@font-face {
    font-family: 'museo-sans';
    src: url('./assets/fonts/MuseoSansRounded-500.woff2') format('woff2');
    font-display: auto;
    font-style: normal;
    font-weight: 500;
}

@font-face {
    font-family: 'museo-sans';
    src: url('./assets/fonts/MuseoSansRounded-900.woff2') format('woff2');
    font-display: auto;
    font-style: normal;
    font-weight: 900;
}

* {
    margin: 0;
    padding: 0;
    border: 0;
    color: $white;
    font-family: 'museo-sans';
    line-height: 1.2;
}

li {
    list-style: none;
}

*,
*:before,
*:after {
    box-sizing: border-box;
}

html,
body {
    background-color: $black;
    -webkit-font-smoothing: antialiased;
    scroll-behavior: smooth;
}
</style>
