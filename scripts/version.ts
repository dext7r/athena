#!/usr/bin/env deno run --allow-read --allow-write --allow-run

/**
 * 版本管理脚本
 * 用于更新项目版本号、生成 changelog 和创建 release
 */

import { parse } from "$std/flags/mod.ts";

interface VersionInfo {
  current: string;
  new: string;
  type: "major" | "minor" | "patch" | "prerelease";
}

interface DenoConfig {
  version: string;
  [key: string]: unknown;
}

/**
 * 读取当前版本号
 */
async function getCurrentVersion(): Promise<string> {
  try {
    const config = JSON.parse(
      await Deno.readTextFile("deno.json"),
    ) as DenoConfig;
    return config.version || "0.0.1";
  } catch (error) {
    console.error(
      "❌ 无法读取 deno.json:",
      error instanceof Error ? error.message : String(error),
    );
    Deno.exit(1);
  }
}

/**
 * 解析版本号
 */
function parseVersion(
  version: string,
): { major: number; minor: number; patch: number; prerelease?: string } {
  const match = version.match(/^(\d+)\.(\d+)\.(\d+)(?:-(.+))?$/);
  if (!match) {
    throw new Error(`无效的版本号格式: ${version}`);
  }

  return {
    major: parseInt(match[1]),
    minor: parseInt(match[2]),
    patch: parseInt(match[3]),
    prerelease: match[4],
  };
}

/**
 * 计算新版本号
 */
function calculateNewVersion(current: string, type: string): string {
  const { major, minor, patch } = parseVersion(current);

  switch (type) {
    case "major":
      return `${major + 1}.0.0`;
    case "minor":
      return `${major}.${minor + 1}.0`;
    case "patch":
      return `${major}.${minor}.${patch + 1}`;
    case "prerelease": {
      const prereleaseNum = current.includes("-")
        ? parseInt(current.split("-")[1].replace(/\D/g, "")) + 1
        : 1;
      return `${major}.${minor}.${patch}-beta.${prereleaseNum}`;
    }
    default:
      throw new Error(`不支持的版本类型: ${type}`);
  }
}

/**
 * 更新 deno.json 中的版本号
 */
async function updateDenoConfig(newVersion: string): Promise<void> {
  try {
    const configText = await Deno.readTextFile("deno.json");
    const config = JSON.parse(configText) as DenoConfig;
    config.version = newVersion;

    await Deno.writeTextFile(
      "deno.json",
      JSON.stringify(config, null, 2) + "\n",
    );
    console.log(`✅ 已更新 deno.json 版本号为: ${newVersion}`);
  } catch (error) {
    console.error(
      "❌ 更新 deno.json 失败:",
      error instanceof Error ? error.message : String(error),
    );
    throw error;
  }
}

/**
 * 检查是否有未提交的更改
 */
async function checkGitStatus(): Promise<boolean> {
  try {
    const process = new Deno.Command("git", {
      args: ["status", "--porcelain"],
      stdout: "piped",
    });

    const { stdout } = await process.output();
    const output = new TextDecoder().decode(stdout).trim();

    return output.length === 0;
  } catch (error) {
    console.error(
      "❌ 检查 Git 状态失败:",
      error instanceof Error ? error.message : String(error),
    );
    return false;
  }
}

/**
 * 创建 Git 标签
 */
async function createGitTag(version: string): Promise<void> {
  try {
    const tagName = `v${version}`;

    // 创建标签
    const createTag = new Deno.Command("git", {
      args: ["tag", "-a", tagName, "-m", `Release ${tagName}`],
    });
    await createTag.output();

    console.log(`✅ 已创建 Git 标签: ${tagName}`);

    // 推送标签
    const pushTag = new Deno.Command("git", {
      args: ["push", "origin", tagName],
    });
    await pushTag.output();

    console.log(`✅ 已推送标签到远程仓库`);
  } catch (error) {
    console.error(
      "❌ 创建 Git 标签失败:",
      error instanceof Error ? error.message : String(error),
    );
    throw error;
  }
}

/**
 * 提交版本更改
 */
async function commitVersionChange(version: string): Promise<void> {
  try {
    // 添加文件到暂存区
    const addFiles = new Deno.Command("git", {
      args: ["add", "deno.json", "CHANGELOG.md"],
    });
    await addFiles.output();

    // 提交更改
    const commit = new Deno.Command("git", {
      args: ["commit", "-m", `chore: bump version to ${version}`],
    });
    await commit.output();

    console.log(`✅ 已提交版本更改: ${version}`);
  } catch (error) {
    console.error(
      "❌ 提交版本更改失败:",
      error instanceof Error ? error.message : String(error),
    );
    throw error;
  }
}

/**
 * 显示帮助信息
 */
function showHelp(): void {
  console.log(`
🚀 Athena 版本管理工具

用法:
  deno run --allow-read --allow-write --allow-run scripts/version.ts [选项]

选项:
  --type <type>     版本类型 (major|minor|patch|prerelease)
  --version <ver>   指定具体版本号 (例如: 1.2.3)
  --dry-run         预览模式，不实际执行更改
  --no-git          不创建 Git 标签和提交
  --help            显示此帮助信息

示例:
  # 升级补丁版本 (0.0.1 -> 0.0.2)
  deno run --allow-read --allow-write --allow-run scripts/version.ts --type patch
  
  # 升级次版本 (0.0.1 -> 0.1.0)
  deno run --allow-read --allow-write --allow-run scripts/version.ts --type minor
  
  # 升级主版本 (0.0.1 -> 1.0.0)
  deno run --allow-read --allow-write --allow-run scripts/version.ts --type major
  
  # 创建预发布版本 (0.0.1 -> 0.0.1-beta.1)
  deno run --allow-read --allow-write --allow-run scripts/version.ts --type prerelease
  
  # 指定具体版本号
  deno run --allow-read --allow-write --allow-run scripts/version.ts --version 1.0.0
  
  # 预览模式
  deno run --allow-read --allow-write --allow-run scripts/version.ts --type patch --dry-run
`);
}

/**
 * 主函数
 */
async function main(): Promise<void> {
  const args = parse(Deno.args, {
    string: ["type", "version"],
    boolean: ["dry-run", "no-git", "help"],
    alias: {
      h: "help",
      t: "type",
      v: "version",
      d: "dry-run",
    },
  });

  if (args.help) {
    showHelp();
    return;
  }

  try {
    const currentVersion = await getCurrentVersion();
    console.log(`📋 当前版本: ${currentVersion}`);

    let newVersion: string;

    if (args.version) {
      // 验证指定的版本号格式
      parseVersion(args.version);
      newVersion = args.version;
    } else if (args.type) {
      newVersion = calculateNewVersion(currentVersion, args.type);
    } else {
      console.error("❌ 请指定版本类型 (--type) 或具体版本号 (--version)");
      console.log("使用 --help 查看帮助信息");
      Deno.exit(1);
    }

    console.log(`🎯 新版本: ${newVersion}`);

    if (args["dry-run"]) {
      console.log("🔍 预览模式 - 不会执行实际更改");
      return;
    }

    // 检查 Git 状态
    if (!args["no-git"]) {
      const isClean = await checkGitStatus();
      if (!isClean) {
        console.error("❌ 工作目录有未提交的更改，请先提交或暂存");
        Deno.exit(1);
      }
    }

    // 更新版本号
    await updateDenoConfig(newVersion);

    // Git 操作
    if (!args["no-git"]) {
      await commitVersionChange(newVersion);
      await createGitTag(newVersion);
    }

    console.log(`🎉 版本更新完成: ${currentVersion} -> ${newVersion}`);
    console.log(`📦 可以通过以下命令触发 Release:`);
    console.log(`   git push origin v${newVersion}`);
  } catch (error) {
    console.error(
      "❌ 版本更新失败:",
      error instanceof Error ? error.message : String(error),
    );
    Deno.exit(1);
  }
}

// 运行主函数
if (import.meta.main) {
  await main();
}
