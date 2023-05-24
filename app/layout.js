import './globals.css';

export const metadata = {
  title: 'Quick Notes',
  description: 'Take notes! Uncomplicated and quick notes at your service.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};