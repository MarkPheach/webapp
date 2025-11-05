<script setup>
import { ref, nextTick } from "vue";
import { storeToRefs } from "pinia";
import { useCart } from "../../stores/cart";
import { useChibi } from "../../stores/chibi";
import { useThemeStore } from "../../stores/theme";
import { useProfileFrameStore } from "../../stores/profileframe";
import { useUserDummy } from "../../stores/userDummy";
import { useInventoryStore } from "../../stores/inventory";

const { carts } = storeToRefs(useCart());

const { typeOfPurchase, itemPrice, state, image, type } = defineProps({
  typeOfPurchase: { type: String, default: "NULLA" },
  itemPrice: { type: Number, default: 0 },
  state: { type: String, default: "EROR" },
  image: { type: String, default: "" },
  type: { type: String, default: "EROR" },
});

const defaultImage = new URL("../../assets/Eror.jpg", import.meta.url).href;

// ✅ state
const isAccept = ref(false);
const messagePopup = ref(null);
const emit = defineEmits(["close"]);

const userDummyStore = useUserDummy();
const user = userDummyStore.userDummys[0];

const inventoryStore = useInventoryStore(); // ✅ แก้ชื่อ import ให้ถูกต้อง

// ✅ ปิด popup หลัก
function closePopup() {
  emit("close");
}

// ✅ ปิด popup แจ้งเตือน
function closeMessagePopup() {
  messagePopup.value = null;
}

// ✅ ตรวจสอบก่อนเปิด popup ยืนยัน
function acceptShow() {
  let store = null;
  let found = null;

  if (type === "chibi") {
    store = useChibi();
    found = store.chibis.find((item) => item.name === typeOfPurchase);
  } else if (type === "theme") {
    store = useThemeStore();
    found = store.themes.find((item) => item.name === typeOfPurchase);
  } else if (type === "Profileframe") {
    store = useProfileFrameStore();
    found = store.ProfileFrame.find((item) => item.name === typeOfPurchase);
  }

  // ❗ ถ้ามีสินค้าแล้ว
  if (found && found.state === "เป็นเจ้าของ") {
    messagePopup.value = {
      text: `⚠️ คุณมี "${typeOfPurchase}" อยู่แล้ว!`,
      type: "warning",
    };
    return;
  }

  // ❗ ถ้าแต้มไม่พอ
  if (parseFloat(user.point) < itemPrice) {
    messagePopup.value = {
      text: "❌ แต้มของคุณไม่เพียงพอในการซื้อสินค้านี้!",
      type: "error",
    };
    return;
  }

  // ✅ ผ่านเงื่อนไข เปิด popup ยืนยัน
  isAccept.value = true;
}

// ✅ ยืนยันการซื้อ
async function confirmPurchase() {
  let store = null;
  let found = null;

  if (type === "chibi") {
    store = useChibi();
    found = store.chibis.find((item) => item.name === typeOfPurchase);
  } else if (type === "theme") {
    store = useThemeStore();
    found = store.themes.find((item) => item.name === typeOfPurchase);
  } else if (type === "Profileframe") {
    store = useProfileFrameStore();
    found = store.ProfileFrame.find((item) => item.name === typeOfPurchase);
  }

  // ✅ หักแต้ม
  const currentPoint = parseFloat(user.point);
  user.point = (currentPoint - itemPrice).toString();

  // ✅ เปลี่ยนสถานะเป็นเจ้าของ
  if (found) found.state = "เป็นเจ้าของ";

  // ✅ เพิ่มใน inventory
  inventoryStore.addItem({
    id: found.id,
    name: found.name,
    image: found.image || found.src,
    type: found.type,
    price: found.price,
  });

  // ✅ ปิด popup ยืนยันก่อน
  isAccept.value = false;

  // ✅ ใช้ nextTick เพื่อรอ DOM update ก่อนโชว์ popup success
  await nextTick();

  // ✅ แล้วค่อยเปิด popup success
  messagePopup.value = {
    text: `✅ ซื้อสำเร็จ! เหลือแต้ม ${user.point} coins`,
    type: "success",
  };
}
</script>

<template>
  <div>
    <!-- 🛒 Popup หลัก -->
    <div
      class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl w-[380px] h-[330px] flex flex-col items-center p-6 transition-all duration-300 z-40"
    >
      <h2 class="text-xl font-bold text-gray-800 mb-2 ">🛒 รายการสั่งซื้อ</h2>
 
      <img
        :src="image || defaultImage"
        alt="Item Image"
        class="w-20 object-cover rounded-lg mb-2"
      />

      <div class="w-full border-b border-gray-300 mb-4"></div>

      <p class="text-base text-gray-700 mb-1">
        <span class="font-semibold text-blue-700">สินค้า:</span>
        {{ typeOfPurchase }}
      </p>

      <p class="text-base text-gray-700 mb-1">
        <span class="font-semibold text-amber-600">ราคา:</span>
        {{ itemPrice }} coins
      </p>

      <p class="text-base text-gray-700 mb-4">
        <span class="font-semibold text-green-600">แต้มคงเหลือ:</span>
        {{ user.point }} coins
      </p>

      <button
        @click="acceptShow"
        class="mt-2 w-3/4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg hover:opacity-90 transition-all"
      >
        ชำระเงิน
      </button>

      <button
        @click="closePopup"
        class="absolute top-2 right-3 text-gray-400 hover:text-black transition"
        aria-label="Close popup"
      >
        ✕
      </button>
    </div>

    <!-- ✅ Popup ยืนยันการซื้อ -->
    <transition name="fade">
      <div
        v-if="isAccept"
        class="fixed inset-0 flex justify-center items-center bg-black/40 z-[9998]"
      >
        <div class="bg-white rounded-3xl shadow-xl p-8 text-center w-[340px]">
          <h2 class="text-lg font-semibold mb-4 text-gray-800">
            ยืนยันการซื้อ?
          </h2>
          <p class="text-gray-600 mb-6">
            ต้องการซื้อ "{{ typeOfPurchase }}" ในราคา {{ itemPrice }} coins
            ใช่หรือไม่?
          </p>
          <div class="flex justify-center gap-4">
            <button
              @click="confirmPurchase"
              class="px-6 py-2 bg-green-500 text-black rounded-lg hover:bg-green-600 transition"
            >
              ยืนยัน
            </button>
            <button
              @click="isAccept = false"
              class="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- ✅ Popup แจ้งเตือน / สำเร็จ -->
    <transition name="fade">
      <div
        v-if="messagePopup"
        class="fixed inset-0 flex justify-center items-center bg-black/40 z-[9999]"
      >
        <div
          class="bg-white rounded-3xl shadow-xl p-8 text-center w-[340px] animate-scale-in"
        >
          <h2
            class="text-lg font-semibold mb-4"
            :class="{
              'text-green-600': messagePopup.type === 'success',
              'text-red-600': messagePopup.type === 'error',
              'text-yellow-600': messagePopup.type === 'warning',
            }"
          >
            {{
              messagePopup.type === "success"
                ? "สำเร็จ"
                : messagePopup.type === "error"
                ? "ผิดพลาด"
                : "แจ้งเตือน"
            }}
          </h2>

          <p class="text-gray-600 mb-6 whitespace-pre-line">
            {{ messagePopup.text }}
          </p>

          <button
            @click="closeMessagePopup"
            class="px-6 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600 transition duration-150"
          >
            ตกลง
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>
