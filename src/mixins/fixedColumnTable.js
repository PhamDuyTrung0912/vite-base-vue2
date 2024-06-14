export default {
    methods: {
        buildQuerySelector(numColumns) {
            let selector = 'tbody tr:nth-child(n) ';
            for (let i = 1; i <= numColumns; i++) {
                selector += 'td:nth-child(' + i + ')';
                if (i < numColumns) {
                    selector += ', ';
                }
            }
            return selector;
        },

        updateFixedColumns() {
            Object.keys(this.$refs).forEach((key) => {
                if (this.$refs[key] && key && key.includes('dataTable')) {
                    const dataTable = this.$refs[key];
                    if (dataTable) {
                        dataTable.$nextTick(() => {
                            // const tableWrapper = dataTable.$el.querySelector('.v-data-table__wrapper');
                            const headerCells = dataTable.$el.querySelectorAll('thead th');
                            const bodyCells = dataTable.$el.querySelectorAll(
                                this.buildQuerySelector(this.isCheckbox ? this.numberColumnFixed + 1 : this.numberColumnFixed),
                            );
                            // const scrollHandler = () => {
                            let columnWidths = [...this.tableHeaders].map((header) => header.width || 120);

                            if (this.tableHeaders.length > this.numberColumnFixed) {
                                columnWidths = columnWidths.slice(0, this.numberColumnFixed);
                            } else {
                                columnWidths = columnWidths.slice(0, 0);
                            }

                            if (this.isCheckbox) {
                                columnWidths.unshift(64);
                            }

                            headerCells.forEach((element, index) => {
                                if (index < columnWidths.length) {
                                    element.style.position = 'sticky';
                                    element.style.zIndex = '5';

                                    if (index === 0) {
                                        element.style.left = '0';
                                    } else {
                                        let leftPosition = 0;
                                        for (let i = 0; i < index; i++) {
                                            leftPosition += columnWidths[i];
                                        }
                                        element.style.left = `${leftPosition}px`;
                                    }

                                    if (index === 1 && this.isCheckbox) {
                                        element.style.borderLeft = '0.1px solid #d9d9d9';
                                    }
                                    if (index === columnWidths.length - 1) {
                                        element.style.borderRight = '0.1px solid #d9d9d9';
                                    }
                                }
                            });

                            let leftOffsets = columnWidths.reduce((acc, width, index) => {
                                if (index === 0) {
                                    acc.push(0);
                                } else {
                                    acc.push(acc[index - 1] + columnWidths[index - 1]);
                                }
                                return acc;
                            }, []);

                            bodyCells.forEach((element, index) => {
                                const columnIndex = index % columnWidths.length;
                                const isLeftmost = columnIndex === 0;
                                const isRightmost = columnIndex === columnWidths.length - 1;

                                element.style.position = 'sticky';
                                element.style.zIndex = '5';

                                if (isLeftmost) {
                                    element.style.left = leftOffsets[columnIndex] + 'px';
                                    element.style.zIndex = '5';
                                } else {
                                    element.style.left = leftOffsets[columnIndex] + 'px';
                                    if (columnIndex === 1 && this.isCheckbox) element.style.borderLeft = '0.1px solid #d9d9d9';
                                }

                                if (isRightmost) {
                                    element.style.borderRight = '0.1px solid #d9d9d9';
                                }
                            });
                            // };

                            // tableWrapper.addEventListener('scroll', scrollHandler);
                            // scrollHandler();
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
