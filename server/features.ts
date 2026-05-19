import { z } from "zod";
import { protectedProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { TRPCError } from "@trpc/server";

/**
 * Brand Voice & Settings Router
 */
export const brandVoiceRouter = router({
  get: protectedProcedure.query(async ({ ctx }) => {
    // TODO: Fetch from database
    return {
      userId: ctx.user.id,
      niche: "Tech Startups",
      targetAudience: "Young entrepreneurs and tech enthusiasts",
      tone: "professional",
      contentPillars: ["Innovation", "Growth", "Community"],
      connectedPlatforms: ["Instagram", "TikTok", "X", "LinkedIn"],
    };
  }),

  update: protectedProcedure
    .input(
      z.object({
        niche: z.string().optional(),
        targetAudience: z.string().optional(),
        tone: z.string().optional(),
        contentPillars: z.array(z.string()).optional(),
        connectedPlatforms: z.array(z.enum(["Instagram", "TikTok", "X", "LinkedIn"])).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: Save to database
      return { success: true, data: { userId: ctx.user.id, ...input } };
    }),
});

/**
 * Trends Router
 */
export const trendsRouter = router({
  getTrending: protectedProcedure
    .input(
      z.object({
        platform: z.enum(["Instagram", "TikTok", "X", "LinkedIn", "General"]).optional(),
        limit: z.number().default(10),
      })
    )
    .query(async ({ input }) => {
      // Mock trending data - in production, integrate with Data API
      const mockTrends = [
        {
          id: 1,
          keyword: "#AI",
          platform: "General",
          growthRate: 128,
          volume: 5000000,
          category: "Technology",
          relatedKeywords: ["Artificial Intelligence", "Machine Learning", "ChatGPT"],
        },
        {
          id: 2,
          keyword: "#TechStartup",
          platform: "LinkedIn",
          growthRate: 85,
          volume: 2500000,
          category: "Business",
          relatedKeywords: ["Entrepreneurship", "Venture Capital", "Innovation"],
        },
        {
          id: 3,
          keyword: "#SocialGrowth",
          platform: "Instagram",
          growthRate: 64,
          volume: 1800000,
          category: "Marketing",
          relatedKeywords: ["Content Strategy", "Engagement", "Followers"],
        },
        {
          id: 4,
          keyword: "#ContentCreator",
          platform: "TikTok",
          growthRate: 95,
          volume: 3200000,
          category: "Entertainment",
          relatedKeywords: ["Viral", "Trending", "Creator Economy"],
        },
        {
          id: 5,
          keyword: "#DigitalMarketing",
          platform: "X",
          growthRate: 72,
          volume: 2100000,
          category: "Marketing",
          relatedKeywords: ["SEO", "Social Media", "Analytics"],
        },
      ];

      return mockTrends.slice(0, input.limit);
    }),

  searchByKeyword: protectedProcedure
    .input(z.object({ keyword: z.string() }))
    .query(async ({ input }) => {
      // TODO: Integrate with Data API for real search
      return {
        keyword: input.keyword,
        results: [
          {
            id: 1,
            keyword: input.keyword,
            platform: "General",
            growthRate: 45,
            volume: 1200000,
          },
        ],
      };
    }),
});

/**
 * Content Generation Router
 */
export const contentRouter = router({
  generatePost: protectedProcedure
    .input(
      z.object({
        trend: z.string(),
        platform: z.enum(["Instagram", "TikTok", "X", "LinkedIn"]),
        tone: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `You are a social media content expert. Generate a compelling ${input.platform} post about "${input.trend}". 
              Tone: ${input.tone || "professional"}. 
              Keep it concise and engaging. Include relevant emojis.`,
            },
            {
              role: "user",
              content: `Create a ${input.platform} post about the trending topic: ${input.trend}`,
            },
          ],
        });

        const content = typeof response.choices[0]?.message.content === 'string' 
          ? response.choices[0].message.content 
          : '';

        return {
          success: true,
          content,
          platform: input.platform,
          contentType: "post",
          trendId: 1, // TODO: Map from actual trend
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate post",
        });
      }
    }),

  generateScript: protectedProcedure
    .input(
      z.object({
        trend: z.string(),
        platform: z.enum(["Instagram", "TikTok", "X", "LinkedIn"]),
        videoDuration: z.number().optional(),
        tone: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `You are a video script writer. Generate a ${input.videoDuration || 30}-second video script for ${input.platform} about "${input.trend}".
              Format the response as JSON with three fields: hook (0-3 seconds), body (3-25 seconds), cta (25-30 seconds).
              Tone: ${input.tone || "engaging"}.
              Make it viral-worthy and platform-optimized.`,
            },
            {
              role: "user",
              content: `Create a video script about: ${input.trend}`,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "video_script",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  hook: { type: "string", description: "Opening hook (0-3 seconds)" },
                  body: { type: "string", description: "Main content (3-25 seconds)" },
                  cta: { type: "string", description: "Call to action (25-30 seconds)" },
                },
                required: ["hook", "body", "cta"],
                additionalProperties: false,
              },
            },
          },
        });

        const scriptText = typeof response.choices[0]?.message.content === 'string'
          ? response.choices[0].message.content
          : '{}';
        const script = JSON.parse(scriptText);

        return {
          success: true,
          hook: script.hook,
          body: script.body,
          cta: script.cta,
          platform: input.platform,
          contentType: "script",
          trendId: 1, // TODO: Map from actual trend
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate script",
        });
      }
    }),

  generateCaption: protectedProcedure
    .input(
      z.object({
        trend: z.string(),
        platform: z.enum(["Instagram", "TikTok", "X", "LinkedIn"]),
        includeEmojis: z.boolean().default(true),
        tone: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `Generate a captivating ${input.platform} caption about "${input.trend}".
              ${input.includeEmojis ? "Include relevant emojis." : "No emojis."}
              Tone: ${input.tone || "engaging"}.
              Keep it under 150 characters for X, under 2200 for Instagram/LinkedIn, under 150 for TikTok.`,
            },
            {
              role: "user",
              content: `Create a caption for: ${input.trend}`,
            },
          ],
        });

        const caption = response.choices[0]?.message.content || "";

        return {
          success: true,
          caption,
          platform: input.platform,
          contentType: "caption",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate caption",
        });
      }
    }),

  generateHashtags: protectedProcedure
    .input(
      z.object({
        trend: z.string(),
        platform: z.enum(["Instagram", "TikTok", "X", "LinkedIn"]),
        count: z.number().default(10),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const response = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `Generate ${input.count} relevant hashtags for ${input.platform} about "${input.trend}".
              Return as a JSON array of strings, each starting with #.
              Optimize for reach and relevance on ${input.platform}.`,
            },
            {
              role: "user",
              content: `Generate hashtags for: ${input.trend}`,
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "hashtags",
              strict: true,
              schema: {
                type: "array",
                items: { type: "string" },
              },
            },
          },
        });

        const hashtagsText = typeof response.choices[0]?.message.content === 'string'
          ? response.choices[0].message.content
          : '[]';
        const hashtags = JSON.parse(hashtagsText);

        return {
          success: true,
          hashtags: Array.isArray(hashtags) ? hashtags : [],
          platform: input.platform,
          contentType: "hashtags",
        };
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate hashtags",
        });
      }
    }),
});

/**
 * Calendar & Scheduling Router
 */
export const calendarRouter = router({
  getScheduled: protectedProcedure
    .input(
      z.object({
        startDate: z.date(),
        endDate: z.date(),
        platform: z.enum(["Instagram", "TikTok", "X", "LinkedIn"]).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      // TODO: Fetch from database
      return {
        items: [
          {
            id: 1,
            date: new Date(),
            platform: "Instagram",
            content: "Sample scheduled post",
            status: "scheduled",
          },
        ],
      };
    }),

  scheduleContent: protectedProcedure
    .input(
      z.object({
        contentId: z.number(),
        scheduledDate: z.date(),
        platform: z.enum(["Instagram", "TikTok", "X", "LinkedIn"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: Save to database
      return { success: true, scheduledDate: input.scheduledDate };
    }),
});

/**
 * Content Library Router
 */
export const libraryRouter = router({
  getSaved: protectedProcedure
    .input(
      z.object({
        platform: z.enum(["Instagram", "TikTok", "X", "LinkedIn"]).optional(),
        status: z.enum(["draft", "scheduled", "published"]).optional(),
        search: z.string().optional(),
        limit: z.number().default(20),
        offset: z.number().default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      // TODO: Fetch from database with filters
      return {
        items: [],
        total: 0,
      };
    }),

  saveContent: protectedProcedure
    .input(
      z.object({
        contentText: z.string(),
        platform: z.enum(["Instagram", "TikTok", "X", "LinkedIn"]),
        contentType: z.enum(["post", "script", "caption", "hashtags"]),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: Save to database
      return { success: true, id: 1 };
    }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        contentId: z.number(),
        status: z.enum(["draft", "scheduled", "published"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // TODO: Update in database
      return { success: true };
    }),

  deleteContent: protectedProcedure
    .input(z.object({ contentId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // TODO: Delete from database
      return { success: true };
    }),
});

/**
 * Daily Briefing Router
 */
export const briefingRouter = router({
  getDaily: protectedProcedure.query(async ({ ctx }) => {
    // TODO: Fetch from database or generate if not exists today
    return {
      id: 1,
      recommendedTopics: [
        { topic: "AI Trends", relevance: "high" },
        { topic: "Content Strategy", relevance: "medium" },
      ],
      postingTimes: {
        Instagram: "9:00 AM",
        TikTok: "7:00 PM",
        X: "10:00 AM",
        LinkedIn: "8:00 AM",
      },
      contentSuggestions: [
        { type: "Reel", platform: "Instagram", topic: "AI Trends" },
        { type: "Short Video", platform: "TikTok", topic: "Content Strategy" },
      ],
      generatedAt: new Date(),
    };
  }),

  generate: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const response = await invokeLLM({
        messages: [
          {
            role: "system",
            content: `Generate a daily social media strategy briefing. Return as JSON with:
            - recommendedTopics: array of {topic, relevance}
            - postingTimes: object with platform: time
            - contentSuggestions: array of {type, platform, topic}
            Focus on trending topics and optimal posting times.`,
          },
          {
            role: "user",
            content: "Generate today's social media strategy briefing",
          },
        ],
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "daily_briefing",
            strict: true,
            schema: {
              type: "object",
              properties: {
                recommendedTopics: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      topic: { type: "string" },
                      relevance: { type: "string" },
                    },
                  },
                },
                postingTimes: { type: "object" },
                contentSuggestions: { type: "array" },
              },
              required: ["recommendedTopics", "postingTimes", "contentSuggestions"],
            },
          },
        },
      });

      const briefingText = typeof response.choices[0]?.message.content === 'string'
        ? response.choices[0].message.content
        : '{}';
      const briefing = JSON.parse(briefingText);

      // TODO: Save to database
      return { success: true, briefing };
    } catch (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to generate briefing",
      });
    }
  }),
});
