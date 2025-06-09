export const metadata = {
  title: "Privacy Policy | Restauranntz",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold text-yellow mb-6">Privacy Policy</h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            1. Information We Collect
          </h2>
          <p className="text-gray-700">
            When you sign in using Facebook or Google, we collect your name,
            email address, and profile information to create your account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-700">
            Your information is used solely to authenticate your login and
            personalize your experience. We do not sell or share your data with
            third parties.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">3. Data Security</h2>
          <p className="text-gray-700">
            We implement appropriate technical and organizational measures to
            protect your personal information.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2">4. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions or concerns about this Privacy Policy,
            please contact us at:{" "}
            <a
              href="mailto:support@restauranntz.vercel.app"
              className="text-blue-600 underline"
            >
              support@restauranntz.vercel.app
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
