<template>
    <div class="card container">
        <Menubar :model="items" class="custom-menubar">

            <template #start>
                <div class="flex align-items-center justify-content-between pt-3 flex-shrink-0">
                    <span class="inline-flex align-items-center gap-2" style="margin-bottom: 10px;">
                        <img src="../../assets/jmt.png" width="50" height="40" alt="Logo" />
                    </span>
                </div>
            </template>
            <template #end>
                <div class="flex align-items-center gap-2">
                    <div class="toggle-container" @click="toggleDarkMode">
                      <label>Tema | </label>
                        <Button class="toggle-button">
                            <i :class="checked ? 'pi pi-moon' : 'pi pi-sun'"
                                :style="{ color: checked ? 'yellow' : 'blue' }"></i>
                        </Button>
                    </div>
                      <label class="blinking">| Mode {{ userRole }}</label>

<!--                    <InputText placeholder="Search" type="text" class="w-8rem sm:w-auto" />-->
                    <div style="display: flex; align-items: center">

                        <!-- <Button icon="pi pi-file-pdf" severity="success" class="mr-2 bs" /> -->

                        <SplitButton class="bs" label="" icon="pi pi-cog" :model="menuSetting" severity="">
                        </SplitButton>
                    </div>
                </div>
            </template>
        </Menubar>

    </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import spongebobImg from "../../assets/sepongebob.png";
import apiClient from "../../services/apiService";

const router = useRouter();
const userRole = ref('');

const role = "director";
const isDropdownVisible = ref(false);
const checked = ref(localStorage.getItem('dark-mode') === 'true' || localStorage.getItem('dark-mode') === null);

const fetchUserRole = async () => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    const response = await apiClient.get("/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    userRole.value = response.data.user.role || '';
  } catch (error) {
    console.error("Gagal mengambil role:", error.response?.data);
  }
};

fetchUserRole();


function toggleDropdown() {
    isDropdownVisible.value = !isDropdownVisible.value;
}

function handleAction(action) {
    if (action === "auth" || action === "profile" || action === "settings") {
        router.push({ name: action });
    } else {
        console.error(`Route "${action}" tidak ditemukan!`);
    }
    isDropdownVisible.value = false;
}


// Terapkan tema awal
function switchTheme(theme) {
    const existingLink = document.getElementById('theme-link');
    if (existingLink) {
        existingLink.remove();
    }
    const themeLink = document.createElement('link');
    themeLink.id = 'theme-link';
    themeLink.rel = 'stylesheet';
    themeLink.href = `/node_modules/primevue/resources/themes/${theme}/theme.css`; // Sesuaikan dengan path tema yang benar
    document.head.appendChild(themeLink);
}

function toggleDarkMode() {
    checked.value = !checked.value;
    if (checked.value) {
        switchTheme('aura-dark-lime');
        localStorage.setItem('dark-mode', 'true');
    } else {
        switchTheme('aura-light-noir');
        localStorage.setItem('dark-mode', 'false');
    }
}

function applyInitialTheme() {
    if (checked.value) {
        switchTheme('aura-dark-lime');
    } else {
        switchTheme('aura-light-noir');
    }
}
applyInitialTheme();
watch(checked, (newValue) => {
    const htmlElement = document.documentElement;
    if (newValue) {
        htmlElement.classList.add("dark");
        htmlElement.classList.remove("light");
    } else {
        htmlElement.classList.add("light");
        htmlElement.classList.remove("dark");
    }
});



function getImage() {
    if (role === "director") {
        return spongebobImg;
    }
}

const items = ref([
    {
        label: "Home",
        icon: "pi pi-home",
    },
    {
        label: "About Us",
        icon: "pi pi-flag",
    },
    // {
    //     label: "Organization Structure",
    //     icon: "pi pi-users",
    //     items: [
    //         {
    //             label: "Core",
    //             icon: "pi pi-bolt",
    //             shortcut: "⌘+S",
    //         },
    //         {
    //             label: "Blocks",
    //             icon: "pi pi-server",
    //             shortcut: "⌘+B",
    //         },
    //         {
    //             label: "UI Kit",
    //             icon: "pi pi-pencil",
    //             shortcut: "⌘+U",
    //         },
    //         {
    //             separator: true,
    //         },
    //         {
    //             label: "Templates",
    //             icon: "pi pi-palette",
    //             items: [
    //                 {
    //                     label: "Apollo",
    //                     icon: "pi pi-palette",
    //                     badge: 2,
    //                 },
    //                 {
    //                     label: "Ultima",
    //                     icon: "pi pi-palette",
    //                     badge: 3,
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     label: "Contact Us",
    //     icon: "pi pi-envelope",
    //     badge: 3,
    // },

]);

const logout = async () => {
    try {
        const accessToken = localStorage.getItem("accessToken");

        if (!accessToken) {
            console.error("AccessToken tidak tersedia");
            return;
        }

        const response = await apiClient.post("/logout", {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        localStorage.removeItem("accessToken");
        router.push({ name: "login" });
    } catch (error) {
      console.error("Error during logout:", error.response?.status);
      console.error("Error detail:", error.response?.data);
    }

};

const menuSetting = [
    {
        label: "Aplication Setting",
        icon: "pi pi-cog",
        command: () => {
            window.location.href = "/setting";
        },
    },
    {
        separator: true,
    },
    {
        label: "Home",
        icon: "pi pi-home",
    },
    {
        label: "Logout",
        icon: "pi pi-sign-out",
        command: logout,
    },
];


</script>

<style scoped>
/* Geser keseluruhan Menubar ke kanan */
.custom-menubar {
    padding-left: 4rem;
    height: 60px;
    justify-content: center;
    /* Geser seluruh menu ke kanan */
}

/* Atur padding untuk item spesifik (Home, Features, Projects) */
.p-menubar .p-menuitem:first-child .p-menuitem-text {
    padding-left: 1rem;
    /* Home */
}

.p-menubar .p-menuitem:nth-child(2) .p-menuitem-text {
    padding-left: 1.5rem;
    /* Features */
}

.p-menubar .p-menuitem:nth-child(3) .p-menuitem-text {
    padding-left: 1.5rem;
    /* Projects */
}

/* Pastikan dropdown tetap terposisi dengan baik */
.dropdown-container {
    position: relative;
}

.custom-split-button {
    padding: 0px;
    border-radius: 50%;
    margin: 10px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.button-image {
    width: 30px;
    height: auto;
    border-radius: 50%;
}

.dropdown-container {
    position: relative;
    display: inline-block;
}

.dropdown-menu {
    position: absolute;
    top: 100%;
    width: 150px;
    left: -80px;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
}

.dropdown-menu ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

.dropdown-menu li {
    padding: 8px 16px;
    cursor: pointer;
    color: black;
    font-weight: bold;
}

.dropdown-menu li:hover {
    background-color: #f0f0f0;
}

.toggle-container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.toggle-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
}
</style>

<style>
html.light {
    --bg-color: rgb(221, 229, 230);
    --text-color: black;
}

html.dark {
    --bg-color: #1a1a1a;
    --text-color: white;
}

body {
    background-color: var(--bg-color);
    color: var(--text-color);
    transition: background-color 0.3s ease, color 0.3s ease;
}
.blinking {
  animation: blink-animation 1.5s linear infinite;
  color: rgb(197, 230, 50); /* Bisa disesuaikan */
  font-weight: bold;
}

@keyframes blink-animation {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

</style>
