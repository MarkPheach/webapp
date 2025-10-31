<template>
    <div class="basket-container">
        <h2>Your Shopping Basket</h2>
        <div v-if="selectedItems.length > 0" class="basket-items">
            <div v-for="item in selectedItems" :key="item.id" class="basket-item">
                <img :src="item.image" :alt="item.name" class="item-image">
                <div class="item-details">
                    <h3>{{ item.name }}</h3>
                    <p>Price: {{ item.price }} THB</p>
                    <p>Quantity: {{ item.quantity }}</p>
                </div>
                <button @click="removeItem(item.id)" class="remove-btn">Remove</button>
            </div>
            <div class="total">
                <h3>Total: {{ calculateTotal }} THB</h3>
            </div>
        </div>
        <div v-else class="empty-basket">
            <p>Your basket is empty</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Basket',
    data() {
        return {
            selectedItems: []
        }
    },
    computed: {
        calculateTotal() {
            return this.selectedItems.reduce((total, item) => {
                return total + (item.price * item.quantity)
            }, 0)
        }
    },
    methods: {
        removeItem(id) {
            this.selectedItems = this.selectedItems.filter(item => item.id !== id)
        }
    }
}
</script>

<style scoped>
.basket-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.basket-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
}

.item-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 20px;
}

.item-details {
    flex: 1;
}

.remove-btn {
    padding: 5px 10px;
    background-color: #ff4444;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.empty-basket {
    text-align: center;
    padding: 20px;
}

.total {
    margin-top: 20px;
    text-align: right;
    padding: 10px;
    background-color: #f5f5f5;
}
</style>