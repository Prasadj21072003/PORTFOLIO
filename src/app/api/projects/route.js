import { NextResponse } from "next/server";
import mongoose from "mongoose";
import project from "@/app/models/project";
import Redis from "ioredis";

/* ---------- MongoDB Connection (Cached) ---------- */
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) throw new Error("Missing MONGODB_URI in environment");

let cachedMongo = global.mongoose;
if (!cachedMongo) {
  cachedMongo = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cachedMongo.conn) return cachedMongo.conn;
  if (!cachedMongo.promise) {
    cachedMongo.promise = mongoose
      .connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((mongoose) => mongoose);
  }
  cachedMongo.conn = await cachedMongo.promise;
  return cachedMongo.conn;
}

/* ---------- Redis Connection (Cached) ---------- */
if (!global.redis) {
  global.redis = new Redis({
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
    port: process.env.REDIS_PORT,
  });
  global.redis.on("connect", () => console.log("Redis connected"));
}
const redis = global.redis;

/* ---------- GET API ---------- */
export async function GET() {
  try {
    await connectDB();

    const cachedProjects = await redis.get("projects");
    if (cachedProjects) {
      console.log("Returning cached projects");
      return NextResponse.json(JSON.parse(cachedProjects));
    }

    const Projects = await project.find().sort({ _id: -1 });
    await redis.set("projects", JSON.stringify(Projects), "EX", 3600); // cache for 1 hour

    return NextResponse.json(Projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/* ---------- POST API ---------- */
export async function POST(req) {
  try {
    await connectDB();

    const pass = req.headers.get("pass");
    if (pass !== process.env.PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { img, href, title, info } = body;
    if (!img || !href || !title || !info) {
      return NextResponse.json({ error: "Project details are required" }, { status: 400 });
    }

    const Project = new project({ img, href, title, info });
    await Project.save();

    await redis.del("projects"); // Clear cache
    console.log("Redis cache cleared for key: projects");

    return NextResponse.json(Project);
  } catch (err) {
    console.error("Error creating project:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/* ---------- PUT API ---------- */
export async function PUT(req) {
  try {
    await connectDB();

    const pass = req.headers.get("pass");
    if (pass !== process.env.PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { _id, img, href, title, info } = body;

    const updatedProject = await project.findByIdAndUpdate(
      _id,
      { img, href, title, info },
      { new: true }
    );

    if (!updatedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await redis.del("projects");
    console.log("Redis cache cleared for key: projects");

    return NextResponse.json(updatedProject);
  } catch (err) {
    console.error("Error updating project:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

/* ---------- DELETE API ---------- */
export async function DELETE(req) {
  try {
    await connectDB();

    const pass = req.headers.get("pass");
    if (pass !== process.env.PASSWORD) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { _id } = body;

    if (!_id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const deletedProject = await project.findByIdAndDelete(_id);
    if (!deletedProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await redis.del("projects");
    console.log("Redis cache cleared for key: projects");

    return NextResponse.json({ message: "Project deleted successfully", deletedProject });
  } catch (err) {
    console.error("Error deleting project:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
