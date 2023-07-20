module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['transform-inline-environment-variables'],
    plugins: ['react-native-reanimated/plugin']
      // ['module:react-native-dotenv', {
      //   "envName": "API_KEY",
      //   "moduleName": "react-native-dotenv",
      //   "path": ".env",
      //   "allowUndefined": false
      // }] 
  }
};
// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: [['transform-inline-environment-variables'], [
//       "module:react-native-dotenv",
//       {
//         envName: "APP_ENV",
//         moduleName: "@env",
//         path: ".env"
//       }
//     ],['react-native-reanimated/plugin']
//   // ['module:react-native-dotenv', {
//   //   "envName": "API_KEY",
//   //   "moduleName": "react-native-dotenv",
//   //   "path": ".env",
//   //   "allowUndefined": false
//   // }] 
//     ]
// }
// };
