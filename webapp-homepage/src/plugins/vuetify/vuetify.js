// src/plugins/vuetify/vuetify.js
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// ✅ ใช้ MDI เป็น default
export default createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',  // ใช้ Material Design Icons เป็นชุดหลัก
    aliases,
    sets: {
      mdi,
    },
  },
})
