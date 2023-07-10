import React, { useEffect, useState } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import './stripe.css'
import axios from "axios";
import { url } from "../utils/url";
import { Spinner } from "react-bootstrap";
// import PricingTable from 'stripe-pricing-table'; // Assuming 'stripe-pricing-table' is the package name
// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       'stripe-pricing-table': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
//     }
//   }
// }
const StripePricingTable = () => {
  const [loading, setLoading] = useState(false)
  const handlepayment = async () => {
    setLoading(true)
    const res = await axios.post(`${url}/user/payment`, {}, {
      headers: {
        token: localStorage.getItem('flatbot')
      }
    })
    if (res.data.url) {
      chrome.tabs.create({ url: res.data.url });
    }
    setLoading(false)
  }
  // const stripePromise = loadStripe("pk_live_10pEAsJJit8p4oWjNQN9MB4s00nOGqEvMz");
  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "scripts/stripe.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <div className="stripe_main">
      <div>
        <div className="most_popular">
          <p>Most popular</p>
        </div>
        <div className="logo_container">
          <div className="unlimited">
            <h4>Unlimited</h4>
            <p>Get the max out of your flar search</p>
          </div>
          <img src="img/colorful-baba.png" />
        </div>

      </div>
      <div>
        <div className="price">
          <span className="euro">€9</span>
          <div className="per_month">
            <span>per</span>
            <span>month</span>
          </div>
        </div>
        <button onClick={handlepayment}>
          {!loading && <>Subscribe</>}
          {loading && <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="spinner" />}
        </button>
      </div>
    </div>
  )
  // (
  //   <stripe-pricing-table pricing-table-id="prctbl_1NMB9AFKy8Ssys2PNaVz9IsJ"
  //     publishable-key="pk_test_51MYavWFKy8Ssys2PPcjacLyiCil4HjqiIzEKdLrboZQU4x6lmv8ySQoDCoeooh4rD54Hr6rCAXaHCKjYkllE5lsp00s0bN1gYs">
  //   </stripe-pricing-table>
  // )
  // return React.createElement("stripe-pricing-table", {
  //   "pricing-table-id": "prctbl_1NMB9AFKy8Ssys2PNaVz9IsJ",
  //   "publishable-key": "pk_test_51MYavWFKy8Ssys2PPcjacLyiCil4HjqiIzEKdLrboZQU4x6lmv8ySQoDCoeooh4rD54Hr6rCAXaHCKjYkllE5lsp00s0bN1gYs",
  //   "client-reference-id": "cus_O8RblUalvmsaw4",
  // return React.createElement("stripe-pricing-table", {
  //   "pricing-table-id": "prctbl_1NKMb9JmdHhkpQiP7GLE0Atg",
  //   "publishable-key": "pk_live_10pEAsJJit8p4oWjNQN9MB4s00nOGqEvMz",


  // });
};
export default StripePricingTable;