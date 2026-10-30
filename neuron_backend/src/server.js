const env = require("./config/env");
const app = require("./app");
const { connectDB } = require("./config/db");
const { ensureAdmin } = require("./services/adminService");
const { isMailConfigured } = require("./services/mailService");

async function start() {
  await connectDB();

  try {
    await ensureAdmin();
  } catch (error) {
    console.error("[Admin] Could not prepare the admin account:", error.message);
  }

  try {
    const { seedMissing } = require("./services/pageService");
    await seedMissing();
  } catch (error) {
    console.error("[Pages] Could not seed default pages:", error.message);
  }

  try {
    const { seedBlogs } = require("./services/blogService");
    const seeded = await seedBlogs();
    if (seeded) console.log(`[Blog] Imported ${seeded.posts} original posts and ${seeded.comments} comments.`);
  } catch (error) {
    console.error("[Blog] Could not import the original blog posts:", error.message);
  }

  if (!isMailConfigured()) {
    console.warn("[Mail] SMTP is not configured. Forgot password and forgot username emails cannot be sent.");
  }

  app.listen(env.port, () => {
    console.log(`Neuron backend API listening on http://localhost:${env.port}`);
  });
}

start();
