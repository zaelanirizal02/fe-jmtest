<script>
import apiClient from "../../../services/apiService";
// import "../../../assets/form.css";
import "../login/login.scss";

export default {
    data() {
        return {
            email: "",
            password: "",
        };
    },
    methods: {
        async login() {

            try {
                const response = await apiClient.post('api/login', {
                    email: this.email,
                    password: this.password,
                },);
                // console.log(response.data.data.accessToken);

                if (response.status === 200) {
                    // Login berhasil
                    const token = response.data.accessToken;
                    // Simpan token akses di localStorage
                    localStorage.setItem('accessToken', token);
                    this.$router.push({ path: '/home' });
                    // Redirect ke halaman yang sesuai
                } else {
                    // Tangani situasi lain jika diperlukan
                    console.log("Gagal login");
                }

            } catch (error) {
                // Tangani kesalahan jika terjadi
                console.error("Terjadi kesalahan saat login:", error);
            }
        },
    },


};
</script>

<template>
    <div class="container">
        <div class="login-wrapper">
            <div class="container-login">
                <div class="card">
                    <div class="flex flex-column md:flex-row">
                        <div class="w-full md:w-5 flex flex-column ">

                            <div class="gambar-side" />

                        </div>
                        <div class="w-full md:w-2">
                            <Divider layout="vertical" class="hidden md:flex"></Divider>
                        </div>

                        <div class="login-side">
                            <h2 style="text-align: center;">Login</h2>
                            <div class="flex flex-column align-items-center justify-content-center gap-5 py-2" style="">
                                <div
                                    class="p-float-label p-input-icon-left flex flex-wrap justify-content-center align-items-center gap-2">
                                    <label class="w-5rem">Email</label>
                                    <InputText v-model="email" id="username" type="text" class="w-12rem" />
                                </div>

                                <div
                                    class="p-float-label p-input-icon-left flex flex-wrap justify-content-center align-items-center gap-2">
                                    <label class="w-5rem">Password</label>
                                    <InputText v-model="password" id="password" type="password" class="w-12rem"
                                        @keyup.enter="login" />
                                </div>
                                <div>
                                    <Button label="Login" @click="login()" icon="pi pi-user" class="w-10rem"></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<style></style>
