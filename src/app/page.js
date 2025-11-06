import { supabase } from '../lib/supabase'
import Link from 'next/link'
import SearchComponent from './components/SearchComponent'

// This forces the page to be dynamic and never cache
export const revalidate = 0 

export default async function Home({ searchParams }) {

  // --- FIX 1: Fix for the 'searchParams is a Promise' error ---
  // We must "await" the searchParams just like we did for "params"
  const resolvedSearchParams = await searchParams;
  const searchQuery = resolvedSearchParams.query || ''
  // --- END OF FIX 1 ---

  let subjects = []
  let resources = []
  let error = null

  if (searchQuery) {
    // This is the simple query (no joins)
    const { data: searchData, error: searchError } = await supabase
      .from('resources')
      .select('file_name, file_url, file_type')
      .ilike('file_name', `%${searchQuery}%`) 

    if (searchError) {
      error = searchError
    } else {
      resources = searchData
    }

  } else {
    // This part is the same (if no search)
    const { data: subjectData, error: subjectError } = await supabase
      .from('subjects')
      .select('id, name')

    subjects = subjectData
    error = subjectError
  }

  if (error) {
    // If our query fails for ANY reason, we'll see it.
    return <p>Error: {error.message}</p>
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">

      <h1 className="text-4xl font-bold">JNTU-GV EEE Resources</h1>

      <SearchComponent initialQuery={searchQuery} />

      {searchQuery ? (
        // --- Display Search Results ---
        <div className="mt-10 w-full max-w-4xl">
          <h2 className="text-2xl font-semibold">
            Results for "{searchQuery}" ({resources.length})
          </h2>
          {resources.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {resources.map((resource) => (
                <li key={resource.file_url} className="flex justify-between items-center p-4 border rounded-lg bg-gray-100 dark:bg-gray-800">
                  <div>
                    <span className="font-medium">{resource.file_name}</span>
                    <span className="ml-4 text-sm text-gray-500">
                      ({resource.file_type})
                    </span>
                  </div>
                  <a 
                    href={resource.file_url} 
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4">No resources found matching your query.</p>
          )}
        </div>

      ) : (
        // --- Display Subject List (Original View) ---
        <div className="mt-10">
          <h2 className="text-2xl font-semibold">Available Subjects</h2>
          <ul className="mt-4 list-disc pl-5">
            {subjects.map((subject) => (
              <li key={subject.id} className="text-lg hover:text-blue-500">
                <Link href={`/subjects/${subject.id}`}>
                  {subject.name}
                </Link> { /* --- FIX 2: My typo "SLink" is now "Link" --- */ }
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  )
}