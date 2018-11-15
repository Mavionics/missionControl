import { storiesOf } from '@storybook/vue';
import VehicleList from '@/components/VehicleList.vue';

storiesOf('VehicleList', module)
  .add('Normal not logged in', () => ({
    components: { VehicleList },
    template: '<VehicleList :vehicles="vehicles"/>',
    data(){
      return {
        vehicles:[
          {id:1, name:'Flyer', position:{latitude:58, longitude:14.2}, timestamp: {seconds: Date.now()+30}},
          {id:2, name:'Flyer 2', position:{latitude:56.8, longitude:14.6}, timestamp: {seconds: Date.now()}},
        ]}
    }
    
  }))