import { INewProducts } from "./INewProducts";

export class NewProducts implements INewProducts {
  Id!: number;
  Name!: string;
  Price!: number;
  Stock!: number;
  Image?: string;
  Description!: string;
  Weight!: number;
  Size!: string;
  Color!: string;
  MaximumWeight!: number;
  Material!: string;
  BaseType!: string;
  BackrestHeight!: number;
  BackerstWidht!: number;
}
