/**
 * 国际化格式化工具
 * 提供日期、数字、货币等本地化格式化功能
 */

import type {
  SupportedLanguage,
  DateFormatOptions,
  NumberFormatOptions,
} from "./types.ts";
import { FORMAT_CONFIG } from "./config.ts";

/**
 * 日期格式化器
 */
export class DateFormatter {
  /**
   * 格式化日期
   */
  static format(
    date: Date,
    locale: SupportedLanguage,
    options?: DateFormatOptions
  ): string {
    const defaultOptions = FORMAT_CONFIG.dateFormat[locale];
    const formatOptions = { ...defaultOptions, ...options };

    try {
      return new Intl.DateTimeFormat(locale, formatOptions).format(date);
    } catch (error) {
      console.error("Date formatting error:", error);
      return date.toLocaleDateString();
    }
  }

  /**
   * 格式化相对时间
   */
  static formatRelative(
    date: Date,
    locale: SupportedLanguage,
    baseDate: Date = new Date()
  ): string {
    const diffInSeconds = Math.floor((baseDate.getTime() - date.getTime()) / 1000);

    try {
      const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

      // 秒
      if (Math.abs(diffInSeconds) < 60) {
        return rtf.format(-diffInSeconds, 'second');
      }

      // 分钟
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      if (Math.abs(diffInMinutes) < 60) {
        return rtf.format(-diffInMinutes, 'minute');
      }

      // 小时
      const diffInHours = Math.floor(diffInMinutes / 60);
      if (Math.abs(diffInHours) < 24) {
        return rtf.format(-diffInHours, 'hour');
      }

      // 天
      const diffInDays = Math.floor(diffInHours / 24);
      if (Math.abs(diffInDays) < 30) {
        return rtf.format(-diffInDays, 'day');
      }

      // 月
      const diffInMonths = Math.floor(diffInDays / 30);
      if (Math.abs(diffInMonths) < 12) {
        return rtf.format(-diffInMonths, 'month');
      }

      // 年
      const diffInYears = Math.floor(diffInMonths / 12);
      return rtf.format(-diffInYears, 'year');
    } catch (error) {
      console.error("Relative time formatting error:", error);
      return this.format(date, locale);
    }
  }

  /**
   * 格式化时间范围
   */
  static formatRange(
    startDate: Date,
    endDate: Date,
    locale: SupportedLanguage,
    options?: DateFormatOptions
  ): string {
    const defaultOptions = FORMAT_CONFIG.dateFormat[locale];
    const formatOptions = { ...defaultOptions, ...options };

    try {
      return new Intl.DateTimeFormat(locale, formatOptions).formatRange(
        startDate,
        endDate
      );
    } catch (error) {
      console.error("Date range formatting error:", error);
      return `${this.format(startDate, locale)} - ${this.format(endDate, locale)}`;
    }
  }
}

/**
 * 数字格式化器
 */
export class NumberFormatter {
  /**
   * 格式化数字
   */
  static format(
    number: number,
    locale: SupportedLanguage,
    options?: NumberFormatOptions
  ): string {
    const defaultOptions = FORMAT_CONFIG.numberFormat[locale];
    const formatOptions = { ...defaultOptions, ...options };

    try {
      return new Intl.NumberFormat(locale, formatOptions).format(number);
    } catch (error) {
      console.error("Number formatting error:", error);
      return number.toString();
    }
  }

  /**
   * 格式化货币
   */
  static formatCurrency(
    amount: number,
    locale: SupportedLanguage,
    currency?: string
  ): string {
    const defaultCurrency = FORMAT_CONFIG.currencyFormat[locale].currency;
    const currencyCode = currency || defaultCurrency;

    try {
      return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currencyCode,
      }).format(amount);
    } catch (error) {
      console.error("Currency formatting error:", error);
      return `${currencyCode} ${amount}`;
    }
  }

  /**
   * 格式化百分比
   */
  static formatPercent(
    value: number,
    locale: SupportedLanguage,
    options?: Omit<NumberFormatOptions, 'style'>
  ): string {
    try {
      return new Intl.NumberFormat(locale, {
        style: 'percent',
        ...options,
      }).format(value);
    } catch (error) {
      console.error("Percent formatting error:", error);
      return `${(value * 100).toFixed(2)}%`;
    }
  }

  /**
   * 格式化文件大小
   */
  static formatFileSize(
    bytes: number,
    locale: SupportedLanguage,
    binary = false
  ): string {
    const base = binary ? 1024 : 1000;
    const units = binary
      ? ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB']
      : ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

    if (bytes === 0) return '0 B';

    const exponent = Math.floor(Math.log(bytes) / Math.log(base));
    const value = bytes / Math.pow(base, exponent);
    const unit = units[exponent];

    const formattedValue = this.format(value, locale, {
      maximumFractionDigits: exponent === 0 ? 0 : 1,
    });

    return `${formattedValue} ${unit}`;
  }
}

/**
 * 列表格式化器
 */
export class ListFormatter {
  /**
   * 格式化列表
   */
  static format(
    items: string[],
    locale: SupportedLanguage,
    type: 'conjunction' | 'disjunction' | 'unit' = 'conjunction'
  ): string {
    try {
      return new Intl.ListFormat(locale, { type }).format(items);
    } catch (error) {
      console.error("List formatting error:", error);
      return items.join(', ');
    }
  }
}

/**
 * 复数规则处理器
 */
export class PluralRules {
  /**
   * 获取复数规则
   */
  static select(
    count: number,
    locale: SupportedLanguage
  ): Intl.LDMLPluralRule {
    try {
      return new Intl.PluralRules(locale).select(count);
    } catch (error) {
      console.error("Plural rules error:", error);
      return count === 1 ? 'one' : 'other';
    }
  }

  /**
   * 格式化复数文本
   */
  static formatPlural(
    count: number,
    translations: Record<string, string>,
    locale: SupportedLanguage
  ): string {
    const rule = this.select(count, locale);
    const translation = translations[rule] || translations.other || '';
    
    // 替换 {{count}} 占位符
    return translation.replace(/\{\{count\}\}/g, count.toString());
  }
}

// 便捷函数
export function formatDate(
  date: Date,
  locale: SupportedLanguage,
  options?: DateFormatOptions
): string {
  return DateFormatter.format(date, locale, options);
}

export function formatRelativeTime(
  date: Date,
  locale: SupportedLanguage,
  baseDate?: Date
): string {
  return DateFormatter.formatRelative(date, locale, baseDate);
}

export function formatNumber(
  number: number,
  locale: SupportedLanguage,
  options?: NumberFormatOptions
): string {
  return NumberFormatter.format(number, locale, options);
}

export function formatCurrency(
  amount: number,
  locale: SupportedLanguage,
  currency?: string
): string {
  return NumberFormatter.formatCurrency(amount, locale, currency);
}

export function formatPercent(
  value: number,
  locale: SupportedLanguage,
  options?: Omit<NumberFormatOptions, 'style'>
): string {
  return NumberFormatter.formatPercent(value, locale, options);
}

export function formatFileSize(
  bytes: number,
  locale: SupportedLanguage,
  binary = false
): string {
  return NumberFormatter.formatFileSize(bytes, locale, binary);
}

export function formatList(
  items: string[],
  locale: SupportedLanguage,
  type?: 'conjunction' | 'disjunction' | 'unit'
): string {
  return ListFormatter.format(items, locale, type);
}

export function formatPlural(
  count: number,
  translations: Record<string, string>,
  locale: SupportedLanguage
): string {
  return PluralRules.formatPlural(count, translations, locale);
}
