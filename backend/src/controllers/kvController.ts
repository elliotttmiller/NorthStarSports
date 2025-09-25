import { Request, Response } from "express";
import { kvService } from "../services/kvService.js";
import { success, error } from "../utils/responseFormatter.js";
import { logInfo, logWarn } from "../utils/logger";

export async function getKV(req: Request, res: Response): Promise<void> {
  const key = req.params.key;
  if (!key) {
    logWarn("Missing key parameter");
    res.status(400).json(error("Missing key parameter", 400));
    return;
  }
  logInfo("KV getKV called", { key });
  try {
    const value = await kvService.get(key);
    if (value === undefined) {
      logWarn("Key not found in KV store", { key });
      res.status(404).json(error("Key not found", 404));
      return;
    }
    logInfo("KV getKV success", { key });
    res.json(success(value));
  } catch {
    res.status(500).json(error("Internal server error", 500));
  }
}

export async function setKV(req: Request, res: Response): Promise<void> {
  const key = req.params.key;
  if (!key) {
    logWarn("Missing key parameter");
    res.status(400).json(error("Missing key parameter", 400));
    return;
  }
  logInfo("KV setKV called", { key });
  try {
    const value = req.body;
    await kvService.set(key, value);
    logInfo("KV setKV success", { key });
    res.json(success({ key, value }));
  } catch {
    res.status(500).json(error("Internal server error", 500));
  }
}
