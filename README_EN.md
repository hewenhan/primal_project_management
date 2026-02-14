
# PrimalFocus

<div align="center">
  <p>
    <a href="README.md"><strong>[ 🇨🇳 简体中文 ]</strong></a> &nbsp;|&nbsp; 
    <strong>[ 🇺🇸 English ]</strong> &nbsp;|&nbsp; 
    <a href="README_JP.md"><strong>[ 🇯🇵 日本語 ]</strong></a> &nbsp;|&nbsp; 
    <a href="README_KR.md"><strong>[ 🇰🇷 한국어 ]</strong></a>
  </p>
</div>

> **Current Version**: v1.6.0
> **Tagline**: Evolve beyond procrastination.

PrimalFocus is a multi-language anti-procrastination tool based on evolutionary psychology. Instead of simple to-do lists, it uses AI to analyze your behavioral phenotype ("Archetype"), breaks down tasks into low-energy "micro-steps", and uses radical psychological strategies to transition you from a state of paralysis to execution.

---

## ✨ Key Features

### 1. 🧬 Psychological Profiling
*   **30-Point Behavioral Analysis**: Determines your procrastination style (e.g., Perfectionist, Rebel, low-energy).
*   **AI-Generated Report**: Generates a detailed profile including your "Core Fear", strengths, weaknesses, and recommended psychological protocols.
*   **Archetype System**: Assigns you a primal archetype (e.g., "The Perfectionist Hunter").

### 2. 🧠 AI Tactical Planning
*   **Vague to Actionable**: Turn abstract goals (e.g., "Write thesis") into concrete, non-threatening micro-tasks.
*   **Strategy Injection**: The AI assigns a specific psychological "Strategy" (e.g., "Trash Draft Protocol") to lower the barrier to entry.
*   **Mission Refinement**: Ability to "Edit/Refine" active missions by feeding new context to the AI (e.g., "I'm feeling overwhelmed") to recalibrate the plan.

### 3. ⚔️ Execution Mode
*   **Focus Timer**: Distraction-free interface for single-tasking.
*   **Panic Button (SOS)**: If you get stuck, hit the Panic Button. The AI instantly decomposes the current task into 3 laughable micro-steps to break the paralysis.
*   **Neural Ambience**: Integrated audio engine featuring:
    *   White Noise
    *   Pink Noise (Rain)
    *   Binaural Beats (40Hz Gamma for focus)

### 4. 🛡️ Mission Control
*   **Data Sovereignty**: All data is stored locally in your browser (`localStorage`).
*   **Backup System**: Full JSON Import/Export capabilities for data migration or backup.
*   **Gamification**: "Mission Complete" ceremonies to saturate dopamine receptors upon success.
*   **Archive System**: Review past victories and reactivate old missions.

### 5. 🌐 Multi-Language Support
The application automatically detects your system language or allows manual selection on startup.
*   **🇺🇸 English**
*   **🇨🇳 Simplified Chinese**
*   **🇯🇵 Japanese**
*   **🇰🇷 Korean**

---

## 🛠 Tech Stack

*   **Frontend**: React 18, TypeScript, Vite
*   **Styling**: Tailwind CSS (Cyberpunk/Dark Mode Theme)
*   **AI**: Google Gemini API (`gemini-3-flash-preview`)
*   **Icons**: Lucide React
*   **State/Storage**: React Hooks + LocalStorage

---

## 📅 Changelog

### v1.6.0 (Current)
*   **New**: **Onboarding System**. Added a "Spotlight" tutorial overlay to guide users through the Assessment, Dashboard, Planning, and Execution views.
*   **New**: **Language Setup**. Dedicated language selection modal for first-time users.
*   **Fix**: **Assessment Stability**. Added input locking to prevent "skipping" questions when typing fast or double-clicking, fixing index out-of-bounds errors.
*   **Fix**: **Tutorial Positioning**. Improved the overlay positioning logic to prevent tooltips from flying off-screen on mobile or small windows.
*   **Fix**: Resolved React hydration errors (`Minified React error #300`) caused by conditional hook execution.

### v1.5.0
*   **Feature**: **Panic Button**. Added an emergency button in Execution Mode. Uses AI to break down the active task if the user is stuck.
*   **Feature**: **Audio Engine**. Integrated a Web Audio API synthesizer for White Noise, Pink Noise, and Binaural Beats.
*   **Feature**: **Mission Refinement**. Added ability to "Edit" active missions. Users can provide new context, and AI will regenerate the remaining tasks without deleting completed ones.

### v1.4.0
*   **Feature**: **Localization**. Added full support for Chinese, Japanese, and Korean.
*   **UI**: Added `ProfileModal` to view detailed psychological analysis after the initial assessment.

### v1.3.0
*   **Feature**: **Data Portability**. Added `Import/Export` buttons for full system backup (JSON).
*   **Feature**: **Single Mission Import**. Added ability to share/import individual mission files.
*   **UX**: Added "Global Save" shortcut (`Ctrl+S`).

### v1.2.0
*   **Feature**: **Execution Logic**. Implemented the focus timer, task completion logic, and "Mission Complete" celebration screen.
*   **UX**: Added "Psychological Override" strategy display in the task list.

### v1.1.0
*   **Backend**: Integrated Google Gemini API.
*   **Feature**: Implemented the 30-question assessment logic and prompt engineering for psychological profiling.

### v1.0.0
*   Initial Release.
*   Basic Project CRUD (Create, Read, Update, Delete).
*   Cyberpunk UI implementation.

---

## © Copyright & License

**Copyright © 2026 PrimalFocus. All Rights Reserved.**

This software is **Proprietary**.

*   Unauthorized copying, modification, distribution, or use of this source code, design assets, and documentation, in whole or in part, is **strictly prohibited** without the explicit written permission of the author.
*   This codebase is intended for personal study and reference only. It may not be used for the development of derivative works.
*   The author reserves the right to pursue legal action against any unauthorized infringement.
