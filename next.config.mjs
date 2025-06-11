// https://nextjs.org/docs/app/api-reference/next-config-js
/** @type {import('next').NextConfig} */
export default {
  // Change default build directory
  distDir: "build",

  eslint: {
    // Ignore ESLint during build process
    ignoreDuringBuilds: false,
  },

  experimental: {
    // Optimize import from Mantine packages
    optimizePackageImports: [
      "@mantine/core",
      "@mantine/dates",
      "@mantine/form",
      "@mantine/hooks",
      "@mantine/notifications",
    ],

    staleTimes: {
      // Disable client-side router cache for dynamic segments
      dynamic: 0,
    },

    // Include SWC plugins
    swcPlugins: [["@lingui/swc-plugin", {}]],
  },

  // Add support for loading .po files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.po$/,
      use: {
        loader: "@lingui/loader",
      },
    });
    return config;
  },
};
