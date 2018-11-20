import { storiesOf } from '@storybook/vue';
import VehicleList from '@/components/VehicleList.vue';
import { RouterLinkStub } from '@vue/test-utils'

storiesOf('VehicleList', module)
  .add('Normal not logged in', () => ({
    components: { VehicleList, RouterLinkStub },
    template: '<VehicleList :vehicles="vehicles"/>',
    data(){
      return {
        vehicles:[
          {id:1, name:'Flyer Offline', position:{latitude:58, longitude:14.2}, timestamp: {seconds: Date.now()+3000}},
          {id:2, name:'Flyer Online', position:{latitude:56.8, longitude:14.6}, timestamp: {seconds: Date.now()}},
        ]}
    }
    
  }))