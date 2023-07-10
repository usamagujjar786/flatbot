import './styles/upgrade.css'
import axios from 'axios';
import { url } from '../../utils/url';
import { useEffect, useState } from 'react';
import * as React from 'react'
import { ProgressBar } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import StripePricingTable from '../../components/stripePricingTable';

const Upgrade = () => {
  // useEffect(() => {
  //   const publishableKey = 'pk_live_10pEAsJJit8p4oWjNQN9MB4s00nOGqEvMz'; // Replace with your actual publishable key

  //   const loadStripeClient = async () => {
  //     const stripe = await loadStripe(publishableKey);
  //     const pricingTableContainer = document.getElementById('pricing-table-container');
  //     if (pricingTableContainer) {
  //       // Render the pricing table within the container
  //       stripe?.elements().create('pricing-table', {}, pricingTableContainer);
  //     }
  //   };

  //   loadStripeClient();
  // }, []);
  // const [loading, setLoading] = useState<boolean>(false)
  // const [stripe_url, set_stripe_url] = useState<string>('')
  // const Payment = async (e: any) => {
  //   e.preventDefault()
  // }
  const payment = async (e: any) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${url}/user/payment`, {}, {
        headers: {
          token: localStorage.getItem('flatbot')
        }
      })
      console.log(res.data)
      if (res.data.url) {
        chrome.tabs.create({ url: res.data.url });
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    // React.createElement("stripe-pricing-table", {
    //   "pricing-table-id": "prctbl_1NKMb9JmdHhkpQiP7GLE0Atg",
    //   "publishable-key": "pk_live_10pEAsJJit8p4oWjNQN9MB4s00nOGqEvMz",
    // })
    <>

      {/* <div className='navigation'><img src='img/arrow-back.png' /><p>Home</p></div> */}
      <div className="upgrade">
        <h2>Go Unlimited</h2>
        <p>Enjoy unlimited messages for only 9€ per month</p>
        {/* <button onClick={(e) => { payment(e) }}>Pay</button> */}
      </div>
      <StripePricingTable />
    </>
    // <>

    // </>
  );
}

export default Upgrade;