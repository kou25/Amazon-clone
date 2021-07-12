import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";

const Checkout = () => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const [session] = useSession();
  const stripePromise = loadStripe(process.env.stripe_public_key);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    let newItems = items.map((item) => ({ ...item, price: item.price * 75 }));
    console.log(newItems);
    //call the backend to create a checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: newItems,
      email: session.user.email,
    });

    // //Redirect to stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession?.data?.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length == 0
                ? "Your Shopping Cart is empty."
                : "Your Shopping Cart"}
            </h1>
            <TransitionGroup>
              {items.map((item, i) => (
                <CSSTransition key={i} timeout={500} classNames="item">
                  <CheckoutProduct
                    key={i}
                    id={item.id}
                    title={item.title}
                    rating={item.rating}
                    price={item.price}
                    description={item.description}
                    category={item.category}
                    image={item.image}
                    hasPrime={item.hasPrime}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </div>
        </div>
        <CSSTransition
          in={items.length > 0}
          timeout={300}
          classNames="disappear"
          unmountOnExit
        >
          <div className="flex flex-col bg-white p-10 shadow-md">
            {items.length > 0 && (
              <>
                <h2 className="whitespace-nowrap">
                  Sub Total ({items.length} items):{" "}
                  <span className="font-bold">
                    <Currency quantity={total} currency={"INR"} />
                  </span>
                </h2>
                <button
                  role="link"
                  onClick={createCheckoutSession}
                  disabled={!session}
                  className={`button mt-2 ${
                    !session &&
                    "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {!session ? "Sign In to Checkout" : "Proceed to Checkout"}
                </button>
              </>
            )}
          </div>
        </CSSTransition>
      </main>
    </div>
  );
};

export default Checkout;
