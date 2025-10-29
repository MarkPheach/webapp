<template>
  <div class="min-h-screen p-6 bg-sky-200">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex items-center gap-4 mb-6">
        <h1 class="text-3xl font-extrabold px-6 py-2 bg-sky-100 text-sky-800 rounded-full shadow">ร้านค้า</h1>

        <!-- Tabs / categories -->
        <div class="flex gap-3 flex-wrap">
          <button class="flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-800 rounded-lg shadow">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14" /></svg>
            กรอบโปรไฟล์
          </button>
          <button class="flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-800 rounded-lg shadow">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16"/></svg>
            ธีมเว็บไซต์
          </button>
          <button class="flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-800 rounded-lg shadow">
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="3" stroke-width="2"/></svg>
            อื่น ๆ
          </button>
        </div>
      </div>

      <!-- Card container -->
      <div class="bg-sky-100 p-6 rounded-2xl shadow-inner border-4 border-sky-200">
        <!-- Products grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div
            v-for="product in products"
            :key="product.id"
            class="bg-white rounded-xl p-4 shadow hover:shadow-lg transition flex flex-col items-start"
          >
            <div class="w-full flex justify-center mb-3">
              <img :src="product.image" :alt="product.name" class="w-28 h-28 object-cover rounded-lg bg-gray-50"/>
            </div>

            <h3 class="text-sm font-semibold text-sky-900 mb-2">{{ product.name }}</h3>
            <p class="text-xs text-gray-500 mb-4">{{ product.description }}</p>

            <div class="mt-auto w-full flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="inline-flex items-center justify-center w-8 h-8 bg-yellow-200 text-yellow-700 rounded-full shadow-sm">
                  <!-- เหรียญ icon -->
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="9" stroke-width="1.5"/><path d="M12 8v4l2 2" stroke-width="1.5"/></svg>
                </span>
                <span class="text-lg font-bold text-sky-900">{{ product.price }}</span>
                <span class="text-sm text-gray-500">บาท</span>
              </div>

              <button
                @click="addToCart(product)"
                class="px-3 py-1 bg-sky-500 text-white rounded-md text-sm hover:bg-sky-600"
              >
                เพิ่มลงตะกร้า
              </button>
            </div>
          </div>
        </div>

        <!-- Pagination dots (visual) -->
        <div class="flex justify-center mt-6 gap-3">
          <span class="w-3 h-3 bg-white opacity-50 rounded-full"></span>
          <span class="w-3 h-3 bg-white opacity-50 rounded-full"></span>
          <span class="w-3 h-3 bg-white opacity-50 rounded-full"></span>
        </div>
      </div>

      <!-- (Optional) cart summary -->
      <div class="mt-6 bg-white p-4 rounded-lg shadow">
        <h2 class="font-semibold mb-2">ตะกร้าสินค้า</h2>
        <ul class="text-sm text-gray-700">
          <li v-for="item in cart" :key="item.id" class="flex justify-between py-1">
            <span>{{ item.name }} x {{ item.quantity }}</span>
            <span class="font-medium">{{ item.quantity * item.price }} ฿</span>
          </li>
          <li v-if="cart.length===0" class="text-gray-400">ยังไม่มีสินค้า</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Shop",
  data() {
    return {
      products: [
        { id: 1, name: "กรอบโปรไฟล์ : Stacked Black", description: "กรอบเรียบเท่ สีดำ", price: 30, image: "https://picsum.photos/seed/p1/200" },
        { id: 2, name: "กรอบโปรไฟล์ : Golden Week", description: "วงแหวนทองหรู", price: 125, image: "https://picsum.photos/seed/p2/200" },
        { id: 3, name: "กรอบโปรไฟล์ : Cyber Tech", description: "ดีไซน์ไซเบอร์", price: 120, image: "https://picsum.photos/seed/p3/200" },
        { id: 4, name: "กรอบโปรไฟล์ : Rainbow splash", description: "สีสันสดใส", price: 80, image: "https://picsum.photos/seed/p4/200" },
        { id: 5, name: "กรอบโปรไฟล์ : Sun bubles", description: "โทนส้มสดใส", price: 40, image: "https://picsum.photos/seed/p5/200" },
        { id: 6, name: "กรอบโปรไฟล์ : Calm Wind", description: "โทนเย็นสบาย", price: 70, image: "https://picsum.photos/seed/p6/200" },
        { id: 7, name: "กรอบโปรไฟล์ : Goal of all life", description: "คลาสสิคลายพิเศษ", price: 300, image: "https://picsum.photos/seed/p7/200" },
        { id: 8, name: "กรอบโปรไฟล์ : Link Start", description: "ลายดิจิทัล", price: 350, image: "https://picsum.photos/seed/p8/200" }
      ],
      cart: []
    };
  },
  methods: {
    addToCart(product) {
      const found = this.cart.find(i => i.id === product.id);
      if (found) found.quantity++;
      else this.cart.push({ ...product, quantity: 1 });
    }
  }
};
</script>

<style scoped>
/* เพิ่มจูนเล็กน้อยให้มุมและเงาใกล้เคียงภาพตัวอย่าง */
</style>