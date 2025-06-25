// models/cart.model.js
import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "UserStudent", // Reference your UserStudent model
      required: true,
      unique: true,       // One cart per student
    },
    items: [
      {
        course: {
          type: Schema.Types.ObjectId,
          ref: "Courses", // Your course model name
          required: true,
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Cart = mongoose.model("Cart", cartSchema);
