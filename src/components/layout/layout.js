import Head from 'next/head';
import { useRouter } from 'next/router';
import { info } from '@info';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

const SURVEY_ROUTES = ['/thankyou'];

export default function Layout({ children }) {
  const router = useRouter();
  const isThankyou = SURVEY_ROUTES.includes(router.pathname);

  return (
    <>
      <Head>
        <title>{info.companyName} | {info.description}</title>
        <meta name="description" content={info.description} />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/*{isThankyou && <Header />}*/}

      <main className="flex-grow">{children}</main>

      {isThankyou && <Footer />}
    </>
  );
}
