// 后端转发函数（部署到 Vercel 后会自动变成 /api/generate 接口）
// 作用：把前端的请求加上你的 API Key，再转发给 DeepSeek。
// 你的 Key 只存在 Vercel 的环境变量里，永远不会出现在网页代码里，安全。

export default async function handler(req, res) {
  // 只接受 POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "只支持 POST 请求" });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "服务端没配置 API Key，请在 Vercel 里添加环境变量 DEEPSEEK_API_KEY" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { system, user } = body;

    if (!user) {
      return res.status(400).json({ error: "缺少输入内容" });
    }

    const r = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        // deepseek-v4-flash 便宜快，足够写 Prompt；想要更高质量可改成 deepseek-v4-pro
        model: "deepseek-v4-flash",
        messages: [
          { role: "system", content: system || "" },
          { role: "user", content: user },
        ],
        temperature: 0.85,
        max_tokens: 3000,
        stream: false,
      }),
    });

    const data = await r.json();

    if (!r.ok) {
      const msg = (data && data.error && data.error.message) || "模型接口返回错误";
      return res.status(r.status).json({ error: msg });
    }

    const text =
      (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) ||
      "";

    return res.status(200).json({ text });
  } catch (e) {
    return res.status(500).json({ error: "请求失败：" + (e.message || "未知错误") });
  }
}
