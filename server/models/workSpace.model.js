import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },

    apiKey: {
      type: String,
      default: null,
      unique: true,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

const Workspace =
  mongoose.models.Workspace || mongoose.model('Workspace', workspaceSchema);

export default Workspace;