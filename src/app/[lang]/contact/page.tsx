import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFields, ContactFormSchema } from "@/pages/api/contact";
import Breadcrumbs from "@/components/Breadcrumbs";
import config from "@/config/config.json";
import { getListPage } from "@/lib/contentParser";
import {
  getActiveLanguages,
  getLanguageObj,
  getTranslations,
} from "@/lib/languageParser";
import PageHeader from "@/partials/PageHeader";
import SeoMeta from "@/partials/SeoMeta";
import { RegularPage } from "@/types";
import path from "path";
import { useForm } from "react-hook-form";
import ContactForm from "@/components/ContactForm";

const Contact = async ({ params }: { params: { lang: string } }) => {
  const language = getLanguageObj(params.lang);
  const data: RegularPage = getListPage(
    path.join(language.contentDir, "contact/_index.md")
  );
  const content = await getTranslations(params.lang);
  const { frontmatter } = data;
  const { title, description, meta_title, image } = frontmatter;

  return (
    <>
      <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      />
      <PageHeader title={title}>
        <Breadcrumbs lang={params.lang} />
      </PageHeader>
      <section className="section-sm">
        <div className="container">
          <div className="row">
            <div className="mx-auto md:col-10 lg:col-6">
              <ContactForm content={content} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

// remove dynamicParams
export const dynamicParams = false;

// generate static params
export async function generateStaticParams() {
  return getActiveLanguages().map((language) => ({
    lang: language.languageCode,
  }));
}
