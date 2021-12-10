import Vue from 'vue'
import App from './App.vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'lib-flexible/flexible.js'
import axios from 'axios'

import ElementUI from 'element-ui' //element-ui的全部组件
import 'element-ui/lib/theme-chalk/index.css'//element-ui的css
import router from '@/router/index'

import * as qiniu from 'qiniu-js'
import Vant from 'vant'
import 'vant/lib/index.css'
// import ImageCompressor from "js-image-compressor";
import Compressor from 'compressorjs';
import {JSEncrypt} from "jsencrypt";

// import EXIF from 'exif-js'

Vue.config.productionTip = false

Vue.use(ElementUI) //使用elementUI
Vue.use(MintUI)
Vue.use(Vant)


axios.defaults.withCredentials = true;                  // 使得 axios 请求携带 cookies

Vue.prototype.$axios = axios

Vue.prototype.$qiniu = qiniu


Vue.prototype.$context = new Vue({

    data() {
        return {
            // 移动端开发测试环境
            // serverUrl: "http://192.168.1.103:8080",

            // 本地开发生产环境
            serverUrl: "/api",

            qiniuPostDomain: "qiniu.cc-campus.com",
            qiniuChatDomain: "qiniuchat.cc-campus.com",
            publicKey: "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCQvV35DDuNy/72HbrNpDxhQuzHOroF6xa7dr/320qRpCUE5c84spwNaFtiA/i0I8MW+36OiHQUlJ5VcREk4ZJ/QhkIdJa4cQFxJSBsuZwuFQaaTQkIHTc6oxqLiUFqedh6dCdNZfqoC9i4WIbDRp5Ad17oK2ubuhhKddFto9r44QIDAQAB",
            currentUser: null,
            lastSaleDetialPage: {
                user: null,
                comments: null,
                saleDetial: null,
                scrollY: 0,
            },
            user: {
                userId: 0,
                userName: "还没有登录哦",
                userAvatarLink: "https://images.pexels.com/photos/2088203/pexels-photo-2088203.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
                stuId: 0,
                region: "未知星球",
                realName: "",
            },

            pageRouter: {
                lastPage: null,
                currentPage: null,
                switchStyle: "slide-right",
                pathKeySet:
                    {
                        '/': 0,
                        'sale': 0,
                        'delivery': 1,
                        'study': 2,
                        'user': 3,
                        'saleDetial': 1000,
                        'chatList': 1000,
                        'myPost': 1000,
                        'post': 1000,
                        'login': 1000,
                        'chat': 1001,
                        'admin': 1000,
                    },
            },

            offset: {
                high: 60,
                medium: 80,
                low: 100
            }
        }
    },

    methods: {
        setUserAction(user) {
            this.user = user;
        },

        isLogin() {
            return this.user.userId != 0;
        },

        setLastSaleAction(lastState) {
            this.lastSaleDetialPage = lastState
        },

        getLastSaleDetial() {
            return this.lastSaleDetialPage
        },

        switchPageContext(from, to) {
            if (this.pageRouter.pathKeySet[from] > this.pageRouter.pathKeySet[to]) {
                this.pageRouter.switchStyle = "slide-right";
            } else {
                this.pageRouter.switchStyle = "slide-left";
            }
            this.pageRouter.lastPage = from
            this.pageRouter.currentPage = to;

        },

        // 使用本地 cookie 发送到服务器端进行验证
        async mountUser() {
            await this.$axios.get(this.$context.serverUrl + "/mountUser")
                .then(response => {
                    console.log(response)
                    if (response.data.data.code === 200) {
                        this.$context.user = response.data.data.data;

                    }
                }).catch(error => {
                    console.log(error);
                })
        },

        getQueryVariable(variable) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
            return null;
        },


        // 压缩图片加快上传速度
        compressImage(imageFile) {

            return new Promise(((resolve, reject) => {
                new Compressor(imageFile, {
                    quality: 0.6,
                    convertSize: Infinity,
                    loose: true,

                    // Callback before compression
                    beforeCompress: function (result) {
                        console.log('Image size before compression:', result.size);
                        console.log('mime type:', result.type);
                    },

                    // Compression success callback
                    success: function (compressedFile) {
                        console.log('Image size after compression:', compressedFile.size);
                        console.log('mime type:', compressedFile.type);
                        console.log('Actual compression ratio:', ((imageFile.size - compressedFile.size) / imageFile.size * 100).toFixed(2) + '%');
                        // that.uploadQiniuCloud(compressedFile, key, uploadToken, self)
                        resolve(compressedFile);
                    },

                    // An error occurred
                    error: function (msg) {
                        console.error(msg);
                        reject();
                    }
                });
            }))
        },

        uploadQiniuCloud(file, key, uploadToken) {
            let observable = this.$qiniu.upload(file, key, uploadToken);
            return new Promise((resolve, reject) => {
                observable.subscribe({
                    complete(res) {
                        console.log(res)
                        resolve(res)
                    },
                    error(err) {
                        console.log(err);
                        reject("upload qiniuCloud failed");
                    }
                })
            })

        },


        // 返回一个由多个 Promise 组成的 Promise，利用 Promise.all。每个 promise 中值为已经上传的 imgUrl
        uploadImgs(uploadToken, fileList) {
            let res = [];
            for (let i = 0; i < fileList.length; ++i) {
                let imgFile = fileList[i];
                let file = imgFile
                let fileName = ""
                let domain = ""
                // chat 图片
                if (imgFile.file != undefined) {
                    file = imgFile.file
                    fileName = file.name
                    domain = this.$context.qiniuChatDomain
                    // post 图片
                } else {
                    domain = this.$context.qiniuPostDomain
                    fileName = file.name
                    file = file.raw;
                }
                let key = this.$context.user.userId + (new Date()).getTime() + i + fileName.substr(file.name.lastIndexOf('.'));
                // self.uploadedImgUrls.push("http://" + domain + "/" + key);

                console.log(file);

                res.push(
                    this.compressImage(file)
                        .then((compressedFile) => {
                            // 处理上传
                            return this.uploadQiniuCloud(compressedFile, key, uploadToken);
                        })
                        .then((uploadRes) => {
                            return "http://" + domain + "/" + uploadRes.key;
                        })
                )
            }
            return Promise.all(res);
        },


        // fixOrien(file, fileName) {
        //
        //     let orientation = null;
        //
        //     let fixedFile = null;
        //     let vueThis = this;
        //     let oReader = new FileReader();
        //
        //     return new Promise((resolve) => {
        //         EXIF.getData(file, function () {
        //             // alert(EXIF.pretty(this));
        //             EXIF.getAllTags(this);
        //             //alert(EXIF.getTag(this, 'Orientation'));
        //             orientation = EXIF.getTag(this, 'Orientation');
        //             console.log("orientation " + orientation);
        //             oReader.onload = function (evt) {
        //                 let image = new Image();
        //                 image.src = evt.target.result;
        //                 image.onload = function () {
        //                     let canvas = document.createElement("canvas");
        //                     var ctx = canvas.getContext("2d");
        //                     canvas.width = image.width;
        //                     canvas.height = image.height;
        //                     ctx.drawImage(this, 0, 0, canvas.width, canvas.height);
        //                     let base64 = null;
        //
        //                     if (orientation != "" && orientation != 1) {
        //                         switch (orientation) {
        //                             case 6://需要逆时针90度旋转
        //                                 console.log('需要顺时针（向左）90度旋转');
        //                                 vueThis.rotateImg(this, 'left', canvas);
        //                                 break;
        //                             case 8://需要顺时针（向右）90度旋转
        //                                 console.log('需要顺时针（向右）90度旋转');
        //                                 vueThis.rotateImg(this, 'right', canvas);
        //                                 break;
        //                             case 3://需要180度旋转
        //                                 console.log('需要180度旋转');
        //                                 vueThis.rotateImg(this, 'right', canvas);//转两次
        //                                 vueThis.rotateImg(this, 'right', canvas);
        //                                 break;
        //                         }
        //                     }
        //                     base64 = canvas.toDataURL(fileName.substr(file.name.lastIndexOf('.') + 1), 1);
        //                     fixedFile = vueThis.dataURLtoFile(base64, fileName);
        //                     resolve(fixedFile);
        //                 }
        //             }
        //             oReader.readAsDataURL(file);
        //         })
        //     }).catch(msg => {
        //         console.log(msg);
        //     })
        // },



        // rotateImg(img, direction, canvas) {
        //     //alert(img);
        //     //最小与最大旋转方向，图片旋转4次后回到原方向
        //     var min_step = 0;
        //     var max_step = 3;
        //     //var img = document.getElementById(pid);
        //     if (img == null) return;
        //     //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        //     var height = img.height;
        //     var width = img.width;
        //     //var step = img.getAttribute('step');
        //     var step = 2;
        //     if (step == null) {
        //         step = min_step;
        //     }
        //     if (direction == 'right') {
        //         step++;
        //         //旋转到原位置，即超过最大值
        //         step > max_step && (step = min_step);
        //     } else {
        //         step--;
        //         step < min_step && (step = max_step);
        //     }
        //     //旋转角度以弧度值为参数
        //     var degree = step * 90 * Math.PI / 180;
        //     var ctx = canvas.getContext('2d');
        //     switch (step) {
        //         case 0:
        //             canvas.width = width;
        //             canvas.height = height;
        //             ctx.drawImage(img, 0, 0);
        //             break;
        //         case 1:
        //             canvas.width = height;
        //             canvas.height = width;
        //             ctx.rotate(degree);
        //             ctx.drawImage(img, 0, -height);
        //             break;
        //         case 2:
        //             canvas.width = width;
        //             canvas.height = height;
        //             ctx.rotate(degree);
        //             ctx.drawImage(img, -width, -height);
        //             break;
        //         case 3:
        //             canvas.width = height;
        //             canvas.height = width;
        //             ctx.rotate(degree);
        //             ctx.drawImage(img, -width, 0);
        //             break;
        //     }
        //     ctx.save();
        // },


        // dataURLtoFile: (dataurl, filename) => {
        //     const arr = dataurl.split(',')
        //     const mime = arr[0].match(/:(.*?);/)[1]
        //     const bstr = atob(arr[1])
        //     let n = bstr.length
        //     let u8arr = new Uint8Array(n);
        //     while (n--) {
        //         u8arr[n] = bstr.charCodeAt(n);
        //     }
        //     return new File([u8arr], filename, {type: mime});
        // },


        utf16toEntities(str) {
            const patt = /[\ud800-\udbff][\udc00-\udfff]/g; // 检测utf16字符正则
            str = str.replace(patt, (char) => {
                let H;
                let L;
                let code;
                let s;

                if (char.length === 2) {
                    H = char.charCodeAt(0); // 取出高位
                    L = char.charCodeAt(1); // 取出低位
                    code = (H - 0xD800) * 0x400 + 0x10000 + L - 0xDC00; // 转换算法
                    s = `&#${code};`;
                } else {
                    s = char;
                }

                return s;
            });

            return str;
        }
        ,

        entitiestoUtf16(strObj) {
            const patt = /&#\d+;/g;
            const arr = strObj.match(patt) || [];

            let H;
            let L;
            let code;

            for (let i = 0; i < arr.length; i += 1) {
                code = arr[i];
                code = code.replace('&#', '').replace(';', '');
                // 高位
                H = Math.floor((code - 0x10000) / 0x400) + 0xD800;
                // 低位
                L = ((code - 0x10000) % 0x400) + 0xDC00;
                code = `&#${code};`;
                const s = String.fromCharCode(H, L);
                strObj = strObj.replace(code, s);
            }
            return strObj;
        }
        ,

        beautifyTime: function (timeStr) {
            // var timeStr = this.postCardData.post.postTime;
            if (timeStr === null) return "";
            if (timeStr === "刚刚") return timeStr;
            var year = timeStr.substring(0, 4)
            var month = timeStr.substring(5, 7)
            var day = timeStr.substring(8, 10)
            var time = timeStr.substring(11, 16)
            // var date = new Date(month + " " + day + "," + year + " " + time)
            var now = new Date();
            // var diffInHour = (now.getTime() - date.getTime()) / (1000*3600);
            var diffDay = now.getDate() - day;
            if (diffDay === 0) {
                return time;
            } else if (diffDay <= 7) {
                return month + "-" + day + " " + time;
            } else if (diffDay <= 365) {
                return month + "-" + day;
            } else {
                return year + "-" + month;
            }
        },

        encryptPsw(data) {
            var encrypt = new JSEncrypt();
            encrypt.setPublicKey(this.publicKey);
            var encodedData = encrypt.encrypt(data);
            console.log(encodedData)
            return encodedData;
        },
    },


})

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
