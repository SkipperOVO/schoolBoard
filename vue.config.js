

// 使用 vue-cli 配置跨域，完美解决 chrome 的 samesite 限制
module.exports = {

    devServer: {
        proxy : {
            'api': {
                target: "http://localhost:8080",
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "",
                }
            }
        }
    }

}