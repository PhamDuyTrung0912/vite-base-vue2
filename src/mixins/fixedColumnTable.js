export default {
    methods: {
        updateFixedColumns() {
            Object.keys(this.$refs).forEach((key) => {
                if (this.$refs[key] && key && key.includes('dataTable')) {
                    const dataTable = this.$refs[key];
                    if (dataTable) {
                        dataTable.$nextTick(() => {
                            const tableWrapper = dataTable.$el.querySelector('.v-data-table__wrapper');
                            const headerCells = dataTable.$el.querySelectorAll('thead th');
                            const bodyCells = dataTable.$el.querySelectorAll(
                                'tbody tr:nth-child(n) td:nth-child(1), tbody tr:nth-child(n) td:nth-child(2), tbody tr:nth-child(n) td:nth-child(3), tbody tr:nth-child(n) td:nth-child(4)',
                            );
                            const scrollHandler = () => {
                                headerCells.forEach((element, index) => {
                                    if (index < 4) {
                                        if (index === 0) {
                                            element.style.position = 'sticky';
                                            element.style.left = '0';
                                            element.style.backgroundColor = 'white';
                                            element.style.zIndex = '5';
                                        }
                                        if (index === 1) {
                                            element.style.position = 'sticky';
                                            element.style.left = '65px';
                                            element.style.backgroundColor = 'white';
                                            element.style.zIndex = '5';
                                            element.style.borderLeft = '0.1px solid #d9d9d9';
                                        }
                                        if (index === 2) {
                                            element.style.position = 'sticky';
                                            element.style.left = '185px';
                                            element.style.backgroundColor = 'white';
                                            element.style.zIndex = '5';
                                        }
                                        if (index === 3) {
                                            element.style.position = 'sticky';
                                            element.style.left = '305px';
                                            element.style.backgroundColor = 'white';
                                            element.style.zIndex = '5';
                                            element.style.borderRight = '0.1px solid #d9d9d9';
                                        }
                                    }
                                });

                                const leftOffsets = ['0', '65px', '185px', '305px'];

                                bodyCells.forEach((element, index) => {
                                    const columnIndex = index % 4;
                                    const isLeftmost = columnIndex === 0;
                                    const isRightmost = columnIndex === 3;

                                    element.style.position = 'sticky';
                                    element.style.backgroundColor = 'white';
                                    element.style.zIndex = '5';

                                    if (isLeftmost) {
                                        element.style.left = leftOffsets[columnIndex];
                                        element.style.zIndex = '5';
                                    } else {
                                        element.style.left = leftOffsets[columnIndex];
                                        if (columnIndex === 1) element.style.borderLeft = '0.1px solid #d9d9d9';
                                    }

                                    if (isRightmost) {
                                        element.style.borderRight = '0.1px solid #d9d9d9';
                                    }
                                });
                            };

                            tableWrapper.addEventListener('scroll', scrollHandler);
                            scrollHandler();
                        });
                    }
                }
            });
        },

        handleMutation() {
            this.updateFixedColumns();
        },

        beforeDestroyObserver() {
            const observer = new MutationObserver(this.handleMutation);
            observer.disconnect();
        },

        mountedObserver() {
            const tableWrapper = this.$refs.dataTable.$el.querySelector('.v-data-table__wrapper');
            const observer = new MutationObserver(this.handleMutation);
            observer.observe(tableWrapper, { subtree: true, childList: true });
        },
    },
};
