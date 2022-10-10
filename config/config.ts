// import { defineConfig } from 'umi';

// export const config = defineConfig({
//   layout: {
//     name: 'INLY',
//     locale: true,
//     layout: 'side'
//   },
// });

export default {
  hash: true,
  plugins: [
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
      },
    ],
  ],
};
