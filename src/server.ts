import { BlaxelMcpServerTransport, env, logger } from "@blaxel/sdk";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "mcp-helloworld",
  version: "1.0.0",
  description: "",
});

server.tool(
  "hello_world",
  "Say hello to a person",
  {
    firstname: z.string(),
  },
  async ({ firstname }) => {
    logger.info(`Hello world called`);
    return {
      content: [{ type: "text", text: `Hello ${firstname}` }],
    };
  }
);

function main() {
  let transport;
  if (env.BL_SERVER_PORT) {
    transport = new BlaxelMcpServerTransport();
  } else {
    transport = new StdioServerTransport();
  }
  server.connect(transport);
  logger.info("Server started");
}

main();
