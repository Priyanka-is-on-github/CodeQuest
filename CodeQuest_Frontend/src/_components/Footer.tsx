import React from 'react'

function Footer() {
  return (
   <footer className="bg-gray-800 text-white py-8">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      {/* About Section */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4 text-blue-400">CodeQuest</h3>
        <p className="text-gray-300">
  CodeQuest's integrated code editor allows developers to write, test, and submit solutions in multiple programming languages. Perfect for coding challenges, skill assessment, and showcasing your abilities to potential employers.
</p>
      </div>

      {/* Quick Links */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4 text-blue-400">Quick Links</h3>
        <ul className="space-y-2">
          <li><a  className="text-gray-300 hover:text-white transition">Playground</a></li>
          <li><a  className="text-gray-300 hover:text-white transition">Templates</a></li>
          <li><a  className="text-gray-300 hover:text-white transition">Documentation</a></li>
          <li><a  className="text-gray-300 hover:text-white transition">Blog</a></li>
        </ul>
      </div>

      {/* Supported Languages */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4 text-blue-400">Languages</h3>
        <ul className="grid grid-cols-2 gap-2 text-gray-300">
          <li>C</li>
          <li>Python</li>
          <li>Java</li>
          <li>C++</li>
          <li>Go</li>
        </ul>
      </div>

      {/* Contact/Newsletter */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4 text-blue-400">Stay Updated</h3>
        <p className="text-gray-300 mb-4">Subscribe to our newsletter for updates and tips.</p>
        <div className="flex">
          <input 
            type="email" 
            placeholder="Your email" 
            className="px-4 py-2 w-full rounded-l text-gray-800 focus:outline-none"
          />
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r transition">
            Subscribe
          </button>
        </div>
        <div className="flex space-x-4 mt-4">
          <a  className="text-gray-300 hover:text-white transition">Twitter</a>
          <a  className="text-gray-300 hover:text-white transition">GitHub</a>
          <a  className="text-gray-300 hover:text-white transition">Discord</a>
        </div>
      </div>
    </div>

    {/* Copyright and Legal */}
    <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
      <p>&copy; 2025 CodeQuest. All rights reserved.</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a className="hover:text-white transition">Privacy Policy</a>
        <a className="hover:text-white transition">Terms of Service</a>
        <a className="hover:text-white transition">Cookie Policy</a>
      </div>
    </div>
  </div>
</footer>
  )
}

export default Footer