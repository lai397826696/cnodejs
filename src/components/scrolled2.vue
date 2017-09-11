<template>
    <div class="scroll" :class="{
        'pull-down': (state === 0), 
        'pull-up': (state === 1), 
        refreshing: (state === 2), 
        touching: touching
        }" 
        @touchstart="onRefresh ? touchStart($event) : undefined" 
        @touchmove="onRefresh ? touchMove($event) : undefined" 
        @touchend="onRefresh ? touchEnd($event) : undefined" 
        @mousedown="onRefresh ? mouseDown($event) : undefined" 
        @mousemove="onRefresh ? mouseMove($event) : undefined" 
        @mouseup="onRefresh ? mouseUp($event) : undefined" 
        @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">
        <div class="scroll-inner" :style="{
            transform: 'translate3d(0, ' + top + 'px, 0)',
            webkitTransform: 'translate3d(0, ' + top + 'px, 0)'
          }">
            <div class="pull-to-refresh-layer" v-if="!!onRefresh">
                <slot name="refresh">
                    <div class="preloader"></div>
                    <div class="pull-to-refresh-arrow"></div>
                    <span class="label-down">下拉刷新</span>
                    <span class="label-up">释放刷新</span>
                    <span class="label-refresh">正在刷新..</span>
                </slot>
            </div>
            <slot></slot>
            <div class="infinite-layer" v-if="onInfinite">
                <slot name="infinite">
                    <div class="infinite-preloader"></div>
                    <span class="label-loading">正在加载..</span>
                </slot>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        offset: {
            type: Number,
            default: 50
        },
        onRefresh: {
            type: Function,
            default: undefined,
            required: false
        },
        onInfinite: {
            type: Function,
            default: undefined,
            require: false
        }
    },
    data() {
        return {
            top: 0,
            state: 0, // 0:down, 1: up, 2: refreshing
            startY: 0,
            touching: false,
            infiniteLoading: false
        }
    },
    methods: {
        touchStart(e) {
            this.startY = e.targetTouches[0].pageY
            this.touching = true
        },
        mouseDown(e) {
            this.startY = e.pageY
            this.touching = true
        },
        touchMove(e) {
            if (this.$el.scrollTop > 0 || !this.touching) {
                return false;
            }
            let diff = e.targetTouches[0].pageY - this.startY
            if (diff > 0) e.preventDefault()
            this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)
            if (this.state === 2) { // in refreshing
                return false;
            }
            if (this.top >= this.offset) {
                this.state = 1
                console.log('touchmove-->state', this.state)
            } else {
                this.state = 0
                console.log('touchmove-->state', this.state)
            }
        },
        mouseMove(e) {
            if (this.$el.scrollTop > 0 || !this.touching) {
                console.log(111)
                return
            }
            let diff = e.pageY - this.startY
            if (diff > 0) e.preventDefault()
            this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)
            if (this.state === 2) { // in refreshing
                return
            }
            if (this.top >= this.offset) {
                this.state = 1
            } else {
                this.state = 0
            }
        },
        touchEnd(e) {
            this.touching = false
            if (this.state === 2) { // in refreshing
                this.state = 2
                this.top = this.offset
                return
            }
            if (this.top >= this.offset) { // do refresh
                this.refresh()
            } else {  // cancel refresh
                this.state = 0
                this.top = 0
            }
        },
        mouseUp(e) {
            this.touching = false
            if (this.state === 2) { // in refreshing
                this.state = 2
                this.top = this.offset
                return
            }
            if (this.top >= this.offset) { // do refresh
                this.refresh()
            } else {  // cancel refresh
                this.state = 0
                this.top = 0
            }
        },
        refresh() {
            this.state = 2
            this.top = this.offset
            // this.onRefresh(this.refreshDone)
            this.refreshDone()
        },
        refreshDone() {
            this.state = 0
            this.top = 0
        },
        infinite() {
            this.infiniteLoading = true
            this.onInfinite(this.infiniteDone)
        },
        infiniteDone() {
            this.infiniteLoading = false
        },
        onScroll(e) {
            if (this.infiniteLoading) {
                return
            }
            console.log(this.$el.scrollTop)
            let outerHeight = this.$el.clientHeight
            let innerHeight = this.$el.querySelector('.scroll-inner').clientHeight
            let scrollTop = this.$el.scrollTop
            let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-to-refresh-layer').clientHeight : 0
            let infiniteHeight = this.$el.querySelector('.infinite-layer').clientHeight
            let bottom = innerHeight - outerHeight - scrollTop - ptrHeight
            if (bottom < infiniteHeight) this.infinite()
        }
    }
}
</script>
<style lang="less" scoped>
.scroll {
    position: absolute;
    top: -50px;
    right: 0;
    bottom: 0;
    left: 0;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -webkit-text-size-adjust: none;
    -webkit-transform-origin: left top;
    transform-origin: left top;

    .scroll-inner {
        position: absolute;
        top: 0;
        width: 100%;
        transition-duration: .3s;
    }

    .pull-to-refresh-layer {
        position: relative;
        left: 0;
        top: 0;
        width: 100%;
        height: 50px;
        color: #aaa;
    }
    .infinite-layer,
    .pull-to-refresh-layer {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    

    .pull-to-refresh-layer .preloader {
        visibility: hidden;
        width: 20px;
        height: 20px;
        animation: e 1s steps(12) infinite;
    }
    .pull-to-refresh-layer .preloader:after {
        display: block;
        width: 100%;
        height: 100%;
        content: "";
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath id='a' stroke='%236c6c6c' stroke-width='11' stroke-linecap='round' d='M60 7v20'/%3E%3C/defs%3E%3Cuse xlink:href='%23a' opacity='.27'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(30 60 60)'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: 50%;
        background-size: 100%;
    }

    .pull-to-refresh-layer .pull-to-refresh-arrow {
        width: 20px;
        height: 20px;
        background: no-repeat 50%;
        background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26 40'%3E%3Cpath fill='%238c8c8c' d='M9 22V0h8v22h9L13.5 40 0 22z'/%3E%3C/svg%3E");
        background-size: 10.4px 16px;
        z-index: 10;
        transform: rotate(0deg) translateZ(0);
        transition-duration: .3s;
        margin-left: -20px;
    }
}


.pull-down .label-down, .pull-up .label-up, .refreshing .label-refresh {
    display: block;
    width: 5.5em;
}
.label-down, .label-refresh, .label-up {
    display: none;
    text-align: center;
}
.scroll.pull-up .pull-to-refresh-arrow {
    transform: rotate(180deg) translateZ(0)
}
.scroll-refresher .icon-refreshing,.scroll-refresher .text-refreshing {
    display: none
}
.scroll-refresher .icon-refreshing {
    -webkit-animation-duration: 1.5s;
    animation-duration: 1.5s
}

.scroll:not(.refreshing) .pull-to-refresh-layer .preloader {
    animation: none;
}
.scroll.refreshing .pull-to-refresh-arrow {
    visibility: hidden;
    transition-duration: 0ms
}

.scroll.refreshing .preloader {
    visibility: visible
}
.scroll.touching .scroll-inner {
    transition-duration: 0ms
}

.infinite-layer,.pull-to-refresh-layer {
    display: flex;
    align-items: center;
    justify-content: center
}

.infinite-layer {
    height: 40px;
    color: #aaa
}
.infinite-preloader {
    width: 20px;
    height: 20px;
    animation: e 1s steps(12) infinite
}

.infinite-preloader:after {
    display: block;
    width: 100%;
    height: 100%;
    content: "";
    background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Cdefs%3E%3Cpath id='a' stroke='%236c6c6c' stroke-width='11' stroke-linecap='round' d='M60 7v20'/%3E%3C/defs%3E%3Cuse xlink:href='%23a' opacity='.27'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(30 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(60 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(90 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(120 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.27' transform='rotate(150 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.37' transform='rotate(180 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.46' transform='rotate(210 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.56' transform='rotate(240 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.66' transform='rotate(270 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.75' transform='rotate(300 60 60)'/%3E%3Cuse xlink:href='%23a' opacity='.85' transform='rotate(330 60 60)'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%
}
.label-loading {
    display: block;
    width: 5.5em;
    text-align: center
}
</style>