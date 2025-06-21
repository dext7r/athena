/**
 * 会话管理工具函数
 * 处理用户会话的创建、验证和管理
 */

// 会话信息接口
export interface SessionInfo {
  id: string;
  userId: number;
  deviceInfo: DeviceInfo;
  ipAddress: string;
  location?: LocationInfo;
  createdAt: Date;
  lastActiveAt: Date;
  expiresAt: Date;
  isActive: boolean;
  isCurrent?: boolean;
}

// 设备信息接口
export interface DeviceInfo {
  userAgent: string;
  browser: string;
  os: string;
  device: string;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

// 位置信息接口
export interface LocationInfo {
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;
  isp?: string;
}

// 会话统计接口
export interface SessionStats {
  totalSessions: number;
  activeSessions: number;
  uniqueDevices: number;
  uniqueLocations: number;
  lastLoginAt?: Date;
}

// 临时存储会话数据（实际项目中应该使用数据库）
const sessions = new Map<string, SessionInfo>();
const userSessions = new Map<number, Set<string>>();

/**
 * 解析用户代理字符串
 */
export function parseUserAgent(userAgent: string): DeviceInfo {
  const ua = userAgent.toLowerCase();

  // 检测浏览器
  let browser = "Unknown";
  if (ua.includes("chrome") && !ua.includes("edg")) browser = "Chrome";
  else if (ua.includes("firefox")) browser = "Firefox";
  else if (ua.includes("safari") && !ua.includes("chrome")) browser = "Safari";
  else if (ua.includes("edg")) browser = "Edge";
  else if (ua.includes("opera")) browser = "Opera";

  // 检测操作系统
  let os = "Unknown";
  if (ua.includes("windows")) os = "Windows";
  else if (ua.includes("mac")) os = "macOS";
  else if (ua.includes("linux")) os = "Linux";
  else if (ua.includes("android")) os = "Android";
  else if (ua.includes("ios") || ua.includes("iphone") || ua.includes("ipad")) {
    os = "iOS";
  }

  // 检测设备类型
  const isMobile = /mobile|android|iphone/.test(ua);
  const isTablet = /tablet|ipad/.test(ua);
  const isDesktop = !isMobile && !isTablet;

  let device = "Desktop";
  if (isMobile) device = "Mobile";
  else if (isTablet) device = "Tablet";

  return {
    userAgent,
    browser,
    os,
    device,
    isMobile,
    isTablet,
    isDesktop,
  };
}

/**
 * 获取客户端IP地址
 */
export function getClientIP(req: Request): string {
  // 检查各种可能的IP头
  const headers = req.headers;

  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    return xForwardedFor.split(",")[0].trim();
  }

  const xRealIP = headers.get("x-real-ip");
  if (xRealIP) {
    return xRealIP;
  }

  const cfConnectingIP = headers.get("cf-connecting-ip");
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  // 默认返回本地IP
  return "127.0.0.1";
}

/**
 * 生成会话ID
 */
export function generateSessionId(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/**
 * 创建新会话
 */
export function createSession(
  userId: number,
  req: Request,
  expirationHours: number = 24 * 7, // 默认7天
): SessionInfo {
  const sessionId = generateSessionId();
  const now = new Date();
  const expiresAt = new Date(now.getTime() + expirationHours * 60 * 60 * 1000);

  const deviceInfo = parseUserAgent(req.headers.get("user-agent") || "");
  const ipAddress = getClientIP(req);

  const session: SessionInfo = {
    id: sessionId,
    userId,
    deviceInfo,
    ipAddress,
    createdAt: now,
    lastActiveAt: now,
    expiresAt,
    isActive: true,
  };

  // 存储会话
  sessions.set(sessionId, session);

  // 添加到用户会话列表
  if (!userSessions.has(userId)) {
    userSessions.set(userId, new Set());
  }
  userSessions.get(userId)!.add(sessionId);

  return session;
}

/**
 * 获取会话信息
 */
export function getSession(sessionId: string): SessionInfo | undefined {
  const session = sessions.get(sessionId);
  if (!session) return undefined;

  // 检查会话是否过期
  if (session.expiresAt < new Date()) {
    deleteSession(sessionId);
    return undefined;
  }

  return session;
}

/**
 * 更新会话活动时间
 */
export function updateSessionActivity(sessionId: string): boolean {
  const session = sessions.get(sessionId);
  if (!session) return false;

  session.lastActiveAt = new Date();
  sessions.set(sessionId, session);
  return true;
}

/**
 * 删除会话
 */
export function deleteSession(sessionId: string): boolean {
  const session = sessions.get(sessionId);
  if (!session) return false;

  // 从用户会话列表中移除
  const userSessionSet = userSessions.get(session.userId);
  if (userSessionSet) {
    userSessionSet.delete(sessionId);
    if (userSessionSet.size === 0) {
      userSessions.delete(session.userId);
    }
  }

  // 删除会话
  return sessions.delete(sessionId);
}

/**
 * 获取用户的所有会话
 */
export function getUserSessions(
  userId: number,
  currentSessionId?: string,
): SessionInfo[] {
  const sessionIds = userSessions.get(userId);
  if (!sessionIds) return [];

  const userSessionList: SessionInfo[] = [];
  const now = new Date();

  for (const sessionId of sessionIds) {
    const session = sessions.get(sessionId);
    if (!session) continue;

    // 检查会话是否过期
    if (session.expiresAt < now) {
      deleteSession(sessionId);
      continue;
    }

    // 标记当前会话
    const sessionWithCurrent = { ...session };
    if (currentSessionId && sessionId === currentSessionId) {
      sessionWithCurrent.isCurrent = true;
    }

    userSessionList.push(sessionWithCurrent);
  }

  // 按最后活动时间排序
  return userSessionList.sort((a, b) =>
    b.lastActiveAt.getTime() - a.lastActiveAt.getTime()
  );
}

/**
 * 删除用户的其他会话（保留当前会话）
 */
export function deleteOtherUserSessions(
  userId: number,
  currentSessionId: string,
): number {
  const sessionIds = userSessions.get(userId);
  if (!sessionIds) return 0;

  let deletedCount = 0;
  for (const sessionId of Array.from(sessionIds)) {
    if (sessionId !== currentSessionId) {
      if (deleteSession(sessionId)) {
        deletedCount++;
      }
    }
  }

  return deletedCount;
}

/**
 * 删除用户的所有会话
 */
export function deleteAllUserSessions(userId: number): number {
  const sessionIds = userSessions.get(userId);
  if (!sessionIds) return 0;

  let deletedCount = 0;
  for (const sessionId of Array.from(sessionIds)) {
    if (deleteSession(sessionId)) {
      deletedCount++;
    }
  }

  return deletedCount;
}

/**
 * 获取用户会话统计
 */
export function getUserSessionStats(userId: number): SessionStats {
  const userSessionList = getUserSessions(userId);
  const activeSessions = userSessionList.filter((s) => s.isActive).length;

  const uniqueDevices = new Set(
    userSessionList.map((s) => `${s.deviceInfo.os}-${s.deviceInfo.browser}`),
  ).size;
  const uniqueLocations = new Set(userSessionList.map((s) => s.ipAddress)).size;

  const lastLoginAt = userSessionList.length > 0
    ? userSessionList[0].lastActiveAt
    : undefined;

  return {
    totalSessions: userSessionList.length,
    activeSessions,
    uniqueDevices,
    uniqueLocations,
    lastLoginAt,
  };
}

/**
 * 清理过期会话
 */
export function cleanupExpiredSessions(): number {
  const now = new Date();
  let cleanedCount = 0;

  for (const [sessionId, session] of sessions) {
    if (session.expiresAt < now) {
      deleteSession(sessionId);
      cleanedCount++;
    }
  }

  return cleanedCount;
}
