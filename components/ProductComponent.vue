<template>
  <div class="product">
    <div class="product--image">
      <img :src="computedImage" alt="" />
    </div>
    <div class="product--info">
      <div class="product--info__title">
        {{ product.title }}
      </div>
      <div class="product--info__description">
        {{ product.description }}
      </div>
      <div class="product--info__price">${{ product.price }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Product from "~/interface/Product";
type IProps = {
  product: Product;
};

const computedImage = computed(() => {
  return props.product.image || "/placeholder.png";
});

const props = defineProps<IProps>();
</script>

<style lang="scss">
.product {
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.15);
  border-radius: 12px;
  position: relative;
  overflow: hidden;

  &--image {
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  &--info {
    margin: 10px 20px;

    &__title {
      color: #333;
      font-weight: 600;
      font-size: 20px;
      line-height: 18px;
      height: 36px;
    }

    &__description {
      color: #4f4f4f;
      font-weight: 450;
      font-size: 16px;
      line-height: 16px;
    }

    &__price {
      position: absolute;
      color: #7c5fc7;
      text-align: right;
      margin-top: 20px;
      font-weight: 600;
      font-size: 22px;
      top: 0;
      right: 10px;
    }
  }
}
</style>
