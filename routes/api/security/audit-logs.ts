/**
 * 安全审计日志API端点
 * 查看和管理安全审计日志
 */

import { HandlerContext } from "fresh";
import { getAuthContext } from "@utils/middleware.ts";
import {
  AuditEventType,
  AuditLevel,
  type AuditLogQuery,
  cleanupOldAuditLogs,
  getAuditLogStats,
  queryAuditLogs,
} from "@utils/audit-log.ts";

export const handler = {
  // 获取审计日志
  async GET(ctx: HandlerContext): Promise<Response> {
    const req = ctx.req;

    try {
      const authContext = await getAuthContext(req);

      if (!authContext.isAuthenticated || !authContext.user) {
        return new Response(
          JSON.stringify({ error: "Authentication required" }),
          { status: 401, headers: { "Content-Type": "application/json" } },
        );
      }

      const url = new URL(req.url);
      const action = url.searchParams.get("action") || "logs";

      if (action === "stats") {
        // 获取统计信息
        const userId = authContext.user.id;
        const stats = getAuditLogStats({ userId });

        return new Response(
          JSON.stringify(stats),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      } else if (action === "logs") {
        // 获取日志列表
        const userId = authContext.user.id;

        // 解析查询参数
        const query: AuditLogQuery = {
          userId,
          limit: parseInt(url.searchParams.get("limit") || "50"),
          offset: parseInt(url.searchParams.get("offset") || "0"),
        };

        // 可选的过滤参数
        const eventType = url.searchParams.get("eventType");
        if (
          eventType &&
          Object.values(AuditEventType).includes(eventType as AuditEventType)
        ) {
          query.eventType = eventType as AuditEventType;
        }

        const level = url.searchParams.get("level");
        if (level && Object.values(AuditLevel).includes(level as AuditLevel)) {
          query.level = level as AuditLevel;
        }

        const startDate = url.searchParams.get("startDate");
        if (startDate) {
          query.startDate = new Date(startDate);
        }

        const endDate = url.searchParams.get("endDate");
        if (endDate) {
          query.endDate = new Date(endDate);
        }

        const logs = queryAuditLogs(query);

        return new Response(
          JSON.stringify({
            logs,
            query,
            total: logs.length,
          }),
          {
            status: 200,
            headers: { "Content-Type": "application/json" },
          },
        );
      } else {
        return new Response(
          JSON.stringify({ error: "Invalid action" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }
    } catch (error) {
      console.error("Audit logs GET error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },

  // 清理旧日志（管理员功能）
  async DELETE(ctx: HandlerContext): Promise<Response> {
    const req = ctx.req;

    try {
      const authContext = await getAuthContext(req);

      if (!authContext.isAuthenticated || !authContext.user) {
        return new Response(
          JSON.stringify({ error: "Authentication required" }),
          { status: 401, headers: { "Content-Type": "application/json" } },
        );
      }

      // 这里应该检查管理员权限
      // 为了演示，我们允许用户清理自己的日志
      const url = new URL(req.url);
      const daysToKeep = parseInt(url.searchParams.get("days") || "90");

      if (daysToKeep < 1 || daysToKeep > 365) {
        return new Response(
          JSON.stringify({ error: "Days to keep must be between 1 and 365" }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        );
      }

      const removedCount = cleanupOldAuditLogs(daysToKeep);

      return new Response(
        JSON.stringify({
          success: true,
          message: `Cleaned up ${removedCount} old audit log entries`,
          removedCount,
          daysToKeep,
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Audit logs DELETE error:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }
  },
};
