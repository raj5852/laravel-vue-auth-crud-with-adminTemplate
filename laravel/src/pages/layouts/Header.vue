<template>
    <div>
        <header id="header" class="header fixed-top d-flex align-items-center">
            <div class="d-flex align-items-center justify-content-between"> <a href="index.html"
                    class="logo d-flex align-items-center"> <img src="assets/img/logo.png" alt=""> <span
                        class="d-none d-lg-block">Admin</span> </a> <i @click="toggle"
                    class="bi bi-list toggle-sidebar-btn"></i></div>

            <nav class="header-nav ms-auto">
            </nav>
        </header>
        <aside id="sidebar" class="sidebar">
            <ul class="sidebar-nav" id="sidebar-nav">
                <li class="nav-item"> <a class="nav-link " href="#"> <i class="bi bi-file-earmark"></i>
                        <span>Dashboard</span>
                    </a></li>
            </ul>
        </aside>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const toggleCheck = ref(false)
        const toggle = () => {
            if (!toggleCheck.value) {
                document.body.classList.add('toggle-sidebar')
                toggleCheck.value = true
            }else{
                document.body.classList.remove('toggle-sidebar')
                toggleCheck.value = false

            }
            
        }
        return {
            toggleCheck,
            toggle
        }
    }
}
</script>

<style lang="scss" scoped>

</style>