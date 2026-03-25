"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = require("vue");
var vue_router_1 = require("vue-router");
var lucide_vue_next_1 = require("lucide-vue-next");
var route = (0, vue_router_1.useRoute)();
var collapsed = (0, vue_1.ref)(false);
var navItems = [
    { id: 'home', label: 'Inicio', icon: lucide_vue_next_1.Home, path: '/' },
    { id: 'bakeries', label: 'Directorio de panaderías', icon: lucide_vue_next_1.Wheat, path: '/panaderias' },
    { id: 'blog', label: 'Gestor del blog', icon: lucide_vue_next_1.Newspaper, path: '/blog' },
];
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
__VLS_asFunctionalElement1(__VLS_intrinsics.aside, __VLS_intrinsics.aside)(__assign({ class: (['sidebar', { collapsed: __VLS_ctx.collapsed }]) }));
/** @type {__VLS_StyleScopedClasses['collapsed']} */ ;
/** @type {__VLS_StyleScopedClasses['sidebar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "logo-area" }));
/** @type {__VLS_StyleScopedClasses['logo-area']} */ ;
if (!__VLS_ctx.collapsed) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "logos" }));
    /** @type {__VLS_StyleScopedClasses['logos']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "logo-placeholder" }));
    /** @type {__VLS_StyleScopedClasses['logo-placeholder']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)(__assign({ class: "logo-divider" }));
    /** @type {__VLS_StyleScopedClasses['logo-divider']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "logo-placeholder" }));
    /** @type {__VLS_StyleScopedClasses['logo-placeholder']} */ ;
}
else {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "logo-small" }));
    /** @type {__VLS_StyleScopedClasses['logo-small']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "logo-placeholder" }));
    /** @type {__VLS_StyleScopedClasses['logo-placeholder']} */ ;
}
__VLS_asFunctionalElement1(__VLS_intrinsics.nav, __VLS_intrinsics.nav)(__assign({ class: "nav" }));
/** @type {__VLS_StyleScopedClasses['nav']} */ ;
if (!__VLS_ctx.collapsed) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "section-label" }));
    /** @type {__VLS_StyleScopedClasses['section-label']} */ ;
}
if (!__VLS_ctx.collapsed) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div)(__assign({ class: "section-divider" }));
    /** @type {__VLS_StyleScopedClasses['section-divider']} */ ;
}
for (var _i = 0, _a = __VLS_vFor((__VLS_ctx.navItems)); _i < _a.length; _i++) {
    var item = _a[_i][0];
    var __VLS_0 = void 0;
    /** @ts-ignore @type {typeof __VLS_components.RouterLink | typeof __VLS_components.RouterLink} */
    RouterLink;
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0(__assign(__assign({ key: (item.id), to: (item.path) }, { class: (['nav-item', { active: __VLS_ctx.route.path === item.path }]) }), { title: (__VLS_ctx.collapsed ? item.label : undefined) })));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([__assign(__assign({ key: (item.id), to: (item.path) }, { class: (['nav-item', { active: __VLS_ctx.route.path === item.path }]) }), { title: (__VLS_ctx.collapsed ? item.label : undefined) })], __VLS_functionalComponentArgsRest(__VLS_1), false));
    /** @type {__VLS_StyleScopedClasses['active']} */ ;
    /** @type {__VLS_StyleScopedClasses['nav-item']} */ ;
    var __VLS_5 = __VLS_3.slots.default;
    var __VLS_6 = (item.icon);
    // @ts-ignore
    var __VLS_7 = __VLS_asFunctionalComponent1(__VLS_6, new __VLS_6({
        size: (20),
    }));
    var __VLS_8 = __VLS_7.apply(void 0, __spreadArray([{
            size: (20),
        }], __VLS_functionalComponentArgsRest(__VLS_7), false));
    if (!__VLS_ctx.collapsed) {
        __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "nav-label" }));
        /** @type {__VLS_StyleScopedClasses['nav-label']} */ ;
        (item.label);
    }
    // @ts-ignore
    [collapsed, collapsed, collapsed, collapsed, collapsed, collapsed, navItems, route,];
    var __VLS_3;
    // @ts-ignore
    [];
}
__VLS_asFunctionalElement1(__VLS_intrinsics.button, __VLS_intrinsics.button)(__assign({ onClick: function () {
        var _a = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _a[_i] = arguments[_i];
        }
        var $event = _a[0];
        __VLS_ctx.collapsed = !__VLS_ctx.collapsed;
        // @ts-ignore
        [collapsed, collapsed,];
    } }, { class: "collapse-btn" }));
/** @type {__VLS_StyleScopedClasses['collapse-btn']} */ ;
var __VLS_11 = (__VLS_ctx.collapsed ? __VLS_ctx.ChevronRight : __VLS_ctx.ChevronLeft);
// @ts-ignore
var __VLS_12 = __VLS_asFunctionalComponent1(__VLS_11, new __VLS_11({
    size: (16),
}));
var __VLS_13 = __VLS_12.apply(void 0, __spreadArray([{
        size: (16),
    }], __VLS_functionalComponentArgsRest(__VLS_12), false));
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "user-area" }));
/** @type {__VLS_StyleScopedClasses['user-area']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "user-avatar" }));
/** @type {__VLS_StyleScopedClasses['user-avatar']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.img)({
    src: "https://ui-avatars.com/api/?name=Admin&background=39a900&color=fff&size=36",
    alt: "Admin",
});
if (!__VLS_ctx.collapsed) {
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "user-info" }));
    /** @type {__VLS_StyleScopedClasses['user-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "user-name" }));
    /** @type {__VLS_StyleScopedClasses['user-name']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "user-role" }));
    /** @type {__VLS_StyleScopedClasses['user-role']} */ ;
    var __VLS_16 = void 0;
    /** @ts-ignore @type {typeof __VLS_components.ChevronRight} */
    lucide_vue_next_1.ChevronRight;
    // @ts-ignore
    var __VLS_17 = __VLS_asFunctionalComponent1(__VLS_16, new __VLS_16(__assign({ size: (16) }, { class: "user-chevron" })));
    var __VLS_18 = __VLS_17.apply(void 0, __spreadArray([__assign({ size: (16) }, { class: "user-chevron" })], __VLS_functionalComponentArgsRest(__VLS_17), false));
    /** @type {__VLS_StyleScopedClasses['user-chevron']} */ ;
}
// @ts-ignore
[collapsed, collapsed, lucide_vue_next_1.ChevronRight, lucide_vue_next_1.ChevronLeft,];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
