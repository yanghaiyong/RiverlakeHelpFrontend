# RiverLake Help Frontend

RiverLake Help 前端应用，基于 Vue 3 + Capacitor 构建的跨平台应用。

## 技术栈

- **前端框架**: Vue 3.4
- **构建工具**: Vite 5
- **移动端**: Capacitor 6
- **HTTP 客户端**: Axios

## 项目结构

```
src/
├── main.js           # 入口文件
├── App.vue           # 主组件
└── plugins/          # 插件配置
    ├── index.js      # Axios 配置
    └── capacitor.js  # Capacitor 插件
index.html            # HTML 入口
vite.config.js       # Vite 配置
capacitor.config.json # Capacitor 配置
Dockerfile            # Docker 构建文件
nginx.conf            # Nginx 配置
k8s/
└── dev/riverlake-help-frontend.yaml
```

## 快速开始

### Web 开发

```bash
npm install
npm run dev
```

前端将在 http://localhost:5173 启动

### 移动端开发

```bash
npx cap add android
npx cap add ios
npm run capacitor:dev
```

## 构建说明

### Web 构建

```bash
npm run build
```

### Android 构建

```bash
npm install
npm run capacitor:build
npx cap sync android
npx cap open android
```

### iOS 构建（仅 Mac）

```bash
npm install
npm run capacitor:build
npx cap sync ios
cd ios/App && pod install
npx cap open ios
```

### Docker 构建

```bash
docker build -t riverlake-help-frontend:latest .
docker run -p 80:80 riverlake-help-frontend:latest
```

### Kubernetes 部署

```bash
kubectl apply -f k8s/dev/riverlake-help-frontend.yaml
```

## CI/CD

使用 GitLab CI/CD，配置文件：`.gitlab-ci.yml`

### 阶段

1. **build** - NPM 构建
2. **docker** - Docker 镜像构建并推送
3. **deploy** - Kubernetes 部署

### CI/CD 变量

| 变量名 | 说明 |
|--------|------|
| CI_REGISTRY | Docker Registry 地址 |
| CI_REGISTRY_USER | 仓库用户名 |
| CI_REGISTRY_PASSWORD | 仓库密码 |
| KUBECONFIG_CONTENT | Base64 编码的 kubeconfig |

## 环境配置

### 环境文件说明

对应 K8S 标准环境：`dev` → `test` → `pre-prod` → `prod`

| 文件 | K8S环境 | 用途 | 说明 |
|------|---------|------|------|
| `.env.dev` | dev | 开发环境 | 本地开发，连接本地后端 |
| `.env.test` | test | 测试环境 | 连接测试服务器 |
| `.env.pre-prod` | pre-prod | 预发布环境 | 连接预生产服务器 |
| `.env.prod` | prod | 生产环境 | 线上生产环境 |

### VITE_API_TARGET 配置说明

`VITE_API_TARGET` 用于 Vite 开发服务器的 API 代理。开发模式下请求 `/api/*` 会被代理到此地址。

#### 不同后端地址配置方式：

```bash
# 本地后端
VITE_API_TARGET=http://localhost:8080

# 局域网后端
VITE_API_TARGET=http://192.168.1.100:8080

# 线上后端
VITE_API_TARGET=https://api.production.com

# K8S 集群内部 - 同 namespace
VITE_API_TARGET=http://backend-service:8080

# K8S 集群内部 - 不同 namespace
VITE_API_TARGET=http://backend-service.namespace:8080

# K8S NodePort 暴露
VITE_API_TARGET=http://<节点IP>:30080

# K8S Ingress 域名
VITE_API_TARGET=https://backend.ingress.domain.com
```

### 切换不同环境的后端

修改对应环境文件中的 `VITE_API_TARGET` 即可。例如连接 K8S test 环境后端：

```bash
# 编辑 .env.test
VITE_API_TARGET=http://k8s-test-backend:8080
```

## 测试方法

### Web 环境测试

#### 1. 开发环境 (dev)

```bash
npm install
npm run dev
```

前端运行在 http://localhost:5173，API 代理到 `.env.dev` 中的 `VITE_API_TARGET`（默认 `localhost:8080`）

#### 2. 测试环境 (test)

```bash
npm run dev:test
```

#### 3. 预发布环境 (pre-prod)

```bash
npm run dev:pre-prod
```

#### 4. 生产构建测试

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

### 移动端测试

#### Android 测试

```bash
# 首次配置
npx cap add android

# 开发模式（热重载）
npm run capacitor:dev

# 构建 APK
npm run capacitor:build
npx cap sync android
npx cap open android
```

#### iOS 测试（仅 Mac）

```bash
# 首次配置
npx cap add ios

# 开发模式
npm run capacitor:dev

# 构建
npm run capacitor:build
npx cap sync ios
cd ios/App && pod install
npx cap open ios
```

### Docker 测试

```bash
# 构建镜像
docker build -t riverlake-help-frontend:latest .

# 运行容器（开发模式连接本地后端）
docker run -p 80:80 riverlake-help-frontend:latest

# 运行容器并指定后端地址
docker run -p 80:80 -e VITE_API_TARGET=http://host.docker.internal:8080 riverlake-help-frontend:latest
```

### Kubernetes 测试

部署到 K8S 开发环境：

```bash
kubectl apply -f k8s/dev/riverlake-help-frontend.yaml
```

如需修改后端地址，编辑 k8s 配置文件中的环境变量。

## 常用命令

```bash
# 安装依赖
npm install

# 开发环境 (dev) - 连接本地后端
npm run dev

# 测试环境 (test)
npm run dev:test

# 预发布环境 (pre-prod)
npm run dev:pre-prod

# 生产构建
npm run build

# 按环境构建
npm run build:dev
npm run build:test
npm run build:pre-prod
npm run build:prod

# 预览构建结果
npm run preview
```

## 许可证

MIT
