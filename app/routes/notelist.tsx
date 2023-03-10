import { Form, Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/node";
import { getNoteListItems } from "~/models/note.server";
import { json } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { useUser } from "~/utils";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const noteListItems = await getNoteListItems({ userId });
  return json({ noteListItems });
}

export default function NotesListPage() {
  const data = useLoaderData<typeof loader>();
  const user = useUser();
  console.log(data);
  return (
    <div className="m-4 flex h-full min-h-screen flex-col">
      <h2 className="m-9 text-4xl font-bold text-sky-600">
        Imperium Sports Blog
      </h2>
      <hr className="my-4" />
      {data.noteListItems.length === 0 ? (
        <p className="p-4">No notes yet</p>
      ) : (
        <ol>
          {data.noteListItems.map((note) => (
            <li key={note.id}>
              <h3 className="text-2xl font-bold">{note.title}</h3>
              <p className="py-6 text-xl font-semibold italic text-sky-900">
                {note.body}
              </p>
              <hr className="my-4" />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
