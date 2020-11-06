const webpack = require('webpack')

module.exports = {
  plugins:[
    new webpack.DefinePlugin({
      'process.env': {
        GIT_PERSONAL_ACCESS_TOKEN : JSON.stringify(process.env.GIT_PERSONAL_ACCESS_TOKEN)
      }
    })
  ]
}


// const webpack = require('webpack')
// const keyPrefix = 'MYAPP_';
// const keys = Object.keys(process.env).filter((key) => key.startsWith(keyPrefix));
// let env = {};
// keys.forEach(key => env[key] = JSON.stringify(process.env[key]));
// console.log('env=',env);
// module.exports = {
//   plugins: [
//     new webpack.DefinePlugin({
//       'ENV_VARS': env
//     })
//   ]
// }
