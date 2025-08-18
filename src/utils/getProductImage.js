// utils/getProductImage.js
export function getProductImage(product) {
  if (product.images && product.images.length > 0) {
    return product.images[0];
  }

  // fallback per kategori
  const fallbackImages = {
    Fashion: "https://via.placeholder.com/300x200?text=Fashion",
    Sepatu: "https://via.placeholder.com/300x200?text=Shoes",
    Aksesoris: "https://via.placeholder.com/300x200?text=Accessories",
  };

  return fallbackImages[product.category] || "https://via.placeholder.com/300x200?text=No+Image";
}
