export const validate = (product: ProductDTO): FormError[] => {
  const errors = []
  if (!product.title) errors.push({ path: 'title', message: 'Required' })
  if (!product.description) errors.push({ path: 'description', message: 'Required' })
  if (!product.price) errors.push({ path: 'price', message: 'Required' })
  if (product.price && isNaN(product.price)) errors.push({ path: 'price', message: 'Price invalid' })
  return errors
}