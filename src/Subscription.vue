<template>
    <div class="container">
        <stripe-pricing-table pricing-table-id="prctbl_1NGeaZDRkAXOAo7n5xKmDQTh" publishable-key="pk_live_34zwlXykWuU5nK5c5oBl8ASK">
        </stripe-pricing-table>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as script from './script'

onMounted(() => {
    script.load('https://js.stripe.com/v3/pricing-table.js')
})
</script>

<style scoped lang="scss">
@use 'base' as *;

.container {
    // display: flex;
    // justify-content: center;
    // align-items: center;
    // min-height: 100vh;
    margin: 20px;
}
// stripe-pricing-table {
//     display: block;
// }
</style>
