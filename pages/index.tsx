import Head from "next/head";


export default function Home() {
  return (
    <div>
      <Head>
        <title>privy | private payments</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="flex flex-wrap-reverse pb-10 text-white overflow-hidden">
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-10 lg:px-8 xl:mt-20 lg:w-100">
          <div className="mt-10 relative">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative pb-8">
                <h1 className="text-7xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-7xl text-white">
                  <span className="block xl:inline text-white">
                    privy - The only way to Solana{" "}
                  </span>

                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-400 xl:inline mb-6">
                    Pay{" "}
                  </span>
                </h1>
                <p className="mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 text-gray-300">
                  Welcome to Privy, the secure and private payment solution for
                  Solana Pay. Our{" "}
                  <a
                    className="underline decoration-4 text-white decoration-emerald-500 font-bold"
                    href="#"
                  >
                    Privy
                  </a>{" "}
                  Card, powered by Elusiv, enables Solana Pay payments while
                  ensuring privacy for both buyers and merchants.
                </p>
                <p className="mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 text-gray-300">
                  Our goal is to solve the problem of privacy in Solana Pay
                  payments, so that it can achieve mass adoption. No one wants
                  to be robbed after making a payment, whether it's for a cup of
                  coffee or any other purchase. Similarly, businesses want to
                  keep their revenues private from their competitors.
                </p>
                <p className="mt-3 text-base sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 text-gray-300">
                  With Privy, you can enjoy the benefits of private payments on
                  Solana Pay without sacrificing usability. We are committed to
                  providing a seamless payment experience that prioritises
                  security and privacy.
                </p>
                <div className="mt-8">
                  <a
                    href="/dashboard"
                    className="px-16 py-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Launch App
                  </a>
                </div>
              </div>
              <div className="relative">
                <div className="lg:shrink-0 lg:relative">
                  <div className="lg:relative md:relative lg:w-[170%]">
                    <img
                      className="md:relative lg:absolute rounded-3xl"
                      src="/privysite.png"
                      alt="privybanner"
                    />
                  </div>
                </div>
              </div>
            </dl>
          </div>
        </main>
      </div>

      <div className="flex flex-wrap-reverse bg-neutral-900 pb-10 text-white rounded-xl">
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-10 lg:px-8 xl:mt-20 lg:w-100">
          <div className="text-center py-">
            <h2 className="text-5xl">Features of Privy</h2>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-4xl">
                    <img className="h-8 w-8" src="/eye.png" alt="private"></img>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white">
                    Private - Payments from Private Balance
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  We ensure that your wallet address and balance are kept secure
                  and protected from unauthorized access. When you use the Privy
                  Card to make payments, the funds are transferred directly from
                  your private balance to the merchant's wallet of choice. We
                  understand that privacy and security are paramount when it
                  comes to financial transactions. At Privy, we prioritize the
                  protection of your personal and financial information at all
                  times. You can trust that your wallet address and balance will
                  remain confidential and secure with us.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-800 text-white text-3xl">
                    <img
                      className="h-8 w-8"
                      src="/shield.png"
                      alt="secure"
                    ></img>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white">
                    Secure - Sybil-Resistant
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  At Privy, we use state-of-the-art Sybil protection to prevent
                  unauthorized access to your private balance. This means that
                  your funds cannot be drained unless they are authenticated.
                  Additionally, whenever a private payment is made, an alert is
                  sent to your Dialect Messenger. This way, you can keep track
                  of all your transactions and ensure that they are legitimate.
                  Check out our demo to learn more!
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white text-3xl">
                    <img className="h-8 w-8" src="/flash.png" alt="flash"></img>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white">
                    Fast - powered by the Solana Blockchain
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  Thanks to our powerful combination of Solana and Elusiv
                  technology, transactions settle and confirm in seconds. This
                  means that we can offer a user experience that is faster and
                  smoother than what's possible on other blockchain networks.
                </dd>
              </div>

              <div className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-800 text-white text-3xl">
                    <img
                      className="h-6 w-6"
                      src="/solana.png"
                      alt="solana"
                    ></img>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-white">
                    Fully Solana Pay Compatible
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500">
                  With Privy, you no longer have to worry about whether your
                  merchant only accepts Transaction Request spec. Our solution
                  is fully compatible with Solana Pay and works seamlessly with
                  any Solana Wallet. This ensures that you can make payments
                  with ease and without any hassles.
                </dd>
              </div>
            </dl>
          </div>
        </main>
      </div>
      <div className="flex flex-wrap-reverse bg-black pb-12 text-white">
        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-10 lg:px-8 xl:mt-20 lg:w-100"></main>
      </div>
    </div>
  );
}