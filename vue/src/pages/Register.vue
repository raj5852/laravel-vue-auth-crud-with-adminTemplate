<template>
    <div>
        <main>
            <div class="container">
                <section
                    class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div class="d-flex justify-content-center py-4"> <a href="#"
                                        class="logo d-flex align-items-center w-auto"> <img src="assets/img/logo.png"
                                            alt=""> <span class="d-none d-lg-block">Admin</span> </a></div>
                                <div class="card mb-3">
                                    <div class="card-body">
                                        <div class="pt-4 pb-2">
                                            <h5 class="card-title text-center pb-0 fs-4">Create an Account</h5>
                                            <p class="text-center small">Enter your personal details to create account
                                            </p>
                                        </div>
                                        <form class="row g-3 needs-validation" novalidate>
                                            <div v-if="errors.length">
                                                <ul v-for="(error,i) in errors" :key="i">
                                                    <li style="color: red;">{{error}} </li>
                                                </ul>
                                            </div>


                                            <div class="col-12">
                                                <label for="yourName" class="form-label">Your Name</label> <input
                                                    type="text" name="name" class="form-control" id="yourName" required
                                                    v-model="name">
                                                <div class="invalid-feedback">Please, enter your name!</div>
                                            </div>
                                            <div class="col-12">
                                                <label for="yourEmail" class="form-label">Your Email</label> <input
                                                    type="email" name="email" class="form-control" id="yourEmail"
                                                    required v-model="email">
                                                <div class="invalid-feedback">Please enter a valid Email adddress!</div>
                                            </div>

                                            <div class="col-12">
                                                <label for="yourPassword" class="form-label">Password</label> <input
                                                    type="password" name="password" class="form-control"
                                                    id="yourPassword" required v-model="password">
                                                <div class="invalid-feedback">Please enter your password!</div>
                                            </div>
                                            <div class="col-12">
                                                <div class="form-check">
                                                    <input class="form-check-input" name="terms" type="checkbox"
                                                        value="" id="acceptTerms" required> <label
                                                        class="form-check-label" for="acceptTerms">I agree and accept
                                                        the <a href="#">terms and conditions</a></label>
                                                    <div class="invalid-feedback">You must agree before submitting.
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="col-12"> <button class="btn btn-primary w-100" type="button"
                                                    @click="CreateAccount" :disabled="buttonDisabled">
                                                    <span :class="[isSpeen?'spinner-border spinner-border-sm':'']"
                                                        role="status" aria-hidden="true"></span>
                                                    {{registerValue}} </button></div>
                                            <div class="col-12">
                                                <p class="small mb-0">Already have an account?
                                                    <router-link to="/login">Log in </router-link>
                                                </p>
                                            </div>
                                        </form>
                                        <p>
                                            <router-link to="/admin">Go to Admin Dashboard</router-link>
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    </div>
</template>

<script>
import { ref } from 'vue';
import axios from 'axios'
import { useRouter } from 'vue-router';

export default {
    setup() {
        const name = ref('')
        const email = ref('')
        const password = ref('')
        const buttonDisabled = ref(false)
        const registerValue = ref('Create Account')
        const errors = ref([])
        const router = useRouter()
        const isSpeen = ref(false)

        const CreateAccount = () => {
            errors.value = []

            if (name.value.length < 1) {
                errors.value.push("Name is required!")
            }
            if (!email.value.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
                errors.value.push("Email is not  Valid!")
            }
            if (!password.value) {
                errors.value.push("password is required!")
            } else if (password.value.length < 6) {
                errors.value.push("Password More then 5 characters")
            }

            if (!errors.value.length) {
                isSpeen.value = true
                buttonDisabled.value = true
                registerValue.value = "Create Account....."
                axios.post('http://127.0.0.1:8000/api/auth/register', {
                    name: name.value,
                    email: email.value,
                    password: password.value,
                }).then(response => {

                    localStorage.setItem('token', response.data.token)
                    buttonDisabled.value = false
                    registerValue.value = "Create Account"
                    isSpeen.value = false

                    router.push('/home')


                }).catch(error => {
                    buttonDisabled.value = false
                    registerValue.value = "Create Account"
                    isSpeen.value = false

                    errors.value.push(error.response.data.errors.email[0])
                })
            }
        }
        const AuthCheck = () => {
            if (localStorage.getItem('token')) {
                router.push('/home')
            }
        }
        AuthCheck()
        return {
            CreateAccount,
            name,
            email,
            password,
            buttonDisabled,
            registerValue,
            errors,
            router,
            isSpeen
        }
    }

}
</script>

<style lang="scss" scoped>

</style>