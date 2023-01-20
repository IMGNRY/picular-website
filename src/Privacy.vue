<template>
    <div class="legal">
        <div class="content">
            <div>
                <h1 class="mt72">Privacy Policy</h1>
                <p class="b3 extra">Date of Last Revision: January 20, 2023</p>
                <p class="b1 mt24" style="max-width: 600px">
                    Picular is founded on the principle of helping people organize, store and enjoy their photos and we take your privacy
                    very seriously. By installing and using Picular, you are accepting the practices outlined in this policy. The column on
                    the right provides a short explanation of the privacy policy and is not legally binding.
                </p>
                <p class="b2 mt24 extra" style="max-width: 600px">
                    This Privacy Policy covers Picular’s treatment of personal information that Picular gathers when you are using the
                    Picular app and when you use Picular services. This policy does not apply to the practices of third parties that Picular
                    does not own or control, or to individuals that Picular does not employ or manage.
                </p>
                <template v-for="section of sections">
                    <separator class="mt48" />
                    <div class="pair mt48">
                        <div class="long">
                            <h3>{{ section.title }}</h3>
                            <p class="b2 mt24 grey2" v-html="section.long.replace(/\n/g, '<br/>')"></p>
                        </div>
                        <div class="short">
                            <template v-if="section.short">
                                <h3 class="green2">Simplified</h3>
                                <p class="b2 mt24 green3" v-html="section.short"></p>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const sections = [
    {
        title: `INFORMATION COLLECTED BY Picular`,
        long: `We only collect personal information that is relevant to the purpose of our app. This information allows us to provide you with a customized and efficient experience. We collect the following types of information from our Picular users: `,
        short: `We collect information to make Picular useful for you and to provide a personalized experience.`,
    },
    {
        title: `INFORMATION YOU PROVIDE TO US`,
        long: `We receive and store any information you enter on in our app or provide to us in any other way. You can choose not to provide us with certain information, but then you may not be able to take advantage of all our features.

Registration: In order for you to use Picular you must complete a registration form. As part of this registration form, we require your email or if you register with your Facebook account we will have access to certain information from that site, such as your name, account information and friends lists, in accordance with the authorization procedures determined by such social media site. We may receive updated information about you, such as an updated billing address, from the financial institution issuing your credit card in connection with our billing for the Services.

User Profile: To allow you to express yourself beyond just the information collected during registration, we enable you to provide additional information, such as your first and last names, email address, social media account names, your birthday and gender. In addition, you may choose to include photos of yourself in your profile.`,
        short: `We collect your registration and user profile data so that you can log in and use Picular.`,
    },
    {
        title: `Information We Collect Automatically`,
        long: `We receive and store certain types of information whenever you interact with us. Picular and its authorized agents automatically receive and record certain "traffic data" on their server logs from your browser including your IP address. Picular uses this traffic data to help diagnose problems with its servers, analyze trends and administer the app.

Picular may collect and use information regarding the geographic location of your devices. If the location data contains your personal information, then Picular will treat this location data in accordance with this Policy.

Picular may collect and, on any page, display the total counts that page has been viewed. This includes User Profile pages.`,
        short: `Our servers collect log information, geographic location and user behaviours; this allows us to analyze, improve and personalize your experience.`,
    },
    {
        title: `E-MAIL COMMUNICATIONS`,
        long: `Picular is very concerned about your privacy and we will never provide your email address to a third party without your explicit permission. Picular may send out e-mails with Picular-related news, products, offers, surveys or promotions. You may also receive notification e-mails from Picular, which inform you of actions (e.g. friend requests) that have been performed on the site. If you do not want to receive e-mail from us, please click the “unsubscribe”-link in the unwanted e-mail message. However, please note that in all cases you will continue to receive all system e-mails (e.g. those regarding forgotten user passwords) and legal notices (e.g. updates to our policies) from us.`,
        short: `We will send you emails from time to time. You’ll have the option to unsubscribe except for system e-emails.`,
    },
    {
        title: `SHARING YOUR INFORMATION`,
        long: `Rest assured that we neither rent nor sell your personal information to anyone and that we will share your personal information only as described below.
        
        Picular personnel and authorized consultants and/or contractors may have access to user information if necessary in the normal course of Picular business.

Protection of Picular and Others: We may release personal information when we believe in good faith that release is necessary to comply with a law; to enforce or apply our Terms of Use and other policies; or to protect the rights, property, or safety of Picular, our employees, our users, or others. This includes exchanging information with other companies and organizations for fraud protection and credit risk reduction.

User Profile information: Information collected during registration and subsequent visits, such as your nick name and location, may be displayed to other Picular users if you choose to engage in our forums.

Service Providers: Picular may share user information as well as information from tools such as cookies, log files, device identifiers and location data, with third-parties that help Picular provide services to you (“Service Providers”). Our Service Providers will be given access to your information as is reasonably necessary for Picular to provide our services. Picular requires Services Providers to protect your data in a manner consistent with this Policy and to limit the use of such information to the performance of services for Picular. Picular may also remove parts of data that can identify you and share anonymized data with Service Providers, including combining your information with other information in a way that it is no longer associated with you.</li>

With Your Consent: Except as noted above, we will contact you when your personal information is shared with third parties or used for a purpose incompatible with the purpose(s) for which it was originally collected, and you will be able to opt out to prevent the sharing of this information.`,
        short: `We do not sell your information to anyone. However, we will show publicly available information to other users. We may share information so that we can provide our service, and we may share information where required by law. We may also share information with third-parties that help Picular provide services to you.`,
    },
    {
        title: `KEEPING INFORMATION SECURE`,
        long: `Your Picular account information is protected by a password for your privacy and security. Protect against unauthorized access to your password and to your computer by logging off once you have finished using a shared computer.
        
        Only employees who need personal information to perform a specific job (for example, a customer service representative) are granted access to it. All of our employees are kept up to date on our privacy and security practices.</li></ol>`,
        short: `Your account is protected by an encrypted password. We keep it secure; you must also keep it safe. Our employees may not access your account unless required to do a specific job.`,
    },
    {
        title: `CHILDREN UNDER 18 YEARS OF AGE`,
        long: `You must be 18 years and older or are authorized to access the Site by a parent or legal guardian to register to use Picular. If you have authorized a minor to use the Site, you are responsible for the online conduct of such minor, and the consequences of any misuse of the Site by the minor.
`,
        short: `Ask for your parents' permission if you’re not 18 years of age or older.`,
    },
    {
        title: `CHANGES TO THIS PRIVACY POLICY`,
        long: `Picular may amend this Privacy Policy from time to time, at its sole discretion. Use of information we collect now is subject to the Privacy Policy in effect at the time such information is used. If we make changes to the Privacy Policy, we will notify you by posting an announcement on the Picular website so you are always aware of what information we collect, how we use it, and under what circumstances if any, it is disclosed.`,
        short: `The Privacy Policy may change.`,
    },
    {
        title: `CONDITIONS OF USE`,
        long: `If you decide to use Picular, your usage and any possible dispute over privacy is subject to this Privacy Policy and our Terms of Use, including limitations on damages, arbitration of disputes, and application of Swedish law.`,
        short: `Using Picular is subject to Terms and Privacy Policy.`,
    },
]
</script>

<style lang="scss">
@use 'base' as *;

.legal {
    background-color: $black;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 10;
}
.legal .content {
    display: flex;
    justify-content: center;
    > div {
        max-width: 500px;
        margin: 48px 24px;
    }
}
.pair {
    .long {
        flex: 2;
    }
    .short {
        flex: 1;
        color: $green2;
        margin-top: 48px;
    }
}
.close-icon-button {
    background-color: $black;
    @include border-radius;
    cursor: pointer;
    position: fixed;
    top: 0;
    right: 0;
    .close-icon {
        margin: 24px;
    }
}
@include tablet {
    .legal .content {
        > div {
            max-width: 1200px;
            margin: 60px;
        }
    }
    .pair {
        display: flex;
        .short {
            margin-left: 60px;
            margin-top: 0;
        }
    }
}

h1,
.h1 {
    font-size: 3.6rem;
}

h2,
.h2 {
    font-size: 3.6rem;
}

.h2x {
    font-size: 2.6rem;
}

h3,
.h3 {
    font-size: 1.8rem;
}

h4,
.h4 {
    font-size: 1.4rem;
}

h5,
.h5 {
    font-size: 1.2rem;
}

.b1,
.b2x,
.b2,
.b3,
.b4,
.b5 {
    line-height: 1.4;
    font-weight: 300;
}

.b1 {
    font-size: 1.8rem;
}

.b2x {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 1.6;
}

.b2 {
    font-size: 1.4rem;
    font-weight: 500;
}

.b3 {
    font-size: 1.2rem;
    font-weight: 500;
    font-style: italic;
}

.b4 {
    font-weight: 500;
    font-style: italic;
}

.extra {
    color: $grey3;
    font-style: italic;
}

.quote {
    line-height: 1.4;
    font-size: 1.8rem;
    font-style: italic;
}
.w300 {
    font-weight: 300;
}
.w500 {
    font-weight: 500;
}
.w900 {
    font-weight: 900;
}

.preamble {
    font-size: 1.8rem;
}

.white {
    color: $white;
}

.grey1 {
    color: $grey1;
}

.grey2 {
    color: $grey2;
}

.grey3 {
    color: $grey3;
}

.grey4 {
    color: $grey4;
}

.grey5 {
    color: $grey5;
}

.grey6 {
    color: $grey6;
}

.black {
    color: $black;
}

.green1 {
    color: $green1;
}

.green2 {
    color: $green2;
}

.green3 {
    color: $green3;
}

.green4 {
    color: $green4;
}

.yellow1 {
    color: $yellow1;
}

.yellow2 {
    color: $yellow2;
}

.yellow3 {
    color: $yellow3;
}

.yellow4 {
    color: $yellow4;
}

.red1 {
    color: $red1;
}

.red2 {
    color: $red2;
}

.red3 {
    color: $red3;
}

.red4 {
    color: $red4;
}

.blue1 {
    color: $blue1;
}

.blue2 {
    color: $blue2;
}

.blue3 {
    color: $blue3;
}

.blue4 {
    color: $blue4;
}

.mt6 {
    margin-top: 6px;
}

.mt8 {
    margin-top: 8px;
}

.mt12 {
    margin-top: 12px;
}

.mt16 {
    margin-top: 16px;
}

.mt24 {
    margin-top: 24px;
}

.mt36 {
    margin-top: 36px;
}

.mt48 {
    margin-top: 48px;
}

.mt72 {
    margin-top: 72px;
}

.flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
}

.invisible {
    visibility: hidden;
}

.uppercase {
    text-transform: uppercase;
}

.unset-text-transform,
.no-text-transform {
    text-transform: unset;
}

.gap16 > * + * {
    margin-left: 16px;
}
.gap24 > * + * {
    margin-left: 24px;
}
.gap32 > * + * {
    margin-left: 32px;
}

.flex1 {
    flex: 1;
}

// medium width
@include tablet {
    h1,
    .h1 {
        font-size: 4.8rem;
    }
    .preamble {
        font-size: 2rem;
    }
}

// large width
@include desktop {
    h1,
    .h1 {
        font-size: 6.4rem;
    }
    h2,
    .h2 {
        font-size: 3.6rem;
    }
    .b1 {
        font-size: 1.8rem;
    }
    .quote {
        font-size: 2rem;
    }
    .preamble {
        font-size: 2.4rem;
    }
}

.link {
    cursor: pointer;
    @extend .b2;
    text-decoration: underline;
    // text-decoration-skip-ink: none;
    color: $grey3;
    font-style: italic;
    transition-property: color;
    @include transition-duration-leave();
    svg path {
        transition-property: fill;
        @include transition-duration-leave();
        fill: $grey3;
    }
    &:hover {
        @include transition-duration-enter();
        color: $white;
        svg path {
            @include transition-duration-enter();
            fill: $white;
        }
    }
    user-select: none;
}

// global progress indicator on cursor, used to make user understand that stuff is going on and should have wait
.loading,
.loading * {
    cursor: progress !important;
}

// extracted from animate.css (only using shake for now)
.animated {
    animation-duration: 1s;
    animation-fill-mode: both;
}

.animated.infinite {
    animation-iteration-count: infinite;
}

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@keyframes shake {
    from,
    to {
        transform: translate3d(0, 0, 0);
    }
    10%,
    30%,
    50%,
    70%,
    90% {
        transform: translate3d(-10px, 0, 0);
    }
    20%,
    40%,
    60%,
    80% {
        transform: translate3d(10px, 0, 0);
    }
}

.shake {
    animation-name: shake;
}

// general transition effect when using <transition>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.2s;
    opacity: 1;
}

.v-enter,
.v-leave-to {
    opacity: 0;
}

// dropdown meu transition effect when using <transition>
.dropdownmenu-enter-active,
.dropdownmenu-leave-active {
    transition: opacity 150ms linear, transform 100ms linear;
    opacity: 1;
}

.dropdownmenu-enter,
.dropdownmenu-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}
.dropupmenu-enter-active,
.dropupmenu-leave-active {
    transition: opacity 150ms linear, transform 100ms linear;
    opacity: 1;
}

.dropupmenu-enter,
.dropupmenu-leave-to {
    opacity: 0;
    transform: translateY(10px);
}

// fast-fade
.fast-fade-enter,
.fast-fade-leave-to {
    opacity: 0;
}
.fast-fade-enter-active {
    transition: opacity 0.2s ease-out;
}
.fast-fade-leave-active {
    transition: opacity 0.25s ease-in;
}

// medium-fade
.medium-fade-enter,
.medium-fade-leave-to {
    opacity: 0;
}
.medium-fade-enter-active {
    transition: opacity 0.5s ease;
}
.medium-fade-leave-active {
    transition: opacity 0.6s ease;
}

// slow-fade
.slow-fade-enter,
.slow-fade-leave-to {
    opacity: 0;
}
.slow-fade-enter-active {
    transition: opacity 0.7s ease;
}
.slow-fade-leave-active {
    transition: opacity 0.8s ease;
}

// debug-slow-fade
.debug-slow-fade-enter-active {
    transition: opacity 3s ease;
    opacity: 1;
}
.debug-slow-fade-leave-active {
    transition: opacity 3s ease;
    opacity: 1;
}
.debug-slow-fade-enter,
.debug-slow-fade-leave-to {
    transition: opacity 3s ease;
    opacity: 0;
}

// scale-fade
.scale-fade-enter-active,
.scale-fade-leave-active {
    transition: opacity 200ms linear, transform 300ms ease-out;
    opacity: 1;
}

.scale-fade-enter,
.scale-fade-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

.legal {
    li {
        padding-left: 12px;
        margin-left: 12px;
    }
    strong {
        font-weight: 900;
    }
}
</style>
