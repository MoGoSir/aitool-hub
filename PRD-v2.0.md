# AIToolHub 产品需求文档 (PRD)
# AIToolHub Product Requirements Document (PRD)

> **版本 / Version**: v2.0  
> **日期 / Date**: 2026-05-09  
> **状态 / Status**: 待开发 / Pending Development  
> **上一版本 / Previous Version**: v1.0 (已归档 / Archived)  
> **修订说明 / Revision Notes**: 基于产品策略评审重新定位，采用方案A（AI工具导航站）为主体，融合方案C（价格监控）差异化能力。

---

## 目录 / Table of Contents

1. [文档概览 / Overview](#1-文档概览--overview)
2. [产品定位与愿景 / Positioning & Vision](#2-产品定位与愿景--positioning--vision)
3. [目标用户 / Target Users](#3-目标用户--target-users)
4. [竞品分析 / Competitive Analysis](#4-竞品分析--competitive-analysis)
5. [核心功能规划 / Feature Planning](#5-核心功能规划--feature-planning)
6. [MVP 开发路线图 / MVP Roadmap](#6-mvp-开发路线图--mvp-roadmap)
7. [数据获取方案 / Data Acquisition Strategy](#7-数据获取方案--data-acquisition-strategy)
8. [内容运营策略 / Content Operations](#8-内容运营策略--content-operations)
9. [商业模式设计 / Business Model](#9-商业模式设计--business-model)
10. [技术架构概要 / Technical Architecture](#10-技术架构概要--technical-architecture)
11. [成功指标 / Success Metrics](#11-成功指标--success-metrics)

---

## 1. 文档概览 / Overview

### 1.1 产品背景 / Background

AIToolHub 是一个专注于 AI 工具领域的发现与导航平台。随着 AI 工具数量爆发式增长，用户在选择合适工具时面临严重的信息过载问题：工具种类繁多、定价模式复杂、功能差异难以量化。

AIToolHub is a discovery and navigation platform focused on the AI tools ecosystem. With the explosive growth of AI tools, users face severe information overload when selecting the right tool: too many options, complex pricing models, and hard-to-quantify feature differences.

### 1.2 版本修订说明 / Version Revision Notes

| 变更项 / Change | v1.0 | v2.0 |
|---|---|---|
| 产品定位 / Positioning | AI工具评测平台（摇摆）| AI工具发现+导航+价格透明平台（明确）|
| MVP范围 / MVP Scope | 大而全（含编辑评测）| 聚焦核心（发现+筛选+价格）|
| 核心差异化 / Differentiator | 编辑评测内容 | 场景化推荐 + 价格透明度 |
| 开发周期 / Timeline | ~4周 | ~4周（分Phase交付）|
| 运营成本 / Ops Cost | 高（需编辑团队）| 低（社区贡献+爬虫）|

---

## 2. 产品定位与愿景 / Positioning & Vision

### 2.1 核心价值主张 / Core Value Proposition

> **中文**: 帮助用户快速发现、对比、并以最优价格选用最适合自己的 AI 工具  
> **English**: Help users quickly discover, compare, and adopt the best AI tools at the best price

### 2.2 产品愿景 / Product Vision

**短期（6个月）**: 成为中文用户首选的 AI 工具导航站，收录 500+ AI 工具，月活用户 10,000+

**中期（1年）**: 建立 AI 工具价格数据库，提供价格历史和降价提醒，成为 AI 工具购买决策入口

**长期（2年）**: 构建 AI 工具生态社区，形成内容飞轮，成为 AI 工具领域权威平台

**Short-term (6 months)**: Become the go-to AI tools directory for Chinese users, with 500+ tools and 10,000+ MAU

**Mid-term (1 year)**: Build the AI tools pricing database with price history and drop alerts, becoming the decision hub for AI tool purchases

**Long-term (2 years)**: Build an AI tools community ecosystem with a content flywheel

### 2.3 差异化优势 / Competitive Differentiation

| 维度 / Dimension | AIToolHub | Product Hunt | Future Tools | G2 |
|---|---|---|---|---|
| 专注AI领域 / AI-focused | ✅ | ❌ 全品类 | ✅ | ❌ 全品类 |
| 中英双语 / Bilingual | ✅ | ❌ 英文为主 | ❌ 英文为主 | ❌ 英文为主 |
| 场景化推荐 / Scene-based | ✅ | ❌ | ❌ | ❌ |
| 价格透明 + 监控 / Price transparency | ✅ | ❌ | ❌ 简单展示 | ⚠️ 部分 |
| 优惠码聚合 / Coupon aggregation | ✅ | ❌ | ❌ | ❌ |
| 社区提交 / Community submission | ✅ | ✅ | ✅ | ⚠️ |

---

## 3. 目标用户 / Target Users

### 3.1 主要用户群 / Primary Users

**用户A：AI工具探索者（占比约50%）/ AI Tool Explorers (~50%)**
- 画像：关注AI动态的职场人，想了解各类AI工具，但不确定哪个适合自己
- Profile: Professionals following AI trends, want to explore tools but unsure which fits their needs
- 核心需求：快速浏览 + 按场景发现工具
- Core Need: Quick browsing + scenario-based discovery
- 行为特征：高频访问，低转化，是流量主体
- Behavior: High-frequency visits, low conversion, main traffic source

**用户B：AI工具决策者（占比约30%）/ AI Tool Decision Makers (~30%)**
- 画像：有明确需求，正在对比多款工具准备付费
- Profile: Have clear needs, comparing multiple tools before purchasing
- 核心需求：功能对比 + 价格透明 + 真实反馈
- Core Need: Feature comparison + transparent pricing + real feedback
- 行为特征：访问频次低，转化意愿高，是变现核心
- Behavior: Lower visit frequency, high purchase intent, key monetization target

**用户C：AI工具从业者（占比约20%）/ AI Tool Practitioners (~20%)**
- 画像：AI工具开发者、运营、媒体人，需要了解市场全貌
- Profile: AI tool developers, operators, media professionals
- 核心需求：市场数据 + 提交新工具 + 价格走势
- Core Need: Market data + tool submission + pricing trends
- 行为特征：专业用户，高价值，潜在的B端客户
- Behavior: Professional users, high value, potential B2B clients

### 3.2 用户旅程 / User Journey

```
发现 → 浏览 → 筛选 → 对比 → 决策 → 购买 → 反馈
Discover → Browse → Filter → Compare → Decide → Purchase → Review

AIToolHub 覆盖的核心环节:
AIToolHub covers the core steps:
  发现(SEO/推荐) → 浏览(工具库) → 筛选(多维度) → 对比(价格+功能) → 决策(跳转官网+优惠码)
  Discover(SEO) → Browse(Directory) → Filter(Multi-dim) → Compare(Price+Feature) → Decide(Link+Coupon)
```

---

## 4. 竞品分析 / Competitive Analysis

### 4.1 直接竞品 / Direct Competitors

**Product Hunt**
- 优势：社区活跃，发布文化强，国际知名
- 劣势：不专注AI，中文支持差，无价格对比
- Strengths: Active community, strong launch culture, globally recognized
- Weaknesses: Not AI-focused, poor Chinese support, no price comparison

**Future Tools (futuretools.io)**
- 优势：AI工具专注，更新快，已有大量收录
- 劣势：英文为主，无价格监控，无中文用户运营
- Strengths: AI-focused, fast updates, large catalog
- Weaknesses: English-only, no price tracking, no Chinese community

**There's An AI For That (theresanaiforthat.com)**
- 优势：收录量大，场景分类好
- 劣势：UI较旧，无定价对比，纯英文
- Strengths: Large catalog, good use-case tagging
- Weaknesses: Dated UI, no pricing comparison, English-only

### 4.2 间接竞品 / Indirect Competitors

**G2 / Capterra**: 专业评测，但覆盖所有软件，AI工具体验一般  
**即时AI / AIbase（国内）**: 中文AI导航，但产品体验和数据深度有限

### 4.3 市场空白 / Market Gap

> 目前市面上没有一款产品同时具备：**中英双语 + 专注AI + 价格透明 + 场景化推荐**，这就是 AIToolHub 的切入点。
>
> No existing product combines: **bilingual + AI-focused + transparent pricing + scenario-based recommendations**. This is AIToolHub's entry point.

---

## 5. 核心功能规划 / Feature Planning

### 5.1 功能优先级总览 / Feature Priority Overview

| 功能模块 / Feature | 优先级 / Priority | Phase | 方案来源 / Source |
|---|---|---|---|
| 工具库 + 列表展示 | P0 | 1 | 方案A |
| 智能搜索（关键词+分类）| P0 | 1 | 方案A |
| 多维筛选（分类/价格/标签）| P0 | 1 | 方案A |
| **价格信息展示（定价模式）** | **P0** | **1** | **方案C融合** |
| 工具详情页 | P0 | 1 | 方案A |
| 简单对比功能（2-3个工具）| P1 | 2 | 方案A |
| **价格维度对比** | **P1** | **2** | **方案C融合** |
| 工具提交 + 社区审核 | P1 | 2 | 方案A |
| **优惠码聚合** | **P1** | **2** | **方案C融合** |
| SEO优化 | P1 | 4 | 方案A |
| **价格历史图表** | **P2** | **3** | **方案C融合** |
| 用户系统（注册/收藏）| P2 | 4 | 方案A |
| **降价订阅提醒** | **P3** | **4** | **方案C融合** |
| 高级筛选（付费）| P3 | 4 | 方案A |

### 5.2 功能详细说明 / Feature Details

---

#### 5.2.1 工具库 + 智能搜索 / Tool Directory + Smart Search [P0]

**功能描述 / Description**:
- 展示所有收录的AI工具，支持关键词搜索和分类浏览
- Display all indexed AI tools with keyword search and category browsing

**搜索规格 / Search Specs**:
- 支持中英文混合搜索（"写作 AI" / "writing AI"）
- 搜索字段：工具名称、描述、标签、场景
- 搜索结果实时高亮匹配关键词
- Supports Chinese-English mixed search
- Search fields: name, description, tags, use-cases
- Real-time keyword highlighting in results

**分类体系 / Category System**:

```
一级分类（10个）/ Level 1 Categories (10):
  写作与内容 Writing & Content
  图像生成 Image Generation
  视频创作 Video Creation
  音频与语音 Audio & Voice
  编程开发 Code & Development
  数据分析 Data Analysis
  营销与SEO Marketing & SEO
  效率工具 Productivity
  教育与学习 Education & Learning
  其他 Others

二级分类（按需扩展）/ Level 2 Categories (expandable as needed)
```

---

#### 5.2.2 多维筛选 / Multi-dimensional Filter [P0]

**筛选维度 / Filter Dimensions**:

| 维度 / Dimension | 选项 / Options | 类型 / Type |
|---|---|---|
| 分类 Category | 10个一级分类 | 多选 Multi-select |
| 定价模式 Pricing | 免费/免费增值/付费/企业定制 Free/Freemium/Paid/Enterprise | 多选 |
| 价格区间 Price Range | 免费/$1-10/$11-50/$51-100/$100+ | 单选 |
| 语言支持 Language | 支持中文/英文/多语言 | 多选 |
| 场景标签 Use-case Tags | 个人/学生/创作者/开发者/企业 | 多选 |
| 排序 Sort | 最新/最热/评分最高/价格升序/价格降序 | 单选 |

---

#### 5.2.3 价格信息展示（方案C核心融合）/ Price Display [P0 - Plan C Integration]

这是 AIToolHub 最核心的差异化功能之一，将"价格透明"作为产品的一等公民。

This is one of AIToolHub's key differentiating features, treating "price transparency" as a first-class citizen.

**工具卡片价格展示 / Tool Card Price Display**:
```
[工具Logo] ChatGPT               [⭐ 4.8]
           OpenAI 出品
           写作 · 对话 · 编程
           
           💰 免费增值  $20/月起        ← 价格一目了然
                        Freemium from $20/mo
           [🔥 近期降价] [🎟 有优惠码]   ← 促销标注
           
           [查看详情] [加入对比]
```

**工具详情页价格区块 / Tool Detail Page - Pricing Section**:
```
定价方案 Pricing Plans
├── Free        $0/月  功能限制说明
├── Plus        $20/月 [最受欢迎]  功能说明
├── Team        $25/用户/月        功能说明
└── Enterprise  联系销售

📊 价格历史 Price History  [Phase 2实现]
   [折叠展开 Expandable chart]

🎟 优惠码 Promo Codes
   SAVE20 → 享8折优惠（有效期至 2026-06-01）
   [复制] [跳转官网购买]

⏰ 降价提醒 Price Alert  [Phase 4实现]
   [订阅降价通知 Subscribe to price drop alerts]
```

---

#### 5.2.4 简单对比功能（含价格维度）/ Comparison Tool [P1]

**对比规格 / Comparison Specs**:
- 最多同时对比 3 个工具
- Compare up to 3 tools simultaneously
- 对比维度包含：基础信息、功能特性、定价方案、用户评分
- Comparison dimensions: basics, features, pricing plans, ratings

**对比表格示意 / Comparison Table Mockup**:

```
|                    | ChatGPT       | Claude        | Gemini        |
|--------------------|---------------|---------------|---------------|
| 开发商 Maker       | OpenAI        | Anthropic     | Google        |
| 定价模式 Pricing   | 免费增值      | 免费增值      | 免费增值      |
| 最低付费 Min Price | $20/月        | $20/月        | $19.99/月     |
| 免费额度 Free Tier | 有限制        | 有限制        | 有限制        |
| 中文支持 CN Support| ✅            | ✅            | ✅            |
| API访问 API Access | 付费          | 付费          | 付费          |
| 有无优惠码 Coupon  | ❌            | ❌            | ✅            |
| 评分 Rating        | ⭐ 4.8        | ⭐ 4.7        | ⭐ 4.5        |
```

---

#### 5.2.5 工具提交系统 / Tool Submission System [P1]

**提交流程 / Submission Flow**:
```
用户填写表单 → 系统自动去重检测 → 管理员审核 → 上线展示
User submits → Auto dedup check → Admin review → Published
```

**提交字段 / Submission Fields**:
- 工具名称 / 官网链接 / 分类 / 简介（中英文）/ 定价信息 / 标签

**审核后台 / Admin Panel**:
- 审核队列、批量操作、字段编辑、上线/拒绝操作

---

### 5.3 暂不纳入MVP的功能 / Features Excluded from MVP

| 功能 / Feature | 排除原因 / Reason |
|---|---|
| 编辑专业评测 / Editorial reviews | 需要编辑团队，成本高，冷启动难 |
| 本周精选 / Weekly picks | 需要持续运营投入 |
| 用户评测（验证购买）/ Verified reviews | 用户基数不足时无意义 |
| 降价订阅提醒 / Price drop alerts | 依赖用户系统，Phase 4实现 |
| 企业订阅服务 / Enterprise subscriptions | 用户量达标后再做 |

---

## 6. MVP 开发路线图 / MVP Roadmap

> 技术栈：全栈方案（Next.js 14 + TypeScript + PostgreSQL + Prisma + Redis）  
> Tech Stack: Full-stack (Next.js 14 + TypeScript + PostgreSQL + Prisma + Redis)  
> 部署：Vercel（前端）+ Railway/Supabase（数据库）  
> Deploy: Vercel (frontend) + Railway/Supabase (database)

---

### Phase 1: 核心基础 / Core Foundation（第1-2周 / Week 1-2）

**目标 / Goal**: 用户可以浏览、搜索、筛选AI工具，并看到价格信息

| 任务 / Task | 优先级 | 预计时间 |
|---|---|---|
| 全栈项目初始化（Next.js + Prisma）| P0 | 1天 |
| 数据库设计（工具、分类、定价、标签）| P0 | 1天 |
| 工具种子数据（50个热门AI工具）| P0 | 2天 |
| 工具列表API + 分页 | P0 | 1天 |
| 关键词搜索接口 | P0 | 1天 |
| 多维筛选接口（含价格筛选）| P0 | 1天 |
| 工具详情页API | P0 | 0.5天 |
| **价格信息数据结构和展示** | **P0** | **1天** |
| 前端对接API（列表/搜索/筛选/详情）| P0 | 2天 |

**验收标准 / Acceptance Criteria**:
- ✅ 用户可搜索"ChatGPT"找到工具
- ✅ 用户可筛选"免费"或"$20以下"工具
- ✅ 工具详情页显示定价方案（各档价格清晰可见）
- ✅ 工具卡片显示定价模式标签（免费增值/付费等）

---

### Phase 2: 增强功能 / Enhanced Features（第3周 / Week 3）

**目标 / Goal**: 提供对比功能和社区提交，加入优惠码

| 任务 / Task | 优先级 | 预计时间 |
|---|---|---|
| 对比功能（最多3个工具，含价格对比）| P1 | 2天 |
| **优惠码模块**（展示、复制、来源标注）| **P1** | **1天** |
| 工具提交表单（前端）| P1 | 1天 |
| 提交审核后台（管理员）| P1 | 1天 |
| 用户本地收藏（localStorage，无需注册）| P2 | 0.5天 |

**验收标准 / Acceptance Criteria**:
- ✅ 用户可对比ChatGPT vs Claude vs Gemini（含价格对比）
- ✅ 工具详情页显示优惠码（如有）
- ✅ 用户可提交新工具，管理员可审核上线

---

### Phase 3: 数据扩充 / Data Expansion（第4周前半 / Week 4 First Half）

**目标 / Goal**: 扩充工具数量，建立价格历史数据基础

| 任务 / Task | 优先级 | 预计时间 |
|---|---|---|
| 数据爬虫开发（Product Hunt API + 官网）| P1 | 3天 |
| 数据清洗脚本（去重、标准化）| P1 | 1天 |
| **价格数据爬虫（抓取官网定价页）** | **P1** | **1天** |
| **价格历史记录表设计和数据初始化** | **P2** | **1天** |

**验收标准 / Acceptance Criteria**:
- ✅ 数据库收录100+真实AI工具
- ✅ 每个工具有完整信息（名称、描述、定价、分类、标签）
- ✅ 主要工具（Top 50）有价格历史初始数据

---

### Phase 4: 上线优化 / Launch Preparation（第4周后半 / Week 4 Second Half）

**目标 / Goal**: 优化性能、SEO，正式上线

| 任务 / Task | 优先级 | 预计时间 |
|---|---|---|
| SEO优化（meta标签 + JSON-LD结构化数据）| P1 | 1天 |
| **价格历史图表**（Chart.js折线图）| **P2** | **1天** |
| 性能优化（图片懒加载、ISR/SSG）| P1 | 1天 |
| 部署上线（Vercel + Railway）| P1 | 0.5天 |
| Bug修复和端到端测试 | P1 | 1天 |

**验收标准 / Acceptance Criteria**:
- ✅ Lighthouse 性能分数 > 90
- ✅ Google 可收录核心页面
- ✅ 网站正常访问，价格历史图表可展示
- ✅ 移动端体验流畅

---

### 里程碑总览 / Milestone Overview

```
Week 1  ████████████ Phase 1: 核心功能 + 价格展示
Week 2  ████████████ Phase 1: 前端对接 + 联调
Week 3  ████████████ Phase 2: 对比 + 提交 + 优惠码
Week 4  ████████████ Phase 3 + 4: 数据扩充 + 上线
```

---

## 7. 数据获取方案 / Data Acquisition Strategy

### 7.1 种子数据（冷启动）/ Seed Data (Cold Start)

**来源 / Sources**:
- 手工整理：Top 50 热门AI工具（ChatGPT, Claude, Midjourney等）
- Product Hunt API：获取AI类目工具列表（合规使用官方API）
- Hugging Face Spaces：开源AI工具参考

**数据字段标准 / Data Field Standard**:

```typescript
interface AITool {
  // 基础信息 / Basic Info
  id: string;
  name: string;              // 工具名
  nameZh?: string;           // 中文名（如有）
  slug: string;              // URL slug
  description: string;       // 英文描述
  descriptionZh: string;     // 中文描述
  websiteUrl: string;        // 官网
  logoUrl: string;           // Logo图片
  
  // 分类与标签 / Category & Tags
  categoryId: string;        // 一级分类
  tags: string[];            // 场景标签
  useCases: string[];        // 使用场景
  
  // 价格信息（核心）/ Pricing (Core)
  pricingModel: 'free' | 'freemium' | 'paid' | 'enterprise';
  minPrice?: number;         // 最低付费价格（美元/月）
  maxPrice?: number;         // 最高档价格
  hasFreeTriak: boolean;     // 是否有免费试用
  pricingPlans: PricingPlan[]; // 详细定价方案
  
  // 优惠信息 / Promotions
  promoCodes: PromoCode[];   // 当前有效优惠码
  
  // 数据来源 / Data Source
  sourceType: 'manual' | 'crawler' | 'community';
  lastPriceCheckedAt: Date;  // 最后价格核实时间
}

interface PricingPlan {
  name: string;        // Free / Pro / Enterprise
  price: number;       // 0 = 免费
  billingCycle: 'monthly' | 'annual' | 'one-time';
  features: string[];  // 主要功能点
  isPopular?: boolean; // 是否为推荐方案
}

interface PromoCode {
  code: string;
  discount: string;    // "20% off" / "首月免费"
  expiresAt?: Date;
  isVerified: boolean;
}
```

### 7.2 爬虫策略 / Crawler Strategy

**Phase 3 爬虫目标 / Crawler Targets**:

| 来源 / Source | 数据类型 | 合规方式 | 优先级 |
|---|---|---|---|
| Product Hunt API | 工具基础信息 | 官方API（需申请key）| P1 |
| 各工具官网 Pricing 页 | 定价方案 | robots.txt合规爬取 | P1 |
| AppSumo | 限时优惠信息 | 公开页面 | P2 |
| Future Tools | 工具列表参考 | 公开数据 | P2 |

**价格监控爬虫 / Price Monitor Crawler**（融合方案C）:
- 定时任务：每周爬取一次主要工具的定价页（100个核心工具）
- 检测规则：价格变动 ±5% 触发更新记录
- 存储：price_history 表记录每次价格快照
- Scheduled job: Weekly price scraping for top 100 tools
- Change detection: ±5% triggers a history record update

**合规声明 / Compliance Statement**:
- 严格遵守 robots.txt 规则
- 不爬取需登录才能访问的数据
- 爬取频率控制（每个域名间隔 ≥ 5秒）
- 数据仅用于展示，注明数据来源

---

## 8. 内容运营策略 / Content Operations

### 8.1 冷启动策略 / Cold Start Strategy

**第1周 / Week 1**:
- 手工录入50个高流量AI工具（保证数据质量）
- 每个工具均有中英双语描述和完整定价信息

**第2-4周 / Weeks 2-4**:
- 爬虫扩充至100+工具
- 人工审核每条爬虫数据（确保价格准确）
- 开放社区提交入口

### 8.2 用户贡献飞轮 / Community Contribution Flywheel

```
更多工具收录 → 更多用户访问 → 更多用户提交新工具 → 更多工具收录
More tools → More users → Users submit new tools → More tools (flywheel)
```

**激励机制 / Incentive Mechanism**（Phase 4）:
- 提交审核通过：获得"贡献者"徽章
- 提交工具被访问量达标：获得积分奖励
- 优质评论展示：优先排序（可见度奖励）

### 8.3 内容质量控制 / Content Quality Control

**工具信息质量标准 / Tool Info Quality Standards**:
- 必填字段：名称、官网、中英描述（≥50字）、一级分类、定价模式
- 价格信息：必须注明核实日期，超过30天未核实自动标注"价格待核实"
- 中文描述：必须是实际翻译或原创，禁止机器直译

**反垃圾策略 / Anti-spam**:
- 提交限频：同一IP每天最多提交3个工具
- 内容审核：管理员人工审核（MVP阶段）+ 关键词过滤
- 后期引入：邮件验证 + 信誉评分系统

---

## 9. 商业模式设计 / Business Model

### 9.1 收入来源 / Revenue Streams

**阶段一（上线后0-3个月）/ Stage 1 (0-3 months post-launch)**:
- 🎯 目标：验证用户需求，积累数据，暂不变现
- 免费使用所有功能

**阶段二（3-6个月）/ Stage 2 (3-6 months)**:
- 💰 **广告收入 / Advertising**
  - 工具列表"精选推广位"（Featured Placement）
  - 定价：$500-2000/月/位（视流量而定）
- 💰 **联盟佣金 / Affiliate Commission**
  - 通过优惠码和跳转链接追踪转化
  - 预计佣金率：10-30%（按工具定价策略而定）

**阶段三（6-12个月）/ Stage 3 (6-12 months)**:
- 💰 **高级订阅 / Premium Subscription**（$9.9/月）
  - 解锁功能：高级筛选、批量对比（5+工具）、降价提醒、导出报告
- 💰 **B端服务 / B2B Services**
  - 企业采购咨询（AI工具选型报告）
  - 工具厂商数据分析服务

### 9.2 定价策略 / Pricing Strategy

| 层级 / Tier | 价格 / Price | 功能 / Features |
|---|---|---|
| Free | $0 | 工具浏览、搜索、筛选、基础对比、优惠码查看 |
| Pro | $9.9/月 | + 高级筛选、5工具对比、降价提醒（10个工具）、收藏夹同步 |
| Team | $29/月 | + 团队共享收藏夹、批量对比报告导出、API访问 |

---

## 10. 技术架构概要 / Technical Architecture

### 10.1 技术栈 / Tech Stack

```
Frontend:
  Next.js 14 (App Router)     - 全栈框架，支持SSR/ISR/SSG
  TypeScript                  - 类型安全
  Tailwind CSS                - 样式（复用现有原型设计系统）
  shadcn/ui                   - 组件库
  Zustand                     - 状态管理（对比功能）
  Chart.js / Recharts         - 价格历史图表

Backend (Next.js API Routes):
  Prisma                      - ORM
  PostgreSQL                  - 主数据库
  Redis                       - 搜索缓存、热度计数
  NextAuth.js                 - 用户认证（Phase 4）

Infrastructure:
  Vercel                      - 前端部署（自动CI/CD）
  Railway / Supabase          - PostgreSQL托管
  Upstash                     - Redis托管（Serverless友好）
  Cloudflare R2               - Logo图片存储

Crawler:
  Node.js + Playwright        - 价格页爬虫
  Cheerio                     - HTML解析
  Cron Job (Vercel Cron)      - 定时任务
```

### 10.2 核心数据模型 / Core Data Models

```prisma
model Tool {
  id              String        @id @default(cuid())
  name            String
  nameZh          String?
  slug            String        @unique
  description     String        @db.Text
  descriptionZh   String        @db.Text
  websiteUrl      String
  logoUrl         String?
  
  // 关联 Relations
  categoryId      String
  category        Category      @relation(fields: [categoryId], references: [id])
  tags            TagOnTool[]
  pricingPlans    PricingPlan[]
  promoCodes      PromoCode[]
  priceHistory    PriceHistory[]
  
  // 价格快照 Price Snapshot
  pricingModel    PricingModel  // free | freemium | paid | enterprise
  minPrice        Float?
  
  // 元数据 Meta
  sourceType      SourceType    // manual | crawler | community
  lastPriceCheckedAt DateTime?
  viewCount       Int           @default(0)
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
}

model PricingPlan {
  id           String   @id @default(cuid())
  toolId       String
  tool         Tool     @relation(fields: [toolId], references: [id])
  name         String   // "Free" / "Pro" / "Enterprise"
  price        Float    // 0 for free
  billingCycle String   // "monthly" / "annual"
  isPopular    Boolean  @default(false)
  features     String[] // 功能列表
}

model PriceHistory {
  id        String   @id @default(cuid())
  toolId    String
  tool      Tool     @relation(fields: [toolId], references: [id])
  planName  String
  price     Float
  recordedAt DateTime @default(now())
  
  @@index([toolId, recordedAt])
}

model PromoCode {
  id         String    @id @default(cuid())
  toolId     String
  tool       Tool      @relation(fields: [toolId], references: [id])
  code       String
  discount   String
  expiresAt  DateTime?
  isVerified Boolean   @default(false)
  createdAt  DateTime  @default(now())
}
```

### 10.3 核心API设计 / Core API Design

```
GET  /api/tools              - 工具列表（分页+筛选+搜索）
GET  /api/tools/:slug        - 工具详情（含定价方案）
GET  /api/tools/:slug/price-history  - 价格历史
GET  /api/tools/compare      - 对比接口（query: ids=a,b,c）
GET  /api/categories         - 分类列表
GET  /api/tags               - 标签列表
POST /api/tools/submit       - 工具提交
POST /api/tools/:id/view     - 访问量计数

# 管理员接口 Admin APIs
GET  /api/admin/submissions  - 待审核列表
PUT  /api/admin/submissions/:id/approve - 审核通过
PUT  /api/admin/submissions/:id/reject  - 审核拒绝
POST /api/admin/tools/:id/promo-codes  - 添加优惠码
```

---

## 11. 成功指标 / Success Metrics

### 11.1 MVP上线验收指标 / MVP Launch Acceptance

| 指标 / Metric | 目标 / Target | 测量方式 / How to Measure |
|---|---|---|
| 工具数量 / Tool count | ≥ 100个 | 数据库记录数 |
| 有定价信息工具占比 / Tools with pricing | ≥ 80% | 数据库查询 |
| 有优惠码工具数量 / Tools with coupons | ≥ 10个 | 数据库记录数 |
| Lighthouse性能分数 / Performance | ≥ 90 | Lighthouse CI |
| 首屏加载时间 / FCP | ≤ 2秒 | Web Vitals |
| 搜索响应时间 / Search latency | ≤ 300ms | API监控 |

### 11.2 上线后北极星指标 / Post-Launch North Star

**核心指标（月度）/ Core KPIs (Monthly)**:

| 指标 / Metric | 第1个月 | 第3个月 | 第6个月 |
|---|---|---|---|
| 月活用户 MAU | 500 | 3,000 | 10,000 |
| 工具详情页UV | 200 | 1,500 | 5,000 |
| 外链点击率（跳转官网）/ Outbound CTR | 15% | 18% | 20% |
| 用户提交工具数 / Community submissions | 5 | 30 | 100 |
| 对比功能使用率 / Compare usage | 10% | 15% | 20% |
| 优惠码复制次数 / Coupon copies | 50 | 300 | 1,000 |

### 11.3 商业化指标 / Monetization KPIs（第6个月起）

| 指标 | 目标 |
|---|---|
| 广告位收入 / Ad revenue | $2,000/月 |
| 联盟佣金 / Affiliate | $1,000/月 |
| Pro订阅用户 / Pro subscribers | 100人 |

---

## 附录 / Appendix

### A. 术语表 / Glossary

| 术语 | 英文 | 说明 |
|---|---|---|
| 免费增值 | Freemium | 有免费版本，同时提供付费高级版 |
| 联盟佣金 | Affiliate | 通过推荐链接赚取转化佣金 |
| 飞轮效应 | Flywheel | 用户增长带动内容增长，再带动用户增长的正向循环 |
| ISR | Incremental Static Regeneration | Next.js增量静态再生，兼顾性能和数据时效 |
| 价格快照 | Price Snapshot | 某时刻的价格记录，用于构成历史曲线 |

### B. 风险与缓解 / Risks & Mitigation

| 风险 / Risk | 概率 | 影响 | 缓解方案 |
|---|---|---|---|
| 爬虫被封/反爬 | 中 | 高 | 限频+代理池+优先使用官方API |
| 价格数据滞后 | 高 | 中 | 标注"最后核实时间"，提示用户以官网为准 |
| 工具信息质量差 | 中 | 中 | 人工审核+评分机制 |
| 竞品快速模仿 | 低 | 中 | 快速迭代+中文社区运营壁垒 |
| 联盟政策变更 | 低 | 中 | 多元化收入来源 |

### C. 下一步行动 / Next Steps

- [ ] 确认技术栈和开发分工
- [ ] 设计数据库schema（基于本文档数据模型）
- [ ] 准备50个种子工具数据
- [ ] 复用现有静态原型，开始Phase 1后端对接
- [ ] 申请Product Hunt API访问权限

---

*文档维护：每次重大功能迭代后更新，版本号递增*  
*Document Maintenance: Update after each major feature iteration, increment version number*

*最后更新 / Last Updated: 2026-05-09*
