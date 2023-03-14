import Products from '../../components/Products'

export default function Topup() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Products submitTarget='/topup/checkout' enabled={true} />    </div>
  )
}