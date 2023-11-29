const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        createProxyMiddleware("/api", {
            target: "https://team-recruit-project.onrender.com",
            changeOrigin: true,
        })
    );
};
