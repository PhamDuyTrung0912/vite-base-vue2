export default {
    install(Vue) {
        Vue.prototype.$utils = {
            isEmptyArray(arr) {
                return Array.isArray(arr) && arr.length;
            },

            isValidDateTimeFormat(input) {
                const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4}) (\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/;
                return regex.test(input);
            },
            isValidDateFormat(input) {
                const regex = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/;
                return regex.test(input);
            },

            convertToISOFormat(dateTimeString) {
                const parts = dateTimeString.split(/\/|\s|:/);
                const year = parts[2];
                const month = parts[1].padStart(2, '0');
                const day = parts[0].padStart(2, '0');
                const time = parts.slice(3).join(':');

                return `${year}-${month}-${day} ${time}`;
            },

            convertDateFormat(dateString) {
                const parts = dateString.split('/');
                const year = parts[2];
                const month = parts[1].padStart(2, '0');
                const day = parts[0].padStart(2, '0');

                return `${year}-${month}-${day}`;
            },

            getImgSize(url) {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.addEventListener('load', function load() {
                        resolve({
                            width: this.width,
                            height: this.height,
                        });
                    });
                    img.addEventListener('error', (e) => {
                        reject(e);
                    });
                    img.src = url;
                });
            },
            getFullDate(date) {
                let result = null;
                if (date) {
                    result = new Date(date).toLocaleString('fr-Fr');
                    const dayArray = result.split(':');
                    result = `${dayArray[0]}:${dayArray[1]}`;
                }
                return result;
            },
            getDate(date = null) {
                let result;
                if (date) result = new Date(date).toLocaleString('fr-Fr').split(' ')[0];
                else result = null;
                if (result && result[result.length - 1] === ',') result = result.slice(0, result.length - 1);
                return result;
            },
            getToday() {
                let result = new Date().toLocaleString('fr-Fr').split(' ')[0];
                if (result && result[result.length - 1] === ',') result = result.slice(0, result.length - 1);
                return result;
            },
            formatHour(time) {
                if (time && time.length === 4 && time.charAt(1) === ':') time = `0${time}`;
                return time;
            },
            getSecondsFromTime(time) {
                if (time) {
                    const a = time.split(':');
                    if (a.length === 3) {
                        return parseInt(a[0]) * 60 * 60 + parseInt(a[1]) * 60 + parseInt(a[3]);
                    }
                    if (a.length === 2) {
                        return parseInt(a[0]) * 60 * 60 + parseInt(a[1]) * 60;
                    }
                    return 0;
                }
                return 0;
            },
            ucFirst(str) {
                if (str.length > 0) {
                    return str[0].toUpperCase() + str.substring(1);
                }
                return str;
            },
            slugify(str) {
                str = str.replace(/^\s+|\s+$/g, ''); // trim
                str = str.toLowerCase();

                const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
                const to = 'aaaaeeeeiiiioooouuuunc------';
                for (let i = 0, l = from.length; i < l; i++) {
                    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
                }

                str = str
                    .replace(/[^a-z0-9 -]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-');

                return str;
            },
            truncate(str, n, useWordBoundary) {
                if (str.length <= n) {
                    return str;
                }
                const subString = str.substr(0, n - 1);
                return `${useWordBoundary ? subString.substr(0, subString.lastIndexOf(' ')) : subString}...`;
            },
            apiAsset(path) {
                return import.meta.env.VITE_APP_API_URL + path;
            },
            chunkArray(myArray, chunkSize) {
                let index = 0;
                const arrayLength = myArray.length;
                const tempArray = [];

                for (index = 0; index < arrayLength; index += chunkSize) {
                    const myChunk = myArray.slice(index, index + chunkSize);
                    // Do something if you want with the group
                    tempArray.push(myChunk);
                }

                return tempArray;
            },
            swapArrayItems(array, aIndex, bIndex) {
                array[aIndex] = array.splice(bIndex, 1, array[aIndex])[0];
                return array;
            },
            urlBase64ToUint8Array(base64string) {
                const padding = '='.repeat((4 - (base64string.length % 4)) % 4);
                const base64 = (base64string + padding).replace(/-/g, '+').replace(/_/g, '/');

                const rawData = window.atob(base64);
                const outputArray = new Uint8Array(rawData.length);

                for (let i = 0; i < rawData.length; i++) {
                    outputArray[i] = rawData.charCodeAt(i);
                }
                return outputArray;
            },
            arrayUnique(array) {
                const a = array.concat();
                for (let i = 0; i < a.length; ++i) {
                    for (let j = i + 1; j < a.length; ++j) {
                        if (a[i] === a[j]) a.splice(j--, 1);
                    }
                }
                return a;
            },
            getCookie(cname) {
                const name = `${cname}=`;
                const decodedCookie = decodeURIComponent(document.cookie);
                const ca = decodedCookie.split(';');
                for (let i = 0; i < ca.length; i++) {
                    let c = ca[i];
                    while (c.charAt(0) === ' ') {
                        c = c.substring(1);
                    }
                    if (c.indexOf(name) === 0) {
                        return c.substring(name.length, c.length);
                    }
                }
                return '';
            },
            getGeojsonFromFeature(feature) {
                return this.$map.library.ol.format.GeoJSON().writeFeatureObject(feature, {
                    dataProjection: this.$map.projection,
                    featureProjection: 'EPSG:3857',
                }).geometry;
            },
            trustedImgMimes: ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'],
            trustedMimeType: [
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/svg+xml',
                'application/pdf',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/msword',
                'application/acad',
                'image/vnd.dwg',
            ],
        };
    },
};
