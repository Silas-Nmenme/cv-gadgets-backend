import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
      maxlength: 40,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 150,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 3000,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
      index: true,
    },

    brand: { type: String, trim: true, maxlength: 80, default: "", index: true },
    model: { type: String, trim: true, maxlength: 120, default: "" },
    subcategory: { type: String, trim: true, maxlength: 100, default: "" },
    condition: { type: String, trim: true, maxlength: 60, default: "" },
    warranty: { type: String, trim: true, maxlength: 160, default: "" },
    specifications: { type: Map, of: String, default: {} },
    discountPrice: { type: Number, min: 0, default: 0 },
    price: {
      type: Number,
      required: true,
      min: 0,
    },

    images: {
      type: [
        {
          type: String,
          trim: true,
        },
      ],
      default: [],
    },

    imagePublicIds: {
      type: [String],
      default: [],
    },

    sizes: {
      type: [String],
      default: [],
    },

    colours: {
      type: [String],
      default: [],
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "Stock must be a whole number.",
      },
    },

    lowStockThreshold: {
      type: Number,
      default: 5,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "Low-stock threshold must be a whole number.",
      },
    },

    featured: {
      type: Boolean,
      default: false,
      index: true,
    },

    active: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ active: 1, category: 1, createdAt: -1 });
productSchema.index({ active: 1, brand: 1, category: 1 });

const Product =
  mongoose.models.Product ||
  mongoose.model("Product", productSchema);

export { Product };
export default Product;
