import mongoose from "mongoose";
import BlogPost from "../lib/models/blog-post";

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/cloudrix";

const blogImageMap: Record<string, string> = {
  // 1. Cloud migration cost calculator
  "cloud-migration-cost-calculator-guide":
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",

  // 2. Hire cloud architect Europe
  "hire-cloud-architect-europe":
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",

  // 3. DevOps consulting guide
  "devops-consulting-guide":
    "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80",

  // 4. Technical due diligence checklist M&A
  "technical-due-diligence-checklist-ma":
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80",

  // 5. AWS vs Azure vs GCP Europe
  "aws-vs-azure-vs-gcp-europe":
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",

  // 6. How to reduce AWS bill 40%
  "how-to-reduce-aws-bill-40-percent":
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",

  // 7. Signs legacy system needs modernization
  "signs-legacy-system-needs-modernization":
    "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80",

  // 8. Why cloud migration failed 7 mistakes
  "why-cloud-migration-failed-7-mistakes":
    "https://images.unsplash.com/photo-1594322436404-5a0526db4d13?w=800&q=80",

  // 9. Toptal vs boutique agencies comparison
  "toptal-vs-boutique-agencies-comparison":
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",

  // 10. In-house vs outsourced development EU cost
  "in-house-vs-outsourced-development-eu-cost":
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=800&q=80",

  // 11. Nearshore vs offshore Netherlands teams
  "nearshore-vs-offshore-netherlands-teams":
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",

  // 12. True cost of technical debt
  "true-cost-technical-debt":
    "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",

  // 13. LLM integration enterprise architecture guide
  "llm-integration-enterprise-architecture-guide":
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",

  // 14. How to build RAG system guide
  "how-to-build-rag-system-guide":
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",

  // 15. AI strategy European companies GDPR
  "ai-strategy-european-companies-gdpr":
    "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80",

  // 16. AI automation real use cases ROI
  "ai-automation-real-use-cases-roi":
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80",
};

async function updateBlogImages() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    let updated = 0;
    let notFound = 0;

    for (const [slug, imageUrl] of Object.entries(blogImageMap)) {
      const result = await BlogPost.updateOne(
        { slug },
        { $set: { featuredImage: imageUrl } }
      );

      if (result.matchedCount > 0) {
        console.log(`Updated: ${slug}`);
        updated++;
      } else {
        console.log(`Not found: ${slug}`);
        notFound++;
      }
    }

    console.log(`\nDone. Updated: ${updated}, Not found: ${notFound}`);
  } catch (error) {
    console.error("Error updating blog images:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

updateBlogImages();
