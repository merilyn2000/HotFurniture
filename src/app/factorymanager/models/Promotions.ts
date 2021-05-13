import { IPromotions } from "./IPromotions";

export class Promotions implements IPromotions {
  Id!: number;
  Name!: string;
  Category!: string;
  Price!: number;
  NewPrice!: number;
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
