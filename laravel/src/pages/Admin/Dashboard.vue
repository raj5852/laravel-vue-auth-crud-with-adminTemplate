<template>
    <div>
        <AdminHeader></AdminHeader>
        <aside id="sidebar" class="sidebar">
            <ul class="sidebar-nav" id="sidebar-nav">
                <li class="nav-item"> <a class="nav-link " href="#"> <i class="bi bi-file-earmark"></i>
                        <span>Dashboard</span>
                    </a></li>
            </ul>
        </aside>
        <main id="main" class="main">
            <div class="pagetitle">
                <h1>Dashboard</h1>
                <nav>
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><router-link to="/dashboard">Dashboard</router-link> </li>
                        <li class="breadcrumb-item">Pages</li>
                        <li class="breadcrumb-item active">Blank</li>
                    </ol>
                </nav>
            </div>
            <section class="section">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Example Card</h5>
                                <p>This is an examle page with no contrnt. You can use it as a starter for your custom
                                    pages.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Example Card</h5>
                                <p>This is an examle page with no contrnt. You can use it as a starter for your custom
                                    pages.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>