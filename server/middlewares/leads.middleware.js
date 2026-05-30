import Workspace from '../models/workspace.model.js';
export const createLeadsMiddleware = async (req, res, next) => {
  try {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey) {
      return res.status(401).json({
        success: false,
        message: 'API key is required',
      });
    }

    const cleanedApiKey = apiKey.trim();

    const workspace = await Workspace.findOne({
      apiKey: cleanedApiKey,
    });

    if (!workspace) {
      return res.status(401).json({
        success: false,
        message: 'please provide a valid api-key',
      });
    }

    if (workspace.apiKey !== cleanedApiKey) {
      return res.status(401).json({
        success: false,
        message: 'API key does not match. retry!',
      });
    }
    req.workspace = workspace;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while verifying API key',
    });
  }
};
