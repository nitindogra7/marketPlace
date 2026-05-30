import Workspace from '../models/workspace.model.js';
import { generateApiKey } from '../services/workspace.services.js';
import { findUserById } from '../services/auth.services.js';
import { findWorkspaceByUserId } from '../services/workspace.services.js';

export const getWorkspace = async (req, res) => {
  try {
    const id = req.user.id;

    const userdata = await findUserById(id);

    if (!userdata) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        username: userdata.username,
        role: userdata.role,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

export const generateApi = async (req, res) => {
  try {
    const id = req.user.id;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: 'Access denied',
      });
    }

    const apiKey = generateApiKey();

    let workspace = await findWorkspaceByUserId(id);

    if (workspace) {
      workspace.apiKey = apiKey;
      await workspace.save();
    } else {
      workspace = await Workspace.create({
        user: id,
        apiKey,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'API key generated successfully',
      apiKey: workspace.apiKey,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getApiKey = async (req, res) => {
  try {
    const id = req.user.id;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: 'Access denied',
      });
    }

    const workspace = await findWorkspaceByUserId(id);

    if (!workspace || !workspace.apiKey) {
      return res.status(200).json({
        success: true,
        apiKey: null,
        message: 'No API key generated yet',
      });
    }

    return res.status(200).json({
      success: true,
      apiKey: workspace.apiKey,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};
