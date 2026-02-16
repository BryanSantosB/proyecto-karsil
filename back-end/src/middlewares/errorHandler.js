export const errorHandler = (err, req, res, next) => {
  console.error("ERROR 💥:", err);

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  });
};
