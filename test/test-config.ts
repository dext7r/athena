// 测试配置文件
export const TEST_CONFIG = {
  // 测试超时时间 (毫秒)
  timeout: 10000,

  // 性能测试阈值
  performance: {
    arrayOperationThreshold: 100,
    stringOperationThreshold: 50,
    objectCreationThreshold: 100,
    jsonSerializationThreshold: 200,
  },

  // Mock 数据配置
  mockData: {
    userCount: 1000,
    sessionDuration: 24 * 60 * 60 * 1000, // 24 小时
    mfaCodeLength: 6,
  },

  // API 测试配置
  api: {
    baseUrl: "http://localhost:8000",
    validStatusCodes: [200, 201, 400, 401, 403, 404, 500],
  },

  // 安全测试配置
  security: {
    minPasswordLength: 8,
    jwtTokenParts: 3,
    sessionIdPrefix: "session_",
    userIdPrefix: "user_",
  },
};

// 测试工具函数
export class TestUtils {
  /**
   * 生成随机字符串
   */
  static generateRandomString(length: number): string {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * 生成随机数字字符串
   */
  static generateRandomNumbers(length: number): string {
    let result = "";
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10).toString();
    }
    return result;
  }

  /**
   * 创建 Mock 用户数据
   */
  static createMockUser(id: number = 1) {
    return {
      id: `user_${id}`,
      name: `User ${id}`,
      email: `user${id}@example.com`,
      createdAt: new Date().toISOString(),
      isActive: true,
      profile: {
        age: 20 + (id % 50),
        city: `City ${id % 10}`,
        preferences: {
          theme: id % 2 === 0 ? "dark" : "light",
          language: "zh-CN",
        },
      },
    };
  }

  /**
   * 创建 Mock 会话数据
   */
  static createMockSession(userId: string) {
    return {
      id: `session_${this.generateRandomString(10)}`,
      userId,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + TEST_CONFIG.mockData.sessionDuration)
        .toISOString(),
      isActive: true,
    };
  }

  /**
   * 测量函数执行时间
   */
  static async measureExecutionTime<T>(
    fn: () => T | Promise<T>,
  ): Promise<{ result: T; executionTime: number }> {
    const startTime = performance.now();
    const result = await fn();
    const endTime = performance.now();
    return {
      result,
      executionTime: endTime - startTime,
    };
  }
}
