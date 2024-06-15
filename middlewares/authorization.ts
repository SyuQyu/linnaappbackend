import { Request, Response, NextFunction } from "express";
import jsonwebtoken, { TokenExpiredError } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

type TPayload = {
  userId: string;
  roleName: string;
};

const authorization = (roles: ("Admin" | "HR" | "User")[]) => {
  const normalizeRole = new Set(roles.map((r) => r.toLowerCase()));
  return (req: Request, res: Response, next: NextFunction) => {
    let userRole = "guest";
    let userName = null;
    try {
      let token: string | undefined;

      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(" ")[1];
      } else if (req.query.token) {
        token = req.query.token as string;
      } else if (req.params.token) {
        token = req.params.token;
      }

      // console.log(`Token received: ${token}`);

      if (token) {
        const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET!) as TPayload;
        userRole = decoded.roleName.toLowerCase();
        userName = decoded.userId;
        // console.log(`User role: ${userRole}, User ID: ${userName}`);
      }
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        return res.status(401).json({
          message: "Token has expired",
        });
      }
      console.error("Error verifying token:", error);
      return res.status(400).json({
        message: "Invalid token",
      });
    }
    if (normalizeRole.has(userRole)) {
      next();
    } else {
      res.status(403).json({
        message: "You don't have permission to access this resource",
      });
    }
  };
};

export default authorization;
