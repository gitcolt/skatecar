const path = require('path')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: require.resolve('./node_modules/cannon/tools/threejs/CannonDebugRenderer.js'),
                use: 'exports-loader?CannonDebugRenderer=THREE.CannonDebugRenderer'
            },
            {
                test: require.resolve('./node_modules/cannon/tools/threejs/CannonDebugRenderer.js'),
                use: 'imports-loader?THREE=three,CANNON=cannon'
            }
        ]
    }
};
