<template>
    <div class="container">
        <div class="header">
            <img class="logo" src="./assets/svgs/logo-with-title-vertical.svg" />
            <div class="line"></div>
            <h2>SELECT PLAN</h2>
        </div>
        <div class="plan-boxes">
            <div class="plan-box">
                <p class="price"><span class="dollar-sign">$</span>3.75</p>
                <p class="name">Monthly</p>
                <!-- <p class="aimed-price-label">&nbsp;</p> -->
                <p class="aimed-price">&nbsp;</p>
                <button @click="subscribeMonthly">SUBSCRIBE</button>
            </div>
            <div class="plan-box">
                <p class="price"><span class="dollar-sign">$</span>36</p>
                <p class="name">Yearly</p>
                <!-- <p class="aimed-price-label">Save</p> -->
                <p class="aimed-price">Save 16%</p>
                <button @click="subscribeYearly">SUBSCRIBE</button>
            </div>
        </div>
        <div class="early-bird-box">
            <h3>EARLY BIRDS WILL BENEFIT!</h3>
            <p>
                We plan to increase prices along with upcoming improvements. However, if you’re a brave and supportive early customer,
                you’ll keep your rate for as long as you stay subscribed.
            </p>
            <p>What do you get? <span class="highlight">1 TB STORAGE.</span></p>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as Cookies from 'es-cookie'

let monthlyUrl = new URLSearchParams(window.location.search).get('monthly_url') ?? undefined
let yearlyUrl = new URLSearchParams(window.location.search).get('yearly_url') ?? undefined

if (monthlyUrl && yearlyUrl) {
    console.log('setting cookies')
    Cookies.set('monthly_url', monthlyUrl!, { expires: 1 })
    Cookies.set('yearly_url', yearlyUrl!, { expires: 1 })
    window.history.replaceState({}, document.title, window.location.pathname)
} else {
    console.log('getting cookies')
    monthlyUrl = Cookies.get('monthly_url')
    yearlyUrl = Cookies.get('yearly_url')
}

function subscribeMonthly() {
    window.location.href = monthlyUrl!
}
function subscribeYearly() {
    window.location.href = yearlyUrl!
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
    max-width: 520px;
    margin: 0 auto;
}

.logo {
    width: 85px;
}

.header {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.line {
    width: 100%;
    height: 4px;
    background-color: $black-special;
    margin: 40px 0 16px 0;
}

h2 {
    font-size: 36px;
    font-weight: 900;
    margin: 0 0 40px 0;
}

.plan-boxes {
    display: flex;
    width: 100%;
    gap: 8px;
}

.plan-box {
    flex: 1;
    border: 4px solid $black-special;
    border-radius: 8px;
    padding: 4px;

    .price {
        font-size: 48px;
        font-weight: 900;
        margin: 40px 0 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;

        .dollar-sign {
            font-size: 28px;
            margin: 0 4px 8px 0;
            color: $green1;
        }
    }

    .name {
        font-size: 18px;
        margin: 0 0 5px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $green1;
    }

    .aimed-price-label {
        font-size: 14px;
        margin: 0 0 4px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $grey3;
    }

    .aimed-price {
        font-size: 16px;
        margin: 0 0 40px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $grey3;
        // text-decoration: line-through;
    }
}

button {
    width: 100%;
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

    &:hover {
        cursor: pointer;
        background-color: lighten($green3, 3%);
    }
}

.early-bird-box {
    margin: 40px 0 0 0;

    h3 {
        font-size: 24px;
        font-weight: 900;
        margin: 0 0 20px 0;
    }

    p {
        font-size: 18px;
        line-height: 1.3;
        font-weight: 500;
        margin: 0 0 20px 0;
        color: $grey3;
    }

    .highlight {
        color: $white;
        font-weight: 900;
    }
}
</style>
