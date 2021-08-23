

// 使用 vue-cli 配置跨域，完美解决 chrome 的 samesite 限制
module.exports = {

    devServer: {
        proxy : {
            'api': {
                // 本机测试
                // target: "http://localhost:8080",
                // 移动端测试
                target: "http://192.168.1.103:8080",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "",
                }
            }
        }
    }

}