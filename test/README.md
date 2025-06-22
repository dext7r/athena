# 测试框架文档

## 概述

这个测试框架为 Athena
项目提供了完整的测试覆盖，包括单元测试、集成测试、组件测试、API
测试、安全测试和性能测试。

## 测试结构

```
test/
├── basic.test.ts                 # 基础测试
├── hooks/                        # Hooks 测试
│   └── useCounter.test.ts
├── utils/                        # 工具函数测试
│   └── clientOnly.test.ts
├── stores/                       # 状态管理测试
│   └── useAppStore.test.ts
├── components/                   # 组件测试
│   └── ui.test.ts
├── api/                          # API 测试
│   └── auth.test.ts
├── integration/                  # 集成测试
│   └── routes.test.ts
├── security/                     # 安全测试
│   └── auth.test.ts
├── performance/                  # 性能测试
│   └── benchmark.test.ts
├── test-config.ts               # 测试配置
└── README.md                    # 测试文档
```

## 运行测试

### 基本命令

```bash
# 运行所有测试
deno task test

# 监视模式运行测试
deno task test:watch

# 生成测试覆盖率报告
deno task test:coverage
deno task test:coverage-report
```

### 📊 在线覆盖率报告

- **实时报告**: [https://dext7r.github.io/athena/html/index.html](https://dext7r.github.io/athena/html/index.html)
- **项目首页**: [https://dext7r.github.io/athena](https://dext7r.github.io/athena)

> 💡 每次推送到 `main` 分支后，覆盖率报告会自动更新

### 分类测试

```bash
# 单元测试 (hooks, utils, stores)
deno task test:unit

# 集成测试
deno task test:integration

# API 测试
deno task test:api

# 组件测试
deno task test:components

# 安全测试
deno task test:security

# 性能测试
deno task test:performance
```

## 测试类型

### 1. 单元测试

- **Hooks 测试**: 测试自定义 React Hooks 的功能
- **工具函数测试**: 测试纯函数的输入输出
- **状态管理测试**: 测试 Zustand store 的状态变化

### 2. 组件测试

- **UI 组件测试**: 测试组件的导入和基本属性
- **布局组件测试**: 测试布局组件的结构

### 3. API 测试

- **路由测试**: 测试 API 路由的响应格式
- **认证测试**: 测试认证相关的 API

### 4. 集成测试

- **路由集成测试**: 测试应用路由的完整性
- **端到端功能测试**: 测试完整的用户流程

### 5. 安全测试

- **JWT 测试**: 测试 Token 格式和验证
- **密码强度测试**: 测试密码安全策略
- **MFA 测试**: 测试多因素认证
- **会话管理测试**: 测试会话生命周期

### 6. 性能测试

- **基准测试**: 测试关键操作的性能
- **内存使用测试**: 监控内存泄漏
- **响应时间测试**: 确保操作在合理时间内完成

## 测试配置

测试配置在 `test-config.ts` 中定义，包括：

- **超时时间**: 测试的最大执行时间
- **性能阈值**: 性能测试的通过标准
- **Mock 数据**: 测试用的模拟数据配置
- **API 配置**: API 测试的基础配置
- **安全配置**: 安全测试的参数

## 测试工具

### TestUtils 类

提供了一系列测试辅助方法：

- `generateRandomString()`: 生成随机字符串
- `generateRandomNumbers()`: 生成随机数字
- `createMockUser()`: 创建模拟用户数据
- `createMockSession()`: 创建模拟会话数据
- `measureExecutionTime()`: 测量函数执行时间

## 最佳实践

### 1. 测试命名

- 使用描述性的测试名称
- 遵循 "模块 - 功能描述" 的格式
- 使用中文描述以提高可读性

### 2. 测试结构

- 每个测试应该独立运行
- 使用适当的断言方法
- 包含边界情况测试

### 3. Mock 和 Stub

- 合理使用 Mock 数据
- 避免依赖外部服务
- 模拟真实的使用场景

### 4. 性能测试

- 设置合理的性能阈值
- 考虑不同环境的性能差异
- 监控长期性能趋势

## 持续集成

测试框架已集成到项目的 CI/CD 流程中：

- 每次提交都会运行完整的测试套件
- 测试失败会阻止代码合并
- 自动生成测试覆盖率报告

## 扩展测试

要添加新的测试：

1. 在相应的测试目录中创建测试文件
2. 遵循现有的命名约定 (`*.test.ts`)
3. 导入必要的测试工具和断言
4. 编写清晰的测试用例
5. 更新相关文档

## 故障排除

### 常见问题

1. **模块导入失败**: 检查路径别名配置
2. **测试超时**: 调整测试配置中的超时时间
3. **性能测试失败**: 检查性能阈值设置
4. **异步测试问题**: 确保正确处理 Promise

### 调试技巧

- 使用 `console.log` 进行调试输出
- 运行单个测试文件进行隔离调试
- 检查测试覆盖率报告找出未测试的代码

## 贡献指南

在提交代码时请确保：

- 所有测试通过
- 新功能包含相应的测试
- 测试覆盖率保持在合理水平
- 遵循项目的测试标准和约定
