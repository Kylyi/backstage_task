type Product = {
  id: number
  title: string
  price: string
  description: string
  image?: string
}

type ProductDTO = {
  title: string
  price: number
  description: string
  image?: string
}

type FormError = {
  path: string
  message: string
}
