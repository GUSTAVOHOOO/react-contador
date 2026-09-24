import './globals.css';

// Layout raiz do Next.js (App Router).
export const metadata = {
  title: 'Contador',
  description: 'Exercício: contador com limites e step',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
