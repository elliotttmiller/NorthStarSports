import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService.js";
import { success, error } from "../utils/responseFormatter.js";

export async function getUser(
  req: Request,
  res: Response,
): Promise<void> {
  const userId = req.params.userId;
  if (!userId) {
    logWarn("Missing userId parameter");
    res.status(400).json(error("Missing userId parameter", 400));
    return;
  }

  logInfo("getUser called", { userId });
  try {
    const user = await userService.getUser(userId);
    if (!user) {
      logWarn("User not found", { userId });
      res.status(404).json(error("User not found", 404));
      return;
    }
    logInfo("getUser success", { user });
    res.json(success(user));
  } catch (err) {
  }
}

export async function setUser(
  req: Request,
  res: Response,
): Promise<void> {
  const userId = req.params.userId;
  if (!userId) {
    logWarn("Missing userId parameter");
    res.status(400).json(error("Missing userId parameter", 400));
    return;
  }

  logInfo("setUser called", { userId });
  try {
    await userService.setUser(userId, req.body);
    logInfo("setUser success", { userId });
    res.json(success({ userId }));
  } catch (err) {
  }
}
