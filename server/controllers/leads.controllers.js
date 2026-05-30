import { createLeadSchema } from '../schemas/leads.schema.js';
import { findWorkspaceByUserId } from '../services/workspace.services.js';
import Leads from '../models/Leads.model.js';

export const createLeadsController = async (req, res) => {
  try {
    const workspace = req.workspace;
    if (!workspace)
      return res
        .status(404)
        .json({ success: false, message: 'workspace not found' });
    const result = createLeadSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((err) => err.message);

      return res.status(400).json({
        success: false,
        message: errors,
      });
    }

    const lead = await Leads.create({
      workspace: workspace._id,
      ...result.data,
    });

    return res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      lead,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: 'Something broke up!',
    });
  }
};

export const getLeadsController = async (req, res) => {
  try {
    const id = req.user.id;

    const workSpace = await findWorkspaceByUserId(id);

    if (!workSpace) {
      return res.status(404).json({
        success: false,
        message: 'No workspace found.',
      });
    }

    const leads = await Leads.find({
      workspace: workSpace._id,
    }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: 'Leads fetched successfully',
      total: leads.length,
      leads,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: 'Something broke up!',
    });
  }
};
