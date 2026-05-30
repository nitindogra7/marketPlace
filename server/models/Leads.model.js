import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    workspace: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
      index: true,
    },
    
    name: {
      type: String,
      trim: true,
      default: "Unknown Lead",
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },

    phone: {
      type: String,
      trim: true,
      default: null,
    },

    message: {
      type: String,
      trim: true,
      default: "",
    },

    source: {
      type: String,
      trim: true,
      default: "website",
    },

    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "proposal", "won", "lost"],
      default: "new",
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    notes: [
      {
        text: {
          type: String,
          required: true,
          trim: true,
        },
        createdBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          default: null,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    customFields: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model("Lead", leadSchema);

export default Lead;