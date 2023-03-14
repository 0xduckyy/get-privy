import { useRef } from "react";
import { products } from "../lib/products"
import NumberInput from "./NumberInput";

interface Props {
  submitTarget: string;
  enabled: boolean;
}

export default function Products({ submitTarget, enabled }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form method="get" action={submitTarget} ref={formRef}>
      <div className="flex justify-center max-w-4xl m-auto">
        <div className="w-96 p-4 px-4 bg-white border border-gray-200 rounded-2xl shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div>
            {products.map((product) => {
              return (
                <div
                  className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
                  key={product.id}
                >
                  <h5 className="my-2 text-xl font-medium text-gray-900 dark:text-white">
                    Top Up Your Private Balance
                  </h5>
  
                  <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <label>Amount:</label>
                  </div>
                  <div>
                    <NumberInput name={product.id} formRef={formRef} />
                    <div className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">
                      <label>Password:</label>
                    </div>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              );
            })}
            <button className="w-full mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Top Up
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}  