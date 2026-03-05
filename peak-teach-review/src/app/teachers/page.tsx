import { getServerSupabase } from "@/lib/supabase-server";
import Link from "next/link";

type Teacher = {
  id: string;
  name: string;
  school: string;
  subject: string | null;
};

export default async function TeachersPage() {
  const supabase = getServerSupabase();
  const { data: teachers, error } = await supabase
    .from("teachers")
    .select("*")
    .order("name", { ascending: true });

  if (error) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Error loading teachers</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Teachers</h1>

      {!teachers || teachers.length === 0 ? (
        <p>No teachers found.</p>
      ) : (
        <ul className="space-y-3">
          {teachers.map((teacher: Teacher) => (
            <li key={teacher.id} className="border p-3 rounded">
              <Link href={`/teachers/${teacher.id}`} className="text-blue-600 font-medium">
                {teacher.name}
              </Link>
              <p className="text-sm text-gray-600">
                {teacher.school} • {teacher.subject}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}