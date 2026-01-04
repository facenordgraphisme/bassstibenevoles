export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

if (!projectId) {
  console.error("❌ Project ID is missing!");
  console.error("Ensure .env.local exists in root and contains NEXT_PUBLIC_SANITY_PROJECT_ID");
} else {
  console.log("✅ Project ID loaded:", projectId);
}

export const useCdn = false
