<template>
    <div>
        <NavVue></NavVue>
        <br>
        <div class="container">
            <div v-if="alert" class="alert alert-success alert-dismissible fade show" role="alert">
                Book Created successfully!
                <button type="button" class="btn-close" @click="alert = false"></button>
            </div>
            <div v-if="alertUpdate" class="alert alert-success alert-dismissible fade show" role="alert">
                Book Updated Successfully!
                <button type="button" class="btn-close" @click="alertUpdate = false"></button>
            </div>
            <div v-if="alertDeleted" class="alert alert-success alert-dismissible fade show" role="alert">
                Book Deleted Successfully!
                <button type="button" class="btn-close" @click="alertDeleted = false"></button>
            </div>
            <div style="display: flex;justify-content: space-between;">
                <div class="d-flex">
                    <input type="text" class="form-control col-md-4" placeholder="Search..." v-model="searchVal">
                    <button class="btn btn-secondary" @click="fetchFunc">
                        <span v-if="searchSpeen" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>
                        Search
                    </button>
                </div>


                <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                    @click="modalPopup">Create</button>
            </div>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
                aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Create New Book</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div v-if="errors.length">
                                <ul v-for="(error,i) in errors" :key="i">
                                    <li style="color: red;">{{error}} </li>
                                </ul>

                            </div>
                            <input type="hidden" v-model="updateId">
                            <label for="name">Book Name</label>
                            <input type="text" id="name" class="form-control" placeholder="" v-model="name">
                            <label for="description">Book Description</label><br>
                            <textarea v-model="description" class="form-control" name="" id="description" cols="30"
                                rows="5" placeholder=""></textarea><br>
                            <button v-if="createButton" class="btn btn-primary" @click="createBook"
                                :disabled="modalSubmitbtn">

                                <span v-if="spinner" class="spinner-border spinner-border-sm" role="status"
                                    aria-hidden="true"></span>


                                {{modalSubmitvalue}}
                            </button>
                            <button v-if="updateButton" @click="updateNow" class="btn btn-success">Update</button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                </div>
            </div>

            <table class="table table-bordered border-primary table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Book Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(post,i) in laravelData.data" :key="post.id">
                        <td> {{ (tableId-1)*10 + i+1 }} </td>
                        <td>{{post.title}} </td>
                        <td>{{post.description}} </td>
                        <td>
                            <button style="margin-right: 2px;" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                @click="UpdateBook(post)" class="btn btn-success btn-sm">Edit</button>
                            <button @click="Delete(post.id)" class="btn btn-danger btn-sm">Delete</button>
                        </td>

                    </tr>
                    <h1 v-if="loding">Loding....</h1>
                </tbody>
            </table>
            <Pagination :data="laravelData" @pagination-change-page="fetchFunc" />
        </div>
        
    </div>
</template>

<script>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import NavVue from './Nav.vue'
import Pagination from 'laravel-vue-pagination';
export default {
    components: {
        NavVue,
        Pagination
    },
    setup() {
        const name = ref('')
        const description = ref('')
        const errors = ref([])
        const alert = ref(false)
        const spinner = ref(false)
        const modalSubmitvalue = ref('Create');
        const modalSubmitbtn = ref(false);
        const laravelData = ref([])
        const tableId = ref(1)
        const updateId = ref('')
        const updateButton = ref(false)
        const createButton = ref(true)
        const alertUpdate = ref(false)
        const alertDeleted = ref(false)
        const searchVal = ref('')
        const searchSpeen = ref(false)
        const loding = ref(false)

        const createBook = () => {
            updateButton.value = false
            alert.value = false
            errors.value = []
            if (name.value.length < 1) {
                errors.value.push('Name is Required!')
            }

            if (description.value.length < 5) {
                errors.value.push('Description will more than 5 characters')
            }

            if (!errors.value.length) {
                spinner.value = true,
                    modalSubmitbtn.value = true
                modalSubmitvalue.value = "Creating..."

                axios.post('http://127.0.0.1:8000/api/book', {
                    title: name.value,
                    description: description.value
                }).then(response => {
                    errors.value = []
                    name.value = ''
                    description.value = ''
                    alert.value = true
                    spinner.value = false
                    modalSubmitvalue.value = "Create"
                    modalSubmitbtn.value = false

                    // console.log(response.data)
                    const truck_modal = document.querySelector('#staticBackdrop');
                    const modal = bootstrap.Modal.getInstance(truck_modal);
                    modal.hide();
                    fetchFunc()

                })
            }

        }

        const modalPopup = () => {
            name.value = ''
            description.value = ''
            createButton.value = true
            updateButton.value = false
        }
        const UpdateBook = (post) => {
            updateButton.value = true
            createButton.value = false
            console.log(post.id)
            updateId.value = post.id
            name.value = post.title
            description.value = post.description


        }
        const updateNow = () => {
            errors.value = []
            if (name.value.length < 1) {
                errors.value.push('Name is Required!')
            }

            if (description.value.length < 5) {
                errors.value.push('Description will more than 5 characters')
            }
            axios.put(`http://127.0.0.1:8000/api/book/${updateId.value}`, {
                title: name.value,
                description: description.value
            }).then(response => {
                const truck_modal = document.querySelector('#staticBackdrop');
                const modal = bootstrap.Modal.getInstance(truck_modal);
                modal.hide();
                alertUpdate.value = true
                fetchFunc()
            })


        }

        const Delete = (id) => {
            const text = "Are you deleted it?"
            if (confirm(text) === true) {
                axios.delete(`http://127.0.0.1:8000/api/book/${id}`)
                    .then(response => {
                        console.log("Deleted")
                        alertDeleted.value = true
                        fetchFunc(tableId.value)
                    })
            }

        }
        const SearchNow = async () => {

        }

        const fetchFunc = async (page = 1, search = searchVal.value) => {
            loding.value = true
            if (search) {
                searchSpeen.value = true

            }
            axios.get(`http://127.0.0.1:8000/api/book?page=${page}&search=${search}`)
                .then(response => {
                    laravelData.value = response.data;
                    tableId.value = response.data.current_page
                    searchSpeen.value = false
                    loding.value = false


                });
        }
        onMounted(fetchFunc)

        return {
            searchSpeen,
            SearchNow,
            name,
            description,
            createBook,
            errors,
            alert,
            spinner,
            modalSubmitvalue,
            modalSubmitbtn,
            laravelData,
            fetchFunc,
            tableId,
            updateId,
            UpdateBook,
            modalPopup,
            updateButton,
            createButton,
            updateNow,
            alertUpdate,
            Delete,
            alertDeleted,
            searchVal,
            loding
        }
    }
}
</script>

<style>
.sr-only {
    display: none;
}
</style>