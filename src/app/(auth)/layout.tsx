import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-slate-900">Expert Listing</h1>
            <p className="text-sm text-slate-600 mt-1">Find Your Perfect Home in Nigeria</p>
          </Link>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-8">
          {children}
        </div>
        <p className="text-center text-sm text-slate-600 mt-6">
          © 2026 Expert Listing. All rights reserved.
        </p>
      </div>
    </div>
  );
}

