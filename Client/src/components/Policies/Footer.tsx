import React from 'react'

const Footer = () => (
  <footer aria-labelledby="footer-heading" className="bg-white">
    <h2 id="footer-heading" className="sr-only">
      Footer
    </h2>
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="border-t border-gray-100 py-10 text-center">
        <p className="text-sm text-gray-500">
          &copy;{new Date().getFullYear()} Bankerise, Inc. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
