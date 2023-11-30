const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: "https://team-recruit-project.onrender.com",
            changeOrigin: true,
        })
    );
};
