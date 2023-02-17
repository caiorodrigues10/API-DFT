import "reflect-metadata";
import "./shared/container";
import "./shared/container/providers";
import { UserRoutes } from "./routes/userRoutes";
import { App } from "./shared/app";

const app = new App({
  routes: [UserRoutes],
});

app.listen();
