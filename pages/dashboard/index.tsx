import { useState, useEffect } from 'react';
import moment from "moment";

export default function ShopPage() {
  const [formattedBalance, setFormattedBalance] = useState([]);
  const [fetchedTxs, setFetchedTxs] = useState([]);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(true);

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    if (password === "grizzlython") {
      setIsAuthenticated(true);
      setShowPasswordForm(false);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/getbalance")
        .then((response) => response.json())
        .then((data) => {
          const balance = data.data;
          setFormattedBalance(balance);
          const lastTenPrivTxs = data.lastTenPrivTxs;
          setFetchedTxs(lastTenPrivTxs);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [isAuthenticated]);

  return (
    <>
      {showPasswordForm ? (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center h-screen"
        >
          <label
            htmlFor="password"
            className="text-center text-xl font-thin text-white mb-4"
          >
            Please Enter your Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 rounded-md border border-gray-400 w-64"
          />
          <button
            type="submit"
            className="mt-4 w-64 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      ) : (
        isAuthenticated && (
          <div className="flex flex-col px-4 items-stretch max-w-4xl gap-8 m-auto min-h-screen mt-8">
            <div className="flex-col items-center justify-center">
              <div className="text-center text-xl font-thin text-white">
                Private USDC balance:
              </div>
              <div className="flex flex-col-2 items-center justify-center text-center text-6xl font-bold text-white">
                <div className="mb-7">
                  <span className="text-4xl font-light">$</span>
                </div>
                {formattedBalance}
              </div>
              <div className="flex flex-col-2 mt-4 space-x-8 items-center justify-center">
                <a
                  href="/topup"
                  className="w-32 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Top Up
                </a>
                <a
                  href="/send"
                  className="w-32 px-10 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Send
                </a>
              </div>
            </div>
            <div className="flex items-center px-4 justify-center">
              <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-2xl shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                    Latest Transactions
                  </h5>
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    View all
                  </a>
                </div>
                <div className="flow-root">
                  <ul
                    role="list"
                    className="divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    {fetchedTxs.map((tx: any, index: number) => (
                      <li key={index} className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {tx.txType === "SEND" ? (
                              <img
                                className="w-10 h-10 rounded-full"
                                src="/send.png"
                                alt="txtype"
                              />
                            ) : (
                              <img
                                className="w-12 h-12 rounded-full"
                                src="/topup.png"
                                alt="txtype"
                              />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate text-white">
                              <span
                                className={`${
                                  tx.txType === "SEND"
                                    ? "text-red-600 font-bold"
                                    : "text-green-600 font-bold"
                                } mr-2`}
                              >
                                {tx.txType === "SEND" ? "TRANSFER" : tx.txType}
                              </span>
                              {moment
                                .unix(tx.sig.blockTime)
                                .format("HH:mm, DD MMM YY")}
                            </p>
                            {tx.sig.memo && (
                              <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                Note: {tx.sig.memo.substring(4)}
                              </p>
                            )}
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                              <a
                                href={`https://solana.fm/tx/${tx.sig.signature}?cluster=devnet-solana`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 hover:underline"
                              >
                                solana.fm
                              </a>
                            </p>
                          </div>
                          <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                            $
                            {(Number(tx.amount) / 1000000)
                              .toFixed(2)
                              .toString()}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
}