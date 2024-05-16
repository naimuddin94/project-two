import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  const a = 56;
  res.send("server is running 🚀" + a);
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const error= new Error(`can't find ${req.originalUrl} on the server`);
  next(error);
});

app.use((error: Error, req: Request, res: Response) => {
  if (error) {
    res
      .status(500)
      .json({ success: false, message: error.message, stack: error.stack });
  }
});

export default app;
