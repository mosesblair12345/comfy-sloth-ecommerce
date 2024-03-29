import axios from "axios";
import React, { useContext, useEffect, useReducer, useState } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import { single_product_url as urlsingle } from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
  isSidebarOpen: false,
  products_loading: true,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: true,
  single_product_error: false,
  single_product: {},
};

const ProductsContext = React.createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSideBar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  };
  const closeSideBar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  };

  const fetchProducts = (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    axios
      .get(url)
      .then(function (response) {
        const products = response.data;
        dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
      })
      .catch(function (error) {
        dispatch({ type: GET_PRODUCTS_ERROR });
        console.log(error);
      });
  };
  const fetchSingleProduct = (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    axios
      .get(url)
      .then(function (response) {
        const singleProduct = response.data;
        dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: singleProduct });
      })
      .catch(function (error) {
        console.log(error);
        dispatch({ type: GET_SINGLE_PRODUCT_ERROR });
      });
  };
  useEffect(() => {
    fetchProducts(url);
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSideBar,
        closeSideBar,
        fetchSingleProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
