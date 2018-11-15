import { storiesOf } from '@storybook/vue';
import Layout from '../../src/components/Layout.vue';

storiesOf('Layout', module)
  .add('Normal not logged in', () => ({
    components: { Layout },
    template: '<Layout><div class="container"><h1>This is a page</h1></div></Layout>',
    store: {
      getters: {
      }
    }
  }))

  .add('Normal logged in', () => ({
    components: { Layout },
    template: '<Layout><div class="container"><h1>This is a page</h1></div></Layout>',
    store: {
      getters: {
        currentUser(state) {
          return 'me';
        }
      }
    }
  }))

  .add('Large logo logged in', () => ({
    components: { Layout },
    template: '<Layout :large-logo=true><div class="container"><h1>This is a page</h1></div></Layout>',
    store: {
      getters: {
        currentUser(state) {
          return 'me';
        }
      }
    }
  }))

;