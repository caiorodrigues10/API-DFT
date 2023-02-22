import "reflect-metadata";
import "./shared/container";
import "./shared/container/providers";
import { UserRoutes } from "./routes/userRoutes";
import { App } from "./shared/app";
import { CodeRoutes } from "./routes/confirmCode";

const app = new App({
  routes: [UserRoutes, CodeRoutes],
});

app.listen();
