export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const response = await fetch(
      `https://api.rolimons.com/players/v1/playerinfo/${userId}`
    );

    if (!response.ok) {
      return res.status(500).json({ error: "Rolimons API failed" });
    }

    const data = await response.json();

    res.status(200).json({
      rap: data.player?.rap || 0,
      value: data.player?.value || 0
    });

  } catch (err) {
    res.status(500).json({ error: "Proxy error" });
  }
}
