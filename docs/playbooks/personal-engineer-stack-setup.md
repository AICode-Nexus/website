---
title: 个人工程师栈搭建
description: 把平台、IDE、CLI、rules、hooks 和评估方式组合成一套可长期使用的个人 AI coding 栈。
slug: /playbooks/personal-engineer-stack-setup
sidebar_label: 个人工程师栈搭建
tags: [ai-coding, playbook, setup]
track: cross-track
kind: playbook
audience: individual
stage: intermediate
featured: false
---

# 个人工程师栈搭建

## 目标

把你的 AI coding 入口、规则文件、CLI、校验回路和复盘方式固定下来。

## 输入条件

- 你已经完成一次 7 天试用
- 你知道自己的主平台和备用入口
- 你愿意维护 repo rules

## 步骤

1. 选一个主平台和一个备用入口
2. 定义规则文件、目录边界和禁止修改区
3. 接入 lint、test、build 校验
4. 记录每周最常见的 3 类任务
5. 固化 bugfix / refactor / test workflow

## Prompt / Agent 合同

- 主平台负责日常高频任务
- CLI 负责验证与批处理
- Agent 只在清晰边界任务中执行

## 校验方式

- 每周复盘一次效率和返工
- 检查规则是否过期
- 检查 memory 是否引入错误上下文

## 风险与失败模式

- 栈太复杂，自己都记不住
- 没有备用方案
- 规则文件长期不更新

## 下一步

- [从个人工作流到团队协作](/docs/team-delivery/solo-to-team-transition)
- [指标与风险](/docs/team-delivery/metrics-and-risk)
