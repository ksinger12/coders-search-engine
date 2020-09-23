const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/url", {
      target: "http://my-link", //note that this is just the start of the link. The rest is in the code
      changeOrigin: true,
      /*
            pathRewrite: {
                "^/part-to-remove-from-url": "",
            }
             */
    })
  );
  //To change the path before loading use pathRewrite
};
