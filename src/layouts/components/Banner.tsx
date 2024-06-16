import React, { useState } from 'react'
import languages from '@/config/language.json'
import ImageFallback from '@/helpers/ImageFallback'
import { getListPage } from '@/lib/contentParser'
import { getActiveLanguages } from '@/lib/languageParser'
import { markdownify } from '@/lib/utils/textConverter'
import CallToAction from '@/partials/CallToAction'
import SeoMeta from '@/partials/SeoMeta'
import Testimonials from '@/partials/Testimonials'
import { Button, Feature } from '@/types'
import Link from 'next/link'

import { useTranslate } from '@/hooks/useTranslate'
import path from 'path'
import { FaCheck } from 'react-icons/fa'
import { motion } from 'framer-motion'

const Banner = ({ lang }: { lang: string }) => {
  // Your existing logic here...
  const language = languages.find((language) => language.languageCode === lang)!
  const homepage = getListPage(path.join(language?.contentDir, 'homepage/_index.md'))
  const testimonial = getListPage(path.join(language.contentDir, 'sections/testimonial.md'))
  const callToAction = getListPage(path.join(language.contentDir, 'sections/call-to-action.md'))
  const { frontmatter } = homepage
  const {
    banner,
    features,
  }: {
    banner: { title: string; image: string; content?: string; button?: Button }
    features: Feature[]
  } = frontmatter
  return (
    <>
      <SeoMeta />
      {/* Other sections */}
      <section className="relative">
        <div className="absolute inset-0 bg-cover bg-center h-[500px] w-[100vw]" style={{ backgroundImage: `url(${banner.image})` }}></div>
        <div className="absolute inset-0 bg-[#021e0580] bg-center opacity-[0.5] h-[500px] w-[100vw]"></div>
        <div className="relative z-10 container py-16">
          <div className="text-center max-w-xl mx-auto">
            <h1 className="text-6xl mb-4 tracking-wider text-light font-normal" dangerouslySetInnerHTML={markdownify(banner.title)}></h1>
            <p className="mb-8" dangerouslySetInnerHTML={markdownify(banner.content ?? '')}></p>
            {banner.button?.enable && (
              <div className="flex justify-center gap-4">
                <AnimatedButton
                  href={banner.button.link}
                  label={banner.button.label}
                  newTab={false}
                  className="bg-primary px-3 py-2 text-dark border border-primary"
                />

                <AnimatedButton href={banner.button.link} label={banner.button.label} newTab={false} className="px-3 py-2 text-light border border-primary" />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  )
}

export default Banner

const AnimatedButton = ({ href, label, newTab, className }: { href: string; label: string; newTab: boolean; className?: string }) => {
  return (
    <Link
      href={href}
      className={`inline-block rounded-none text-dark md:text-sm cursor-pointer ${newTab ? 'group' : ''} ${className}`}
      target={newTab ? '_blank' : '_self'}
      rel="noopener noreferrer"
    >
      <span className="relative">{label}</span>
    </Link>
  )
}
