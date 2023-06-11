<template>
    <div class="container">
        <img src="./assets/svgs/logo-symbol.svg" />
        <p>You can now safely close this browser tab and go back to Picular.</p>
    </div>
</template>

<script setup lang="ts">
function openPicular() {
    alert('Pretend this opened Picular, ok ?')
}
</script>

<style scoped lang="scss">
@use 'base' as *;
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100dvh;
    padding: 40px;
    text-align: center;

    img {
        margin: 0 0 100px 0;
    }

    h3 {
        font-size: 30px;
        font-weight: 900;
        margin: 0 0 40px 0;
    }

    p {
        font-size: 22px;
        font-weight: 500;
        margin: 0 0 40px 0;
    }
}

button {
    background-color: $green3;
    height: 64px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 20px;
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
    border-bottom: 1px solid $green4;
    margin: 0 0 20px 0;

    &:hover {
        cursor: pointer;
        background-color: lighten($green3, 3%);
    }
}
</style>
