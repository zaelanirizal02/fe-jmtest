import { RouteRecordRaw } from "vue-router";
import { requireAuth } from "../../utils/requireAuth";
import defaultLayout from "../../layout/default.vue";
import masterPendidikan from "./master-pendidikan.vue";
import masterObat from "../../components/master/master-obat.vue";
import masterPasien from "../../components/master/master-pasien.vue";
import detailPasien from "../../components/master/detail-pasien.vue";

const masterPath: Array<RouteRecordRaw> = [
  {
    path: "/master",
    component: defaultLayout,
    children: [
      {
        path: "pendidikan",
        name: "Master Pendidikan",
        component: masterPendidikan,
      },
      {
        path: "obat",
        name: "Master Obat",
        component: masterObat,
      },
      {
        path: "pasien",
        name: "master-pasien",
        component: masterPasien,
      },
      {
        path: "pasien/:id",
        name: "detail-pasien",
        component: detailPasien,
      },
    ],
    beforeEnter: requireAuth,
  },
];

export default masterPath;
