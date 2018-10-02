module.exports = (baseConfig, env, config) => {
  // add typescript loader:
  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    use: [
      require.resolve("ts-loader"),
    ]
  });
  config.resolve.extensions.push(".ts", ".tsx");

  return config;
};
