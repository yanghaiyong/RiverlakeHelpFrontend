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

## API 配置

- 开发环境: Vite 代理 (http://localhost:8080)
- 生产环境: 通过环境变量 VITE_API_BASE_URL 配置

## 许可证

MIT
