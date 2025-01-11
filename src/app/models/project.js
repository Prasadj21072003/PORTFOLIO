import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true, // Ensures the image field is mandatory
  },
  title: {
    type: String,
    required: true, // Ensures the title field is mandatory
  },
  href: {
    type: String,
    required: true, // Ensures the href field is mandatory
  },
  info: {
    type: [String], // Defines an array of strings
    required: true, // Ensures the info field is mandatory
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time
  },
});

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
