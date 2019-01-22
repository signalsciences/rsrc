import * as React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

const basePath = process.env.NODE_ENV === 'production' ? '/rsrc' : '/'

export default class MyApp extends App {
  render () {
    const { Component } = this.props

    return (
      <Container>
        <Head>
          <title>rsrc - simply fetching</title>
          <meta name='viewport' content='initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width' />
          <link rel='stylesheet' href='/static/styles.css' />
        </Head>
        <header>
          <nav>
            <ul style={ { flex: 3, justifyContent: 'flex-start' } }>
              <li className='logo'>
                <Link href={ basePath }>
                  <a>
                    <code>
                      rsrc
                    </code>
                    <small>
                      Dead simple fetch management for React.
                    </small>
                  </a>
                </Link>
              </li>
            </ul>
            <ul style={ { flex: 1, justifyContent: 'flex-end' } }>
              <li>
                <Link href='https://github.com/signalsciences/rsrc'>
                  <a>
                    <img
                      alt='Github'
                      width={ 18 }
                      src='/static/github.svg'
                    />
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
          <nav>
            <ul>
              <li>
                <Link href={ `${basePath}/guides` }>
                  <a>
                    Getting Started
                  </a>
                </Link>
              </li>
              <li>
                <Link href={ `${basePath}/api` }>
                  <a>
                    API Reference
                  </a>
                </Link>
              </li>
              <li>
                <Link href={ `${basePath}/demos` }>
                  <a>
                    Demos &amp; Playground
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Component />
        </main>
        <footer>
          <div style={ { display: 'flex' } }>
            <div style={ { flex: 1, justifyContent: 'flex-start' } }>
              { `© ${new Date().getFullYear()} Signal Sciences` }
            </div>
            <div style={ { justifyContent: 'flex-end' } }>
              <a href='https://www.signalsciences.com'>
                <img
                  alt='Signal Sciences'
                  width={ 120 }
                  src='/static/signalsciences.svg'
                />
              </a>
            </div>
          </div>
        </footer>
      </Container>
    )
  }
}
