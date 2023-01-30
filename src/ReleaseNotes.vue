<template>
    <div class="release-notes">
        <div class="main-container">
            <div class="center">
                <div v-for="(note, i) in notes" :key="note.title" class="release-note-container">
                    <div class="release-note">
                        <div class="left">
                            <div class="image-frame" :style="rotateStyle(i)">
                                <div class="image-container">
                                    <div class="image" :style="{ 'background-image': `url(${note.image})` }"></div>
                                    <div class="shadow-overlay"></div>
                                </div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="title h2 w900">{{ note.title }}</div>
                            <div class="version h4">{{ note.version }}</div>
                            <div class="subtitle b3 extra">{{ note.date }}</div>
                            <div class="items">
                                <div v-for="item in note.items" :key="item" class="item">
                                    <Checkmark />
                                    <div class="b2">{{ item }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Separator v-if="i != notes.length - 1" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { stage } from './utils'
import Separator from './Separator.vue'
import Checkmark from './Checkmark.vue'

const notes = ref<any>([])

const rotateStyle = (index: number) => {
    return {
        transform: `rotate(${index % 2 ? 2 : -2}deg)`,
    }
}

onMounted(async () => {
    let baseUrl = 'http://localhost:3001'
    if (stage() === 'production') {
        baseUrl = 'https://api.picular.com'
    }
    if (stage() === 'staging') {
        baseUrl = 'https://api-staging.picular.com'
    }
    const { data } = await axios.get(`${baseUrl}/api/release-notes`)
    notes.value = data
})
</script>

<style scoped lang="scss">
@use 'base' as *;
.release-notes {
    @include bg-gradient;
    min-height: 100vh;
}
.nav {
    padding: 24px;
    display: flex;
    .flexer {
        flex: 1;
    }
    button {
        height: 42px;
        padding: 0 12px;
    }
}
.main-container {
    @include flex-center;
    padding: 24px 24px 120px 24px;
    @media (min-width: 800px) {
        padding: 48px 48px 120px 48px;
    }
    .center {
        max-width: 550px;
        @media (min-width: 800px) {
            max-width: 900px;
        }
    }
}
.logo {
    width: 143px;
    height: 42px;
    opacity: 0.8;
    cursor: pointer;
    transition: opacity;
    @include transition-duration-leave;
    &:hover {
        @include transition-duration-enter;
        opacity: 1;
    }
}
.version {
    text-transform: none;
}
.title {
    text-transform: none;
    line-height: 1;
    margin-bottom: 12px;
}
.image-frame {
    width: 261px;
    height: 300px;
    border-radius: 2px;
    background: $white;
    @include flex-center;
    align-items: flex-start;
    padding-top: 16px;
    box-shadow: 3px 3px 15px rgba(0, 0, 0, 0.507);
    margin-bottom: 48px;
    @media (min-width: 800px) {
        margin-right: 48px;
    }
    .image-container {
        position: relative;
        width: 229px;
        height: 222px;
        border-radius: 2px;
        overflow: hidden;
        .image {
            top: 0;
            left: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            background-position: center;
            background-size: cover;
        }
        .shadow-overlay {
            top: 0;
            left: 0;
            position: absolute;
            width: 100%;
            height: 100%;
            box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.164);
            border: 1px solid rgba(0, 0, 0, 0.077);
        }
    }
}
.items-header {
    color: $green1;
    text-transform: uppercase;
    margin-top: 60px;
}
.release-note {
    display: flex;
    flex-direction: column;
    margin-bottom: 120px;
    @media (min-width: 800px) {
        flex-direction: row;
    }
}

.items {
    margin-top: 48px;
    max-width: 700px;
}
.item {
    display: flex;
    margin-top: 24px;
    svg {
        width: 18px;
        height: 18px;
        flex-shrink: 0;
        margin: 5px 12px 0 0;
        path {
            fill: $green1;
            stroke-width: 1;
            stroke: $green1;
        }
    }
}
.separator {
    width: 100%;
    margin-bottom: 120px;
}
</style>
