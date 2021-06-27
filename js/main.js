const cloneDeep = (obj) => {
    return JSON.parse(JSON.stringify(obj));
}

new Vue({
    el: '#app',
    mounted() {
        const vm = this;
        vm.isVisibleBanner = true;
        vm.initBanner();
        vm.initInterval();
    },
    methods: {
        initInterval() {
            const vm = this;
            vm.interval = setInterval(() => {
                vm.initBanner();
            }, vm.intervalMs);
        },
        initBanner() {
            const vm = this;
            const timeoutOffset = 10;
            const total = banners.length;
            const totalOffset = total - 1;
            const _banners = cloneDeep(banners);
            const intervalCurrentIdx = vm.intervalCurrentIdx;
            const timeoutMsHalf = (vm.intervalMs / 2);

            vm.setCurrentBanner(intervalCurrentIdx);

            if (_banners[intervalCurrentIdx].dynamicText.length > 1) {

                setTimeout(() => {
                    vm.$set(vm, "isVisibleText", false);

                    setTimeout(() => {
                        vm.currentBanner.dynamicText[0] = _banners[intervalCurrentIdx].dynamicText[1];
                        vm.$set(vm, "isVisibleText", true);
                    }, timeoutOffset);

                }, timeoutMsHalf - timeoutOffset);
            }

            if (intervalCurrentIdx >= totalOffset) {
                vm.intervalCurrentIdx = 0;
            } else {
                vm.intervalCurrentIdx++;
            }
        },
        setCurrentBanner(idx) {
            this.$set(this, "isVisibleText", false);
            this.$set(this, "isVisibleLogo", false);
            this.$set(this, "currentBanner", cloneDeep(banners[idx]));

            setTimeout(() => {
                this.$set(this, "isVisibleText", true);
                this.$set(this, "isVisibleLogo", true);
            }, 500);
        }
    },
    data() {
        return {
            currentBanner: {},

            interval: false,
            intervalMs: 13000,
            intervalCurrentIdx: 0,

            isVisibleBanner: false,
            isVisibleText: false,
            isVisibleLogo: false
        }
    }
});