import React from 'react'
import languages from '@/config/language.json'
import { getListPage } from '@/lib/contentParser'
import { getActiveLanguages } from '@/lib/languageParser'
import SeoMeta from '@/partials/SeoMeta'
import { Button, Feature } from '@/types'
import path from 'path'
import FlippableCard from '@/layouts/components/FlippableCard'
import Banner from '@/layouts/components/Banner'
import Link from 'next/link'
import ImageFallback from '@/helpers/ImageFallback'
import { markdownify } from '@/lib/utils/textConverter'
import { FaCheck } from 'react-icons/fa6'
import Testimonials from '@/partials/Testimonials'
import CallToAction from '@/partials/CallToAction'

// remove dynamicParams
export const dynamicParams = false

// generate static params
export async function generateStaticParams() {
  return getActiveLanguages().map((language) => ({
    lang: language.languageCode,
  }))
}

const Home = ({ params }: { params: { lang: string } }) => {
  const lang = params.lang
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
      <Banner lang={lang} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-8 justify-center items-center">
        <FlippableCard
          frontImage={'https://assets-global.website-files.com/657322040347cbe95b29ae19/65772378fec8baac9c86f98c_eduard-NgiE1A-lIyY-unsplash-p-500.jpg'}
          frontTitle={'Native Plant Nursery'}
          backContent={"Enhance biodiversity in your garden with Garden Tree's Native Plant Nursery and Seed Bank."}
          backLink={'#'}
        />
        <FlippableCard
          frontImage={'https://assets-global.website-files.com/657322040347cbe95b29ae19/6577214f0b8de05b1510ae6c_annie-spratt-3vFbHoKYltE-unsplash-p-500.jpg'}
          frontTitle={'Gardening Consultation'}
          backContent={"Enhance biodiversity in your garden with Garden Tree's Native Plant Nursery and Seed Bank."}
          backLink={'#'}
        />
        <FlippableCard
          frontImage={
            'https://assets-global.website-files.com/657322040347cbe95b29ae19/65772167a01233ffd0539ba4_www-zanda-photography-RBdE3jv5y68-unsplash-p-500.jpg'
          }
          frontTitle={'Eco-Friendly Landscaping'}
          backContent={"Enhance biodiversity in your garden with Garden Tree's Native Plant Nursery and Seed Bank."}
          backLink={'#'}
        />
      </div>

      {/* 
      {features.map((feature, index: number) => (
        <section
          key={index}
          className={`section-sm ${index % 2 === 0 && "bg-gradient"}`}
        >
          <div className="container">
            <div className="row items-center justify-between">
              <div
                className={`mb:md-0 mb-6 md:col-5 ${
                  index % 2 !== 0 && "md:order-2"
                }`}
              >
                <ImageFallback
                  src={feature.image}
                  height={480}
                  width={520}
                  alt={feature.title}
                />
              </div>
              <div
                className={`md:col-7 lg:col-6 ${
                  index % 2 !== 0 && "md:order-1"
                }`}
              >
                <h2
                  className="mb-4"
                  dangerouslySetInnerHTML={markdownify(feature.title)}
                />
                <p
                  className="mb-8 text-lg"
                  dangerouslySetInnerHTML={markdownify(feature.content)}
                />
                <ul>
                  {feature.bulletpoints.map((bullet: string) => (
                    <li className="relative mb-4 pl-6" key={bullet}>
                      <FaCheck className={"absolute left-0 top-1.5"} />
                      <span dangerouslySetInnerHTML={markdownify(bullet)} />
                    </li>
                  ))}
                </ul>
                {feature.button.enable && (
                  <Link
                    className="btn btn-primary mt-5"
                    href={feature.button.link}
                  >
                    {feature.button.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))} */}

      {/* <Testimonials data={testimonial} />
      <CallToAction data={callToAction} /> */}
    </>
  )
}

export default Home

