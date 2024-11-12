const { withExpo } = require('@expo/webpack-config');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

module.exports = async function (env, argv) {
  const config = await withExpo(env, argv);
  
  // Configura el service worker para PWA
  if (config.mode === 'production') {
    config.output.publicPath = './'; // Necesario para que el service worker funcione bien con rutas relativas
    
    // Añadir el plugin de Workbox para inyectar el service worker
    config.plugins.push(
      new WorkboxWebpackPlugin.InjectManifest({
        swSrc: './src/service-worker.js', // Ruta a tu archivo service-worker.js
        swDest: 'service-worker.js', // Nombre de salida para el service worker
      })
    );
  }

  return config;
};
