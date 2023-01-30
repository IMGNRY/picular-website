<template>
    <div class="separator">
        <div class="line">
            <div></div>
        </div>
        <div class="text" v-if="$slots.default">
            <span>
                <slot></slot>
            </span>
        </div>
        <div class="line">
            <div class="right"></div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.separator {
    display: flex;

    div {
        flex-grow: 1;
    }

    .text {
        display: flex;
        justify-content: center;

        span {
            color: #9b9691;
            font-size: 14px;
            font-weight: 500;
            font-style: italic;
        }
    }

    .line {
        flex-grow: 15;
        display: flex;
        align-items: center;

        div {
            height: 1px;
            background-image: linear-gradient(to left, #505050, transparent);
        }

        .right {
            height: 1px;
            background-image: linear-gradient(to right, #505050, transparent);
        }
    }
}
</style>
