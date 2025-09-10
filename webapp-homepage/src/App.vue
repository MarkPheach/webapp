  <script setup>
import { RouterView, RouterLink } from 'vue-router';
  </script>
  <template>
    <div class="bg-blue-500">
      <RouterView />
      <RouterLink to="/login"></RouterLink>
    </div>
  </template>