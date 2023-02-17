import fastify, { FastifyInstance } from "fastify";

class App {
  public app: FastifyInstance;
  public appDomain: string = "localhost";
  public appPort: number = 3333;

  constructor(appInit: { routes: any }) {
    this.app = fastify({
      ajv: {
        customOptions: { allErrors: true },
      },
      schemaErrorFormatter: (errors) => {
        const myErrorMessage = errors
          .map((error) => error.message && error.message.trim())
          .join(", ");

        return new Error(myErrorMessage);
      },
      logger: true,
    });

    // this.register(appInit.plugins);

    this.routes(appInit.routes);
  }

  private async register(plugins: any) {
    plugins.forEach(async (plugin: any) => {
      await this.app.register(plugin);
    });
  }

  public routes(routes: any) {
    routes.forEach((Route: any) => {
      const router = new Route();

      this.app.register(router.routes, {
        prefix: `${router.prefixRoute}`,
      });
    });
  }

  public async listen() {
    try {
      this.app.ready((err) => {
        if (err) {
          this.app.log.error(err);
          process.exit(1);
        }
      });
      await this.app.listen({ port: this.appPort, host: "0.0.0.0" });
      this.app.log.info(
        `App listening on the http://${this.appDomain}:${this.appPort}`
      );
    } catch (err) {
      this.app.log.error(err);
      process.exit(1);
    }
  }
}

export { App };
