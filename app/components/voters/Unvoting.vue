<template>
    <div>
        <div class="container">
            <div
                v-if="!voted"
                class="row">
                <div
                    class="XDC-empty col-12">
                    <i class="tm-notice XDC-empty__icon"/>
                    <p class="XDC-empty__description">You have not voted for this candidate, so you can't unvote.</p>
                    <b-button
                        :to="`/voting/${candidate}`"
                        variant="primary">Vote</b-button>
                </div>
            </div>
            <div
                v-if="voted">
                <div
                    v-if="step === 1">
                    <b-row
                        v-if="voted"
                        align-v="center"
                        align-h="center"
                        class="m-0">
                        <b-card
                            :class="'col-12 col-md-8 col-lg-6 XDC-card XDC-card--lighter p-0'
                            + (loading ? ' XDC-loading' : '')">
                            <h4 class=" color-white XDC-card__title XDC-card__title--big">Unvote
                                <span
                                    class="XDC-card__subtitle">
                                    Your XDC will be locked in a duration after unvoting</span>
                            </h4>
                            <ul class="XDC-list list-unstyled">
                                <li class="XDC-list__item">
                                    <i class="tm-wallet XDC-list__icon" />
                                    <p class="XDC-list__text">
                                        <span><router-link :to="`/voter/${voter}`">{{ voter }}</router-link></span>
                                        <span>Voter</span>
                                    </p>
                                </li>
                                <li class="XDC-list__item">
                                    <i class="tm-profile XDC-list__icon" />
                                    <p class="XDC-list__text">
                                        <span>
                                            <router-link :to="`/candidate/${candidate}`">
                                                {{ candidate }}
                                            </router-link>
                                        </span>
                                        <span>Candidate</span>
                                    </p>
                                </li>
                                <li class="XDC-list__item">
                                    <i class="tm-XDC XDC-list__icon" />
                                    <p class="XDC-list__text">
                                        <span> {{ formatCurrencySymbol(formatNumber(voted)) }}</span>
                                        <span>You voted</span>
                                    </p>
                                </li>
                            </ul>

                            <b-form
                                class="XDC-form XDC-form--unvote"
                                novalidate
                                @submit.prevent="validate()">
                                <b-form-group
                                    label="Amount"
                                    label-for="unvote-value"
                                    description="The amount of XDC to unvote. TX fee: 0.0000000000525 XDC">
                                    <b-input-group>
                                        <number-input
                                            :class="getValidationClass('unvoteValue')"
                                            :min="0.1"
                                            :step="0.1"
                                            v-model="unvoteValue"
                                            name="vote-value"/>
                                        <b-input-group-append>
                                            <i class="tm-XDC" />
                                        </b-input-group-append>
                                        <span
                                            v-if="$v.unvoteValue.$dirty && !$v.unvoteValue.required"
                                            class="text-danger">Required field</span>
                                        <span
                                            v-else-if="$v.unvoteValue.$dirty && !$v.unvoteValue.minValue"
                                            class="text-danger">Must be greater than 10<sup>-18 XDC</sup></span>
                                        <span
                                            v-else-if="$v.unvoteValue.$dirty && !$v.unvoteValue.maxValue"
                                            class="text-danger">Must be less than {{ voted }} XDC</span>
                                    </b-input-group>
                                </b-form-group>
                                <div class="buttons text-right">
                                    <b-button
                                        type="button"
                                        variant="secondary"
                                        @click="$router.go(-1)">Cancel</b-button>
                                    <!-- <b-button
                                        type="submit"
                                        variant="primary">Submit</b-button> -->
                                    <b-button
                                        type="submit"
                                        variant="primary">Next</b-button>
                                </div>
                            </b-form>
                        </b-card>
                    </b-row>
                </div>
                <div
                    v-if="step === 2">
                    <b-row
                        align-v="center"
                        align-h="center">
                        <b-card
                            :class="'col-12 col-md-8 col-lg-6 XDC-card XDC-card--lighter p-0'
                            + (loading ? ' XDC-loading' : '')">
                            <h4 class=" color-white XDC-card__title XDC-card__title--big">Confirmation</h4>
                            <!-- <div>
                                <strong>Using XDC wallet to execute the action
                                </strong>
                            </div> -->
                            <div
                                style="margin-top: 20px">
                                <div
                                    class="wrapper">
                                    <div
                                        id="one">
                                        <label>
                                            <b>Unvoting information</b>
                                        </label>
                                        <label style="margin-top: 5px">
                                            <textarea
                                                :value="message"
                                                class="sign-message"
                                                type="text"
                                                disabled
                                                cols="100"
                                                rows="4"
                                                style="width: 100%"/>
                                        </label>
                                    </div>
                                    <div>
                                        <div
                                            class="pull-right"
                                            style="margin-right: -7px; float: right">
                                            <!-- <button
                                                class="btn btn-primary"
                                                variant="primary"
                                                @click="vote">Submit</button> -->
                                        </div>
                                    </div>
                                    <div>
                                        <div
                                            v-if="provider === 'XDCwallet'"
                                            style="text-align: center; margin-top: 10px">
                                            <vue-qrcode
                                                :value="qrCode"
                                                :options="{size: 250 }"
                                                class="img-fluid text-center text-lg-right"/>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style="margin-top: 5px"
                                    class="buttons text-right">
                                    <b-button
                                        type="button"
                                        variant="secondary"
                                        @click="backStep">Back</b-button>
                                    <button
                                        v-if="provider !== 'XDCwallet'"
                                        class="btn btn-primary"
                                        variant="primary"
                                        @click="unvote">Submit</button>
                                </div>
                            </div>
                        </b-card>
                    </b-row>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import { validationMixin } from 'vuelidate'
import {
    required,
    minValue,
    maxValue
} from 'vuelidate/lib/validators'
import NumberInput from '../NumberInput.vue'
import VueQrcode from '@chenfengyuan/vue-qrcode'
import store from 'store'
export default {
    name: 'App',
    components: {
        NumberInput,
        VueQrcode
    },
    mixins: [validationMixin],
    data () {
        return {
            isReady: !!this.web3,
            voter: '',
            candidate: this.$route.params.candidate,
            voted: 0,
            unvoteValue: 1,
            loading: false,
            step: 1,
            interval: null,
            processing: true,
            provider: this.NeworkProvider || store.get('network') || null
        }
    },
    validations () {
        return {
            unvoteValue: {
                required,
                minValue: minValue(10 ** -18),
                maxValue: maxValue(this.voted)
            }
        }
    },
    watch: {},
    updated () {},
    destroyed () {
        if (this.interval) {
            clearInterval(this.interval)
        }
    },
    created: async function () {
        let self = this
        let candidate = self.candidate
        let account

        try {
            if (store.get('network')) {
                await self.detectNetwork(store.get('network'))
                self.isReady = !!self.web3
            }
            if (store.get('address')) {
                account = store.get('address').toLowerCase()
            } else {
                account = this.$store.state.walletLoggedIn
                    ? this.$store.state.walletLoggedIn : await self.getAccount()
            }
            self.voter = account

            let contract = await self.XDCValidator.deployed()
            let votedCap = await contract.getVoterCap(candidate, account)
            self.voted = votedCap.div(10 ** 18).toNumber()
        } catch (e) {
            console.log(e)
        }
    },
    mounted () {},
    methods: {
        getValidationClass: function (fieldName) {
            const field = this.$v[fieldName]

            if (field) {
                return {
                    'is-invalid': field.$error
                }
            }
        },
        validate: function () {
            this.$v.$touch()

            if (!this.$v.$invalid) {
                this.nextStep()
            }
        },
        unvote: async function () {
            let self = this
            let candidate = this.candidate
            let value = this.unvoteValue

            try {
                if (!self.isReady) {
                    self.$router.push({ path: '/setting' })
                }

                self.loading = true

                let account = await self.getAccount()
                let contract = await self.XDCValidator.deployed()
                let rs = await contract.unvote(candidate, (parseFloat(value) * 10 ** 18), {
                    from: account,
                    gasPrice: 2500,
                    gas: 1000000
                })
                self.vote -= value

                let toastMessage = rs.tx ? 'You have successfully unvoted!'
                    : 'An error occurred while unvoting, please try again'
                self.$toasted.show(toastMessage)

                setTimeout(() => {
                    self.loading = false
                    if (rs.tx) {
                        self.$router.push({ path: `/confirm/${rs.tx}` })
                    }
                }, 2000)
            } catch (e) {
                self.loading = false
                self.$toasted.show('An error occurred while unvoting, please try again', {
                    type: 'error'
                })
                console.log(e)
            }
        },
        async nextStep () {
            const self = this
            const data = {
                action: 'unvote',
                voter: self.voter,
                candidate: self.candidate,
                amount: self.unvoteValue
            }
            // call api to generate qr code
            const generatedMess = await axios.post(`/api/voters/generateQR`, data)

            self.message = generatedMess.data.message
            self.id = generatedMess.data.id

            self.qrCode = encodeURI(
                'XinFin:unvote?amount=' + self.unvoteValue + '&' + 'candidate=' + self.candidate +
                '&name=' + generatedMess.data.candidateName +
                '&submitURL=' + generatedMess.data.url + generatedMess.data.id
            )
            this.step++
            if (self.step === 2 && self.processing) {
                self.interval = setInterval(async () => {
                    await this.verifyScannedQR()
                }, 3000)
            }
        },
        backStep () {
            if (this.interval) {
                clearInterval(this.interval)
            }
            this.step--
        },
        onChangeUnvoting (event) {
            const checking = event.target.checked
            if (checking) {
                this.interval = setInterval(async () => {
                    await this.verifyScannedQR()
                }, 3000)
            } else {
                if (this.interval) {
                    clearInterval(this.interval)
                }
            }
        },
        async verifyScannedQR () {
            let self = this
            let body = {}
            if (self.id) {
                body.id = self.id
            }
            body.voter = self.voter
            let { data } = await axios.post('/api/voters/getScanningResult', body)

            if (!data.error) {
                self.loading = true
                if (self.interval) {
                    clearInterval(self.interval)
                }

                let toastMessage = data.tx ? 'You have successfully voted!'
                    : 'An error occurred while voting, please try again'
                self.$toasted.show(toastMessage)

                setTimeout(() => {
                    if (data.tx) {
                        self.loading = false
                        self.processing = false
                        self.step = 0
                        self.$router.push({ path: `/confirm/${data.tx}` })
                    }
                }, 2000)
            }
        }
    }
}
</script>
