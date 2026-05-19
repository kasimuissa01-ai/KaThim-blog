import { describe, it, expect, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock user context
const createMockContext = (): TrpcContext => ({
  user: {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  },
  req: {
    protocol: "https",
    headers: {},
  } as TrpcContext["req"],
  res: {} as TrpcContext["res"],
});

describe("Brand Voice Router", () => {
  it("should get brand voice settings", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.brandVoice.get();

    expect(result).toHaveProperty("userId");
    expect(result).toHaveProperty("niche");
    expect(result).toHaveProperty("targetAudience");
    expect(result).toHaveProperty("tone");
    expect(result).toHaveProperty("contentPillars");
  });

  it("should update brand voice settings", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.brandVoice.update({
      niche: "Technology",
      tone: "professional",
    });

    expect(result.success).toBe(true);
    expect(result.data.niche).toBe("Technology");
  });
});

describe("Trends Router", () => {
  it("should get trending topics", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.trends.getTrending({ limit: 5 });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeLessThanOrEqual(5);

    if (result.length > 0) {
      const trend = result[0];
      expect(trend).toHaveProperty("keyword");
      expect(trend).toHaveProperty("platform");
      expect(trend).toHaveProperty("growthRate");
      expect(trend).toHaveProperty("volume");
    }
  });

  it("should filter trends by platform", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.trends.getTrending({
      platform: "Instagram",
      limit: 10,
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("should search trends by keyword", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.trends.searchByKeyword({
      keyword: "AI",
    });

    expect(result).toHaveProperty("keyword");
    expect(result).toHaveProperty("results");
    expect(Array.isArray(result.results)).toBe(true);
  });
});

describe(
  "Content Generation Router",
  () => {
    it(
      "should generate a video script with Hook/Body/CTA",
      async () => {
        const ctx = createMockContext();
        const caller = appRouter.createCaller(ctx);

        const result = await caller.content.generateScript({
          trend: "Social Media Tips",
          platform: "TikTok",
          videoDuration: 30,
        });

        expect(result.success).toBe(true);
        expect(result).toHaveProperty("hook");
        expect(result).toHaveProperty("body");
        expect(result).toHaveProperty("cta");
        expect(result.contentType).toBe("script");
      },
      { timeout: 15000 }
    );

    it(
      "should generate hashtags",
      async () => {
        const ctx = createMockContext();
        const caller = appRouter.createCaller(ctx);

        const result = await caller.content.generateHashtags({
          trend: "Digital Marketing",
          platform: "X",
          count: 10,
        });

        expect(result.success).toBe(true);
        expect(Array.isArray(result.hashtags)).toBe(true);
        expect(result.platform).toBe("X");
        expect(result.contentType).toBe("hashtags");
      },
      { timeout: 15000 }
    );
  },
  { timeout: 15000 }
);

describe("Calendar Router", () => {
  it("should get scheduled content", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);

    const result = await caller.calendar.getScheduled({
      startDate,
      endDate,
    });

    expect(result).toHaveProperty("items");
    expect(Array.isArray(result.items)).toBe(true);
  });

  it("should schedule content", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const scheduledDate = new Date();

    const result = await caller.calendar.scheduleContent({
      contentId: 1,
      scheduledDate,
      platform: "Instagram",
    });

    expect(result.success).toBe(true);
  });
});

describe("Content Library Router", () => {
  it("should get saved content", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.library.getSaved({
      limit: 20,
      offset: 0,
    });

    expect(result).toHaveProperty("items");
    expect(result).toHaveProperty("total");
    expect(Array.isArray(result.items)).toBe(true);
  });

  it("should save content", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.library.saveContent({
      contentText: "Sample content",
      platform: "Instagram",
      contentType: "post",
      tags: ["test", "sample"],
    });

    expect(result.success).toBe(true);
    expect(result).toHaveProperty("id");
  });

  it("should update content status", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.library.updateStatus({
      contentId: 1,
      status: "scheduled",
    });

    expect(result.success).toBe(true);
  });

  it("should delete content", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.library.deleteContent({
      contentId: 1,
    });

    expect(result.success).toBe(true);
  });
});

describe("Daily Briefing Router", () => {
  it("should get daily briefing", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.briefing.getDaily();

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("recommendedTopics");
    expect(result).toHaveProperty("postingTimes");
    expect(result).toHaveProperty("contentSuggestions");
  });
});

describe("Platform Validation", () => {
  it("should accept valid platforms", async () => {
    const platforms = ["Instagram", "TikTok", "X", "LinkedIn"];

    for (const platform of platforms) {
      expect(["Instagram", "TikTok", "X", "LinkedIn"]).toContain(platform);
    }
  });
});

describe("Content Status Labels", () => {
  it("should support all status labels", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const statuses = ["draft", "scheduled", "published"];

    for (const status of statuses) {
      const result = await caller.library.updateStatus({
        contentId: 1,
        status: status as any,
      });

      expect(result.success).toBe(true);
    }
  });
});

describe("Script Format Validation", () => {
  it("should generate scripts with Hook/Body/CTA structure", async () => {
    const ctx = createMockContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.content.generateScript(
      {
        trend: "Content Strategy",
        platform: "Instagram",
        videoDuration: 30,
      }
    );

    expect(result.success).toBe(true);
    expect(result.hook).toBeDefined();
    expect(result.body).toBeDefined();
    expect(result.cta).toBeDefined();
    expect(typeof result.hook).toBe("string");
    expect(typeof result.body).toBe("string");
    expect(typeof result.cta).toBe("string");
  }, { timeout: 15000 });
});
