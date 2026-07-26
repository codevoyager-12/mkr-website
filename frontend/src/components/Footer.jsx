export default function Footer() {
  return (
    <footer style={{
      background: 'var(--black-soft)', borderTop: '1px solid var(--gold)',
      padding: '24px 0', textAlign: 'center', color: 'var(--gray)', marginTop: '60px'
    }}>
      <p>© {new Date().getFullYear()} MKR Store — Custom Plates & Apparel</p>
    </footer>
  );
}