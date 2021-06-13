module.exports = {
  app: {
    port: 28087,
    supported_formats: {
      jpg: "image/jpeg",
      webp: "image/webp",
      avif: "image/avif",
    },
    path_prefix: {
      local: "/", //any path information that precedes endpoints. Must include a trailing slash
      stage: "/", //any path information that precedes endpoints. Must include a trailing slash
      prod: "/", //any path information that precedes endpoints. Must include a trailing slash
    },
  },

  //list of domains that are allowed origins for this service
  domains: [],
};
