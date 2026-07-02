
// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";

// // ============================================
// // 📦 Import Routes
// // ============================================
// import authRoutes from "./src/routes/authRoutes.js";
// import workerWizardRoutes from "./src/routes/workerWizardRoutes.js";

// const app = express();
// const PORT = process.env.PORT || 5001;

// // ============================================
// // 🔐 CORS Configuration
// // ============================================
// const allowedOrigins = [
//   process.env.FRONTEND_URL || "https://tradesmap.com",
//   "https://www.tradesmap.com",
//   "http://localhost:5173",
//   "http://localhost:3000",
//   "http://localhost:5174",
//   "https://tradesmap.com",  // ✅ Add this explicitly
//   "http://172.31.43.234:5173", // ✅ Server IP
//   "http://127.0.0.1:5173",     // ✅ Localhost
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     // Allow requests with no origin (like mobile apps or curl requests)
//     if (!origin) return callback(null, true);
    
//     // Check if origin is allowed
//     if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === "development") {
//       callback(null, true);
//     } else {
//       console.log(`❌ CORS blocked: ${origin}`);
//       // ✅ Allow any origin in development
//       if (process.env.NODE_ENV === "development") {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
// }));

// // ============================================
// // 📊 Middleware
// // ============================================
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// // Request logging middleware
// app.use((req, res, next) => {
//   console.log(`📡 ${req.method} ${req.url}`);
//   next();
// });

// // ============================================
// // 🛣️ Routes
// // ============================================

// // 🔐 Auth Routes (Email Verification)
// app.use("/api/auth", authRoutes);

// // 📝 Worker Wizard Routes (S3 + DynamoDB)
// app.use("/api", workerWizardRoutes);

// // ============================================
// // 🏥 Health Check
// // ============================================
// app.get("/health", (req, res) => {
//   res.json({
//     status: "OK",
//     timestamp: new Date().toISOString(),
//     environment: process.env.NODE_ENV || "development",
//     port: PORT,
//     frontend: process.env.FRONTEND_URL,
//     services: {
//       auth: "/api/auth/*",
//       wizard: "/api/wizard/*",
//       upload: "/api/upload/*",
//     },
//     aws: {
//       region: process.env.AWS_REGION,
//       bucket: process.env.S3_BUCKET_NAME || "Not configured",
//       tables: {
//         workerWizard: process.env.WORKER_WIZARD_TABLE || "WorkerWizard",
//         workers: process.env.WORKERS_TABLE || "Workers",
//       },
//     },
//   });
// });

// // ============================================
// // ❌ Error Handling Middleware
// // ============================================
// app.use((err, req, res, next) => {
//   console.error("❌ Error:", err.message);
//   console.error(err.stack);

//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || "Internal server error",
//     ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
//   });
// });

// // ============================================
// // 🚀 Start Server
// // ============================================
// app.listen(PORT, () => {
//   console.log("========================================");
//   console.log("🚀 TradesMap Backend Server");
//   console.log("========================================");
//   console.log(`📡 Server running on port: ${PORT}`);
//   console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
//   console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || "Not set"}`);
//   console.log(`📦 S3 Bucket: ${process.env.S3_BUCKET_NAME || "Not configured"}`);
//   console.log(`🔄 DynamoDB Tables:`);
//   console.log(`   - WorkerWizard: ${process.env.WORKER_WIZARD_TABLE || "WorkerWizard"}`);
//   console.log(`   - Workers: ${process.env.WORKERS_TABLE || "Workers"}`);
//   console.log(`✅ CORS enabled for: ${allowedOrigins.join(", ")}`);
//   console.log("========================================");
//   console.log("📋 Available Endpoints:");
//   console.log(`   GET  /health`);
//   console.log(`   POST /api/auth/send-email-verification`);
//   console.log(`   GET  /api/auth/verify-email`);
//   console.log(`   POST /api/wizard/step`);
//   console.log(`   GET  /api/wizard/progress/:userId`);
//   console.log(`   POST /api/wizard/complete`);
//   console.log(`   POST /api/upload/profile`);
//   console.log(`   POST /api/upload/certificate`);
//   console.log(`   GET  /api/upload/view/:fileKey`);
//   console.log(`   DELETE /api/upload/:fileKey`);
//   console.log("========================================");
// });


// index.js
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// ============================================
// 📦 Import Routes
// ============================================
import authRoutes from "./src/routes/authRoutes.js";
import workerWizardRoutes from "./src/routes/workerWizardRoutes.js";
import workerRoutes from "./src/routes/workerRoutes.js"; // ✅ ADD THIS LINE

const app = express();
const PORT = process.env.PORT || 5001;

// ============================================
// 🔐 CORS Configuration (Keep as-is)
// ============================================
const allowedOrigins = [
  process.env.FRONTEND_URL || "https://tradesmap.com",
  "https://www.tradesmap.com",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://localhost:5174",
  "https://tradesmap.com",
  "http://172.31.43.234:5173",
  "http://127.0.0.1:5173",
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === "development") {
      callback(null, true);
    } else {
      console.log(`❌ CORS blocked: ${origin}`);
      if (process.env.NODE_ENV === "development") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));

// ============================================
// 📊 Middleware
// ============================================
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.url}`);
  next();
});

// ============================================
// 🛣️ Routes
// ============================================

// 🔐 Auth Routes
app.use("/api/auth", authRoutes);

// 📝 Worker Wizard Routes
app.use("/api", workerWizardRoutes);

// 👷 Worker Profile Routes (NEW)
app.use("/api/worker", workerRoutes); // ✅ ADD THIS LINE

// ============================================
// 🏥 Health Check - UPDATE THIS
// ============================================
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    port: PORT,
    frontend: process.env.FRONTEND_URL,
    services: {
      auth: "/api/auth/*",
      wizard: "/api/wizard/*",
      upload: "/api/upload/*",
      worker: "/api/worker/*", // ✅ ADD THIS
    },
    aws: {
      region: process.env.AWS_REGION,
      bucket: process.env.S3_BUCKET_NAME || "Not configured",
      tables: {
        workerWizard: process.env.WORKER_WIZARD_TABLE || "WorkerWizard",
        workers: process.env.WORKERS_TABLE || "Workers",
      },
    },
  });
});

// ============================================
// ❌ Error Handling Middleware
// ============================================
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  console.error(err.stack);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ============================================
// 🚀 Start Server
// ============================================
app.listen(PORT, () => {
  console.log("========================================");
  console.log("🚀 TradesMap Backend Server");
  console.log("========================================");
  console.log(`📡 Server running on port: ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL || "Not set"}`);
  console.log(`📦 S3 Bucket: ${process.env.S3_BUCKET_NAME || "Not configured"}`);
  console.log(`🔄 DynamoDB Tables:`);
  console.log(`   - WorkerWizard: ${process.env.WORKER_WIZARD_TABLE || "WorkerWizard"}`);
  console.log(`   - Workers: ${process.env.WORKERS_TABLE || "Workers"}`);
  console.log(`✅ CORS enabled for: ${allowedOrigins.join(", ")}`);
  console.log("========================================");
  console.log("📋 Available Endpoints:");
  console.log(`   GET  /health`);
  console.log(`   POST /api/auth/send-email-verification`);
  console.log(`   GET  /api/auth/verify-email`);
  console.log(`   POST /api/wizard/step`);
  console.log(`   GET  /api/wizard/progress/:userId`);
  console.log(`   POST /api/wizard/complete`);
  console.log(`   POST /api/upload/profile`);
  console.log(`   POST /api/upload/certificate`);
  console.log(`   GET  /api/upload/view/:fileKey`);
  console.log(`   DELETE /api/upload/:fileKey`);
  console.log(`   👷 Worker Profile Routes (NEW):`);
  console.log(`   GET  /api/worker/profile/:userId`);
  console.log(`   PUT  /api/worker/profile/:userId`);
  console.log(`   PATCH /api/worker/profile/:userId/section/:section`);
  console.log(`   DELETE /api/worker/profile/:userId`);
  console.log(`   GET  /api/worker/email/:email`);
  console.log(`   GET  /api/worker/all`);
  console.log(`   GET  /api/worker/:userId/availability`);
  console.log(`   GET  /api/worker/:userId/trade`);
  console.log(`   GET  /api/worker/:userId/certifications`);
  console.log(`   GET  /api/worker/:userId/work-history`);
  console.log("========================================");
});