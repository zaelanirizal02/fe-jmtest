<template>
    <div :class="{ 'sidebar-open': isSidebarOpen, 'sidebar-close': !isSidebarOpen }">
        <div class="card flex justify-content-center">
            <Sidebar :dismissable="false" :modal="false" v-model:visible="isSidebarOpen" class="custom-sidebar">
                <template #container="{ closeCallback }">
                    <div class="flex flex-column h-full">
                        <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
                            <span class="inline-flex align-items-center gap-2">
                                <img src="../../assets/jmt.png" width="60" height="60" alt="Logo" />
                                <span class="font-semibold text-2xl text-primary">KLINIKU</span>
                            </span>
                            <span>
                                <Button type="button" @click="closeCallback" icon="pi pi-times" rounded outlined
                                    class="h-2rem w-2rem"></Button>
                            </span>
                        </div>
                        <div class="overflow-y-auto">
                            <ul class="list-none p-3 m-0">
                                <li>
                                    <div v-ripple v-styleclass="{
                                        selector: '@next',
                                        enterClass: 'hidden',
                                        enterActiveClass: 'slidedown',
                                        leaveToClass: 'hidden',
                                        leaveActiveClass: 'slideup'
                                    }"
                                        class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple">
                                        <span class="font-medium">FAVORITES</span>
                                        <i class="pi pi-chevron-down"></i>
                                    </div>
                                    <ul class="list-none p-0 m-0 overflow-hidden">
                                        <li>
                                            <a v-ripple href="/home"
                                            
                                                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                                <i class="pi pi-home mr-2"></i>
                                                <span class="font-medium">Dashboard</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a v-ripple
                                               href="/master/pasien"
                                                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                                <i class="pi pi-users mr-2"></i>
                                                <span class="font-medium">Dokter Menu</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a v-ripple
                                            href="/master/pasien"
                                                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                                <i class="pi pi-users mr-2"></i>
                                                <span class="font-medium">Pasien</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a v-ripple
                                               href="/master/pasien"
                                                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                                <i class="pi pi-users mr-2"></i>
                                                <span class="font-medium">Perawat Menu</span>
                                            </a>
                                        </li>
                                        

                                        <li>
                                            <a v-ripple v-styleclass="{
                                                selector: '@next',
                                                enterClass: 'hidden',
                                                enterActiveClass: 'slidedown',
                                                leaveToClass: 'hidden',
                                                leaveActiveClass: 'slideup'
                                            }"
                                                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                                <i class="pi pi-database mr-2"></i>
                                                <span class="font-medium">Master Data</span>
                                                <i class="pi pi-chevron-down ml-auto"></i>
                                            </a>
                                            <ul
                                                class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out">

                                              
                                                <li>
                                                    <a v-ripple href="/master/obat"
                                                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                                                        <i class="pi pi-shield mr-2"></i>
                                                        <span class="font-medium">Obat</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </template>
            </Sidebar>
            <Button 
                v-if="!$route.meta.hideSidebar" 
                class="hamburger-button" 
                icon="pi pi-bars" 
                @click="toggleSidebar"
                rounded
                text
                severity="primary"
                aria-label="Toggle Sidebar"
            />
            <!-- Konten Utama -->
            <div :class="{
                'content-with-sidebar': isSidebarOpen,
                'content-full': !$route.meta.hideSidebar,
            }">
                <div class="main-content">

                    <div>
                        <router-view :isSidebarOpen="isSidebarOpen" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, defineEmits } from "vue";
import { useRouter } from 'vue-router';
const route = useRouter();
const isAuthPage = ref(route.path === '/auth');



const isSidebarOpen = ref(true); // State lokal sidebar
const emit = defineEmits(["update:isSidebarOpen"]); // Untuk mengirimkan event ke parent

function toggleSidebar() {
    isSidebarOpen.value = !isSidebarOpen.value; // Toggle status sidebar
    emit("update:isSidebarOpen", isSidebarOpen.value); // Emit status ke parent
}
</script>

<style>
/* Styling tambahan untuk menu sidebar */
/* Sidebar Styling */
/* Sidebar */
.custom-sidebar {
    position: fixed;
    top: 90px;
    left: 10px;
    border-radius: 2%;
    height: 100%;
    width: 15%;
    background-color: rgba(255, 255, 255, 0);
    z-index: 999;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
}

.content-with-sidebar {
    margin-left: 15%;
    /* Sama dengan lebar sidebar */
    width: 85%;
    transition: margin-left 0.9s ease;
}

.custom-sidebar.sidebar-open {
    left: 0;
    /* Posisi terbuka */
}

.main-content {
    padding: 2px;
}

/* Animasi slide Konten utama */
.content-full {
    width: 100%;
    transition: margin-left 0.9s ease;
}

.custom-sidebar .content {
    padding: 10px;
    flex: 1;
    overflow-y: auto;
}

/* Styling Hamburger Button */
.hamburger-button {
    position: fixed;
    top: 18px;
    left: 18px;
    z-index: 1001;
    padding: 0.5rem !important;
    width: 2.5rem;
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    background-color: var(--surface-card);
    border: 1px solid var(--surface-border);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.2s ease;
}

.hamburger-button:hover {
    background-color: var(--primary-50);
    color: var(--primary-color);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.hamburger-button i {
    font-size: 1.25rem;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    margin: 10px 0;
}

a {
    text-decoration: none;
    color: inherit;
}
</style>