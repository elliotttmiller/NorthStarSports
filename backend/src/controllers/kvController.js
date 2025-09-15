import { kvService } from '../services/kvService.js';


export const getKV = async (req, res) => {
  const { key } = req.params;
  try {
    const value = await kvService.get(key);
    if (value === null || typeof value === 'undefined') {
      return res.status(404).json({ error: 'Not Found' });
    }
    res.json({ key, value });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};

export const setKV = async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  if (typeof value === 'undefined') {
    return res.status(400).json({ error: 'Missing value in body' });
  }
  try {
    await kvService.set(key, value);
    res.json({ key, value });
  } catch (err) {
    res.status(500).json({ error: 'Server error', details: err.message });
  }
};
