<style lang="scss" scoped>
#ConfigPanel {
    width: 100%;
    height: 100%;
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;

    .setting-item {
        margin-bottom: 24px;

        .label {
            font-size: 14px;
            color: #333;
            margin-bottom: 8px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .value {
                font-weight: bold;
                color: #114fff;
            }
        }

        .slider-container {
            display: flex;
            align-items: center;
            gap: 12px;

            .el-slider {
                flex: 1;
            }

            .el-input-number {
                width: 80px;
            }
        }
    }

    .actions {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-top: 32px;

        .el-button {
            min-width: 100px;
        }
    }
}
</style>

<template>
    <div :id="appName">
        <!-- 专注时间 -->
        <div class="setting-item">
            <div class="label">
                <span>专注时间</span>
                <span class="value">{{ settingsStore.focusTime }} 分钟</span>
            </div>
            <div class="slider-container">
                <el-slider v-model="settingsStore.focusTime" :min="5" :max="120" :step="5" show-stops />
                <el-input-number v-model="settingsStore.focusTime" :min="5" :max="120" size="small"
                    controls-position="right" />
            </div>
        </div>

        <!-- 休息时间 -->
        <div class="setting-item">
            <div class="label">
                <span>休息时间</span>
                <span class="value">{{ settingsStore.relaxTime }} 分钟</span>
            </div>
            <div class="slider-container">
                <el-slider v-model="settingsStore.relaxTime" :min="1" :max="30" :step="1" show-stops />
                <el-input-number v-model="settingsStore.relaxTime" :min="1" :max="30" size="small"
                    controls-position="right" />
            </div>
        </div>

        <!-- 稍后提醒时间 -->
        <div class="setting-item">
            <div class="label">
                <span>稍后提醒时间</span>
                <span class="value">{{ settingsStore.laterTime }} 分钟</span>
            </div>
            <div class="slider-container">
                <el-slider v-model="settingsStore.laterTime" :min="1" :max="15" :step="1" show-stops />
                <el-input-number v-model="settingsStore.laterTime" :min="1" :max="15" size="small"
                    controls-position="right" />
            </div>
        </div>

        <!-- 一言开关 -->
        <div class="setting-item">
            <div class="label">
                <span>显示一言</span>
                <el-switch v-model="settingsStore.hitokotoEnabled" />
            </div>
        </div>

        <!-- 操作按钮 -->
        <div class="actions">
            <el-button @click="handleReset">重置</el-button>
            <el-button type="primary" @click="handleSave">保存</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
/**变量 */
const appName = ref("ConfigPanel");

/**函数 */

// 保存设置
function handleSave() {
    settingsStore.saveSettings();
    Message.success("设置已保存");

    // 更新计时器时间
    const minMulti = settings.timing.minMulti;
    timingStore.focusTime = settingsStore.focusTime * minMulti;
    timingStore.relaxTime = settingsStore.relaxTime * minMulti;
    timingStore.laterTime = settingsStore.laterTime * minMulti;
}

// 重置设置
function handleReset() {
    settingsStore.resetSettings();
    Message.success("已重置为默认设置");
}

/**导入 */
// vue
import { ref } from "vue";
// pinia
import { useSettingsStore } from "../../stores/settingsStore";
const settingsStore = useSettingsStore();
import { useTimingStore } from "../../stores/timingStore";
const timingStore = useTimingStore();
// utils
import settings from "../../settings";
import { Message } from "../../utils/notifier";
</script>
