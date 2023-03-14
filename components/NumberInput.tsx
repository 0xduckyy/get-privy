import { useState } from "react"

interface Props {
  name: string,
  formRef: React.RefObject<HTMLFormElement>,
}

export default function NumberInput({ name, formRef }: Props) {
  const [number, setNumber] = useState('5 USDC')

  return (
    <div
    >
      <input
        type="text"
        name={name}
        placeholder="5 USDC"
        className="mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
      />
    </div>
  )
}