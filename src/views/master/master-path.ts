import { RouteRecordRaw } from "vue-router";
import { requireAuth } from "../../utils/requireAuth";
import defaultLayout from "../../layout/default.vue"
import masterPendidikan from "./master-pendidikan.vue";



const masterPath: Array<RouteRecordRaw> = [

    {
        path: "",
        name: "master-pendidikan",
        component: defaultLayout,
        children: [
            {
                path: '/master-pendidikan',
                name: 'Master Pendidikan',
                component: masterPendidikan,
            },

        ],
        beforeEnter: requireAuth,
    }
];

export default masterPath;