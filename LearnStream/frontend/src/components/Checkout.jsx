import React from 'react'

function Checkout() {
  return (
     <button
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-semibold"
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button> 
  )
}

export default Checkout