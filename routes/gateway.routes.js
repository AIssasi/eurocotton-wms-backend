import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
const router = express.Router();
import { protect } from '#middleware/auth/auth.middleware';

router.post(
  '/test',
  protect,
  createProxyMiddleware({
    target: 'https://webhook.site/5da6610c-0275-4aa8-b214-386965ae11a3',
    changeOrigin: true,
    pathRewrite: {
      '^/test': '',
    },
  })
);

export default router;
