import { NextResponse } from "next/server";
import mongoose from "mongoose";
import project from "@/app/models/project";
import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: process.env.REDIS_PORT,
});
redis.on("connect", () => {
  console.log("redis connected");
});

//connecting to mongodb
const connectdb = async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  mongoose.connection.on("connected", () => console.log("MongoDB connected!"));
  mongoose.connection.on("error", (err) =>
    console.log("DB connection error:", err)
  );
};
connectdb();

//making get api
export async function GET() {
  try {
    const cachedProjects = await redis.get("projects");

    if (cachedProjects) {
      console.log("Returning cached projects");
      return NextResponse.json(JSON.parse(cachedProjects));
    }

    // If not cached, fetch from the database
    const Projects = await project.find().sort({ _id: -1 });
    console.log("Fetched projects from database:");

    // Cache the result in Redis for future requests
    await redis.set("projects", JSON.stringify(Projects)); // Cache for 1 hour (3600 seconds)

    return NextResponse.json(Projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//making post api
export async function POST(req) {
  try {
    const pass = req.headers.get("pass");
    if (pass === process.env.PASSWORD) {
      const body = await req.json();
      const { img, href, title, info } = body;
      if (!img || !href || !title || !info) {
        return NextResponse.json(
          { error: "Project details are required" },
          { status: 400 }
        );
      }
      const Project = new project({
        img,
        href,
        title,
        info,
      });
      await Project.save();

      // Clear Redis cache after saving the project
      const cachedProjects = await redis.get("projects");
      if (cachedProjects) {
        await redis.del("projects");
        console.log("Redis cache cleared for key: projects");
      }

      return NextResponse.json(Project);
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//making put api
export async function PUT(req) {
  try {
    const pass = req.headers.get("pass");
    if (pass === process.env.PASSWORD) {
      const body = await req.json();
      const { _id, img, href, title, info } = body;

      const updatedProject = await project.findByIdAndUpdate(
        _id,
        { img, href, title, info },
        { new: true } // Return the updated document
      );

      if (!updatedProject) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }

      // Clear Redis cache after saving the project
      const cachedProjects = await redis.get("projects");
      if (cachedProjects) {
        await redis.del("projects");
        console.log("Redis cache cleared for key: projects");
      }

      return NextResponse.json(updatedProject);
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

//making delete api
export async function DELETE(req) {
  try {
    const pass = req.headers.get("pass");
    if (pass === process.env.PASSWORD) {
      const body = await req.json();
      const { _id } = body;

      if (!_id) {
        return NextResponse.json(
          { error: "Project ID is required" },
          { status: 400 }
        );
      }

      const deletedProject = await project.findByIdAndDelete(_id);

      if (!deletedProject) {
        return NextResponse.json(
          { error: "Project not found" },
          { status: 404 }
        );
      }

      // Clear Redis cache after saving the project
      const cachedProjects = await redis.get("projects");
      if (cachedProjects) {
        await redis.del("projects");
        console.log("Redis cache cleared for key: projects");
      }

      return NextResponse.json({
        message: "Project deleted successfully",
        deletedProject,
      });
    } else {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
