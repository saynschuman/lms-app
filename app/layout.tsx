export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.svg" />
        <title>Page</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
