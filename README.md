# 爆款 Prompt 工坊 · 部署说明（零基础版）

这是一个能直接上线的网站项目。整个项目只有 3 个文件，你**不需要写代码、不需要装任何软件、不需要用命令行**。
照着下面四步做，大约 20 分钟就能拿到一个属于你自己的网址。

整个流程：**拿一个 DeepSeek 钥匙 → 把文件传到 GitHub → 在 Vercel 一键部署 → 得到网址**。

---

## 第 0 步：先认识这 3 个文件（不用改它们）

```
viral-prompt-site/
├── index.html          ← 网站本体（界面 + 全部功能）
├── api/
│   └── generate.js     ← 后端，负责安全地调用 DeepSeek
└── README.md           ← 就是本文件
```

> 为什么要后端？因为你的 API 钥匙不能直接写在网页里（谁都能看到、会被盗刷）。
> 后端的作用就是把钥匙藏在服务器上，网页只跟后端说话，钥匙永远不外泄。

---

## 第 1 步：注册 DeepSeek，拿到 API 钥匙

1. 打开 https://platform.deepseek.com ，用手机号注册登录。
2. 进入「**充值**」，先充个小额（例如 10 元，写 Prompt 很便宜，能用很久）。
3. 进入左侧「**API Keys**」→ 点「**创建 API Key**」。
4. 复制生成的那一串 `sk-xxxxxxxx`，**先存到记事本里**（它只显示一次，关掉就看不到了）。

> 这串就是你的钥匙，第 3 步要用。先放好，别发给任何人。

---

## 第 2 步：把项目传到 GitHub

GitHub 是放代码的地方，Vercel 会从这里读取你的项目。

1. 打开 https://github.com ，注册并登录。
2. 右上角「+」→「**New repository**」。
   - Repository name 随便填，例如 `prompt-agent`
   - 选「**Public**」
   - 点「**Create repository**」
3. 进入这个空仓库页面，点「**uploading an existing file**」（蓝色链接）。
4. 把我给你的压缩包**先解压**，然后把里面的 `index.html`、`README.md` 和整个 `api` 文件夹，**一起拖进上传框**。
   - ⚠️ 一定要保留 `api` 文件夹（里面的 `generate.js` 不能漏，也不能从文件夹里拿出来）。
5. 下方点「**Commit changes**」，等文件上传完。

---

## 第 3 步：在 Vercel 部署 + 填入钥匙

Vercel 是免费的网站托管平台，会自动把你的项目变成一个能访问的网址。

1. 打开 https://vercel.com ，点「**Sign Up**」，选「**Continue with GitHub**」用刚才的 GitHub 账号登录授权。
2. 进入后点「**Add New...**」→「**Project**」。
3. 找到刚才的仓库 `prompt-agent`，点它右边的「**Import**」。
4. 在部署设置页，找到「**Environment Variables（环境变量）**」一栏，添加：
   - **Name（名字）**：`DEEPSEEK_API_KEY`  ← 一个字都不能差，必须完全一样
   - **Value（值）**：粘贴你第 1 步存的那串 `sk-xxxxxxxx`
   - 点「**Add**」
5. 点最下面的「**Deploy**」，等待 1～2 分钟。
6. 看到撒花/成功页面后，点「**Visit**」或「**Continue to Dashboard**」，就能看到你的网址了，
   形如 `https://prompt-agent-xxxx.vercel.app` —— **这就是你的网站，可以分享给任何人。**

---

## 第 4 步：试用

打开网址 → 左边写一句话（或点示例）→ 选平台/类型 → 点「一键生成爆款 Prompt」。
右边出现成品后，用顶部的「复制全文 / 复制 Prompt / 下载 .md」，把内容粘贴到小云雀、即梦等平台即可出片。

---

## 常见问题

**Q：点生成后报错 “服务端没配置 API Key”？**
说明第 3 步的环境变量没填对。回到 Vercel → 项目 → Settings → Environment Variables，
确认名字就是 `DEEPSEEK_API_KEY`。改完后到「Deployments」点最新一条右侧「⋯」→「Redeploy」重新部署一次。

**Q：报错 “余额不足 / 401 / 鉴权失败”？**
钥匙错了或 DeepSeek 没余额。检查钥匙是否复制完整、账户是否已充值。

**Q：想让生成质量更高？**
打开 `api/generate.js`，把 `model: "deepseek-v4-flash"` 改成 `model: "deepseek-v4-pro"`，
重新上传 GitHub 后 Vercel 会自动更新（pro 更聪明，单价略高）。

**Q：想换成别的国内模型（智谱/通义等）？**
它们大多兼容同样的格式，只需在 `api/generate.js` 里改三处：接口地址 `https://api.deepseek.com/...`、
模型名 `model`、以及环境变量名。需要的话把你选的平台告诉我，我直接帮你改好。

**Q：以后怎么改文案、示例、配置项？**
界面文字、示例句、平台/风格选项都在 `index.html` 里（搜 `SAMPLES`、`BASIC`、`ADVANCED`），
改完重新传一次 GitHub 即可。
