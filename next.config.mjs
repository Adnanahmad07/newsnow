// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;



// next.config.mjs
const nextConfig = {
    images: {
        domains: [
            "static-gi.asianetnews.com", // Existing domain
            "media.assettype.com", // Add this new domain
            // Add other domains if needed
        ],
    },
};

export default nextConfig;