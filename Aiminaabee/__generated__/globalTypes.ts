/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export interface CartPayloadInput {
  productId: number;
  userQty: number;
}

export interface DeliveryLocation {
  id: number;
  name: string;
}

export interface FileInput {
  fileName: string;
  file: string;
  fileType: string;
}

export interface Filter {
  verified?: boolean | null;
}

export interface OrderPayload {
  shopId: number;
  productId: number;
  shippingAddressId: number;
  orderQty: number;
}

export interface OrderedProducts {
  id: number;
  name: string;
  defaultImage: string;
}

export interface OrederedItems {
  id: number;
  shopId: number;
  userId: number;
  products: OrderedProducts[];
}

export interface Sort {
  order?: SortOrder | null;
}

export interface pImageInput {
  productImage: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
