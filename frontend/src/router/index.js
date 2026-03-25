"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vue_router_1 = require("vue-router");
var router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(),
    routes: [
        {
            path: '/',
            component: function () { return Promise.resolve().then(function () { return require('@/components/layout/AppLayout.vue'); }); },
            children: [
                {
                    path: '',
                    name: 'home',
                    component: function () { return Promise.resolve().then(function () { return require('@/views/Home/HomePage.vue'); }); },
                },
                {
                    path: 'panaderias',
                    name: 'bakeries',
                    component: function () { return Promise.resolve().then(function () { return require('@/views/BakeryDirectory/BakeryDirectoryPage.vue'); }); },
                },
                {
                    path: 'blog',
                    name: 'blog',
                    component: function () { return Promise.resolve().then(function () { return require('@/views/BlogManager/BlogManagerPage.vue'); }); },
                },
            ],
        },
    ],
});
exports.default = router;
