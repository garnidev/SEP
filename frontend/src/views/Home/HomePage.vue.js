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
var lucide_vue_next_1 = require("lucide-vue-next");
var stats = [
    { label: 'Panaderías registradas', value: '342', icon: lucide_vue_next_1.Wheat, color: 'green' },
    { label: 'Artículos publicados', value: '56', icon: lucide_vue_next_1.Newspaper, color: 'purpura' },
    { label: 'Departamentos activos', value: '18', icon: lucide_vue_next_1.MapPin, color: 'celeste' },
    { label: 'Visitas este mes', value: '2.4k', icon: lucide_vue_next_1.TrendingUp, color: 'lime' },
];
var __VLS_ctx = __assign(__assign({}, {}), {});
var __VLS_components;
var __VLS_intrinsics;
var __VLS_directives;
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
/** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "page" }));
/** @type {__VLS_StyleScopedClasses['page']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.header, __VLS_intrinsics.header)(__assign({ class: "header" }));
/** @type {__VLS_StyleScopedClasses['header']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.h1, __VLS_intrinsics.h1)(__assign({ class: "title" }));
/** @type {__VLS_StyleScopedClasses['title']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.p, __VLS_intrinsics.p)(__assign({ class: "subtitle" }));
/** @type {__VLS_StyleScopedClasses['subtitle']} */ ;
__VLS_asFunctionalElement1(__VLS_intrinsics.section, __VLS_intrinsics.section)(__assign({ class: "stats-grid" }));
/** @type {__VLS_StyleScopedClasses['stats-grid']} */ ;
for (var _i = 0, _a = __VLS_vFor((__VLS_ctx.stats)); _i < _a.length; _i++) {
    var stat = _a[_i][0];
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ key: (stat.label) }, { class: (['stat-card', stat.color]) }));
    /** @type {__VLS_StyleScopedClasses['stat-card']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "stat-icon" }));
    /** @type {__VLS_StyleScopedClasses['stat-icon']} */ ;
    var __VLS_0 = (stat.icon);
    // @ts-ignore
    var __VLS_1 = __VLS_asFunctionalComponent1(__VLS_0, new __VLS_0({
        size: (20),
    }));
    var __VLS_2 = __VLS_1.apply(void 0, __spreadArray([{
            size: (20),
        }], __VLS_functionalComponentArgsRest(__VLS_1), false));
    __VLS_asFunctionalElement1(__VLS_intrinsics.div, __VLS_intrinsics.div)(__assign({ class: "stat-info" }));
    /** @type {__VLS_StyleScopedClasses['stat-info']} */ ;
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "stat-value" }));
    /** @type {__VLS_StyleScopedClasses['stat-value']} */ ;
    (stat.value);
    __VLS_asFunctionalElement1(__VLS_intrinsics.span, __VLS_intrinsics.span)(__assign({ class: "stat-label" }));
    /** @type {__VLS_StyleScopedClasses['stat-label']} */ ;
    (stat.label);
    // @ts-ignore
    [stats,];
}
// @ts-ignore
[];
var __VLS_export = (await Promise.resolve().then(function () { return require('vue'); })).defineComponent({});
exports.default = {};
