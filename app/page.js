import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Image
        src="https://files.stripe.com/links/MDB8YWNjdF8xT0dwc1RJNEFGT1hqelRDfGZsX3Rlc3RfQnZIcHEzNVV3bDlta210RDBLOTFiRXli00JA35wqUI"
        alt="Vercel Logo"
        width={400}
        height={300}
        priority
      />
    </main>
  );
}
