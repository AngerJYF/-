<template>
  <div class="box">
    <div class="item" v-for="(item, index) of images" :key="index">
      <img :src="item.src" :style="{width:item.width,height:item.height}" alt>
    </div>
  </div>
</template>

<script>
// import Data from "@/dataConfig/Home/index.js";

// 1. 引入数据
import Data from "./index.js";

// 4. 定义装图片的父元素宽度
const imgItemContainer = 250;

export default {
  name: "ChangeImgSize",
  data() {
    return {
      //待渲染的图片数组
      images: []
    };
  },
  mounted() {
    // 2. 给 images 赋值
    this.images = Data.partner.partnerList;
    // 3. 调用图片加载方法
    this.loadImages();
  },
  methods: {
    loadImages() {
      Promise.all(
        // 5. Promise.all()  中传参,参数可以为 Array ,
        // 数组中的每一个数据均为一个 promise 对象, 并拥有其方法
        this.images.map(img => {
          return this.loadImage(img);
        })
      ).then(imgs => {
        // 7. images 数组数据 重新赋值
        this.images = imgs.map(img => {
          const imgObj = {
            src: img.src,
            width: img.w,
            height: img.h
          };
          return imgObj;
        });
        // 8. 最终处理后的数据,开始页面渲染展示
        console.log(this.images);
      });
    },
    loadImage(img) {
      // 6. 处理 传过来的图片,处理成自适应的 宽和高;
      return new Promise(resolve => {
        const image = new Image();
        image.src = img.img;
        image.onload = () => {
          const scale = image.height / 30;
          if (image.width / scale >= imgItemContainer) {
            image.w = "100%";
            image.h = "auto";
          } else {
            image.w = "auto";
            image.h = "30px";
          }
          console.log("image", image);
          resolve(image);
        };
        image.onerror = () => resolve(image);
      });
    }
  }
};
</script>

<style scoped>
/* 图片样式   自己动手 丰衣足食 */
.box {
  padding-top: 20px;
}
.box .item {
  cursor: pointer;
  display: inline-block;
  padding: 0 24px;
  height: 80px;
  line-height: 80px;
  text-align: left;
  width: 20%;
}
</style>
