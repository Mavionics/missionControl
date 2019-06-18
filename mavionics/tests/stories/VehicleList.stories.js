import { storiesOf } from "@storybook/vue";
import VehicleList from "@/components/VehicleList.vue";
import { RouterLinkStub } from "@vue/test-utils";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUser, faPlus)

storiesOf("VehicleList", module).add("Normal not logged in", () => ({
  components: { VehicleList, RouterLinkStub, FontAwesomeIcon },
  template: '<VehicleList :vehicles="vehicles"/>',
  store: {
    getters: {
      currentUser() {
        return "Henry von Humongous";
      }
    }
  },
  data() {
    return {
      vehicles: [
        {
          id: 1,
          name: "Flyer Offline",
          position: { latitude: 58, longitude: 14.2 },
          timestamp: { seconds: Date.now() / 1000 - 30 }
        },
        {
          id: 2,
          name: "Flyer Online",
          position: { latitude: 56.8, longitude: 14.6 },
          timestamp: { seconds: Date.now() / 1000 },
          status: "online"
        }
      ]
    };
  }
}));
