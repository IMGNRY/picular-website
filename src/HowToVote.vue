<script setup lang="ts">
const cannyDestinationPath = window.location.search.replace(/^\?/, '').split('goto=')[1]
const cannyDestiationUrl = `https://picular.canny.io${cannyDestinationPath}`

function continueToCanny() {
  window.location.href = cannyDestiationUrl
}
</script>

<template>
  <div class="main">
    <div class="text-container">
      <h1>HOW TO VOTE</h1>
      <p>We use Canny to collect votes and feedback. Submit your own ideas as feature requests. Get notified whenever a feature you've voted for makes progress.</p>
      <a class="button" :href="cannyDestiationUrl">CONTINUE TO CANNY</a>
    </div>
    <div class="image-container">
      <img class="small" src="./assets/images/how-to-vote-small.png" @click="continueToCanny" />
      <img class="large" src="./assets/images/how-to-vote-large.png" @click="continueToCanny" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use "base" as *;

@mixin h3_caps_small {
  line-height: 1.2;
  font-weight: 900;
  font-size: 18px;
  letter-spacing: 0.04em;
}

@mixin h4_caps_base {
  line-height: 1.2;
  font-weight: 900;
  letter-spacing: 0.04em;
  color: $white;
  text-transform: uppercase;
}

@mixin h4_caps_large {
  @include h4_caps_base;
  font-size: 48px;
}

@mixin h4_caps_small {
  @include h4_caps_base;
  font-size: 28px;
}

@mixin b4_base {
  line-height: 1.5;
  font-weight: 500;
  color: $grey3;
}

@mixin b4_small {
  @include b4_base;
  font-size: 18px;
}

@mixin b4_medium {
  @include b4_base;
  font-size: 20px;
}

@mixin b4_large {
  @include b4_base;
  font-size: 24px;
}

.main {
  height: 100vh;
  overflow: hidden;
}
.text-container {
  padding: 64px 48px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  @include h4_caps_small();
}

p {
  @include b4_small();
  margin-top: 16px;

  @media (min-width: 1024px) {
    @include b4_large();
  }
}

.button {
  @include h3_caps_small();
  background-color: $white;
  padding: 21px 38.5px;
  border-radius: 30px;
  display: inline-block;
  margin-top: 32px;
  color: $black;
  text-decoration: none;
}

.image-container {
  display: flex;
  justify-content: center;
}

img.small {
  width: 100vw;
}

img.large {
  display: none;
}

@media (min-width: 620px) and (max-width: 999px) {
  .text-container {
    position: relative;
    padding: 96px 160px 96px 96px;
    z-index: 1;
  }

  h1 {
    @include h4_caps_large();
  }

  p {
    @include b4_medium();
  }
  img.small {
    display: none;
  }

  img.large {
    display: unset;
    width: 165vw;
    transform: translate(-22px, -20%);
  }
}

@media (min-width: 1000px) {
  .main {
    display: flex;
    flex-direction: row-reverse;
    max-width: 1246px;
    margin: 0 auto;
    align-items: center;
    overflow: unset;
  }

  .text-container {
    flex: 2;
    position: relative;
    z-index: 1;
  }

  h1 {
    @include h4_caps_large();
  }

  p {
    @include b4_medium();
  }

  .image-container {
    flex: 3;
    position: relative;
    display: flex;
    align-items: center;
  }

  img.small {
    display: none;
  }

  img.large {
    position: absolute;
    display: unset;
    width: 140%;
    // left: 0;
  }
}
@media (min-width: 1600px) {
  .text-container {
    flex: 2;
    padding-right: 0;
  }

  .image-container {
    flex: 3;
  }

  h1 {
    @include h4_caps_large();
  }

  p {
    @include b4_large();
  }

  img.large {
    width: 160%;
    transform: translate(-50px, 0);
  }
}
</style>
