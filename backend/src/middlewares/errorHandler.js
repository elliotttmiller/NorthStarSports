// Centralized error handler middleware
export default function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(err.status || 500).json({ success: false, error: { message: err.message || 'Internal Server Error', code: err.status || 500 } });
}
