<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <router-link class="navbar-brand" to="/home">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBqY1MgvIWF9G07WCDxefb1KH3l-Hx-MyZDA&usqp=CAU" style="width: 50px; border-radius: 50%;" alt="">
                </router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link active" aria-current="page" href="#">Home</a>
                        </li>
                        

                    </ul>
                    <button class="btn btn-danger btn-sm" @click="logout">Logout</button>

                </div>
            </div>
        </nav>
        <hr>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    setup(){
         const router = useRouter() 
        const logout=()=>{
            localStorage.removeItem('token')
            router.push('/')
        }
        return{
            logout
        }
    }
}
</script>

<style lang="scss" scoped>

</style>