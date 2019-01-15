import * as React from 'react'
import App, { Container } from 'next/app'
import Head from 'next/head'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'

export default class MyApp extends App {
  state = {
    showNav: false,
  }

  render () {
    const { Component, page } = this.props
    const { showNav } = this.state

    return (
      <Container>
        <Head>
          <title>RSRC</title>
          <meta name='viewport' content='initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width' />
          <link rel='stylesheet' href='/static/prism-ghcolors.css' />
          <link rel='stylesheet' href='/static/styles.css' />
        </Head>
        <header>
          <style jsx>{`
            header {
              width: 100vw;
              margin: 0 0 1rem 0;
            }
            nav {
              display: flex;
              max-width: 50rem;
              margin: 0 auto;
              font-size: 1rem;
              padding: 2rem 0 0;
            }
            ul {
              list-style: none;
              display: flex;
              flex: 1;
              padding: 0;
              margin: 0;
            }
            li {
              display: flex;
              align-items: center;
            }
            li a {
              text-decoration: none;
              padding: 1rem;
              flex: 1;
            }
            li a:hover {
              color: #f05424;
            }
            li a img {
              width: 1.4em;
            }
            li a.brand {
              font-weight: 800;
              font-size: 2.4rem;
              font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;
            }
            li a.brand .logo {
              display: inline-block;
              font-size: 1.8rem;
              margin-right: 0.5em;
              vertical-align: middle;
              transform: rotate(-90deg);
            }
          `}</style>
          <nav>
            <ul style={ { justifyContent: 'flex-start' } }>
              <li>
                <Link href='/'>
                  <a className='brand'>
                    <div className='logo'>
                      ⏚
                    </div>
                    rsrc
                  </a>
                </Link>
              </li>
            </ul>
            <ul style={ { justifyContent: 'flex-end' } }>
              <li>
                <Link href='https://github.com/signalsciences/rsrc'>
                  <a>
                    <img alt='Github' src='/static/github.svg' />
                  </a>
                </Link>
              </li>
            </ul>
          </nav>
          <nav>
            <ul style={ { justifyContent: 'flex-start' } }>
              <li>
                <Link href='/getting-started'>
                  <a>{ 'Getting Started' }</a>
                </Link>
              </li>
              <li>
                <Link href='/demos'>
                  <a>{ 'Examples & Demos' }</a>
                </Link>
              </li>
              <li>
                <Link href='/api'>
                  <a>{ 'API Reference' }</a>
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main
          style={ {
            maxWidth: '48rem',
            padding: '2rem 1rem',
            margin: '0 auto'
          } }
        >
          <Component { ...page } />
        </main>
        <footer>
          <div
            style={ {
              display: 'flex',
              color: '#777',
              maxWidth: '48rem',
              padding: '3rem 1rem',
              margin: '2rem auto 0',
            } }
          >
            <div style={ { flex: 1 } }>
              © { new Date().getFullYear() } Signal Sciences
            </div>
            <div style={ { textAlign: 'right', flex: 1 } }>
              <img alt='SignalSciences' width={ 24 } src='/static/signalsciences-icon.svg' />
            </div>
          </div>
        </footer>
      </Container>
    )
  }
}
