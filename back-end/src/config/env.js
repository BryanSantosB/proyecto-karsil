import "dotenv/config";

export const port = process.env.PORT || 4000;
export const env = process.env.NODE_ENV || "development";