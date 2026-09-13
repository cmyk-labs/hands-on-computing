export interface Product { name: string; price: number }
export function label(product: Product): string {
  return product.name + ":" + product.price;
}
