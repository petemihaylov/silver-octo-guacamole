'use client'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const FlippableCard = ({
  frontImage,
  frontTitle,
  backContent,
  backLink,
}: {
  frontImage: string
  frontTitle: string
  backContent: string
  backLink: string
}) => {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, }}
      className="relative w-[90vw] h-96 md:w-64 md:h-64 perspective mx-auto md:mx-0 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, animationDirection: 'normal' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full bg-red rounded-none" style={{ backfaceVisibility: 'hidden' }}>
          <img src={frontImage} alt={frontTitle} className="w-full h-full object-cover" />
          <div className="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-60 p-3">
            <h2 className="text-light font-normal text-xl md:text-sm">{frontTitle}</h2>
          </div>
          <div className="absolute inset-0">
            {/* <button
              className="absolute top-4 right-4 bg-white rounded-full w-6 h-6 flex justify-center items-center opacity-80 hover:opacity-100 focus:outline-none"
              onClick={() => setFlipped(!flipped)}
            >
              <FontAwesomeIcon icon={faPlus} className="text-black text-sm" onClick={() => setFlipped(!flipped)} />
            </button> */}
          </div>
        </div>
        {/* Back Side */}
        <div
          className="absolute inset-0 w-full h-full md:text-sm"
          style={{
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          <img src={frontImage} alt={frontTitle} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-5 md:p-2 text-primary">
            <p className="px-1">{backContent}</p>
            <a href={backLink} className="block mt-4 hover:underline">
              Learn More →
            </a>

            {/* <button
              className="absolute top-4 right-4 bg-white rounded-full w-6 h-6 flex justify-center items-center opacity-80 hover:opacity-100 focus:outline-none"
              onClick={() => setFlipped(!flipped)}
            >
              <FontAwesomeIcon icon={faMinus} className="text-black text-sm" />
            </button> */}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FlippableCard
