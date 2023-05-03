import React from 'react'
import { Icon } from '@iconify/react'
import logoBankerise from '@/assets/logo-bankerise.png'

const Header = () => (
  <header className="relative bg-white">
    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div>
        <div className="flex h-16 items-center">
          {/* Logo */}
          <div className="ml-4 flex lg:ml-0">
              <span className="sr-only">Bankerise</span>
              <img
                className="h-14 w-auto"
                src={logoBankerise}
                height="40"
                width="40"
                alt="Bankerise"
              />
          </div>

          <div className="ml-auto flex items-center">
            <div className="lg:ml-8 lg:flex">
              <span
                className="flex items-center text-gray-700 hover:text-gray-800"
              >
                <Icon icon="flagpack:gb-ukm" />
                <span className="ml-3 block text-sm font-medium">English</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
)

export default Header
