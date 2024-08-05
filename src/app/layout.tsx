// i18n
import 'src/locales/i18n';

// scrollbar
import 'simplebar-react/dist/simplebar.min.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// image
import 'react-lazy-load-image-component/src/effects/blur.css';

// global
import 'src/theme/css.css';
import 'public/fonts/index.css';
// ----------------------------------------------------------------------

// locales
import { LocalizationProvider } from 'src/locales';
// theme
import ThemeProvider from 'src/theme';
import { primaryFont } from 'src/theme/typography';

// components
import MotionLazy from 'src/components/animate/motion-lazy';
import SnackbarProvider from 'src/components/snackbar/snackbar-provider';
import { SettingsProvider, SettingsDrawer } from 'src/components/settings';
// sections
// auth
import { AuthProvider, AuthConsumer } from 'src/auth/context/jwt';
import ProgressBar from 'src/components/progress-bar';
import Head from 'next/head';
// import { AuthProvider, AuthConsumer } from 'src/auth/context/auth0';
// import { AuthProvider, AuthConsumer } from 'src/auth/context/amplify';
// import { AuthProvider, AuthConsumer } from 'src/auth/context/firebase';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Cinelaser',
  description: 'Sistema para compra de filmes',
  keywords: 'cinelaser,filme,',
  themeColor: '#000000',
  manifest: '/manifest.json',
  icons: [
    {
      rel: 'icon',
      url: '/assets/logo/logo_single.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/assets/logo/logo_single.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/assets/logo/logo_single.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      url: '/assets/logo/logo_single.png',
    },
  ],
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" className={primaryFont.className}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      ></meta>
      {/*
      <script
        type="application/javascript"
        src="https://kong.tallos.com.br:18000/megasac-api/widget/64f0ea4247901e2e0eac89ec-6504c25c1b1ee1875613d3fe-1.min.js"
      ></script>
     */}
      <body>
        <AuthProvider>
          <LocalizationProvider>
            <SettingsProvider
              defaultSettings={{
                themeMode: 'dark', // 'light' | 'dark'
                themeDirection: 'ltr', //  'rtl' | 'ltr'
                themeContrast: 'default', // 'default' | 'bold'
                themeLayout: 'vertical', // 'vertical' | 'horizontal' | 'mini'
                themeColorPresets: 'red', // 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red'
                themeStretch: false,
              }}
            >
              <ThemeProvider>
                <MotionLazy>
                  <SnackbarProvider>
                    <SettingsDrawer />
                    <ProgressBar />
                    <AuthConsumer>{children}</AuthConsumer>
                  </SnackbarProvider>
                </MotionLazy>
              </ThemeProvider>
            </SettingsProvider>
          </LocalizationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
