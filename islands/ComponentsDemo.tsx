import Button from "@components/ui/Button.tsx";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/ui/Card.tsx";
import Input from "@components/ui/Input.tsx";
import Modal, { ModalBody, ModalFooter } from "@components/ui/Modal.tsx";
import { useState } from "preact/hooks";

export default function ComponentsDemo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [floatingValue, setFloatingValue] = useState("");

  return (
    <div className="space-y-16">
      {/* 按钮组件 */}
      <div id="buttons" className="group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-rose-500/8 to-red-500/10 rounded-4xl blur-2xl group-hover:blur-3xl transition-all duration-700 group-hover:scale-105">
        </div>
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-10 rounded-4xl shadow-2xl border border-white/60 dark:border-gray-700/60 hover:shadow-3xl transition-all duration-700 group-hover:-translate-y-2">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mr-6 shadow-lg">
              🔘
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                按钮组件 (Button)
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                多种样式、尺寸和状态的按钮组件
              </p>
            </div>
          </div>

          <div className="space-y-10">
            {/* 按钮变体 */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  变体样式
                </h4>
              </div>
              <div className="p-6 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex flex-wrap gap-4">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="gradient">Gradient</Button>
                  <Button variant="glass">Glass</Button>
                </div>
              </div>
            </div>

            {/* 按钮尺寸 */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-rose-500 rounded-full"></div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  尺寸大小
                </h4>
              </div>
              <div className="p-6 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                </div>
              </div>
            </div>

            {/* 按钮状态 */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  交互状态
                </h4>
              </div>
              <div className="p-6 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex gap-4">
                  <Button loading>Loading</Button>
                  <Button disabled>Disabled</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 卡片组件 */}
      <div id="cards" className="group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-violet-500/8 to-indigo-500/10 rounded-4xl blur-2xl group-hover:blur-3xl transition-all duration-700 group-hover:scale-105">
        </div>
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-10 rounded-4xl shadow-2xl border border-white/60 dark:border-gray-700/60 hover:shadow-3xl transition-all duration-700 group-hover:-translate-y-2">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mr-6 shadow-lg">
              📋
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                卡片组件 (Card)
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                灵活的卡片容器，支持多种变体和内边距
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  卡片变体
                </h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card
                  variant="default"
                  padding="sm"
                  className="hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <CardTitle as="h4" className="text-lg">默认卡片</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      这是一个默认样式的卡片组件，适用于大多数场景。
                    </p>
                  </CardContent>
                </Card>

                <Card
                  variant="hover"
                  padding="md"
                  className="transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle as="h4" className="text-lg">悬浮卡片</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      鼠标悬浮时会有优雅的动画效果和阴影变化。
                    </p>
                  </CardContent>
                </Card>

                <Card variant="glass" padding="lg" className="backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle as="h4" className="text-lg">
                      玻璃态卡片
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      具有现代化玻璃态毛玻璃效果的卡片样式。
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 输入框组件 */}
      <div id="inputs" className="group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/8 to-cyan-500/10 rounded-4xl blur-2xl group-hover:blur-3xl transition-all duration-700 group-hover:scale-105">
        </div>
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-10 rounded-4xl shadow-2xl border border-white/60 dark:border-gray-700/60 hover:shadow-3xl transition-all duration-700 group-hover:-translate-y-2">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mr-6 shadow-lg">
              ✏️
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                输入框组件 (Input)
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                功能强大的表单输入组件，支持多种类型和样式
              </p>
            </div>
          </div>

          <div className="space-y-10">
            {/* 基础输入框 */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  基础输入框
                </h4>
              </div>
              <div className="p-6 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="用户名"
                    placeholder="请输入用户名"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                  />
                  <Input
                    label="密码"
                    type="password"
                    placeholder="请输入密码"
                    helperText="密码至少8位字符"
                  />
                </div>
              </div>
            </div>

            {/* 浮动标签输入框 */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  浮动标签样式
                </h4>
              </div>
              <div className="p-6 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    variant="floating"
                    label="邮箱地址"
                    type="email"
                    value={floatingValue}
                    onChange={(e) => setFloatingValue(e.currentTarget.value)}
                  />
                  <Input
                    variant="floating"
                    label="手机号码"
                    type="tel"
                    error="手机号码格式不正确"
                  />
                </div>
              </div>
            </div>

            {/* 输入框尺寸 */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  尺寸变化
                </h4>
              </div>
              <div className="p-6 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="space-y-4">
                  <Input size="sm" placeholder="小尺寸输入框" />
                  <Input size="md" placeholder="中等尺寸输入框" />
                  <Input size="lg" placeholder="大尺寸输入框" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 模态框组件 */}
      <div id="modals" className="group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/8 to-green-500/10 rounded-4xl blur-2xl group-hover:blur-3xl transition-all duration-700 group-hover:scale-105">
        </div>
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-10 rounded-4xl shadow-2xl border border-white/60 dark:border-gray-700/60 hover:shadow-3xl transition-all duration-700 group-hover:-translate-y-2">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 via-teal-500 to-green-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mr-6 shadow-lg">
              🗂️
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                模态框组件 (Modal)
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                可自定义的对话框组件，支持多种尺寸和功能
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  交互演示
                </h4>
              </div>
              <div className="p-6 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="space-y-4">
                  <p className="text-gray-600 dark:text-gray-300">
                    点击下方按钮体验模态框的打开和关闭效果
                  </p>
                  <Button
                    onClick={() => setModalOpen(true)}
                    variant="gradient"
                    className="bg-gradient-to-r from-emerald-500 to-teal-500"
                  >
                    打开模态框演示
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 工具类演示 */}
      <div className="group relative">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-amber-500/8 to-yellow-500/10 rounded-4xl blur-2xl group-hover:blur-3xl transition-all duration-700 group-hover:scale-105">
        </div>
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-10 rounded-4xl shadow-2xl border border-white/60 dark:border-gray-700/60 hover:shadow-3xl transition-all duration-700 group-hover:-translate-y-2">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold mr-6 shadow-lg">
              🛠️
            </div>
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                样式工具类
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                预定义的工具类和动画效果
              </p>
            </div>
          </div>

          <div className="space-y-10">
            {/* 动画效果 */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  动画效果
                </h4>
              </div>
              <div className="p-6 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="flex gap-6">
                  <div className="animate-fade-in p-6 bg-blue-100 dark:bg-blue-900/50 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="text-blue-800 dark:text-blue-200 font-semibold">
                      淡入动画
                    </div>
                  </div>
                  <div className="animate-slide-up p-6 bg-green-100 dark:bg-green-900/50 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="text-green-800 dark:text-green-200 font-semibold">
                      滑入动画
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 文本渐变 */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  文本渐变
                </h4>
              </div>
              <div className="p-6 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <h2 className="text-3xl font-bold text-gradient">
                  这是美丽的渐变文本效果
                </h2>
              </div>
            </div>

            {/* 玻璃态效果 */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  玻璃态效果
                </h4>
              </div>
              <div className="p-6 bg-gray-50/50 dark:bg-gray-900/30 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="glass-effect p-6 rounded-xl">
                  <div className="text-gray-700 dark:text-gray-300 font-semibold">
                    这是现代化的玻璃态背景效果
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 模态框 */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="模态框演示"
        size="md"
      >
        <ModalBody>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              这是一个功能完整的模态框组件演示。
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              您可以在这里放置任何内容，比如表单、图片、视频或其他复杂的组件结构。
            </p>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                💡 提示：模态框支持多种尺寸和自定义样式
              </p>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)}>
            取消
          </Button>
          <Button variant="primary" onClick={() => setModalOpen(false)}>
            确认
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
