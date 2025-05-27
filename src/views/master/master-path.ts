import { RouteRecordRaw } from "vue-router";
import { requireAuth } from "../../utils/requireAuth";
import defaultLayout from "../../layout/default.vue";
import masterPendidikan from "./master-pendidikan.vue";
import masterObat from "../../components/master/master-obat.vue";
import masterPasien from "../../components/master/master-pasien.vue";

const masterPath: Array<RouteRecordRaw> = [
  {
    path: "",
    name: "master-pendidikan",
    component: defaultLayout,
    children: [
      {
        path: "/master-pendidikan",
        name: "Master Pendidikan",
        component: masterPendidikan,
      },
      {
        path: "/master-obat",
        name: "Master Obat",
        component: masterObat,
      },
      {
        path: "/pendaftaran",
        name: "Master Pasien",
        component: masterPasien,
      },
    ],
    beforeEnter: requireAuth,
  },
];

export default masterPath;
