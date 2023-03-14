import { FormEvent } from 'react'
import {useRouter} from 'next/router'
import {useState} from 'react'


export default function PageWithJSbasedForm() {
  const router = useRouter()
  const [route, setRoute] = useState()
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    router.push('/send/checkout')

    const form = event.target as HTMLFormElement
    const data = {
      amount: form.amount.value as number,
      key: form.key.value as string,
    }

    const response = await fetch('/api/data', {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const result = await response.json()
    alert(`Is this correct?: ${result.data}`)
  }
  return (
    <div className="flex justify-center items-center h-screen">
    <div className="w-full max-w-sm p-4 px-4 bg-white border border-gray-200 rounded-xl shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Authorise Private Transfers 
        </h5>
        <div>
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Amount
          </label>
          <input
            type="text"
            name="amount"
            id="amount"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="5 USDC"
            required
          />
        </div>
        <div>
          <label
            htmlFor="key"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Password
          </label>
          <input
            type="password"
            name="key"
            id="key"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
        >
          Authorise Payment
        </button>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Need Help?{" "}
          <a
            href="https://elusiv.io/"
            className="text-blue-700 hover:underline dark:text-blue-500"
          >
            Learn more about Elusiv.
          </a>
        </div>
      </form>
    </div>
  </div>
  )
}
