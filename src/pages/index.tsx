import type {ReactNode} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Homepage`}
      description="This is the homepage.">
      <HomepageHeader />
      <main>
        <div className="container padding-vert--xl">
          <div className="row">
            <div className="col col--8 col--offset-2 text--center">
              <h2 style={{fontSize: '2.5rem', fontWeight: 'bold'}}>About me</h2>
              <p style={{fontSize: '1.25rem', lineHeight: '1.6', color: 'var(--ifm-color-emphasis-700)'}}>
                I am a normal radish.
              </p>
            </div>
            
            <div className="col col--8 col--offset-2" style={{ marginTop: '2.5rem' }}>
              <h3 style={{ 
                textAlign: 'center', 
                marginBottom: '1.5rem',
                color: 'var(--ifm-color-primary-darker)' 
              }}>
                Todo Lists:
              </h3>
                <div className="col col--12 text--center" style={{ 
                    marginTop: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                  <Link to="/docs/radiobackground" style={{fontSize: '0.9rem', color: 'gray'}}>
                    1. Current progress: I-B Radio Map Prediction in RadioUnet orginal paper and sum the background knowledge
                  </Link>
                  <Link to="/docs/radiobackground#basic-concepts" style={{fontSize: '0.9rem', color: 'gray'}}>
                    2. What is "Wavefront"?
                  </Link>
                  <Link to="/docs/radiobackground#pathloss--radio-map" style={{fontSize: '0.9rem', color: 'gray'}}>
                    3. Is my understanding of the relationship between Radio Map and Pathloss accurate?
                  </Link>
                </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
