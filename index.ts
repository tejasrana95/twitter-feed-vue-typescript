import Vue from "vue";
import { Component } from "vue-property-decorator";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import { FeedList } from "./components/feed-list.component";
import "./style";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { AddEditFeed } from "./components/add-edit-feed.component";
import VueTimeago from "vue-timeago";

Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(VueTimeago, {
  name: "Timeago",
  locale: "en"
});

const routes = [{ path: "/", component: FeedList }];
const router = new VueRouter({ routes });

Vue.component("add-edit-feed", AddEditFeed);

new Vue({
  router: router
}).$mount("#app");
