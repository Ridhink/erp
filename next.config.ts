import type { NextConfig } from "next";

// Get repository name from environment variable (set by GitHub Actions)
// Format: "username/repo-name" -> extract "repo-name"
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || process.env.REPO_NAME || 'erp';

// Only use basePath in production builds (for GitHub Pages)
// In development, basePath should be empty
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction && repoName ? `/${repoName}` : '';

const nextConfig: NextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',
  
  // Set base path for GitHub Pages (your repository name)
  // This ensures all assets and routes work correctly
  basePath: basePath,
  
  // Disable image optimization (not available in static export)
  images: {
    unoptimized: true,
  },
  
  // Ensure trailing slash for GitHub Pages compatibility
  trailingSlash: true,
  
  // Skip dynamic routes during static export (they'll be handled client-side)
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
