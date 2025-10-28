<template>
    <div class="shop max-w-4xl mx-auto p-6">
        <h1 class="text-3xl font-bold mb-8 text-center">ร้านค้าออนไลน์</h1>
        <div class="products flex gap-6 mb-10 flex-wrap justify-center">
            <div
                class="product border border-gray-200 p-6 w-56 text-center rounded-lg shadow hover:shadow-lg transition"
                v-for="product in products"
                :key="product.id"
            >
                <img
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-32 object-cover mb-4 rounded"
                />
                <h2 class="text-xl font-semibold mb-2">{{ product.name }}</h2>
                <p class="text-gray-600 mb-2">{{ product.description }}</p>
                <p class="price text-green-600 font-bold mb-4">{{ product.price }} บาท</p>
                <button
                    @click="addToCart(product)"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                >
                    เพิ่มลงตะกร้า
                </button>
            </div>
        </div>
        <div class="cart border-t border-gray-300 pt-8 mt-8">
            <h2 class="text-2xl font-bold mb-4">ตะกร้าสินค้า</h2>
            <ul>
                <li
                    v-for="item in cart"
                    :key="item.id"
                    class="mb-2 text-gray-800"
                >
                    {{ item.name }} <span class="text-gray-500">x {{ item.quantity }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "Shop",
    data() {
        return {
            products: [
                {
                    id: 1,
                    name: "เสื้อยืด",
                    description: "เสื้อยืดผ้าฝ้าย 100%",
                    price: 250,
                    image: "https://via.placeholder.com/150"
                },
                {
                    id: 2,
                    name: "กางเกงยีนส์",
                    description: "กางเกงยีนส์แฟชั่น",
                    price: 500,
                    image: "https://via.placeholder.com/150"
                },
                {
                    id: 3,
                    name: "รองเท้าผ้าใบ",
                    description: "รองเท้าผ้าใบสไตล์สปอร์ต",
                    price: 800,
                    image: "https://via.placeholder.com/150"
                }
            ],
            cart: []
        };
    },
    methods: {
        addToCart(product) {
            const found = this.cart.find(item => item.id === product.id);
            if (found) {
                found.quantity++;
            } else {
                this.cart.push({ ...product, quantity: 1 });
            }
        }
    }
};
</script>
