import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { randomUUID } from "crypto";

// Map to store servers by session ID for stateful mode
const servers = new Map<string, McpServer>();
const transports = new Map<string, WebStandardStreamableHTTPServerTransport>();

function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "aitoolhub-mcp-server",
    version: "1.0.0",
  });

  // ============ Tools CRUD ============

  server.registerTool(
    "list_tools",
    {
      title: "List AI Tools",
      description: "List AI tools from the database with optional filtering",
      inputSchema: {
        category: z.string().optional().describe("Filter by category ID"),
        pricingModel: z.string().optional().describe("Filter by pricing model: free, freemium, paid, enterprise"),
        search: z.string().optional().describe("Search by name or description"),
        limit: z.number().default(20).describe("Number of results to return"),
        offset: z.number().default(0).describe("Number of results to skip"),
      },
    },
    async ({ category, pricingModel, search, limit, offset }) => {
      try {
        const where: any = {};
        if (category) where.categoryId = category;
        if (pricingModel) where.pricingModel = pricingModel;
        if (search) {
          where.OR = [
            { name: { contains: search } },
            { nameZh: { contains: search } },
            { description: { contains: search } },
            { descriptionZh: { contains: search } },
          ];
        }

        const [tools, total] = await prisma.$transaction([
          prisma.tools.findMany({
            where,
            skip: offset,
            take: limit,
            include: {
              categories: true,
              tag_on_tool: { include: { tags: true } },
              pricing_plans: true,
            },
            orderBy: [{ isFeatured: "desc" }, { viewCount: "desc" }],
          }),
          prisma.tools.count({ where }),
        ]);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                total,
                limit,
                offset,
                tools: tools.map((t: any) => ({
                  id: t.id,
                  name: t.name,
                  nameZh: t.nameZh,
                  slug: t.slug,
                  description: t.description,
                  descriptionZh: t.descriptionZh,
                  websiteUrl: t.websiteUrl,
                  logoUrl: t.logoUrl,
                  developer: t.developer,
                  founded: t.founded,
                  platforms: t.platforms,
                  categoryId: t.categoryId,
                  category: t.categories?.name,
                  categoryZh: t.categories?.nameZh,
                  pricingModel: t.pricingModel,
                  minPrice: t.minPrice,
                  maxPrice: t.maxPrice,
                  hasFreeTrial: t.hasFreeTrial,
                  rating: t.rating,
                  reviewCount: t.reviewCount,
                  viewCount: t.viewCount,
                  monthlyVisits: t.monthlyVisits,
                  isVerified: t.isVerified,
                  isFeatured: t.isFeatured,
                  createdAt: t.createdAt,
                  updatedAt: t.updatedAt,
                  tags: t.tag_on_tool.map((tt: any) => ({
                    id: tt.tags.id,
                    name: tt.tags.name,
                    nameZh: tt.tags.nameZh,
                  })),
                  pricingPlans: t.pricing_plans,
                })),
              }),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }
  );

  server.registerTool(
    "get_tool",
    {
      title: "Get Tool Details",
      description: "Get a single AI tool by ID or slug",
      inputSchema: {
        id: z.string().optional().describe("Tool ID"),
        slug: z.string().optional().describe("Tool slug"),
      },
    },
    async ({ id, slug }) => {
      try {
        if (!id && !slug) {
          return { content: [{ type: "text", text: "Error: Either id or slug is required" }], isError: true };
        }

        const tool = await prisma.tools.findFirst({
          where: id ? { id } : { slug },
          include: {
            categories: true,
            tag_on_tool: { include: { tags: true } },
            pricing_plans: true,
            promo_codes: true,
            price_history: { orderBy: { recordedAt: "desc" }, take: 10 },
          },
        });

        if (!tool) {
          return { content: [{ type: "text", text: "Error: Tool not found" }], isError: true };
        }

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                id: tool.id,
                name: tool.name,
                nameZh: tool.nameZh,
                slug: tool.slug,
                description: tool.description,
                descriptionZh: tool.descriptionZh,
                websiteUrl: tool.websiteUrl,
                logoUrl: tool.logoUrl,
                developer: tool.developer,
                founded: tool.founded,
                platforms: tool.platforms,
                categoryId: tool.categoryId,
                category: tool.categories?.name,
                categoryZh: tool.categories?.nameZh,
                categoryDescription: tool.categories?.description,
                pricingModel: tool.pricingModel,
                minPrice: tool.minPrice,
                maxPrice: tool.maxPrice,
                hasFreeTrial: tool.hasFreeTrial,
                rating: tool.rating,
                reviewCount: tool.reviewCount,
                viewCount: tool.viewCount,
                monthlyVisits: tool.monthlyVisits,
                isVerified: tool.isVerified,
                isFeatured: tool.isFeatured,
                sourceType: tool.sourceType,
                lastPriceCheckedAt: tool.lastPriceCheckedAt,
                createdAt: tool.createdAt,
                updatedAt: tool.updatedAt,
                tags: tool.tag_on_tool.map((tt: any) => ({
                  id: tt.tags.id,
                  name: tt.tags.name,
                  nameZh: tt.tags.nameZh,
                })),
                pricingPlans: tool.pricing_plans,
                promoCodes: tool.promo_codes,
                priceHistory: tool.price_history,
              }),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }
  );

  server.registerTool(
    "create_tool",
    {
      title: "Create AI Tool",
      description: "Create a new AI tool entry in the database",
      inputSchema: {
        name: z.string().describe("Tool name in English"),
        nameZh: z.string().optional().describe("Tool name in Chinese"),
        slug: z.string().describe("Unique URL slug for the tool"),
        description: z.string().describe("Tool description in English"),
        descriptionZh: z.string().describe("Tool description in Chinese"),
        websiteUrl: z.string().describe("Tool website URL"),
        logoUrl: z.string().optional().describe("Tool logo URL"),
        developer: z.string().optional().describe("Developer name"),
        founded: z.string().optional().describe("Year founded"),
        platforms: z.string().optional().describe("Supported platforms (comma-separated)"),
        categoryId: z.string().describe("Category ID"),
        pricingModel: z.string().describe("Pricing model: free, freemium, paid, enterprise"),
        minPrice: z.number().optional().describe("Minimum price"),
        maxPrice: z.number().optional().describe("Maximum price"),
        hasFreeTrial: z.boolean().optional().default(false).describe("Has free trial"),
        monthlyVisits: z.string().optional().describe("Monthly visits"),
        isVerified: z.boolean().optional().default(false).describe("Is verified"),
        isFeatured: z.boolean().optional().default(false).describe("Is featured"),
        tagIds: z.array(z.string()).optional().describe("Array of tag IDs to associate with the tool"),
      },
    },
    async (params: any) => {
      try {
        const { tagIds, ...toolData } = params;

        const createData: any = {
          ...toolData,
          id: randomUUID(),
          sourceType: "mcp",
        };

        if (tagIds && tagIds.length > 0) {
          createData.tag_on_tool = {
            create: tagIds.map((tagId: string) => ({ tagId })),
          };
        }

        const tool = await prisma.tools.create({
          data: createData,
          include: {
            categories: true,
            tag_on_tool: { include: { tags: true } },
          },
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                message: "Tool created successfully",
                tool: {
                  id: tool.id,
                  name: tool.name,
                  slug: tool.slug,
                  categoryId: tool.categoryId,
                  category: tool.categories?.name,
                },
              }),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }
  );

  server.registerTool(
    "update_tool",
    {
      title: "Update AI Tool",
      description: "Update an existing AI tool",
      inputSchema: {
        id: z.string().describe("Tool ID to update"),
        name: z.string().optional().describe("Tool name in English"),
        nameZh: z.string().optional().describe("Tool name in Chinese"),
        slug: z.string().optional().describe("Unique URL slug"),
        description: z.string().optional().describe("Tool description in English"),
        descriptionZh: z.string().optional().describe("Tool description in Chinese"),
        websiteUrl: z.string().optional().describe("Tool website URL"),
        logoUrl: z.string().optional().describe("Tool logo URL"),
        developer: z.string().optional().describe("Developer name"),
        founded: z.string().optional().describe("Year founded"),
        platforms: z.string().optional().describe("Supported platforms"),
        categoryId: z.string().optional().describe("Category ID"),
        pricingModel: z.string().optional().describe("Pricing model"),
        minPrice: z.number().optional().describe("Minimum price"),
        maxPrice: z.number().optional().describe("Maximum price"),
        hasFreeTrial: z.boolean().optional().describe("Has free trial"),
        rating: z.number().optional().describe("Rating"),
        reviewCount: z.number().optional().describe("Review count"),
        viewCount: z.number().optional().describe("View count"),
        monthlyVisits: z.string().optional().describe("Monthly visits"),
        isVerified: z.boolean().optional().describe("Is verified"),
        isFeatured: z.boolean().optional().describe("Is featured"),
        lastPriceCheckedAt: z.string().optional().describe("Last price check date (ISO string)"),
      },
    },
    async (params: any) => {
      try {
        const { id, ...updateData } = params;

        const existing = await prisma.tools.findUnique({ where: { id } });
        if (!existing) {
          return { content: [{ type: "text", text: `Error: Tool not found with id: ${id}` }], isError: true };
        }

        const tool = await prisma.tools.update({
          where: { id },
          data: updateData,
          include: {
            categories: true,
            tag_on_tool: { include: { tags: true } },
          },
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                message: "Tool updated successfully",
                tool: {
                  id: tool.id,
                  name: tool.name,
                  slug: tool.slug,
                  updatedAt: tool.updatedAt,
                },
              }),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }
  );

  server.registerTool(
    "delete_tool",
    {
      title: "Delete AI Tool",
      description: "Delete an AI tool from the database",
      inputSchema: {
        id: z.string().describe("Tool ID to delete"),
      },
    },
    async ({ id }) => {
      try {
        const existing = await prisma.tools.findUnique({ where: { id } });
        if (!existing) {
          return { content: [{ type: "text", text: `Error: Tool not found with id: ${id}` }], isError: true };
        }

        await prisma.tools.delete({ where: { id } });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                message: `Tool "${existing.name}" deleted successfully`,
              }),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }
  );

  // ============ Pricing Plans ============

  server.registerTool(
    "add_pricing_plan",
    {
      title: "Add Pricing Plan",
      description: "Add a pricing plan to an existing tool",
      inputSchema: {
        toolId: z.string().describe("Tool ID"),
        name: z.string().describe("Plan name"),
        price: z.number().describe("Plan price"),
        billingCycle: z.string().describe("Billing cycle: monthly, annual"),
        isPopular: z.boolean().optional().default(false).describe("Is this the popular plan"),
        features: z.array(z.string()).describe("Array of feature strings"),
      },
    },
    async ({ toolId, name, price, billingCycle, isPopular, features }) => {
      try {
        const existing = await prisma.tools.findUnique({ where: { id: toolId } });
        if (!existing) {
          return { content: [{ type: "text", text: `Error: Tool not found with id: ${toolId}` }], isError: true };
        }

        const plan = await prisma.pricing_plans.create({
          data: {
            id: randomUUID(),
            toolId,
            name,
            price,
            billingCycle,
            isPopular,
            featuresJson: JSON.stringify(features),
          },
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                message: "Pricing plan added successfully",
                plan: {
                  id: plan.id,
                  name: plan.name,
                  price: plan.price,
                  billingCycle: plan.billingCycle,
                },
              }),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }
  );

  server.registerTool(
    "update_pricing_checked",
    {
      title: "Update Price Check Timestamp",
      description: "Update the last price check timestamp for a tool",
      inputSchema: {
        toolId: z.string().describe("Tool ID"),
        lastPriceCheckedAt: z.string().describe("ISO date string for when prices were last checked"),
      },
    },
    async ({ toolId, lastPriceCheckedAt }) => {
      try {
        await prisma.tools.update({
          where: { id: toolId },
          data: { lastPriceCheckedAt: new Date(lastPriceCheckedAt) },
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                message: "Price check timestamp updated",
              }),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }
  );

  // ============ Categories ============

  server.registerTool(
    "list_categories",
    {
      title: "List Categories",
      description: "List all categories",
      inputSchema: {},
    },
    async () => {
      try {
        const categories = await prisma.categories.findMany({
          include: {
            _count: { select: { tools: true } },
          },
          orderBy: { name: "asc" },
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                categories.map((c: any) => ({
                  id: c.id,
                  name: c.name,
                  nameZh: c.nameZh,
                  slug: c.slug,
                  icon: c.icon,
                  description: c.description,
                  toolCount: c._count.tools,
                }))
              ),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }
  );

  server.registerTool(
    "create_category",
    {
      title: "Create Category",
      description: "Create a new category",
      inputSchema: {
        id: z.string().optional().describe("Category ID (auto-generated if not provided)"),
        name: z.string().describe("Category name in English"),
        nameZh: z.string().optional().describe("Category name in Chinese"),
        slug: z.string().describe("Unique URL slug"),
        icon: z.string().optional().describe("Icon emoji"),
        description: z.string().optional().describe("Category description"),
      },
    },
    async ({ id, name, nameZh, slug, icon, description }: any) => {
      try {
        const category = await prisma.categories.create({
          data: {
            id: id || randomUUID(),
            name,
            nameZh,
            slug,
            icon,
            description,
          },
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                message: "Category created successfully",
                category: {
                  id: category.id,
                  name: category.name,
                  slug: category.slug,
                },
              }),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }
  );

  // ============ Tags ============

  server.registerTool(
    "list_tags",
    {
      title: "List Tags",
      description: "List all tags",
      inputSchema: {},
    },
    async () => {
      try {
        const tags = await prisma.tags.findMany({
          include: {
            _count: { select: { tag_on_tool: true } },
          },
          orderBy: { name: "asc" },
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                tags.map((t: any) => ({
                  id: t.id,
                  name: t.name,
                  nameZh: t.nameZh,
                  toolCount: t._count.tag_on_tool,
                }))
              ),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }
  );

  server.registerTool(
    "create_tag",
    {
      title: "Create Tag",
      description: "Create a new tag",
      inputSchema: {
        id: z.string().optional().describe("Tag ID (auto-generated if not provided)"),
        name: z.string().describe("Tag name in English"),
        nameZh: z.string().optional().describe("Tag name in Chinese"),
      },
    },
    async ({ id, name, nameZh }: any) => {
      try {
        const tag = await prisma.tags.create({
          data: {
            id: id || randomUUID(),
            name,
            nameZh,
          },
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                message: "Tag created successfully",
                tag: {
                  id: tag.id,
                  name: tag.name,
                  nameZh: tag.nameZh,
                },
              }),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }
  );

  server.registerTool(
    "add_tags_to_tool",
    {
      title: "Add Tags to Tool",
      description: "Add tags to an existing tool",
      inputSchema: {
        toolId: z.string().describe("Tool ID"),
        tagIds: z.array(z.string()).describe("Array of tag IDs to add"),
      },
    },
    async ({ toolId, tagIds }: any) => {
      try {
        const existing = await prisma.tools.findUnique({ where: { id: toolId } });
        if (!existing) {
          return { content: [{ type: "text", text: `Error: Tool not found with id: ${toolId}` }], isError: true };
        }

        const created = await prisma.tag_on_tool.createMany({
          data: tagIds.map((tagId: string) => ({ toolId, tagId })),
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                message: `Added ${created.count} tag(s) to tool`,
              }),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }
  );

  // ============ Submissions ============

  server.registerTool(
    "list_submissions",
    {
      title: "List Submissions",
      description: "List tool submissions",
      inputSchema: {
        status: z.string().optional().describe("Filter by status: pending, approved, rejected"),
        limit: z.number().default(20).describe("Number of results to return"),
      },
    },
    async ({ status, limit }: any) => {
      try {
        const where: any = {};
        if (status) where.status = status;

        const submissions = await prisma.tool_submissions.findMany({
          where,
          take: limit,
          orderBy: { createdAt: "desc" },
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(submissions),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }
  );

  server.registerTool(
    "approve_submission",
    {
      title: "Approve Submission",
      description: "Approve a tool submission",
      inputSchema: {
        submissionId: z.string().describe("Submission ID"),
      },
    },
    async ({ submissionId }: any) => {
      try {
        const submission = await prisma.tool_submissions.findUnique({
          where: { id: submissionId },
        });

        if (!submission) {
          return { content: [{ type: "text", text: "Error: Submission not found" }], isError: true };
        }

        await prisma.tool_submissions.update({
          where: { id: submissionId },
          data: {
            status: "approved",
            reviewedAt: new Date(),
          },
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                message: `Submission "${submission.name}" approved`,
              }),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }
  );

  // ============ Stats ============

  server.registerTool(
    "get_stats",
    {
      title: "Get Statistics",
      description: "Get database statistics",
      inputSchema: {},
    },
    async () => {
      try {
        const [toolCount, categoryCount, tagCount, submissionCount] = await Promise.all([
          prisma.tools.count(),
          prisma.categories.count(),
          prisma.tags.count(),
          prisma.tool_submissions.count(),
        ]);

        const pricingModelStats = await prisma.tools.groupBy({
          by: ["pricingModel"],
          _count: true,
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                tools: toolCount,
                categories: categoryCount,
                tags: tagCount,
                submissions: submissionCount,
                toolsByPricingModel: pricingModelStats,
              }),
            },
          ],
        };
      } catch (error: any) {
        return {
          content: [{ type: "text", text: `Error: ${error.message}` }],
          isError: true,
        };
      }
    }
  );

  return server;
}

async function getOrCreateServer(): Promise<{ server: McpServer; transport: WebStandardStreamableHTTPServerTransport; sessionId: string }> {
  // For Vercel serverless, we create a new server per invocation
  // but maintain session state via the session ID header
  const server = createMcpServer();
  const transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    onsessioninitialized: (sessionId) => {
      // Store the session for future requests
      servers.set(sessionId, server);
      transports.set(sessionId, transport);
    },
  });

  await server.connect(transport);

  return { server, transport, sessionId: transport.sessionId || "" };
}

export async function POST(request: Request) {
  try {
    const mcpSessionId = request.headers.get("mcp-session-id");

    // If we have an existing session, reuse it
    if (mcpSessionId && servers.has(mcpSessionId)) {
      const server = servers.get(mcpSessionId)!;
      const transport = transports.get(mcpSessionId)!;
      return await transport.handleRequest(request);
    }

    // Otherwise create a new server and transport
    const { transport } = await getOrCreateServer();
    return await transport.handleRequest(request);
  } catch (error: any) {
    console.error("MCP POST error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(request: Request) {
  try {
    const mcpSessionId = request.headers.get("mcp-session-id");

    if (!mcpSessionId || !servers.has(mcpSessionId)) {
      return new Response("No valid session", { status: 400 });
    }

    const transport = transports.get(mcpSessionId)!;
    return await transport.handleRequest(request);
  } catch (error: any) {
    console.error("MCP GET error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const mcpSessionId = request.headers.get("mcp-session-id");

    if (mcpSessionId) {
      const transport = transports.get(mcpSessionId);
      if (transport) {
        await transport.handleRequest(request);
      }
      servers.delete(mcpSessionId);
      transports.delete(mcpSessionId);
    }

    return new Response("Session deleted", { status: 200 });
  } catch (error: any) {
    console.error("MCP DELETE error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
