/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "netby",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const netbyLambda = new sst.aws.Function("NetbyLambda", {
      handler: "./src/index.handler",
      runtime: "nodejs22.x",
      architecture: "arm64",
      url: true,
      environment: {
        SUPABASE_URL: process.env.SUPABASE_URL!,
        SUPABASE_KEY: process.env.SUPABASE_KEY!,
      },
    });

    return {
      url: netbyLambda.url,
    };
  },
});
