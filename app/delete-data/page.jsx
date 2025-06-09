export const metadata = {
  title: "Data Deletion Request | Restauranntz",
};

export default function DeleteDataPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-xl p-8">
        <h1 className="text-3xl font-bold text-yellow mb-4">
          Data Deletion Request
        </h1>
        <p className="mb-4 text-gray-700">
          If you signed up using Facebook and wish to delete your data from our
          system, please follow these steps:
        </p>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>
            Send an email to:{" "}
            <a
              href="mailto:support@restauranntz.vercel.app"
              className="text-blue-600 underline"
            >
              support@restauranntz.vercel.app
            </a>
          </li>
          <li>Include the email linked to your Facebook account.</li>
          <li>We will process your deletion request within 7 business days.</li>
        </ul>
        <p className="mt-6 text-gray-500 text-sm">
          If you have any questions, feel free to reach out to us.
        </p>
      </div>
    </main>
  );
}
