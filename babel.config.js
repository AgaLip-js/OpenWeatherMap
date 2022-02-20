const plugins = ["@babel/plugin-transform-runtime"];
if (process.env.NODE_ENV !== "production") {
    plugins.push("react-refresh/babel");
}

module.exports = {
    presets: [
        [
            "@babel/preset-typescript",
            {
                runtime: "automatic",
            },
        ],
        [
            "@babel/preset-react",
            {
                runtime: "automatic",
            },
        ],
        "@babel/preset-env",
    ],
    plugins,
};
