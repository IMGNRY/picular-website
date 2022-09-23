<script setup lang="ts">
import { onMounted, ref } from 'vue'
import zenscroll from 'zenscroll'
import ImageCarousel from './components/ImageCarousel.vue'
import * as script from './script'

const showMenu = ref(false)

function navTo(elementId: string) {
    showMenu.value = false
    zenscroll.to(document.getElementById(elementId)!, 1000)
}

const currentYear = new Date().getFullYear()

let devices: string[]
if (window.innerWidth < 768) {
    devices = ['mobile', 'tablet', 'laptop']
} else if (window.innerWidth < 1024) {
    devices = ['tablet', 'mobile', 'laptop']
} else {
    devices = ['laptop', 'mobile', 'tablet']
}

// const currentDevice = ref('laptop');
const currentDevice = ref(devices[0])
const currentVisionIndex = ref(1)
const width = ref(0)

function roundUpToNearest(number: number, nearest: number) {
    return Math.ceil(number / nearest) * nearest
}

function preloadImages() {
    let _width = 0
    if (window.innerWidth < 800) {
        _width = window.innerWidth * 0.9
    } else {
        _width = window.innerWidth * 0.4
    }
    _width *= window.devicePixelRatio
    _width = roundUpToNearest(_width, 100)

    const urls = [
        `https://ik.imagekit.io/picular/web/tr:w-${_width}/device-mobile.png?v=4`,
        `https://ik.imagekit.io/picular/web/tr:w-${_width}/device-tablet.png?v=4`,
        `https://ik.imagekit.io/picular/web/tr:w-${_width}/device-laptop.png?v=4`,
    ]

    for (const url of urls) {
        const img = new Image()
        img.src = url
    }

    width.value = _width
}

;(async () => {
    preloadImages()
    await new Promise((resolve) => setTimeout(resolve, 1000))

    while (true) {
        await new Promise((resolve) => setTimeout(resolve, 3000))
        currentDevice.value = devices[(devices.indexOf(currentDevice.value) + 1) % devices.length]

        let newVisionIndex = currentVisionIndex.value + 1
        if (newVisionIndex > 4) newVisionIndex = 1
        currentVisionIndex.value = newVisionIndex
    }
})()

function signin() {
    if (window.location.href.includes('staging')) {
        window.location.href = 'https://app-staging.picular.com/login'
    } else if (window.location.href.includes('localhost')) {
        window.location.href = 'http://localhost:8080/login'
    } else {
        window.location.href = `https://app.picular.com/login`
    }
}

function setupDriftTrigger() {
    let chatHasBeenShowed = false
    var intersectionObserver = new IntersectionObserver(async (entries) => {
        if (entries[0].intersectionRatio <= 0) return
        if (chatHasBeenShowed) return

        await script.load('/js/drift.js')
        window.drift.on('ready', async (api: any, payload: any) => {
            api.showWelcomeOrAwayMessage()
            chatHasBeenShowed = true
        })
    })

    intersectionObserver.observe(document.querySelector('#faq')!)
}

onMounted(() => {
    setupDriftTrigger()
})
</script>

<template>
    <section class="top">
        <Transition name="bg-gradient">
            <div v-if="currentDevice == 'mobile'" class="bg-gradient-laptop"></div>
        </Transition>
        <Transition name="bg-gradient">
            <div v-if="currentDevice == 'tablet'" class="bg-gradient-tablet"></div>
        </Transition>
        <Transition name="bg-gradient">
            <div v-if="currentDevice == 'laptop'" class="bg-gradient-mobile"></div>
        </Transition>
        <div class="bg-noise"></div>
        <Transition>
            <div class="menu-overlay" v-if="showMenu" @click="showMenu = false"></div>
        </Transition>
        <nav>
            <div class="nav-content">
                <img src="./assets/svgs/logo-horizontal.svg" class="logo" height="42" width="184" alt="Picular logo" />
                <menu class="large">
                    <li>
                        <a @click.stop="navTo('vision')">VISION</a>
                    </li>
                    <li>
                        <a @click.stop="navTo('roadmap')">ROADMAP</a>
                    </li>
                    <li>
                        <a @click.stop="navTo('pricing')">PRICING</a>
                    </li>
                    <li>
                        <a @click.stop="navTo('download')">DOWNLOAD</a>
                    </li>
                    <li>
                        <a @click.stop="navTo('about')">ABOUT</a>
                    </li>
                    <li>
                        <a @click.stop="navTo('faq')">FAQ</a>
                    </li>
                </menu>
                <button class="signin" @click="signin">SIGN IN</button>
                <button class="menu" @click="showMenu = true">
                    <img src="./assets/svgs/hamburger-menu.svg" height="24" width="24" alt="menu-icon" />
                    <Transition>
                        <menu v-if="showMenu">
                            <a @click.stop="navTo('vision')">VISION</a>
                            <a @click.stop="navTo('roadmap')">ROADMAP</a>
                            <a @click.stop="navTo('pricing')">PRICING</a>
                            <a @click.stop="navTo('download')">DOWNLOAD</a>
                            <a @click.stop="navTo('about')">ABOUT</a>
                            <a @click.stop="navTo('faq')">FAQ</a>
                        </menu>
                    </Transition>
                </button>
            </div>
        </nav>
        <div class="hero">
            <div class="center-container">
                <div class="text">
                    <h1>
                        THE REBEL
                        <br />PHOTO <br />COMPANION
                    </h1>
                    <h2>
                        We are building a complete
                        <br />solution for all your memories <br />on all your platforms.
                    </h2>
                    <a @click.stop="navTo('download')" class="download-button">DOWNLOAD</a>
                </div>
                <div class="graphics">
                    <Transition>
                        <img
                            v-if="currentDevice == 'mobile'"
                            class="mobile"
                            :src="`https://ik.imagekit.io/picular/web/tr:w-${width}/device-mobile.png?v=4`"
                        />
                    </Transition>
                    <Transition>
                        <img
                            v-if="currentDevice == 'laptop'"
                            class="laptop"
                            :src="`https://ik.imagekit.io/picular/web/tr:w-${width}/device-laptop.png?v=4`"
                        />
                    </Transition>
                    <Transition>
                        <img
                            v-if="currentDevice == 'tablet'"
                            class="tablet"
                            :src="`https://ik.imagekit.io/picular/web/tr:w-${width}/device-tablet.png?v=4`"
                        />
                    </Transition>
                </div>
            </div>
        </div>
    </section>
    <section id="vision">
        <div class="section-content">
            <h2 class="section-title">VISION</h2>
            <div class="content-group">
                <div class="image-container">
                    <ImageCarousel :id="1" :index="currentVisionIndex" />
                </div>
                <div class="text">
                    <h3>ALL PHOTOS GATHERED</h3>
                    <p>Picular will automate gathering photos from all your sources into one secure place.</p>
                    <p>No more hassle to consolidate photos together with a partner from different phones to one shared account.</p>
                </div>
            </div>
            <div class="separator">
                <div class="dot"></div>
            </div>
            <div class="content-group reverse">
                <div class="image-container">
                    <ImageCarousel :id="2" :index="currentVisionIndex" />
                </div>
                <div class="text">
                    <h3>ORGANIZED & REFINED</h3>
                    <p>Our AI sorts your people, removes duplicates, adds common tags, and puts all existing metadata in order.</p>
                    <p>
                        However, AI does not always make sense. That's why Picular will also help you reach perfection with manual
                        functionalities.
                    </p>
                </div>
            </div>
            <div class="separator">
                <div class="dot"></div>
            </div>
            <div class="content-group">
                <div class="image-container">
                    <ImageCarousel :id="3" :index="currentVisionIndex" />
                </div>
                <div class="text">
                    <h3>INTO THE LIVINGROOM</h3>
                    <p>Never again the cumbersome process of finding the right photos and sending them for print.</p>
                    <p>
                        Combine search filters and easily create photo books and other physical products of superior quality with a click.
                    </p>
                </div>
            </div>
        </div>
    </section>
    <section id="roadmap">
        <div class="max-container">
            <div class="content-group">
                <h2 class="section-title">ROADMAP</h2>
                <div class="text">
                    <p>The road map of Picular is decided by you and everyone interested.</p>
                    <p>
                        We believe this will guide us to build the most helpful features in the most suitable order while making the process
                        more fun and inspiring.
                    </p>
                </div>
                <a href="/how-to-vote?goto=/feature-requests" class="vote-button">VOTE</a>
            </div>
            <div class="image-container">
                <img src="./assets/svgs/roadmap.svg" alt="Roadmap illustration" />
            </div>
        </div>
    </section>
    <section id="pricing">
        <div class="section-content">
            <h2 class="section-title">PRICING</h2>
            <div class="content-group">
                <div class="price-boxes">
                    <div class="price-box">
                        <div class="price">
                            <span class="dollar-sign">$</span>
                            <span class="amount">3</span>
                            <span class="amount cents">.75</span>
                        </div>
                        <div class="period">Monthly</div>
                        <div class="aimed-price-label">Aimed price</div>
                        <div class="aimed-price">$10</div>
                    </div>
                    <div class="price-box">
                        <div class="price">
                            <span class="dollar-sign">$</span>
                            <span class="amount">36</span>
                        </div>
                        <div class="period">Yearly</div>
                        <div class="aimed-price-label">Aimed price</div>
                        <div class="aimed-price">$100</div>
                    </div>
                </div>
                <div class="text">
                    <p>
                        Picular is
                        <strong>free to try</strong> for as long as you need. No credit card required. Pay when you are satisfied.
                    </p>
                    <p>
                        We plan to increase prices along with upcoming improvements. However, if you’re a brave and supportive early
                        customer, you’ll keep your rate for as long as you stay subscribed.
                    </p>
                </div>
            </div>
        </div>
    </section>
    <section id="download">
        <div class="section-content">
            <h2 class="section-title">DOWNLOAD</h2>
            <h3 class="section-subtitle">OR UPVOTE</h3>
            <div class="buttons">
                <a href="https://apps.apple.com/us/app/picular/id1454044901?itsct=apps_box_link&itscg=30200" class="button ready">
                    <div class="top">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M33.4921 11.6534C36.1985 8.6295 40.5645 7.82815 40.8027 8.02908C41.041 8.22882 41.1426 12.7304 38.5028 15.857C35.8632 18.985 31.4306 19.6823 31.1924 19.4814C30.954 19.2817 30.7859 14.6774 33.4921 11.6534Z"
                                fill="#9B9691"
                            />
                            <path
                                d="M32.4935 21.2299H32.4327C31.4322 21.213 30.0733 20.7718 28.6054 20.2952C26.6257 19.6523 24.4475 18.945 22.6822 19.1275C21.1533 19.2864 16.2663 20.3002 13.3194 24.9944C12.2858 26.6414 11.4903 28.7425 11.1621 31.4185C11.0442 32.3844 10.9881 33.4251 11.0021 34.5451C11.0162 35.6689 11.106 36.7702 11.2602 37.8426C11.5897 40.1307 12.2111 42.2891 13.0134 44.2667C13.9034 46.4601 15.0154 48.4317 16.1998 50.1067C18.8209 53.8152 21.7899 55.9607 23.4614 55.9981C25.321 56.0398 27.0491 55.3792 28.6341 54.7732C29.9798 54.2588 31.2223 53.7837 32.3545 53.8116C32.3802 53.8174 32.4071 53.8198 32.4327 53.8174L32.4632 53.8162L32.4935 53.8174C32.5192 53.8198 32.5449 53.8174 32.5694 53.8116C33.7022 53.7827 34.9456 54.2581 36.2926 54.773C37.8776 55.379 39.606 56.0398 41.4661 55.9981C43.1375 55.9607 46.1066 53.8152 48.7278 50.1067C49.911 48.4317 51.024 46.4601 51.914 44.2667C52.046 43.9396 52.1734 43.6079 52.296 43.2715C49.7357 42.4691 47.6274 40.4659 46.4898 37.8426C45.9033 36.4923 45.5752 34.9774 45.5752 33.3772C45.5752 32.7022 45.6336 32.0481 45.7458 31.4185C46.2293 28.6958 47.7116 26.4487 49.7567 24.9944C50.1223 24.7351 50.5055 24.5003 50.9038 24.2925C48.1449 19.9451 43.6562 19.2747 42.244 19.1275C40.4796 18.945 38.3015 19.6522 36.3216 20.295C34.8534 20.7717 33.4942 21.213 32.4935 21.2299Z"
                                fill="#9B9691"
                            />
                        </svg>
                        <h4>iPhone</h4>
                    </div>
                    <div class="bottom">DOWNLOAD</div>
                </a>
                <a href="/how-to-vote?goto=/feature-requests/p/android-mobile-app" class="button">
                    <div class="top">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M17.8567 5.04741C18.0258 4.94981 18.2419 5.00774 18.3395 5.1768L21.0961 9.95151C23.4825 7.79671 26.7061 6.34777 30.3127 5.99993H33.6852C37.2921 6.34788 40.5157 7.79695 42.902 9.9518L45.659 5.17679C45.7566 5.00773 45.9727 4.94981 46.1418 5.04742C46.3109 5.14503 46.3688 5.3612 46.2712 5.53026L43.4291 10.4528C45.6984 12.7246 47.0865 15.6796 47.1316 18.9161H16.8664C16.9114 15.6793 18.2996 12.7242 20.5691 10.4525L17.7273 5.53025C17.6297 5.36119 17.6876 5.14502 17.8567 5.04741ZM27.4908 12.9123C27.4936 13.8487 26.7186 14.6101 25.7595 14.6127C24.8009 14.615 24.0214 13.8581 24.0186 12.9217V12.9123C24.016 11.9756 24.791 11.2144 25.7498 11.2118C26.7084 11.2093 27.488 11.9659 27.4908 12.9028V12.9123ZM40.4503 12.9123C40.4531 13.8487 39.6781 14.6101 38.719 14.6127C37.7604 14.615 36.9809 13.8581 36.9781 12.9217V12.9123C36.9755 11.9756 37.7505 11.2144 38.7093 11.2118C39.6679 11.2093 40.4475 11.9659 40.4503 12.9028V12.9123Z"
                                fill="#9B9691"
                            />
                            <path
                                d="M16.7474 20.7349C16.7474 20.6048 16.7571 20.4762 16.7682 20.3489H47.2349C47.2457 20.4757 47.2504 20.6048 47.2504 20.7349V42.5454C47.2504 44.8908 45.3938 46.7807 43.0887 46.7807H42.9249V55.4075C42.9249 57.2608 41.4224 58.7631 39.569 58.7631C37.7159 58.7631 36.2135 57.2608 36.2135 55.4075V46.7807H27.7851V55.4076C27.7851 57.2609 26.2826 58.7632 24.4293 58.7632C22.5762 58.7632 21.0737 57.2609 21.0737 55.4076V46.7807H20.9089C18.6041 46.7807 16.7474 44.891 16.7474 42.5454V20.7349Z"
                                fill="#9B9691"
                            />
                            <path
                                d="M11.3558 22.2898C13.2089 22.2898 14.7114 23.7923 14.7114 25.6456V40.0411C14.7114 41.8945 13.2089 43.3969 11.3558 43.3969C9.50247 43.3969 8 41.8945 8 40.0413V25.6458C7.99976 23.7925 9.50223 22.2898 11.3558 22.2898Z"
                                fill="#9B9691"
                            />
                            <path
                                d="M52.6428 22.2898C54.4959 22.2898 55.9984 23.7923 55.9984 25.6456V40.0411C55.9984 41.8945 54.4959 43.3969 52.6428 43.3969C50.7895 43.3969 49.287 41.8945 49.287 40.0413V25.6458C49.287 23.7925 50.7895 22.2898 52.6428 22.2898Z"
                                fill="#9B9691"
                            />
                        </svg>

                        <h4>Android</h4>
                    </div>
                    <div class="bottom">UPVOTE</div>
                </a>
                <a href="/how-to-vote?goto=/feature-requests/p/ipad-support" class="button">
                    <div class="top">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M33.4921 11.6534C36.1985 8.6295 40.5645 7.82815 40.8027 8.02908C41.041 8.22882 41.1426 12.7304 38.5028 15.857C35.8632 18.985 31.4306 19.6823 31.1924 19.4814C30.954 19.2817 30.7859 14.6774 33.4921 11.6534Z"
                                fill="#9B9691"
                            />
                            <path
                                d="M32.4935 21.2299H32.4327C31.4322 21.213 30.0733 20.7718 28.6054 20.2952C26.6257 19.6523 24.4475 18.945 22.6822 19.1275C21.1533 19.2864 16.2663 20.3002 13.3194 24.9944C12.2858 26.6414 11.4903 28.7425 11.1621 31.4185C11.0442 32.3844 10.9881 33.4251 11.0021 34.5451C11.0162 35.6689 11.106 36.7702 11.2602 37.8426C11.5897 40.1307 12.2111 42.2891 13.0134 44.2667C13.9034 46.4601 15.0154 48.4317 16.1998 50.1067C18.8209 53.8152 21.7899 55.9607 23.4614 55.9981C25.321 56.0398 27.0491 55.3792 28.6341 54.7732C29.9798 54.2588 31.2223 53.7837 32.3545 53.8116C32.3802 53.8174 32.4071 53.8198 32.4327 53.8174L32.4632 53.8162L32.4935 53.8174C32.5192 53.8198 32.5449 53.8174 32.5694 53.8116C33.7022 53.7827 34.9456 54.2581 36.2926 54.773C37.8776 55.379 39.606 56.0398 41.4661 55.9981C43.1375 55.9607 46.1066 53.8152 48.7278 50.1067C49.911 48.4317 51.024 46.4601 51.914 44.2667C52.046 43.9396 52.1734 43.6079 52.296 43.2715C49.7357 42.4691 47.6274 40.4659 46.4898 37.8426C45.9033 36.4923 45.5752 34.9774 45.5752 33.3772C45.5752 32.7022 45.6336 32.0481 45.7458 31.4185C46.2293 28.6958 47.7116 26.4487 49.7567 24.9944C50.1223 24.7351 50.5055 24.5003 50.9038 24.2925C48.1449 19.9451 43.6562 19.2747 42.244 19.1275C40.4796 18.945 38.3015 19.6522 36.3216 20.295C34.8534 20.7717 33.4942 21.213 32.4935 21.2299Z"
                                fill="#9B9691"
                            />
                        </svg>
                        <h4>iPad</h4>
                    </div>
                    <div class="bottom">UPVOTE</div>
                </a>
                <a href="/how-to-vote?goto=/feature-requests/p/windows-client-desktop" class="button">
                    <div class="top">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.8093 8H8V30.8093H30.8093V8Z" fill="#9B9691" />
                            <path d="M56 8H33.1907V30.8093H56V8Z" fill="#9B9691" />
                            <path d="M8 33.1907H30.8093V56H8V33.1907Z" fill="#9B9691" />
                            <path d="M56 33.1907H33.1907V56H56V33.1907Z" fill="#9B9691" />
                        </svg>

                        <h4>Windows</h4>
                    </div>
                    <div class="bottom">UPVOTE</div>
                </a>
                <a href="https://picular-desktop-releases.s3.amazonaws.com/Picular.pkg" class="button ready">
                    <div class="top">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M33.4921 11.6534C36.1985 8.6295 40.5645 7.82815 40.8027 8.02908C41.041 8.22882 41.1426 12.7304 38.5028 15.857C35.8632 18.985 31.4306 19.6823 31.1924 19.4814C30.954 19.2817 30.7859 14.6774 33.4921 11.6534Z"
                                fill="#9B9691"
                            />
                            <path
                                d="M32.4935 21.2299H32.4327C31.4322 21.213 30.0733 20.7718 28.6054 20.2952C26.6257 19.6523 24.4475 18.945 22.6822 19.1275C21.1533 19.2864 16.2663 20.3002 13.3194 24.9944C12.2858 26.6414 11.4903 28.7425 11.1621 31.4185C11.0442 32.3844 10.9881 33.4251 11.0021 34.5451C11.0162 35.6689 11.106 36.7702 11.2602 37.8426C11.5897 40.1307 12.2111 42.2891 13.0134 44.2667C13.9034 46.4601 15.0154 48.4317 16.1998 50.1067C18.8209 53.8152 21.7899 55.9607 23.4614 55.9981C25.321 56.0398 27.0491 55.3792 28.6341 54.7732C29.9798 54.2588 31.2223 53.7837 32.3545 53.8116C32.3802 53.8174 32.4071 53.8198 32.4327 53.8174L32.4632 53.8162L32.4935 53.8174C32.5192 53.8198 32.5449 53.8174 32.5694 53.8116C33.7022 53.7827 34.9456 54.2581 36.2926 54.773C37.8776 55.379 39.606 56.0398 41.4661 55.9981C43.1375 55.9607 46.1066 53.8152 48.7278 50.1067C49.911 48.4317 51.024 46.4601 51.914 44.2667C52.046 43.9396 52.1734 43.6079 52.296 43.2715C49.7357 42.4691 47.6274 40.4659 46.4898 37.8426C45.9033 36.4923 45.5752 34.9774 45.5752 33.3772C45.5752 32.7022 45.6336 32.0481 45.7458 31.4185C46.2293 28.6958 47.7116 26.4487 49.7567 24.9944C50.1223 24.7351 50.5055 24.5003 50.9038 24.2925C48.1449 19.9451 43.6562 19.2747 42.244 19.1275C40.4796 18.945 38.3015 19.6522 36.3216 20.295C34.8534 20.7717 33.4942 21.213 32.4935 21.2299Z"
                                fill="#9B9691"
                            />
                        </svg>
                        <h4>Mac</h4>
                    </div>
                    <div class="bottom">DOWNLOAD</div>
                </a>
                <a href="/how-to-vote?goto=/feature-requests/p/linux-desktop-client" class="button">
                    <div class="top">
                        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M28.1096 42.9092C28.0631 42.9323 28.013 42.9571 27.9572 42.9853L28.3057 43.366L28.307 43.3675C28.6571 43.7501 28.9984 44.1232 29.3418 44.4949C29.3717 44.5272 29.4388 44.5369 29.4887 44.5369C29.7347 44.5344 29.9808 44.5332 30.2268 44.532C30.8602 44.529 31.4935 44.526 32.1268 44.4995C33.2592 44.4519 34.3311 44.1735 35.3111 43.5791C35.9811 43.1729 36.5488 42.6456 37.1024 42.1014C37.2168 41.989 37.2549 41.877 37.2601 41.72C37.2923 40.7605 37.3308 39.8013 37.3812 38.8428C37.4027 38.4363 37.5597 38.2921 37.9698 38.252C38.096 38.2397 38.2224 38.2351 38.3488 38.2305C38.407 38.2283 38.4654 38.2262 38.5234 38.2233C38.7218 38.2132 38.7996 38.1611 38.8433 37.9657C38.8931 37.7442 38.9319 37.5192 38.9612 37.2935C39.127 36.021 39.0944 34.7631 38.6915 33.5291C38.1378 31.8309 37.4294 30.1949 36.6722 28.5808C36.3177 27.8251 35.9333 27.0837 35.5489 26.3424C35.4743 26.1984 35.3995 26.0541 35.3251 25.9101C35.1786 25.6258 35.0398 25.5844 34.7333 25.6802C34.6296 25.7118 34.5286 25.7516 34.4311 25.799C34.2443 25.8917 34.0588 25.9865 33.8733 26.0813C33.7596 26.1394 33.646 26.1975 33.5322 26.255C33.3236 26.3603 33.1148 26.4651 32.906 26.5699C32.4562 26.7957 32.0064 27.0214 31.5591 27.2523C31.1302 27.4734 30.7156 27.4288 30.2944 27.2334C29.7049 26.9595 29.2167 26.5485 28.7471 26.1111C28.7154 26.0808 28.6828 26.0524 28.6458 26.0203L28.6005 25.9808C28.6005 26.0508 28.6025 26.1178 28.6045 26.1826C28.6086 26.3166 28.6124 26.4411 28.5972 26.5631C28.4955 27.4131 28.1729 28.2216 27.6615 28.9081C27.2244 29.4973 26.9189 30.1393 26.6672 30.817C26.2952 31.8176 25.9187 32.8129 25.3937 33.7506C24.9569 34.5303 24.7644 35.3927 24.7016 36.2874C24.6192 37.454 24.9889 38.3995 25.9526 39.1043C26.6356 39.6036 27.2984 40.1309 27.9589 40.6602C28.2072 40.8531 28.4339 41.0724 28.635 41.3142C29.0646 41.85 28.9206 42.4763 28.3155 42.8046C28.2507 42.8393 28.1844 42.8721 28.1096 42.9092Z"
                                fill="#9B9691"
                            />
                            <path
                                d="M34.0414 23.577C34.0654 23.5504 34.0894 23.524 34.1134 23.4977C34.1653 23.4407 34.2169 23.384 34.2668 23.3259C34.7228 22.7927 34.5567 21.9235 33.946 21.6023C33.7597 21.5046 33.5877 21.5079 33.4034 21.5942C33.0357 21.7668 32.7846 22.2312 32.8357 22.6631C32.8477 22.767 32.8664 22.8699 32.8876 22.9865C32.8979 23.0432 32.9088 23.1032 32.9197 23.1679C32.8545 23.1396 32.7913 23.1135 32.73 23.0882C32.5839 23.0278 32.4485 22.9719 32.3211 22.9012C32.2504 22.8624 32.1908 22.7641 32.1697 22.6813C31.9742 21.9362 32.0687 21.2398 32.6103 20.662C33.3174 19.9094 34.2603 20.0461 34.8576 20.7767C35.4764 21.5323 35.4836 22.8507 34.615 23.5685C34.3997 23.7467 34.3039 23.7565 34.0414 23.577Z"
                                fill="#9B9691"
                            />
                            <path
                                d="M30.0853 22.9303C30.0842 22.9963 30.0831 23.0646 30.0831 23.1364C30.1388 23.1031 30.1903 23.071 30.2395 23.0403C30.3304 22.9836 30.4132 22.9319 30.4997 22.8873C30.5887 22.8453 30.6642 22.7794 30.7178 22.6969C30.7714 22.6144 30.801 22.5186 30.8032 22.4202C30.8339 21.8711 30.6977 21.3614 30.3649 20.9249C29.8965 20.3104 29.1122 20.3276 28.6563 20.9513C28.2908 21.4503 28.2026 22.0193 28.2765 22.6205C28.3364 23.111 28.5784 23.5067 28.9367 23.8363C28.9872 23.8832 29.0901 23.9451 29.1249 23.9249C29.243 23.8562 29.352 23.7721 29.4488 23.6975C29.4804 23.6731 29.5107 23.6497 29.5395 23.6282C29.4846 23.5943 29.4292 23.5649 29.3759 23.5366C29.2645 23.4776 29.162 23.4233 29.0911 23.3416C28.753 22.9531 28.6781 22.4867 28.8152 22.0001C28.9298 21.5978 29.3445 21.4711 29.6789 21.7174C29.9525 21.917 30.0584 22.2101 30.0809 22.5358C30.0897 22.6632 30.0876 22.7915 30.0853 22.9303Z"
                                fill="#9B9691"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M56 32C56 45.2548 45.2548 56 32 56C18.7452 56 8 45.2548 8 32C8 18.7452 18.7452 8 32 8C45.2548 8 56 18.7452 56 32ZM34.6001 16.3363C35.7339 16.7929 36.5465 17.5743 37.0933 18.6654C37.6503 19.7763 37.8405 20.9654 37.9317 22.1829C37.9527 22.4644 37.9719 22.746 37.9912 23.0277C38.0322 23.628 38.0732 24.2285 38.1313 24.8275C38.1981 25.5144 38.4 26.1638 38.8104 26.7354C39.525 27.7247 40.2343 28.7176 40.9385 29.7142C41.7811 30.906 42.6096 32.1081 43.2509 33.4236L43.2999 33.5241C43.5015 33.9369 43.7067 34.3571 43.7759 34.8146C43.9473 35.9507 43.9355 37.0971 43.6313 38.2201C43.5916 38.3663 43.6219 38.4621 43.7196 38.566C44.0292 38.8825 44.2331 39.2873 44.3032 39.7245C44.3374 39.9385 44.3619 40.1544 44.3788 40.3707C44.4228 40.9341 44.6807 41.3706 45.1556 41.6734C45.309 41.7714 45.4677 41.8608 45.6265 41.9502C45.7298 42.0083 45.8332 42.0666 45.935 42.1271C46.0817 42.2143 46.2292 42.302 46.36 42.4095C46.6323 42.6329 46.7193 42.9257 46.6323 43.2716C46.5691 43.5221 46.4483 43.7364 46.2496 43.8993C46.0891 44.0368 45.9168 44.1601 45.7347 44.2676C45.3125 44.503 44.8749 44.7306 44.4339 44.96C43.237 45.5826 42.015 46.2182 41.0082 47.0578C40.5193 47.4666 40.0259 47.8626 39.3654 47.9551C38.9426 48.0143 38.4673 48.0317 38.0664 47.9014C37.9499 47.8635 37.8334 47.8257 37.7281 47.7675C37.3314 47.5483 37.0246 47.2321 36.7803 46.8487C36.7155 46.7468 36.6097 46.623 36.5045 46.6025C36.4223 46.5865 36.3401 46.5701 36.2577 46.5537C35.7863 46.4597 35.3122 46.3651 34.8356 46.3374C33.3729 46.255 31.9073 46.2215 30.4491 46.427C30.0027 46.4898 29.559 46.5706 29.1155 46.6513L29.0864 46.6566C29.0141 46.6699 28.9164 46.7084 28.8838 46.7654C28.6487 47.1663 28.2992 47.4321 27.8915 47.6223C27.4127 47.8457 26.9046 47.8323 26.4082 47.7043C25.6744 47.5154 24.9439 47.3103 24.2212 47.0823L24.1978 47.0749C23.135 46.7399 22.0752 46.4059 20.9685 46.2381C20.3799 46.1488 19.7934 46.0361 19.2153 45.8961C18.9355 45.8283 18.6632 45.6981 18.4144 45.5508C18.0327 45.3258 17.9301 45.0327 18.0437 44.6093C18.0913 44.4308 18.1516 44.2496 18.2126 44.0665C18.3755 43.5771 18.543 43.0738 18.4844 42.5727C18.4617 42.3796 18.4164 42.1899 18.371 42.0001C18.3182 41.7788 18.2653 41.5574 18.2483 41.3305C18.2072 40.7823 18.4701 40.3938 18.9951 40.2358C19.2285 40.1654 19.4641 40.1021 19.6998 40.0388C19.9349 39.9756 20.1704 39.9123 20.4034 39.8421C20.9134 39.687 21.3626 39.4333 21.6596 38.9705C21.9035 38.5907 22.1534 38.2188 22.5015 37.9211C22.5556 37.8752 22.5823 37.7534 22.5667 37.6781C22.4422 37.0766 22.4869 36.4988 22.7331 35.9295C22.7933 35.79 22.8539 35.6506 22.9144 35.5112C23.2423 34.756 23.5704 34.0004 23.8558 33.2291C24.3684 31.8472 24.9872 30.533 25.9177 29.3768C26.2511 28.9623 26.5773 28.5421 26.9035 28.1219C27.0896 27.8822 27.2757 27.6424 27.4632 27.4038C27.7166 27.081 27.8387 26.712 27.8657 26.3068C27.9462 25.1014 27.8885 23.8993 27.7889 22.6975C27.7061 21.6849 27.6605 20.6716 27.8038 19.6604C27.9237 18.8165 28.1911 18.0371 28.8099 17.416C29.2871 16.9369 29.8648 16.6158 30.4957 16.4014C31.8044 15.956 33.2927 15.8094 34.6001 16.3363Z"
                                fill="#9B9691"
                            />
                        </svg>

                        <h4>Linux</h4>
                    </div>
                    <div class="bottom">UPVOTE</div>
                </a>
            </div>
        </div>
    </section>
    <section id="about">
        <div class="section-content">
            <div class="content-group">
                <h2 class="section-title">ABOUT</h2>
                <p>
                    Picular is made by two lifelong friends. We are a self-funded company with a passion for digital glory, transparency,
                    and doing good. We are from Stockholm, Sweden.
                </p>
            </div>
            <div class="co-founders-box">
                <div class="co-founder-box">
                    <div class="polaroid fille">
                        <div class="photo-container">
                            <img
                                src="https://ik.imagekit.io/picular/tr:w-550,c-at_least/static/PicularFille.jpg"
                                alt="Photo of co-founder Fille"
                                loading="lazy"
                            />
                        </div>
                        <img class="signature" src="./assets/svgs/signature_fille.svg" alt="Fille's signature" />
                    </div>
                    <h5 class="work-title">CODE</h5>
                    <p>Fille Åström</p>
                    <a href="mailto:fille@picular.com" class="email">fille@picular.com</a>
                </div>
                <div class="co-founder-box">
                    <div class="polaroid kristofer">
                        <div class="photo-container">
                            <img
                                class="photo"
                                src="https://ik.imagekit.io/picular/tr:w-250,c-at_least/static/PicularKristofer.jpg"
                                alt="Photo of co-founder Kristofer"
                                loading="lazy"
                            />
                        </div>
                        <img class="signature" src="./assets/svgs/signature_kristofer.svg" alt="Kristofer's signature" />
                    </div>
                    <h5 class="work-title">DESIGN</h5>
                    <p>Kristofer Guldvarg</p>
                    <a href="mailto:kristofer@picular.com" class="email">kristofer@picular.com</a>
                </div>
            </div>
        </div>
    </section>
    <div class="separator">
        <div class="line"></div>
    </div>
    <section id="faq">
        <div class="section-content">
            <h2 class="section-title">FAQ</h2>
            <div class="questions">
                <div>
                    <h3>How long is the free trial?</h3>
                    <p>
                        It can take time to get around and try all features and functions of a new product, so we have a soft limit based on
                        usage. The idea is to make sure that you feel confident that Picular is worth your money. Then, after some time, we
                        will remind you that you're on a free trial and push you towards a decision.
                    </p>
                </div>
                <div>
                    <h3>Are images uploaded and stored on a server?</h3>
                    <p>
                        Yes, Picular is a cloud-based service. We use AWS S3 for storage. This way you can access your photos from anywhere,
                        we can take advantage of massive server power for processing and we can do backups.
                    </p>
                </div>
                <div>
                    <h3>What is the storage limit?</h3>
                    <p>
                        The storage limit is 1 TB. So, for example, if your average size per photo would be 2 MB, you could fit 500 000
                        photos. Whenever we get a customer exceeding the limit, we promise to find a fair solution to expand beyond.
                    </p>
                </div>
                <div>
                    <h3>Do you support RAW format?</h3>
                    <p>Not now, but we aim to add support for RAW later on.</p>
                </div>
                <div>
                    <h3>Is there any quality degradation?</h3>
                    <p>
                        We store all photos in original resolution without compression. If you edit a photo using Picular, we hold it as a
                        copy so that you can always revert to your original. Keep in mind that if you edit a photo in any other tool before
                        uploading, it will be considered the original. Also, if you're uploading 'live photos,' Picular will only store the
                        selected frame.
                    </p>
                </div>
                <div>
                    <h3>What about backups?</h3>
                    <p>
                        We use AWS S3 for storage that implements redundancy with a 99.999999999% (11 9's) durability. However, our ambition
                        is to improve this even further by backing up to another hosting provider to secure the system from human mistakes
                        and if one system encounters a significant accident.
                    </p>
                </div>
                <div>
                    <h3>Do you support video?</h3>
                    <p>
                        Not yet, but we will most likely add support to upload videos in the future. However, it will probably be a pure
                        backup and view function without fancy sorting and editing capabilities since our focus is on photos.
                    </p>
                </div>
            </div>
        </div>
    </section>
    <div class="separator">
        <div class="line"></div>
    </div>
    <footer>
        <div class="section-content">
            <ul class="links">
                <li>
                    <a href="https://picular.canny.io/">Roadmap</a>
                </li>
                <li>
                    <a href="https://picular.canny.io/feature-requests">Feature requests</a>
                </li>
                <li>
                    <a href="https://app.picular.com/release-notes">Release notes</a>
                </li>
                <li>
                    <a href="https://app.picular.com/legal/terms">Terms of use</a>
                </li>
                <li>
                    <a href="https://app.picular.com/legal/privacy">Privacy policy</a>
                </li>
            </ul>
            <ul class="social-links">
                <li>
                    <a href="https://www.facebook.com/getpicular">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M15.839 9C16.1392 9 16.3717 9.2626 16.3353 9.56055L16.0913 11.5606C16.0607 11.8114 15.8477 12 15.595 12H14V18.5C14 18.7761 13.7761 19 13.5 19H10.5C10.2239 19 10 18.7761 10 18.5V12.068L8.5 12C8.22386 12 8 11.7761 8 11.5V9.5C8 9.22386 8.22386 9 8.5 9H10V8.336C10 6.39881 10.9135 5.017 13.1505 5.017L15.5015 5.024C15.777 5.02482 16 5.24844 16 5.524V7.831C16 8.10714 15.7761 8.331 15.5 8.331H14.092C14.0057 8.331 14 8.33564 14 8.478V9H15.839ZM13 9.5C13 9.77614 13.2239 10 13.5 10H15.2743L15.1523 11H13.5C13.2239 11 13 11.2239 13 11.5V18L11 18.1562V11.5C11 11.2239 10.7761 11 10.5 11H9V10H10.5C10.7761 10 11 9.77614 11 9.5V8.336C11 6.88514 11.5739 6.017 13.149 6.017L15 6.02251L15.1462 7.331H14.092C13.4925 7.331 13 7.73442 13 8.478V9.5Z"
                                fill="#9B9691"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12ZM23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12Z"
                                fill="#9B9691"
                            />
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="https://www.youtube.com/channel/UCpcfX6GqtUdxLbri2_T1FDA/videos">
                        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.416 18.7858H10.6667V22.1191C10.6667 22.4873 10.3682 22.7858 10 22.7858C9.63181 22.7858 9.33333 22.4873 9.33333 22.1191V18.7858H8.708C8.33981 18.7858 8.04133 18.4873 8.04133 18.1191C8.04133 17.751 8.33981 17.4525 8.708 17.4525H11.416C11.7842 17.4525 12.0827 17.751 12.0827 18.1191C12.0827 18.4873 11.7842 18.7858 11.416 18.7858Z"
                                fill="#9B9691"
                            />
                            <path
                                d="M17.3333 22.1191V18.1191C17.3333 17.751 17.6318 17.4525 18 17.4525C18.3682 17.4525 18.6667 17.751 18.6667 18.1191V20.1191C19.402 20.1191 20 20.7155 20 21.4525C20 22.1884 19.4018 22.7858 18.6667 22.7858H18.1013C18.0837 22.7858 18.0662 22.7852 18.0489 22.784C18.0327 22.7852 18.0164 22.7858 18 22.7858C17.6318 22.7858 17.3333 22.4873 17.3333 22.1191Z"
                                fill="#9B9691"
                            />
                            <path
                                d="M14.6667 19.4525V20.7858C14.6667 21.1542 14.3686 21.4525 14 21.4525C13.6314 21.4525 13.3333 21.1542 13.3333 20.7858V19.4525C13.3333 19.0843 13.0349 18.7858 12.6667 18.7858C12.2985 18.7858 12 19.0843 12 19.4525V20.7858C12 21.8904 12.8948 22.7858 14 22.7858C15.1052 22.7858 16 21.8904 16 20.7858V19.4525C16 19.0843 15.7015 18.7858 15.3333 18.7858C14.9651 18.7858 14.6667 19.0843 14.6667 19.4525Z"
                                fill="#9B9691"
                            />
                            <path
                                d="M22.6667 18.7858C23.402 18.7858 24 19.3821 24 20.1191C24 20.8551 23.4018 21.4525 22.6667 21.4525H23.3333C23.7015 21.4525 24 21.751 24 22.1191C24 22.4873 23.7015 22.7858 23.3333 22.7858H22.6667C21.9316 22.7858 21.3333 22.1884 21.3333 21.4525V20.1191C21.3333 19.3821 21.9313 18.7858 22.6667 18.7858Z"
                                fill="#9B9691"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M22.5933 25.4525H9.34133C7.10469 25.4525 5.33467 23.6171 5.33467 21.3575L5.336 18.8325C5.336 16.5771 7.09887 14.7858 9.34267 14.7858H22.596C24.8439 14.7858 26.6667 16.608 26.6667 18.8555L26.6653 21.382C26.6652 23.6299 24.8416 25.4525 22.5933 25.4525ZM25.3333 18.8551L25.332 21.3818C25.332 22.8933 24.1055 24.1191 22.5933 24.1191H9.34133C7.85211 24.1191 6.668 22.8913 6.668 21.3578L6.66933 18.8328C6.66933 17.3087 7.84006 16.1191 9.34267 16.1191H22.596C24.1076 16.1191 25.3333 17.3445 25.3333 18.8551Z"
                                fill="#9B9691"
                            />
                            <path
                                d="M12.0002 9.21772L14.4336 6.07822C14.6591 5.78721 14.6061 5.36845 14.3151 5.14289C14.0241 4.91733 13.6053 4.97038 13.3797 5.26139L11.3331 7.90186L9.28676 5.26385C9.06108 4.97293 8.6423 4.92004 8.35138 5.14572C8.06046 5.37139 8.00757 5.79017 8.23324 6.08109L10.6668 9.21827L10.6693 12.8516C10.6696 13.2198 10.9683 13.5181 11.3365 13.5178C11.7046 13.5176 12.0029 13.2189 12.0027 12.8507L12.0002 9.21772Z"
                                fill="#9B9691"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M15.3333 13.4378C16.4095 13.4337 17.3333 12.5363 17.3333 11.4645V10.0538C17.3333 8.982 16.4089 8.13914 15.3333 8.13914C14.2576 8.13914 13.3333 9.01064 13.3333 10.0831V11.4938C13.3333 12.565 14.259 13.4378 15.3333 13.4378ZM16 11.4645V10.0538C16 9.74728 15.6986 9.47247 15.3333 9.47247C14.977 9.47247 14.6667 9.76512 14.6667 10.0831V11.4938C14.6667 11.8105 14.9784 12.1045 15.3308 12.1045C15.6796 12.1032 16 11.7919 16 11.4645Z"
                                fill="#9B9691"
                            />
                            <path
                                d="M21.3333 11.4525V9.45247C21.3333 9.08428 21.6318 8.78581 22 8.78581C22.3682 8.78581 22.6667 9.08428 22.6667 9.45247V11.4525C22.6667 12.557 21.7718 13.4525 20.6667 13.4525C19.5615 13.4525 18.6667 12.557 18.6667 11.4525V9.45247C18.6667 9.08428 18.9651 8.78581 19.3333 8.78581C19.7015 8.78581 20 9.08428 20 9.45247V11.4525C20 11.8208 20.2981 12.1191 20.6667 12.1191C21.0352 12.1191 21.3333 11.8208 21.3333 11.4525Z"
                                fill="#9B9691"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M0 16.1191C0 24.9557 7.16344 32.1191 16 32.1191C24.8366 32.1191 32 24.9557 32 16.1191C32 7.28258 24.8366 0.119141 16 0.119141C7.16344 0.119141 0 7.28258 0 16.1191ZM30.6667 16.1191C30.6667 24.2193 24.1002 30.7858 16 30.7858C7.89982 30.7858 1.33333 24.2193 1.33333 16.1191C1.33333 8.01896 7.89982 1.45247 16 1.45247C24.1002 1.45247 30.6667 8.01896 30.6667 16.1191Z"
                                fill="#9B9691"
                            />
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="https://discord.gg/C2pb8xgyvd">
                        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M15.3333 15.882C15.3333 17.3548 14.1394 18.5487 12.6667 18.5487C11.1939 18.5487 10 17.3548 10 15.882C10 14.4093 11.1939 13.2154 12.6667 13.2154C14.1394 13.2154 15.3333 14.4093 15.3333 15.882ZM12.6667 17.2154C13.403 17.2154 14 16.6184 14 15.882C14 15.1457 13.403 14.5487 12.6667 14.5487C11.9303 14.5487 11.3333 15.1457 11.3333 15.882C11.3333 16.6184 11.9303 17.2154 12.6667 17.2154Z"
                                fill="#9B9691"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M19.3333 18.5487C20.8061 18.5487 22 17.3548 22 15.882C22 14.4093 20.8061 13.2154 19.3333 13.2154C17.8606 13.2154 16.6667 14.4093 16.6667 15.882C16.6667 17.3548 17.8606 18.5487 19.3333 18.5487ZM20.6667 15.882C20.6667 16.6184 20.0697 17.2154 19.3333 17.2154C18.597 17.2154 18 16.6184 18 15.882C18 15.1457 18.597 14.5487 19.3333 14.5487C20.0697 14.5487 20.6667 15.1457 20.6667 15.882Z"
                                fill="#9B9691"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M5.33333 20.6897C5.33333 20.6897 6.86754 23.3899 10.9037 23.5193L12.5391 21.3971C13.0381 21.5301 13.4252 21.6241 13.6987 21.6773C15.2601 21.9828 16.8655 21.9889 18.4292 21.695C18.7173 21.6414 19.0039 21.5799 19.2886 21.5106L21.0767 23.5193C25.1129 23.3881 26.6667 20.6897 26.6667 20.6897C26.6667 14.6955 24.0351 9.83771 24.0351 9.83771C21.407 7.82722 18.9033 7.88218 18.9033 7.88218L18.1184 8.81297C16.7559 8.62067 15.3735 8.6147 14.0094 8.79524C13.9429 8.79782 13.8765 8.80374 13.8106 8.81297L13.0949 7.88218C13.0949 7.88218 10.593 7.82722 7.96315 9.83594C7.96315 9.83594 5.33333 14.6955 5.33333 20.6897ZM21.6367 22.1431L19.7517 20.0256L18.9732 20.2151C18.7122 20.2787 18.4495 20.335 18.1854 20.3841L18.1829 20.3846C16.7853 20.6473 15.3504 20.6419 13.9548 20.3688L13.9532 20.3685C13.7258 20.3242 13.3742 20.2398 12.8825 20.1088L12.0248 19.8802L10.286 22.1366C8.94549 21.9734 8.02249 21.4697 7.42391 21.0038C7.07198 20.7299 6.82451 20.4623 6.67116 20.2732C6.72805 17.6268 7.31587 15.2211 7.91263 13.4382C8.22537 12.5039 8.5373 11.7503 8.76865 11.2349C8.86497 11.0204 8.9471 10.8476 9.0092 10.7207C10.0697 9.9637 11.0828 9.58731 11.8371 9.3997C12.082 9.33877 12.2991 9.29793 12.4805 9.27058L13.2266 10.241L13.9954 10.1334C14.0172 10.1304 14.0391 10.1284 14.0611 10.1276L14.123 10.1252L14.1844 10.117C15.4285 9.95238 16.6894 9.95783 17.9321 10.1332L18.6623 10.2363L19.4812 9.26519C19.6699 9.29251 19.8998 9.33471 20.1616 9.39987C20.9161 9.58767 21.9292 9.96444 22.989 10.7222C23.0512 10.849 23.1335 11.022 23.2301 11.2369C23.4615 11.7521 23.7737 12.5054 24.0866 13.4395C24.6834 15.2209 25.2713 17.6246 25.3288 20.2693C25.1734 20.459 24.924 20.7264 24.5693 21.0009C23.9566 21.4749 23.0103 21.9869 21.6367 22.1431Z"
                                fill="#9B9691"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M32 16.1191C32 24.9557 24.8366 32.1191 16 32.1191C7.16344 32.1191 0 24.9557 0 16.1191C0 7.28258 7.16344 0.119141 16 0.119141C24.8366 0.119141 32 7.28258 32 16.1191ZM30.6667 16.1191C30.6667 24.2193 24.1002 30.7858 16 30.7858C7.89982 30.7858 1.33333 24.2193 1.33333 16.1191C1.33333 8.01896 7.89982 1.45247 16 1.45247C24.1002 1.45247 30.6667 8.01896 30.6667 16.1191Z"
                                fill="#9B9691"
                            />
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="https://join.slack.com/t/picular/shared_invite/zt-7tmn0rkh-Kf5qogJ2q0XynHwyxPb27Q">
                        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M13.5173 15.4938H8.53333C8.38505 15.4938 8.23765 15.4761 8.09419 15.4414C8.00049 15.4187 7.90847 15.3888 7.81899 15.3517C7.59252 15.2579 7.38674 15.1204 7.2134 14.9471C7.04006 14.7737 6.90257 14.568 6.80876 14.3415C6.71495 14.115 6.66667 13.8723 6.66667 13.6271C6.66667 13.382 6.71495 13.1393 6.80876 12.9128C6.90257 12.6863 7.04006 12.4805 7.2134 12.3072C7.38674 12.1339 7.59252 11.9964 7.81899 11.9026C8.04547 11.8088 8.2882 11.7605 8.53333 11.7605H13.5173C13.7158 11.7605 13.9109 11.7921 14.0961 11.8525C14.373 11.9428 14.6275 12.0975 14.8373 12.3072C15.0267 12.4967 15.1713 12.7227 15.264 12.9687C15.3426 13.1771 15.384 13.4 15.384 13.6271C15.384 13.8074 15.3579 13.9851 15.3078 14.155C15.2204 14.4515 15.0598 14.7245 14.8373 14.9471C14.5927 15.1916 14.2872 15.3613 13.9565 15.4414C13.8139 15.476 13.6665 15.4938 13.5173 15.4938ZM8.53333 13.0938H13.5173C13.6588 13.0938 13.7944 13.15 13.8945 13.25C13.9945 13.35 14.0507 13.4857 14.0507 13.6271C14.0507 13.7686 13.9945 13.9042 13.8945 14.0043C13.7944 14.1043 13.6588 14.1605 13.5173 14.1605H8.53333C8.46329 14.1605 8.39394 14.1467 8.32924 14.1199C8.26453 14.0931 8.20574 14.0538 8.15621 14.0043C8.10668 13.9547 8.0674 13.8959 8.0406 13.8312C8.0138 13.7665 8 13.6972 8 13.6271C8 13.5571 8.0138 13.4878 8.0406 13.423C8.0674 13.3583 8.10668 13.2995 8.15621 13.25C8.20574 13.2005 8.26453 13.1612 8.32924 13.1344C8.39394 13.1076 8.46329 13.0938 8.53333 13.0938Z"
                                fill="#9B9691"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M7.81899 16.8866C7.90847 16.8495 8.00049 16.8195 8.09419 16.7969C8.23765 16.7621 8.38505 16.7445 8.53333 16.7445H10.4V18.6111C10.4 18.7991 10.3717 18.9841 10.3173 19.1605C10.2286 19.4487 10.0704 19.7139 9.85327 19.9311C9.5032 20.2811 9.0284 20.4778 8.53333 20.4778C8.03826 20.4778 7.56347 20.2811 7.2134 19.9311C6.86333 19.581 6.66667 19.1062 6.66667 18.6111C6.66667 18.366 6.71495 18.1233 6.80876 17.8968C6.90257 17.6703 7.04006 17.4645 7.2134 17.2912C7.38674 17.1179 7.59252 16.9804 7.81899 16.8866ZM8.53333 18.0778H9.06667V18.6111C9.06667 18.7526 9.01048 18.8882 8.91046 18.9883C8.81044 19.0883 8.67478 19.1445 8.53333 19.1445C8.39189 19.1445 8.25623 19.0883 8.15621 18.9883C8.05619 18.8882 8 18.7526 8 18.6111C8 18.5411 8.0138 18.4718 8.0406 18.407C8.0674 18.3423 8.10669 18.2835 8.15621 18.234C8.20573 18.1845 8.26453 18.1452 8.32924 18.1184C8.39394 18.0916 8.46329 18.0778 8.53333 18.0778Z"
                                fill="#9B9691"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16.5973 8.65248C16.5973 8.47346 16.6231 8.29573 16.6735 8.12467C16.6921 8.06149 16.7141 7.99922 16.7394 7.93813C16.8332 7.71166 16.9707 7.50588 17.1441 7.33254C17.3174 7.15921 17.5232 7.02171 17.7497 6.9279C17.9761 6.83409 18.2189 6.78581 18.464 6.78581C18.7091 6.78581 18.9519 6.83409 19.1783 6.9279C19.4048 7.02171 19.6106 7.15921 19.7839 7.33254C19.9573 7.50588 20.0948 7.71166 20.1886 7.93813C20.2824 8.16461 20.3307 8.40734 20.3307 8.65248V13.6271C20.3307 13.8356 20.2958 14.0404 20.2293 14.2338C20.1379 14.4999 19.9866 14.7444 19.7839 14.9471C19.5668 15.1642 19.3016 15.3224 19.0134 15.4111C18.8449 15.463 18.6686 15.4912 18.4893 15.4936L18.4827 15.4937L18.464 15.4938C18.318 15.4938 18.1729 15.4768 18.0315 15.4431C17.94 15.4213 17.8501 15.3926 17.7626 15.3571C17.534 15.2644 17.326 15.1273 17.1507 14.9537C16.9753 14.7801 16.8362 14.5735 16.7412 14.3458C16.7151 14.2834 16.6926 14.2197 16.6735 14.155C16.6231 13.984 16.5973 13.8062 16.5973 13.6271V8.65248ZM18.8411 14.0043C18.7411 14.1043 18.6054 14.1605 18.464 14.1605C18.3953 14.1605 18.3273 14.1473 18.2636 14.1215C18.1983 14.095 18.1388 14.0558 18.0888 14.0062C18.0387 13.9566 17.9989 13.8976 17.9718 13.8325C17.9446 13.7675 17.9307 13.6977 17.9307 13.6272V8.65248C17.9307 8.58244 17.9445 8.51309 17.9713 8.44838C17.9981 8.38367 18.0374 8.32487 18.0869 8.27535C18.1364 8.22583 18.1952 8.18654 18.2599 8.15974C18.3246 8.13294 18.394 8.11914 18.464 8.11914C18.534 8.11914 18.6034 8.13294 18.6681 8.15974C18.7328 8.18654 18.7916 8.22583 18.8411 8.27535C18.8906 8.32487 18.9299 8.38367 18.9567 8.44838C18.9835 8.51308 18.9973 8.58244 18.9973 8.65248V13.6271C18.9973 13.7686 18.9411 13.9042 18.8411 14.0043Z"
                                fill="#9B9691"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M23.4667 16.7445C23.6162 16.7445 23.7639 16.7624 23.9068 16.7971C24.2372 16.8773 24.5423 17.0469 24.7866 17.2912C25.1367 17.6413 25.3333 18.1161 25.3333 18.6111C25.3333 19.1062 25.1367 19.581 24.7866 19.9311C24.4365 20.2811 23.9617 20.4778 23.4667 20.4778H18.4827C18.2842 20.4778 18.0891 20.4462 17.9039 20.3858C17.627 20.2955 17.3725 20.1408 17.1627 19.9311C16.96 19.7284 16.8088 19.4839 16.7173 19.2178C16.6509 19.0244 16.616 18.8196 16.616 18.6111C16.616 18.4457 16.638 18.2825 16.6803 18.1255C16.7646 17.8127 16.9297 17.5243 17.1627 17.2912C17.4056 17.0483 17.7085 16.8793 18.0366 16.7986C18.1754 16.7644 18.3188 16.746 18.464 16.7446L18.4827 16.7445H23.4667ZM18.4827 18.0778H23.4667C23.6081 18.0778 23.7438 18.134 23.8438 18.234C23.9438 18.334 24 18.4697 24 18.6111C24 18.7526 23.9438 18.8882 23.8438 18.9883C23.7438 19.0883 23.6081 19.1445 23.4667 19.1445H18.4827C18.3412 19.1445 18.2056 19.0883 18.1055 18.9883C18.0055 18.8882 17.9493 18.7526 17.9493 18.6111C17.9493 18.4697 18.0055 18.334 18.1055 18.234C18.2056 18.134 18.3412 18.0778 18.4827 18.0778Z"
                                fill="#9B9691"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M23.4667 15.4942L23.4293 15.4938H21.5627V13.6271C21.5627 13.4187 21.5975 13.2139 21.664 13.0205C21.7554 12.7544 21.9067 12.5099 22.1094 12.3072C22.4595 11.9571 22.9343 11.7605 23.4293 11.7605C23.9244 11.7605 24.3992 11.9571 24.7493 12.3072C25.0993 12.6573 25.296 13.1321 25.296 13.6271H25.3333C25.3333 13.7521 25.3207 13.8771 25.296 13.999C25.2716 14.119 25.2354 14.2367 25.1878 14.3502C25.0916 14.5792 24.9508 14.7866 24.7735 14.9605C24.5962 15.1343 24.3859 15.271 24.1551 15.3626C24.0741 15.3947 23.9911 15.4211 23.9068 15.4415C23.763 15.4765 23.6152 15.4942 23.4667 15.4942ZM22.896 14.1605V13.6271C22.896 13.4857 22.9522 13.35 23.0522 13.25C23.1522 13.15 23.2879 13.0938 23.4293 13.0938C23.5708 13.0938 23.7064 13.15 23.8065 13.25C23.9065 13.35 23.9627 13.4857 23.9627 13.6271V13.8235L23.9584 13.834C23.9309 13.8994 23.8907 13.9587 23.84 14.0084C23.7894 14.058 23.7293 14.0971 23.6634 14.1232C23.5974 14.1494 23.5269 14.1622 23.456 14.1607L23.4427 14.1605H22.896Z"
                                fill="#9B9691"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M15.384 18.6111V23.5858C15.384 23.7513 15.362 23.9144 15.3197 24.0714C15.2354 24.3843 15.0704 24.6727 14.8373 24.9057C14.4872 25.2558 14.0124 25.4525 13.5173 25.4525C13.0223 25.4525 12.5475 25.2558 12.1974 24.9057C11.8473 24.5557 11.6507 24.0809 11.6507 23.5858V18.6111C11.6507 18.4246 11.6786 18.2394 11.7333 18.0618C11.7505 18.006 11.7703 17.9509 11.7928 17.8968C11.8866 17.6703 12.0241 17.4645 12.1974 17.2912C12.3707 17.1179 12.5765 16.9804 12.803 16.8866C12.8571 16.8641 12.9122 16.8443 12.968 16.8271C13.1456 16.7724 13.3308 16.7445 13.5173 16.7445C13.6665 16.7445 13.8139 16.7623 13.9565 16.7969C14.2872 16.8769 14.5927 17.0466 14.8373 17.2912C15.0703 17.5243 15.2354 17.8127 15.3197 18.1255C15.362 18.2825 15.384 18.4457 15.384 18.6111ZM13.3132 18.1184C13.3779 18.0916 13.4473 18.0778 13.5173 18.0778C13.6588 18.0778 13.7944 18.134 13.8945 18.234C13.9945 18.334 14.0507 18.4697 14.0507 18.6111V23.5858C14.0507 23.7273 13.9945 23.8629 13.8945 23.9629C13.7944 24.063 13.6588 24.1191 13.5173 24.1191C13.3759 24.1191 13.2402 24.063 13.1402 23.9629C13.0402 23.8629 12.984 23.7273 12.984 23.5858V18.6111C12.984 18.5411 12.9978 18.4718 13.0246 18.407C13.0514 18.3423 13.0907 18.2835 13.1402 18.234C13.1897 18.1845 13.2485 18.1452 13.3132 18.1184Z"
                                fill="#9B9691"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16.616 21.7191H18.4827C18.6803 21.7191 18.8756 21.7505 19.0615 21.8111C19.2228 21.8638 19.3771 21.9384 19.5197 22.0337C19.8267 22.2388 20.066 22.5304 20.2072 22.8715C20.3485 23.2126 20.3855 23.5879 20.3135 23.95C20.2414 24.3121 20.0637 24.6447 19.8026 24.9057C19.5415 25.1668 19.2089 25.3446 18.8468 25.4166C18.4847 25.4886 18.1094 25.4517 17.7683 25.3104C17.4272 25.1691 17.1357 24.9298 16.9306 24.6229C16.8171 24.453 16.7329 24.2666 16.6803 24.0714C16.6378 23.9139 16.616 23.7507 16.616 23.5858V21.7191ZM18.4827 23.0525H17.9493V23.5858C17.9493 23.6913 17.9806 23.7944 18.0392 23.8821C18.0978 23.9698 18.1811 24.0382 18.2786 24.0785C18.376 24.1189 18.4833 24.1295 18.5867 24.1089C18.6902 24.0883 18.7852 24.0375 18.8598 23.9629C18.9344 23.8883 18.9852 23.7933 19.0058 23.6899C19.0263 23.5864 19.0158 23.4792 18.9754 23.3817C18.935 23.2843 18.8667 23.201 18.779 23.1424C18.6913 23.0838 18.5882 23.0525 18.4827 23.0525Z"
                                fill="#9B9691"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M15.384 10.5191H13.5173C13.3189 10.5191 13.1237 10.4875 12.9385 10.4271C12.6617 10.3368 12.4072 10.1822 12.1974 9.97241C11.8473 9.62234 11.6507 9.14755 11.6507 8.65248C11.6507 8.1574 11.8473 7.68261 12.1974 7.33254C12.5475 6.98247 13.0223 6.78581 13.5173 6.78581C13.7625 6.78581 14.0052 6.83409 14.2317 6.9279C14.4582 7.02171 14.6639 7.15921 14.8373 7.33254C15.0106 7.50588 15.1481 7.71166 15.2419 7.93813C15.2672 7.99922 15.2892 8.06149 15.3078 8.12467C15.3583 8.29573 15.384 8.47346 15.384 8.65248V10.5191ZM13.5173 9.18581H14.0507V8.65248C14.0507 8.58244 14.0369 8.51308 14.0101 8.44838C13.9833 8.38367 13.944 8.32487 13.8945 8.27535C13.8449 8.22583 13.7861 8.18654 13.7214 8.15974C13.6567 8.13294 13.5874 8.11914 13.5173 8.11914C13.3759 8.11914 13.2402 8.17533 13.1402 8.27535C13.0402 8.37537 12.984 8.51103 12.984 8.65248C12.984 8.79392 13.0402 8.92958 13.1402 9.0296C13.2402 9.12962 13.3759 9.18581 13.5173 9.18581Z"
                                fill="#9B9691"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M32 16.1191C32 24.9557 24.8366 32.1191 16 32.1191C7.16344 32.1191 0 24.9557 0 16.1191C0 7.28258 7.16344 0.119141 16 0.119141C24.8366 0.119141 32 7.28258 32 16.1191ZM30.6667 16.1191C30.6667 24.2193 24.1002 30.7858 16 30.7858C7.89982 30.7858 1.33333 24.2193 1.33333 16.1191C1.33333 8.01896 7.89982 1.45247 16 1.45247C24.1002 1.45247 30.6667 8.01896 30.6667 16.1191Z"
                                fill="#9B9691"
                            />
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="https://twitter.com/getpicular">
                        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16 32.1191C7.16344 32.1191 0 24.9557 0 16.1191C0 7.28258 7.16344 0.119141 16 0.119141C24.8366 0.119141 32 7.28258 32 16.1191C32 24.9557 24.8366 32.1191 16 32.1191ZM16 30.7858C24.1002 30.7858 30.6667 24.2193 30.6667 16.1191C30.6667 8.01896 24.1002 1.45247 16 1.45247C7.89982 1.45247 1.33333 8.01896 1.33333 16.1191C1.33333 24.2193 7.89982 30.7858 16 30.7858ZM23.0911 9.44396C22.828 9.4793 22.5902 9.51365 22.3831 9.54663L22.2861 9.56234C21.5306 8.88711 20.5477 8.50314 19.5053 8.50314C17.1987 8.50314 15.328 10.3734 15.328 12.6791C15.328 12.6992 15.3281 12.7192 15.3284 12.7392C12.9831 12.4217 10.8624 11.2214 9.37016 9.39003C9.07592 9.02891 8.51148 9.0732 8.27716 9.47578C7.90781 10.1103 7.71067 10.8289 7.71067 11.5765C7.71067 12.2313 7.86243 12.8602 8.13998 13.4232C7.88316 13.5091 7.68267 13.7484 7.68267 14.0565V14.1031C7.68267 15.3185 8.20643 16.4265 9.0527 17.1952C8.92559 17.359 8.87306 17.5818 8.94516 17.8067C9.30412 18.9264 10.1129 19.8224 11.1417 20.3087C10.0864 20.7868 8.91489 20.9693 7.74025 20.8317C7.03791 20.7494 6.70753 21.6733 7.30282 22.055C9.0073 23.1479 10.9837 23.7391 13.0427 23.7391C19.2933 23.7391 23.6933 18.746 23.6933 13.0871C23.6933 13.0318 23.693 12.9784 23.6923 12.9264C24.0037 12.6072 24.271 12.1565 24.61 11.4715C24.6204 11.4504 24.6511 11.3876 24.6903 11.3074C24.7751 11.1338 24.8996 10.8789 24.9439 10.791C25.0566 10.5674 25.1444 10.4093 25.2209 10.295C25.5354 9.82454 25.1577 9.20086 24.595 9.26167C24.5003 9.2719 24.3358 9.2903 24.1247 9.31497C23.7727 9.35609 23.4206 9.39969 23.0911 9.44396ZM23.2686 10.7654C23.0155 10.7994 22.788 10.8323 22.5927 10.8634C22.437 10.8882 22.3041 10.9115 22.1976 10.9328C21.9713 10.9782 21.7376 10.9032 21.5799 10.7346C21.047 10.1651 20.3032 9.83647 19.5053 9.83647C17.935 9.83647 16.6613 11.1098 16.6613 12.6791C16.6613 12.9018 16.6862 13.1212 16.7342 13.3249C16.836 13.7567 16.4955 14.1655 16.0525 14.1437C13.396 14.0125 10.9332 12.8972 9.08997 11.0643C9.05953 11.2315 9.044 11.4027 9.044 11.5765C9.044 12.5388 9.52403 13.4173 10.3092 13.9423C10.8665 14.3149 10.5871 15.1846 9.91702 15.1628C9.66965 15.1548 9.42555 15.125 9.18706 15.0745C9.51964 15.9872 10.3081 16.6906 11.2948 16.8881C11.984 17.026 12.0182 17.9986 11.3405 18.1847C11.131 18.2422 10.9177 18.2829 10.7025 18.3068C11.2185 18.9504 12.0047 19.358 12.8707 19.3753C13.4973 19.3878 13.7619 20.1797 13.2687 20.5665C12.3844 21.2597 11.3763 21.7412 10.3119 21.9964C11.1869 22.2657 12.1047 22.4058 13.0427 22.4058C18.5167 22.4058 22.36 18.0446 22.36 13.0871C22.36 12.9307 22.357 12.7949 22.3503 12.6695C22.3382 12.4436 22.4414 12.2271 22.6244 12.0942C22.8323 11.9434 23.0763 11.5645 23.4149 10.8802C23.4235 10.8629 23.45 10.8085 23.485 10.7369C23.4119 10.7463 23.3397 10.7559 23.2686 10.7654Z"
                                fill="#9B9691"
                            />
                        </svg>
                    </a>
                </li>
                <li>
                    <a href="https://www.instagram.com/getpicular/">
                        <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.3333 9.45247H22.6667V10.7858H21.3333V9.45247Z" fill="#9B9691" />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M21.556 25.4525C23.6418 25.4525 25.3333 23.7604 25.3333 21.6738V10.5618C25.3333 8.47645 23.6417 6.78581 21.556 6.78581H10.444C8.35831 6.78581 6.66667 8.47645 6.66667 10.5618V21.6738C6.66667 23.7604 8.35823 25.4525 10.444 25.4525H21.556ZM24 21.6738V13.4525H20.2176C20.5055 14.0586 20.6667 14.7367 20.6667 15.4525C20.6667 18.0298 18.5773 20.1191 16 20.1191C13.4227 20.1191 11.3333 18.0298 11.3333 15.4525C11.3333 14.7367 11.4945 14.0586 11.7824 13.4525H8V21.6738C8 23.0241 9.0947 24.1191 10.444 24.1191H21.556C22.9053 24.1191 24 23.0241 24 21.6738ZM13.3333 11.6223C14.0892 11.095 15.0085 10.7858 16 10.7858C17.2715 10.7858 18.4243 11.2943 19.266 12.1191H24V10.5618C24 9.21301 22.9055 8.11914 21.556 8.11914H13.3333V11.6223ZM12 12.1191V8.11914H10.6667V12.1191H12ZM8 10.5618C8 9.6127 8.54195 8.78982 9.33333 8.38547V12.1191H8V10.5618ZM16 18.7858C17.841 18.7858 19.3333 17.2934 19.3333 15.4525C19.3333 13.6115 17.841 12.1191 16 12.1191C14.1591 12.1191 12.6667 13.6115 12.6667 15.4525C12.6667 17.2934 14.1591 18.7858 16 18.7858Z"
                                fill="#9B9691"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16 32.1191C7.16344 32.1191 0 24.9557 0 16.1191C0 7.28258 7.16344 0.119141 16 0.119141C24.8366 0.119141 32 7.28258 32 16.1191C32 24.9557 24.8366 32.1191 16 32.1191ZM16 30.7858C24.1002 30.7858 30.6667 24.2193 30.6667 16.1191C30.6667 8.01896 24.1002 1.45247 16 1.45247C7.89982 1.45247 1.33333 8.01896 1.33333 16.1191C1.33333 24.2193 7.89982 30.7858 16 30.7858Z"
                                fill="#9B9691"
                            />
                        </svg>
                    </a>
                </li>
            </ul>
            <p class="copyright">Copyright © {{ currentYear }} Picular</p>
        </div>
    </footer>
</template>

<style lang="scss" src="./home.scss" scoped></style>
