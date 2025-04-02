import { BlaxelMcpClientTransport, logger } from "@blaxel/sdk";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";

const transport = new BlaxelMcpClientTransport(
  'http://localhost:1338'
);

const client = new Client(
  {
    name: "mcp-client",
    version: "1.0.0"
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

async function main() {
  await client.connect(transport);
  const {tools} = await client.listTools();
  logger.info(JSON.stringify(tools));

  const result = await client.callTool({
    name:"hello_world",
    arguments:{ firstname: "John" }
  });
  logger.info(JSON.stringify(result))

  await client.close();
  process.exit(0);
}

main().catch(logger.error);
