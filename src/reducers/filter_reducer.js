import { act } from "react-dom/test-utils";
import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((p) => p.price);
      maxPrice = Math.max(...maxPrice);
      let minPrice = action.payload.map((p) => p.price);
      minPrice = Math.min(...minPrice);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: {
          ...state.filters,
          max_price: maxPrice,
          price: maxPrice,
          min_price: minPrice,
        },
      };
    case SET_GRIDVIEW:
      return { ...state, grid_view: true };
    case SET_LISTVIEW:
      return { ...state, grid_view: false };
    case UPDATE_SORT:
      return { ...state, sort: action.payload };
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let tempProducts = [...filtered_products];
      if (sort === "price-lowest") {
        tempProducts = tempProducts.sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === "price-highest") {
        tempProducts = tempProducts.sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort === "name-a") {
        tempProducts = tempProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "name-z") {
        tempProducts = tempProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return { ...state, filtered_products: tempProducts };
    case UPDATE_FILTERS:
      console.log("i am being updated");
      const { name, value } = action.payload;
      console.log(value);
      return { ...state, filters: { ...state.filters, [name]: value } };
    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };
    case FILTER_PRODUCTS:
      const { all_products } = state;
      const { text, company, category, color, price, shipping } = state.filters;
      let tempProduct = [...all_products];
      // filtering
      // text
      if (text) {
        tempProduct = tempProduct.filter((product) => {
          return product.name.toLowerCase().startsWith(text);
        });
      }
      // category
      if (category !== "all") {
        tempProduct = tempProduct.filter((product) => {
          return product.category === category;
        });
      }
      // company
      if (company !== "all") {
        tempProduct = tempProduct.filter((product) => {
          return product.company === company;
        });
      }
      // colors
      if (color !== "all") {
        tempProduct = tempProduct.filter((product) => {
          return product.colors.find((c) => c === color);
        });
      }
      // price
      tempProduct = tempProduct.filter((product) => product.price <= price);
      // shipping
      if (shipping) {
        tempProduct = tempProduct.filter((product) => {
          return product.shipping === true;
        });
      }
      return { ...state, filtered_products: tempProduct };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
