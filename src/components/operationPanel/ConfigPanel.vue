<style lang="scss" scoped>
#ConfigPanel {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    overflow: hidden;
    background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
    display: flex;
    flex-direction: column;

    .section {
        background: #ffffff;
        border-radius: 16px;
        padding: 20px;
        margin-bottom: 16px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
        border: 1px solid #f1f5f9;

        .section-title {
            font-size: 13px;
            font-weight: 600;
            color: #64748b;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;

            &::before {
                content: '';
                width: 3px;
                height: 14px;
                background: linear-gradient(180deg, #3b82f6 0%, #6366f1 100%);
                border-radius: 2px;
            }
        }
    }

    .time-settings-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 16px;
    }

    .time-card {
        background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
        border-radius: 12px;
        padding: 16px;
        border: 1px solid #e2e8f0;
        transition: all 0.2s ease;

        &:hover {
            border-color: #cbd5e1;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .time-card-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 12px;

            .time-icon {
                width: 36px;
                height: 36px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;

                &.focus {
                    background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
                }

                &.relax {
                    background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
                }

                &.later {
                    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                }
            }

            .time-label {
                flex: 1;

                .label-text {
                    font-size: 13px;
                    color: #64748b;
                    display: block;
                }

                .label-value {
                    font-size: 20px;
                    font-weight: 700;
                    color: #1e293b;
                    line-height: 1.2;

                    .unit {
                        font-size: 12px;
                        font-weight: 500;
                        color: #94a3b8;
                        margin-left: 2px;
                    }
                }
            }
        }

        .time-slider {
            margin-bottom: 12px;
        }

        .time-input-row {
            display: flex;
            align-items: center;
            gap: 8px;

            .el-slider {
                flex: 1;
            }

            .el-input-number {
                width: 70px;

                :deep(.el-input__inner) {
                    text-align: center;
                    font-weight: 600;
                }
            }
        }
    }

    .toggle-settings {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .toggle-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background: #f8fafc;
        border-radius: 10px;
        border: 1px solid #e2e8f0;
        transition: all 0.2s ease;

        &:hover {
            background: #f1f5f9;
        }

        .toggle-info {
            display: flex;
            align-items: center;
            gap: 12px;

            .toggle-icon {
                width: 32px;
                height: 32px;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;

                &.hitokoto {
                    background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
                }

                &.auto-start {
                    background: linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%);
                }
            }

            .toggle-text {
                .toggle-title {
                    font-size: 14px;
                    font-weight: 500;
                    color: #334155;
                    display: block;
                }

                .toggle-desc {
                    font-size: 12px;
                    color: #94a3b8;
                    margin-top: 2px;
                }
            }
        }
    }

    .content-wrapper {
        flex: 1;
        overflow-y: auto;
        overflow-x: hidden;
        margin: -20px;
        padding: 20px;
        // 增加底部 padding 避免内容被 actions 遮挡
        padding-bottom: 80px;

        &::-webkit-scrollbar {
            width: 0;
            height: 0;
        }
    }

    .actions {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        padding: 16px 20px;
        background: linear-gradient(180deg, rgba(248, 250, 252, 0) 0%, #f8fafc 30%, #f1f5f9 100%);
        border-top: none;
        z-index: 10;

        .el-button {
            min-width: 90px;
            border-radius: 8px;
            font-weight: 500;

            &.el-button--primary {
                background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
                border: none;

                &:hover {
                    background: linear-gradient(135deg, #2563eb 0%, #4f46e5 100%);
                }
            }
        }
    }
}
</style>

<template>
    <div :id="appName">
        <div class="content-wrapper">
            <!-- 时间设置区域 -->
            <div class="section">
                <div class="section-title">时间设置</div>
                <div class="time-settings-grid">
                    <!-- 专注时间 -->
                    <div class="time-card">
                        <div class="time-card-header">
                            <div class="time-icon focus">⏱️</div>
                            <div class="time-label">
                                <span class="label-text">专注时长</span>
                                <span class="label-value">{{ settingsStore.focusTime }}<span
                                        class="unit">分钟</span></span>
                            </div>
                        </div>
                        <div class="time-input-row">
                            <el-slider v-model="settingsStore.focusTime" :min="5" :max="120" :step="5"
                                :show-tooltip="false" />
                            <el-input-number v-model="settingsStore.focusTime" :min="5" :max="120" size="small"
                                controls-position="right" />
                        </div>
                    </div>

                    <!-- 休息时间 -->
                    <div class="time-card">
                        <div class="time-card-header">
                            <div class="time-icon relax">☕</div>
                            <div class="time-label">
                                <span class="label-text">休息时长</span>
                                <span class="label-value">{{ settingsStore.relaxTime }}<span
                                        class="unit">分钟</span></span>
                            </div>
                        </div>
                        <div class="time-input-row">
                            <el-slider v-model="settingsStore.relaxTime" :min="1" :max="30" :step="1"
                                :show-tooltip="false" />
                            <el-input-number v-model="settingsStore.relaxTime" :min="1" :max="30" size="small"
                                controls-position="right" />
                        </div>
                    </div>

                    <!-- 稍后提醒时间 -->
                    <div class="time-card">
                        <div class="time-card-header">
                            <div class="time-icon later">⏰</div>
                            <div class="time-label">
                                <span class="label-text">稍后提醒</span>
                                <span class="label-value">{{ settingsStore.laterTime }}<span
                                        class="unit">分钟</span></span>
                            </div>
                        </div>
                        <div class="time-input-row">
                            <el-slider v-model="settingsStore.laterTime" :min="1" :max="15" :step="1"
                                :show-tooltip="false" />
                            <el-input-number v-model="settingsStore.laterTime" :min="1" :max="15" size="small"
                                controls-position="right" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- 功能开关区域 -->
            <div class="section">
                <div class="section-title">功能开关</div>
                <div class="toggle-settings">
                    <div class="toggle-item">
                        <div class="toggle-info">
                            <div class="toggle-icon hitokoto">💬</div>
                            <div class="toggle-text">
                                <span class="toggle-title">显示一言</span>
                                <span class="toggle-desc">在界面上展示随机语录</span>
                            </div>
                        </div>
                        <el-switch v-model="settingsStore.hitokotoEnabled" />
                    </div>
                    <div class="toggle-item">
                        <div class="toggle-info">
                            <div class="toggle-icon auto-start">🚀</div>
                            <div class="toggle-text">
                                <span class="toggle-title">自动开始</span>
                                <span class="toggle-desc">打开插件后自动开始计时</span>
                            </div>
                        </div>
                        <el-switch v-model="settingsStore.autoStartTiming" />
                    </div>
                </div>
            </div>

        </div>

        <!-- 操作按钮 -->
        <div class="actions">
            <el-button @click="handleReset">重置默认</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
/**导入 */
// vue
import { ref, watch } from "vue";
// pinia
import { useSettingsStore } from "../../stores/settingsStore";
const settingsStore = useSettingsStore();
import { useTimingStore } from "../../stores/timingStore";
const timingStore = useTimingStore();
// utils
import settings from "../../settings";

/**变量 */
const appName = ref("ConfigPanel");

/**函数 */
// 保存设置
function saveSettings() {
    settingsStore.saveSettings();
    // 更新计时器时间
    const minMulti = settings.timing.minMulti;
    timingStore.focusTime = settingsStore.focusTime * minMulti;
    timingStore.relaxTime = settingsStore.relaxTime * minMulti;
    timingStore.laterTime = settingsStore.laterTime * minMulti;
}

// 重置设置
function handleReset() {
    settingsStore.resetSettings();
    // 更新计时器时间
    const minMulti = settings.timing.minMulti;
    timingStore.focusTime = settingsStore.focusTime * minMulti;
    timingStore.relaxTime = settingsStore.relaxTime * minMulti;
    timingStore.laterTime = settingsStore.laterTime * minMulti;
}

/**监听设置变化自动保存 */
watch(
    () => [
        settingsStore.focusTime,
        settingsStore.relaxTime,
        settingsStore.laterTime,
        settingsStore.hitokotoEnabled,
        settingsStore.autoStartTiming,
    ],
    () => {
        saveSettings();
    },
    { deep: true }
);
</script>
