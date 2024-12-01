import { useParams } from "react-router-dom";

export const ShowCategories = ({ children, currentSubCategoryId }) => {
  const { subcategoryId } = useParams(); // Lấy tham số từ URL

  if (subcategoryId == currentSubCategoryId) {
    return children;
  }
  return null; // Nếu không khớp, không render gì
};
