<script setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import Sidebar from './composables/Sidebar.vue';
import Navbar from './composables/Navbar.vue';

const isSidebarOpen = ref(false);
const route = useRoute(); // Ambil data route

// Gunakan computed untuk reaktif data meta
const hideNavbar = computed(() => route.meta.hideNavbar);
const hideSidebar = computed(() => route.meta.hideSidebar);

function handleSidebarToggle(status) {
    isSidebarOpen.value = status;
}
</script>

<template>
    <div id="app">
        <Navbar v-if="!hideNavbar" />
        <Sidebar v-if="!hideSidebar" :isSidebarOpen="isSidebarOpen" @update:isSidebarOpen="handleSidebarToggle" />
        <!-- Konten utama -->
        <!-- <router-view /> -->
    </div>
</template>

<style scoped>
.content-full {
    margin-left: 0;
    transition: margin-left 0.3s ease;
}

.content-with-sidebar {
    margin-left: 15%;
    transition: margin-left 0.3s ease;
}

.content {
    max-width: 1910px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
}
</style>
