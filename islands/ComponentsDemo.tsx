import { useState } from "preact/hooks";
import Button from "@components/ui/Button.tsx";
import Card, {
  CardContent,
  CardHeader,
  CardTitle,
} from "@components/ui/Card.tsx";
import Input from "@components/ui/Input.tsx";
import Modal, { ModalBody, ModalFooter } from "@components/ui/Modal.tsx";

export default function ComponentsDemo() {
  const [modalOpen, setModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [floatingValue, setFloatingValue] = useState("");

  return (
    <div className="space-y-8">
      {/* 按钮组件 */}
      <Card>
        <CardHeader>
          <CardTitle>按钮组件 (Button)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* 按钮变体 */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                变体
              </h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="gradient">Gradient</Button>
                <Button variant="glass">Glass</Button>
              </div>
            </div>

            {/* 按钮尺寸 */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                尺寸
              </h4>
              <div className="flex items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            {/* 按钮状态 */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                状态
              </h4>
              <div className="flex gap-3">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 卡片组件 */}
      <Card>
        <CardHeader>
          <CardTitle>卡片组件 (Card)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card variant="default" padding="sm">
              <CardHeader>
                <CardTitle as="h4">默认卡片</CardTitle>
              </CardHeader>
              <CardContent>
                这是一个默认样式的卡片组件。
              </CardContent>
            </Card>

            <Card variant="hover" padding="md">
              <CardHeader>
                <CardTitle as="h4">悬浮卡片</CardTitle>
              </CardHeader>
              <CardContent>
                鼠标悬浮时会有动画效果。
              </CardContent>
            </Card>

            <Card variant="glass" padding="lg">
              <CardHeader>
                <CardTitle as="h4">玻璃态卡片</CardTitle>
              </CardHeader>
              <CardContent>
                具有玻璃态效果的卡片。
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* 输入框组件 */}
      <Card>
        <CardHeader>
          <CardTitle>输入框组件 (Input)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* 基础输入框 */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                基础输入框
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* 浮动标签输入框 */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                浮动标签
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* 输入框尺寸 */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                尺寸
              </h4>
              <div className="space-y-3">
                <Input size="sm" placeholder="小尺寸输入框" />
                <Input size="md" placeholder="中等尺寸输入框" />
                <Input size="lg" placeholder="大尺寸输入框" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 模态框组件 */}
      <Card>
        <CardHeader>
          <CardTitle>模态框组件 (Modal)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              点击按钮打开模态框演示
            </p>
            <Button onClick={() => setModalOpen(true)}>
              打开模态框
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 工具类演示 */}
      <Card>
        <CardHeader>
          <CardTitle>样式工具类</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* 动画 */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                动画效果
              </h4>
              <div className="flex gap-4">
                <div className="animate-fade-in p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  淡入动画
                </div>
                <div className="animate-slide-up p-4 bg-green-100 dark:bg-green-900 rounded-lg">
                  滑入动画
                </div>
              </div>
            </div>

            {/* 文本渐变 */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                文本渐变
              </h4>
              <h2 className="text-2xl font-bold text-gradient">
                这是渐变文本效果
              </h2>
            </div>

            {/* 玻璃态效果 */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                玻璃态效果
              </h4>
              <div className="glass-effect p-4 rounded-lg">
                这是玻璃态背景效果
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 模态框 */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="模态框演示"
        size="md"
      >
        <ModalBody>
          <p className="mb-4">这是一个模态框的内容区域。</p>
          <p>你可以在这里放置任何内容，比如表单、图片或其他组件。</p>
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
