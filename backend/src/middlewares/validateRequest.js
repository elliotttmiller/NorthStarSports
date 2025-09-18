// Request validation middleware (stub, to be implemented with joi/zod)
export default function validateRequest(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({
          success: false,
          error: { message: error.details[0].message, code: 400 },
        });
    }
    next();
  };
}
