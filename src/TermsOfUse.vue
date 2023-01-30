<template>
    <div class="legal">
        <div class="content">
            <div>
                <h1 class="mt72">TERMS OF USE</h1>
                <p class="b3 extra">Date of Last Revision: July 28, 2017</p>
                <p class="main-descri b1 mt24" style="max-width: 600px">
                    The following document outlines the terms of use of the Picular app. Before using the Picular services, you are required
                    to read, understand, and agree to these terms. The column on the right provides a short explanation of the terms of use
                    and is not legally binding.
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
        title: 'DESCRIPTION OF SERVICE',
        long: 'Picular is the copyrighted work of IMGNRY International AB (“Picular” or “We”), a corporation organized under the laws of Sweden. Picular provides a platform via its app (the “App”) to registered users (“Users” or “you”) to upload, organize and display photographs (“Photos”). These terms of use (“Terms”) apply to your access to and use of the App, the Subscription Services (as defined below) and any other online services provided by Picular (the "Services"). Additional Services may be offered by us from time to time. The following are the terms of use (“Terms”) for using the App and the Services.',
        short: 'We’re from Sweden. We develop and provide a photo service were you upload, organize and enjoy your photos. We will develop more features in the future.',
    },
    {
        title: 'ACCEPTANCE OF TERMS',
        long: 'BY USING THE SERVICES, YOU ARE AGREEING, ON BEHALF OF YOURSELF AND THOSE YOU REPRESENT, TO COMPLY WITH AND BE LEGALLY BOUND BY THESE TERMS AS WELL AS OUR PRIVACY POLICY AND ALL APPLICABLE LAWS. IF YOU, FOR YOURSELF OR ON BEHALF OF THOSE YOU REPRESENT, DO NOT AGREE TO ANY PROVISION OF THESE TERMS, YOU MUST, FOR YOURSELF AND ON BEHALF ANY SUCH PERSON(S), DISCONTINUE THE REGISTRATION PROCESS, DISCONTINUE YOUR USE OF THE SERVICES, AND, IF YOU ARE ALREADY REGISTERED, CANCEL YOUR ACCOUNT.',
        short: 'By using Picular, you agree to all the terms below.',
    },
    {
        title: 'MODIFICATION OF TERMS',
        long: `Picular reserves the right, at its sole discretion, to modify or replace the terms at any time. If the alterations constitute a material change to the terms, Picular will notify you by posting an announcement in the App. What constitutes a material change will be determined at Picular’s sole discretion. You shall be responsible for reviewing and becoming familiar with any such modifications. Using any Service or viewing any Photos shall constitute your acceptance of the Terms as modified.

In addition, when using particular features of the Services, you shall be subject to any posted guidelines or rules applicable to such Services.

Your access to and use of the App and our Services may be interrupted from time to time as a result of equipment malfunction, updating, maintenance or repair of the App or any other reason within or outside the control of Picular. Picular reserves the right to suspend or discontinue the availability of the App and/or any Service and/or remove any Photos at any time at its sole discretion and without prior notice. Picular may also impose limits on certain features and Services or restrict your access to parts of or all of the App and the Services without notice or liability. The App should not be used or relied upon for storage of your Photos and you are directed to retain your own copies of all Photos posted on the App.`,
        short: 'If these terms change, we will notify you. As well, at times things can go wrong and the service may be interrupted. It’s unlikely, but sometimes things can go really wrong.',
    },
    {
        title: 'Your Account',
        long: `As a condition to using Services, you are required to open an account with Picular, and to provide registration information. The registration information you provide must be accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your access to the Services, by either terminating your email access or your account.

Services are available authorized representatives of legal entities and to individuals who are either (i) at least 18 years old, or (ii) are authorized to access the App by a parent or legal guardian. If you have authorized a minor to use the App, you are responsible for the online conduct of such minor, and the consequences of any misuse of the App by the minor.

The Services are for use by a) individuals who own Photos; b) entities that represent owners of Photos including but not limited to galleries, agents, representatives, distributors other market intermediaries. We are currently not accepting illustration and graphic design content to upload on the App. If you are the owner of the Photos, but not the creator, you are not allowed to upload content for the purposes of self advertising.

Picular may send important notices about your account from time to time. By registering for an account, you consent to receive communications from Picular about the Services by email and/or system messages consistent with the terms of our Privacy Policy.
`,
        short: 'To fully use the services, you need to create your own account and consent to receive communication from Picular from time to time.',
    },
    {
        title: `Account Security`,
        long: `You are solely responsible for maintaining the confidentiality of the passwords associated with your account and for restricting access to your passwords and physical access to your computer while logged into the Services. You accept responsibility for all activities that occur under your user account.

User Content that you post, upload or otherwise make available via public areas (e.g. forums) may be accessed, used and downloaded by other Picular users. You understand and acknowledge that any User Content contained in public areas of the Services, is accessible to the public and could be accessed, downloaded, indexed, archived, linked to and republished by others including, without limitation, appearing on other websites and in search engine results.

We use commercially reasonable security measures to protect your account and User Content consistent with your Account Settings. We cannot, however, guarantee absolute security of your account, your User Content or the Registration Data we collect, and we cannot promise that our security measures will prevent third party "hackers" from illegally accessing the Services or their contents. Picular is not responsible or liable for any third party access to or use of the User Content you post or your Registration Data. You agree to immediately notify Picular of any unauthorized use of your account or passwords or any other breach of security, and you accept all risks of unauthorized access to the Registration Data, User Content and any other information you provide to Picular.`,
        short: `It's your responsibility to keep your passwords secure and for restricting access to your computer while logged into the Services.
Photos you post in forums can end up anywhere.`,
    },
    {
        title: `Subscription`,
        long: `The Subscription Services are available to users (i) who register for a free trial (when available) or for a subscription to the Subscription Services ("Subscription") and (ii) who pay in full the Subscription fees applicable.

If you wish to purchase a Subscription, we will ask you to provide certain information in order to facilitate such purchase, including your credit card number, billing address and any related payment information as required by Picular (collectively, "Payment Information"). Picular may use a third party payment processor (e.g. Stripe) to facilitate your payment of any Subscription fees. Any Payment Information that you provide will be governed by the terms of our Privacy Policy. By submitting Payment Information via the Services, you warrant that you have the legal right to use any such credit card or other payment mechanism that you provide to facilitate the transaction.

Your Subscription is valid commencing on the date in which Picular provides you with access to the Services pursuant to its receipt of your valid Payment Information (the "Commencement Date") and will last for the duration of the Subscription term that you select at the time of your registration for the Subscription Services (the "Subscription Term").

YOUR SUBSCRIPTION WILL AUTOMATICALLY RENEW AT THE END OF EACH SUBSCRIPTION TERM FOR SUCCESSIVE SUBSCRIPTION TERMS OF THE SAME DURATION AS THE SUBSCRIPTION TERM ORIGINALLY SELECTED UNLESS THE SUBSCRIPTION IS TERMINATED AND/OR CANCELED BY YOU OR PICULAR PRIOR TO THE END OF SUCH SUBSCRIPTION TERM. SUCH RENEWAL WILL OCCUR AUTOMATICALLY ON THE APPLICABLE ANNIVERSARY OF THE COMMENCEMENT DATE. YOU MAY CANCEL YOUR SUBSCRIPTION AT ANY TIME PRIOR TO THE END OF THE SUBSCRIPTION TERM THROUGH YOUR ACCOUNT SETTINGS IN THE SUBSCRIPTION SECTION. You agree that upon such renewal, the credit card or other designated payment method in your Account Settings will be billed the applicable Subscription fee for your Subscription Plan then in effect at the time of renewal. If you disagree with these automatic renewal provisions, your sole remedy is to cancel or terminate your Subscription.

You acknowledge that the amount of the recurring charge at the time of Subscription renewal may differ from the Subscription fees you originally paid for the Subscription Services if: (i) the Subscription fee for your Subscription plan changes during your applicable Subscription Term, or (ii) if you change your Subscription plan or Subscription Term during the previous Subscription Term. Picular will notify you of any changes to the Subscription fee prior to the date on which your Subscription Term will renew. You hereby agree to any such revised Subscription fees and your sole remedy if you disagree with such changes is to terminate your account and stop using the Subscription Services.

Picular reserves the right at any time, at its sole discretion and without notice, to suspend, modify, discontinue or permanently cancel the Subscription Services or any portions thereof, including the Subscription Plans and any policies, features and terms applicable thereof. If the Subscription Services, or any part thereof, to which you subscribe are permanently discontinued or canceled by Picular, your Subscription will terminate, and we will have no further liability to you. You acknowledge that the Subscription Services may be interrupted from time to time, with or without notice, for maintenance, upgrades, system updates or in the event of equipment failure or for any other foreseeable or non-foreseeable cause.

PICULAR WILL HAVE NO LIABILITY TO YOU FOR ANY INTERRUPTION, SUSPENSION, DISCONTINUANCE OR UNAVAILABILITY OF THE SUBSCRIPTION SERVICES FOR ANY REASON, OR FOR ANY LOSS OR INABILITY TO ACCESS ANY MEDIA OR MATERIALS ON THE SERVICES.`,
        short: `Your subscription to Picular automatically renews unless you choose to cancel your subscription.

If you purchase a subscription to Picular, you are responsible for all subscription fees associated with the subscription.`,
    },
    {
        title: `Free Trial`,
        long: `When you first register for the Subscription Services, Picular may offer you the ability to use the Subscription Services without charge for a limited trial period (a "Free Trial"). The limitation of a Free Trial will be the number of photos specified by Picular at the time of your registration for such Free Trial. You do not need to provide Picular with a credit card or other Payment Information in order to register for a Free Trial. At the conclusion of your Free Trial, your user account will automatically terminate unless you elect to continue to use the Subscription Services by selecting a Subscription Plan and providing Picular (or our applicable third party payment processor) with valid Payment Information. Upon Picular's receipt of your Payment Information, you will be charged for the Subscription Fee applicable to your selected Subscription Plan. Picular may offer you the ability to register for a Subscription directly without the need to participate in a Free Trial.`,
        short: `We offer a free trial with no strings attached before you subscribe.`,
    },
    {
        title: `User Content`,
        long: `The Services may enable you to upload, post and transmit Photos to the App or other portions of the Services (including to your user photo galleries) and also provide you with access to discussion forums, blogs and other interactive areas in which you or other users may post or transmit Photos, Videos, text, music, messages, information or other content or materials (collectively, including Media, the "User Content").

You retain all intellectual property rights in and to any User Content you post, upload or otherwise make available through the Services, including the copyright in and to your Media. Picular does not claim any ownership, right, title or interest in and to your User Content.

Notwithstanding the foregoing, by uploading and/or posting any User Content to the App or otherwise by using the Services, you grant Picular a perpetual, nonexclusive and royalty-free right to use the User Content (and the user name that is submitted in connection with such User Content) as is reasonably necessary in order to enable Picular to provide the Services, including to display the User Content on the Services, to facilitate (at the Content Owner's direction) the license of Photos.

You represent and warrant that (i) you own or otherwise control all of the rights to the User Content that you post or transmit, or you otherwise have the right to post, use, display, distribute and reproduce such User Content and to grant the rights granted herein; (ii) the User Content you supply is accurate and not misleading; and (iii) the use and posting of the User Content you supply does not violate these Terms of Use and will not violate any rights of or cause injury to any person or entity.`,
        short: `Your photos will preserve whatever copyright they had before uploading to this App.
When you upload your photos to our service, you allow us to display your content for you at your direction.`,
    },
    {
        title: `USER CONDUCT`,
        long: `You are solely responsible for the User Content that you post or transmit using the Services and you agree not to post, transmit or otherwise publish through the Services any of the following:
                    
                    User Content that is unlawful, defamatory, obscene, indecent, hateful, harassing, threatening, invasive of privacy or publicity rights, abusive, inflammatory, fraudulent or otherwise objectionable or harmful.

User Content that would constitute, encourage or provide instructions for a criminal offense, violate the rights of any party, endanger national security, or that would otherwise create liability or violate any local, state, national or international law;

User Content that may infringe or violate any patent, trademark, trade secret, copyright or other intellectual or other proprietary right of any party;

User Content that impersonates any person or entity or otherwise misrepresents your affiliation with a person or entity;

Unsolicited promotions, political campaigning, advertising or solicitations;

Private information of any third party, including, without limitation: addresses, phone numbers, email addresses, social security numbers and credit card numbers;

Viruses, corrupted data or other harmful, disruptive or destructive files;

User Content that, in the sole judgment of Picular, is objectionable, harmful or which restricts or inhibits any other person from using or enjoying the Services, or which may expose Picular or its users to any harm or liability of any nature.

Although we prohibit certain activities in these Terms of Use, Picular does not make any representation or warranty that the User Content you may encounter through your use of the Services complies with these acceptable use provisions or the Terms of Use. 

YOUR USE OF THE SERVICES IS SOLELY AT YOUR OWN RISK.

These Terms of Use do not create any private right of action on the part of any third party or any reasonable expectation that the Services will not contain any content that is prohibited by these acceptable use provisions.

Picular reserves the right (but is not obligated) to (i) review, edit and/or remove User Content submitted to public areas (e.g. forums) for any reason, at any time, without prior notice, at our sole discretion. Picular will have no liability or responsibility to users of the Picular Services or any other person or entity for performance or nonperformance of such activities. Picular’s enforcement of the acceptable use provisions set forth in these Terms of Use with respect to User Content in some instances does not constitute a waiver of our right to enforce such provisions in other instances involving similar User Content.`,
        short: `You're responsible for the content of all photos that you upload or share using our services. Picular may remove public content (e.g. photos posted in forums) for any reason.`,
    },
    {
        title: `COPYRIGHT COMPLAINTS`,
        long: `Picular respects the intellectual property rights of others. It is our policy to respond promptly any claim that Content posted on the Site infringes the copyright or other intellectual property infringement (“Infringement”) of any person. Picular will use reasonable efforts to investigate notices of alleged Infringement and will take appropriate action under applicable intellectual property law and these Terms where it believes an Infringement has taken place, including removing or disabling access to the Content claimed to be infringing and/or terminating accounts and access to the Site.

To notify Picular of a possible Infringement you must submit your notice in writing to the attention of “Copyright Infringement” care of support@picular.com and include in your notice a detailed description of the alleged Infringement sufficient to enable Picular to make a reasonable determination. Please note that you may be held accountable for damages (including costs and attorneys’ fees) for misrepresenting that any Content is infringing your copyright.

If we remove or disable access to Content in response to a notice of Infringement, we will make reasonable attempts to contact the user who posted the affected Content. If you feel that your Content is not infringing, you may provide Picular with a counter notice in writing to the attention of “Copyright Infringement Counter Notification” at support@picular.com. You must include in your counter notice sufficient information to enable Picular to make a reasonable determination. Please note that you may be held accountable for damages (including costs and attorneys' fees) if you materially misrepresent that your Content is not infringing the copyrights of others.

If you are uncertain whether an activity constitutes Infringement, we recommended seeking advice of an attorney.`,
        short: `We respect copyright. If anything is wrong, please send an email with all the details to <a class="green2" href="mailto:support@picular.com">support@picular.com</a>.`,
    },
    {
        title: `LINKS`,
        long: `The Services may provide, or third parties may provide, links to other World Wide Web sites or resources. Because Picular has no control over such sites and resources, you acknowledge and agree that Picular is not responsible for the availability of such external sites or resources, and does not endorse and is not responsible or liable for any content, advertising, products or other materials on or available from such sites or resources. You further acknowledge and agree that Picular shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with use of or reliance on any such content, goods or services available on or through any such site or resource.`,
        short: `Some people may post links; we are not responsible for those links.`,
    },
    {
        title: `RELEASE AND INDEMNITY`,
        long: `You hereby expressly and irrevocably release and forever discharge Picular, its affiliated and associated companies, and their respective directors, officers, employees, agents, representatives, independent and dependent contractors, licensees, successors and assigns of and from any and all actions, causes of action, suits, proceedings, liability, debts, judgments, claims and demands whatsoever in law or equity which you ever had, now have, or hereafter can, shall or may have, for or by reason of, or arising directly or indirectly out of your use of the Site and the Services.

You hereby agree to indemnify and hold harmless Picular, its affiliated and associated companies, and their respective directors, officers, employees, agents, representatives, independent and dependent contractors, licensees, successors and assigns from and against all claims, losses, expenses, damages and costs (including, but not limited to, direct, incidental, consequential, exemplary and indirect damages), and reasonable attorneys' fees, resulting from or arising out of (i) a breach of these Terms, (ii) Content posted on the Site, (iii) the use of the Services, by you or any person using your account, or (iv) any violation of any rights of a third party.`,
        short: `We are not liable if something goes really wrong. Always have a backup of your photos.`,
    },
    {
        title: `TRADEMARKS`,
        long: `Picular, picular.com and other Picular graphics, logos, designs, icons, scripts, and service names are registered trademarks, trademarks or trade dress of Picular. Picular’s trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Picular.`,
        short: `Please respect our trademarks and brands.`,
    },
    {
        title: `TERMINATION`,
        long: `Picular may terminate or suspend any and all Services and/or your Picular account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination of your account, your right to use the Services will immediately cease. If you wish to terminate your Picular account, you may simply discontinue using the Services. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.

It is your responsibility to remove all User Content from your account prior to termination. Upon termination of your account Picular will automatically remove all Photos posted to your account.`,
        short: `We may stop providing services at any time. You can also stop using your account or close your account at any time.`,
    },
    {
        title: `WARRANTY DISCLAIMER`,
        long: `YOU USE THE SITE AND THE SERVICES AT YOUR OWN RISK. THE SITE AND THE SERVICES ARE PROVIDED ON AN “AS IS, AS AVAILABLE” BASIS. PICULAR EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING THE WARRANTIES OF MERCHANTABILITY, TITLE, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. PICULAR DISCLAIMS ALL RESPONSIBILITY FOR ANY LOSS, INJURY, CLAIM, LIABILITY, OR DAMAGE OF ANY KIND RESULTING FROM, ARISING OUT OF OR IN ANY WAY RELATED TO (A) ANY ERRORS IN OR OMISSIONS FROM THIS SITE AND THE SERVICES, INCLUDING, BUT NOT LIMITED TO, TECHNICAL INACCURACIES AND TYPOGRAPHICAL ERRORS, (B) THIRD PARTY COMMUNICATIONS, (C) ANY THIRD PARTY WEBSITES OR CONTENT DIRECTLY OR INDIRECTLY ACCESSED THROUGH LINKS IN THE SITE, INCLUDING BUT NOT LIMITED TO ANY ERRORS OR OMISSIONS, (D) THE UNAVAILABILITY OF ALL OR ANY PART OF THE SITE OR THE SERVICES, (E) YOUR USE OF THE SITE OR THE SERVICES, OR (F) YOUR USE OF ANY EQUIPMENT OR SOFTWARE IN CONNECTION WITH THE SITE OR THE SERVICES.`,
    },
    {
        title: `LIMITATION OF LIABILITY`,
        long: `EXCEPT AS OTHERWISE PROVIDED BY LAW, NEITHER PICULAR NOR ANY OF ITS AFFILIATES, PARENTS, SUBSIDIARIES, DIRECTORS, SHAREHOLDERS, EMPLOYEES OR AGENTS SHALL BE LIABLE FOR ANY LOSS, INJURY, CLAIM, LIABILITY, OR DAMAGE OF ANY KIND RESULTING FROM YOUR USE OF THE SITE, ANY FACTS OR OPINIONS APPEARING THEREON, OR THE SERVICES. PICULAR SHALL NOT BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, INCIDENTAL, PUNITIVE OR CONSEQUENTIAL DAMAGES OF ANY KIND WHATSOEVER (INCLUDING, WITHOUT LIMITATION, ATTORNEYS’ FEES) IN ANY WAY DUE TO, RESULTING FROM, OR ARISING IN CONNECTION WITH THE USE OF OR INABILITY TO USE THE SITE OR SERVICES. TO THE EXTENT THE FOREGOING LIMITATION OF LIABILITY IS PROHIBITED OR FAILS OF ITS ESSENTIAL PURPOSE, PICULAR’ SOLE OBLIGATION TO YOU FOR DAMAGES SHALL BE LIMITED TO $100.00.

YOU AND PICULAR AGREE THAT ANY PROCEEDINGS TO RESOLVE OR LITIGATE ANY DISPUTE ARISING HEREUNDER WILL BE CONDUCTED SOLELY ON AN INDIVIDUAL BASIS, AND THAT YOU WILL NOT SEEK TO HAVE ANY DISPUTE HEARD AS A CLASS ACTION, A REPRESENTATIVE ACTION, A COLLECTIVE ACTION, A PRIVATE ATTORNEY-GENERAL ACTION, OR IN ANY PROCEEDING IN WHICH YOU ACT OR PROPOSE TO ACT IN A REPRESENTATIVE CAPACITY. YOU FURTHER AGREE THAT NO PROCEEDING WILL BE JOINED, CONSOLIDATED, OR COMBINED WITH ANOTHER PROCEEDING WITHOUT THE PRIOR WRITTEN CONSENT OF PICULAR AND ALL PARTIES TO ANY SUCH PROCEEDING.`,
    },
    {
        title: `MISCELLANEOUS`,
        long: `The Terms shall be governed by and construed in accordance with the laws of Sweden, as if made within Sweden between two residents thereof.

In the unlikely event that we cannot solve your concern and you wish to bring legal action against us these terms shall be governed by and construed in accordance with the laws of Sweden.

<strong>Indemnification of Picular</strong>

You, agree to defend, indemnify and hold Picular, its affiliates and its sponsors, partners, other co-branders and the respective directors, officers and employees of each harmless from and against any and all claims, losses, damages, liabilities and costs (including, without limitation, reasonable attorneys' fees and court costs) arising out of or relating to your breach of any of these Terms or use by you or any third party of the Services. Picular reserves the right, at its own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you.

<strong>General</strong>

These Terms constitute the entire understanding of the parties and supersede all prior and contemporaneous written and oral agreements with respect to the subject matter hereof. Any rule of construction stating that ambiguities are to be resolved against the drafting party will not be applied in the construction or interpretation of these Terms. If one or more of the provisions herein shall be held invalid, illegal or unenforceable in any respect, the validity, legality and enforcement of the remaining provisions shall not be affected or impaired. Any inconsistency between these Terms in English and these Terms in any other language shall, to the fullest extent permitted by applicable law, be resolved by reference to the English version. The failure to enforce or the waiver by either party of a default or breach of the other party shall not be considered to be a waiver of any prior, subsequent or other default or breach.`,
        short: `We are not liable if things go really wrong. Things can happen — we are not responsible.`,
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
